import {
  GlassPanel,
  InfographicGround,
  InfographicEyebrow,
} from "./glass-panel";

// Horizontal bar chart. 2-5 values. Alternates blue/orange. Suitable
// for Jaipur NEET volume by keyword, coaching fee tiers, selection
// counts, etc.
//
// Values are rendered as mono numbers right-aligned. Bars are
// absolutely sized against `max` (auto-detected if omitted).

export interface BarValue {
  label: string;
  sublabel?: string;
  value: number;
  displayValue?: string; // override the rendered number (e.g. "₹1.6-2.8 L")
}

interface InfographicBarsProps {
  eyebrow?: string;
  heading: string;
  values: BarValue[];
  max?: number;
  axisLabel?: string;
  footnote?: string;
}

export function InfographicBars({
  eyebrow,
  heading,
  values,
  max,
  axisLabel,
  footnote,
}: InfographicBarsProps) {
  const resolvedMax = max ?? Math.max(...values.map((v) => v.value)) * 1.1;

  return (
    <InfographicGround>
      {eyebrow && <InfographicEyebrow>{eyebrow}</InfographicEyebrow>}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
        {heading}
      </h3>

      <GlassPanel padding="lg">
        {axisLabel && (
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-4">
            {axisLabel}
          </p>
        )}
        <div className="space-y-4">
          {values.map((v, i) => {
            const widthPct = Math.max((v.value / resolvedMax) * 100, 3);
            const isBlue = i % 2 === 0;
            return (
              <div key={v.label}>
                <div className="flex items-baseline justify-between mb-1.5 gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {v.label}
                    </p>
                    {v.sublabel && (
                      <p className="text-xs text-slate-400">{v.sublabel}</p>
                    )}
                  </div>
                  <span
                    className={`font-mono font-bold text-base ${
                      isBlue ? "text-brand" : "text-accent-orange"
                    }`}
                  >
                    {v.displayValue ?? v.value.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100/80 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${widthPct}%`,
                      background: isBlue
                        ? "linear-gradient(90deg, #60A5FA, #2563EB)"
                        : "linear-gradient(90deg, #FDBA74, #F97316)",
                    }}
                  />
                </div>
              </div>
            );
          })}
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
