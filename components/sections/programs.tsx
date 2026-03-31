"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/stagger-children";
import { ProgramCard } from "@/components/ui/program-card";

const PROGRAMS = [
  {
    title: "NEET Regular",
    target: "Class 11-12 · PCB",
    duration: "2-Year Program",
    featured: true,
    features: [
      "Complete Physics, Chemistry, Biology",
      "Small batch — max 30 students",
      "Weekly tests + detailed analysis",
      "NCERT + competitive-level problems",
      "Doubt sessions every Saturday",
    ],
  },
  {
    title: "JEE Mains",
    target: "Class 11-12 · PCM",
    duration: "2-Year Program",
    featured: false,
    features: [
      "Physics, Chemistry, Mathematics",
      "JEE-focused problem solving",
      "Concept clarity + speed building",
      "Monthly mock tests",
      "Personal performance tracking",
    ],
  },
  {
    title: "Dropper Batch",
    target: "Post-12th · NEET / JEE",
    duration: "1-Year Intensive",
    featured: false,
    features: [
      "Intensive 1-year revision program",
      "Focus on weak areas + test strategy",
      "Daily practice paper sessions",
      "Previous year papers analysis",
      "Mentorship & motivation support",
    ],
  },
] as const;

export function Programs() {
  return (
    <section className="relative py-30 overflow-hidden bg-surface-secondary">
      {/* BG: Radial gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(37, 99, 235, 0.04), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            PROGRAMS
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Choose your path to success.
          </h2>
          <p className="mt-3 text-base text-slate-500 max-w-lg mx-auto">
            Structured programs designed for every stage of your preparation
            journey.
          </p>
        </ScrollReveal>

        {/* Program cards */}
        <StaggerChildren
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.1}
        >
          {PROGRAMS.map((program) => (
            <StaggerItem key={program.title}>
              <ProgramCard
                title={program.title}
                target={program.target}
                duration={program.duration}
                featured={program.featured}
                features={[...program.features]}
              />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
