// Map of Postgres SQLSTATE codes to UI-safe messages.
// We never echo err.message / err.where / err.file / err.line — those can leak
// internals (schema names, file paths, table OIDs). The SQLSTATE itself is a
// public identifier per the SQL spec.
const FRIENDLY: Record<string, string> = {
  // Transaction isolation
  "40001": "Could not serialize access due to concurrent update — retry the transaction.",
  "40P01": "Deadlock detected.",
  // Integrity constraints
  "23505": "Duplicate key — this value already exists.",
  "23503": "Foreign key violation.",
  "23502": "Not-null violation.",
  "23514": "Check constraint violated.",
  // Data
  "22001": "String value too long.",
  "22003": "Numeric value out of range.",
  "22012": "Division by zero.",
  "22023": "Invalid parameter value.",
  // Syntax / lookup
  "42601": "SQL syntax error.",
  "42P01": "Table does not exist.",
  "42703": "Column does not exist.",
  "42883": "Function does not exist.",
  "42501": "Insufficient privilege.",
  // Limits
  "57014": "Statement was canceled (timeout exceeded).",
  "53200": "Out of memory.",
  "53300": "Too many connections.",
  "54000": "Program limit exceeded.",
  "55P03": "Lock not available (lock_timeout exceeded).",
  // Transaction state
  "25001": "Already inside a transaction.",
  "25P01": "No active transaction.",
  "25P02": "Transaction is aborted — issue ROLLBACK before further commands.",
  "25006": "Transaction is read-only.",
};

export function friendlyMessage(sqlstate: string | undefined): string {
  if (!sqlstate) return "Query failed.";
  return FRIENDLY[sqlstate] ?? `Query failed (SQLSTATE ${sqlstate}).`;
}

export type SanitizedPgError = { sqlstate: string; message: string };

export function sanitizePgError(err: unknown): SanitizedPgError {
  const sqlstate =
    typeof err === "object" && err !== null && "code" in err && typeof (err as { code: unknown }).code === "string"
      ? ((err as { code: string }).code)
      : "UNKNOWN";
  return { sqlstate, message: friendlyMessage(sqlstate) };
}
