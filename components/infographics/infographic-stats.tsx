import {
  GlassPanel,
  InfographicGround,
  InfographicEyebrow,
} from "./glass-panel";

// 2-4 stat cards in a row. Each card: big mono number, label, optional
// sublabel. Use for headline stats: "1000+ selections", "30-seat cap",
// "20+ years", etc. More than 4 values → use InfographicBars instead.

export interface InfographicStatValue {
  value: string;
  label: string;
  sublabel?: string;
}

interface InfographicStatsProps {
  eyebrow?: string;
  heading?: string;
  values: InfographicStatValue[];
  footnote?: string;
}

export function InfographicStats({
  eyebrow,
  heading,
  values,
  footnote,
}: InfographicStatsProps) {
  const cols =
    values.length === 2
      ? "sm:grid-cols-2"
      : values.length === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <InfographicGround>
      {eyebrow && <InfographicEyebrow>{eyebrow}</InfographicEyebrow>}
      {heading && (
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
          {heading}
        </h3>
      )}
      <div className={`grid gap-4 ${cols}`}>
        {values.map((v, i) => {
          const accentText = i % 2 === 0 ? "text-brand" : "text-accent-orange";
          return (
            <GlassPanel key={v.label} padding="md" className="text-center">
              <p
                className={`font-mono font-extrabold text-3xl sm:text-4xl ${accentText}`}
              >
                {v.value}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-600 uppercase tracking-wider">
                {v.label}
              </p>
              {v.sublabel && (
                <p className="mt-1 text-[11px] text-slate-400">
                  {v.sublabel}
                </p>
              )}
            </GlassPanel>
          );
        })}
      </div>
      {footnote && (
        <p className="mt-5 text-[11px] font-mono text-slate-400">
          {footnote}
        </p>
      )}
    </InfographicGround>
  );
}
