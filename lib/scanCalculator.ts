/**
 * Kernberekeningen van de GripOpAfval-afvalscan.
 *
 * Alle kengetallen en tarieven zijn indicatief en bewust als exporteerbare
 * constantes opgenomen, zodat ze op één plek beheerd (en getest) worden.
 */

export type Sector =
  | "mbo"
  | "hotel"
  | "retail"
  | "gemeentehuis"
  | "kantoor"
  | "theater"
  | "museum"
  | "sportclub"
  | "overig";

export const SECTOR_LABELS: Record<Sector, string> = {
  mbo: "MBO-instelling",
  hotel: "Hotel",
  retail: "Retail",
  gemeentehuis: "Gemeentehuis",
  kantoor: "Kantoor",
  theater: "Theater",
  museum: "Museum",
  sportclub: "Sportclub",
  overig: "Overig",
};

/** Afvalintensiteit per sector: kg afval per m² per jaar + aandeel restafval (gewichtsbasis). */
export const SECTOR_KENGETALLEN: Record<
  Sector,
  { kgPerM2: number; restAandeel: number }
> = {
  mbo: { kgPerM2: 2.0, restAandeel: 0.6 },
  hotel: { kgPerM2: 8.0, restAandeel: 0.55 },
  retail: { kgPerM2: 3.5, restAandeel: 0.65 },
  gemeentehuis: { kgPerM2: 1.8, restAandeel: 0.55 },
  kantoor: { kgPerM2: 1.5, restAandeel: 0.5 },
  theater: { kgPerM2: 2.5, restAandeel: 0.65 },
  museum: { kgPerM2: 2.5, restAandeel: 0.65 },
  sportclub: { kgPerM2: 3.0, restAandeel: 0.7 },
  overig: { kgPerM2: 2.0, restAandeel: 0.6 },
};

/** Indicatieve verwerkingstarieven in € per ton. */
export const TARIEVEN = {
  rest: 190, // incl. verbrandingsbelasting
  papier: 40,
  pmd: 90,
  gft: 110,
  glas: 80,
  gescheidenGemiddeld: 80,
} as const;

/**
 * Modelmatige samenstelling van restafval bij KWD-organisaties:
 * wat er ná scheiding aan de bron nog uit het restafval te halen valt.
 */
export const RESTAFVAL_SAMENSTELLING = [
  { key: "papier", label: "Papier/karton", pct: 22 },
  { key: "pmd", label: "PMD", pct: 18 },
  { key: "gft", label: "GFT", pct: 15 },
  { key: "overig", label: "Overig herbruikbaar", pct: 10 },
  { key: "rest", label: "Werkelijk restafval", pct: 35 },
] as const;

/** Besparingsscenario's: percentage minder restafval. */
export const SCENARIOS = [
  { id: "voorzichtig", naam: "Voorzichtig", reductie: 0.2 },
  { id: "realistisch", naam: "Realistisch", reductie: 0.35 },
  { id: "ambitieus", naam: "Ambitieus", reductie: 0.5 },
] as const;

export type ScenarioId = (typeof SCENARIOS)[number]["id"];

/** Indicatief: 1,0 ton CO2-reductie per ton restafval die niet verbrand wordt. */
export const CO2_PER_TON_REST = 1.0;

/** Indicatieve investering in inzamelmiddelen (afvalstations, bebording) per locatie. */
export const INVESTERING_PER_LOCATIE = 1500;

/**
 * Indicatief afval in kg per fte (of leerling/bezoekerequivalent) per jaar.
 * Tweede schattingsbron naast m²: grote afwijking tussen beide is een
 * signaal dat een echte meting (de betaalde scan) nodig is.
 * Aannames — te valideren met sorteerdata.
 */
export const KG_PER_FTE: Record<Sector, number> = {
  mbo: 15, // per leerling
  hotel: 2000, // per fte (keuken, housekeeping, F&B)
  retail: 400,
  gemeentehuis: 120,
  kantoor: 135,
  theater: 250,
  museum: 250,
  sportclub: 60, // per lid
  overig: 150,
};

/** Label voor het fte-veld per sector (leerlingen, leden, fte). */
export const FTE_LABELS: Record<Sector, string> = {
  mbo: "leerlingen",
  hotel: "fte",
  retail: "fte",
  gemeentehuis: "fte",
  kantoor: "fte",
  theater: "fte",
  museum: "fte",
  sportclub: "leden",
  overig: "fte",
};

/** Onzekerheidsmarge rond modelmatige besparingen (±20%). */
export const ONZEKERHEIDSMARGE = 0.2;

/** Succes-fee van GripOpAfval: aandeel van de gerealiseerde besparing. */
export const SUCCES_FEE = 0.2;

/**
 * Aanname CO2-heffing: het restafvaltarief verdubbelt vanaf 2028
 * (consistent met de whitepaper; beleidsaanname — te valideren).
 */
export const TARIEF_REST_2028 = TARIEVEN.rest * 2;

/** Jaren in de meerjarenprojectie. */
export const PROJECTIE_JAREN = [2026, 2027, 2028, 2029, 2030] as const;

export interface FactuurInput {
  route: "factuur";
  sector: Sector;
  locaties: number;
  /** Totale afvalkosten per jaar in €. */
  kostenPerJaar: number;
  /** Optionele tonnages per stroom, per jaar. */
  restTon?: number;
  papierTon?: number;
  pmdTon?: number;
  gftTon?: number;
  glasTon?: number;
}

export interface SchattingInput {
  route: "schatting";
  sector: Sector;
  /** Bruto vloeroppervlak in m². */
  m2: number;
  /** Aantal fte of leerlingen (voor context in het rapport). */
  fte: number;
}

export type ScanInput = FactuurInput | SchattingInput;

export interface ScenarioResultaat {
  id: ScenarioId | "maatwerk";
  naam: string;
  /** Reductie van restafval als fractie (0-1). */
  reductie: number;
  /** Ton restafval per jaar dat verdwijnt uit de reststroom. */
  restReductieTon: number;
  /** Besparing in € per jaar (puntschatting). */
  besparingPerJaar: number;
  /** Onderkant bandbreedte (−20%). */
  besparingLaag: number;
  /** Bovenkant bandbreedte (+20%). */
  besparingHoog: number;
  /** CO2-reductie in ton per jaar. */
  co2ReductieTon: number;
  /** Terugverdientijd van inzamelmiddelen in maanden (null = geen besparing). */
  terugverdientijdMaanden: number | null;
}

/** Vergelijking van de eigen situatie met het sectorkengetal. */
export interface Benchmark {
  /** Gemiddelde scheidingsgraad in de sector (0-1). */
  scheidingsgraadSector: number;
  /** Relatieve afwijking t.o.v. de sector; +0.25 = 25% beter dan gemiddeld. */
  scheidingsgraadAfwijking: number;
  /** Sectorkengetal kg/m² (alleen relevant bij schattingsroute). */
  kgPerM2Sector: number;
}

/** Eén jaar uit de meerjarenprojectie (effect CO2-heffing). */
export interface MeerjarenJaar {
  jaar: number;
  /** Restafvaltarief in dat jaar (€/ton). */
  tariefRest: number;
  /** Verwerkingskosten zonder actie (€/jaar). */
  kostenZonderActie: number;
  /** Verwerkingskosten mét het gekozen scenario (€/jaar). */
  kostenMetScenario: number;
  /** Verschil (= besparing) in dat jaar. */
  verschil: number;
}

/** Eén jaar uit de netto-cashflow inclusief succes-fee. */
export interface CashflowJaar {
  jaar: 1 | 2 | 3;
  brutoBesparing: number;
  succesFee: number;
  investering: number;
  netto: number;
  cumulatief: number;
}

/** Aanpasbare aannames voor het what-if-paneel. */
export interface WhatIfOpties {
  /** Reductie van restafval als fractie (0-1). */
  reductie: number;
  /** Restafvaltarief in €/ton (default TARIEVEN.rest). */
  tariefRest?: number;
  /** Investering per locatie in € (default INVESTERING_PER_LOCATIE). */
  investeringPerLocatie?: number;
}

export interface ScanResultaat {
  input: ScanInput;
  /** Totale afvalkosten per jaar in € (opgegeven of geschat). */
  kostenPerJaar: number;
  /** Totaal afval in ton per jaar. */
  totaalTon: number;
  /** Restafval in ton per jaar. */
  restTon: number;
  /** Gescheiden ingezameld in ton per jaar. */
  gescheidenTon: number;
  /** Scheidingsgraad als fractie (0-1). */
  scheidingsgraad: number;
  /** kg afval per m² per jaar; alleen bij schattingsroute bekend. */
  kgPerM2: number | null;
  /** Of tonnages/kosten (deels) modelmatig geschat zijn. */
  geschat: boolean;
  samenstelling: typeof RESTAFVAL_SAMENSTELLING;
  scenarios: ScenarioResultaat[];
  /** Vergelijking met het sectorgemiddelde. */
  benchmark: Benchmark;
  /** Tweede schatting op basis van fte (alleen schattingsroute), ton/jaar. */
  fteSchattingTon: number | null;
  /**
   * Relatieve afwijking tussen m²- en fte-schatting (0.5 = 50%).
   * Grote spreiding = extra reden voor een echte meting.
   */
  schattingsSpreiding: number | null;
}

function round(value: number, decimals = 1): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}

function clampNonNegative(value: number | undefined): number {
  return value !== undefined && Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Schat het totale afvalvolume (ton/jaar) op basis van jaarkosten en de
 * sectorverdeling rest/gescheiden: kosten = rest×€190 + gescheiden×€80.
 */
export function schatTonnageUitKosten(
  kostenPerJaar: number,
  sector: Sector
): { totaalTon: number; restTon: number; gescheidenTon: number } {
  const { restAandeel } = SECTOR_KENGETALLEN[sector];
  const kostenPerTon =
    restAandeel * TARIEVEN.rest + (1 - restAandeel) * TARIEVEN.gescheidenGemiddeld;
  const totaalTon = kostenPerJaar / kostenPerTon;
  return {
    totaalTon,
    restTon: totaalTon * restAandeel,
    gescheidenTon: totaalTon * (1 - restAandeel),
  };
}

/** Kern van elke scenarioberekening; ook gebruikt door het what-if-paneel. */
export function berekenScenario(
  restTon: number,
  locaties: number,
  reductie: number,
  meta: { id: ScenarioResultaat["id"]; naam: string },
  opties?: Pick<WhatIfOpties, "tariefRest" | "investeringPerLocatie">
): ScenarioResultaat {
  const tariefRest = opties?.tariefRest ?? TARIEVEN.rest;
  const investeringPerLocatie =
    opties?.investeringPerLocatie ?? INVESTERING_PER_LOCATIE;
  const investering = Math.max(1, locaties) * investeringPerLocatie;

  const restReductieTon = restTon * reductie;
  // Elke ton die uit het restafval verdwijnt, wordt gescheiden ingezameld:
  // besparing = tariefverschil rest vs. gemiddeld gescheiden.
  const besparingPerJaar =
    restReductieTon * (tariefRest - TARIEVEN.gescheidenGemiddeld);
  const co2ReductieTon = restReductieTon * CO2_PER_TON_REST;
  const terugverdientijdMaanden =
    besparingPerJaar > 0 ? (investering / besparingPerJaar) * 12 : null;

  return {
    id: meta.id,
    naam: meta.naam,
    reductie,
    restReductieTon: round(restReductieTon, 1),
    besparingPerJaar: Math.round(besparingPerJaar),
    besparingLaag: Math.round(besparingPerJaar * (1 - ONZEKERHEIDSMARGE)),
    besparingHoog: Math.round(besparingPerJaar * (1 + ONZEKERHEIDSMARGE)),
    co2ReductieTon: round(co2ReductieTon, 1),
    terugverdientijdMaanden:
      terugverdientijdMaanden !== null ? round(terugverdientijdMaanden, 1) : null,
  };
}

function berekenScenarios(
  restTon: number,
  locaties: number
): ScenarioResultaat[] {
  return SCENARIOS.map((s) =>
    berekenScenario(restTon, locaties, s.reductie, { id: s.id, naam: s.naam })
  );
}

/** Vergelijk scheidingsgraad met het sectorgemiddelde. */
export function benchmarkTegenSector(
  sector: Sector,
  scheidingsgraad: number
): Benchmark {
  const kengetal = SECTOR_KENGETALLEN[sector];
  const scheidingsgraadSector = 1 - kengetal.restAandeel;
  return {
    scheidingsgraadSector: round(scheidingsgraadSector, 3),
    scheidingsgraadAfwijking:
      scheidingsgraadSector > 0
        ? round((scheidingsgraad - scheidingsgraadSector) / scheidingsgraadSector, 3)
        : 0,
    kgPerM2Sector: kengetal.kgPerM2,
  };
}

/** Restafvaltarief per jaar: lineair pad naar de verdubbeling in 2028. */
export function tariefRestInJaar(
  jaar: number,
  basisTarief: number = TARIEVEN.rest
): number {
  const eindTarief = basisTarief * 2;
  if (jaar <= 2026) return basisTarief;
  if (jaar >= 2028) return eindTarief;
  return Math.round(basisTarief + (eindTarief - basisTarief) / 2); // 2027: halverwege
}

/**
 * Meerjarenprojectie 2026-2030: verwerkingskosten zonder actie vs. met het
 * gekozen reductiescenario, inclusief het effect van de CO2-heffing.
 */
export function berekenMeerjarenProjectie(
  resultaat: Pick<ScanResultaat, "restTon" | "gescheidenTon">,
  reductie: number,
  opties?: Pick<WhatIfOpties, "tariefRest">
): MeerjarenJaar[] {
  const basisTarief = opties?.tariefRest ?? TARIEVEN.rest;
  const restReductie = resultaat.restTon * reductie;

  return PROJECTIE_JAREN.map((jaar) => {
    const tarief = tariefRestInJaar(jaar, basisTarief);
    const kostenZonderActie =
      resultaat.restTon * tarief +
      resultaat.gescheidenTon * TARIEVEN.gescheidenGemiddeld;
    const kostenMetScenario =
      (resultaat.restTon - restReductie) * tarief +
      (resultaat.gescheidenTon + restReductie) * TARIEVEN.gescheidenGemiddeld;
    return {
      jaar,
      tariefRest: tarief,
      kostenZonderActie: Math.round(kostenZonderActie),
      kostenMetScenario: Math.round(kostenMetScenario),
      verschil: Math.round(kostenZonderActie - kostenMetScenario),
    };
  });
}

/**
 * Netto-cashflow over 3 jaar: bruto besparing minus succes-fee (20%) en
 * de eenmalige investering in jaar 1. Transparant, want zo werken wij.
 */
export function berekenCashflow(
  besparingPerJaar: number,
  locaties: number,
  opties?: Pick<WhatIfOpties, "investeringPerLocatie">
): CashflowJaar[] {
  const investering =
    Math.max(1, locaties) *
    (opties?.investeringPerLocatie ?? INVESTERING_PER_LOCATIE);
  let cumulatief = 0;
  return ([1, 2, 3] as const).map((jaar) => {
    const succesFee = Math.round(besparingPerJaar * SUCCES_FEE);
    const inv = jaar === 1 ? investering : 0;
    const netto = Math.round(besparingPerJaar - succesFee - inv);
    cumulatief += netto;
    return {
      jaar,
      brutoBesparing: Math.round(besparingPerJaar),
      succesFee,
      investering: inv,
      netto,
      cumulatief,
    };
  });
}

/** Alles wat het what-if-paneel nodig heeft, herberekend met aangepaste aannames. */
export function berekenWhatIf(
  resultaat: Pick<ScanResultaat, "restTon" | "gescheidenTon" | "input">,
  opties: WhatIfOpties
): {
  scenario: ScenarioResultaat;
  cashflow: CashflowJaar[];
  projectie: MeerjarenJaar[];
} {
  const locaties =
    resultaat.input.route === "factuur" ? resultaat.input.locaties : 1;
  const scenario = berekenScenario(
    resultaat.restTon,
    locaties,
    opties.reductie,
    { id: "maatwerk", naam: "Uw scenario" },
    opties
  );
  return {
    scenario,
    cashflow: berekenCashflow(scenario.besparingPerJaar, locaties, opties),
    projectie: berekenMeerjarenProjectie(resultaat, opties.reductie, opties),
  };
}

export function berekenFactuurScan(input: FactuurInput): ScanResultaat {
  const opgegevenStromen = {
    rest: clampNonNegative(input.restTon),
    papier: clampNonNegative(input.papierTon),
    pmd: clampNonNegative(input.pmdTon),
    gft: clampNonNegative(input.gftTon),
    glas: clampNonNegative(input.glasTon),
  };
  const somOpgegeven =
    opgegevenStromen.rest +
    opgegevenStromen.papier +
    opgegevenStromen.pmd +
    opgegevenStromen.gft +
    opgegevenStromen.glas;

  let totaalTon: number;
  let restTon: number;
  let geschat: boolean;

  if (somOpgegeven > 0 && opgegevenStromen.rest > 0) {
    // Tonnages bekend: gebruik de werkelijke cijfers.
    totaalTon = somOpgegeven;
    restTon = opgegevenStromen.rest;
    geschat = false;
  } else {
    // Geen (volledige) tonnages: schat modelmatig op basis van kosten.
    const schatting = schatTonnageUitKosten(input.kostenPerJaar, input.sector);
    totaalTon = schatting.totaalTon;
    restTon = schatting.restTon;
    geschat = true;
  }

  const gescheidenTon = totaalTon - restTon;
  const scheidingsgraad = totaalTon > 0 ? gescheidenTon / totaalTon : 0;

  return {
    input,
    kostenPerJaar: Math.round(input.kostenPerJaar),
    totaalTon: round(totaalTon, 1),
    restTon: round(restTon, 1),
    gescheidenTon: round(gescheidenTon, 1),
    scheidingsgraad: round(scheidingsgraad, 3),
    kgPerM2: null,
    geschat,
    samenstelling: RESTAFVAL_SAMENSTELLING,
    scenarios: berekenScenarios(restTon, input.locaties),
    benchmark: benchmarkTegenSector(input.sector, scheidingsgraad),
    fteSchattingTon: null,
    schattingsSpreiding: null,
  };
}

export function berekenSchattingScan(input: SchattingInput): ScanResultaat {
  const { kgPerM2, restAandeel } = SECTOR_KENGETALLEN[input.sector];
  // m² is de primaire schattingsbron; fte dient als consistentiecheck.
  const totaalTon = (input.m2 * kgPerM2) / 1000;
  const fteSchattingTon = (input.fte * KG_PER_FTE[input.sector]) / 1000;
  const schattingsSpreiding =
    totaalTon > 0 ? Math.abs(fteSchattingTon - totaalTon) / totaalTon : null;

  const restTon = totaalTon * restAandeel;
  const gescheidenTon = totaalTon - restTon;
  const kostenPerJaar =
    restTon * TARIEVEN.rest + gescheidenTon * TARIEVEN.gescheidenGemiddeld;
  const scheidingsgraad = 1 - restAandeel;

  return {
    input,
    kostenPerJaar: Math.round(kostenPerJaar),
    totaalTon: round(totaalTon, 1),
    restTon: round(restTon, 1),
    gescheidenTon: round(gescheidenTon, 1),
    scheidingsgraad: round(scheidingsgraad, 3),
    kgPerM2,
    geschat: true,
    samenstelling: RESTAFVAL_SAMENSTELLING,
    scenarios: berekenScenarios(restTon, 1),
    benchmark: benchmarkTegenSector(input.sector, scheidingsgraad),
    fteSchattingTon: round(fteSchattingTon, 1),
    schattingsSpreiding:
      schattingsSpreiding !== null ? round(schattingsSpreiding, 2) : null,
  };
}

export function berekenScan(input: ScanInput): ScanResultaat {
  return input.route === "factuur"
    ? berekenFactuurScan(input)
    : berekenSchattingScan(input);
}
