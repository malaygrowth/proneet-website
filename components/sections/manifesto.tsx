"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";

export function Manifesto() {
  return (
    <section className="relative py-30 overflow-hidden">
      {/* BG: subtle radial gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.03), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
        <ScrollReveal direction="none" duration={0.8}>
          {/* Top accent line */}
          <div
            className="mx-auto mb-12 h-px w-48"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent)",
            }}
          />

          <blockquote className="text-center">
            <p className="font-serif text-2xl sm:text-3xl lg:text-[42px] italic leading-snug text-slate-800">
              &ldquo;We don&apos;t believe in{" "}
              <span className="font-bold not-italic">mass production</span> of
              students. We believe in{" "}
              <span className="font-bold not-italic">mastery</span> — one
              concept, one student, one breakthrough at a time. Physics
              isn&apos;t hard. It&apos;s just been{" "}
              <span className="font-bold not-italic">taught wrong</span>
              .&rdquo;
            </p>

            <footer className="mt-8 font-mono text-sm text-slate-400">
              — Er. Neeraj Gupta, Founder &middot; 25+ Years Teaching Physics
            </footer>
          </blockquote>

          {/* Bottom accent line */}
          <div
            className="mx-auto mt-12 h-px w-48"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent)",
            }}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
