import type { Scenario, StepResult } from "@/lib/playground/types";
import { ResultTable } from "./ResultTable";

type Event = Extract<
  StepResult,
  { stepIndex: number; kind: "begin" | "commit" | "rollback" | "sql" | "wait" }
>;

export function Timeline({
  scenario,
  events,
  running,
}: {
  scenario: Scenario;
  events: StepResult[];
  running: boolean;
}) {
  // We render the static scenario timeline (always visible) and overlay
  // per-step result chips as events stream in. This makes "what's about
  // to happen" legible even before play.
  const eventByIndex = new Map<number, Event>();
  for (const e of events) {
    if (e.kind === "done" || e.kind === "aborted") continue;
    eventByIndex.set(e.stepIndex, e as Event);
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Column
        label="T1"
        scenario={scenario}
        eventByIndex={eventByIndex}
        running={running}
        whichTx="T1"
      />
      <Column
        label="T2"
        scenario={scenario}
        eventByIndex={eventByIndex}
        running={running}
        whichTx="T2"
      />
    </div>
  );
}

function Column({
  label,
  scenario,
  eventByIndex,
  whichTx,
}: {
  label: string;
  scenario: Scenario;
  eventByIndex: Map<number, Event>;
  running: boolean;
  whichTx: "T1" | "T2";
}) {
  return (
    <div className="rounded-md border border-black/10 bg-white/40 p-3">
      <div className="label-micro mb-3 flex items-center justify-between">
        <span className="font-medium uppercase">{label}</span>
      </div>
      <ol className="flex flex-col gap-3">
        {scenario.steps.map((step, idx) => {
          const isThis =
            "tx" in step ? step.tx === whichTx : step.kind === "wait";
          if (!isThis) {
            return (
              <li
                key={idx}
                className="rounded border border-dashed border-black/5 px-2 py-1 text-xs opacity-30"
              >
                <span className="label-micro">step {idx + 1}</span>
              </li>
            );
          }
          const ev = eventByIndex.get(idx);
          return (
            <li
              key={idx}
              className={
                "rounded border px-2 py-2 text-xs transition-colors " +
                (ev
                  ? ev.kind === "sql" && ev.error
                    ? "border-rose-500/40 bg-rose-50"
                    : "border-emerald-500/40 bg-emerald-50"
                  : "border-black/10 bg-white")
              }
            >
              <StepBody step={step} idx={idx} ev={ev} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StepBody({
  step,
  idx,
  ev,
}: {
  step: Scenario["steps"][number];
  idx: number;
  ev: Event | undefined;
}) {
  const indexLabel = (
    <span className="label-micro mr-2">step {idx + 1}</span>
  );

  switch (step.kind) {
    case "wait":
      return (
        <span className="font-mono">
          {indexLabel}wait {step.ms}ms
        </span>
      );
    case "begin":
      return (
        <span className="font-mono">
          {indexLabel}BEGIN
          {ev && ev.kind === "begin" && ev.isolation
            ? ` ISOLATION LEVEL ${ev.isolation}`
            : ""}
        </span>
      );
    case "commit":
    case "rollback":
      return (
        <span className="font-mono">
          {indexLabel}
          {step.kind.toUpperCase()}
          {ev && ev.kind !== "sql" && ev.kind !== "wait" && ev.error && (
            <span className="ml-2 text-rose-600">
              {ev.error.sqlstate}: {ev.error.message}
            </span>
          )}
        </span>
      );
    case "sql":
      return (
        <div className="flex flex-col gap-1">
          <code className="font-mono whitespace-pre-wrap break-all">
            {indexLabel}
            {step.sql}
          </code>
          {step.note && (
            <p className="body-editorial text-[11px] italic">{step.note}</p>
          )}
          {ev && ev.kind === "sql" && ev.error && (
            <p className="text-rose-600 font-mono">
              {ev.error.sqlstate}: {ev.error.message}
            </p>
          )}
          {ev && ev.kind === "sql" && !ev.error && (
            <ResultTable
              rows={ev.rows}
              rowCount={ev.rowCount}
              truncated={ev.truncated}
            />
          )}
        </div>
      );
  }
}
