"use client";

import Link from "next/link";
import { Phone, ArrowRight, Award, Users, Languages, Globe2 } from "lucide-react";
import { SITE } from "@/lib/constants";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/stagger-children";
import { AtomAnimation } from "@/components/animations/atom-animation";

// Right-column proof strip. Kept specific and verified, in priority order
// for the Indian NEET / JEE audience.
const HERO_PROOF = [
  {
    icon: Users,
    stat: "30-seat batches",
    label: "No rotating panels. Your teacher knows your name by week two.",
  },
  {
    icon: Award,
    stat: "20+ years of Physics",
    label: "Neeraj Gupta. Ex-Bansal Classes, Narayana, and Excel Physics.",
  },
  {
    icon: Languages,
    stat: "Hindi and English medium",
    label: "Choose the language you think in. Switch mid-way if you want.",
  },
  {
    icon: Globe2,
    stat: "Online 1-on-1, if you need it",
    label: "Students across India and a few from Dubai and the Gulf run on this track.",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-hero-bg via-hero-deep to-hero-mid">
      {/* Grid overlay */}
      <div aria-hidden="true" className="absolute inset-0 grid-lines pointer-events-none" />

      {/* Gradient blobs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.4), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.35), transparent 70%)",
        }}
      />

      {/* Atom — right side accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-[0.07] pointer-events-none hidden lg:block">
        <AtomAnimation size={600} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <ScrollReveal delay={0.1}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 animate-pulse-dot" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Class 11 &amp; Dropper seats filling for the 2027 NEET / JEE batch
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                20+ years of Physics.
                <br />
                <span className="bg-gradient-to-r from-brand-light to-accent-orange bg-clip-text text-transparent">
                  Taught the way you think.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-6 text-lg text-white/50 max-w-md leading-relaxed">
                A small Jaipur coaching where Neeraj Gupta teaches Physics
                himself, alongside Vivek Patidar for Chemistry. Classroom on
                Madhyam Marg, Mansarovar. 1-on-1 online, wherever you are.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-orange px-6 py-3 text-sm font-semibold text-white shadow-glow-accent transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  <Phone className="w-4 h-4" />
                  Book a demo class
                </a>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white"
                >
                  See the batches
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Proof cards */}
          <div className="hidden lg:block">
            <StaggerChildren className="space-y-3" staggerDelay={0.12}>
              {HERO_PROOF.map((item) => (
                <StaggerItem key={item.stat}>
                  <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]">
                    <span className="flex-shrink-0 mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand-light">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-base font-semibold text-white">
                        {item.stat}
                      </p>
                      <p className="mt-0.5 text-sm text-white/50 leading-snug">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  );
}
