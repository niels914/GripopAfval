export const scanContent = {
  meta: {
    title: "Gratis afvalscan – bereken uw besparing",
    description:
      "Bereken in 2 minuten hoeveel uw organisatie kan besparen op afvalkosten en CO2. Onafhankelijk, op basis van uw factuurdata of kengetallen.",
  },
  hero: {
    titel: "De gratis afvalscan",
    subtitel:
      "Bereken in 2 minuten wat betere afvalscheiding uw organisatie oplevert: in euro's én in CO2. Geen verplichtingen, geen verkooppraatje.",
  },
  stappen: ["Instap", "Uw gegevens", "Resultaat"],
  stap1: {
    titel: "Hoe wilt u starten?",
    subtitel: "Kies de route die bij u past — beide duren maar een paar minuten.",
    factuur: {
      titel: "Ik heb mijn factuurdata bij de hand",
      badge: "Nauwkeurig",
      beschrijving:
        "U vult uw werkelijke afvalkosten en (optioneel) tonnages in. Dit geeft het scherpste beeld van uw besparingspotentieel.",
    },
    schatting: {
      titel: "Ik schat op basis van m² en fte",
      badge: "Snel",
      beschrijving:
        "Geen facturen bij de hand? Wij schatten uw afvalprofiel op basis van sectorkengetallen en de omvang van uw gebouw.",
    },
  },
  stap2: {
    titelFactuur: "Uw factuurgegevens",
    titelSchatting: "Uw organisatie in cijfers",
    toelichtingTonnages:
      "Tonnages zijn optioneel: hoe meer u invult, hoe nauwkeuriger het resultaat.",
    hintM2: (kg: string, sector: string) =>
      `Ter referentie: een ${sector} produceert gemiddeld ${kg} kg afval per m² per jaar.`,
    hintKosten:
      "Het totaal van al uw afvalfacturen over 12 maanden, inclusief huur van containers en ledigingen.",
  },
  stap3: {
    titel: "Uw besparingspotentieel",
    huidigeSituatie: "Uw huidige situatie",
    samenstelling: "Wat zit er nog in uw restafval?",
    samenstellingToelichting:
      "Modelmatige samenstelling van restafval bij KWD-organisaties. Een sorteeranalyse tijdens de afvalscan maakt dit exact voor uw locatie.",
    scenarios: "Drie besparingsscenario's",
    scenariosToelichting:
      "Op basis van het tariefverschil tussen restafval (€ 190/ton) en gemiddeld gescheiden inzamelen (€ 80/ton). CO2: indicatief 1 ton reductie per ton restafval die niet verbrand wordt.",
    ctaTitel: "Ontvang uw rapport per e-mail",
    ctaTekst:
      "Wij sturen u het volledige rapport met uw cijfers, de aannames en concrete vervolgstappen. Binnen 2 werkdagen nemen we contact op om het door te spreken.",
    disclaimer:
      "Alle bedragen zijn indicatief en gebaseerd op kengetallen en gemiddelde markttarieven. De betaalde afvalscan vervangt deze schatting door uw werkelijke cijfers.",
    benchmark: {
      titel: "Hoe doet u het vergeleken met uw sector?",
      beterDanSector: (pct: string) =>
        `U scheidt ${pct} méér dan het sectorgemiddelde — een goede basis om op door te bouwen.`,
      slechterDanSector: (pct: string) =>
        `U scheidt ${pct} mínder dan het sectorgemiddelde. Goed nieuws: dat betekent dat de snelste winst binnen handbereik ligt.`,
      gelijkAanSector:
        "U zit rond het sectorgemiddelde. De scenario's hieronder laten zien wat er boven het gemiddelde te halen valt.",
      uwLabel: "Uw scheidingsgraad",
      sectorLabel: "Sectorgemiddelde",
    },
    spreiding: {
      consistent:
        "Uw m²- en fte-gegevens wijzen op een vergelijkbaar afvalvolume — de schatting is redelijk robuust.",
      afwijkend: (fteTon: string) =>
        `Op basis van uw fte-aantal zou het volume rond ${fteTon} ton liggen — dat wijkt flink af van de m²-schatting. Juist dan loont een echte meting.`,
    },
    projectie: {
      titel: "Wat gebeurt er als u niets doet?",
      toelichting:
        "De CO2-heffing verdubbelt het restafvaltarief richting 2028 (aanname, zie onze whitepaper). Zonder actie stijgt uw factuur vanzelf; met scheiding groeit juist uw besparing mee.",
      zonderActie: "Zonder actie",
      metScenario: "Met uw scenario",
      cumulatiefLabel: (bedrag: string) =>
        `Cumulatief verschil 2026–2030: ${bedrag}`,
    },
    whatIf: {
      titel: "Reken zelf: wat als…?",
      toelichting:
        "Verschuif de aannames en zie direct het effect. Zo bouwt u het scenario dat ú gelooft.",
      reductieLabel: "Reductie restafval",
      tariefLabel: "Restafvaltarief (€/ton)",
      investeringLabel: "Investering per locatie (€)",
      reset: "Terug naar standaardwaarden",
    },
    cashflow: {
      titel: "Wat kost het — en wat houdt u over?",
      toelichting:
        "Volledige transparantie: onze succes-fee is 20% van de gerealiseerde besparing. Geen besparing, geen fee. Zo ziet uw netto-plaatje er over drie jaar uit (realistisch scenario):",
      kolommen: ["Jaar", "Bruto besparing", "Succes-fee (20%)", "Investering", "Netto voordeel"],
      cumulatiefLabel: "Cumulatief netto na 3 jaar",
    },
    quickWins: {
      titel: "Waar te beginnen in uw sector",
    },
    aannames: {
      titel: "Hoe rekenen wij? Alle aannames op een rij",
      toelichting:
        "Wij rekenen liever eerlijk dan mooi. Dit zijn de kengetallen achter deze scan — dezelfde als in onze whitepaper. De betaalde scan vervangt ze door uw gemeten waarden.",
    },
    delen: {
      knop: "Deel deze berekening",
      gekopieerd: "Link gekopieerd!",
      toelichting: "De link bevat alleen uw invoer, geen persoonsgegevens.",
    },
    bandbreedte: (laag: string, hoog: string) => `${laag} – ${hoog}`,
  },
} as const;
