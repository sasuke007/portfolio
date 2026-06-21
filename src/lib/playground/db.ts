import { Client, Pool, type ClientConfig } from "pg";

// ----- env access ------------------------------------------------------------

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function adminConnectionString(): string {
  return requireEnv("DATABASE_URL_UNPOOLED");
}

function executorConnectionString(): string {
  return requireEnv("PLAYGROUND_EXECUTOR_URL");
}

// ----- admin pool ------------------------------------------------------------

let _adminPool: Pool | null = null;

/**
 * Connection pool for the admin (neondb_owner) role. Used for schema
 * create/drop, session bookkeeping, and the per-session bootstrap DDL.
 * Never used to execute user-supplied SQL.
 */
export function adminPool(): Pool {
  if (_adminPool) return _adminPool;
  _adminPool = new Pool({
    connectionString: adminConnectionString(),
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });
  return _adminPool;
}

// ----- executor client factory ----------------------------------------------

/**
 * Creates a fresh executor Client pinned to one session schema. The
 * playground_login role inherits playground_executor which has only DML
 * privileges on the seed tables. The search_path is locked at connection
 * time via the `options` URI param so every query is resolved inside the
 * session's schema. We re-issue `SET LOCAL search_path` at BEGIN time as
 * defense in depth.
 *
 * Caller is responsible for `client.end()` when done.
 */
export async function executorClient(sessionSchema: string): Promise<Client> {
  const baseUrl = executorConnectionString();
  const url = new URL(baseUrl);
  // Append search_path via the `options` URL parameter — Postgres applies
  // these at session-start time, so the executor never sees the default
  // search_path. If existing options are already set, append; otherwise set.
  const existingOptions = url.searchParams.get("options");
  const sp = `-csearch_path=${sessionSchema}`;
  url.searchParams.set(
    "options",
    existingOptions ? `${existingOptions} ${sp}` : sp,
  );

  const config: ClientConfig = {
    connectionString: url.toString(),
    statement_timeout: 2_000,
    query_timeout: 3_000,
    connectionTimeoutMillis: 5_000,
  };
  const client = new Client(config);
  await client.connect();
  return client;
}

// ----- identifier quoting ----------------------------------------------------

/**
 * Quote a Postgres identifier — only used for schema names that we
 * control end-to-end (built from a custom-alphabet nanoid).
 * Throws if the name contains a double quote (defense in depth).
 */
export function quoteIdent(name: string): string {
  if (name.includes('"')) {
    throw new Error(`unsafe identifier: ${name}`);
  }
  return `"${name}"`;
}
