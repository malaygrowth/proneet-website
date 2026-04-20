"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/stagger-children";
import { ProgramCard } from "@/components/ui/program-card";

// Four programmes, four different students. Cards are deliberately
// not interchangeable.
const PROGRAMS = [
  {
    title: "NEET Classroom",
    target: "For Class 11 and 12, Pre-Medical",
    duration: "2-Year classroom batch, Jaipur",
    featured: true,
    features: [
      "Physics with Neeraj Gupta, the founder, every class.",
      "One batch. Same teacher for two years. No rotating panels.",
      "Weekly tests, weekly parent update, doubts cleared the same day.",
      "Hindi or English medium. Decide after the demo class.",
      "Sits alongside your Chemistry and Biology coaching or self-study.",
    ],
  },
  {
    title: "JEE Classroom",
    target: "For Class 11 and 12, Engineering track",
    duration: "2-Year classroom batch, Jaipur",
    features: [
      "Physics and Maths under one roof. Senior faculty on both.",
      "Maths taught by Vivek Patidar, a trusted name in Mansarovar.",
      "Board prep runs inside the schedule, not after it.",
      "Mocks graded against actual JEE Main cut-offs, not ours.",
      "Plan built for JEE Main first, Advanced as a stretch.",
    ],
  },
  {
    title: "Dropper Batch",
    target: "For students taking a gap year",
    duration: "1-Year intensive",
    features: [
      "Designed assuming you've already tried and it didn't land.",
      "Diagnostic in week one. Syllabus re-built around your gaps.",
      "Morning or evening slot so self-study doesn't get crushed.",
      "Weekly full-length mocks. Weekly one-on-one with a mentor.",
      "Last ten years of NEET and JEE Physics and Maths, walked through.",
    ],
  },
  {
    title: "1-on-1 Online",
    target: "For students who need individual pace",
    duration: "Live online, scheduled around you",
    features: [
      "Available for students in India, and for Indian families abroad.",
      "Pick Physics, Maths, or both.",
      "Taught by the same senior faculty, not a junior stand-in.",
      "We currently run this track for students in Dubai and the Gulf.",
      "First call sets the schedule and the fees. No pressure.",
    ],
  },
] as const;

export function Programs() {
  return (
    <section className="relative py-30 overflow-hidden bg-surface-secondary">
      {/* BG: Radial gradient wash */}
      <div
        aria-hidden="true"
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
            BATCHES
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Four batches. Four different students.
          </h2>
          <p className="mt-3 text-base text-slate-500 max-w-lg mx-auto">
            Pick the one that matches where you are right now. Not the one the
            brochure pushes.
          </p>
        </ScrollReveal>

        {/* Program cards — 2x2 on md, 4x1 on xl */}
        <StaggerChildren
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 lg:gap-8"
          staggerDelay={0.1}
        >
          {PROGRAMS.map((program) => (
            <StaggerItem key={program.title}>
              <ProgramCard
                title={program.title}
                target={program.target}
                duration={program.duration}
                featured={"featured" in program ? program.featured : false}
                features={[...program.features]}
              />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
