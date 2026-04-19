"use client";

import { STATS } from "@/lib/constants";
import { CountUp } from "@/components/ui/count-up";

// Numeric stats are verified from the old proneetphysics.com. The two
// qualitative stats describe the institute's real positioning.
const METRICS = [
  {
    kind: "number" as const,
    value: STATS.yearsExperience,
    suffix: "+",
    label: "Years Teaching",
  },
  {
    kind: "number" as const,
    value: STATS.neetSelections,
    suffix: "+",
    label: "NEET / AIIMS / IIT Selections",
  },
  {
    kind: "text" as const,
    value: "Classroom + Online",
    label: "Jaipur and Worldwide",
  },
  {
    kind: "text" as const,
    value: "Hindi + English",
    label: "Medium of Teaching",
  },
];

export function ProofBar() {
  return (
    <section className="relative bg-hero-mid py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {METRICS.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {metric.kind === "number" ? (
                  <CountUp
                    end={metric.value}
                    suffix={metric.suffix}
                    className="text-white"
                  />
                ) : (
                  <span>{metric.value}</span>
                )}
              </div>
              <p className="mt-1 text-xs sm:text-sm text-white/40">
                {metric.label}
              </p>
              <div
                className="mx-auto mt-3 h-0.5 w-8 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-brand), #A855F7, var(--color-accent-orange))",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
