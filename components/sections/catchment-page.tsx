import Link from "next/link";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageByline } from "@/components/ui/page-byline";
import { KeyTakeaways } from "@/components/ui/key-takeaways";
import { PageFaq } from "@/components/sections/page-faq";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { InfographicStats } from "@/components/infographics/infographic-stats";
import { LOCATIONS } from "@/lib/locations";
import { SITE } from "@/lib/constants";
import { ArrowRight, Phone, MapPin, Clock } from "lucide-react";

// Shared catchment-page layout. Individual catchment pages
// (/locations/malviya-nagar etc) import this and pass a neighbourhood
// config. Keeps the template identical across siblings so we can ship
// hyperlocal pages without duplicated JSX.

export interface CatchmentRoute {
  via: string;
  time: string;
  modes: string[];
}

export interface CatchmentConfig {
  slug: string;
  name: string; // "Malviya Nagar"
  pinCodes?: string[]; // "302017", etc
  direction: string; // "south-east of Mansarovar"
  distanceKm: string; // "6-8 km"
  fastestTime: string; // "12 min"
  typicalTime: string; // "15-20 min during peak"
  routes: CatchmentRoute[];
  landmarks: string[]; // what's in this neighbourhood
  whyHere: string; // why a student from here should still consider ProNEET
  whenNotToCommute: string; // honest trade-off
  faqs: { question: string; answer: string }[];
}

export function CatchmentPage({ config }: { config: CatchmentConfig }) {
  return (
    <main className="pt-24 pb-20 bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Locations", url: `${SITE.url}/locations` },
          { name: config.name, url: `${SITE.url}/locations/${config.slug}` },
        ]}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            LOCATION · {config.name.toUpperCase()}
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            NEET &amp; JEE Coaching from {config.name}, Jaipur
          </h1>
          <PageByline
            author="ProNEET Admissions"
            authorRole="Verified by Neeraj Gupta, Founder"
            lastUpdated="April 20, 2026"
          />
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            If you live in {config.name}, you are within a
            {" "}<span className="font-semibold text-slate-700">{config.fastestTime}</span>{" "}
            reach of our classroom in Mansarovar Sector 8. Here is the
            honest read on the commute, the alternatives, and whether
            it is the right call for your family.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mb-14">
          <KeyTakeaways
            bullets={[
              `${config.name} is ${config.direction} of our Mansarovar classroom, roughly ${config.distanceKm}.`,
              `Fastest route: ${config.fastestTime}. Typical run: ${config.typicalTime}.`,
              `Most ${config.name} students reach us via ${config.routes[0].via}.`,
              `Our classroom is on Madhyam Marg, Mansarovar Sector 8. 5-6 min walk from Mansarovar Metro.`,
              `Classroom is 30-seat cap. Physics by Neeraj Gupta (20+ yrs), Chemistry by Vivek Patidar.`,
              `For students further out than ${config.distanceKm}, the 1-on-1 online track is usually a better fit than a longer commute.`,
            ]}
          />
        </ScrollReveal>

        <InfographicStats
          eyebrow={`${config.name} to Mansarovar`}
          heading="The commute, in numbers"
          values={[
            {
              value: config.fastestTime,
              label: "Fastest route",
              sublabel: "Off-peak",
            },
            {
              value: config.typicalTime.split(" ")[0],
              label: "Typical time",
              sublabel: "Peak hours",
            },
            {
              value: config.distanceKm,
              label: "Distance",
              sublabel: "Between home and classroom",
            },
            {
              value: `${config.routes.length}`,
              label: "Viable routes",
              sublabel: "Road / metro / auto",
            },
          ]}
        />

        <div className="space-y-10 text-[17px] text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How do students from {config.name} reach the classroom?
            </h2>
            <p>
              There are {config.routes.length} routes that work reliably,
              depending on where in {config.name} you live and what time
              you leave.
            </p>
            <ul className="mt-5 space-y-3">
              {config.routes.map((r) => (
                <li
                  key={r.via}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4"
                >
                  <MapPin className="w-4 h-4 text-brand shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {r.via}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      <span className="font-mono">{r.time}</span>
                      {" · "}
                      {r.modes.join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What is around {config.name}?
            </h2>
            <p>
              For context, when we talk about {config.name} as a
              catchment, this is the neighbourhood our students here
              actually live in and move through:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              {config.landmarks.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Why {config.name} students still pick ProNEET
            </h2>
            <p>{config.whyHere}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              When the commute is not worth it
            </h2>
            <p>{config.whenNotToCommute}</p>
            <p className="mt-4">
              In those cases, our{" "}
              <Link
                href="/programs"
                className="text-brand font-medium underline underline-offset-2"
              >
                1-on-1 online programme
              </Link>
              {" "}is usually the better answer. Same senior faculty,
              scheduled around you, no commute, no drop-off routine.
            </p>
          </section>
        </div>

        <ScrollReveal className="mt-14">
          <div className="rounded-xl border border-brand/15 bg-brand/[0.04] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-accent-orange mb-4">
              Quick contact
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase font-medium text-slate-400">
                    Classroom
                  </p>
                  <p className="text-sm text-slate-700 mt-0.5">
                    Madhyam Marg, Mansarovar Sector 8
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase font-medium text-slate-400">
                    Admissions
                  </p>
                  <a
                    href={`tel:${SITE.phone}`}
                    className="text-sm text-slate-700 mt-0.5 hover:text-brand block"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase font-medium text-slate-400">
                    Timings
                  </p>
                  <p className="text-sm text-slate-700 mt-0.5">
                    Mon-Sat, 8 AM-8 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <SiblingLinks currentSlug={config.slug} />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-8">
        <PageFaq
          eyebrow={`${config.name.toUpperCase()} · FAQ`}
          heading={`What parents in ${config.name} ask`}
          items={config.faqs}
        />
      </div>
    </main>
  );
}

function SiblingLinks({ currentSlug }: { currentSlug: string }) {
  const siblings = LOCATIONS.filter(
    (l) => l.slug !== currentSlug && l.role === "catchment",
  );
  const classroom = LOCATIONS.find((l) => l.role === "classroom");
  return (
    <div className="mt-12">
      <p className="font-mono text-[11px] uppercase tracking-widest text-accent-orange mb-4">
        Other catchments
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {classroom && (
          <Link
            href={`/locations/${classroom.slug}`}
            className="group rounded-lg border border-brand/20 bg-brand/[0.03] p-4 hover:border-brand/40 transition"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-brand mb-1">
              Classroom
            </p>
            <p className="text-sm font-semibold text-slate-900 group-hover:text-brand transition-colors flex items-center gap-1">
              {classroom.name}
              <ArrowRight className="w-3 h-3" />
            </p>
          </Link>
        )}
        {siblings.map((s) => (
          <Link
            key={s.slug}
            href={`/locations/${s.slug}`}
            className="group rounded-lg border border-slate-200 bg-white p-4 hover:border-brand/40 transition"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Catchment
            </p>
            <p className="text-sm font-semibold text-slate-900 group-hover:text-brand transition-colors flex items-center gap-1">
              {s.name}
              <ArrowRight className="w-3 h-3" />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
