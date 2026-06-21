"use client";

import { useEffect, useState } from "react";
import type { IsoLevel, Scenario, StepResult } from "@/lib/playground/types";
import { runScenario } from "./transport";
import { ScenarioPicker } from "./ScenarioPicker";
import { Timeline } from "./Timeline";
import { FreeformPanel } from "./FreeformPanel";

type Tab = "scenarios" | "freeform";

export function Playground() {
  const [tab, setTab] = useState<Tab>("scenarios");
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isolation, setIsolation] = useState<IsoLevel>("READ COMMITTED");
  const [events, setEvents] = useState<StepResult[]>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    fetch("/api/playground/scenarios")
      .then((r) => r.json())
      .then((d: { scenarios: Scenario[] }) => {
        setScenarios(d.scenarios);
        if (d.scenarios[0]) {
          setSelectedId(d.scenarios[0].id);
          setIsolation(d.scenarios[0].variants[0]?.isolation ?? "READ COMMITTED");
        }
      })
      .catch(() => undefined);
  }, []);

  const selected = scenarios.find((s) => s.id === selectedId) ?? null;

  async function onPlay() {
    if (!selected) return;
    setEvents([]);
    setRunning(true);
    try {
      for await (const ev of runScenario({
        scenarioId: selected.id,
        isolation,
      })) {
        setEvents((prev) => [...prev, ev]);
      }
    } finally {
      setRunning(false);
    }
  }

  return (
    <section className="my-12 flex flex-col gap-6 rounded-lg border border-black/10 bg-white/60 p-5">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl">interactive playground</h3>
        <nav className="flex gap-1 text-xs">
          <TabBtn current={tab} value="scenarios" onClick={setTab}>
            scenarios
          </TabBtn>
          <TabBtn current={tab} value="freeform" onClick={setTab}>
            free-form sql
          </TabBtn>
        </nav>
      </header>

      {tab === "scenarios" && (
        <>
          <ScenarioPicker
            scenarios={scenarios}
            selectedId={selectedId}
            onSelect={(id) => {
              setSelectedId(id);
              setEvents([]);
              const s = scenarios.find((x) => x.id === id);
              if (s?.variants[0]) setIsolation(s.variants[0].isolation);
            }}
            isolation={isolation}
            onIsolation={setIsolation}
            onPlay={onPlay}
            running={running}
          />
          {selected && (
            <Timeline
              scenario={selected}
              events={events}
              running={running}
            />
          )}
        </>
      )}

      {tab === "freeform" && (
        <>
          <p className="body-editorial">
            Two transactions, your SQL. Server-side guards: parser allowlist,
            session-schema lock-down, 2s statement timeout, DML-only role.
          </p>
          <FreeformPanel />
        </>
      )}
    </section>
  );
}

function TabBtn({
  current,
  value,
  onClick,
  children,
}: {
  current: Tab;
  value: Tab;
  onClick: (v: Tab) => void;
  children: React.ReactNode;
}) {
  const active = current === value;
  return (
    <button
      onClick={() => onClick(value)}
      className={
        "rounded-full px-3 py-1 font-mono transition-colors " +
        (active ? "bg-black text-white" : "hover:bg-black/5")
      }
    >
      {children}
    </button>
  );
}
