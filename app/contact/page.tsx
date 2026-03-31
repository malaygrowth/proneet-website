import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SITE } from "@/lib/constants";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { InquiryForm } from "@/components/forms/inquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ProNEET for admissions, demo classes, and inquiries. Call, email, or visit us in Jaipur.",
};

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: SITE.phone,
    href: `tel:${SITE.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Jaipur, Rajasthan, India",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Sat, 8:00 AM - 8:00 PM",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            CONTACT
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Get in Touch
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-lg mx-auto">
            Ready to start your preparation journey? Reach out and
            we&apos;ll help you pick the right program.
          </p>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact info */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-900">
                Contact Information
              </h2>

              <div className="space-y-6">
                {CONTACT_INFO.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand/5 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-semibold text-slate-900 hover:text-brand transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-slate-900">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra info card */}
              <div className="rounded-xl bg-surface-secondary border border-slate-100 p-6">
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  Free Demo Class
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Not sure if ProNEET is right for you? Attend a free demo class
                  before making any commitment. No fees, no pressure — just
                  experience our teaching firsthand.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal direction="right">
            <div className="rounded-xl border border-slate-200 bg-white shadow-tier-md p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Send an Inquiry
              </h2>
              <InquiryForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
