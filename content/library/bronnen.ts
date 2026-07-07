import type { Bron } from "./types";

/**
 * Bronnenbank: onderzoeken en publicaties waarop de site-content steunt.
 * Bevindingen zijn in eigen woorden samengevat; teksten zijn niet overgenomen.
 * Status "geverifieerd" = tijdens de redactie online nagelezen (juli 2026).
 */
export const bronnen: readonly Bron[] = [
  {
    id: "vang-uitvoeringsprogramma",
    titel: "Uitvoeringsprogramma VANG Buitenshuis (t/m 2025)",
    uitgever: "Rijkswaterstaat / Ministerie IenW",
    jaar: "2021",
    url: "https://open.rijkswaterstaat.nl/open-overheid/onderzoeksrapporten/@256503/uitvoeringsprogramma-vang-buitenshuis/",
    kernbevindingen: [
      "De KWD-sector (kantoor, winkel, diensten) telt ruim 1 miljoen bedrijven en produceert ± 2 miljoen ton restafval per jaar dat vergelijkbaar is met huishoudelijk afval.",
      "Programmadoel: halvering van het KWD-restafval naar 1 miljoen ton.",
      "Focus op afvalpreventie, bronscheiding en circulaire bedrijfsvoering.",
    ],
    status: "geverifieerd",
  },
  {
    id: "sorteeranalyse-kwd-2024",
    titel: "Samenstelling restafval van de KWD-sector in 2024 (sorteeranalyse)",
    uitgever: "De Afvalspiegel, in opdracht van VANG Buitenshuis (IenW)",
    jaar: "2025",
    url: "https://open.overheid.nl/documenten/09e32674-b02f-4771-ae11-0c97dd428144/file",
    kernbevindingen: [
      "KWD-restafval bestaat voor 19,2% uit keukenafval (swill), 14,5% papier/karton en 13,8% plastic verpakkingen.",
      "Vier fracties (papier/karton, keukenafval, plastic verpakkingen en plastic niet-verpakkingen) vormen samen ruim 60% van het gesorteerde restafval.",
      "De spreiding tussen bedrijven en inzamelroutes is groot: een sorteeranalyse op de eigen locatie blijft nodig voor betrouwbare cijfers.",
    ],
    status: "geverifieerd",
  },
  {
    id: "clo-kwd-afval",
    titel: "Kantoor-, winkel- en dienstenafval, 1985-2018",
    uitgever: "CBS / Compendium voor de Leefomgeving",
    jaar: "2020",
    url: "https://www.clo.nl/indicatoren/nl0157-kantoor--winkel-en-dienstenafval",
    kernbevindingen: [
      "De KWD-sector produceert in totaal ± 5,3 miljoen ton afval per jaar.",
      "Ongeveer de helft wordt gerecycled; de andere helft is restafval dat wordt verbrand.",
      "Het aandeel nuttige toepassing steeg van ± 25% (1990) naar ± 93% (2016) — maar bronscheiding van restafval blijft achter.",
    ],
    status: "geverifieerd",
  },
  {
    id: "afvalstoffenbelasting",
    titel: "Verhoging afvalstoffenbelasting (Belastingplan 2026)",
    uitgever: "Rijksoverheid / Ministerie van Financiën",
    jaar: "2025",
    url: "https://www.rijksoverheid.nl/onderwerpen/afval/afvalstoffenbelasting",
    kernbevindingen: [
      "De afvalstoffenbelasting op verbranden en storten stijgt van € 39,71 per ton (2025) naar € 90,21 per ton in 2028 — een stijging van ruim 127%.",
      "Vanaf 2035 loopt het tarief verder op naar € 113,81 per ton.",
      "Doel: verbranden van herbruikbaar materiaal ontmoedigen en recycling lonend maken.",
    ],
    status: "geverifieerd",
  },
  {
    id: "co2-heffing-avi",
    titel: "Verhoging CO2-heffing afvalverbrandingsinstallaties",
    uitgever: "Rijksoverheid (o.a. geduid door PwC en NVRD)",
    jaar: "2025",
    url: "https://www.nvrd.nl/nieuws/kabinet-kondigt-forse-tariefstijging-afvalverbranding-aan-vanaf-2028/",
    kernbevindingen: [
      "Bovenop de afvalstoffenbelasting betalen afvalverbranders vanaf 2027 een oplopende CO2-heffing, richting € 295 per ton CO2 in 2030.",
      "Verwerkers berekenen beide heffingen door in de poorttarieven voor restafval.",
      "Gecombineerd effect: restafval wordt richting 2028-2030 fors duurder; gescheiden stromen ontlopen het grootste deel van de stijging.",
    ],
    status: "geverifieerd",
  },
  {
    id: "afvalbenchmark-kantoren",
    titel: "Afvalbenchmark kantoren",
    uitgever: "Rijkswaterstaat (VANG Buitenshuis), geduid door Facto",
    jaar: "2021",
    url: "https://www.facto.nl/42839/afvalbenchmark-kantoren-gemiddeld-187-kilo-afval-per-persoon-per-jaar",
    kernbevindingen: [
      "Kantoren produceren gemiddeld 187 kg afval per aanwezige medewerker per jaar.",
      "De benchmark maakt kantoren onderling vergelijkbaar en legt grote verschillen tussen vergelijkbare organisaties bloot.",
    ],
    status: "geverifieerd",
  },
  {
    id: "rijksdoel-35",
    titel: "Circulaire bedrijfsvoering Rijk: maximaal 35% restafval",
    uitgever: "Rijksoverheid (duurzaamheidsverslag IenW)",
    jaar: "2024",
    url: "https://magazines.rijksoverheid.nl/ienw/duurzaamheidsverslag/2024/01/strategie-klimaatneutrale-en-circulaire-organisatie",
    kernbevindingen: [
      "Het Rijk hanteert sinds 2020 voor de eigen kantoren de doelstelling: maximaal 35% van het kantoorafval is restafval.",
      "Ambitie: een circulaire werkplek waar afval in 2030 vrijwel niet meer bestaat.",
      "Relevant als referentiepunt: wat de rijksoverheid van zichzelf vraagt, is een redelijke lat voor elke KWD-organisatie.",
    ],
    status: "geverifieerd",
  },
  {
    id: "ns-afvalscheiding",
    titel: "Afvalscheiding op stations en in treinen",
    uitgever: "NS (jaarverslag) / NOS / VANG Buitenshuis",
    jaar: "2018-2023",
    url: "https://www.nsjaarverslag.nl/jaarverslag-2019/onze-activiteiten-en-prestaties-in-nederland/duurzame-prestaties/afval-op-stations-en-in-treinen",
    kernbevindingen: [
      "NS scheidde in 2019 46% van al het afval van kantoren, werkplaatsen, stations en treinen voor recycling.",
      "Papier scheiden op stations en in treinen werkt goed; organisch afval (zoals koffiedrab) blijft achter.",
      "Cruciale les: bronscheiding faalt als de logistiek erachter niet klopt — gescheiden bakken die in dezelfde container belanden, ondermijnen alles. Op Rotterdam Centraal loste NS dit op met aparte inzamelrondes.",
      "NS Stations won in 2023 een gedragsadviestraject van VANG Buitenshuis voor betere afvalscheiding bij stationsretail.",
    ],
    status: "geverifieerd",
  },
  {
    id: "schiphol-zerowaste",
    titel: "Schiphol op weg naar een zero waste luchthaven",
    uitgever: "Schiphol Group / Change Inc.",
    jaar: "2019-2023",
    url: "https://www.schiphol.nl/nl/duurzaamheid/duurzaamheid-op-de-luchthaven/gescheiden-inzamelen/",
    kernbevindingen: [
      "Schiphol Group wil in 2030 zero waste zijn: geen restafval, alleen her te gebruiken of te recyclen stromen.",
      "Recyclingpercentage ± 45%, met als doel ± 80% binnen vijf jaar.",
      "In de eigen kantoren haalde Schiphol al ± 70% afvalscheiding (2019) — onder reizigers is dat veel moeilijker: gedrag van bezoekers vraagt een andere aanpak dan gedrag van medewerkers.",
      "KplusV werkt met Schiphol samen aan de route naar afvalvrije luchthavens in 2030.",
    ],
    status: "geverifieerd",
  },
  {
    id: "afval-op-school",
    titel: "Afval op School — eindrapportage begeleiding 140 scholen",
    uitgever: "Rijkswaterstaat / Afvaleducatie.nl",
    jaar: "2021",
    url: "https://afvaleducatie.nl/images/bibliotheek/Eindrapportage_Afval_op_School.pdf",
    kernbevindingen: [
      "140 scholen werden begeleid naar minder en beter gescheiden afval, met sorteeranalyses als startpunt.",
      "Praktijkvoorbeeld: basisschool De Paradijsvogel (Den Haag) bespaart ± € 5.000 per jaar, vooral door lagere inzamelkosten.",
      "Landelijke ambitie: 50% afvalvrije scholen in 2030; het Rijk trok in 2026 € 2 miljoen uit voor duurzaamheidscoördinatoren in het MBO.",
    ],
    status: "geverifieerd",
  },
  {
    id: "gedrag-nudging",
    titel: "Gedragsinterventies en nudging bij afvalscheiding",
    uitgever: "Rijkswaterstaat (zwerfafval/gedrag) e.a.",
    jaar: "2015-2020",
    url: "https://zwerfafval.rijkswaterstaat.nl/publish/pages/177917/rapport-van-bekkie-naar-bakkie-def.pdf",
    kernbevindingen: [
      "Gedrag volgt de omgeving: zichtbare, logisch geplaatste bakken met heldere visuele cues verminderen fout weggooien aanzienlijk.",
      "Werkende nudges: kleur- en pictogramconsistentie, groene voetstappen/pijlen naar inzamelpunten, positieve sociale-normcommunicatie.",
      "Een schone omgeving houdt zichzelf schoon: op opgeruimde plekken wordt aantoonbaar minder bijgegooid.",
    ],
    status: "geverifieerd",
  },
  {
    id: "ipr-normag",
    titel: "Besparingspotentieel afvalkosten KWD-sector",
    uitgever: "IPR Normag",
    jaar: "2026",
    url: "",
    kernbevindingen: [
      "20% besparen op afvalkosten is haalbaar door betere scheiding aan de bron.",
    ],
    status: "te-valideren",
  },
  {
    id: "ipsos-io",
    titel: "Kostenperceptie afvalscheiding bij KWD-organisaties",
    uitgever: "Ipsos I&O",
    jaar: "2025",
    url: "",
    kernbevindingen: [
      "61% van de KWD-organisaties ziet momenteel geen kostenvoordeel in afvalscheiding.",
    ],
    status: "te-valideren",
  },
] as const;

export function bron(id: string): Bron | undefined {
  return bronnen.find((b) => b.id === id);
}
