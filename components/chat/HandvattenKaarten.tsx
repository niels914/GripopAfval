"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import type { HandvattenAdvies } from "@/lib/chat/types";
import { CATEGORIE_LABELS } from "@/content/library/handvatten";
import { advies as copy } from "@/content/advies";

/** Zet het advies om naar platte tekst voor de kopieerknop. */
function adviesAlsTekst(advies: HandvattenAdvies): string {
  const regels = advies.handvatten.map((h, i) => {
    const links = h.links?.map((l) => `${l.label}: ${l.url}`).join(", ");
    return [
      `${i + 1}. ${h.titel} [${CATEGORIE_LABELS[h.categorie]}]`,
      `   ${h.toelichting}`,
      h.actie ? `   Eerste stap: ${h.actie}` : null,
      links ? `   Links: ${links}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  });
  return `${advies.intro}\n\n${regels.join("\n\n")}\n\nBron: GripOpAfval — gripopafval.nl/advies`;
}

/** Rendert het tienpuntsadvies van de bot als genummerde kaarten. */
export function HandvattenKaarten({ advies }: { advies: HandvattenAdvies }) {
  const [gekopieerd, setGekopieerd] = useState(false);

  async function kopieer() {
    try {
      await navigator.clipboard.writeText(adviesAlsTekst(advies));
      setGekopieerd(true);
      setTimeout(() => setGekopieerd(false), 2500);
    } catch {
      // Clipboard geweigerd (bijv. permissies): knop blijft gewoon staan.
    }
  }

  return (
    <div className="mt-3 rounded-card border-2 border-kpv-paars bg-white p-4 sm:p-5">
      <p className="text-sm leading-relaxed text-kpv-grijs/80">{advies.intro}</p>

      <ol className="mt-4 space-y-3">
        {advies.handvatten.map((handvat, i) => (
          <li
            key={`${i}-${handvat.titel}`}
            className="rounded-card border border-kpv-border bg-kpv-offwhite p-4"
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kpv-paars font-heading text-sm font-bold text-white"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-base font-semibold leading-snug">
                    {handvat.titel}
                  </h3>
                  <span className="rounded-full bg-kpv-paars/10 px-2.5 py-0.5 text-xs font-medium text-kpv-paars">
                    {CATEGORIE_LABELS[handvat.categorie]}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-kpv-grijs/80">
                  {handvat.toelichting}
                </p>
                {handvat.actie && (
                  <p className="mt-2 text-sm">
                    <span className="font-semibold text-kpv-grijs">Eerste stap:</span>{" "}
                    {handvat.actie}
                  </p>
                )}
                {handvat.links && handvat.links.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {handvat.links.map((link) =>
                      link.url.startsWith("/") ? (
                        <li key={link.url}>
                          <Link
                            href={link.url}
                            className="inline-flex items-center gap-1 rounded-full border border-kpv-border bg-white px-3 py-1 text-xs font-medium text-kpv-blauw-tekst hover:border-kpv-paars"
                          >
                            {link.label}
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          </Link>
                        </li>
                      ) : (
                        <li key={link.url}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-kpv-border bg-white px-3 py-1 text-xs font-medium text-kpv-blauw-tekst hover:border-kpv-paars"
                          >
                            {link.label}
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={kopieer}
        className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-kpv-border px-3 py-1.5 text-sm font-medium text-kpv-grijs hover:border-kpv-paars hover:text-kpv-paars"
      >
        {gekopieerd ? (
          <>
            <Check className="h-4 w-4" aria-hidden="true" /> {copy.chat.gekopieerdLabel}
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" aria-hidden="true" /> {copy.chat.kopieerLabel}
          </>
        )}
      </button>
    </div>
  );
}
