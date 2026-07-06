import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase";

const leadSchema = z.object({
  naam: z.string().min(2).max(200),
  email: z.email(),
  organisatie: z.string().max(200).optional().nullable(),
  functie: z.string().max(200).optional().nullable(),
  afvalkosten: z.number().nonnegative().optional().nullable(),
  sector: z.string().max(50).optional().nullable(),
  scan_result_json: z.unknown().optional().nullable(),
  bron: z.enum(["scan", "whitepaper", "contact"]).default("contact"),
});

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

  const supabase = getSupabase();
  if (!supabase) {
    // Supabase nog niet geconfigureerd: lead niet verliezen in de logs,
    // maar de bezoeker gewoon door laten gaan.
    console.warn("[leads] Supabase niet geconfigureerd; lead alleen gelogd:", {
      ...parsed.data,
      scan_result_json: undefined,
    });
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from("leads").insert({
    naam: parsed.data.naam,
    email: parsed.data.email,
    organisatie: parsed.data.organisatie ?? null,
    functie: parsed.data.functie ?? null,
    afvalkosten: parsed.data.afvalkosten ?? null,
    sector: parsed.data.sector ?? null,
    scan_result_json: parsed.data.scan_result_json ?? null,
    bron: parsed.data.bron,
  });

  if (error) {
    console.error("[leads] Insert mislukt:", error.message);
    return NextResponse.json(
      { error: "Opslaan mislukt, probeer het later opnieuw" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
