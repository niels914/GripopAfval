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
      <p className="mx-auto mt-2 max-w-xl text-center text-kpv-grijs/70">
        {c.subtitel}
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {kaarten.map((kaart) => (
          <button
            key={kaart.route}
            type="button"
            onClick={() => kiesRoute(kaart.route)}
            className="group flex flex-col items-start gap-4 rounded-card border-2 border-kpv-border bg-white p-8 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-kpv-paars hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kpv-blauw"
          >
            <span className="rounded-lg bg-kpv-offwhite p-3 text-kpv-paars group-hover:bg-kpv-paars group-hover:text-white">
              <kaart.icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <span className="rounded-full bg-kpv-blauw/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-kpv-blauw">
              {kaart.badge}
            </span>
            <span className="font-heading text-xl font-semibold">{kaart.titel}</span>
            <span className="text-sm leading-relaxed text-kpv-grijs/70">
              {kaart.beschrijving}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
