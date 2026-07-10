export const site = {
  naam: "GripOpAfval",
  tagline: "Onafhankelijke afvalscheiding op de werkvloer",
  beschrijving:
    "GripOpAfval helpt MBO-instellingen, hotels, retail en andere KWD-organisaties grip te krijgen op hun afvalstromen, kosten en CO2. Onafhankelijk, op succes-fee. Een propositie van KplusV.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gripopafval.nl",
  email: "info@gripopafval.nl",
  telefoon: "+31 (0)26 355 13 55",
  linkedinNiels: "https://www.linkedin.com/in/nielsahsmann/",
  kplusv: {
    naam: "KplusV",
    url: "https://www.kplusv.nl",
    regel: "40+ jaar advies in circulaire economie",
    partner: "Onderzoekspartner van Rijkswaterstaat via Circulair Vooruit",
  },
};

export const navigatie = [
  { href: "/afvalscan", label: "Afvalscan" },
  { href: "/advies", label: "Adviesbot" },
  { href: "/hoe-werkt-het", label: "Hoe werkt het?" },
  { href: "/voor-mbo", label: "Voor MBO" },
  { href: "/sectoren", label: "Sectoren" },
  { href: "/onafhankelijk", label: "Onafhankelijk" },
  { href: "/cases", label: "Cases" },
  { href: "/kennis", label: "Kennis" },
] as const;

export const footerKolommen = [
  {
    titel: "Aanbod",
    links: [
      { href: "/afvalscan", label: "Gratis afvalscan" },
      { href: "/advies", label: "Adviesbot" },
      { href: "/hoe-werkt-het", label: "Hoe werkt het?" },
      { href: "/onafhankelijk", label: "Onze onafhankelijkheid" },
      { href: "/cases", label: "Klantverhalen" },
    ],
  },
  {
    titel: "Sectoren",
    links: [
      { href: "/voor-mbo", label: "MBO-instellingen" },
      { href: "/sectoren#hotels", label: "Hotels" },
      { href: "/sectoren#retail", label: "Retail" },
      { href: "/sectoren#gemeentehuizen", label: "Gemeentehuizen" },
      { href: "/sectoren#cultuur", label: "Cultuur" },
    ],
  },
  {
    titel: "Organisatie",
    links: [
      { href: "/over", label: "Over GripOpAfval" },
      { href: "/kennis", label: "Kennis & whitepapers" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
] as const;
