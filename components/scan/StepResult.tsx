"use client";

import { ArrowLeft, CheckCircle2, Info, RotateCcw } from "lucide-react";
import { useScan } from "@/components/scan/ScanContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultBar } from "@/components/ResultBar";
import { ScenarioCard } from "@/components/ScenarioCard";
import { LeadForm } from "@/components/LeadForm";
import { WhatIfSectie } from "@/components/scan/WhatIfSectie";
import { DeelKnop } from "@/components/scan/DeelKnop";
import { quickWinsVoorSector } from "@/components/scan/quickWins";
import { formatEuro, formatNumber } from "@/lib/utils";
import { scanContent } from "@/content/scan";
import {
  CO2_PER_TON_REST,
  INVESTERING_PER_LOCATIE,
  KG_PER_FTE,
  ONZEKERHEIDSMARGE,
  SECTOR_LABELS,
  SUCCES_FEE,
  TARIEF_REST_2028,
  TARIEVEN,
} from "@/lib/scanCalculator";

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
        <p className="mt-1 text-kpv-grijs/70">
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
                <dt className="text-sm text-kpv-grijs/70">{cijfer.label}</dt>
                <dd className="mt-1 font-heading text-2xl font-bold text-kpv-paars">
                  {cijfer.waarde}
                </dd>
                <dd className="text-xs text-kpv-grijs/70">{cijfer.voetnoot}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {/* Blok 2: restafvalsamenstelling */}
      <Card>
        <CardHeader>
          <CardTitle>{c.samenstelling}</CardTitle>
          <p className="text-sm text-kpv-grijs/70">{c.samenstellingToelichting}</p>
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

      {/* Consistentiecheck m² vs. fte (alleen schattingsroute) */}
      {resultaat.schattingsSpreiding !== null &&
        resultaat.fteSchattingTon !== null && (
          <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-card border border-kpv-border bg-white p-4 text-sm text-kpv-grijs/80">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-kpv-blauw" aria-hidden="true" />
            <p>
              {resultaat.schattingsSpreiding <= 0.35
                ? c.spreiding.consistent
                : c.spreiding.afwijkend(
                    formatNumber(resultaat.fteSchattingTon, 1)
                  )}
            </p>
          </div>
        )}

      {/* Benchmark tegen de sector */}
      <Card>
        <CardHeader>
          <CardTitle>{c.benchmark.titel}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResultBar
            label={c.benchmark.uwLabel}
            percentage={Math.round(resultaat.scheidingsgraad * 100)}
            color="#9462A6"
          />
          <ResultBar
            label={c.benchmark.sectorLabel}
            percentage={Math.round(
              resultaat.benchmark.scheidingsgraadSector * 100
            )}
            color="#B8AED6"
          />
          <p className="text-sm text-kpv-grijs/80">
            {Math.abs(resultaat.benchmark.scheidingsgraadAfwijking) < 0.05
              ? c.benchmark.gelijkAanSector
              : resultaat.benchmark.scheidingsgraadAfwijking > 0
                ? c.benchmark.beterDanSector(
                    `${formatNumber(resultaat.benchmark.scheidingsgraadAfwijking * 100)}%`
                  )
                : c.benchmark.slechterDanSector(
                    `${formatNumber(Math.abs(resultaat.benchmark.scheidingsgraadAfwijking) * 100)}%`
                  )}
          </p>
        </CardContent>
      </Card>

      {/* Blok 3: scenario's */}
      <section aria-labelledby="scenario-titel">
        <h3 id="scenario-titel" className="text-xl sm:text-2xl">
          {c.scenarios}
        </h3>
        <p className="mt-1 max-w-3xl text-sm text-kpv-grijs/70">
          {c.scenariosToelichting}
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {resultaat.scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              name={scenario.naam}
              reduction={scenario.reductie}
              saving={scenario.besparingPerJaar}
              savingRange={{
                laag: scenario.besparingLaag,
                hoog: scenario.besparingHoog,
              }}
              co2={scenario.co2ReductieTon}
              payback={scenario.terugverdientijdMaanden}
              highlight={scenario.id === "realistisch"}
            />
          ))}
        </div>
      </section>

      {/* What-if, meerjarenprojectie en cashflow (live gekoppeld) */}
      <WhatIfSectie resultaat={resultaat} />

      {/* Quick wins voor deze sector */}
      <Card>
        <CardHeader>
          <CardTitle>{c.quickWins.titel}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 sm:grid-cols-3">
            {quickWinsVoorSector(resultaat.input.sector).map((win) => (
              <li key={win} className="flex items-start gap-2 text-sm">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-kpv-paars"
                  aria-hidden="true"
                />
                {win}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Aannames — volledige transparantie */}
      <details className="mx-auto max-w-3xl rounded-card border border-kpv-border bg-white p-5 open:shadow-sm">
        <summary className="cursor-pointer font-heading font-semibold marker:text-kpv-paars">
          {c.aannames.titel}
        </summary>
        <p className="mt-3 text-sm text-kpv-grijs/70">{c.aannames.toelichting}</p>
        <dl className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          {(
            [
              ["Restafvaltarief (incl. verbrandingsbelasting)", `${formatEuro(TARIEVEN.rest)}/ton`],
              ["Gemiddeld tarief gescheiden stromen", `${formatEuro(TARIEVEN.gescheidenGemiddeld)}/ton`],
              ["Restafvaltarief vanaf 2028 (CO2-heffing, aanname)", `${formatEuro(TARIEF_REST_2028)}/ton`],
              ["CO2-effect per ton vermeden restafval", `${formatNumber(CO2_PER_TON_REST, 1)} ton CO2`],
              ["Investering inzamelmiddelen per locatie", formatEuro(INVESTERING_PER_LOCATIE)],
              ["Succes-fee GripOpAfval", `${formatNumber(SUCCES_FEE * 100)}% van de besparing`],
              ["Onzekerheidsmarge", `±${formatNumber(ONZEKERHEIDSMARGE * 100)}%`],
              [
                `Afval per ${resultaat.input.sector === "mbo" ? "leerling" : "fte"} (${SECTOR_LABELS[resultaat.input.sector]})`,
                `${formatNumber(KG_PER_FTE[resultaat.input.sector])} kg/jaar`,
              ],
            ] as const
          ).map(([label, waarde]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 border-b border-kpv-border/60 pb-1">
              <dt className="text-kpv-grijs/70">{label}</dt>
              <dd className="whitespace-nowrap font-medium">{waarde}</dd>
            </div>
          ))}
        </dl>
      </details>

      {/* Deel deze berekening */}
      <DeelKnop input={resultaat.input} />

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

      <p className="text-center text-xs text-kpv-grijs/70">{c.disclaimer}</p>

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
