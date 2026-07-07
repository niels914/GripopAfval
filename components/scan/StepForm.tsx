"use client";

import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useScan } from "@/components/scan/ScanContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  berekenScan,
  FTE_LABELS,
  SECTOR_KENGETALLEN,
  SECTOR_LABELS,
  type Sector,
} from "@/lib/scanCalculator";
import { formatNumber } from "@/lib/utils";
import { scanContent } from "@/content/scan";

const sectorEnum = z.enum(
  Object.keys(SECTOR_LABELS) as [Sector, ...Sector[]]
);

const verplichtGetal = (melding: string) =>
  z.preprocess(
    (v) => (v === "" || v === null || Number.isNaN(v) ? undefined : Number(v)),
    z.number({ error: melding }).positive(melding)
  );

const optioneelGetal = z.preprocess(
  (v) => (v === "" || v === null || Number.isNaN(v) ? undefined : Number(v)),
  z.number().nonnegative("Moet 0 of hoger zijn").optional()
);

const factuurSchema = z.object({
  sector: sectorEnum,
  locaties: verplichtGetal("Vul het aantal locaties in"),
  kostenPerJaar: verplichtGetal("Vul uw totale afvalkosten per jaar in"),
  restTon: optioneelGetal,
  papierTon: optioneelGetal,
  pmdTon: optioneelGetal,
  gftTon: optioneelGetal,
  glasTon: optioneelGetal,
});

const schattingSchema = z.object({
  sector: sectorEnum,
  m2: verplichtGetal("Vul het aantal m² in"),
  fte: verplichtGetal("Vul het aantal fte of leerlingen in"),
});

type FactuurInput = z.input<typeof factuurSchema>;
type FactuurValues = z.output<typeof factuurSchema>;
type SchattingInput = z.input<typeof schattingSchema>;
type SchattingValues = z.output<typeof schattingSchema>;

function SectorVeld({
  id,
  registration,
  error,
}: {
  id: string;
  registration: UseFormRegisterReturn;
  error?: string;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Sector</Label>
      <Select id={id} aria-invalid={!!error} {...registration}>
        {Object.entries(SECTOR_LABELS).map(([waarde, label]) => (
          <option key={waarde} value={waarde}>
            {label}
          </option>
        ))}
      </Select>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function FactuurFormulier() {
  const { toonResultaat, terug, laatsteInput } = useScan();
  // Eerder ingevulde waarden terugzetten bij terugnavigeren.
  const vorige = laatsteInput?.route === "factuur" ? laatsteInput : null;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FactuurInput, unknown, FactuurValues>({
    resolver: zodResolver(factuurSchema),
    defaultValues: vorige
      ? {
          sector: vorige.sector,
          locaties: vorige.locaties,
          kostenPerJaar: vorige.kostenPerJaar,
          restTon: vorige.restTon,
          papierTon: vorige.papierTon,
          pmdTon: vorige.pmdTon,
          gftTon: vorige.gftTon,
          glasTon: vorige.glasTon,
        }
      : { sector: "mbo" },
  });

  function onSubmit(values: FactuurValues) {
    toonResultaat(berekenScan({ route: "factuur", ...values }));
  }

  const tonnageVelden = [
    { naam: "restTon", label: "Restafval (ton/jaar)" },
    { naam: "papierTon", label: "Papier/karton (ton/jaar)" },
    { naam: "pmdTon", label: "PMD (ton/jaar)" },
    { naam: "gftTon", label: "GFT (ton/jaar)" },
    { naam: "glasTon", label: "Glas (ton/jaar)" },
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <SectorVeld
          id="factuur-sector"
          registration={register("sector")}
          error={errors.sector?.message}
        />
        <div className="space-y-1">
          <Label htmlFor="factuur-locaties">Aantal locaties</Label>
          <Input
            id="factuur-locaties"
            type="number"
            min={1}
            inputMode="numeric"
            aria-invalid={!!errors.locaties}
            {...register("locaties", { valueAsNumber: true })}
          />
          {errors.locaties && (
            <p role="alert" className="text-sm text-red-600">
              {errors.locaties.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="factuur-kosten">Totale afvalkosten per jaar (€)</Label>
        <Input
          id="factuur-kosten"
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          aria-invalid={!!errors.kostenPerJaar}
          {...register("kostenPerJaar", { valueAsNumber: true })}
        />
        {errors.kostenPerJaar && (
          <p role="alert" className="text-sm text-red-600">
            {errors.kostenPerJaar.message}
          </p>
        )}
        <p className="text-xs text-kpv-grijs/70">{scanContent.stap2.hintKosten}</p>
      </div>

      <fieldset className="rounded-card border border-kpv-border bg-kpv-offwhite/60 p-4">
        <legend className="px-2 text-sm font-medium text-kpv-grijs/70">
          {scanContent.stap2.toelichtingTonnages}
        </legend>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tonnageVelden.map((veld) => (
            <div key={veld.naam} className="space-y-1">
              <Label htmlFor={`factuur-${veld.naam}`}>{veld.label}</Label>
              <Input
                id={`factuur-${veld.naam}`}
                type="number"
                min={0}
                step="any"
                inputMode="decimal"
                {...register(veld.naam, { valueAsNumber: true })}
              />
            </div>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="ghost" onClick={terug}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Terug
        </Button>
        <Button type="submit" size="lg">
          Bereken mijn besparing <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}

function SchattingFormulier() {
  const { toonResultaat, terug, laatsteInput } = useScan();
  const vorige = laatsteInput?.route === "schatting" ? laatsteInput : null;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SchattingInput, unknown, SchattingValues>({
    resolver: zodResolver(schattingSchema),
    defaultValues: vorige
      ? { sector: vorige.sector, m2: vorige.m2, fte: vorige.fte }
      : { sector: "mbo" },
  });

  // Sector-afhankelijke hints en veldlabel (leerlingen/leden/fte).
  const sector = (watch("sector") as Sector) ?? "mbo";
  const fteLabel = FTE_LABELS[sector];
  const kengetal = SECTOR_KENGETALLEN[sector];

  function onSubmit(values: SchattingValues) {
    toonResultaat(berekenScan({ route: "schatting", ...values }));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <SectorVeld
        id="schatting-sector"
        registration={register("sector")}
        error={errors.sector?.message}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="schatting-m2">Aantal m² gebouw</Label>
          <Input
            id="schatting-m2"
            type="number"
            min={0}
            inputMode="numeric"
            aria-invalid={!!errors.m2}
            {...register("m2", { valueAsNumber: true })}
          />
          {errors.m2 && (
            <p role="alert" className="text-sm text-red-600">
              {errors.m2.message}
            </p>
          )}
          <p className="text-xs text-kpv-grijs/70">
            {scanContent.stap2.hintM2(
              formatNumber(kengetal.kgPerM2, 1),
              SECTOR_LABELS[sector].toLowerCase()
            )}
          </p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="schatting-fte">{`Aantal ${fteLabel}`}</Label>
          <Input
            id="schatting-fte"
            type="number"
            min={0}
            inputMode="numeric"
            aria-invalid={!!errors.fte}
            {...register("fte", { valueAsNumber: true })}
          />
          {errors.fte && (
            <p role="alert" className="text-sm text-red-600">
              {errors.fte.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="ghost" onClick={terug}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Terug
        </Button>
        <Button type="submit" size="lg">
          Bereken mijn besparing <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}

export function StepForm() {
  const { route } = useScan();
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-2xl sm:text-3xl">
        {route === "factuur"
          ? scanContent.stap2.titelFactuur
          : scanContent.stap2.titelSchatting}
      </h2>
      <div className="mt-6 rounded-card border border-kpv-border bg-white p-6 shadow-sm sm:p-8">
        {route === "factuur" ? <FactuurFormulier /> : <SchattingFormulier />}
      </div>
    </div>
  );
}
