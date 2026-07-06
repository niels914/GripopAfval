import {
  RESTAFVAL_SAMENSTELLING,
  SECTOR_LABELS,
  type ScanResultaat,
  type Sector,
} from "@/lib/scanCalculator";
import { formatEuro, formatNumber } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * E-mailtemplates in KplusV-huisstijl.
 * Tabel-gebaseerde HTML met inline styles: dat is wat e-mailclients
 * (Outlook voorop) betrouwbaar renderen. Geen extern CSS of webfonts.
 */

const KLEUR = {
  paars: "#9462A6",
  paarsDonker: "#5760A6",
  blauw: "#007DB5",
  offwhite: "#F7F5FA",
  grijs: "#2E2E38",
  border: "#E5E1EC",
};

const FONT = "'Segoe UI', Arial, Helvetica, sans-serif";

function wrapEmail(titel: string, inhoud: string): string {
  return `<!doctype html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:${KLEUR.offwhite};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${KLEUR.offwhite};padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background-color:${KLEUR.paars};border-radius:12px 12px 0 0;padding:24px 32px;">
            <span style="font-family:${FONT};font-size:22px;font-weight:700;color:#ffffff;">Grip<span style="opacity:.75;">Op</span>Afval</span>
            <span style="font-family:${FONT};font-size:12px;color:#ffffff;opacity:.8;display:block;margin-top:4px;">Onafhankelijke afvalscheiding op de werkvloer &middot; een propositie van KplusV</span>
          </td>
        </tr>
        <tr>
          <td style="background-color:#ffffff;padding:32px;border:1px solid ${KLEUR.border};border-top:none;">
            <h1 style="font-family:${FONT};font-size:22px;line-height:1.3;color:${KLEUR.grijs};margin:0 0 16px;">${titel}</h1>
            ${inhoud}
          </td>
        </tr>
        <tr>
          <td style="background-color:${KLEUR.offwhite};padding:20px 32px;border-radius:0 0 12px 12px;border:1px solid ${KLEUR.border};border-top:none;">
            <p style="font-family:${FONT};font-size:12px;color:${KLEUR.grijs};opacity:.6;margin:0;line-height:1.5;">
              GripOpAfval is onderdeel van KplusV &middot; ${site.kplusv.regel}<br>
              <a href="${site.url}" style="color:${KLEUR.blauw};">${site.url.replace("https://", "")}</a> &middot;
              <a href="mailto:${site.email}" style="color:${KLEUR.blauw};">${site.email}</a> &middot;
              <a href="${site.url}/privacy" style="color:${KLEUR.blauw};">privacy</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function p(tekst: string): string {
  return `<p style="font-family:${FONT};font-size:15px;line-height:1.6;color:${KLEUR.grijs};margin:0 0 14px;">${tekst}</p>`;
}

function knop(label: string, url: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0;"><tr>
    <td style="background-color:${KLEUR.paars};border-radius:8px;">
      <a href="${url}" style="display:inline-block;padding:12px 28px;font-family:${FONT};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">${label}</a>
    </td>
  </tr></table>`;
}

function cijferRij(label: string, waarde: string): string {
  return `<tr>
    <td style="font-family:${FONT};font-size:14px;color:${KLEUR.grijs};padding:8px 12px;border-bottom:1px solid ${KLEUR.border};">${label}</td>
    <td align="right" style="font-family:${FONT};font-size:14px;font-weight:700;color:${KLEUR.paarsDonker};padding:8px 12px;border-bottom:1px solid ${KLEUR.border};">${waarde}</td>
  </tr>`;
}

export interface EmailInhoud {
  subject: string;
  html: string;
}

/** 1. Scanrapport naar de invuller. */
export function renderScanRapportEmail(
  naam: string,
  resultaat: ScanResultaat
): EmailInhoud {
  const sectorLabel = SECTOR_LABELS[resultaat.input.sector as Sector] ?? "—";

  const situatie = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;border:1px solid ${KLEUR.border};border-radius:8px;border-collapse:separate;overflow:hidden;">
    ${cijferRij("Sector", sectorLabel)}
    ${cijferRij("Totale afvalkosten per jaar", formatEuro(resultaat.kostenPerJaar))}
    ${cijferRij("Totaal afval per jaar", `${formatNumber(resultaat.totaalTon, 1)} ton`)}
    ${cijferRij("Waarvan restafval", `${formatNumber(resultaat.restTon, 1)} ton`)}
    ${resultaat.kgPerM2 !== null ? cijferRij("Afvalintensiteit", `${formatNumber(resultaat.kgPerM2, 1)} kg/m²/jaar`) : ""}
    ${cijferRij("Scheidingsgraad", `${formatNumber(resultaat.scheidingsgraad * 100, 0)}%`)}
  </table>`;

  const samenstelling = RESTAFVAL_SAMENSTELLING.map(
    (s) =>
      `<tr>
        <td style="font-family:${FONT};font-size:13px;color:${KLEUR.grijs};padding:4px 12px 4px 0;white-space:nowrap;">${s.label}</td>
        <td width="100%" style="padding:4px 0;">
          <div style="background-color:${KLEUR.border};border-radius:6px;height:10px;width:100%;">
            <div style="background-color:${s.key === "rest" ? KLEUR.grijs : KLEUR.paars};border-radius:6px;height:10px;width:${s.pct}%;"></div>
          </div>
        </td>
        <td align="right" style="font-family:${FONT};font-size:13px;font-weight:600;color:${KLEUR.grijs};padding:4px 0 4px 10px;">${s.pct}%</td>
      </tr>`
  ).join("");

  const scenarios = resultaat.scenarios
    .map(
      (s) => `<td width="33%" valign="top" style="padding:6px;">
        <div style="border:1px solid ${s.id === "realistisch" ? KLEUR.paars : KLEUR.border};border-radius:8px;padding:14px;">
          <p style="font-family:${FONT};font-size:14px;font-weight:700;color:${KLEUR.grijs};margin:0;">${s.naam}</p>
          <p style="font-family:${FONT};font-size:12px;color:${KLEUR.grijs};opacity:.6;margin:2px 0 10px;">${Math.round(s.reductie * 100)}% minder restafval</p>
          <p style="font-family:${FONT};font-size:18px;font-weight:700;color:${KLEUR.paars};margin:0;">${formatEuro(s.besparingPerJaar)}</p>
          <p style="font-family:${FONT};font-size:12px;color:${KLEUR.grijs};opacity:.7;margin:2px 0 0;">per jaar &middot; ${formatNumber(s.co2ReductieTon, 1)} ton CO2</p>
        </div>
      </td>`
    )
    .join("");

  const inhoud = `
    ${p(`Beste ${naam},`)}
    ${p("Bedankt voor het invullen van de gratis afvalscan. Hieronder vindt u uw resultaat. <strong>We nemen binnen 2 werkdagen contact op</strong> om het door te spreken en uw vragen te beantwoorden.")}
    <h2 style="font-family:${FONT};font-size:17px;color:${KLEUR.grijs};margin:24px 0 4px;">Uw huidige situatie</h2>
    ${situatie}
    <h2 style="font-family:${FONT};font-size:17px;color:${KLEUR.grijs};margin:24px 0 8px;">Wat zit er nog in uw restafval?</h2>
    ${p(`<span style="font-size:13px;opacity:.7;">Modelmatige samenstelling bij KWD-organisaties; een sorteeranalyse maakt dit exact voor uw locatie.</span>`)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">${samenstelling}</table>
    <h2 style="font-family:${FONT};font-size:17px;color:${KLEUR.grijs};margin:24px 0 8px;">Drie besparingsscenario's</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${scenarios}</tr></table>
    ${p(`<span style="font-size:12px;opacity:.6;">Alle bedragen zijn indicatief, gebaseerd op kengetallen en gemiddelde markttarieven (restafval ${formatEuro(190)}/ton, gescheiden gemiddeld ${formatEuro(80)}/ton; CO2 indicatief 1 ton per ton restafval). De betaalde afvalscan vervangt deze schatting door uw werkelijke cijfers.</span>`)}
    ${knop("Plan een verkennend gesprek", `${site.url}/contact`)}
    ${p(`Met vriendelijke groet,<br><strong>Niels Ahsmann</strong><br>GripOpAfval &middot; KplusV`)}
  `;

  return {
    subject: "Uw afvalscan-resultaat: het besparingspotentieel van uw organisatie",
    html: wrapEmail("Uw afvalscan-resultaat", inhoud),
  };
}

/** 2. Whitepaper-bezorging. */
export function renderWhitepaperEmail(naam: string): EmailInhoud {
  const downloadUrl = `${site.url}/downloads/whitepaper-grip-op-kwd-afval-2026.pdf`;
  const inhoud = `
    ${p(`Beste ${naam},`)}
    ${p("Bedankt voor uw interesse. Via de knop hieronder downloadt u de whitepaper <strong>“Grip op KWD-afval in 2026”</strong> — met daarin de doorgerekende impact van de CO2-heffing, sectorkengetallen en een stappenplan naar 30% minder restafval.")}
    ${knop("Download de whitepaper (PDF)", downloadUrl)}
    ${p("Benieuwd wat de cijfers voor uw organisatie betekenen? De gratis online afvalscan rekent het in 2 minuten voor u door.")}
    ${p(`<a href="${site.url}/afvalscan" style="color:${KLEUR.blauw};">Doe de gratis afvalscan &rarr;</a>`)}
    ${p(`Met vriendelijke groet,<br><strong>Niels Ahsmann</strong><br>GripOpAfval &middot; KplusV`)}
  `;
  return {
    subject: "Uw whitepaper: Grip op KWD-afval in 2026",
    html: wrapEmail("Uw whitepaper staat klaar", inhoud),
  };
}

/** 3. Interne notificatie bij elke nieuwe lead. */
export function renderNotificatieEmail(lead: {
  bron: string;
  naam: string;
  email: string;
  organisatie?: string | null;
  functie?: string | null;
  sector?: string | null;
  afvalkosten?: number | null;
  scanSamenvatting?: string | null;
}): EmailInhoud {
  const bronLabel =
    { scan: "Afvalscan", whitepaper: "Whitepaper", contact: "Contactformulier" }[
      lead.bron
    ] ?? lead.bron;

  const rows = [
    ["Bron", bronLabel],
    ["Naam", lead.naam],
    ["E-mail", `<a href="mailto:${lead.email}" style="color:${KLEUR.blauw};">${lead.email}</a>`],
    ["Organisatie", lead.organisatie ?? "—"],
    ["Functie", lead.functie ?? "—"],
    ["Sector", lead.sector ? (SECTOR_LABELS[lead.sector as Sector] ?? lead.sector) : "—"],
    ["Afvalkosten/jaar", lead.afvalkosten ? formatEuro(lead.afvalkosten) : "—"],
  ]
    .map(([label, waarde]) => cijferRij(label, String(waarde)))
    .join("");

  const inhoud = `
    ${p(`Nieuwe lead via <strong>${bronLabel}</strong>. Afspraak op de site: reactie binnen 2 werkdagen.`)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;border:1px solid ${KLEUR.border};border-radius:8px;border-collapse:separate;overflow:hidden;">${rows}</table>
    ${lead.scanSamenvatting ? p(`<strong>Scanresultaat:</strong><br>${lead.scanSamenvatting}`) : ""}
  `;

  return {
    subject: `[GripOpAfval] Nieuwe lead: ${lead.naam}${lead.organisatie ? ` (${lead.organisatie})` : ""} — ${bronLabel}`,
    html: wrapEmail("Nieuwe lead", inhoud),
  };
}
