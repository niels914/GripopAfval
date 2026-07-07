import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ComparisonScore = "goed" | "deels" | "slecht";

function ScoreIcon({ score }: { score: ComparisonScore }) {
  if (score === "goed") {
    return (
      <span className="inline-flex items-center gap-1 text-kpv-blauw">
        <Check className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Goed</span>
      </span>
    );
  }
  if (score === "deels") {
    return (
      <span className="inline-flex items-center gap-1 text-kpv-grijs/70">
        <Minus className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Deels</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-kpv-grijs/40">
      <X className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">Niet</span>
    </span>
  );
}

export function ComparisonTable({
  columns,
  rows,
  caption,
}: {
  /** Kolomkoppen; de eerste kolom (de as) heeft geen kop nodig. */
  columns: readonly string[];
  rows: readonly { as: string; scores: readonly ComparisonScore[] }[];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-card border border-kpv-border bg-white shadow-sm">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-kpv-border bg-kpv-offwhite">
            <th scope="col" className="px-4 py-3 font-heading font-semibold">
              &nbsp;
            </th>
            {columns.map((col, i) => (
              <th
                scope="col"
                key={col}
                className={cn(
                  "px-4 py-3 text-center font-heading font-semibold",
                  i === 0 && "text-kpv-paars"
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.as} className="border-b border-kpv-border last:border-0">
              <th scope="row" className="px-4 py-3 font-medium">
                {row.as}
              </th>
              {row.scores.map((score, i) => (
                <td
                  key={i}
                  className={cn(
                    "px-4 py-3 text-center",
                    i === 0 && "bg-kpv-paars/5"
                  )}
                >
                  <ScoreIcon score={score} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
