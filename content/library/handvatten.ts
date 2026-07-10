import type { HandvatCategorie } from "./types";

/**
 * Bouwstenenbank voor de adviesbot: concrete handvatten waaruit het advies
 * wordt samengesteld en op de situatie van de bezoeker wordt toegesneden.
 *
 * Genoemde partijen en leveranciers zijn voorbeelden ter oriëntatie — geen
 * betaalde vermeldingen en geen aanbeveling; GripOpAfval is en blijft
 * onafhankelijk van inzamelaars en leveranciers.
 */
export interface HandvatBouwsteen {
  id: string;
  categorie: HandvatCategorie;
  titel: string;
  /** De kern van het handvat; de bot snijdt dit toe op de situatie. */
  kern: string;
  links?: readonly { label: string; url: string }[];
  /** Optionele hint voor welke situaties dit vooral relevant is. */
  vooral?: string;
}

export const CATEGORIE_LABELS: Record<HandvatCategorie, string> = {
  contract: "Contract & inkoop",
  middelen: "Bakken & middelen",
  inrichting: "Inrichting & plaatsing",
  gedrag: "Gedrag & draagvlak",
  meten: "Meten & monitoren",
  pilot: "Pilot & aanpak",
  communicatie: "Communicatie",
  kennis: "Kennis & inspiratie",
};

export const handvattenBank: readonly HandvatBouwsteen[] = [
  // ── Contract & inkoop ──────────────────────────────────────────────
  {
    id: "offertes-vergelijken",
    categorie: "contract",
    titel: "Vraag bij minstens drie inzamelaars een offerte op",
    kern:
      "Afvalcontracten verschillen enorm in tarief en voorwaarden. Landelijke partijen waar u online een offerte kunt aanvragen: Renewi, PreZero en Milieu Service Nederland. Vraag daarnaast één regionale inzamelaar — die is op korte afstand vaak scherper. Vergelijk niet alleen het tarief per lediging, maar ook huur, brandstoftoeslag en opzegtermijn.",
    links: [
      { label: "Renewi", url: "https://www.renewi.com/nl-nl" },
      { label: "PreZero", url: "https://www.prezero.nl" },
      { label: "Milieu Service Nederland", url: "https://www.milieuservicenederland.nl" },
    ],
  },
  {
    id: "contract-checklist",
    categorie: "contract",
    titel: "Zet vijf harde eisen in uw volgende afvalcontract",
    kern:
      "1) Flexibele ledigingsfrequentie (afschalen mag zonder boete), 2) tarief per stroom transparant op de factuur, 3) aantoonbare gescheiden verwerking per stroom, 4) looptijd maximaal 2-3 jaar met stilzwijgende verlenging van hooguit een jaar, 5) jaarlijkse rapportage in kilo's per stroom. Zo houdt u ruimte om te verbeteren zónder vast te zitten.",
  },
  {
    id: "ledigingen-afschalen",
    categorie: "contract",
    titel: "Schaal de restcontainer af zodra u scheidt",
    kern:
      "De grootste besparing zit vaak niet in het tarief maar in minder of kleinere ledigingen van de restcontainer. Wie papier, PMD en swill eruit haalt, kan de ledigingsfrequentie van rest vaak halveren. Bel uw inzamelaar en vraag wat een lagere frequentie of kleinere container scheelt — dat kan meestal per direct.",
  },

  // ── Bakken & middelen ─────────────────────────────────────────────
  {
    id: "afvalstations",
    categorie: "middelen",
    titel: "Kies centrale afvalstations met 3-4 stromen",
    kern:
      "Eén meubel met rest, papier, PMD en eventueel swill/GFT werkt beter dan losse bakken. Let op: per stroom een vaste kleur, een inworpopening in de vorm van de fractie (gleuf voor papier, rond gat voor bekers/PMD) en een duidelijk pictogram. Leveranciers ter oriëntatie: Vepa Bins en EKO. Begin niet met kopen — bepaal eerst het aantal en de plekken (zie inrichting).",
    links: [{ label: "Vepa Bins", url: "https://www.vepabins.nl" }],
  },
  {
    id: "bureaubakken-weg",
    categorie: "middelen",
    titel: "Haal de prullenbakken onder de bureaus weg",
    kern:
      "Zolang iedereen een eigen restbak binnen handbereik heeft, verliest elke scheidingsbak die strijd. De rijkskantoren en Schiphol-kantoren deden precies dit: individuele bakken eruit, centrale stations erin. Verwacht een week gemor — daarna is het went het en stijgt de scheiding direct.",
    vooral: "kantooromgevingen, gemeentehuizen, onderwijs (docentenkamers)",
  },
  {
    id: "swill-apart",
    categorie: "middelen",
    titel: "Zamel keukenafval (swill) apart in",
    kern:
      "Keukenafval is met 19,2% de grootste fractie in het KWD-restafval én de zwaarste — en gewicht bepaalt de rekening. Een aparte swillbak in kantine en keuken, opgehaald als aparte stroom, scheelt direct tonnen restafval. Voor horeca en onderwijskantines vrijwel altijd de snelste winst.",
    vooral: "kantines, horeca, hotels",
  },

  // ── Inrichting & plaatsing ────────────────────────────────────────
  {
    id: "plaatsing-looproutes",
    categorie: "inrichting",
    titel: "Plaats stations op looproutes, niet in hoeken",
    kern:
      "Vuistregels: maximaal ~15 meter lopen naar een station, altijd één bij de bron van het afval (koffiecorner, printer, kantine-uitgang, entree), zichtbaar in de looproute en overal in het pand op dezelfde manier. Loop het pand door met een plattegrond en markeer waar afval óntstaat — daar horen de stations.",
  },
  {
    id: "consistentie-pand",
    categorie: "inrichting",
    titel: "Maak het systeem overal in het pand identiek",
    kern:
      "Dezelfde kleuren, dezelfde pictogrammen, dezelfde volgorde van bakken — op elke verdieping en locatie. Bezoekers en medewerkers beslissen in twee seconden; elke afwijking kost scheidingsresultaat. Schiphol stuurt bezoekersgedrag vrijwel volledig met dit soort omgevingsontwerp.",
  },

  // ── Gedrag & draagvlak ────────────────────────────────────────────
  {
    id: "gedragsaanpak-ns",
    categorie: "gedrag",
    titel: "Leer van NS: regel eerst de achterkant, dan het gedrag",
    kern:
      "NS liet reizigers keurig scheiden, maar op meerdere stations belandden de stromen achter de schermen alsnog in één container — dodelijk voor het vertrouwen. Rotterdam Centraal loste het op met aparte inzamelrondes per stroom. Les: laat éérst zien dat gescheiden stromen ook gescheiden worden afgevoerd, en communiceer dat actief. In 2023 volgde een gedragsadviestraject voor de stationsretail — gedrag van eigen mensen en bezoekers vraagt elk een eigen aanpak.",
  },
  {
    id: "gedragsaanpak-organisatie",
    categorie: "gedrag",
    titel: "Neem de organisatie mee in vier stappen",
    kern:
      "1) Deel de nulmeting ('dit gooien wíj weg — en dit kost het'), 2) stel één concreet doel (bijv. maximaal 35% restafval, de rijksnorm), 3) geef teams zichtbare terugkoppeling per maand, 4) benoem ambassadeurs per afdeling of klas die aanspreken en vieren. Gedrag verandert door feedback en sociale norm, niet door een memo.",
  },
  {
    id: "nudges",
    categorie: "gedrag",
    titel: "Gebruik nudges op de plek van de keuze",
    kern:
      "Voetstappen of pijlen op de vloer richting het station, een poster mét spiegel-effect ('9 van de 10 collega's scheiden hier hun afval'), de restopening bewust klein maken en de scheidingsopeningen groot. Kleine ingrepen, meetbaar effect — juist op plekken met bezoekers die je niet kunt trainen.",
    vooral: "locaties met veel bezoekers: stations, scholen, retail, cultuur",
  },
  {
    id: "studenten-rol",
    categorie: "gedrag",
    titel: "Geef studenten of leerlingen een echte rol",
    kern:
      "De 140 scholen uit het programma Afval op School leren: jongeren zijn de beste ambassadeurs als ze eigenaarschap krijgen — een studentenpanel dat de bakken kiest, een opleiding Facilitair die de sorteeranalyse uitvoert als praktijkopdracht, campagnemateriaal van de opleiding Media. Dat werkt beter dan elke poster en is meteen onderwijs.",
    vooral: "MBO en ander onderwijs",
  },

  // ── Meten & monitoren ─────────────────────────────────────────────
  {
    id: "nulmeting-facturen",
    categorie: "meten",
    titel: "Start met 12 maanden facturen op één A4",
    kern:
      "Zet per maand de kosten en (waar vermeld) kilo's of ledigingen per stroom onder elkaar. Dit ene A4 laat zien waar het geld heen gaat, is de basis voor elk gesprek met inzamelaars én de nulmeting waartegen u straks verbetering aantoont. Onze gratis afvalscan rekent er direct een besparingspotentieel mee door.",
    links: [{ label: "Gratis afvalscan", url: "/afvalscan" }],
  },
  {
    id: "sorteeranalyse",
    categorie: "meten",
    titel: "Laat een sorteeranalyse uitvoeren",
    kern:
      "Eén dag afval uitsorteren vertelt u exact wat er in uw restafval zit — gemiddeld is ruim 60% herwinbaar (19,2% keukenafval, 14,5% papier, 13,8% plastic). Elke succesvolle aanpak, van rijkskantoren tot afvalvrije scholen, begon hiermee. Het is ook het draagvlak-moment: niets overtuigt een MT sneller dan de eigen afvalberg op tafel.",
  },
  {
    id: "benchmark",
    categorie: "meten",
    titel: "Benchmark uzelf: 187 kg per medewerker, max 35% rest",
    kern:
      "Twee openbare referentiepunten: een gemiddeld kantoor produceert 187 kg afval per aanwezige medewerker per jaar (afvalbenchmark Rijkswaterstaat), en het Rijk hanteert voor eigen kantoren maximaal 35% restafval. Reken uw eigen cijfers hier tegen af — zit u erboven, dan weet u dat er ruimte zit.",
  },

  // ── Pilot & aanpak ────────────────────────────────────────────────
  {
    id: "pilot-opzet",
    categorie: "pilot",
    titel: "Draai een pilot van 8-12 weken op één plek",
    kern:
      "Kies één gebouw, verdieping of afdeling. Opzet: week 1-2 nulmeting (facturen + sorteeranalyse), week 3 inrichting (stations, bureaubakken weg, bewegwijzering), week 4-10 draaien met maandelijkse terugkoppeling, week 11-12 nameting en besluit over uitrol. Spreek vooraf succescriteria af, bijvoorbeeld: restafval -30% en geen structurele vervuiling in de PMD-bak.",
  },
  {
    id: "quick-wins-eerst",
    categorie: "pilot",
    titel: "Pak eerst de twee makkelijkste stromen",
    kern:
      "Papier/karton en swill zijn vrijwel altijd de snelste winst: zwaar of volumineus, schoon te scheiden en tegen een fractie van het resttarief af te voeren. Begin daar, boek zichtbaar resultaat, en gebruik dat succes om PMD en de lastigere stromen erbij te pakken. Alles tegelijk willen is de klassieke valkuil.",
  },

  // ── Communicatie ──────────────────────────────────────────────────
  {
    id: "pictogrammen",
    categorie: "communicatie",
    titel: "Gebruik landelijk herkenbare pictogrammen en kleuren",
    kern:
      "Verzin geen eigen beeldtaal: gebruik de kleuren en pictogrammen die mensen al kennen van thuis (blauw papier, oranje PMD, groen GFT, grijs rest). De Afvalscheidingswijzer van Milieu Centraal is de scheidsrechter bij twijfelgevallen ('mag een pizzadoos bij papier?') — hang er een QR-code naar op de twijfelplekken.",
    links: [
      { label: "Afvalscheidingswijzer (Milieu Centraal)", url: "https://www.afvalscheidingswijzer.nl" },
    ],
  },
  {
    id: "lancering-campagne",
    categorie: "communicatie",
    titel: "Lanceer het als verandering, niet als mededeling",
    kern:
      "Eén zichtbaar startmoment (de oude bakken gaan er demonstratief uit), een korte uitleg wáárom (kosten + milieu, met uw eigen cijfers), en daarna maandelijks één cijfer terugkoppelen ('restafval -22% — dit deden jullie'). Communicatie zonder terugkoppeling dooft in zes weken uit.",
  },

  // ── Kennis & inspiratie ───────────────────────────────────────────
  {
    id: "wegwijzer-vang",
    categorie: "kennis",
    titel: "Gebruik de gratis kennis van VANG Buitenshuis",
    kern:
      "Rijkswaterstaat publiceert via VANG Buitenshuis openbare sorteeranalyses, benchmarks en praktische handreikingen zoals de Wegwijzer Afvalvrij Kantoor — gratis en zonder commercieel belang. Dé plek om uw aanpak te toetsen aan wat landelijk werkt.",
    links: [{ label: "VANG Buitenshuis", url: "https://www.vangbuitenshuis.nl" }],
  },
  {
    id: "urgentie-2028",
    categorie: "kennis",
    titel: "Reken de kostenstijging richting 2028 door",
    kern:
      "De afvalstoffenbelasting stijgt van € 39,71 (2025) naar € 90,21 per ton in 2028 (+127%) en afvalverbranders betalen vanaf 2027 een oplopende CO2-heffing. Niets doen wordt dus elk jaar duurder. Gebruik dat in uw businesscase richting bestuur of MT — onze afvalscan rekent het 2028-scenario automatisch mee.",
    links: [{ label: "Gratis afvalscan", url: "/afvalscan" }],
  },
  {
    id: "voorbeeld-scholen",
    categorie: "kennis",
    titel: "Kijk de kunst af bij een vergelijkbare organisatie",
    kern:
      "Basisschool De Paradijsvogel bespaart € 5.000 per jaar (programma Afval op School), Schiphol haalt 70% scheiding in de eigen kantoren, NS scheidt op het drukste station van Nederland. Op onze kennispagina staan de cases uitgewerkt met de lessen per situatie.",
    links: [{ label: "Praktijkvoorbeelden", url: "/kennis" }],
  },
] as const;
