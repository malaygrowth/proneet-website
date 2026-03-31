"use client";

import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/stagger-children";
import { JourneyLine } from "@/components/animations/journey-line";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const STEPS = [
  {
    icon: "\uD83D\uDD0D",
    title: "Diagnose",
    description: "Find exactly where your Physics breaks down",
  },
  {
    icon: "\uD83E\uDDE0",
    title: "Build",
    description: "Concept-by-concept reconstruction",
  },
  {
    icon: "\uD83C\uDFAF",
    title: "Practice",
    description: "1000+ problems, graded difficulty",
  },
  {
    icon: "\uD83C\uDFC6",
    title: "Perform",
    description: "Mock exams, real NEET conditions",
  },
] as const;

export function Method() {
  return (
    <section id="method" className="relative py-30 overflow-hidden">
      {/* BG: dot-grid with opacity mask */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 30%, white 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            THE PRONEET METHOD
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            From confusion to confidence.
          </h2>
        </ScrollReveal>

        {/* Steps grid with journey line */}
        <div className="relative">
          {/* Journey line behind steps — visible on md+ */}
          <div className="hidden md:block absolute top-8 left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] z-0">
            <JourneyLine />
          </div>

          <StaggerChildren
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
            staggerDelay={0.1}
          >
            {STEPS.map((step, i) => (
              <StaggerItem key={step.title} className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  {/* Icon circle */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border border-slate-200 shadow-tier-md text-2xl transition-all duration-300 hover:scale-110 hover:shadow-glow-brand">
                    {step.icon}
                  </div>

                  {/* Step number */}
                  <span className="mt-4 text-xs font-mono text-brand font-semibold">
                    0{i + 1}
                  </span>

                  {/* Title */}
                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 text-sm text-slate-500 max-w-[180px]">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
