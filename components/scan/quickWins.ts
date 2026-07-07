import { sectoren } from "@/content/sectoren";
import type { Sector } from "@/lib/scanCalculator";

/**
 * Sector-specifieke quick wins voor het scanresultaat.
 * Hergebruikt de content van /sectoren; sectoren zonder eigen pagina
 * krijgen een passende generieke set.
 */

const MBO_WINS = [
  "Centrale afvalpunten per verdieping in plaats van bakken per lokaal",
  "PMD-inzameling in kantines en aula's",
  "Leerlingen een rol geven als afvalcoach (voorbeeldrol werkt twee kanten op)",
] as const;

const GENERIEK_WINS = [
  "Individuele prullenbakken vervangen door centrale afvalpunten",
  "PMD en papier apart inzamelen op logische looproutes",
  "Ledigingsfrequentie aanpassen aan het werkelijke volume",
] as const;

const SECTOR_NAAR_SEGMENT: Partial<Record<Sector, string>> = {
  hotel: "hotels",
  retail: "retail",
  gemeentehuis: "gemeentehuizen",
  theater: "cultuur",
  museum: "cultuur",
  kantoor: "kantoren",
};

export function quickWinsVoorSector(sector: Sector): readonly string[] {
  if (sector === "mbo") return MBO_WINS;
  const segmentId = SECTOR_NAAR_SEGMENT[sector];
  const segment = sectoren.segmenten.find((s) => s.id === segmentId);
  return segment?.quickWins ?? GENERIEK_WINS;
}
