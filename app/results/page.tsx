import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { CountUp } from "@/components/ui/count-up";
import { STATS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Results",
  description:
    "ProNEET student results - 500+ NEET selections, AIR 45 best rank, 95% selection rate. See our proven track record.",
};

const RESULTS_DATA = [
  {
    year: 2024,
    students: [
      {
        name: "Priya Sharma",
        college: "AIIMS Delhi",
        rank: 45,
        score: 698,
        featured: true,
      },
      {
        name: "Rahul Verma",
        college: "KGMU Lucknow",
        rank: 312,
        score: 645,
        featured: false,
      },
      {
        name: "Ananya Joshi",
        college: "SMS Jaipur",
        rank: 487,
        score: 620,
        featured: false,
      },
    ],
  },
  {
    year: 2023,
    students: [
      {
        name: "Vikram Singh",
        college: "Maulana Azad Medical College",
        rank: 128,
        score: 670,
        featured: true,
      },
      {
        name: "Sneha Agarwal",
        college: "AIIMS Jodhpur",
        rank: 245,
        score: 652,
        featured: false,
      },
      {
        name: "Amit Patel",
        college: "RUHS Jaipur",
        rank: 560,
        score: 610,
        featured: false,
      },
    ],
  },
  {
    year: 2022,
    students: [
      {
        name: "Neha Gupta",
        college: "AIIMS Delhi",
        rank: 89,
        score: 685,
        featured: true,
      },
      {
        name: "Rohan Mehra",
        college: "KGMC Lucknow",
        rank: 340,
        score: 638,
        featured: false,
      },
      {
        name: "Kavya Rathore",
        college: "JLN Medical College",
        rank: 412,
        score: 625,
        featured: false,
      },
    ],
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ResultsPage() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            RESULTS
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Our Students Speak Through Results
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-lg mx-auto">
            25+ years of consistent selections. Every number here represents a
            student whose life changed.
          </p>
        </ScrollReveal>

        {/* Stats banner */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              {
                value: STATS.neetSelections,
                suffix: "+",
                label: "NEET Selections",
              },
              {
                value: STATS.bestRank,
                prefix: "AIR ",
                label: "Best Rank",
              },
              {
                value: STATS.selectionRate,
                suffix: "%",
                label: "Selection Rate",
              },
              {
                value: STATS.yearsExperience,
                suffix: "+",
                label: "Years Experience",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-100 bg-surface-secondary p-5 text-center"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-brand">
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </p>
                <p className="mt-1 text-xs text-slate-500 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Results by year */}
        {RESULTS_DATA.map((yearGroup) => (
          <div key={yearGroup.year} className="mb-12 last:mb-0">
            <ScrollReveal>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="font-mono text-brand">NEET {yearGroup.year}</span>
                <span className="h-px flex-1 bg-slate-100" />
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {yearGroup.students.map((student, i) => (
                <ScrollReveal key={student.name} delay={i * 0.08}>
                  <div
                    className={`rounded-xl border p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-tier-md ${
                      student.featured
                        ? "border-brand/30 bg-brand/5 shadow-tier-sm"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className="shrink-0 flex items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{
                        width: 44,
                        height: 44,
                        background:
                          "linear-gradient(135deg, #2563EB, #A855F7)",
                      }}
                    >
                      {getInitials(student.name)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {student.college}
                      </p>

                      {/* Score bar */}
                      {student.score != null && (
                        <div className="mt-2 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(student.score / 720) * 100}%`,
                              background:
                                "linear-gradient(90deg, #2563EB, #A855F7, #F97316)",
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Rank + Score */}
                    <div className="shrink-0 text-right">
                      <p
                        className={`text-lg font-bold font-mono tabular-nums ${
                          student.featured
                            ? "text-brand"
                            : "text-slate-900"
                        }`}
                      >
                        AIR {student.rank}
                      </p>
                      {student.score && (
                        <p className="text-xs text-slate-400">
                          {student.score}/720
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
