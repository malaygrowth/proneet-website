import Image from "next/image";
import { GlassPanel, InfographicGround } from "./glass-panel";

// Pull-quote in a glass frame. Serif body, mono attribution, optional
// square portrait from public/photos/. Use sparingly — one per post at
// most. Good for founder quotes or alumni testimonials.

interface InfographicQuoteProps {
  quote: string;
  attribution: string;
  role?: string;
  image?: string;
  imageAlt?: string;
}

export function InfographicQuote({
  quote,
  attribution,
  role,
  image,
  imageAlt,
}: InfographicQuoteProps) {
  return (
    <InfographicGround>
      <GlassPanel padding="lg">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {image && (
            <div className="shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-brand/20">
              <Image
                src={image}
                alt={imageAlt || attribution}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="w-7 h-7 text-brand/30 mb-3"
            >
              <path
                d="M7 7h4v4H7v4H3v-4c0-2.2 1.8-4 4-4zm10 0h4v4h-4v4h-4v-4c0-2.2 1.8-4 4-4z"
                fill="currentColor"
              />
            </svg>
            <blockquote className="font-serif text-lg sm:text-xl italic text-slate-800 leading-snug">
              {quote}
            </blockquote>
            <footer className="mt-4 flex flex-wrap items-baseline gap-x-3">
              <cite className="not-italic font-mono text-xs uppercase tracking-widest text-slate-900">
                {attribution}
              </cite>
              {role && (
                <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
                  {role}
                </span>
              )}
            </footer>
          </div>
        </div>
      </GlassPanel>
    </InfographicGround>
  );
}
