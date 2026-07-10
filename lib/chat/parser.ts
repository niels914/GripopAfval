import { handvattenAdviesSchema, type HandvattenAdvies } from "./types";

/**
 * De bot levert het eindadvies als JSON tussen deze markers, midden in
 * gewone tekst. De client verbergt alles vanaf de openingsmarker tijdens
 * het streamen en rendert het geparste advies als kaarten.
 */
export const HANDVATTEN_START = "<HANDVATTEN>";
export const HANDVATTEN_EINDE = "</HANDVATTEN>";

export interface GeparseerdAntwoord {
  /** Tekst vóór (en eventueel ná) het handvattenblok, zonder markers. */
  tekst: string;
  /** Gevalideerd advies, of null als er (nog) geen compleet blok is. */
  advies: HandvattenAdvies | null;
  /** True zodra de openingsmarker gezien is maar het blok nog niet af is. */
  bezigMetAdvies: boolean;
}

/**
 * Parseert een (mogelijk nog onvolledig gestreamd) botantwoord.
 * Robuust tegen: half gestreamde markers, ongeldige JSON, ontbrekend blok.
 */
export function parseBotAntwoord(ruw: string): GeparseerdAntwoord {
  const start = ruw.indexOf(HANDVATTEN_START);
  if (start === -1) {
    // Verberg een half gestreamde openingsmarker aan het einde ("<HANDV...").
    return { tekst: knipHalveMarker(ruw), advies: null, bezigMetAdvies: false };
  }

  const voor = ruw.slice(0, start).trimEnd();
  const eind = ruw.indexOf(HANDVATTEN_EINDE, start);
  if (eind === -1) {
    return { tekst: voor, advies: null, bezigMetAdvies: true };
  }

  const jsonRuw = ruw.slice(start + HANDVATTEN_START.length, eind).trim();
  const na = ruw.slice(eind + HANDVATTEN_EINDE.length).trim();
  const tekst = [voor, na].filter(Boolean).join("\n\n");

  const advies = parseAdviesJson(jsonRuw);
  return { tekst, advies, bezigMetAdvies: false };
}

/** Valideert het JSON-blok; null bij ongeldige JSON of schema-afwijking. */
export function parseAdviesJson(jsonRuw: string): HandvattenAdvies | null {
  let data: unknown;
  try {
    data = JSON.parse(jsonRuw);
  } catch {
    return null;
  }
  const parsed = handvattenAdviesSchema.safeParse(data);
  return parsed.success ? parsed.data : null;
}

/**
 * Knipt een onvolledig gestreamde openingsmarker van het einde af, zodat
 * "<HANDV" nooit even als lostekst opflitst in de chat.
 */
function knipHalveMarker(tekst: string): string {
  for (let lengte = HANDVATTEN_START.length - 1; lengte > 0; lengte--) {
    if (tekst.endsWith(HANDVATTEN_START.slice(0, lengte))) {
      return tekst.slice(0, tekst.length - lengte);
    }
  }
  return tekst;
}
