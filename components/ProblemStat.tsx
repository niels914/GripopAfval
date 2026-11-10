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
    <div className="kpi">
      <Icon className="h-5 w-5 text-inkt" aria-hidden="true" />
      <b>{number}</b>
      <small>{label}</small>
      {source && <p className="bron mt-1">Bron: {source}</p>}
    </div>
  );
}
