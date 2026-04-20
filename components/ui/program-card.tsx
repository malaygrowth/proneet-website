import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";

interface ProgramCardProps {
  title: string;
  target: string;
  features: string[];
  duration: string;
  featured?: boolean;
}

export function ProgramCard({
  title,
  target,
  features,
  duration,
  featured = false,
}: ProgramCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-white p-6 transition-all duration-300 hover:-translate-y-1",
        featured
          ? "border-2 border-brand shadow-tier-lg hover:shadow-glow-brand"
          : "border border-slate-200 shadow-tier-md hover:shadow-tier-lg"
      )}
    >
      {/* POPULAR badge */}
      {featured && (
        <span className="absolute -top-3 right-4 inline-flex items-center rounded-full bg-accent-orange px-3 py-1 text-xs font-bold text-white uppercase tracking-wide">
          Popular
        </span>
      )}

      {/* Title + target */}
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{target}</p>

      {/* Duration */}
      <p className="mt-3 text-xs font-mono text-brand font-semibold">
        {duration}
      </p>

      {/* Divider */}
      <hr className="my-4 border-slate-100" />

      {/* Features */}
      <ul className="space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={`tel:${SITE.phone}`}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5",
          featured
            ? "bg-accent-orange text-white shadow-glow-accent hover:brightness-110"
            : "border border-brand text-brand hover:bg-brand hover:text-white"
        )}
      >
        <Phone className="w-4 h-4" />
        {featured ? "Enroll Now · Call" : "Enquire · Call"}
      </a>
    </div>
  );
}
