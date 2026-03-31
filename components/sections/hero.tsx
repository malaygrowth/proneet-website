"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/stagger-children";
import { AtomAnimation } from "@/components/animations/atom-animation";
import { ResultCard } from "@/components/ui/result-card";

const HERO_RESULTS = [
  {
    name: "Aarav Sharma",
    college: "AIIMS Delhi",
    rank: 45,
    year: 2024,
    score: 705,
    featured: true,
  },
  {
    name: "Priya Gupta",
    college: "AIIMS Jodhpur",
    rank: 128,
    year: 2024,
    score: 690,
  },
  {
    name: "Rohan Meena",
    college: "SMS Medical College",
    rank: 312,
    year: 2024,
    score: 668,
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-hero-bg via-hero-deep to-hero-mid">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-lines pointer-events-none" />

      {/* Gradient blobs */}
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.4), transparent 70%)",
        }}
      />
      <div
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
                Admissions Open &middot; NEET 2027 Batch
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Your NEET journey
                <br />
                starts with{" "}
                <span className="bg-gradient-to-r from-brand-light to-accent-orange bg-clip-text text-transparent">
                  ProNEET.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-6 text-lg text-white/50 max-w-md leading-relaxed">
                Jaipur&apos;s most trusted NEET coaching — 25+ years of expert
                faculty, small batches, and a track record that speaks for
                itself.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-orange px-6 py-3 text-sm font-semibold text-white shadow-glow-accent transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  <Phone className="w-4 h-4" />
                  Call Now — Free Counseling
                </a>
                <Link
                  href="/#method"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white"
                >
                  Explore Programs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Result cards */}
          <div className="hidden lg:block">
            <StaggerChildren
              className="space-y-3"
              staggerDelay={0.12}
            >
              {HERO_RESULTS.map((result) => (
                <StaggerItem key={result.name}>
                  <ResultCard {...result} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  );
}
