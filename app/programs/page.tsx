import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ProgramCard } from "@/components/ui/program-card";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "ProNEET programs — NEET, JEE, Dropper Batch and individual online classes for students outside India. Coaching for Physics, Chemistry and Mathematics by a small handpicked faculty.",
};

// ProNEET covers Physics (Neeraj Gupta), Chemistry (R. K. Saini) and
// Mathematics (Vivek Patidar). Biology coverage for NEET is TBD — confirm
// before making public claims about it.
const PROGRAMS = [
  {
    title: "NEET Classroom",
    target: "Class 11 and 12, Pre-Medical",
    duration: "2-year classroom batch, Jaipur",
    featured: true,
    features: [
      "Physics with Neeraj Gupta. Chemistry with R. K. Saini.",
      "One batch, same two teachers across Class 11 and 12.",
      "Weekly topic tests, reviewed in class the next day.",
      "Chapter-wise DPPs and printed study material.",
      "Recorded lectures if you miss a class.",
      "Hindi or English medium, decided after the demo.",
      "Designed to sit alongside your own Biology coaching.",
      "Parent update every fortnight, not only at term end.",
    ],
    description:
      "The two-year classroom batch for Class 11 and 12 students preparing for NEET-UG. NEET has 180 questions across Physics, Chemistry and Biology. ProNEET covers Physics and Chemistry tightly inside the batch, while students pair it with their preferred Biology setup. The argument for joining is not that we're the biggest. It's that for two years, the same two senior teachers will know your work.",
  },
  {
    title: "JEE Classroom",
    target: "Class 11 and 12, Engineering track",
    duration: "2-year classroom batch, Jaipur",
    featured: false,
    features: [
      "Physics, Chemistry and Maths, all three, one roof.",
      "Maths taught by Vivek Patidar, a Mansarovar name.",
      "JEE Main plus BITSAT and VITEEE in scope.",
      "Board exam prep built into the schedule, not after it.",
      "Monthly full-length mocks graded against real JEE cut-offs.",
      "Chapter-wise question banks, difficulty-ranked.",
      "Short-method drills only after the long method is solid.",
      "Hindi or English medium.",
    ],
    description:
      "The two-year classroom batch for JEE Main aspirants (with JEE Advanced as a stretch). Physics with Neeraj Gupta, Chemistry with R. K. Saini, Maths with Vivek Patidar. All three subjects taught by one dedicated senior teacher each, Class 11 through Class 12. No rotating panels, no pre-recorded stand-ins.",
  },
  {
    title: "Dropper Batch",
    target: "Post-12 students taking a gap year",
    duration: "1-year intensive",
    featured: false,
    features: [
      "Built for students who know why last year didn't land.",
      "Week-one diagnostic, then a syllabus rebuilt around gaps.",
      "Morning or evening slot so self-study survives.",
      "Daily problem sets. Weekly full-length mocks.",
      "Last 10 years of NEET and JEE Physics, walked through.",
      "Mentor check-in every week on stress and pacing.",
      "Test strategy sessions, not just content.",
      "Progress review every month with a written note.",
    ],
    description:
      "The one-year batch for students who are repeating NEET or JEE. This batch assumes you've already met the syllabus, that what broke the first time was pacing, test-taking, or one or two chapters that never clicked. We start with diagnostics, then rebuild around your actual gaps instead of teaching everything from scratch. The aim is fewer surprises on exam day.",
  },
  {
    title: "1-on-1 Online",
    target: "Students across India, and Indian families abroad",
    duration: "Live online, scheduled around you",
    featured: false,
    features: [
      "One student, one teacher, live online.",
      "Available to students anywhere in India first.",
      "Also run for Indian families in Dubai and the Gulf.",
      "Pick one subject, two, or all three.",
      "Taught by the same senior faculty, not junior stand-ins.",
      "Personalised study plan and DPPs.",
      "Same test series as the Jaipur batches.",
      "Schedule and fees agreed in the first call.",
    ],
    description:
      "The 1-on-1 track is for students who need a schedule a batch can't give them, a student in another Indian city whose parents don't want them leaving home, a dropper who needs afternoon classes around a self-study routine, or an Indian family based in Dubai or elsewhere in the Gulf where NEET / JEE coaching isn't easy to find locally. Same senior faculty as the classroom batches. Same study material. The first call works out what the schedule should look like.",
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
            Pick the batch that matches where you are.
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            Classroom in Vishveshwar Nagar for students from across Jaipur.
            A dropper batch for students rebuilding after a first attempt.
            Live online 1-on-1 for students anywhere else. Same senior
            faculty in all four.
          </p>
        </ScrollReveal>

        {/* Program cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 lg:gap-8 mb-16">
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
