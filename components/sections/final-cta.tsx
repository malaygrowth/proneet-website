"use client";

import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export function FinalCTA() {
  const whatsappUrl = `https://wa.me/${SITE.whatsapp.replace(/\+/g, "")}?text=Hi%2C%20I'm%20interested%20in%20ProNEET%20coaching.`;

  return (
    <section className="relative py-30 overflow-hidden">
      {/* BG: Dark brand gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
        }}
      />

      {/* BG: Radial white wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.06), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            The next NEET is 14 months away. Your preparation starts today.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-5 text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Book a free counseling session with Neeraj Gupta. No pressure,
            no obligations — just an honest conversation about your goals.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Phone className="w-4 h-4" />
              Call Now — Free Counseling
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <p className="mt-6 text-xs text-white/40">
            No spam. We&apos;ll call you once to schedule your free class.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
