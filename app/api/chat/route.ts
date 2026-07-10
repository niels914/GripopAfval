import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { bouwSysteemPrompt } from "@/lib/chat/prompt";
import { chatVerzoekSchema } from "@/lib/chat/types";

/**
 * Streamt het botantwoord als platte tekst (geen SSE): de client leest de
 * response-body chunk voor chunk en parseert zelf het handvattenblok.
 * Zonder ANTHROPIC_API_KEY antwoordt de route met een nette uitlegtekst,
 * zodat de site (en CI/e2e) ook zonder key blijft werken — zelfde patroon
 * als de mail- en Supabase-fallbacks.
 */

const MODEL = "claude-opus-4-8";
const MAX_TOKENS = 8000;

const FALLBACK_TEKST =
  "De adviesbot is op dit moment niet beschikbaar. Geen nood: met de gratis " +
  "afvalscan op /afvalscan rekent u in 2 minuten uw besparingspotentieel door, " +
  "en via /contact denken we persoonlijk met u mee — we reageren binnen 2 werkdagen.";

const STORING_TEKST =
  "Er ging iets mis bij het ophalen van het antwoord. Probeer het over een " +
  "moment opnieuw, of stel uw vraag via /contact — we reageren binnen 2 werkdagen.";

function tekstAlsStream(tekst: string): Response {
  return new Response(tekst, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  const parsed = chatVerzoekSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validatie mislukt", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("[chat] ANTHROPIC_API_KEY niet gezet; fallback-antwoord gestuurd.");
    return tekstAlsStream(FALLBACK_TEKST);
  }

  const client = new Anthropic({ apiKey });
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    thinking: { type: "adaptive" },
    system: bouwSysteemPrompt(),
    messages: parsed.data.messages,
  });

  const encoder = new TextEncoder();
  const responseBody = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        if (err instanceof Anthropic.APIError) {
          console.error(`[chat] Claude API-fout ${err.status}:`, err.message);
        } else {
          console.error("[chat] Stream-fout:", err);
        }
        controller.enqueue(encoder.encode(`\n\n${STORING_TEKST}`));
      } finally {
        controller.close();
      }
    },
    cancel() {
      // Bezoeker sloot de pagina of brak af: stop de upstream-stream.
      stream.abort();
    },
  });

  return new Response(responseBody, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
