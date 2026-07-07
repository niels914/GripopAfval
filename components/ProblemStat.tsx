import type { LucideIcon } from "lucide-react";

export function ProblemStat({
  number,
  label,
  source,
  icon: Icon,
}: {
  number: string;
  label: string;
  source?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-card border border-kpv-border bg-white p-6 shadow-sm">
      <span className="rounded-lg bg-kpv-offwhite p-3 text-kpv-blauw">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="font-heading text-3xl font-bold text-kpv-paars">{number}</p>
      <p className="text-base leading-snug text-kpv-grijs">{label}</p>
      {source && <p className="text-xs text-kpv-grijs/70">Bron: {source}</p>}
    </div>
  );
}
