import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase";
import {
  renderNotificatieEmail,
  renderScanRapportEmail,
  renderWhitepaperEmail,
} from "@/lib/email/templates";
import { notificatieOntvanger, verstuurEmail } from "@/lib/email/send";
import { formatEuro, formatNumber } from "@/lib/utils";
import type { ScanResultaat } from "@/lib/scanCalculator";

/** Minimale invultijd in ms; sneller dan dit is vrijwel zeker een bot. */
const MIN_INVULTIJD_MS = 3000;

const leadSchema = z.object({
  naam: z.string().min(2).max(200),
  email: z.email(),
  organisatie: z.string().max(200).optional().nullable(),
  functie: z.string().max(200).optional().nullable(),
  afvalkosten: z.number().nonnegative().optional().nullable(),
  sector: z.string().max(50).optional().nullable(),
  scan_result_json: z.unknown().optional().nullable(),
  bron: z.enum(["scan", "whitepaper", "contact"]).default("contact"),
  // Spam-signalen (zie LeadForm): honeypot moet leeg zijn,
  // formStartedAt is de client-timestamp bij het tonen van het formulier.
  website: z.string().optional(),
  formStartedAt: z.number().optional(),
});

/** Ruwe structuurcheck: is dit een ScanResultaat zoals de wizard het opstuurt? */
function alsScanResultaat(waarde: unknown): ScanResultaat | null {
  if (
    waarde &&
    typeof waarde === "object" &&
    "scenarios" in waarde &&
    Array.isArray((waarde as ScanResultaat).scenarios) &&
    "kostenPerJaar" in waarde &&
    "input" in waarde
  ) {
    return waarde as ScanResultaat;
  }
  return null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validatie mislukt", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const lead = parsed.data;

  // Spam-check: honeypot ingevuld of onmenselijk snel gesubmit.
  // Bots krijgen bewust een "ok" terug zodat ze niets leren.
  const teSnel =
    lead.formStartedAt !== undefined &&
    Date.now() - lead.formStartedAt < MIN_INVULTIJD_MS;
  if (lead.website || teSnel) {
    console.warn("[leads] Spam-signaal genegeerd:", {
      honeypot: !!lead.website,
      teSnel,
      email: lead.email,
    });
    return NextResponse.json({ ok: true, stored: false });
  }

  // 1. Opslaan in Supabase (of loggen als die niet geconfigureerd is).
  let stored = false;
  const supabase = getSupabase();
  if (!supabase) {
    console.warn("[leads] Supabase niet geconfigureerd; lead alleen gelogd:", {
      ...lead,
      scan_result_json: undefined,
    });
  } else {
    const { error } = await supabase.from("leads").insert({
      naam: lead.naam,
      email: lead.email,
      organisatie: lead.organisatie ?? null,
      functie: lead.functie ?? null,
      afvalkosten: lead.afvalkosten ?? null,
      sector: lead.sector ?? null,
      scan_result_json: lead.scan_result_json ?? null,
      bron: lead.bron,
    });
    if (error) {
      console.error("[leads] Insert mislukt:", error.message);
      return NextResponse.json(
        { error: "Opslaan mislukt, probeer het later opnieuw" },
        { status: 500 }
      );
    }
    stored = true;
  }

  // 2. Mails versturen — fouten hier mogen de bezoeker nooit blokkeren:
  //    de lead is al opgeslagen en verstuurEmail gooit nooit.
  const scanResultaat = alsScanResultaat(lead.scan_result_json);

  if (lead.bron === "scan" && scanResultaat) {
    await verstuurEmail(lead.email, renderScanRapportEmail(lead.naam, scanResultaat));
  } else if (lead.bron === "whitepaper") {
    await verstuurEmail(lead.email, renderWhitepaperEmail(lead.naam));
  }

  const notifyEmail = notificatieOntvanger();
  if (notifyEmail) {
    const scanSamenvatting = scanResultaat
      ? `${formatEuro(scanResultaat.kostenPerJaar)} afvalkosten/jaar, ${formatNumber(scanResultaat.restTon, 1)} ton restafval; realistisch scenario bespaart ${formatEuro(scanResultaat.scenarios[1]?.besparingPerJaar ?? 0)}/jaar.`
      : null;
    await verstuurEmail(
      notifyEmail,
      renderNotificatieEmail({ ...lead, scanSamenvatting }),
      { replyTo: lead.email }
    );
  } else {
    console.warn("[leads] LEAD_NOTIFY_EMAIL niet gezet; geen interne notificatie verstuurd.");
  }

  return NextResponse.json({ ok: true, stored });
}
