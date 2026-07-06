export const sectoren = {
  meta: {
    title: "Sectoren – afvalscheiding voor hotels, retail, gemeenten en cultuur",
    description:
      "GripOpAfval werkt voor KWD-organisaties: hotels, retailketens, gemeentehuizen, cultuurinstellingen en grote MKB-kantoren. Bekijk per sector waar de besparing zit.",
  },
  hero: {
    titel: "Elke sector heeft z'n eigen afvalprofiel",
    subtitel:
      "Onze aanpak is hetzelfde — scan, implementatie, borging — maar de stromen, kengetallen en quick wins verschillen per sector. Kies de uwe.",
  },
  segmenten: [
    {
      id: "hotels",
      naam: "Hotels",
      kengetal: "8,0 kg afval per m² per jaar · 55% restafval",
      tekst:
        "Ontbijtbuffetten, roomservice en events maken hotels tot de grootste afvalproducenten per m² in de KWD-sector. GFT en glas apart inzamelen loont vrijwel direct, en gasten waarderen zichtbare duurzaamheid.",
      quickWins: ["GFT uit keuken en buffet", "Glas per verdieping", "Doseersystemen amenities"],
    },
    {
      id: "retail",
      naam: "Retailketens",
      kengetal: "3,5 kg afval per m² per jaar · 65% restafval",
      tekst:
        "Karton en verpakkingsfolie domineren. Met balenpersen, retourlogistiek via het distributiecentrum en één landelijk contract in plaats van tientallen lokale, dalen kosten én administratie.",
      quickWins: ["Karton persen i.p.v. los", "Folie apart", "Eén landelijk contract"],
    },
    {
      id: "gemeentehuizen",
      naam: "Gemeentehuizen",
      kengetal: "1,8 kg afval per m² per jaar · 55% restafval",
      tekst:
        "De overheid vraagt burgers afval te scheiden — dan moet het eigen huis op orde zijn. Wij helpen gemeenten aantoonbaar het goede voorbeeld te geven, inclusief rapportage voor de raad.",
      quickWins: ["Centrale afvalpunten", "Zero-waste vergaderen", "Raadsrapportage"],
    },
    {
      id: "cultuur",
      naam: "Cultuur (theaters & musea)",
      kengetal: "2,5 kg afval per m² per jaar · 65% restafval",
      tekst:
        "Piekstromen rond voorstellingen en exposities: veel PMD en glas in korte tijd. Slimme pauze-inzameling en afspraken met de horeca-uitbater maken het verschil.",
      quickWins: ["Pauze-stations PMD/glas", "Afspraken met uitbater", "Decor-hergebruik"],
    },
    {
      id: "kantoren",
      naam: "Grote MKB-kantoren",
      kengetal: "1,5 kg afval per m² per jaar · 50% restafval",
      tekst:
        "Lunchafval, koffiebekers en papier. Centrale afvalpunten in plaats van bureaubakken halveert restafval vaak al — mits medewerkers goed worden meegenomen.",
      quickWins: ["Bureaubakken eruit", "Koffiebekers apart", "Nudging op de werkvloer"],
    },
  ],
  mboVerwijzing: {
    kop: "MBO-instellingen zijn onze primaire focus",
    tekst:
      "Voor MBO-instellingen hebben we een eigen pagina met kengetallen, cases en de aansluiting op de duurzaamheidsopdracht van de MBO-Raad.",
    linkLabel: "Naar de MBO-pagina",
    linkHref: "/voor-mbo",
  },
} as const;
