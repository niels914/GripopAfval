import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ComparisonScore = "goed" | "deels" | "slecht";

function ScoreIcon({ score }: { score: ComparisonScore }) {
  if (score === "goed") {
    return (
      <span className="inline-flex items-center gap-1 text-diepblauw">
        <Check className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Goed</span>
      </span>
    );
  }
  if (score === "deels") {
    return (
      <span className="inline-flex items-center gap-1 text-tekst-2">
        <Minus className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Deels</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-tekst-2">
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
    <div className="overflow-x-auto">
      <table className="tabel-huisstijl min-w-[640px]">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            <th scope="col">&nbsp;</th>
            {columns.map((col, i) => (
              <th scope="col" key={col} className={cn("text-center", i === 0 && "bg-purper")}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.as}>
              <th scope="row" className="font-medium">
                {row.as}
              </th>
              {row.scores.map((score, i) => (
                <td key={i} className={cn("text-center", i === 0 && "bg-violet/20")}>
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
