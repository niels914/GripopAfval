import type { Praktijkvoorbeeld } from "./types";

/**
 * Praktijkvoorbeelden van afvalscheiding op drukke, professionele locaties.
 * In eigen woorden beschreven op basis van openbare bronnen (zie bronIds).
 */
export const praktijkvoorbeelden: readonly Praktijkvoorbeeld[] = [
  {
    id: "ns",
    organisatie: "NS",
    sector: "Mobiliteit / stations",
    titel: "Papier scheiden lukt op het drukste station van Nederland",
    samenvatting:
      "NS liet reizigers op stations en in treinen papier en restafval scheiden en haalde daarmee in 2019 al 46% gescheiden afval over de hele organisatie. De grootste les kwam van wat er misging: op meerdere grote stations belandden gescheiden ingezamelde stromen achter de schermen alsnog in dezelfde container. Rotterdam Centraal loste dat op met aparte inzamelrondes per stroom — en daar werkt de scheiding wél. In 2023 zette NS Stations de volgende stap met een gedragsadviestraject voor de stationsretail.",
    lessen: [
      "Bronscheiding staat of valt met de logistiek erachter: regel de gescheiden afvoer vóór je bakken plaatst.",
      "Papier is de makkelijkste winst op drukke locaties; organisch afval vraagt extra aandacht.",
      "Gedrag van bezoekers en van eigen personeel/retail vragen elk hun eigen aanpak.",
    ],
    bronIds: ["ns-afvalscheiding"],
  },
  {
    id: "schiphol",
    organisatie: "Schiphol",
    sector: "Luchtvaart / kantoren",
    titel: "Zero waste in 2030 — kantoren voorop, terminals volgen",
    samenvatting:
      "Schiphol Group wil in 2030 volledig zero waste zijn. In de eigen kantoren werd al zo'n 70% afvalscheiding gehaald; in de terminals, met miljoenen reizigers, ligt het recyclingpercentage rond 45% met een doel van 80%. Het verschil illustreert de kern van elke afvalaanpak: medewerkers kun je trainen en aanspreken, bezoekers moet je verleiden met een omgeving die goed gedrag vanzelfsprekend maakt. KplusV werkt met Schiphol samen aan de route naar afvalvrije luchthavens.",
    lessen: [
      "Begin waar je invloed het grootst is: de eigen kantoren en medewerkers.",
      "Stel een publiek einddoel (zero waste 2030) — dat dwingt tot een programma in plaats van losse acties.",
      "Bezoekersgedrag vraagt omgevingsontwerp: kleuren, pictogrammen en plaatsing doen het werk.",
    ],
    bronIds: ["schiphol-zerowaste"],
  },
  {
    id: "rijkskantoren",
    organisatie: "Rijksoverheid",
    sector: "Overheid / kantoren",
    titel: "De lat van het Rijk: maximaal 35% restafval",
    samenvatting:
      "Voor de eigen kantoren hanteert het Rijk sinds 2020 een harde norm: maximaal 35% van het kantoorafval mag restafval zijn, op weg naar een circulaire werkplek in 2030. Interessant genoeg is dat exact het aandeel 'werkelijk restafval' dat sorteeranalyses in de KWD-sector laten zien — de norm zegt dus eigenlijk: alles wat herwinbaar is, wórdt gescheiden. Voor gemeentehuizen en publieke organisaties is dit het logische referentiepunt.",
    lessen: [
      "Een concreet percentage (max 35% rest) werkt beter dan een vage duurzaamheidsambitie.",
      "Wie inwoners of studenten vraagt te scheiden, moet het eigen huis aantoonbaar op orde hebben.",
      "De benchmark van 187 kg afval per medewerker maakt kantoren onderling vergelijkbaar.",
    ],
    bronIds: ["rijksdoel-35", "afvalbenchmark-kantoren"],
  },
  {
    id: "scholen",
    organisatie: "140 scholen (programma Afval op School)",
    sector: "Onderwijs",
    titel: "Afvalvrije scholen: minder kosten én een leermiddel",
    samenvatting:
      "In het programma Afval op School werden 140 scholen begeleid, telkens beginnend met een sorteeranalyse. Basisschool De Paradijsvogel in Den Haag bespaart sindsdien zo'n € 5.000 per jaar, vooral door lagere inzamelkosten. De landelijke ambitie: 50% afvalvrije scholen in 2030, en voor het MBO trok het Rijk in 2026 € 2 miljoen uit voor duurzaamheidscoördinatoren. Afval scheiden op school is daarmee geen kostenpost maar een besparing — en tegelijk lesmateriaal dat leerlingen meenemen naar hun stagebedrijf.",
    lessen: [
      "Start met een sorteeranalyse: meten maakt draagvlak.",
      "Leerlingen zijn de beste ambassadeurs — geef ze een rol in plaats van een preek.",
      "De besparing zit vooral in minder ledigingen van de restcontainer.",
    ],
    bronIds: ["afval-op-school"],
  },
] as const;
