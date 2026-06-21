export type IsoLevel =
  | "READ UNCOMMITTED"
  | "READ COMMITTED"
  | "REPEATABLE READ"
  | "SERIALIZABLE";

export type TxId = "T1" | "T2";

export type Step =
  | { kind: "begin"; tx: TxId }
  | { kind: "sql"; tx: TxId; sql: string; note?: string }
  | { kind: "commit"; tx: TxId }
  | { kind: "rollback"; tx: TxId }
  | { kind: "wait"; ms: number };

export type ScenarioId =
  | "dirty-read"
  | "non-repeatable-read"
  | "phantom-read"
  | "lost-update"
  | "write-skew";

export type Variant = {
  isolation: IsoLevel;
  description: string;
  /** True if this scenario *exhibits the phenomenon* at this isolation level. */
  demonstrates: boolean;
};

export type Scenario = {
  id: ScenarioId;
  title: string;
  phenomenon: string;
  /** One-paragraph plain-language explanation shown above the timeline. */
  blurb: string;
  /** SQL run by the admin role before each play — truncates + reseeds. */
  resetSql: string[];
  steps: Step[];
  variants: Variant[];
};

export type StepResultRow = Record<string, unknown>;

export type StepResult =
  | {
      stepIndex: number;
      kind: "begin" | "commit" | "rollback";
      tx: TxId;
      isolation?: IsoLevel;
      durationMs: number;
      error?: { sqlstate: string; message: string };
    }
  | {
      stepIndex: number;
      kind: "sql";
      tx: TxId;
      sql: string;
      note?: string;
      rows?: StepResultRow[];
      rowCount?: number;
      durationMs: number;
      truncated?: boolean;
      error?: { sqlstate: string; message: string };
    }
  | {
      stepIndex: number;
      kind: "wait";
      ms: number;
      durationMs: number;
    }
  | {
      stepIndex: number;
      kind: "done";
      durationMs: number;
    }
  | {
      stepIndex: number;
      kind: "aborted";
      reason: string;
    };
