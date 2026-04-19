import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export const metadata: Metadata = {
  title: "Results",
  description:
    "ProNEET students have gone on to AIIMS, IIT Delhi, BITS Pilani, NIT Allahabad, Govt Medical Colleges and more. Past students share their story.",
};

// Past students of Neeraj Gupta / ProNEET Physics Classes.
// All testimonials are verbatim from the old proneetphysics.com site
// (Wayback Machine snapshots, 2021–2024). Ranks / scores are intentionally
// omitted — we do not have verified numeric rank data at this time.
const STUDENT_STORIES = [
  {
    name: "Dr. Kumkum Gupta",
    placement: "Government Medical College, Kota",
    role: "Gynaecologist",
    stream: "Medical",
    quote:
      "I was in a major coaching institute. I got nothing but fear studying Physics there. Then I joined Neeraj Sir's classes. That day, and today, I'm a gynaecologist at Government Medical College, Kota.",
  },
  {
    name: "Dr. Amit Gupta",
    placement: "Govt. Medical Hospital, Kota",
    role: "Orthopaedics",
    stream: "Medical",
    quote:
      "I joined Neeraj Sir after Class X and I can't thank him enough for guiding me so well. I am a successful doctor now because of you. Thank you, Sir.",
  },
  {
    name: "Gulshan Jangid",
    placement: "IIT Delhi",
    role: "Engineering — Student",
    stream: "Engineering",
    quote:
      "There are only a few people who can explain Physics to students using everyday examples and make it stick. He is good — one of the best, in fact.",
  },
  {
    name: "Aman Jain",
    placement: "BITS Pilani",
    role: "Engineering — Student",
    stream: "Engineering",
    quote:
      "Neeraj Sir is the best teacher in Jaipur. Thank you so much for believing in me and providing me the proper guidance, and those test series. Will be forever grateful.",
  },
  {
    name: "Abhishek Jha",
    placement: "NIT Allahabad",
    role: "Engineering — Student",
    stream: "Engineering",
    quote:
      "Pro NEET Classes provided me enough confidence that I had been lacking from a long time. All thanks to Neeraj Sir.",
  },
];

function getInitials(name: string): string {
  return name
    .replace(/^(Er\.|Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, "")
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
            What students have done afterwards.
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-xl mx-auto">
            AIIMS. IIT Delhi. BITS Pilani. NIT Allahabad. Government Medical
            Colleges in Kota. 25 years of work, 1000+ students who cleared
            where they wanted to. A few of them, in their own words.
          </p>
        </ScrollReveal>

        {/* Stats banner — verified facts only */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: "1000+", label: "NEET / AIIMS / IIT Selections" },
              { value: "25+", label: "Years Teaching (Founder)" },
              { value: "Phy · Chem · Maths", label: "Subjects Taught" },
              { value: "Global", label: "Students in India + Abroad" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-100 bg-surface-secondary p-5 text-center"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-brand">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Student stories */}
        <ScrollReveal className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <span className="font-mono text-brand">In their own words</span>
            <span className="h-px flex-1 bg-slate-100" />
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STUDENT_STORIES.map((student, i) => (
            <ScrollReveal key={student.name} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-tier-md">
                <div className="flex items-center gap-4">
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
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {student.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {student.placement}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {student.role}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-brand">
                    {student.stream}
                  </span>
                </div>
                <p className="mt-4 text-sm italic text-slate-600 leading-relaxed">
                  &ldquo;{student.quote}&rdquo;
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Honest note */}
        <ScrollReveal className="mt-16">
          <div className="rounded-xl border border-slate-100 bg-surface-secondary p-6 text-sm text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-900 mb-2">
              Why this page is short
            </p>
            <p>
              Plenty of coaching sites put up rank tables with photos they
              haven&apos;t asked permission for and numbers they can&apos;t
              defend. We don&apos;t. If you want to talk to a past student
              before you enrol, call the admissions line on {" "}
              <a href="tel:+919214314348" className="text-brand font-medium">
                +91&nbsp;92143&nbsp;14348
              </a>
              . We&apos;ll put you in touch with an alumnus whose situation
              sounds like yours.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
