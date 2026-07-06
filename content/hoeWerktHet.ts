export const hoeWerktHet = {
  meta: {
    title: "Hoe werkt het? – scan, implementatie, abonnement",
    description:
      "De aanpak van GripOpAfval in drie lagen: een afvalscan met sorteeranalyse, implementatie op succes-fee en een borgingsabonnement met CSRD-rapportage.",
  },
  hero: {
    titel: "Drie lagen, één doel: blijvend minder afval",
    subtitel:
      "U stapt in met een scan en beslist daarna per laag of u doorgaat. Geen lange contracten vooraf, geen verrassingen achteraf.",
  },
  lagen: [
    {
      stap: "Laag 1",
      tier: "Afvalscan",
      price: "€ 1.500 – 2.500",
      duration: "2-4 weken",
      description:
        "We analyseren uw facturen, doen een sorteeranalyse op locatie en spreken met facilitaire teams. U krijgt een rapport met uw werkelijke stromen, kosten en het besparingspotentieel per locatie.",
      punten: [
        "Sorteeranalyse op locatie",
        "Contract- en factuurcheck",
        "Businesscase per scenario",
        "Volledig verrekenbaar bij vervolg",
      ],
    },
    {
      stap: "Laag 2",
      tier: "Implementatie",
      price: "Succes-fee: 20% van de besparing",
      duration: "3 jaar",
      description:
        "Wij richten de inzamelstructuur in, trainen medewerkers, begeleiden gedragsverandering en heronderhandelen uw inzamelcontract. U betaalt alleen over wat u aantoonbaar bespaart.",
      punten: [
        "Inzamelmiddelen en routing",
        "Gedragsprogramma werkvloer",
        "Aanbesteding of heronderhandeling",
        "Wij verdienen pas bij besparing",
      ],
    },
    {
      stap: "Laag 3",
      tier: "Abonnement",
      price: "€ 3.000 – 6.000 per jaar",
      duration: "Doorlopend",
      description:
        "Resultaten zakken weg zonder aandacht. We monitoren uw stromen, sturen bij op afwijkingen en leveren jaarlijks de cijfers voor uw CSRD- of duurzaamheidsrapportage.",
      punten: [
        "Kwartaalmonitoring stromen",
        "Jaarlijkse hercheck tarieven",
        "CSRD-datarapportage",
        "Opzegbaar per jaar",
      ],
    },
  ],
  faq: [
    {
      vraag: "Wat als de besparing tegenvalt?",
      antwoord:
        "Dan betaalt u ons ook minder: de succes-fee is 20% van de gerealiseerde besparing, gemeten ten opzichte van uw nulmeting uit de scan. Geen besparing betekent geen fee.",
    },
    {
      vraag: "Moeten we wisselen van inzamelaar?",
      antwoord:
        "Niet per se. Vaak valt binnen het bestaande contract al veel te winnen. Als een aanbesteding wél loont, begeleiden we die — zonder eigen belang bij de uitkomst.",
    },
    {
      vraag: "Hoe meten jullie de besparing?",
      antwoord:
        "Op basis van uw facturen en weegdata, vergeleken met de nulmeting uit de scan, gecorrigeerd voor tariefwijzigingen en volumeontwikkeling van uw organisatie.",
    },
  ],
} as const;
