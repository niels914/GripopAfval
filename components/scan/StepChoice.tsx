"use client";

import { FileText, Ruler } from "lucide-react";
import { useScan } from "@/components/scan/ScanContext";
import { scanContent } from "@/content/scan";

export function StepChoice() {
  const { kiesRoute } = useScan();
  const c = scanContent.stap1;

  const kaarten = [
    {
      route: "factuur" as const,
      icon: FileText,
      titel: c.factuur.titel,
      badge: c.factuur.badge,
      beschrijving: c.factuur.beschrijving,
    },
    {
      route: "schatting" as const,
      icon: Ruler,
      titel: c.schatting.titel,
      badge: c.schatting.badge,
      beschrijving: c.schatting.beschrijving,
    },
  ];

  return (
    <div>
      <h2 className="text-center text-2xl sm:text-3xl">{c.titel}</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-tekst-2">
        {c.subtitel}
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {kaarten.map((kaart) => (
          <button
            key={kaart.route}
            type="button"
            onClick={() => kiesRoute(kaart.route)}
            className="group blok flex flex-col items-start gap-4 text-left transition-colors hover:bg-violet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-diepblauw"
          >
            <kaart.icon className="h-7 w-7 text-purper" aria-hidden="true" />
            <span className="status-pil">{kaart.badge}</span>
            <span className="text-xl font-bold">{kaart.titel}</span>
            <span className="text-sm leading-relaxed text-tekst-2">
              {kaart.beschrijving}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
