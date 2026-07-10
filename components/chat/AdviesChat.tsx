"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, SendHorizonal, Sparkles } from "lucide-react";
import type { ChatBericht } from "@/lib/chat/types";
import { parseBotAntwoord } from "@/lib/chat/parser";
import { HandvattenKaarten } from "@/components/chat/HandvattenKaarten";
import { advies as copy } from "@/content/advies";
import { cn } from "@/lib/utils";

const FOUT_TEKST =
  "Er ging iets mis met de verbinding. Probeer het opnieuw, of stel uw vraag via /contact.";

/**
 * Het adviesgesprek op /advies: streamt antwoorden van /api/chat en rendert
 * het tienpuntsadvies (het handvattenblok) als kaarten.
 * De welkomsttekst is puur visueel en gaat niet mee naar de API — de
 * Messages API verwacht een gesprek dat met de bezoeker begint.
 */
export function AdviesChat() {
  const [berichten, setBerichten] = useState<ChatBericht[]>([]);
  const [invoer, setInvoer] = useState("");
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const invoerRef = useRef<HTMLTextAreaElement>(null);

  const aantalGebruikersbeurten = berichten.filter((b) => b.role === "user").length;
  const heeftAdvies = berichten.some(
    (b) => b.role === "assistant" && parseBotAntwoord(b.content).advies !== null
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [berichten]);

  async function verstuur(tekst: string) {
    const inhoud = tekst.trim();
    if (!inhoud || bezig) return;

    const gesprek: ChatBericht[] = [...berichten, { role: "user", content: inhoud }];
    setBerichten(gesprek);
    setInvoer("");
    setFout(null);
    setBezig(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: gesprek }),
      });
      if (!res.ok || !res.body) {
        setFout(FOUT_TEKST);
        return;
      }

      // Streamend antwoord: bouw het botbericht chunk voor chunk op.
      setBerichten([...gesprek, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let antwoord = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        antwoord += decoder.decode(value, { stream: true });
        const totNu = antwoord;
        setBerichten([...gesprek, { role: "assistant", content: totNu }]);
      }
      if (!antwoord.trim()) {
        setBerichten(gesprek);
        setFout(FOUT_TEKST);
      }
    } catch {
      setBerichten((huidig) =>
        huidig[huidig.length - 1]?.role === "assistant" &&
        huidig[huidig.length - 1]?.content === ""
          ? huidig.slice(0, -1)
          : huidig
      );
      setFout(FOUT_TEKST);
    } finally {
      setBezig(false);
      invoerRef.current?.focus();
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void verstuur(invoer);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void verstuur(invoer);
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border border-kpv-border bg-white shadow-sm">
      {/* Gespreksvenster */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Adviesgesprek"
        className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6"
      >
        <Bubble van="bot">{copy.chat.welkom}</Bubble>

        {berichten.map((bericht, i) => {
          if (bericht.role === "user") {
            return (
              <Bubble key={i} van="gebruiker">
                {bericht.content}
              </Bubble>
            );
          }
          const { tekst, advies: handvatten, bezigMetAdvies } = parseBotAntwoord(
            bericht.content
          );
          return (
            <div key={i}>
              {tekst && <Bubble van="bot">{tekst}</Bubble>}
              {bezigMetAdvies && (
                <p className="mt-2 flex items-center gap-2 text-sm text-kpv-grijs/70">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  {copy.chat.adviesBezigLabel}
                </p>
              )}
              {handvatten && <HandvattenKaarten advies={handvatten} />}
            </div>
          );
        })}

        {bezig &&
          (berichten[berichten.length - 1]?.role === "user" ||
            berichten[berichten.length - 1]?.content === "") && (
          <p className="flex items-center gap-2 text-sm text-kpv-grijs/70">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {copy.chat.bezigLabel}
          </p>
        )}

        {fout && (
          <p role="alert" className="rounded-card bg-red-50 p-3 text-sm text-red-800">
            {fout}
          </p>
        )}
      </div>

      {/* Suggesties */}
      {berichten.length === 0 && (
        <div className="flex flex-wrap gap-2 border-t border-kpv-border px-4 py-3 sm:px-6">
          {copy.chat.starters.map((starter) => (
            <button
              key={starter}
              type="button"
              onClick={() => void verstuur(starter)}
              className="rounded-full border border-kpv-border bg-kpv-offwhite px-3 py-1.5 text-left text-sm text-kpv-grijs hover:border-kpv-paars hover:text-kpv-paars"
            >
              {starter}
            </button>
          ))}
        </div>
      )}
      {aantalGebruikersbeurten >= 2 && !heeftAdvies && !bezig && (
        <div className="border-t border-kpv-border px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => void verstuur("Geef me nu de tien handvatten voor mijn situatie.")}
            className="inline-flex items-center gap-2 rounded-full bg-kpv-paars px-4 py-2 text-sm font-semibold text-white hover:bg-kpv-paars-donker"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {copy.chat.handvattenKnop}
          </button>
        </div>
      )}

      {/* Invoer */}
      <form onSubmit={onSubmit} className="border-t border-kpv-border p-3 sm:p-4">
        <div className="flex items-end gap-2">
          <label htmlFor="advies-invoer" className="sr-only">
            Uw bericht aan de adviesbot
          </label>
          <textarea
            id="advies-invoer"
            ref={invoerRef}
            value={invoer}
            onChange={(e) => setInvoer(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={copy.chat.invoerPlaceholder}
            rows={2}
            maxLength={4000}
            className="min-h-[3rem] flex-1 resize-none rounded-md border border-kpv-border bg-white px-3 py-2 text-sm outline-none focus:border-kpv-paars focus:ring-2 focus:ring-kpv-paars/30"
          />
          <button
            type="submit"
            disabled={bezig || !invoer.trim()}
            className="inline-flex h-12 items-center gap-1.5 rounded-md bg-kpv-paars px-4 text-sm font-semibold text-white transition-colors hover:bg-kpv-paars-donker disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendHorizonal className="h-4 w-4" aria-hidden="true" />
            {copy.chat.verstuurLabel}
          </button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-kpv-grijs/70">
          {copy.chat.disclaimer}
        </p>
      </form>
    </div>
  );
}

function Bubble({
  van,
  children,
}: {
  van: "bot" | "gebruiker";
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex", van === "gebruiker" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-card px-4 py-3 text-sm leading-relaxed",
          van === "gebruiker"
            ? "bg-kpv-paars text-white"
            : "bg-kpv-offwhite text-kpv-grijs"
        )}
      >
        {children}
      </div>
    </div>
  );
}
