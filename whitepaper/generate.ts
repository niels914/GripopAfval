/**
 * Genereert de whitepaper "Grip op KWD-afval in 2026" als HTML en PDF.
 *
 * Draaien:  npm run whitepaper
 * Output:   whitepaper/whitepaper.html  (bron, voor redactie/review)
 *           public/downloads/whitepaper-grip-op-kwd-afval-2026.pdf
 *
 * Alle kengetallen komen rechtstreeks uit lib/scanCalculator.ts zodat
 * site en whitepaper nooit uit de pas lopen.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CO2_PER_TON_REST,
  RESTAFVAL_SAMENSTELLING,
  SCENARIOS,
  SECTOR_KENGETALLEN,
  SECTOR_LABELS,
  TARIEVEN,
  berekenFactuurScan,
  type Sector,
} from "../lib/scanCalculator.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- Hulpfuncties ---------- */

const euro = (n: number, dec = 0) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  }).format(n);

const num = (n: number, dec = 0) =>
  new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  }).format(n);

/* ---------- Rekenvoorbeeld: MBO met 4 locaties ---------- */
// Zelfde route als de online scan (factuurroute met tonnages), dus
// gegarandeerd consistent met wat een bezoeker op de site berekent.
const voorbeeld = berekenFactuurScan({
  route: "factuur",
  sector: "mbo",
  locaties: 4,
  kostenPerJaar: 80_000,
  restTon: 300,
  papierTon: 80,
  pmdTon: 15,
  gftTon: 5,
});
const realistisch = voorbeeld.scenarios[1];

// CO2-heffing-scenario: verdubbeling van het restafvaltarief vanaf 2028
// (aanname op basis van aangekondigd beleid — TE VALIDEREN, zie bronnen).
const TARIEF_REST_2028 = TARIEVEN.rest * 2;
const extraBesparing2028 =
  realistisch.restReductieTon * (TARIEF_REST_2028 - TARIEVEN.rest);

/* ---------- Stijl ---------- */

const css = `
  :root {
    --paars: #9462A6; --paars-donker: #5760A6; --paars-licht: #B8AED6;
    --blauw: #007DB5; --offwhite: #F7F5FA; --grijs: #2E2E38; --border: #E5E1EC;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; color: var(--grijs); font-size: 10.5pt; line-height: 1.55; }
  .pagina { width: 210mm; min-height: 297mm; padding: 22mm 20mm 18mm; page-break-after: always; position: relative; background: #fff; }
  .pagina:last-child { page-break-after: auto; }
  h1, h2, h3 { font-family: 'Poppins', 'Segoe UI', Arial, sans-serif; font-weight: 700; color: var(--grijs); }
  h1 { font-size: 26pt; line-height: 1.15; }
  h2 { font-size: 16pt; margin-bottom: 5mm; }
  h2 .nr { color: var(--paars); margin-right: 3mm; }
  h3 { font-size: 11.5pt; margin: 5mm 0 2mm; color: var(--paars-donker); }
  p { margin-bottom: 3mm; }
  ul, ol { margin: 0 0 3mm 5mm; }
  li { margin-bottom: 1.5mm; }
  strong { font-weight: 600; }
  .voetregel { position: absolute; bottom: 8mm; left: 20mm; right: 20mm; display: flex; justify-content: space-between; font-size: 8pt; color: #9b97a8; border-top: 0.4mm solid var(--border); padding-top: 2.5mm; }
  .kader { background: var(--offwhite); border-left: 1.2mm solid var(--paars); border-radius: 0 3mm 3mm 0; padding: 4mm 5mm; margin: 4mm 0; }
  .kader.blauw { border-left-color: var(--blauw); }
  .cta { background: var(--paars); color: #fff; border-radius: 3mm; padding: 5mm 6mm; margin: 5mm 0; }
  .cta a { color: #fff; font-weight: 600; }
  table { width: 100%; border-collapse: collapse; margin: 3mm 0 5mm; font-size: 9.5pt; }
  th { background: var(--offwhite); font-family: 'Poppins', sans-serif; font-weight: 600; text-align: left; }
  th, td { padding: 2.2mm 3mm; border-bottom: 0.3mm solid var(--border); }
  td.r, th.r { text-align: right; }
  .staaf-rij { display: flex; align-items: center; gap: 3mm; margin-bottom: 2.2mm; }
  .staaf-label { width: 42mm; font-size: 9pt; flex-shrink: 0; }
  .staaf-baan { flex: 1; background: var(--border); border-radius: 2mm; height: 5.5mm; }
  .staaf { height: 5.5mm; border-radius: 2mm; }
  .staaf-pct { width: 12mm; text-align: right; font-weight: 600; font-size: 9pt; }
  .groot-cijfer { font-family: 'Poppins', sans-serif; font-size: 22pt; font-weight: 700; color: var(--paars); }
  .cijfer-grid { display: flex; gap: 4mm; margin: 4mm 0; }
  .cijfer-kaart { flex: 1; border: 0.4mm solid var(--border); border-radius: 3mm; padding: 4mm; text-align: center; }
  .cijfer-kaart .label { font-size: 8.5pt; color: #6d6a7a; margin-top: 1mm; }
  .valideren { background: #fff7e6; border: 0.3mm solid #e8c87a; border-radius: 1.5mm; font-size: 8pt; padding: 0.5mm 1.5mm; color: #8a6d1f; white-space: nowrap; }
  .concept-banner { position: absolute; top: 8mm; right: 20mm; background: #fff7e6; border: 0.3mm solid #e8c87a; color: #8a6d1f; font-size: 8.5pt; font-weight: 600; padding: 1mm 3mm; border-radius: 1.5mm; }
`;

/* ---------- Bouwstenen ---------- */

const STAAF_KLEUREN: Record<string, string> = {
  papier: "#9462A6",
  pmd: "#007DB5",
  gft: "#5760A6",
  overig: "#B8AED6",
  rest: "#2E2E38",
};

function samenstellingStaven(): string {
  return RESTAFVAL_SAMENSTELLING.map(
    (s) => `<div class="staaf-rij">
      <span class="staaf-label">${s.label}</span>
      <span class="staaf-baan"><span class="staaf" style="width:${s.pct}%;background:${STAAF_KLEUREN[s.key]};display:block;"></span></span>
      <span class="staaf-pct">${s.pct}%</span>
    </div>`
  ).join("");
}

function kengetallenTabel(): string {
  const rijen = (Object.keys(SECTOR_KENGETALLEN) as Sector[])
    .filter((s) => s !== "overig" && s !== "museum")
    .map((s) => {
      const k = SECTOR_KENGETALLEN[s];
      const label = s === "theater" ? "Theater / museum" : SECTOR_LABELS[s];
      return `<tr><td>${label}</td><td class="r">${num(k.kgPerM2, 1)} kg</td><td class="r">${num(k.restAandeel * 100)}%</td></tr>`;
    })
    .join("");
  return `<table>
    <thead><tr><th>Sector</th><th class="r">Afval per m² per jaar</th><th class="r">Aandeel restafval</th></tr></thead>
    <tbody>${rijen}</tbody>
  </table>`;
}

function tarievenTabel(): string {
  const rijen: [string, number][] = [
    ["Restafval (incl. verbrandingsbelasting)", TARIEVEN.rest],
    ["GFT", TARIEVEN.gft],
    ["PMD", TARIEVEN.pmd],
    ["Glas", TARIEVEN.glas],
    ["Papier/karton", TARIEVEN.papier],
    ["Gescheiden, gemiddeld", TARIEVEN.gescheidenGemiddeld],
  ];
  return `<table>
    <thead><tr><th>Stroom</th><th class="r">Indicatief verwerkingstarief</th></tr></thead>
    <tbody>${rijen.map(([l, t]) => `<tr><td>${l}</td><td class="r">${euro(t)} / ton</td></tr>`).join("")}</tbody>
  </table>`;
}

function scenarioTabel(): string {
  return `<table>
    <thead><tr><th>Scenario</th><th class="r">Minder restafval</th><th class="r">Ton/jaar</th><th class="r">Besparing/jaar</th><th class="r">CO2-reductie</th></tr></thead>
    <tbody>${voorbeeld.scenarios
      .map(
        (s) =>
          `<tr${s.id === "realistisch" ? ' style="background:#f4eef7;font-weight:600;"' : ""}><td>${s.naam}</td><td class="r">${num(s.reductie * 100)}%</td><td class="r">${num(s.restReductieTon, 0)}</td><td class="r">${euro(s.besparingPerJaar)}</td><td class="r">${num(s.co2ReductieTon, 0)} ton</td></tr>`
      )
      .join("")}</tbody>
  </table>`;
}

function voetregel(paginanr: number): string {
  return `<div class="voetregel"><span>Grip op KWD-afval in 2026 — GripOpAfval · KplusV</span><span>${paginanr}</span></div>`;
}

/* ---------- Pagina's ---------- */

const paginas: string[] = [];

/* 1. Cover */
paginas.push(`
  <div class="pagina" style="background: linear-gradient(150deg, #5760A6 0%, #9462A6 55%, #B8AED6 100%); color:#fff; display:flex; flex-direction:column;">
    <div style="font-family:'Poppins',sans-serif;font-weight:700;font-size:14pt;">Grip<span style="opacity:.75;">Op</span>Afval</div>
    <div style="font-size:9pt;opacity:.85;">Een propositie van KplusV</div>
    <div style="margin-top:70mm;">
      <div style="background:#fff7e6;color:#8a6d1f;display:inline-block;font-size:9pt;font-weight:600;padding:1.5mm 4mm;border-radius:2mm;margin-bottom:6mm;">CONCEPT — TER REDACTIE</div>
      <h1 style="color:#fff;">Grip op KWD-afval<br>in 2026</h1>
      <p style="font-size:13pt;margin-top:5mm;opacity:.95;max-width:130mm;">Wat de CO2-heffing betekent voor uw afvalkosten — en hoe u met 30% minder restafval de rekening voor blijft.</p>
    </div>
    <div style="margin-top:auto;font-size:9.5pt;opacity:.9;">
      Voor facilitair managers, duurzaamheidscoördinatoren en controllers<br>
      van MBO-instellingen, hotels, retail, gemeenten, cultuur en kantoren
    </div>
  </div>
`);

/* 2. Managementsamenvatting */
paginas.push(`
  <div class="pagina">
    <div class="concept-banner">CONCEPT — TER REDACTIE</div>
    <h2>Managementsamenvatting</h2>
    <p>Afval was jarenlang een sluitpost op de facilitaire begroting. Dat verandert nu snel: de CO2-heffing op afvalverbranding drijft de kosten van restafval op — richting een <strong>verdubbeling van de tarieven vanaf 2028</strong> <span class="valideren">te valideren</span>. Wie niets doet, ziet de afvalfactuur de komende jaren fors stijgen zonder er iets voor terug te krijgen.</p>
    <p>Het goede nieuws: bij kantoor-, winkel- en dienstenorganisaties (KWD) is <strong>het grootste deel van het restafval geen restafval</strong>. Modelmatig bestaat de restafvalcontainer voor ${100 - RESTAFVAL_SAMENSTELLING[4].pct}% uit stromen die gescheiden ingezameld kunnen worden — tegen gemiddeld ${euro(TARIEVEN.gescheidenGemiddeld)}/ton in plaats van ${euro(TARIEVEN.rest)}/ton.</p>
    <div class="cijfer-grid">
      <div class="cijfer-kaart"><div class="groot-cijfer">${100 - RESTAFVAL_SAMENSTELLING[4].pct}%</div><div class="label">van het restafval is herwinbaar</div></div>
      <div class="cijfer-kaart"><div class="groot-cijfer">${euro(TARIEVEN.rest - TARIEVEN.gescheidenGemiddeld)}</div><div class="label">besparing per ton die de restcontainer verlaat</div></div>
      <div class="cijfer-kaart"><div class="groot-cijfer">2×</div><div class="label">restafvaltarief vanaf 2028 <span class="valideren">te valideren</span></div></div>
    </div>
    <p>Deze whitepaper rekent voor wat dat betekent voor uw organisatie, laat per sector zien waar de winst zit, en geeft een concreet stappenplan naar <strong>30% minder restafval binnen één jaar</strong> — inclusief de businesscase waarmee u de controller overtuigt.</p>
    <div class="kader">
      <strong>De drie kernboodschappen van dit document:</strong>
      <ol style="margin-top:2mm;">
        <li>De CO2-heffing maakt níets doen de duurste optie: elke ton restafval wordt vanaf 2028 ongeveer twee keer zo duur.</li>
        <li>Scheiden aan de bron is geen idealisme maar een sluitende businesscase: het tariefverschil van ${euro(TARIEVEN.rest - TARIEVEN.gescheidenGemiddeld)}/ton betaalt de inzamelmiddelen doorgaans binnen een jaar terug.</li>
        <li>Techniek is zelden het probleem — gedrag wel. Een succesvolle aanpak combineert inzamelstructuur, communicatie en borging.</li>
      </ol>
    </div>
    ${voetregel(2)}
  </div>
`);

/* 3. H1: CO2-heffing */
paginas.push(`
  <div class="pagina">
    <h2><span class="nr">1</span>De rekening komt eraan: de CO2-heffing op afvalverbranding</h2>
    <p>Nederland belast de verbranding van afval al langer via de afvalstoffenbelasting. Daar komt nu een gestaag oplopende CO2-heffing bij, onderdeel van het klimaatbeleid om verbranding van herbruikbaar materiaal te ontmoedigen. Afvalverwerkers berekenen deze heffing door in hun tarieven — en die doorbelasting raakt de KWD-sector direct in de restafvalcontainer.</p>
    <h3>Wat betekent dat concreet?</h3>
    <p>Het indicatieve verwerkingstarief voor restafval ligt nu rond <strong>${euro(TARIEVEN.rest)} per ton</strong> (inclusief verbrandingsbelasting). Op basis van het aangekondigde beleid gaan wij in deze whitepaper uit van een <strong>verdubbeling richting ${euro(TARIEF_REST_2028)} per ton vanaf 2028</strong> <span class="valideren">aanname — te valideren</span>. Gescheiden ingezamelde stromen ontlopen de heffing grotendeels: daar blijft het gemiddelde tarief rond ${euro(TARIEVEN.gescheidenGemiddeld)} per ton.</p>
    <div class="kader blauw">
      <strong>Het schaareffect.</strong> Het kostenverschil tussen restafval en gescheiden inzameling is nu ${euro(TARIEVEN.rest - TARIEVEN.gescheidenGemiddeld)}/ton. Bij een verdubbeling van het restafvaltarief loopt dat op naar zo'n ${euro(TARIEF_REST_2028 - TARIEVEN.gescheidenGemiddeld)}/ton. <strong>Elke businesscase voor afvalscheiding wordt de komende jaren dus bijna drie keer zo sterk.</strong>
    </div>
    <h3>Huidige indicatieve tarieven per stroom</h3>
    ${tarievenTabel()}
    <p>De les uit deze tabel: <strong>de duurste container op uw terrein is de grijze.</strong> Elke kilo papier, PMD of GFT die daarin verdwijnt, wordt verwerkt tegen het duurste tarief — en straks tegen het dubbele daarvan.</p>
    <h3>Waarom wachten duur is</h3>
    <p>Organisaties die pas in 2028 in beweging komen, betalen drie keer: de hogere tarieven zelf, de inhaalslag onder tijdsdruk, en de gemiste besparing van de tussenliggende jaren. Wie in 2026 start, financiert de omslag uit de lopende besparing.</p>
    ${voetregel(3)}
  </div>
`);

/* 4. H2: Waar staat de KWD-sector nu? */
paginas.push(`
  <div class="pagina">
    <h2><span class="nr">2</span>Waar staat de KWD-sector nu?</h2>
    <p>Uit onderzoek blijkt dat <strong>61% van de KWD-organisaties nu geen kostenvoordeel ziet in afvalscheiding</strong> <span class="valideren">bron: Ipsos I&amp;O 2025 — te valideren</span>. Dat is verklaarbaar: de businesscase was jarenlang mager, inzamelcontracten zijn ondoorzichtig en de facilitaire agenda is vol. Tegelijk laat sectoronderzoek zien dat <strong>20% besparen op afvalkosten haalbaar is</strong> <span class="valideren">bron: IPR Normag 2026 — te valideren</span> — nog vóór de CO2-heffing die businesscase versterkt.</p>
    <h3>Kengetallen per sector</h3>
    <p>Hoeveel afval een organisatie produceert, hangt sterk af van de sector. Onderstaande kengetallen — dezelfde die onze online afvalscan gebruikt — geven een eerste benchmark:</p>
    ${kengetallenTabel()}
    <p>Twee patronen vallen op. <strong>Hotels</strong> zijn per m² veruit de grootste producenten (keukens, buffetten, events) en hebben met GFT en glas twee stromen die direct lonen. <strong>Onderwijs en kantoren</strong> produceren minder kilo's per m², maar hebben door hun omvang en zichtbaarheid (leerlingen! medewerkers!) de grootste hefboom voor gedragsverandering.</p>
    <div class="kader">
      <strong>Benchmark uzelf in 2 minuten.</strong> De gratis online afvalscan op gripopafval.nl vergelijkt uw kosten en volumes met deze kengetallen en rekent drie besparingsscenario's door — op basis van uw factuurdata of een schatting op m² en fte.
    </div>
    <h3>Waarom de meeste organisaties blijven steken</h3>
    <ul>
      <li><strong>Het contract stuurt op volume.</strong> Inzamelaars verdienen aan ledigingen en tonnen; een prikkel om uw afval te verminderen ontbreekt.</li>
      <li><strong>Niemand is eigenaar.</strong> Afval valt tussen facilitair, inkoop en duurzaamheid in; zonder eigenaar geen structurele verbetering.</li>
      <li><strong>Gedrag wordt onderschat.</strong> Nieuwe bakken plaatsen zonder medewerkers mee te nemen levert vooral vervuilde stromen op — en teleurstelling.</li>
    </ul>
    ${voetregel(4)}
  </div>
`);

/* 5. H3: Wat zit er in uw restafval */
paginas.push(`
  <div class="pagina">
    <h2><span class="nr">3</span>Wat zit er nog in uw restafval?</h2>
    <p>Sorteeranalyses bij KWD-organisaties laten keer op keer hetzelfde beeld zien: de restafvalcontainer is vooral een <em>gemengde grondstoffencontainer</em>. Modelmatig ziet de samenstelling er zo uit:</p>
    <div style="margin:6mm 0;">${samenstellingStaven()}</div>
    <p>Slechts <strong>${RESTAFVAL_SAMENSTELLING[4].pct}%</strong> is werkelijk restafval. De rest — papier en karton (${RESTAFVAL_SAMENSTELLING[0].pct}%), PMD (${RESTAFVAL_SAMENSTELLING[1].pct}%), GFT (${RESTAFVAL_SAMENSTELLING[2].pct}%) en overige herbruikbare stromen (${RESTAFVAL_SAMENSTELLING[3].pct}%) — wordt nu verbrand tegen het hoogste tarief, terwijl het gescheiden een fractie kost of zelfs waarde heeft.</p>
    <h3>Per sector verschilt de knop waaraan u draait</h3>
    <table>
      <thead><tr><th>Sector</th><th>Grootste kans in het restafval</th><th>Typische quick win</th></tr></thead>
      <tbody>
        <tr><td>MBO / onderwijs</td><td>PMD uit kantines, papier uit lokalen</td><td>Centrale afvalpunten per verdieping</td></tr>
        <tr><td>Hotels</td><td>GFT uit keuken en ontbijtbuffet</td><td>GFT-inzameling in de keuken</td></tr>
        <tr><td>Retail</td><td>Karton en verpakkingsfolie</td><td>Persen i.p.v. los karton</td></tr>
        <tr><td>Gemeentehuizen</td><td>Papier en lunchafval</td><td>Bureaubakken vervangen door stations</td></tr>
        <tr><td>Cultuur</td><td>PMD en glas rond voorstellingen</td><td>Pauze-inzamelpunten</td></tr>
        <tr><td>Kantoren</td><td>Koffiebekers, lunchafval, papier</td><td>Bekerinzameling + centrale punten</td></tr>
      </tbody>
    </table>
    <div class="kader blauw">
      <strong>Van model naar meting.</strong> Deze percentages zijn een modelmatig gemiddelde. De afvalscan van GripOpAfval bevat een sorteeranalyse op uw eigen locatie: dan weet u — geen schatting, maar gewogen — wat er bij ú in de container zit en wat elke stroom kost.
    </div>
    ${voetregel(5)}
  </div>
`);

/* 6. H4: Businesscase */
paginas.push(`
  <div class="pagina">
    <h2><span class="nr">4</span>De businesscase, doorgerekend</h2>
    <p>De kern van elke afvalbusinesscase is één getal: het <strong>tariefverschil tussen restafval en gescheiden inzameling</strong>. Elke ton die de restcontainer verlaat en gescheiden wordt ingezameld, bespaart nu ${euro(TARIEVEN.rest)} − ${euro(TARIEVEN.gescheidenGemiddeld)} = <strong>${euro(TARIEVEN.rest - TARIEVEN.gescheidenGemiddeld)} per ton</strong>.</p>
    <h3>Rekenvoorbeeld: MBO-instelling met ${(voorbeeld.input as { locaties: number }).locaties} locaties</h3>
    <p>Een MBO met ${euro(voorbeeld.kostenPerJaar)} afvalkosten per jaar, ${num(voorbeeld.totaalTon)} ton totaal afval waarvan ${num(voorbeeld.restTon)} ton restafval (scheidingsgraad ${num(voorbeeld.scheidingsgraad * 100)}%). De drie standaardscenario's uit onze scan:</p>
    ${scenarioTabel()}
    <p>Het realistische scenario (${num(realistisch.reductie * 100)}% minder restafval — wat wij in de praktijk in jaar één zien bij organisaties die structuur én gedrag aanpakken) levert <strong>${euro(realistisch.besparingPerJaar)} per jaar</strong> op en ${num(realistisch.co2ReductieTon)} ton CO2-reductie.</p>
    <h3>En dan komt 2028</h3>
    <p>Bij een verdubbeld restafvaltarief <span class="valideren">te valideren</span> levert datzelfde scenario nog eens circa <strong>${euro(extraBesparing2028)} per jaar extra</strong> op aan vermeden heffing — de besparing groeit dus mee met het beleid, zonder dat u er iets extra's voor hoeft te doen.</p>
    <h3>Terugverdientijd van de investering</h3>
    <p>De benodigde investering (inzamelmiddelen, bebording, communicatie) rekenen wij indicatief op ${euro(1500)} per locatie. In het rekenvoorbeeld: ${euro(4 * 1500)} investering tegen ${euro(realistisch.besparingPerJaar)} besparing per jaar — <strong>terugverdiend in ${num(realistisch.terugverdientijdMaanden ?? 0, 1)} maanden</strong>.</p>
    <div class="kader">
      <strong>Voor de controller.</strong> Afvalscheiding is een van de weinige duurzaamheidsmaatregelen met een terugverdientijd onder de twee jaar, zonder kapitaalbeslag van betekenis, en met een besparing die door beleid (CO2-heffing) elk jaar groter wordt in plaats van kleiner. Het verdienmodel van GripOpAfval — succes-fee van 20% over de gerealiseerde besparing — betekent bovendien: geen besparing, geen kosten.
    </div>
    ${voetregel(6)}
  </div>
`);

/* 7. H5: Stappenplan (deel 1) */
paginas.push(`
  <div class="pagina">
    <h2><span class="nr">5</span>Stappenplan: naar 30% minder restafval in één jaar</h2>
    <p>Dertig procent minder restafval is geen ambitieus vergezicht maar een realistisch jaardoel — mits u structuur, contract en gedrag alle drie aanpakt. Het stappenplan zoals wij het bij opdrachtgevers uitvoeren:</p>
    <h3>Stap 1 — Nulmeting (week 1-2)</h3>
    <p>Verzamel 12 maanden facturen en weegbonnen. Breng per locatie in kaart: kosten per stroom, tonnages, ledigingsfrequenties en contractvoorwaarden. Dit is uw referentiepunt; zonder nulmeting valt geen besparing aan te tonen.</p>
    <h3>Stap 2 — Sorteeranalyse (week 3-4)</h3>
    <p>Laat één representatieve dag restafval sorteren en wegen. Dit vervangt het modelmatige beeld uit hoofdstuk 3 door uw werkelijke samenstelling — en levert de foto's en cijfers die intern draagvlak creëren ("kijk wat wij weggooien").</p>
    <h3>Stap 3 — Inzamelstructuur herontwerpen (maand 2-3)</h3>
    <ul>
      <li><strong>Bureaubakken en losse prullenbakken eruit.</strong> Elke individuele bak is een anonieme restafvalmachine.</li>
      <li><strong>Centrale afvalpunten erin</strong>, op logische looproutes, maximaal 30 meter van elke werkplek, met heldere kleuren en pictogrammen per stroom.</li>
      <li><strong>Terugwerkende logistiek:</strong> zorg dat schoonmaak en facilitair de stromen gescheiden kúnnen afvoeren — niets ondermijnt draagvlak sneller dan gescheiden bakken die in één zak verdwijnen.</li>
    </ul>
    <h3>Stap 4 — Gedragsaanpak (maand 2-6, doorlopend)</h3>
    <p>Techniek bepaalt of scheiden <em>kan</em>; gedrag bepaalt of het <em>gebeurt</em>. Werkende interventies: een zichtbare aftrap door bestuur of directie, "afvalcoaches" per afdeling of klas, voortgang zichtbaar maken op schermen (tonnage-teller), en fouten benoemen zonder te beschuldigen. In het onderwijs geldt extra: <strong>leerlingen zijn de beste ambassadeurs</strong> — geef ze een rol, geen preek.</p>
    ${voetregel(7)}
  </div>
`);

/* 8. H5 vervolg + H6 CSRD */
paginas.push(`
  <div class="pagina">
    <h3>Stap 5 — Contract heronderhandelen of aanbesteden (maand 4-9)</h3>
    <p>Met de nulmeting en de nieuwe structuur in de hand is het inzamelcontract aan de beurt. Let op: minder restafval betekent minder ledigingen — pas de frequenties en containergroottes aan, anders betaalt u voor het legen van halfvolle containers. Bij publieke organisaties (MBO, gemeenten) is dit vaak een formele aanbesteding; specificeer dan op <em>resultaat</em> (gescheiden stromen, datalevering, flexibele frequenties) in plaats van op <em>middelen</em> (aantal containers).</p>
    <h3>Stap 6 — Borgen en bijsturen (vanaf maand 6, doorlopend)</h3>
    <p>Resultaten zakken weg zonder aandacht: nieuwe medewerkers kennen de afspraken niet, stromen vervuilen, de urgentie verdampt. Borg met kwartaalmonitoring op weegdata, een jaarlijkse mini-sorteeranalyse en een vast agendapunt bij facilitair overleg. Vier successen zichtbaar.</p>
    <div class="kader">
      <strong>De valkuil van "bakken plaatsen en klaar".</strong> Organisaties die alleen stap 3 uitvoeren, halen zelden meer dan 10% en zien dat resultaat binnen een jaar terugzakken. De combinatie met gedrag (stap 4) en borging (stap 6) maakt het verschil tussen een project en een blijvende verandering.
    </div>
    <h2 style="margin-top:8mm;"><span class="nr">6</span>CSRD en rapportage: afvaldata wordt verplichte kost</h2>
    <p>Grotere organisaties rapporteren onder de CSRD (Corporate Sustainability Reporting Directive) over hun materiaalstromen en afval; via de waardeketen sijpelt die verplichting door naar leveranciers en publieke organisaties. Ook wie (nog) niet rapportageplichtig is, krijgt de vraag steeds vaker van gemeente, raad van toezicht of grote klanten.</p>
    <p>De data die u daarvoor nodig heeft, ontstaat vanzelf uit het stappenplan: tonnages per stroom (stap 1 en 6), scheidingsgraad, CO2-effect (indicatief ${num(CO2_PER_TON_REST, 1)} ton CO2 per ton restafval die niet verbrand wordt) en de trend over de jaren. Begin nu met meten, dan is rapporteren straks een druk op de knop in plaats van een reconstructie achteraf.</p>
    ${voetregel(8)}
  </div>
`);

/* 9. Over GripOpAfval + CTA */
paginas.push(`
  <div class="pagina">
    <h2><span class="nr">7</span>Over GripOpAfval</h2>
    <p>GripOpAfval is de afvalscheidingspropositie van adviesbureau <strong>KplusV</strong> — ruim veertig jaar actief in advies over circulaire economie, en onderzoekspartner van Rijkswaterstaat binnen het programma Circulair Vooruit. Wat wij daar leerden over afvalscheiding bij KWD-organisaties, brengen wij met GripOpAfval naar de werkvloer.</p>
    <h3>Waarom wij anders zijn: onafhankelijkheid</h3>
    <ul>
      <li><strong>Wij verkopen geen containers</strong> en hebben geen marge op inzamelmiddelen.</li>
      <li><strong>Wij hebben geen inzamelcontract</strong> en ontvangen geen commissie van inzamelaars.</li>
      <li><strong>Ons verdienmodel loopt op mínder afval:</strong> een succes-fee van 20% over de gerealiseerde besparing. Inzamelaars verdienen aan meer afval — wij aan minder.</li>
    </ul>
    <h3>Zo werkt het: drie lagen</h3>
    <table>
      <thead><tr><th>Laag</th><th>Wat</th><th class="r">Investering</th><th class="r">Doorlooptijd</th></tr></thead>
      <tbody>
        <tr><td><strong>1. Afvalscan</strong></td><td>Sorteeranalyse, contractcheck, businesscase per locatie</td><td class="r">€ 1.500 – 2.500</td><td class="r">2-4 weken</td></tr>
        <tr><td><strong>2. Implementatie</strong></td><td>Structuur, gedrag, contract — het stappenplan uit hoofdstuk 5</td><td class="r">Succes-fee 20%</td><td class="r">3 jaar</td></tr>
        <tr><td><strong>3. Abonnement</strong></td><td>Monitoring, borging, CSRD-rapportage</td><td class="r">€ 3.000 – 6.000/jr</td><td class="r">Doorlopend</td></tr>
      </tbody>
    </table>
    <p>De scan is volledig verrekenbaar bij een vervolg. En omdat de implementatie op succes-fee werkt, ligt het risico waar het hoort: bij ons.</p>
    <div class="cta">
      <p style="font-family:'Poppins',sans-serif;font-weight:700;font-size:13pt;margin-bottom:2mm;">Begin met de gratis online afvalscan</p>
      <p style="margin-bottom:0;">Bereken in 2 minuten uw besparingspotentieel op <a href="https://gripopafval.nl/afvalscan">gripopafval.nl/afvalscan</a> — of plan direct een verkennend gesprek via <a href="https://gripopafval.nl/contact">gripopafval.nl/contact</a>.</p>
    </div>
    ${voetregel(9)}
  </div>
`);

/* 10. Bronnen en aannames */
paginas.push(`
  <div class="pagina">
    <h2>Bronnen, aannames en verantwoording</h2>
    <h3>Aannames in de berekeningen</h3>
    <table>
      <thead><tr><th>Aanname</th><th class="r">Waarde</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>Verwerkingstarief restafval (incl. verbrandingsbelasting)</td><td class="r">${euro(TARIEVEN.rest)}/ton</td><td>Indicatief marktgemiddelde</td></tr>
        <tr><td>Gemiddeld tarief gescheiden stromen</td><td class="r">${euro(TARIEVEN.gescheidenGemiddeld)}/ton</td><td>Indicatief marktgemiddelde</td></tr>
        <tr><td>Restafvaltarief vanaf 2028 (effect CO2-heffing)</td><td class="r">${euro(TARIEF_REST_2028)}/ton</td><td><span class="valideren">Beleidsaanname — te valideren</span></td></tr>
        <tr><td>CO2-effect per ton vermeden restafval</td><td class="r">${num(CO2_PER_TON_REST, 1)} ton CO2</td><td>Indicatief</td></tr>
        <tr><td>Investering inzamelmiddelen per locatie</td><td class="r">${euro(1500)}</td><td>Indicatief</td></tr>
        <tr><td>Reductiescenario's restafval</td><td class="r">${SCENARIOS.map((s) => `${num(s.reductie * 100)}%`).join(" / ")}</td><td>Praktijkervaring KplusV</td></tr>
      </tbody>
    </table>
    <h3>Bronnen</h3>
    <ul>
      <li>IPR Normag (2026), onderzoek besparingspotentieel afvalkosten KWD-sector. <span class="valideren">Referentie te valideren door KplusV</span></li>
      <li>Ipsos I&amp;O (2025), onderzoek naar kostenperceptie afvalscheiding bij KWD-organisaties. <span class="valideren">Referentie te valideren door KplusV</span></li>
      <li>Rijksoverheid, beleid CO2-heffing afvalverbranding. <span class="valideren">Exacte regeling en tariefpad te valideren</span></li>
      <li>KplusV / Rijkswaterstaat, programma Circulair Vooruit — onderzoeksinzichten afvalscheiding KWD.</li>
      <li>Sectorkengetallen: benchmarkmodel GripOpAfval (zie ook de online afvalscan).</li>
    </ul>
    <div class="kader">
      <strong>Status van dit document.</strong> Dit is een redactieconcept. Alle passages gemarkeerd met <span class="valideren">te valideren</span> vragen om verificatie door KplusV vóór publicatie. Cijfers zijn indicatief en bedoeld om ordegroottes inzichtelijk te maken; aan dit document kunnen geen rechten worden ontleend.
    </div>
    <p style="margin-top:8mm;font-size:9pt;color:#6d6a7a;">© ${new Date().getFullYear()} GripOpAfval · KplusV — gripopafval.nl · Versie: concept ${new Date().toISOString().slice(0, 10)}</p>
    ${voetregel(10)}
  </div>
`);

/* ---------- HTML samenstellen en PDF printen ---------- */

const html = `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <title>Grip op KWD-afval in 2026 — GripOpAfval / KplusV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
  <style>${css}</style>
</head>
<body>
${paginas.join("\n")}
</body>
</html>`;

const htmlPad = join(ROOT, "whitepaper", "whitepaper.html");
writeFileSync(htmlPad, html);
console.log(`✓ HTML geschreven: ${htmlPad}`);

const { chromium } = await import("@playwright/test");
const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
    : {}
);
const page = await browser.newPage();
await page.goto(`file://${htmlPad}`, { waitUntil: "networkidle" });

const pdfDir = join(ROOT, "public", "downloads");
mkdirSync(pdfDir, { recursive: true });
const pdfPad = join(pdfDir, "whitepaper-grip-op-kwd-afval-2026.pdf");
await page.pdf({
  path: pdfPad,
  format: "A4",
  printBackground: true,
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
});
await browser.close();
console.log(`✓ PDF gegenereerd: ${pdfPad}`);
