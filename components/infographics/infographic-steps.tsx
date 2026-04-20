import {
  GlassPanel,
  InfographicGround,
  InfographicEyebrow,
} from "./glass-panel";

// Numbered steps, either vertical or 2-column grid. Each step is a
// small glass card with a mono-numbered badge in brand blue. Supports
// 2-8 steps; beyond that, split into two groupings.

export interface InfographicStep {
  title: string;
  body: string;
}

interface InfographicStepsProps {
  eyebrow?: string;
  heading: string;
  steps: InfographicStep[];
  layout?: "vertical" | "grid";
  footnote?: string;
}

export function InfographicSteps({
  eyebrow,
  heading,
  steps,
  layout = "grid",
  footnote,
}: InfographicStepsProps) {
  return (
    <InfographicGround>
      {eyebrow && <InfographicEyebrow>{eyebrow}</InfographicEyebrow>}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
        {heading}
      </h3>

      <div
        className={
          layout === "grid"
            ? "grid sm:grid-cols-2 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {steps.map((step, i) => (
          <GlassPanel key={step.title} padding="md">
            <div className="flex items-start gap-4">
              <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-brand/10 ring-1 ring-brand/20">
                <span className="font-mono font-bold text-brand text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  {step.title}
                </p>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>

      {footnote && (
        <p className="mt-5 text-[11px] font-mono text-slate-400">
          {footnote}
        </p>
      )}
    </InfographicGround>
  );
}
