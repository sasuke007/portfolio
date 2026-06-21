import { parse, astVisitor, type Statement } from "pgsql-ast-parser";

export type GuardOk = { ok: true; statementType: string };
export type GuardError = { ok: false; reason: string };
export type GuardResult = GuardOk | GuardError;

const MAX_SQL_BYTES = 4096;

// Statement .type values we accept. Anything else (do, set, set global, set
// timezone, set names, drop *, create *, alter *, truncate table, comment,
// raise, prepare, deallocate, show, refresh materialized view, tablespace,
// create function, drop function) is rejected outright.
const ALLOWED_STATEMENT_TYPES = new Set<string>([
  "select",
  "insert",
  "update",
  "delete",
  "with",
  "with recursive",
  "values",
  "union",
  "union all",
  "begin",
  "start transaction",
  "commit",
  "rollback",
]);

// Function name denylist (case-insensitive, exact match).
const DENIED_FUNCTIONS = new Set<string>([
  "pg_read_file",
  "pg_read_binary_file",
  "pg_ls_dir",
  "pg_ls_logdir",
  "pg_ls_waldir",
  "pg_stat_file",
  "lo_import",
  "lo_export",
  "lo_get",
  "lo_put",
  "lo_from_bytea",
  "pg_sleep",
  "pg_sleep_for",
  "pg_sleep_until",
  "pg_terminate_backend",
  "pg_cancel_backend",
  "pg_reload_conf",
  "pg_rotate_logfile",
  "pg_promote",
]);

// Function name prefix denylist (case-insensitive). Catches dblink_*,
// pg_logical_*, pg_replication_*, pg_stat_* (for the function-call form),
// and any future variants.
const DENIED_FUNCTION_PREFIXES = ["dblink", "pg_logical_", "pg_replication_"];

// Pre-parse hard blocks. The parser already rejects COPY syntax but we still
// guard the keyword in case a future parser version adds support.
const PRE_PARSE_BLOCKLIST = [/\bcopy\b/i];

export function validateUserSql(
  sql: string,
  sessionSchema: string,
): GuardResult {
  const trimmed = sql.trim();

  if (trimmed.length === 0) {
    return { ok: false, reason: "empty statement" };
  }
  if (Buffer.byteLength(trimmed, "utf8") > MAX_SQL_BYTES) {
    return { ok: false, reason: "statement exceeds 4KB limit" };
  }
  for (const re of PRE_PARSE_BLOCKLIST) {
    if (re.test(trimmed)) {
      return { ok: false, reason: "statement contains a disallowed keyword" };
    }
  }

  let statements: Statement[];
  try {
    statements = parse(trimmed);
  } catch {
    return { ok: false, reason: "invalid SQL syntax" };
  }

  if (statements.length === 0) {
    return { ok: false, reason: "no statement parsed" };
  }
  if (statements.length > 1) {
    return {
      ok: false,
      reason: "only one statement is allowed per request",
    };
  }

  const stmt = statements[0];
  if (!ALLOWED_STATEMENT_TYPES.has(stmt.type)) {
    return {
      ok: false,
      reason: `statement type "${stmt.type}" is not allowed`,
    };
  }

  const violation = findIdentifierViolation(stmt, sessionSchema);
  if (violation) return { ok: false, reason: violation };

  return { ok: true, statementType: stmt.type };
}

function findIdentifierViolation(
  stmt: Statement,
  sessionSchema: string,
): string | null {
  let firstViolation: string | null = null;
  const record = (msg: string) => {
    if (firstViolation === null) firstViolation = msg;
  };

  const visitor = astVisitor((v) => ({
    tableRef: (t) => {
      if (t.schema && t.schema !== sessionSchema) {
        record(
          `table reference to schema "${t.schema}" is not allowed`,
        );
      }
      v.super().tableRef(t);
    },
    call: (c) => {
      const fnName = c.function.name.toLowerCase();
      const fnSchema = c.function.schema;
      if (fnSchema && fnSchema !== sessionSchema) {
        record(
          `function call qualified with schema "${fnSchema}" is not allowed`,
        );
      }
      if (DENIED_FUNCTIONS.has(fnName)) {
        record(`function "${fnName}" is not allowed`);
      }
      for (const prefix of DENIED_FUNCTION_PREFIXES) {
        if (fnName.startsWith(prefix)) {
          record(`function "${fnName}" is not allowed`);
          break;
        }
      }
      v.super().call(c);
    },
    ref: (r) => {
      if (r.table?.schema && r.table.schema !== sessionSchema) {
        record(
          `column reference qualified with schema "${r.table.schema}" is not allowed`,
        );
      }
      v.super().ref(r);
    },
  }));

  visitor.statement(stmt);
  return firstViolation;
}
