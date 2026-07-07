"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  berekenWhatIf,
  INVESTERING_PER_LOCATIE,
  TARIEVEN,
  type ScanResultaat,
} from "@/lib/scanCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MeerjarenGrafiek } from "@/components/scan/MeerjarenGrafiek";
import { CashflowTabel } from "@/components/scan/CashflowTabel";
import { formatEuro, formatNumber } from "@/lib/utils";
import { scanContent } from "@/content/scan";

const DEFAULTS = {
  reductie: 0.35,
  tariefRest: TARIEVEN.rest,
  investeringPerLocatie: INVESTERING_PER_LOCATIE,
};

function Slider({
  id,
  label,
  waarde,
  weergave,
  min,
  max,
  stap,
  onChange,
}: {
  id: string;
  label: string;
  waarde: number;
  weergave: string;
  min: number;
  max: number;
  stap: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <output htmlFor={id} className="font-heading text-sm font-semibold text-kpv-paars">
          {weergave}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={stap}
        value={waarde}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-kpv-border accent-kpv-paars"
      />
    </div>
  );
}

/**
 * "Reken zelf"-sectie: sliders voor reductie, tarief en investering die de
 * geteste rekenkern live opnieuw aanroepen, plus de meerjarengrafiek en
 * netto-cashflow die met de sliders meebewegen.
 */
export function WhatIfSectie({ resultaat }: { resultaat: ScanResultaat }) {
  const c = scanContent.stap3;
  const [reductie, setReductie] = useState<number>(DEFAULTS.reductie);
  const [tariefRest, setTariefRest] = useState<number>(DEFAULTS.tariefRest);
  const [investering, setInvestering] = useState<number>(
    DEFAULTS.investeringPerLocatie
  );

  const isDefault =
    reductie === DEFAULTS.reductie &&
    tariefRest === DEFAULTS.tariefRest &&
    investering === DEFAULTS.investeringPerLocatie;

  const whatIf = useMemo(
    () =>
      berekenWhatIf(resultaat, {
        reductie,
        tariefRest,
        investeringPerLocatie: investering,
      }),
    [resultaat, reductie, tariefRest, investering]
  );
  const { scenario, cashflow, projectie } = whatIf;
  const cumulatiefProjectie = projectie.reduce((som, j) => som + j.verschil, 0);

  return (
    <div className="space-y-10">
      {/* Sliders + live kerncijfers */}
      <Card>
        <CardHeader>
          <CardTitle>{c.whatIf.titel}</CardTitle>
          <p className="text-sm text-kpv-grijs/70">{c.whatIf.toelichting}</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <Slider
                id="whatif-reductie"
                label={c.whatIf.reductieLabel}
                waarde={reductie * 100}
                weergave={`${formatNumber(reductie * 100)}%`}
                min={10}
                max={60}
                stap={5}
                onChange={(v) => setReductie(v / 100)}
              />
              <Slider
                id="whatif-tarief"
                label={c.whatIf.tariefLabel}
                waarde={tariefRest}
                weergave={`${formatEuro(tariefRest)}/ton`}
                min={150}
                max={400}
                stap={10}
                onChange={setTariefRest}
              />
              <Slider
                id="whatif-investering"
                label={c.whatIf.investeringLabel}
                waarde={investering}
                weergave={formatEuro(investering)}
                min={500}
                max={5000}
                stap={250}
                onChange={setInvestering}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setReductie(DEFAULTS.reductie);
                  setTariefRest(DEFAULTS.tariefRest);
                  setInvestering(DEFAULTS.investeringPerLocatie);
                }}
                disabled={isDefault}
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                {c.whatIf.reset}
              </Button>
            </div>

            <dl
              className="grid grid-cols-2 content-start gap-4"
              aria-live="polite"
            >
              <div className="col-span-2 rounded-card bg-kpv-offwhite p-4">
                <dt className="text-xs text-kpv-grijs/70">Besparing per jaar</dt>
                <dd
                  data-testid="whatif-besparing"
                  className="font-heading text-3xl font-bold text-kpv-paars"
                >
                  {formatEuro(scenario.besparingPerJaar)}
                </dd>
                <dd className="text-xs text-kpv-grijs/70">
                  bandbreedte{" "}
                  {c.bandbreedte(
                    formatEuro(scenario.besparingLaag),
                    formatEuro(scenario.besparingHoog)
                  )}
                </dd>
              </div>
              <div className="rounded-card bg-kpv-offwhite p-4">
                <dt className="text-xs text-kpv-grijs/70">CO2-reductie</dt>
                <dd className="font-heading text-xl font-bold">
                  {formatNumber(scenario.co2ReductieTon, 1)} ton/jr
                </dd>
              </div>
              <div className="rounded-card bg-kpv-offwhite p-4">
                <dt className="text-xs text-kpv-grijs/70">Terugverdientijd</dt>
                <dd className="font-heading text-xl font-bold">
                  {scenario.terugverdientijdMaanden !== null
                    ? `${formatNumber(scenario.terugverdientijdMaanden, 1)} mnd`
                    : "n.v.t."}
                </dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>

      {/* Meerjarenprojectie */}
      <Card>
        <CardHeader>
          <CardTitle>{c.projectie.titel}</CardTitle>
          <p className="text-sm text-kpv-grijs/70">{c.projectie.toelichting}</p>
        </CardHeader>
        <CardContent>
          <MeerjarenGrafiek jaren={projectie} />
          <p className="mt-4 text-center font-heading text-lg font-semibold text-kpv-paars">
            {c.projectie.cumulatiefLabel(formatEuro(cumulatiefProjectie))}
          </p>
        </CardContent>
      </Card>

      {/* Netto-cashflow incl. succes-fee */}
      <Card>
        <CardHeader>
          <CardTitle>{c.cashflow.titel}</CardTitle>
          <p className="text-sm text-kpv-grijs/70">{c.cashflow.toelichting}</p>
        </CardHeader>
        <CardContent>
          <CashflowTabel cashflow={cashflow} />
        </CardContent>
      </Card>
    </div>
  );
}
