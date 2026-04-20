import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { LOCATIONS } from "@/lib/locations";

const PROGRAMS = [
  { label: "NEET Classroom", href: "/programs" },
  { label: "JEE Classroom", href: "/programs" },
  { label: "Dropper Batch", href: "/programs" },
  { label: "1-on-1 Online", href: "/programs" },
];

export function Footer() {
  return (
    <footer className="bg-hero-bg pt-16 pb-24 lg:pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* 5-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="text-xl font-extrabold tracking-tight">
              <span className="text-white">Pro</span>
              <span className="text-brand">NEET</span>
            </Link>
            <p className="mt-2 text-sm font-medium text-white/70">
              {SITE.tagline}
            </p>
            <p className="mt-3 text-xs text-white/40 leading-relaxed">
              {SITE.description}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {PROGRAMS.map((program) => (
                <li key={program.label}>
                  <Link
                    href={program.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  >
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
              Locations
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/locations"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  All locations
                </Link>
              </li>
              {LOCATIONS.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-white/40">
              <li>{SITE.address}</li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="hover:text-white/80 transition-colors"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-white/80 transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li>Mon – Sat, 8 AM – 8 PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>

          {/* Google rating badge */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  aria-hidden="true"
                  className="w-3.5 h-3.5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-white/40">
              {SITE.googleRating} on Google ({SITE.googleReviews}+ reviews)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
