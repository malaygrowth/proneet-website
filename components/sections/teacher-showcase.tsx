"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Check } from "lucide-react";

const CREDENTIALS = [
  "B.Tech + M.Tech in Physics specialization",
  "25+ years of classroom teaching experience",
  "500+ NEET selections with top 1000 ranks",
  "Author of conceptual Physics problem sets",
];

export function TeacherShowcase() {
  return (
    <section className="relative py-30 overflow-hidden bg-[#FAFAFA]">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            YOUR TEACHER
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Learn from someone who&apos;s done it.
          </h2>
        </ScrollReveal>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Photo frame */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="relative mx-auto lg:mx-0 w-full max-w-[380px]">
              {/* Orbital ring accent */}
              <div
                className="absolute -inset-6 rounded-full border border-brand/10 opacity-50 pointer-events-none"
                style={{
                  borderRadius: "50%",
                }}
              />

              {/* Photo frame */}
              <div className="relative w-full aspect-[380/480] rounded-lg overflow-hidden shadow-tier-lg">
                {/* Dark gradient placeholder background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #1E293B 0%, #0F172A 50%, #1E293B 100%)",
                  }}
                />

                {/* Placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold text-white/30">
                      NG
                    </div>
                    <p className="mt-3 text-sm text-white/20">Photo coming soon</p>
                  </div>
                </div>

                {/* Bottom gradient overlay with name */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)",
                  }}
                >
                  <p className="text-lg font-bold text-white">
                    Er. Neeraj Gupta
                  </p>
                  <p className="text-sm text-white/60">
                    Founder &amp; Lead Faculty
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Credentials */}
          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                25+ years making Physics intuitive.
              </h3>

              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Er. Neeraj Gupta has dedicated his career to transforming how
                students understand Physics. His unique teaching methodology
                breaks down complex concepts into intuitive, memorable
                frameworks — turning fear into fascination, one student at a
                time.
              </p>

              {/* Credentials */}
              <ul className="mt-6 space-y-3">
                {CREDENTIALS.map((cred) => (
                  <li key={cred} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-brand/10">
                      <Check className="w-3 h-3 text-brand" />
                    </span>
                    <span className="text-sm text-slate-700">{cred}</span>
                  </li>
                ))}
              </ul>

              {/* Teaching philosophy quote */}
              <blockquote className="mt-8 border-l-2 border-brand/20 pl-4">
                <p className="text-sm italic text-slate-500 leading-relaxed">
                  &ldquo;Every student can master Physics. They just need
                  someone who teaches them the way they think — not the way
                  textbooks are written.&rdquo;
                </p>
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
