import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Award, BookOpen, Users, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Meet the ProNEET faculty led by Er. Neeraj Gupta. 25+ years of teaching experience, 500+ NEET selections, and a passion for Physics.",
};

const FACULTY = [
  {
    name: "Er. Neeraj Gupta",
    role: "Founder & Head Faculty - Physics",
    experience: "25+ Years",
    credentials: [
      "B.Tech with Physics specialization",
      "25+ years of NEET/JEE coaching experience",
      "Mentored 10,000+ students across career",
      "500+ NEET selections including AIR 45",
    ],
    philosophy:
      "Physics is not about memorizing formulas. It is about understanding the language of nature. When a student truly grasps why F = ma works, they don't need to memorize — they can derive, predict, and solve anything. My job is to make that click happen for every student.",
    featured: true,
  },
  {
    name: "Dr. Meera Saxena",
    role: "Senior Faculty - Chemistry",
    experience: "18+ Years",
    credentials: [
      "Ph.D. in Organic Chemistry",
      "18+ years of competitive exam coaching",
      "Specializes in Organic and Physical Chemistry",
      "Published researcher in chemical education",
    ],
    philosophy:
      "Chemistry connects the abstract to the tangible. I teach students to see reactions as stories — each with a beginning, conflict, and resolution. Once they see that narrative, even complex mechanisms become intuitive.",
    featured: false,
  },
  {
    name: "Prof. Rajesh Kumawat",
    role: "Senior Faculty - Biology",
    experience: "15+ Years",
    credentials: [
      "M.Sc. in Zoology, NET qualified",
      "15+ years of NEET Biology coaching",
      "Expert in NCERT-based question patterns",
      "Creator of visual learning modules for Biology",
    ],
    philosophy:
      "Biology is the science of life, and it should feel alive in the classroom. I use diagrams, analogies, and real-world examples to make every topic memorable. My students don't just pass exams — they develop a genuine curiosity for life sciences.",
    featured: false,
  },
  {
    name: "Mr. Sunil Mathur",
    role: "Faculty - Mathematics",
    experience: "12+ Years",
    credentials: [
      "M.Sc. Mathematics, Gold Medalist",
      "12+ years of JEE coaching experience",
      "Specializes in Calculus and Coordinate Geometry",
      "Developed shortcut methods for JEE problem-solving",
    ],
    philosophy:
      "Mathematics rewards practice and clarity of thought. I break complex problems into simple, repeatable steps. Once students build that problem-solving muscle memory, speed and accuracy follow naturally.",
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
            Learn from the Best
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-lg mx-auto">
            Experienced educators who don&apos;t just teach subjects — they
            mentor futures.
          </p>
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Award, label: "Years Combined Experience", value: "70+" },
              { icon: Users, label: "Students Mentored", value: "10,000+" },
              { icon: GraduationCap, label: "NEET Selections", value: "500+" },
              { icon: BookOpen, label: "Subjects Covered", value: "PCB + M" },
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
