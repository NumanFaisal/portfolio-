import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    production:
      "bg-green-500/10 border border-green-500/20 text-green-400",
    shipped:
      "bg-blue-500/10 border border-blue-500/20 text-blue-400",
    hackathon:
      "bg-amber-500/10 border border-amber-500/20 text-amber-400",
    wip:
      "bg-orange-500/10 border border-orange-500/20 text-orange-400",
    archived:
      "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)]",
  };
  const labels: Record<string, string> = {
    production: "Live",
    shipped: "Shipped",
    hackathon: "Hackathon",
    wip: "In progress",
    archived: "Archived",
  };
  return (
    <Badge className={styles[status] ?? styles.archived}>
      {status === "production" && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      )}
      {labels[status] ?? status}
    </Badge>
  );
}
