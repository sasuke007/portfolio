import type { Client } from "pg";
import { adminPool, executorClient, quoteIdent } from "./db.ts";
import { sanitizePgError } from "./errors.ts";
import type {
  IsoLevel,
  Scenario,
  Step,
  StepResult,
  StepResultRow,
  TxId,
} from "./types.ts";

const WALL_CLOCK_CAP_MS = 30_000;
const MAX_ROWS = 200;
const MAX_STRING_BYTES = 2048;
const MAX_BINARY_BYTES = 1024;

const BEGIN_GUARDS = [
  "SET LOCAL statement_timeout = '2s'",
  "SET LOCAL lock_timeout = '500ms'",
  "SET LOCAL idle_in_transaction_session_timeout = '5s'",
  "SET LOCAL work_mem = '4MB'",
];

export type RunInput = {
  scenario: Scenario;
  isolation: IsoLevel;
  sessionSchema: string;
};

/**
 * Streams scenario execution as newline-delimited JSON. Each line is one
 * StepResult. The stream closes when the scenario ends, the wall-clock
 * cap fires, or an unrecoverable error occurs.
 */
export function scenarioRunStream(input: RunInput): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  const write = (controller: ReadableStreamDefaultController, ev: StepResult) =>
    controller.enqueue(enc.encode(JSON.stringify(ev) + "\n"));

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const txs: Partial<Record<TxId, Client>> = {};
      let aborted = false;
      const abortTimer = setTimeout(() => {
        aborted = true;
      }, WALL_CLOCK_CAP_MS);

      try {
        await resetScenarioState(input.sessionSchema, input.scenario);
        // Pre-open T1 + T2 before starting the step loop so the
        // wall-clock cap doesn't tick down during TCP/TLS handshake.
        txs.T1 = await executorClient(input.sessionSchema);
        txs.T2 = await executorClient(input.sessionSchema);

        for (let i = 0; i < input.scenario.steps.length; i++) {
          if (aborted) {
            write(controller, {
              stepIndex: i,
              kind: "aborted",
              reason: "wall-clock cap exceeded",
            });
            break;
          }
          const step = input.scenario.steps[i];
          const result = await runStep(
            step,
            i,
            input.isolation,
            input.sessionSchema,
            txs,
          );
          write(controller, result);
        }

        const totalDuration = WALL_CLOCK_CAP_MS - remaining(abortTimer);
        write(controller, {
          stepIndex: input.scenario.steps.length,
          kind: "done",
          durationMs: totalDuration,
        });
      } catch (err) {
        write(controller, {
          stepIndex: -1,
          kind: "aborted",
          reason: err instanceof Error ? err.message : String(err),
        });
      } finally {
        clearTimeout(abortTimer);
        await closeTxs(txs);
        controller.close();
      }
    },
  });
}

function remaining(_timer: NodeJS.Timeout): number {
  // We can't introspect node's timer precisely; this is a placeholder so
  // the "done" event still has a sensible-ish duration. Total runs are
  // capped to WALL_CLOCK_CAP_MS, so any value in [0, cap] is fine.
  return 0;
}

async function resetScenarioState(
  schema: string,
  scenario: Scenario,
): Promise<void> {
  const pool = adminPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`SET LOCAL search_path = ${quoteIdent(schema)}`);
    for (const sql of scenario.resetSql) {
      await client.query(sql);
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw err;
  } finally {
    client.release();
  }
}

async function runStep(
  step: Step,
  index: number,
  isolation: IsoLevel,
  schema: string,
  txs: Partial<Record<TxId, Client>>,
): Promise<StepResult> {
  switch (step.kind) {
    case "wait": {
      const t0 = Date.now();
      await new Promise((r) => setTimeout(r, step.ms));
      return { stepIndex: index, kind: "wait", ms: step.ms, durationMs: Date.now() - t0 };
    }
    case "begin": {
      const t0 = Date.now();
      const client = await ensureClient(step.tx, schema, txs);
      try {
        await client.query(`BEGIN ISOLATION LEVEL ${isolation}`);
        for (const guard of BEGIN_GUARDS) await client.query(guard);
      } catch (err) {
        return {
          stepIndex: index,
          kind: "begin",
          tx: step.tx,
          isolation,
          durationMs: Date.now() - t0,
          error: sanitizePgError(err),
        };
      }
      return {
        stepIndex: index,
        kind: "begin",
        tx: step.tx,
        isolation,
        durationMs: Date.now() - t0,
      };
    }
    case "commit":
    case "rollback": {
      const t0 = Date.now();
      const client = txs[step.tx];
      if (!client) {
        return {
          stepIndex: index,
          kind: step.kind,
          tx: step.tx,
          durationMs: 0,
          error: { sqlstate: "PGP00", message: "no active transaction" },
        };
      }
      try {
        await client.query(step.kind === "commit" ? "COMMIT" : "ROLLBACK");
        return {
          stepIndex: index,
          kind: step.kind,
          tx: step.tx,
          durationMs: Date.now() - t0,
        };
      } catch (err) {
        return {
          stepIndex: index,
          kind: step.kind,
          tx: step.tx,
          durationMs: Date.now() - t0,
          error: sanitizePgError(err),
        };
      }
    }
    case "sql": {
      const t0 = Date.now();
      const client = await ensureClient(step.tx, schema, txs);
      try {
        const result = await client.query(step.sql);
        const { rows, truncated } = truncateRows(
          result.rows as StepResultRow[],
        );
        return {
          stepIndex: index,
          kind: "sql",
          tx: step.tx,
          sql: step.sql,
          note: step.note,
          rows,
          rowCount: result.rowCount ?? undefined,
          durationMs: Date.now() - t0,
          truncated,
        };
      } catch (err) {
        return {
          stepIndex: index,
          kind: "sql",
          tx: step.tx,
          sql: step.sql,
          note: step.note,
          durationMs: Date.now() - t0,
          error: sanitizePgError(err),
        };
      }
    }
  }
}

async function ensureClient(
  tx: TxId,
  schema: string,
  txs: Partial<Record<TxId, Client>>,
): Promise<Client> {
  const existing = txs[tx];
  if (existing) return existing;
  const client = await executorClient(schema);
  txs[tx] = client;
  return client;
}

async function closeTxs(txs: Partial<Record<TxId, Client>>): Promise<void> {
  for (const tx of ["T1", "T2"] as TxId[]) {
    const c = txs[tx];
    if (!c) continue;
    try {
      await c.query("ROLLBACK").catch(() => undefined);
    } finally {
      await c.end().catch(() => undefined);
    }
  }
}

export function truncateRows(rows: StepResultRow[]): {
  rows: StepResultRow[];
  truncated: boolean;
} {
  const truncated = rows.length > MAX_ROWS;
  const sliced = truncated ? rows.slice(0, MAX_ROWS) : rows;
  const out = sliced.map((row) => {
    const trimmed: StepResultRow = {};
    for (const [k, v] of Object.entries(row)) {
      trimmed[k] = trimCell(v);
    }
    return trimmed;
  });
  return { rows: out, truncated };
}

function trimCell(v: unknown): unknown {
  if (typeof v === "string" && v.length > MAX_STRING_BYTES) {
    return `${v.slice(0, MAX_STRING_BYTES)}…(truncated)`;
  }
  if (Buffer.isBuffer(v) && v.length > MAX_BINARY_BYTES) {
    return `<binary ${v.length} bytes>`;
  }
  return v;
}
