"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export function Manifesto() {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-slate-50">
      {/* BG: subtle radial gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.06), transparent 60%), radial-gradient(circle at 80% 70%, rgba(249, 115, 22, 0.04), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        <ScrollReveal direction="none" duration={0.8}>
          <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-center">
            {/* Portrait */}
            <div className="mx-auto lg:mx-0 w-full max-w-[280px]">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-tier-md ring-1 ring-slate-200">
                <Image
                  src="/photos/neeraj-gupta.png"
                  alt="Neeraj Gupta, Founder of ProNEET"
                  fill
                  sizes="(min-width: 1024px) 280px, 80vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-4"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15, 23, 42, 0.92), transparent)",
                  }}
                >
                  <p className="text-sm font-bold text-white">Neeraj Gupta</p>
                  <p className="text-xs text-white/70">
                    Founder · 20+ Years Teaching Physics
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div>
              <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
                THE PRONEET WAY
              </span>

              <blockquote className="mt-4">
                <p className="font-serif text-xl sm:text-2xl lg:text-[28px] leading-snug text-slate-800">
                  A <span className="font-bold text-brand">300-seater</span>{" "}
                  classroom teaches the top ten and forgets the rest.{" "}
                  <span className="block mt-3">
                    We kept the room to{" "}
                    <span className="font-bold text-brand">30</span> so every
                    student gets seen, every doubt gets heard, and Physics gets{" "}
                    <span className="italic">understood</span>, not memorised.
                  </span>
                </p>
              </blockquote>

              {/* Pull-out facts */}
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { value: "30", label: "Seats per batch" },
                  { value: "1:1", label: "Same-day doubt clearing" },
                  { value: "20+", label: "Years on the board" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-3"
                  >
                    <p className="text-xl font-extrabold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
