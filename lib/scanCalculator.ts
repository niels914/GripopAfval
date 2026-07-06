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
  id: ScenarioId;
  naam: string;
  /** Reductie van restafval als fractie (0-1). */
  reductie: number;
  /** Ton restafval per jaar dat verdwijnt uit de reststroom. */
  restReductieTon: number;
  /** Besparing in € per jaar. */
  besparingPerJaar: number;
  /** CO2-reductie in ton per jaar. */
  co2ReductieTon: number;
  /** Terugverdientijd van inzamelmiddelen in maanden (null = geen besparing). */
  terugverdientijdMaanden: number | null;
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

function berekenScenarios(
  restTon: number,
  locaties: number
): ScenarioResultaat[] {
  const investering = Math.max(1, locaties) * INVESTERING_PER_LOCATIE;
  return SCENARIOS.map((s) => {
    const restReductieTon = restTon * s.reductie;
    // Elke ton die uit het restafval verdwijnt, wordt gescheiden ingezameld:
    // besparing = tariefverschil rest vs. gemiddeld gescheiden.
    const besparingPerJaar =
      restReductieTon * (TARIEVEN.rest - TARIEVEN.gescheidenGemiddeld);
    const co2ReductieTon = restReductieTon * CO2_PER_TON_REST;
    const terugverdientijdMaanden =
      besparingPerJaar > 0 ? (investering / besparingPerJaar) * 12 : null;
    return {
      id: s.id,
      naam: s.naam,
      reductie: s.reductie,
      restReductieTon: round(restReductieTon, 1),
      besparingPerJaar: Math.round(besparingPerJaar),
      co2ReductieTon: round(co2ReductieTon, 1),
      terugverdientijdMaanden:
        terugverdientijdMaanden !== null ? round(terugverdientijdMaanden, 1) : null,
    };
  });
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
  };
}

export function berekenSchattingScan(input: SchattingInput): ScanResultaat {
  const { kgPerM2, restAandeel } = SECTOR_KENGETALLEN[input.sector];
  const totaalTon = (input.m2 * kgPerM2) / 1000;
  const restTon = totaalTon * restAandeel;
  const gescheidenTon = totaalTon - restTon;
  const kostenPerJaar =
    restTon * TARIEVEN.rest + gescheidenTon * TARIEVEN.gescheidenGemiddeld;

  return {
    input,
    kostenPerJaar: Math.round(kostenPerJaar),
    totaalTon: round(totaalTon, 1),
    restTon: round(restTon, 1),
    gescheidenTon: round(gescheidenTon, 1),
    scheidingsgraad: round(1 - restAandeel, 3),
    kgPerM2,
    geschat: true,
    samenstelling: RESTAFVAL_SAMENSTELLING,
    scenarios: berekenScenarios(restTon, 1),
  };
}

export function berekenScan(input: ScanInput): ScanResultaat {
  return input.route === "factuur"
    ? berekenFactuurScan(input)
    : berekenSchattingScan(input);
}
