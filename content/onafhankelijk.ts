export const onafhankelijk = {
  meta: {
    title: "Onafhankelijk – wij hebben geen belang bij méér afval",
    description:
      "GripOpAfval verkoopt geen containers en heeft geen inzamelcontract. Ons verdienmodel loopt op minder afval — daarom is ons advies écht onafhankelijk.",
  },
  hero: {
    titel: "Wij hebben geen belang bij méér afval.",
    subtitel:
      "De afvalmarkt verdient aan volume: meer containers, meer ledigingen, meer tonnen. Wij draaien dat om. Hoe minder afval u heeft, hoe beter wij het doen.",
  },
  blokken: [
    {
      titel: "Wij verkopen geen containers",
      tekst:
        "Geen hardware, geen leasecontracten, geen marge op inzamelmiddelen. Wij adviseren wat werkt — ook als dat mínder middelen betekent.",
      icon: "package-x",
    },
    {
      titel: "Wij hebben geen inzamelcontract",
      tekst:
        "Wij zijn geen partij in uw inzamelcontract en ontvangen geen commissie van inzamelaars. Bij aanbestedingen zitten wij aan úw kant van de tafel.",
      icon: "file-x",
    },
    {
      titel: "Ons verdienmodel loopt op MINDER afval",
      tekst:
        "Succes-fee over gerealiseerde besparing. Elke ton die uit uw restafval verdwijnt, is ons gezamenlijke resultaat — niet onze gemiste omzet.",
      icon: "trending-down",
    },
  ],
  vergelijking: {
    kop: "Hoe wij ons verhouden tot de markt",
    toelichting:
      "Vijf assen die bepalen of een partner uw belang dient — of het eigen volume.",
    kolommen: ["GripOpAfval (KplusV)", "Inzamelaars", "Adviesbureaus", "Startups"],
    rijen: [
      {
        as: "Onafhankelijkheid van volume",
        scores: ["goed", "slecht", "goed", "deels"],
      },
      {
        as: "Aanbestedingskennis",
        scores: ["goed", "deels", "deels", "slecht"],
      },
      {
        as: "Gedragsverandering op de werkvloer",
        scores: ["goed", "slecht", "deels", "deels"],
      },
      {
        as: "Verdienmodel gealigneerd met klant",
        scores: ["goed", "slecht", "deels", "deels"],
      },
      {
        as: "Schaalbaarheid over locaties",
        scores: ["goed", "goed", "slecht", "deels"],
      },
    ],
  },
  cta: {
    kop: "Test onze onafhankelijkheid",
    tekst:
      "Vraag ons het hemd van het lijf in een verkennend gesprek — of begin met de gratis scan en zie zelf waar de besparing zit.",
    primair: { label: "Doe de gratis afvalscan", href: "/afvalscan" },
    secundair: { label: "Neem contact op", href: "/contact" },
  },
} as const;
