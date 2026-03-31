"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/stagger-children";
import { X, Check } from "lucide-react";

const COMPARISONS = [
  {
    generic: "500-student mega batches",
    proneet: "Capped at 30 students per batch",
  },
  {
    generic: "Delayed doubt solving",
    proneet: "Same-day 1-on-1 doubt sessions",
  },
  {
    generic: "Monthly tests, results late",
    proneet: "Weekly tests with same-day analysis",
  },
  {
    generic: "No parent visibility",
    proneet: "Weekly parent progress report",
  },
  {
    generic: "Generic study material",
    proneet: "Exam-pattern-aligned, curated material",
  },
] as const;

export function Differentiator() {
  return (
    <section className="relative py-30 overflow-hidden bg-white">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            WHY PRONEET
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Not the same. Better.
          </h2>
        </ScrollReveal>

        {/* Comparison table */}
        <ScrollReveal delay={0.15}>
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50">
              <div className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Generic Experience
              </div>
              <div className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand">
                What ProNEET Does
              </div>
            </div>

            {/* Rows */}
            <StaggerChildren staggerDelay={0.06}>
              {COMPARISONS.map((row, i) => (
                <StaggerItem key={i}>
                  <div
                    className={`grid grid-cols-2 ${
                      i < COMPARISONS.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >
                    {/* Generic side */}
                    <div className="px-5 py-4 flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-slate-100">
                        <X className="w-3 h-3 text-slate-400" />
                      </span>
                      <span className="text-sm text-slate-400">
                        {row.generic}
                      </span>
                    </div>

                    {/* ProNEET side */}
                    <div className="px-5 py-4 flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-brand/10">
                        <Check className="w-3 h-3 text-brand" />
                      </span>
                      <span className="text-sm font-medium text-slate-800">
                        {row.proneet}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
