import { useState } from "react";
import type { IsoLevel, TxId } from "@/lib/playground/types";
import { freeformStep, resetFreeform } from "./transport";
import { ResultTable } from "./ResultTable";

type TranscriptEntry = {
  tx: TxId;
  label: string;
  result?: Awaited<ReturnType<typeof freeformStep>>;
};

const ISOLATIONS: IsoLevel[] = [
  "READ COMMITTED",
  "REPEATABLE READ",
  "SERIALIZABLE",
];

export function FreeformPanel() {
  const [t1, setT1] = useState("SELECT * FROM accounts");
  const [t2, setT2] = useState("UPDATE accounts SET balance = balance - 10 WHERE id = 1");
  const [iso, setIso] = useState<IsoLevel>("READ COMMITTED");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [busy, setBusy] = useState(false);

  async function send(tx: TxId, action: "begin" | "sql" | "commit" | "rollback") {
    setBusy(true);
    try {
      const sql = tx === "T1" ? t1 : t2;
      const body =
        action === "sql"
          ? { action: "sql" as const, tx, sql }
          : action === "begin"
            ? { action: "begin" as const, tx, isolation: iso }
            : { action, tx };
      const result = await freeformStep(body);
      const label =
        action === "sql"
          ? sql
          : action === "begin"
            ? `BEGIN ISOLATION LEVEL ${iso}`
            : action.toUpperCase();
      setTranscript((prev) => [...prev, { tx, label, result }]);
    } catch (e) {
      setTranscript((prev) => [
        ...prev,
        {
          tx,
          label: `(transport) ${action}`,
          result: {
            tx,
            action,
            durationMs: 0,
            error: { sqlstate: "PGP02", message: String(e) },
          },
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  async function onReset() {
    setBusy(true);
    try {
      await resetFreeform();
      setTranscript([]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="label-micro">isolation (for next BEGIN)</span>
        <div className="flex gap-1">
          {ISOLATIONS.map((i) => (
            <button
              key={i}
              onClick={() => setIso(i)}
              className={
                "rounded-full border px-3 py-1 font-mono text-xs transition-colors " +
                (i === iso
                  ? "border-black bg-black text-white"
                  : "border-black/15")
              }
            >
              {i}
            </button>
          ))}
        </div>
        <button
          onClick={onReset}
          disabled={busy}
          className="ml-auto rounded-full border border-black/15 px-3 py-1 font-mono text-xs hover:border-black/30 disabled:opacity-40"
        >
          reset sessions
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TxPanel
          label="T1"
          value={t1}
          onChange={setT1}
          onBegin={() => send("T1", "begin")}
          onRun={() => send("T1", "sql")}
          onCommit={() => send("T1", "commit")}
          onRollback={() => send("T1", "rollback")}
          busy={busy}
        />
        <TxPanel
          label="T2"
          value={t2}
          onChange={setT2}
          onBegin={() => send("T2", "begin")}
          onRun={() => send("T2", "sql")}
          onCommit={() => send("T2", "commit")}
          onRollback={() => send("T2", "rollback")}
          busy={busy}
        />
      </div>

      <div className="rounded-md border border-black/10 bg-white/40 p-3">
        <div className="label-micro mb-3 flex items-center justify-between">
          <span>transcript</span>
          {transcript.length > 0 && (
            <button
              onClick={() => setTranscript([])}
              className="label-micro hover:opacity-100"
            >
              clear
            </button>
          )}
        </div>
        {transcript.length === 0 ? (
          <p className="label-micro italic">no statements yet.</p>
        ) : (
          <ol className="flex flex-col gap-3">
            {transcript.map((t, i) => (
              <li
                key={i}
                className="border-b border-black/5 pb-2 last:border-0"
              >
                <div className="label-micro mb-1 flex items-center gap-2">
                  <span className="font-medium">{t.tx}</span>
                  <span>·</span>
                  <span>{t.result?.durationMs ?? 0}ms</span>
                </div>
                <code className="block whitespace-pre-wrap break-all font-mono text-xs">
                  {t.label}
                </code>
                {t.result?.error && (
                  <p className="font-mono text-xs text-rose-600">
                    {t.result.error.sqlstate}: {t.result.error.message}
                  </p>
                )}
                {t.result && !t.result.error && (
                  <ResultTable
                    rows={t.result.rows}
                    rowCount={t.result.rowCount}
                    truncated={t.result.truncated}
                  />
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function TxPanel({
  label,
  value,
  onChange,
  onBegin,
  onRun,
  onCommit,
  onRollback,
  busy,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBegin: () => void;
  onRun: () => void;
  onCommit: () => void;
  onRollback: () => void;
  busy: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-black/10 bg-white/40 p-3">
      <div className="label-micro font-medium uppercase">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        rows={6}
        className="rounded border border-black/10 bg-white p-2 font-mono text-xs focus:border-black/30 focus:outline-none"
      />
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onBegin}
          disabled={busy}
          className="rounded-full border border-black/15 px-3 py-1 font-mono text-xs hover:border-black/30 disabled:opacity-40"
        >
          begin
        </button>
        <button
          onClick={onRun}
          disabled={busy}
          className="rounded-full bg-black px-3 py-1 font-mono text-xs text-white hover:opacity-80 disabled:opacity-40"
        >
          run
        </button>
        <button
          onClick={onCommit}
          disabled={busy}
          className="rounded-full border border-black/15 px-3 py-1 font-mono text-xs hover:border-black/30 disabled:opacity-40"
        >
          commit
        </button>
        <button
          onClick={onRollback}
          disabled={busy}
          className="rounded-full border border-black/15 px-3 py-1 font-mono text-xs hover:border-black/30 disabled:opacity-40"
        >
          rollback
        </button>
      </div>
    </div>
  );
}
