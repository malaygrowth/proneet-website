import type { ReactNode } from "react";
import {
  GlassPanel,
  InfographicGround,
  InfographicEyebrow,
} from "./glass-panel";

// Two side-by-side contrast panels. Designed for "X vs Y" framings
// common in ProNEET content: 30-seat vs 300-seat, Jaipur vs Kota,
// senior vs junior faculty, etc.
//
// Left panel uses brand blue; right uses accent orange. Never reverse.

export interface ComparePanel {
  title: string;
  subtitle?: string;
  stat: string;
  statLabel?: string;
  bullets: string[];
  verdict?: string;
}

interface InfographicCompareProps {
  eyebrow?: string;
  heading: string;
  left: ComparePanel;
  right: ComparePanel;
  footnote?: string;
}

export function InfographicCompare({
  eyebrow,
  heading,
  left,
  right,
  footnote,
}: InfographicCompareProps) {
  return (
    <InfographicGround>
      {eyebrow && <InfographicEyebrow>{eyebrow}</InfographicEyebrow>}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
        {heading}
      </h3>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
        <SideGlass accent="blue" panel={left} />
        <SideGlass accent="orange" panel={right} />
      </div>

      {footnote && (
        <p className="mt-5 text-[11px] font-mono text-slate-400">
          {footnote}
        </p>
      )}
    </InfographicGround>
  );
}

function SideGlass({
  accent,
  panel,
}: {
  accent: "blue" | "orange";
  panel: ComparePanel;
}) {
  const accentText = accent === "blue" ? "text-brand" : "text-accent-orange";
  const accentBg =
    accent === "blue" ? "bg-brand/10" : "bg-accent-orange/10";
  const accentBorder =
    accent === "blue" ? "ring-brand/30" : "ring-accent-orange/30";
  return (
    <GlassPanel className={`ring-1 ${accentBorder}`} padding="lg">
      <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${accentBg}`}>
        <span className={`font-mono text-[10px] uppercase tracking-widest ${accentText}`}>
          {panel.subtitle || panel.title.split(" ")[0]}
        </span>
      </div>
      <h4 className="mt-3 text-base sm:text-lg font-bold text-slate-900">
        {panel.title}
      </h4>
      <div className="mt-5 flex items-baseline gap-3">
        <span className={`font-mono font-extrabold text-4xl sm:text-5xl ${accentText}`}>
          {panel.stat}
        </span>
        {panel.statLabel && (
          <span className="text-xs uppercase tracking-wider text-slate-400">
            {panel.statLabel}
          </span>
        )}
      </div>
      <ul className="mt-5 space-y-2">
        {panel.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
            <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${accent === "blue" ? "bg-brand" : "bg-accent-orange"}`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {panel.verdict && (
        <div className={`mt-5 pt-4 border-t border-slate-200/60`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Verdict
          </p>
          <p className="text-sm text-slate-700 font-medium">{panel.verdict}</p>
        </div>
      )}
    </GlassPanel>
  );
}

// Expose a decorative-only wrapper too — for authors who want a custom
// layout but still want to ground it on the same gradient.
export function CompareGround({ children }: { children: ReactNode }) {
  return <InfographicGround>{children}</InfographicGround>;
}
