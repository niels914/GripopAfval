import { cn } from "@/lib/utils";

interface KpiProps {
  label: string;
  waarde: string;
  toelichting?: string;
  hero?: boolean;
  className?: string;
}

/** KPI-tegel; met hero=true de uitgelichte Inkt-tegel met schuine hoek. */
export function Kpi({ label, waarde, toelichting, hero, className }: KpiProps) {
  return (
    <div className={cn("kpi", hero && "kpi-hero", className)}>
      <span>{label}</span>
      <b>{waarde}</b>
      {toelichting && <small>{toelichting}</small>}
    </div>
  );
}

/** Grid van KPI-tegels (gebruik de eerste als hero voor nadruk). */
export function KpiGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("kpis", className)}>{children}</div>;
}
