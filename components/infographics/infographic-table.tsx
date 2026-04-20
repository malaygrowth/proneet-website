import {
  GlassPanel,
  InfographicGround,
  InfographicEyebrow,
} from "./glass-panel";

// Glass-styled data table. First column is label weight, numeric cells
// are right-aligned mono. Optionally highlight one row as "our tier".
// Use for fee breakdowns, keyword volume comparisons, schedule tables.

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right";
  numeric?: boolean;
}

export interface TableRow {
  [key: string]: string | number;
}

interface InfographicTableProps {
  eyebrow?: string;
  heading: string;
  columns: TableColumn[];
  rows: TableRow[];
  highlightRowIndex?: number;
  footnote?: string;
}

export function InfographicTable({
  eyebrow,
  heading,
  columns,
  rows,
  highlightRowIndex,
  footnote,
}: InfographicTableProps) {
  return (
    <InfographicGround>
      {eyebrow && <InfographicEyebrow>{eyebrow}</InfographicEyebrow>}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
        {heading}
      </h3>

      <GlassPanel padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-200/60">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`p-3 sm:p-4 font-mono text-[11px] uppercase tracking-widest text-slate-500 ${
                      col.align === "right" || col.numeric
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isHighlight = i === highlightRowIndex;
                return (
                  <tr
                    key={i}
                    className={`border-b border-slate-100/80 last:border-b-0 ${
                      isHighlight ? "bg-brand/[0.04]" : ""
                    }`}
                  >
                    {columns.map((col, ci) => {
                      const isFirst = ci === 0;
                      const isNumeric = col.numeric || col.align === "right";
                      return (
                        <td
                          key={col.key}
                          className={`p-3 sm:p-4 ${
                            isNumeric ? "text-right font-mono" : "text-left"
                          } ${
                            isFirst
                              ? "font-semibold text-slate-900"
                              : "text-slate-600"
                          } ${
                            isHighlight && isFirst ? "text-brand" : ""
                          }`}
                        >
                          {row[col.key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassPanel>

      {footnote && (
        <p className="mt-5 text-[11px] font-mono text-slate-400">
          {footnote}
        </p>
      )}
    </InfographicGround>
  );
}
