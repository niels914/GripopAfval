"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import { useScan } from "@/components/scan/ScanContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultBar } from "@/components/ResultBar";
import { ScenarioCard } from "@/components/ScenarioCard";
import { LeadForm } from "@/components/LeadForm";
import { formatEuro, formatNumber } from "@/lib/utils";
import { scanContent } from "@/content/scan";
import { SECTOR_LABELS } from "@/lib/scanCalculator";

const STAAF_KLEUREN: Record<string, string> = {
  papier: "#9462A6", // paars
  pmd: "#007DB5", // blauw
  gft: "#5760A6", // donkerpaars
  overig: "#B8AED6", // lichtpaars
  rest: "#2E2E38", // grijs
};

export function StepResult() {
  const { resultaat, terug, opnieuw } = useScan();
  const c = scanContent.stap3;

  if (!resultaat) return null;

  const kerncijfers = [
    {
      label: "Totale afvalkosten per jaar",
      waarde: formatEuro(resultaat.kostenPerJaar),
      voetnoot: resultaat.geschat ? "modelmatig geschat" : "op basis van uw opgave",
    },
    {
      label: "Totaal afval per jaar",
      waarde: `${formatNumber(resultaat.totaalTon, 1)} ton`,
      voetnoot: `waarvan ${formatNumber(resultaat.restTon, 1)} ton restafval`,
    },
    ...(resultaat.kgPerM2 !== null
      ? [
          {
            label: "Afvalintensiteit",
            waarde: `${formatNumber(resultaat.kgPerM2, 1)} kg/m²`,
            voetnoot: "per jaar, sectorkengetal",
          },
        ]
      : []),
    {
      label: "Scheidingsgraad",
      waarde: `${formatNumber(resultaat.scheidingsgraad * 100, 0)}%`,
      voetnoot: "aandeel gescheiden ingezameld",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl">{c.titel}</h2>
        <p className="mt-1 text-kpv-grijs/60">
          Sector: {SECTOR_LABELS[resultaat.input.sector]}
        </p>
      </div>

      {/* Blok 1: huidige situatie */}
      <Card>
        <CardHeader>
          <CardTitle>{c.huidigeSituatie}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kerncijfers.map((cijfer) => (
              <div key={cijfer.label}>
                <dt className="text-sm text-kpv-grijs/60">{cijfer.label}</dt>
                <dd className="mt-1 font-heading text-2xl font-bold text-kpv-paars">
                  {cijfer.waarde}
                </dd>
                <dd className="text-xs text-kpv-grijs/50">{cijfer.voetnoot}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {/* Blok 2: restafvalsamenstelling */}
      <Card>
        <CardHeader>
          <CardTitle>{c.samenstelling}</CardTitle>
          <p className="text-sm text-kpv-grijs/60">{c.samenstellingToelichting}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {resultaat.samenstelling.map((stroom) => (
            <ResultBar
              key={stroom.key}
              label={stroom.label}
              percentage={stroom.pct}
              color={STAAF_KLEUREN[stroom.key] ?? "#9462A6"}
            />
          ))}
        </CardContent>
      </Card>

      {/* Blok 3: scenario's */}
      <section aria-labelledby="scenario-titel">
        <h3 id="scenario-titel" className="text-xl sm:text-2xl">
          {c.scenarios}
        </h3>
        <p className="mt-1 max-w-3xl text-sm text-kpv-grijs/60">
          {c.scenariosToelichting}
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {resultaat.scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              name={scenario.naam}
              reduction={scenario.reductie}
              saving={scenario.besparingPerJaar}
              co2={scenario.co2ReductieTon}
              payback={scenario.terugverdientijdMaanden}
              highlight={scenario.id === "realistisch"}
            />
          ))}
        </div>
      </section>

      {/* Blok 4: CTA */}
      <Card className="border-2 border-kpv-paars bg-white">
        <CardHeader>
          <CardTitle>{c.ctaTitel}</CardTitle>
          <p className="text-sm text-kpv-grijs/70">{c.ctaTekst}</p>
        </CardHeader>
        <CardContent>
          <LeadForm
            variant="scan"
            scanResult={resultaat}
            sector={resultaat.input.sector}
            afvalkosten={resultaat.kostenPerJaar}
          />
        </CardContent>
      </Card>

      <p className="text-center text-xs text-kpv-grijs/50">{c.disclaimer}</p>

      <div className="flex flex-col-reverse items-center justify-center gap-3 sm:flex-row">
        <Button type="button" variant="ghost" onClick={terug}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Gegevens aanpassen
        </Button>
        <Button type="button" variant="secondary" onClick={opnieuw}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Opnieuw beginnen
        </Button>
      </div>
    </div>
  );
}
