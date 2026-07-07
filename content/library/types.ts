/** Types voor de contentlibrary (bronnen, cijfers, cases, artikelen, FAQ). */

export interface Bron {
  id: string;
  titel: string;
  uitgever: string;
  jaar: string;
  url: string;
  /** Belangrijkste bevindingen, in eigen woorden samengevat. */
  kernbevindingen: readonly string[];
  /** geverifieerd = online nagelezen; te-valideren = claim uit briefing/derde hand. */
  status: "geverifieerd" | "te-valideren";
}

export interface Kerncijfer {
  waarde: string;
  label: string;
  bronId: string;
}

export interface Praktijkvoorbeeld {
  id: string;
  organisatie: string;
  sector: string;
  titel: string;
  samenvatting: string;
  lessen: readonly string[];
  bronIds: readonly string[];
}

export interface Artikel {
  slug: string;
  titel: string;
  ondertitel: string;
  samenvatting: string;
  leestijdMinuten: number;
  datum: string; // ISO
  /** Volledige tekst; elke entry is een alinea of (met "## "-prefix) een tussenkop. */
  body: readonly string[];
  bronIds: readonly string[];
}

export interface FaqItem {
  vraag: string;
  antwoord: string;
}
