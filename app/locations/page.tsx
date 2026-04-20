import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageByline } from "@/components/ui/page-byline";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { LOCATIONS } from "@/lib/locations";
import { SITE } from "@/lib/constants";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "ProNEET's classroom is in Mansarovar Sector 8, Jaipur. We serve students from Mansarovar, Vaisali Nagar, Malviya Nagar and Gopalpura Bypass.",
  alternates: { canonical: "/locations" },
};

export default function LocationsIndexPage() {
  const classroom = LOCATIONS.find((l) => l.role === "classroom");
  const catchments = LOCATIONS.filter((l) => l.role === "catchment");

  return (
    <main className="pt-24 pb-20 bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Locations", url: `${SITE.url}/locations` },
        ]}
      />
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            LOCATIONS
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            One classroom. Four catchment areas.
          </h1>
          <PageByline
            author="ProNEET Admissions"
            authorRole="Verified by Neeraj Gupta, Founder"
            lastUpdated="April 20, 2026"
          />
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            We teach from a single classroom in Mansarovar Sector 8.
            This page is for parents and students living in the
            neighbourhoods that commute to us.
          </p>
        </ScrollReveal>

        {/* Classroom — featured */}
        {classroom && (
          <ScrollReveal className="mb-14">
            <Link
              href={`/locations/${classroom.slug}`}
              className="group block rounded-2xl border border-brand/20 bg-brand/[0.03] overflow-hidden hover:shadow-tier-md hover:border-brand/40 transition-all"
            >
              <div className="grid md:grid-cols-[360px_1fr]">
                {classroom.heroImage && (
                  <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[260px]">
                    <Image
                      src={classroom.heroImage}
                      alt={classroom.heroImageAlt || classroom.name}
                      fill
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-full bg-brand text-white px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                      Classroom
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {classroom.travelTime}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-brand transition-colors">
                    {classroom.name}
                  </h2>
                  <p className="mt-3 text-base text-slate-600 leading-relaxed">
                    84/255, Madhyam Marg, Ward 27, Mansarovar Sector 8,
                    Jaipur 302020. 5-6 min from Mansarovar Metro. 30-seat
                    cap. Physics by Neeraj Gupta, Chemistry by Vivek Patidar.
                    Mon-Sat, 8 AM-8 PM.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
                    Visit the Mansarovar page
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* Catchment pages */}
        <ScrollReveal className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-orange" />
              Catchment neighbourhoods
            </h2>
            <span className="h-px flex-1 bg-slate-100" />
          </div>
          <p className="text-sm text-slate-500 max-w-2xl">
            If you live in any of these, commute is straightforward. The
            pages cover the route, realistic time, and the trade-offs
            vs. options closer to home.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {catchments.map((loc) => (
            <ScrollReveal key={loc.slug}>
              <Link
                href={`/locations/${loc.slug}`}
                className="group block h-full rounded-xl border border-slate-200 bg-white p-6 hover:border-brand/40 hover:shadow-tier-sm transition-all"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent-orange mb-2">
                  {loc.travelTime}
                </p>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand transition-colors">
                  {loc.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {loc.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand font-medium">
                  Commute details
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16">
          <div className="rounded-xl border border-slate-100 bg-surface-secondary p-6 sm:p-8 text-sm text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-900 mb-2">
              Live somewhere else in Jaipur?
            </p>
            <p>
              We have students from Jagatpura, Raja Park, C-Scheme and
              Tonk Road too. Beyond ~6-8 km, the commute starts costing
              more time than the coaching gives back. For students
              further out, our live 1-on-1 online track is usually the
              better fit — same senior faculty, scheduled around you.{" "}
              <Link
                href="/programs"
                className="text-brand font-medium underline underline-offset-2"
              >
                See the 1-on-1 Online programme
              </Link>
              .
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
