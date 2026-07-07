import {
  SECTOR_LABELS,
  type FactuurInput,
  type ScanInput,
  type SchattingInput,
  type Sector,
} from "@/lib/scanCalculator";

/**
 * Deelbare scan-URL's: alleen invoerparameters (geen persoonsgegevens).
 * Voorbeeld: /afvalscan?route=schatting&sector=mbo&m2=10000&fte=1200
 */

function getal(params: URLSearchParams, naam: string): number | undefined {
  const raw = params.get(naam);
  if (raw === null || raw === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export function bouwDeelQuery(input: ScanInput): string {
  const params = new URLSearchParams();
  params.set("route", input.route);
  params.set("sector", input.sector);
  if (input.route === "factuur") {
    params.set("locaties", String(input.locaties));
    params.set("kosten", String(input.kostenPerJaar));
    for (const [key, waarde] of [
      ["rest", input.restTon],
      ["papier", input.papierTon],
      ["pmd", input.pmdTon],
      ["gft", input.gftTon],
      ["glas", input.glasTon],
    ] as const) {
      if (waarde !== undefined && waarde > 0) params.set(key, String(waarde));
    }
  } else {
    params.set("m2", String(input.m2));
    params.set("fte", String(input.fte));
  }
  return params.toString();
}

export function parseDeelQuery(params: URLSearchParams): ScanInput | null {
  const route = params.get("route");
  const sector = params.get("sector") as Sector | null;
  if (!sector || !(sector in SECTOR_LABELS)) return null;

  if (route === "factuur") {
    const locaties = getal(params, "locaties");
    const kostenPerJaar = getal(params, "kosten");
    if (!locaties || !kostenPerJaar) return null;
    const input: FactuurInput = {
      route: "factuur",
      sector,
      locaties,
      kostenPerJaar,
      restTon: getal(params, "rest"),
      papierTon: getal(params, "papier"),
      pmdTon: getal(params, "pmd"),
      gftTon: getal(params, "gft"),
      glasTon: getal(params, "glas"),
    };
    return input;
  }

  if (route === "schatting") {
    const m2 = getal(params, "m2");
    const fte = getal(params, "fte");
    if (!m2 || !fte) return null;
    const input: SchattingInput = { route: "schatting", sector, m2, fte };
    return input;
  }

  return null;
}
