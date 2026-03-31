import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ProgramCard } from "@/components/ui/program-card";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore ProNEET coaching programs for NEET, JEE Mains, and dropper batches. Small batches, proven results, structured curriculum.",
};

const PROGRAMS = [
  {
    title: "NEET Regular",
    target: "Class 11-12 - PCB",
    duration: "2-Year Program",
    featured: true,
    features: [
      "Complete Physics, Chemistry, Biology curriculum",
      "Small batch - max 30 students for personal attention",
      "Weekly tests with detailed performance analysis",
      "NCERT mastery + competitive-level problem sets",
      "Saturday doubt-clearing sessions",
      "Regular parent-teacher progress meetings",
      "Study material designed by Er. Neeraj Gupta",
      "Previous year paper analysis and mock tests",
    ],
    description:
      "Our flagship program designed for students in Class 11-12 preparing for NEET. This comprehensive 2-year program builds a rock-solid foundation in PCB with a special emphasis on Physics conceptual clarity. Every batch is capped at 30 students to ensure personalized mentorship.",
  },
  {
    title: "JEE Mains",
    target: "Class 11-12 - PCM",
    duration: "2-Year Program",
    featured: false,
    features: [
      "Physics, Chemistry, Mathematics - complete syllabus",
      "JEE-focused problem-solving techniques",
      "Concept clarity + speed-building drills",
      "Monthly full-length mock tests",
      "Personal performance tracking dashboard",
      "Shortcut methods and time management strategies",
      "Chapter-wise test series with ranking",
      "Dedicated doubt resolution sessions",
    ],
    description:
      "Structured for engineering aspirants who want to crack JEE Mains. Our approach blends concept-first teaching with rigorous problem-solving practice. Physics is taught with the same depth and clarity that has produced 500+ NEET selections.",
  },
  {
    title: "Dropper Batch",
    target: "Post-12th - NEET / JEE",
    duration: "1-Year Intensive",
    featured: false,
    features: [
      "Intensive 1-year revision and preparation",
      "Focus on weak areas with diagnostic testing",
      "Daily practice paper sessions for exam readiness",
      "Complete previous year paper analysis",
      "Mentorship and motivation support",
      "Stress management and exam strategy workshops",
      "Fast-track revision modules for each subject",
      "Personal counselor assigned to each student",
    ],
    description:
      "A dedicated program for students taking a gap year. Many of our top rankers were droppers who used this year to completely transform their preparation. The program is intense by design - daily sessions, regular testing, and one-on-one mentorship keep you accountable.",
  },
];

export default function ProgramsPage() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            PROGRAMS
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Choose Your Path to Success
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            Structured programs designed for every stage of your NEET and JEE
            preparation journey. Small batches, proven curriculum, and real
            mentorship.
          </p>
        </ScrollReveal>

        {/* Program cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {PROGRAMS.map((program, i) => (
            <ScrollReveal key={program.title} delay={i * 0.1}>
              <ProgramCard
                title={program.title}
                target={program.target}
                duration={program.duration}
                featured={program.featured}
                features={program.features}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Detailed descriptions */}
        <div className="space-y-12">
          {PROGRAMS.map((program, i) => (
            <ScrollReveal key={program.title} delay={i * 0.05}>
              <div className="rounded-xl border border-slate-100 bg-surface-secondary p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-bold text-slate-900">
                    {program.title}
                  </h2>
                  <span className="text-xs font-mono text-brand font-semibold">
                    {program.duration}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {program.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
