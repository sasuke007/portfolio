import type { StepResultRow } from "@/lib/playground/types";

export function ResultTable({
  rows,
  rowCount,
  truncated,
}: {
  rows?: StepResultRow[];
  rowCount?: number;
  truncated?: boolean;
}) {
  if (!rows || rows.length === 0) {
    return (
      <p className="label-micro">
        {typeof rowCount === "number"
          ? `${rowCount} row${rowCount === 1 ? "" : "s"} affected`
          : "no rows"}
      </p>
    );
  }
  const cols = Object.keys(rows[0]);
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse font-mono text-xs">
        <thead>
          <tr className="border-b border-black/10 text-left">
            {cols.map((c) => (
              <th key={c} className="px-2 py-1 font-medium opacity-70">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-black/5">
              {cols.map((c) => (
                <td key={c} className="px-2 py-1">
                  {formatCell(row[c])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {truncated && (
        <p className="label-micro mt-1">…rows truncated at 200</p>
      )}
    </div>
  );
}

function formatCell(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}
