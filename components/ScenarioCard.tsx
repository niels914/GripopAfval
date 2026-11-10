import { Leaf, PiggyBank, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusPil } from "@/components/huisstijl/StatusPil";
import { formatEuro, formatNumber } from "@/lib/utils";

export function ScenarioCard({
  name,
  reduction,
  saving,
  co2,
  payback,
  savingRange,
  highlight = false,
}: {
  name: string;
  /** Reductie als fractie, bv. 0.35. */
  reduction: number;
  /** Besparing in € per jaar. */
  saving: number;
  /** CO2-reductie in ton per jaar. */
  co2: number;
  /** Terugverdientijd inzamelmiddelen in maanden (null = n.v.t.). */
  payback: number | null;
  /** Optionele bandbreedte rond de besparing (±onzekerheidsmarge). */
  savingRange?: { laag: number; hoog: number };
  highlight?: boolean;
}) {
  return (
    <Card className={highlight ? "blok-violet" : undefined}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          {name}
          {highlight && <StatusPil>Meest gekozen</StatusPil>}
        </CardTitle>
        <p className="text-sm text-tekst-2">
          {Math.round(reduction * 100)}% minder restafval
        </p>
      </CardHeader>
      <CardContent>
        <dl className="space-y-3">
          <div className="flex items-center gap-3">
            <PiggyBank className="h-5 w-5 shrink-0 text-purper" aria-hidden="true" />
            <div>
              <dt className="text-xs text-tekst-2">Besparing per jaar</dt>
              <dd className="text-xl font-bold text-purper">{formatEuro(saving)}</dd>
              {savingRange && (
                <dd className="text-xs text-tekst-2">
                  {formatEuro(savingRange.laag)} – {formatEuro(savingRange.hoog)}
                </dd>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Leaf className="h-5 w-5 shrink-0 text-diepblauw" aria-hidden="true" />
            <div>
              <dt className="text-xs text-tekst-2">CO2-reductie</dt>
              <dd className="font-medium">{formatNumber(co2, 1)} ton/jaar</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Timer className="h-5 w-5 shrink-0 text-diepblauw" aria-hidden="true" />
            <div>
              <dt className="text-xs text-tekst-2">
                Terugverdientijd inzamelmiddelen
              </dt>
              <dd className="font-medium">
                {payback !== null ? `${formatNumber(payback, 1)} maanden` : "n.v.t."}
              </dd>
            </div>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
