import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// The ONE glass surface. Every infographic panel is built on this.
// Do not introduce alternative glass recipes — if you need a new shape,
// compose with `<GlassPanel>` inside it.
//
// Recipe is documented in `docs/infographic-design-system.md`.

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  padding?: "none" | "sm" | "md" | "lg";
}

export function GlassPanel({
  children,
  className,
  tone = "light",
  padding = "md",
}: GlassPanelProps) {
  const paddingClass =
    padding === "none"
      ? ""
      : padding === "sm"
        ? "p-4"
        : padding === "md"
          ? "p-5 sm:p-6"
          : "p-6 sm:p-8";

  const base =
    tone === "light"
      ? "bg-white/60 border border-white/60 ring-1 ring-slate-200/60"
      : "bg-slate-900/70 border border-white/10 ring-1 ring-white/5";

  return (
    <div
      className={cn(
        "relative rounded-2xl backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(15,23,42,0.06)]",
        base,
        paddingClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

// Soft gradient ground that every infographic section sits on. Drop the
// infographic's content inside this for the full locked look.
export function InfographicGround({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-3xl p-6 sm:p-10 my-10 overflow-hidden",
        "bg-gradient-to-br from-brand/[0.04] via-white to-accent-orange/[0.04]",
        "ring-1 ring-slate-200/40",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-60 h-60 rounded-full opacity-40 pointer-events-none blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full opacity-30 pointer-events-none blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(249, 115, 22, 0.18), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

// Small label used at the top of every infographic.
export function InfographicEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-widest text-accent-orange mb-3">
      {children}
    </p>
  );
}
