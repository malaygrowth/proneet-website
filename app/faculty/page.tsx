import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Award, BookOpen, Users, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Meet the ProNEET faculty — Neeraj Gupta (Physics, Founder), R. K. Saini (Chemistry) and Vivek Patidar (Mathematics). Experienced NEET and JEE teachers, small classroom batches.",
};

// ProNEET covers Physics, Chemistry and Mathematics for NEET & JEE aspirants.
// Biology coverage is currently TBD pending confirmation from the institute.
const FACULTY = [
  {
    name: "Neeraj Gupta",
    role: "Founder. Teaches Physics.",
    experience: "25+ years",
    credentials: [
      "25 years of classroom Physics, most of it inside the large coaching institutes of Rajasthan and Kota",
      "Takes every Physics class himself. No junior stand-in.",
      "Teaches in Hindi or English, switches per student as needed",
      "Known for sitting with anxious students long after class ends",
    ],
    philosophy:
      "Physics isn't memorised. It's understood once, then used forever. If a student can explain why a pulley problem works, they'll solve twenty of them without looking at a formula sheet.",
    featured: true,
  },
  {
    name: "R. K. Saini",
    role: "Teaches Chemistry. Formerly at Bansal Classes, Jaipur.",
    experience: "Ex-Bansal Classes, Jaipur",
    credentials: [
      "Spent years at Bansal Classes, Jaipur, before ProNEET",
      "Organic, Inorganic and Physical — all three, one teacher",
      "Strong on NCERT-line questions and NEET-ready reaction chains",
      "Same-day doubt clearing alongside his own classes",
    ],
    philosophy:
      "Most students don't struggle with hard Chemistry. They struggle with the basics never getting locked in. Fix those, and the rest looks like pattern recognition.",
    featured: false,
  },
  {
    name: "Vivek Patidar",
    role: "Teaches Maths. A trusted name around Mansarovar.",
    experience: "Trusted in Mansarovar, Jaipur",
    credentials: [
      "A Maths name parents ask each other about in Mansarovar, Jaipur",
      "Year-on-year record of JEE Main qualifiers and top board scores",
      "Covers Class 11, Class 12, droppers, and board exam students",
      "Short-method drills, but only once the long method is clear",
    ],
    philosophy:
      "Speed comes last. First we make the long method boring. Then we strip it to the short one. That order matters. Shortcuts taught first are the reason most JEE students fall apart in mocks.",
    featured: false,
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

export default function FacultyPage() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            FACULTY
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Three teachers. Three subjects. No panel rotation.
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-xl mx-auto">
            Most coaching runs on panels. Senior names record the videos,
            junior faces run your class. ProNEET is the opposite. The
            teacher on the brochure is the teacher at the board.
          </p>
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Award, label: "Years Teaching (Founder)", value: "25+" },
              { icon: Users, label: "Students Selected", value: "1000+" },
              { icon: GraduationCap, label: "NEET / AIIMS / IIT", value: "All three" },
              { icon: BookOpen, label: "Subjects Taught", value: "Phy · Chem · Maths" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-100 bg-surface-secondary p-5 text-center"
              >
                <stat.icon className="w-5 h-5 text-brand mx-auto mb-2" />
                <p className="text-xl font-extrabold text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Faculty profiles */}
        <div className="space-y-8">
          {FACULTY.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.08}>
              <div
                className={`rounded-xl border p-6 sm:p-8 transition-all duration-300 ${
                  member.featured
                    ? "border-brand/30 bg-brand/5 shadow-tier-md"
                    : "border-slate-200 bg-white hover:shadow-tier-sm"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div
                      className="flex items-center justify-center rounded-xl text-xl font-bold text-white"
                      style={{
                        width: 80,
                        height: 80,
                        background: member.featured
                          ? "linear-gradient(135deg, #2563EB, #1D4ED8)"
                          : "linear-gradient(135deg, #64748B, #475569)",
                      }}
                    >
                      {getInitials(member.name)}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h2 className="text-lg font-bold text-slate-900">
                        {member.name}
                      </h2>
                      {member.featured && (
                        <span className="inline-flex items-center rounded-full bg-accent-orange px-2.5 py-0.5 text-xs font-bold text-white">
                          Founder
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-brand font-medium">
                      {member.role}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {member.experience}
                    </p>

                    {/* Credentials */}
                    <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                      {member.credentials.map((cred) => (
                        <li
                          key={cred}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                          {cred}
                        </li>
                      ))}
                    </ul>

                    {/* Philosophy */}
                    <div className="mt-5 rounded-lg bg-white/80 border border-slate-100 p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                        Teaching Philosophy
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed italic">
                        &ldquo;{member.philosophy}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
