import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "dark",
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl",
        variant === "dark" ? "glass" : "glass-light",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-tier-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
