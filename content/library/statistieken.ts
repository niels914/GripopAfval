import type { Kerncijfer } from "./types";

/** Herbruikbare kerncijfers voor site, whitepaper en presentaties. */
export const kerncijfers: readonly Kerncijfer[] = [
  { waarde: "5,3 mln ton", label: "afval produceert de KWD-sector per jaar", bronId: "clo-kwd-afval" },
  { waarde: "2 mln ton", label: "daarvan is restafval, vergelijkbaar met huishoudelijk afval", bronId: "vang-uitvoeringsprogramma" },
  { waarde: "1 mln+", label: "bedrijven vormen samen de KWD-sector", bronId: "vang-uitvoeringsprogramma" },
  { waarde: "+127%", label: "stijgt de afvalstoffenbelasting: van € 39,71 (2025) naar € 90,21 per ton (2028)", bronId: "afvalstoffenbelasting" },
  { waarde: "€ 295", label: "per ton CO2 betalen afvalverbranders in 2030 (heffing vanaf 2027)", bronId: "co2-heffing-avi" },
  { waarde: "187 kg", label: "afval per aanwezige medewerker per jaar op een gemiddeld kantoor", bronId: "afvalbenchmark-kantoren" },
  { waarde: "max 35%", label: "restafval is de norm die het Rijk voor de eigen kantoren hanteert", bronId: "rijksdoel-35" },
  { waarde: "60%+", label: "van het KWD-restafval bestaat uit slechts vier herwinbare fracties", bronId: "sorteeranalyse-kwd-2024" },
  { waarde: "19,2%", label: "van het KWD-restafval is keukenafval (swill) — de grootste fractie", bronId: "sorteeranalyse-kwd-2024" },
  { waarde: "± 46%", label: "van al het NS-afval werd in 2019 gescheiden aangeboden voor recycling", bronId: "ns-afvalscheiding" },
  { waarde: "70%", label: "afvalscheiding haalde Schiphol in de eigen kantoren", bronId: "schiphol-zerowaste" },
  { waarde: "€ 5.000", label: "bespaart één basisschool per jaar door afvalvrij te werken", bronId: "afval-op-school" },
] as const;
