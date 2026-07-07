"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bouwDeelQuery } from "@/lib/scanDeepLink";
import type { ScanInput } from "@/lib/scanCalculator";
import { scanContent } from "@/content/scan";

/** Kopieert een deelbare link naar deze berekening (alleen invoer, geen PII). */
export function DeelKnop({ input }: { input: ScanInput }) {
  const [gekopieerd, setGekopieerd] = useState(false);
  const c = scanContent.stap3.delen;

  async function kopieer() {
    const url = `${window.location.origin}/afvalscan?${bouwDeelQuery(input)}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard geweigerd (bv. http of permissie): toon de URL als prompt.
      window.prompt("Kopieer deze link:", url);
    }
    setGekopieerd(true);
    window.setTimeout(() => setGekopieerd(false), 2500);
  }

  return (
    <div className="text-center">
      <Button type="button" variant="secondary" onClick={kopieer}>
        {gekopieerd ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Share2 className="h-4 w-4" aria-hidden="true" />
        )}
        {gekopieerd ? c.gekopieerd : c.knop}
      </Button>
      <p className="mt-1 text-xs text-kpv-grijs/70">{c.toelichting}</p>
    </div>
  );
}
