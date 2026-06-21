import type { Client } from "pg";
import { executorClient } from "./db.ts";
import { sanitizePgError } from "./errors.ts";
import { validateUserSql } from "./sql-guard.ts";
import { truncateRows } from "./runner.ts";
import type {
  FreeformStepBody,
} from "./schemas.ts";
import type { IsoLevel, StepResultRow, TxId } from "./types.ts";

const IDLE_EVICT_MS = 30_000;
const BEGIN_GUARDS = [
  "SET LOCAL statement_timeout = '2s'",
  "SET LOCAL lock_timeout = '500ms'",
  "SET LOCAL idle_in_transaction_session_timeout = '5s'",
  "SET LOCAL work_mem = '4MB'",
];

type SessionClients = {
  T1?: Client;
  T2?: Client;
  lastUsed: number;
};

// In-memory per-session map of open transaction clients. Lives for the
// lifetime of the Fluid Compute instance — on a cold restart, the new
// instance creates fresh clients lazily. The parser + role privileges
// keep us safe even if a request lands on a different instance mid-tx.
const sessions = new Map<string, SessionClients>();

function evictIdle(): void {
  const now = Date.now();
  for (const [k, s] of sessions) {
    if (now - s.lastUsed > IDLE_EVICT_MS) {
      void closeClients(s);
      sessions.delete(k);
    }
  }
}

async function closeClients(s: SessionClients): Promise<void> {
  for (const tx of ["T1", "T2"] as TxId[]) {
    const c = s[tx];
    if (!c) continue;
    await c.query("ROLLBACK").catch(() => undefined);
    await c.end().catch(() => undefined);
    s[tx] = undefined;
  }
}

function getSession(sessionId: string): SessionClients {
  evictIdle();
  let s = sessions.get(sessionId);
  if (!s) {
    s = { lastUsed: Date.now() };
    sessions.set(sessionId, s);
  }
  s.lastUsed = Date.now();
  return s;
}

export type FreeformResult = {
  tx: TxId;
  action: FreeformStepBody["action"];
  rows?: StepResultRow[];
  rowCount?: number;
  truncated?: boolean;
  durationMs: number;
  error?: { sqlstate: string; message: string };
};

export async function freeformStep(
  sessionId: string,
  sessionSchema: string,
  body: FreeformStepBody,
): Promise<FreeformResult> {
  const t0 = Date.now();
  const session = getSession(sessionId);

  switch (body.action) {
    case "begin":
      return await beginTx(session, sessionSchema, body.tx, body.isolation, t0);
    case "commit":
    case "rollback":
      return await endTx(session, body.tx, body.action, t0);
    case "sql":
      return await runSql(session, sessionSchema, body.tx, body.sql, t0);
  }
}

async function beginTx(
  session: SessionClients,
  schema: string,
  tx: TxId,
  isolation: IsoLevel,
  t0: number,
): Promise<FreeformResult> {
  // If a client already exists for this tx, rollback + close before reopening.
  const existing = session[tx];
  if (existing) {
    await existing.query("ROLLBACK").catch(() => undefined);
    await existing.end().catch(() => undefined);
    session[tx] = undefined;
  }
  try {
    const client = await executorClient(schema);
    await client.query(`BEGIN ISOLATION LEVEL ${isolation}`);
    for (const guard of BEGIN_GUARDS) await client.query(guard);
    session[tx] = client;
    return { tx, action: "begin", durationMs: Date.now() - t0 };
  } catch (err) {
    return {
      tx,
      action: "begin",
      durationMs: Date.now() - t0,
      error: sanitizePgError(err),
    };
  }
}

async function endTx(
  session: SessionClients,
  tx: TxId,
  action: "commit" | "rollback",
  t0: number,
): Promise<FreeformResult> {
  const client = session[tx];
  if (!client) {
    return {
      tx,
      action,
      durationMs: 0,
      error: { sqlstate: "PGP00", message: "no active transaction" },
    };
  }
  try {
    await client.query(action === "commit" ? "COMMIT" : "ROLLBACK");
    return { tx, action, durationMs: Date.now() - t0 };
  } catch (err) {
    return {
      tx,
      action,
      durationMs: Date.now() - t0,
      error: sanitizePgError(err),
    };
  } finally {
    await client.end().catch(() => undefined);
    session[tx] = undefined;
  }
}

async function runSql(
  session: SessionClients,
  schema: string,
  tx: TxId,
  sql: string,
  t0: number,
): Promise<FreeformResult> {
  const guard = validateUserSql(sql, schema);
  if (!guard.ok) {
    return {
      tx,
      action: "sql",
      durationMs: Date.now() - t0,
      error: { sqlstate: "PGP01", message: guard.reason },
    };
  }
  // Auto-begin if no tx open — gives a usable REPL feel.
  let client = session[tx];
  if (!client) {
    try {
      client = await executorClient(schema);
      session[tx] = client;
    } catch (err) {
      return {
        tx,
        action: "sql",
        durationMs: Date.now() - t0,
        error: sanitizePgError(err),
      };
    }
  }
  try {
    const result = await client.query(sql);
    const { rows, truncated } = truncateRows(result.rows as StepResultRow[]);
    return {
      tx,
      action: "sql",
      rows,
      rowCount: result.rowCount ?? undefined,
      truncated,
      durationMs: Date.now() - t0,
    };
  } catch (err) {
    return {
      tx,
      action: "sql",
      durationMs: Date.now() - t0,
      error: sanitizePgError(err),
    };
  }
}

/**
 * Tears down all open transactions for a session. Called by
 * /api/playground/freeform/reset and on session destruction.
 */
export async function resetFreeformSession(sessionId: string): Promise<void> {
  const s = sessions.get(sessionId);
  if (!s) return;
  await closeClients(s);
  sessions.delete(sessionId);
}
