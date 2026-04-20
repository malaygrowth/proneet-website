"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { trackPhoneClick, trackWhatsappClick } from "@/lib/analytics";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    const sentinel = document.getElementById("nav-sentinel");
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="nav-sentinel" className="absolute top-0 h-1 w-full" />
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-tier-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            <span className={cn(scrolled ? "text-slate-900" : "text-white")}>
              Pro
            </span>
            <span className="text-brand">NEET</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    scrolled
                      ? "text-slate-500 hover:text-slate-900"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick("nav")}
              className={cn(
                "px-4 py-2 rounded-sm text-sm font-medium border transition-all duration-300",
                scrolled
                  ? "border-slate-200 text-slate-600 hover:border-slate-400"
                  : "border-white/15 text-white/70 hover:border-white/30 hover:text-white"
              )}
            >
              WhatsApp
            </a>
            <a
              href={`tel:${SITE.phone}`}
              onClick={() => trackPhoneClick("nav")}
              className="px-4 py-2 rounded-sm text-sm font-semibold bg-slate-900 text-white flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X
                className={cn(
                  "w-6 h-6",
                  scrolled ? "text-slate-900" : "text-white"
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "w-6 h-6",
                  scrolled ? "text-slate-900" : "text-white"
                )}
              />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base font-medium text-slate-700"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${SITE.phone}`}
              onClick={() => trackPhoneClick("nav")}
              className="block w-full text-center py-3 rounded-sm bg-accent-orange text-white font-semibold text-base"
            >
              Call Now · Free Counseling
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
