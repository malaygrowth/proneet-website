"use client";

import { STATS, SITE } from "@/lib/constants";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";

interface Metric {
  value: number;
  suffix: string;
  label: string;
}

const METRICS: Metric[] = [
  {
    value: STATS.neetSelections,
    suffix: "+",
    label: "NEET Selections",
  },
  {
    value: STATS.selectionRate,
    suffix: "%",
    label: "Selection Rate",
  },
  {
    value: STATS.bestRank,
    suffix: "",
    label: "Best AIR Rank",
  },
  {
    value: STATS.yearsExperience,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: SITE.googleRating * 10, // we'll display as x.x by dividing back
    suffix: "",
    label: "Google Rating",
  },
];

export function ProofBar() {
  return (
    <section className="relative bg-hero-mid py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {METRICS.map((metric, i) => (
            <div
              key={metric.label}
              className={cn(
                "text-center",
                i === METRICS.length - 1 && "col-span-2 md:col-span-1"
              )}
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {metric.label === "Google Rating" ? (
                  <span className="font-mono tabular-nums">
                    {SITE.googleRating}
                    <span className="text-accent-orange">&#9733;</span>
                  </span>
                ) : (
                  <CountUp
                    end={metric.value}
                    suffix={metric.suffix}
                    className="text-white"
                  />
                )}
              </div>
              <p className="mt-1 text-xs sm:text-sm text-white/40">
                {metric.label === "Google Rating"
                  ? "Google Rating"
                  : metric.label}
              </p>
              {/* Gradient accent line */}
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
