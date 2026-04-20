"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/stagger-children";
import { GlassCard } from "@/components/ui/glass-card";

// Real testimonials lifted from the old proneetphysics.com (Wayback 2021–2024).
// Score bars are hidden when before/after data isn't available — these are
// quote-only cards until the user provides verified rank/score data.
const STUDENTS = [
  {
    name: "Dr. Kumkum Gupta",
    tag: "Medical",
    rank: "Govt. Medical College",
    college: "Kota · Gynaecologist",
    quote:
      "I was in a major coaching institute. I got nothing but fear studying Physics there. Then I joined Neeraj Sir's classes. That day, and today, I'm a gynaecologist at Government Medical College, Kota.",
  },
  {
    name: "Dr. Amit Gupta",
    tag: "Medical",
    rank: "Govt. Medical Hospital",
    college: "Kota · Orthopaedics",
    quote:
      "I joined Neeraj Sir after Class X and I can't thank him enough for guiding me so well. I am a successful doctor now because of you. Thank you, Sir.",
  },
  {
    name: "Gulshan Jangid",
    tag: "Engineering",
    rank: "IIT Delhi",
    college: "IIT Delhi · Student",
    quote:
      "There are only a few people who can explain Physics to students using everyday examples and make it stick. He is good. One of the best, in fact.",
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
          {STUDENTS.map((student) => (
            <StaggerItem key={student.name}>
              <GlassCard variant="dark" hover className="p-6 h-full flex flex-col">
                {/* Tag badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-brand text-white text-xs font-semibold self-start">
                  {student.tag}
                </span>

                {/* Placement */}
                <p className="mt-4 font-mono text-xl font-bold text-white leading-tight">
                  {student.rank}
                </p>

                {/* Name + role */}
                <p className="mt-2 text-sm font-semibold text-white/90">
                  {student.name}
                </p>
                <p className="text-xs text-white/50">{student.college}</p>

                {/* Quote */}
                <p className="mt-5 text-sm italic text-white/70 leading-relaxed flex-grow">
                  &ldquo;{student.quote}&rdquo;
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
