import type { FaqItem } from "./types";

/** Veelgestelde vragen — bruikbaar op /kennis en voor SEO (FAQ-rich results). */
export const faq: readonly FaqItem[] = [
  {
    vraag: "Waarom wordt restafval de komende jaren zoveel duurder?",
    antwoord:
      "Twee stapelende maatregelen: de afvalstoffenbelasting stijgt van € 39,71 per ton (2025) naar € 90,21 in 2028 (+127%), en afvalverbranders betalen vanaf 2027 een oplopende CO2-heffing richting € 295 per ton CO2 in 2030. Verwerkers berekenen beide door in het poorttarief voor restafval. Gescheiden stromen ontlopen het grootste deel van die stijging.",
  },
  {
    vraag: "Hoeveel afval produceert een gemiddeld kantoor?",
    antwoord:
      "De afvalbenchmark van Rijkswaterstaat komt uit op gemiddeld 187 kg afval per aanwezige medewerker per jaar. Grote verschillen tussen vergelijkbare kantoren zijn normaal — dat is precies waarom een nulmeting loont.",
  },
  {
    vraag: "Wat zit er eigenlijk in het restafval van bedrijven?",
    antwoord:
      "Sorteeranalyses in de KWD-sector (2024) laten zien: 19,2% keukenafval, 14,5% papier/karton en 13,8% plastic verpakkingen. Ruim 60% van het restafval bestaat uit vier fracties die allemaal gescheiden ingezameld kunnen worden — vaak tegen de helft van het tarief of minder.",
  },
  {
    vraag: "Is een percentage als 'maximaal 35% restafval' realistisch?",
    antwoord:
      "Ja — het is de norm die het Rijk sinds 2020 voor de eigen kantoren hanteert, en het spoort met sorteeranalyses: circa een derde van het huidige restafval is 'werkelijk' restafval, de rest is herwinbaar. Wie alles scheidt wat te scheiden valt, komt vanzelf in die buurt.",
  },
  {
    vraag: "Moet ik eerst nieuwe bakken kopen?",
    antwoord:
      "Nee — begin bij de logistiek en het gedrag. De les van NS is leerzaam: op meerdere stations belandden keurig gescheiden stromen achter de schermen alsnog in één container. Regel eerst de gescheiden afvoer en het contract, richt dan de inzamelstructuur in, en neem medewerkers mee. Middelen zijn het sluitstuk, niet het startpunt.",
  },
  {
    vraag: "Werkt afval scheiden ook op locaties met veel bezoekers?",
    antwoord:
      "Ja, maar bezoekers vragen een andere aanpak dan medewerkers. Schiphol haalt in de eigen kantoren ± 70% scheiding, in de terminals ± 45%. Bezoekersgedrag stuur je met omgevingsontwerp: consistente kleuren en pictogrammen, logische plaatsing en nudges zoals voetstappen of pijlen — niet met beleid dat niemand leest.",
  },
  {
    vraag: "Wat levert het financieel op?",
    antwoord:
      "De besparing komt uit drie hoeken: minder tonnen tegen het dure restafvaltarief, minder (of kleinere) ledigingen van de restcontainer, en het vermijden van de tariefstijgingen richting 2028. Zelfs één basisschool bespaart al ± € 5.000 per jaar; bij grotere KWD-organisaties gaat het al snel om tienduizenden euro's. Reken uw eigen situatie door met onze gratis afvalscan.",
  },
  {
    vraag: "Waar begin ik?",
    antwoord:
      "Met meten: verzamel 12 maanden facturen en laat een sorteeranalyse doen. Elke succesvolle aanpak — van rijkskantoren tot afvalvrije scholen — begint met een nulmeting. Daarna volgen inzamelstructuur, gedragsaanpak, contract en borging.",
  },
  {
    vraag: "Is bronscheiding niet zinloos omdat 'alles toch op één hoop' gaat?",
    antwoord:
      "Die scepsis is begrijpelijk en soms terecht geweest — zie de NS-casus. Maar het is een uitvoeringsfout, geen natuurwet: met aparte inzamelrondes of gescheiden containers klopt de keten wél. Vraag uw inzamelaar om aan te tonen waar elke stroom heen gaat; een goed contract legt dat vast.",
  },
  {
    vraag: "Wat is VANG Buitenshuis en wat heb ik eraan?",
    antwoord:
      "VANG Buitenshuis is het programma van Rijkswaterstaat dat de KWD-sector helpt het restafval te halveren (van 2 naar 1 miljoen ton). Het publiceert sorteeranalyses, benchmarks en handreikingen zoals de Wegwijzer Afvalvrij Kantoor — openbare kennis waar elke organisatie gratis gebruik van kan maken. GripOpAfval bouwt op dezelfde onderzoekslijn: KplusV was onderzoekspartner van Rijkswaterstaat binnen Circulair Vooruit.",
  },
] as const;
