import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "warning";
  className?: string;
}

export function Chip({ children, variant = "default", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-medium border",
        {
          "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-muted)]":
            variant === "default",
          "bg-[var(--color-accent-dim)] border-[var(--color-accent)]/20 text-[var(--color-accent)]":
            variant === "accent",
          "bg-green-500/10 border-green-500/20 text-green-400": variant === "success",
          "bg-amber-500/10 border-amber-500/20 text-amber-400": variant === "warning",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
