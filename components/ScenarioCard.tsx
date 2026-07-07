import { Leaf, PiggyBank, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEuro, formatNumber } from "@/lib/utils";

export function ScenarioCard({
  name,
  reduction,
  saving,
  co2,
  payback,
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
  highlight?: boolean;
}) {
  return (
    <Card className={highlight ? "border-2 border-kpv-paars" : undefined}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          {name}
          {highlight && (
            <span className="rounded-full bg-kpv-paars/10 px-2.5 py-0.5 text-xs font-medium text-kpv-paars">
              Meest gekozen
            </span>
          )}
        </CardTitle>
        <p className="text-sm text-kpv-grijs/70">
          {Math.round(reduction * 100)}% minder restafval
        </p>
      </CardHeader>
      <CardContent>
        <dl className="space-y-3">
          <div className="flex items-center gap-3">
            <PiggyBank className="h-5 w-5 shrink-0 text-kpv-paars" aria-hidden="true" />
            <div>
              <dt className="text-xs text-kpv-grijs/70">Besparing per jaar</dt>
              <dd className="font-heading text-xl font-bold text-kpv-paars">
                {formatEuro(saving)}
              </dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Leaf className="h-5 w-5 shrink-0 text-kpv-blauw" aria-hidden="true" />
            <div>
              <dt className="text-xs text-kpv-grijs/70">CO2-reductie</dt>
              <dd className="font-medium">{formatNumber(co2, 1)} ton/jaar</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Timer className="h-5 w-5 shrink-0 text-kpv-blauw" aria-hidden="true" />
            <div>
              <dt className="text-xs text-kpv-grijs/70">
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
