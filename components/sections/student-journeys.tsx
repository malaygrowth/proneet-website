"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/stagger-children";
import { GlassCard } from "@/components/ui/glass-card";

const STUDENTS = [
  {
    name: "Priya Sharma",
    tag: "Topper",
    rank: "AIR 45",
    college: "AIIMS Delhi",
    scoreBefore: 480,
    scoreAfter: 698,
    scoreTotal: 720,
    quote:
      "ProNEET completely changed how I approach Physics. The conceptual clarity I gained here was unmatched.",
  },
  {
    name: "Rahul Verma",
    tag: "Dropper",
    rank: "AIR 312",
    college: "KGMU Lucknow",
    scoreBefore: 320,
    scoreAfter: 645,
    scoreTotal: 720,
    quote:
      "As a dropper, I was terrified of wasting another year. ProNEET gave me structure, confidence, and results.",
  },
  {
    name: "Ananya Joshi",
    tag: "Average to High",
    rank: "AIR 487",
    college: "SMS Jaipur",
    scoreBefore: 410,
    scoreAfter: 620,
    scoreTotal: 720,
    quote:
      "I went from 'Physics is impossible' to scoring 165/180. The weekly tests and doubt sessions made the difference.",
  },
] as const;

export function StudentJourneys() {
  return (
    <section className="relative py-30 overflow-hidden bg-hero-bg">
      {/* BG: Radial blue glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(37, 99, 235, 0.12), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            STUDENT JOURNEYS
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            If they did it, so can you.
          </h2>
        </ScrollReveal>

        {/* Student cards */}
        <StaggerChildren
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.1}
        >
          {STUDENTS.map((student) => {
            const beforePercent = (student.scoreBefore / student.scoreTotal) * 100;
            const afterPercent = (student.scoreAfter / student.scoreTotal) * 100;

            return (
              <StaggerItem key={student.name}>
                <GlassCard variant="dark" hover className="p-6">
                  {/* Tag badge */}
                  <span className="inline-block px-3 py-1 rounded-full bg-brand text-white text-xs font-semibold">
                    {student.tag}
                  </span>

                  {/* Rank */}
                  <p className="mt-4 font-mono text-2xl font-bold text-white">
                    {student.rank}
                  </p>

                  {/* Name + college */}
                  <p className="mt-1 text-sm font-semibold text-white/90">
                    {student.name}
                  </p>
                  <p className="text-xs text-white/50">{student.college}</p>

                  {/* Score bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs text-white/50 mb-1.5">
                      <span>{student.scoreBefore}</span>
                      <span>
                        {student.scoreAfter}/{student.scoreTotal}
                      </span>
                    </div>

                    {/* Track */}
                    <div className="relative h-2 w-full rounded-full bg-white/10">
                      {/* Before marker */}
                      <div
                        className="absolute top-0 h-full rounded-full bg-white/20"
                        style={{ width: `${beforePercent}%` }}
                      />
                      {/* After bar (gradient fill) */}
                      <div
                        className="absolute top-0 h-full rounded-full"
                        style={{
                          width: `${afterPercent}%`,
                          background:
                            "linear-gradient(90deg, #2563EB, #F97316)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="mt-5 text-sm italic text-white/60 leading-relaxed">
                    &ldquo;{student.quote}&rdquo;
                  </p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
