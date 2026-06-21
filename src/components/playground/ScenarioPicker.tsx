import type { IsoLevel, Scenario } from "@/lib/playground/types";

export function ScenarioPicker({
  scenarios,
  selectedId,
  onSelect,
  isolation,
  onIsolation,
  onPlay,
  running,
}: {
  scenarios: Scenario[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isolation: IsoLevel;
  onIsolation: (iso: IsoLevel) => void;
  onPlay: () => void;
  running: boolean;
}) {
  const selected = scenarios.find((s) => s.id === selectedId) ?? null;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={
              "rounded-md border px-3 py-2 text-left transition-colors " +
              (s.id === selectedId
                ? "border-black/40 bg-black/5"
                : "border-black/10 hover:border-black/20")
            }
          >
            <div className="font-display text-base">{s.title}</div>
            <div className="label-micro mt-1">{s.id}</div>
          </button>
        ))}
      </div>

      {selected && (
        <>
          <p className="body-editorial">{selected.blurb}</p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="label-micro">isolation</span>
            <div className="flex flex-wrap gap-1">
              {selected.variants.map((v) => (
                <button
                  key={v.isolation}
                  onClick={() => onIsolation(v.isolation)}
                  className={
                    "rounded-full border px-3 py-1 font-mono text-xs transition-colors " +
                    (v.isolation === isolation
                      ? "border-black bg-black text-white"
                      : "border-black/15 hover:border-black/30")
                  }
                  title={v.description}
                >
                  {v.isolation}
                  {v.demonstrates && (
                    <span className="ml-1 opacity-60">★</span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={onPlay}
              disabled={running}
              className="ml-auto rounded-full bg-black px-4 py-1.5 font-mono text-xs text-white transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {running ? "running…" : "▶ play"}
            </button>
          </div>

          <p className="label-micro">
            ★ marks isolation levels that exhibit the phenomenon.
          </p>
        </>
      )}
    </div>
  );
}
