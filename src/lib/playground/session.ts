import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { customAlphabet } from "nanoid";
import { cookies } from "next/headers";
import { adminPool, quoteIdent } from "./db.ts";
import { SESSION_BOOTSTRAP_DDL } from "./scenarios.ts";

export const COOKIE_NAME = "pgp_sid";
export const SCHEMA_PREFIX = "playground_";
export const SESSION_TTL_MINUTES = 15;
export const MAX_SESSIONS_PER_IP = 5;

// Identifier-safe alphabet: lowercase letters + digits. Schema names are
// always prefixed with "playground_" so a leading digit is never a problem.
const SCHEMA_ID = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 22);

function requireSecret(): string {
  const v = process.env.PLAYGROUND_SESSION_SECRET;
  if (!v) throw new Error("Missing PLAYGROUND_SESSION_SECRET");
  return v;
}

// ----- token signing ---------------------------------------------------------

function sign(payload: string): string {
  return createHmac("sha256", requireSecret())
    .update(payload)
    .digest("base64url");
}

function signedToken(sessionId: string): string {
  return `${sessionId}.${sign(sessionId)}`;
}

function verifyToken(token: string): string | null {
  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const id = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(id);
  // constant-time compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  return timingSafeEqual(a, b) ? id : null;
}

function hashToken(sessionId: string): string {
  // The DB stores SHA-256(sessionId) so a DB read alone can't forge cookies.
  return createHash("sha256").update(sessionId).digest("base64url");
}

export function hashIp(ip: string): string {
  return createHash("sha256")
    .update(`${ip}:${requireSecret()}`)
    .digest("base64url");
}

// ----- session lifecycle -----------------------------------------------------

export type Session = {
  schema: string;
  sessionId: string;
};

export async function bootstrapSession(ip: string): Promise<Session> {
  const sessionId = SCHEMA_ID();
  const schema = `${SCHEMA_PREFIX}${sessionId}`;
  const tokenHash = hashToken(sessionId);
  const ipHash = hashIp(ip);

  await assertUnderIpCap(ipHash);

  const pool = adminPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`CREATE SCHEMA ${quoteIdent(schema)}`);
    await client.query(
      `GRANT USAGE ON SCHEMA ${quoteIdent(schema)} TO playground_executor`,
    );
    await client.query(`SET LOCAL search_path = ${quoteIdent(schema)}`);
    await client.query(SESSION_BOOTSTRAP_DDL);
    await client.query(
      `INSERT INTO _playground_meta.playground_sessions
         (token_hash, schema_name, ip_hash)
       VALUES ($1, $2, $3)`,
      [tokenHash, schema, ipHash],
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw err;
  } finally {
    client.release();
  }

  return { schema, sessionId };
}

async function assertUnderIpCap(ipHash: string): Promise<void> {
  const { rows } = await adminPool().query<{ n: string }>(
    `SELECT count(*)::text AS n
       FROM _playground_meta.playground_sessions
       WHERE ip_hash = $1
         AND last_active_at > now() - interval '${SESSION_TTL_MINUTES} minutes'`,
    [ipHash],
  );
  const n = Number(rows[0]?.n ?? "0");
  if (n >= MAX_SESSIONS_PER_IP) {
    throw new SessionLimitError(
      `too many active sessions from this address`,
    );
  }
}

export class SessionLimitError extends Error {
  readonly kind = "session_limit";
}

export async function lookupSessionByToken(
  token: string,
): Promise<Session | null> {
  const sessionId = verifyToken(token);
  if (!sessionId) return null;
  const tokenHash = hashToken(sessionId);

  const { rows } = await adminPool().query<{ schema_name: string }>(
    `SELECT schema_name
       FROM _playground_meta.playground_sessions
       WHERE token_hash = $1
         AND last_active_at > now() - interval '${SESSION_TTL_MINUTES} minutes'`,
    [tokenHash],
  );
  const row = rows[0];
  if (!row) return null;
  return { schema: row.schema_name, sessionId };
}

export async function touchSession(sessionId: string): Promise<void> {
  const tokenHash = hashToken(sessionId);
  await adminPool().query(
    `UPDATE _playground_meta.playground_sessions
       SET last_active_at = now()
       WHERE token_hash = $1`,
    [tokenHash],
  );
}

export async function destroySession(sessionId: string): Promise<void> {
  const tokenHash = hashToken(sessionId);
  const pool = adminPool();
  const client = await pool.connect();
  try {
    const { rows } = await client.query<{ schema_name: string }>(
      `SELECT schema_name FROM _playground_meta.playground_sessions WHERE token_hash = $1`,
      [tokenHash],
    );
    const schema = rows[0]?.schema_name;
    if (!schema) return;
    await client.query("BEGIN");
    await client.query(`DROP SCHEMA IF EXISTS ${quoteIdent(schema)} CASCADE`);
    await client.query(
      `DELETE FROM _playground_meta.playground_sessions WHERE token_hash = $1`,
      [tokenHash],
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw err;
  } finally {
    client.release();
  }
}

/**
 * Drops session schemas whose last_active_at is older than the TTL.
 * Invoked by the /api/playground/cleanup cron.
 */
export async function cleanupExpiredSessions(): Promise<{
  dropped: number;
}> {
  const pool = adminPool();
  const client = await pool.connect();
  try {
    const { rows } = await client.query<{
      token_hash: string;
      schema_name: string;
    }>(
      `SELECT token_hash, schema_name
         FROM _playground_meta.playground_sessions
         WHERE last_active_at < now() - interval '${SESSION_TTL_MINUTES} minutes'`,
    );
    let dropped = 0;
    for (const r of rows) {
      await client.query(`DROP SCHEMA IF EXISTS ${quoteIdent(r.schema_name)} CASCADE`);
      await client.query(
        `DELETE FROM _playground_meta.playground_sessions WHERE token_hash = $1`,
        [r.token_hash],
      );
      dropped++;
    }
    return { dropped };
  } finally {
    client.release();
  }
}

// ----- cookie helpers (route-handler context) -------------------------------

export async function readSessionCookieToken(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value ?? null;
}

export async function setSessionCookie(sessionId: string): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, signedToken(sessionId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1h; touch on every request extends server-side TTL
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

// ----- request → ip ---------------------------------------------------------

export function ipFromRequest(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "0.0.0.0";
}
