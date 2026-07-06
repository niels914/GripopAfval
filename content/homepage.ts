export const homepage = {
  hero: {
    h1: "Wij verdienen pas als u bespaart.",
    subheader:
      "Onafhankelijke afvalscheiding op de werkvloer. Voor MBO-instellingen, hotels, retail en andere KWD-organisaties die grip willen op hun afvalstromen, kosten en CO2.",
    ctaPrimair: { label: "Doe de gratis afvalscan", href: "/afvalscan" },
    ctaSecundair: { label: "Hoe werkt het?", href: "/hoe-werkt-het" },
  },
  problemen: [
    {
      number: "20%",
      label: "besparen kán op uw afvalkosten door betere scheiding aan de bron",
      source: "IPR Normag 2026",
      icon: "piggy-bank",
    },
    {
      number: "61%",
      label: "van de KWD-organisaties ziet nu geen kostenvoordeel in afvalscheiding",
      source: "Ipsos I&O 2025",
      icon: "eye-off",
    },
    {
      number: "2×",
      label: "CO2-heffing verdubbelt de tarieven voor restafval vanaf 2028",
      source: "Rijksoverheid",
      icon: "trending-up",
    },
  ],
  verdienmodel: {
    kop: "Ons verdienmodel",
    uitspraak:
      "Wij verdienen aan minder afval. Inzamelaars aan meer.",
    toelichting:
      "Daarom werken wij op succes-fee: 20% van uw gerealiseerde besparing. Niet vooraf.",
    linkLabel: "Lees waarom onafhankelijkheid telt",
    linkHref: "/onafhankelijk",
  },
  productLagen: {
    kop: "Zo werkt het: drie lagen",
    subtitel:
      "Van eerste inzicht tot geborgde besparing. U stapt in waar het u past — en kunt na elke laag stoppen.",
    lagen: [
      {
        stap: "Laag 1",
        tier: "Afvalscan",
        price: "€ 1.500 – 2.500",
        duration: "2-4 weken",
        description:
          "Sorteeranalyse, kostenanalyse en besparingspotentieel per locatie. Volledig verrekenbaar bij een vervolg.",
        punten: ["Verrekenbaar bij vervolg"],
      },
      {
        stap: "Laag 2",
        tier: "Implementatie",
        price: "Succes-fee: 20%",
        duration: "3 jaar",
        description:
          "Wij richten de inzamelstructuur in, begeleiden gedrag op de werkvloer en heronderhandelen contracten. U betaalt alleen over gerealiseerde besparing.",
        punten: ["Wij verdienen pas bij besparing"],
      },
      {
        stap: "Laag 3",
        tier: "Abonnement",
        price: "€ 3.000 – 6.000/jr",
        duration: "Doorlopend",
        description:
          "Borging van resultaten, monitoring van stromen en jaarlijkse CSRD-rapportage voor uw duurzaamheidsverslag.",
        punten: ["Borging + CSRD-rapportage"],
      },
    ],
  },
  segmenten: {
    kop: "Voor wie?",
    subtitel:
      "Wij richten ons op kantoor-, winkel- en dienstenorganisaties (KWD) met veel bezoekers en meerdere afvalstromen.",
    tegels: [
      {
        naam: "MBO-instellingen",
        beschrijving:
          "Praktijklokalen, kantines en klaslokalen: onze scan haalt er tot 30% restafval uit. Primaire focus van GripOpAfval.",
        href: "/voor-mbo",
        icon: "graduation-cap",
        featured: true,
      },
      {
        naam: "Hotels",
        beschrijving: "Hoge volumes, veel GFT en glas: snel resultaat.",
        href: "/sectoren#hotels",
        icon: "bed-double",
      },
      {
        naam: "Retailketens",
        beschrijving: "Karton en PMD centraal regelen over al uw filialen.",
        href: "/sectoren#retail",
        icon: "shopping-bag",
      },
      {
        naam: "Gemeentehuizen",
        beschrijving: "Geef als overheid het goede voorbeeld, aantoonbaar.",
        href: "/sectoren#gemeentehuizen",
        icon: "landmark",
      },
      {
        naam: "Cultuur",
        beschrijving: "Theaters en musea: piekstromen rond voorstellingen.",
        href: "/sectoren#cultuur",
        icon: "theater",
      },
      {
        naam: "Grote MKB-kantoren",
        beschrijving: "Van vergaderafval tot lunchstromen: grip zonder gedoe.",
        href: "/sectoren#kantoren",
        icon: "building-2",
      },
    ],
  },
  quotes: {
    kop: "Wat opdrachtgevers zeggen",
    items: [
      {
        quote:
          "Voor het eerst een partij die niet méér containers wil verkopen, maar minder afval wil zien. Dat voel je in elk advies.",
        naam: "J. van der Berg",
        functie: "Facilitair manager, MBO-instelling",
      },
      {
        quote:
          "De scan gaf ons harde cijfers voor het duurzaamheidsverslag én een businesscase die de controller meteen begreep.",
        naam: "S. Willems",
        functie: "Duurzaamheidscoördinator",
      },
      {
        quote:
          "Succes-fee betekent dat het risico bij hen ligt. De besparing kwam er — en meer dan berekend.",
        naam: "M. de Haan",
        functie: "Controller",
      },
    ],
  },
  whitepaper: {
    kop: "Whitepaper: Grip op KWD-afval in 2026",
    tekst:
      "Wat betekent de CO2-heffing voor uw afvalkosten? Welke stromen lonen het eerst? Praktische gids voor facilitair managers en duurzaamheidscoördinatoren.",
    knop: "Stuur me de whitepaper",
  },
} as const;
