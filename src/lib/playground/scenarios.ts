import type { Scenario } from "./types.ts";

// Shared seed-table DDL run once per session bootstrap (by admin).
// Tables are owned by playground_admin so the executor role cannot DROP them
// even if the parser allowlist regresses.
export const SESSION_BOOTSTRAP_DDL = `
  CREATE TABLE accounts (
    id      int PRIMARY KEY,
    owner   text NOT NULL,
    balance int  NOT NULL
  );
  CREATE TABLE inventory (
    sku text PRIMARY KEY,
    qty int  NOT NULL
  );
  CREATE TABLE bookings (
    id   serial PRIMARY KEY,
    room int    NOT NULL,
    day  date   NOT NULL
  );
  CREATE TABLE doctors (
    name    text    PRIMARY KEY,
    on_call boolean NOT NULL
  );
  GRANT SELECT, INSERT, UPDATE, DELETE
    ON accounts, inventory, bookings, doctors
    TO playground_executor;
  GRANT USAGE ON SEQUENCE bookings_id_seq TO playground_executor;
`;

export const scenarios: Scenario[] = [
  {
    id: "dirty-read",
    title: "Dirty read",
    phenomenon: "Reading data another transaction has written but not committed.",
    blurb:
      "T1 mutates a row and pauses. T2 reads it. Did T2 see T1's uncommitted write? In Postgres the answer is always no — even under READ UNCOMMITTED, which PG silently aliases to READ COMMITTED. This scenario exists to make that aliasing visible.",
    resetSql: [
      "TRUNCATE accounts",
      "INSERT INTO accounts (id, owner, balance) VALUES (1, 'Alice', 1000)",
    ],
    steps: [
      { kind: "begin", tx: "T1" },
      {
        kind: "sql",
        tx: "T1",
        sql: "UPDATE accounts SET balance = 0 WHERE id = 1",
        note: "T1 zeroes Alice's balance — but does not commit yet.",
      },
      { kind: "begin", tx: "T2" },
      {
        kind: "sql",
        tx: "T2",
        sql: "SELECT balance FROM accounts WHERE id = 1",
        note: "True READ UNCOMMITTED would return 0. Postgres returns 1000.",
      },
      { kind: "rollback", tx: "T1" },
      {
        kind: "sql",
        tx: "T2",
        sql: "SELECT balance FROM accounts WHERE id = 1",
        note: "After T1 rolls back, T2 still sees 1000 — confirming no dirty read happened.",
      },
      { kind: "commit", tx: "T2" },
    ],
    variants: [
      {
        isolation: "READ UNCOMMITTED",
        description: "PG silently treats this as READ COMMITTED.",
        demonstrates: false,
      },
      {
        isolation: "READ COMMITTED",
        description: "Default. Dirty reads impossible.",
        demonstrates: false,
      },
    ],
  },

  {
    id: "non-repeatable-read",
    title: "Non-repeatable read",
    phenomenon: "The same row read twice in one transaction returns different values.",
    blurb:
      "T1 reads a row, T2 updates and commits, T1 reads the same row again. Under READ COMMITTED, T1's second read sees T2's new value. Under REPEATABLE READ or SERIALIZABLE, T1 keeps seeing the original value.",
    resetSql: [
      "TRUNCATE accounts",
      "INSERT INTO accounts (id, owner, balance) VALUES (1, 'Alice', 1000)",
    ],
    steps: [
      { kind: "begin", tx: "T1" },
      {
        kind: "sql",
        tx: "T1",
        sql: "SELECT balance FROM accounts WHERE id = 1",
        note: "T1's first read.",
      },
      { kind: "begin", tx: "T2" },
      {
        kind: "sql",
        tx: "T2",
        sql: "UPDATE accounts SET balance = 500 WHERE id = 1",
      },
      { kind: "commit", tx: "T2" },
      {
        kind: "sql",
        tx: "T1",
        sql: "SELECT balance FROM accounts WHERE id = 1",
        note: "RC: 500 (changed). RR / SER: 1000 (T1's snapshot is frozen).",
      },
      { kind: "commit", tx: "T1" },
    ],
    variants: [
      {
        isolation: "READ COMMITTED",
        description: "Each statement sees a fresh snapshot — T1's reads diverge.",
        demonstrates: true,
      },
      {
        isolation: "REPEATABLE READ",
        description: "T1's snapshot is taken at first read; later reads are stable.",
        demonstrates: false,
      },
      {
        isolation: "SERIALIZABLE",
        description: "Same snapshot guarantee as RR.",
        demonstrates: false,
      },
    ],
  },

  {
    id: "phantom-read",
    title: "Phantom read",
    phenomenon: "A predicate query returns a different set of rows on re-run.",
    blurb:
      "T1 counts rows matching a predicate, T2 inserts a new matching row and commits, T1 counts again. RC sees the new row appear (phantom). PG's REPEATABLE READ is stronger than the SQL standard requires and prevents phantoms entirely via snapshot isolation.",
    resetSql: [
      "TRUNCATE bookings RESTART IDENTITY",
      "INSERT INTO bookings (room, day) VALUES (1, '2026-06-01'), (2, '2026-06-01')",
    ],
    steps: [
      { kind: "begin", tx: "T1" },
      {
        kind: "sql",
        tx: "T1",
        sql: "SELECT count(*) AS bookings FROM bookings WHERE day = '2026-06-01'",
        note: "T1's first count.",
      },
      { kind: "begin", tx: "T2" },
      {
        kind: "sql",
        tx: "T2",
        sql: "INSERT INTO bookings (room, day) VALUES (7, '2026-06-01')",
      },
      { kind: "commit", tx: "T2" },
      {
        kind: "sql",
        tx: "T1",
        sql: "SELECT count(*) AS bookings FROM bookings WHERE day = '2026-06-01'",
        note: "RC: 3 (phantom appeared). RR / SER: 2 (frozen snapshot).",
      },
      { kind: "commit", tx: "T1" },
    ],
    variants: [
      {
        isolation: "READ COMMITTED",
        description: "Phantom row appears in T1's second count.",
        demonstrates: true,
      },
      {
        isolation: "REPEATABLE READ",
        description: "PG's snapshot iso prevents phantoms — stronger than the SQL standard.",
        demonstrates: false,
      },
      {
        isolation: "SERIALIZABLE",
        description: "Same guarantee as RR for this query shape.",
        demonstrates: false,
      },
    ],
  },

  {
    id: "lost-update",
    title: "Lost update",
    phenomenon: "Two transactions read the same value, decrement it, and one decrement vanishes.",
    blurb:
      "Both transactions read qty = 10. Both decide to write qty = 9 (10 minus 1). Under READ COMMITTED, the second writer silently overwrites the first — two decrements should have produced qty = 8, but the result is 9. Under REPEATABLE READ or SERIALIZABLE, PG detects the conflict and aborts the late writer with SQLSTATE 40001.",
    resetSql: [
      "TRUNCATE inventory",
      "INSERT INTO inventory (sku, qty) VALUES ('A', 10)",
    ],
    steps: [
      { kind: "begin", tx: "T1" },
      {
        kind: "sql",
        tx: "T1",
        sql: "SELECT qty FROM inventory WHERE sku = 'A'",
        note: "T1 reads 10.",
      },
      { kind: "begin", tx: "T2" },
      {
        kind: "sql",
        tx: "T2",
        sql: "SELECT qty FROM inventory WHERE sku = 'A'",
        note: "T2 also reads 10.",
      },
      {
        kind: "sql",
        tx: "T2",
        sql: "UPDATE inventory SET qty = 9 WHERE sku = 'A'",
        note: "T2 writes the 'I-saw-10-so-9' value.",
      },
      { kind: "commit", tx: "T2" },
      {
        kind: "sql",
        tx: "T1",
        sql: "UPDATE inventory SET qty = 9 WHERE sku = 'A'",
        note: "RC: silently succeeds, T2's decrement is lost. RR / SER: aborts with 40001.",
      },
      { kind: "commit", tx: "T1" },
      {
        kind: "sql",
        tx: "T1",
        sql: "SELECT qty FROM inventory WHERE sku = 'A'",
        note: "Should be 8 (two decrements). At RC: 9 — lost update.",
      },
    ],
    variants: [
      {
        isolation: "READ COMMITTED",
        description: "Lost update happens silently. Final qty is 9, not 8.",
        demonstrates: true,
      },
      {
        isolation: "REPEATABLE READ",
        description: "T1's UPDATE aborts with 40001 — application must retry.",
        demonstrates: false,
      },
      {
        isolation: "SERIALIZABLE",
        description: "Same protection as RR for single-row writes.",
        demonstrates: false,
      },
    ],
  },

  {
    id: "write-skew",
    title: "Write skew",
    phenomenon: "Two transactions each preserve an invariant individually but violate it together.",
    blurb:
      "Invariant: at least one doctor is on call. Both transactions read 'two doctors on call', each concludes it's safe to take one off. Under REPEATABLE READ both commits succeed and the invariant is broken — zero doctors on call. SERIALIZABLE (Postgres SSI) detects the conflict and aborts one transaction with 40001. This is the cleanest argument for SERIALIZABLE.",
    resetSql: [
      "TRUNCATE doctors",
      "INSERT INTO doctors (name, on_call) VALUES ('Alice', true), ('Bob', true)",
    ],
    steps: [
      { kind: "begin", tx: "T1" },
      {
        kind: "sql",
        tx: "T1",
        sql: "SELECT count(*) AS on_call FROM doctors WHERE on_call",
        note: "T1 sees 2 — safe to go off-call.",
      },
      { kind: "begin", tx: "T2" },
      {
        kind: "sql",
        tx: "T2",
        sql: "SELECT count(*) AS on_call FROM doctors WHERE on_call",
        note: "T2 also sees 2 — same conclusion.",
      },
      {
        kind: "sql",
        tx: "T1",
        sql: "UPDATE doctors SET on_call = false WHERE name = 'Alice'",
      },
      {
        kind: "sql",
        tx: "T2",
        sql: "UPDATE doctors SET on_call = false WHERE name = 'Bob'",
      },
      { kind: "commit", tx: "T1" },
      {
        kind: "commit",
        tx: "T2",
        // At SER, this commit fails with 40001 ('could not serialize').
      },
      {
        kind: "sql",
        tx: "T1",
        sql: "SELECT count(*) AS on_call FROM doctors WHERE on_call",
        note: "At RR: 0 — invariant violated. At SER: T2 aborted, value is 1.",
      },
    ],
    variants: [
      {
        isolation: "REPEATABLE READ",
        description: "Both transactions commit. Invariant 'at least one on call' is violated.",
        demonstrates: true,
      },
      {
        isolation: "SERIALIZABLE",
        description: "PG's SSI detects the conflict and aborts T2 with 40001.",
        demonstrates: false,
      },
    ],
  },
];

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}
