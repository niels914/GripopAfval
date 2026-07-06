"use client";

import { createContext, useContext, useState } from "react";
import type { ScanInput, ScanResultaat } from "@/lib/scanCalculator";

export type ScanRoute = "factuur" | "schatting";

interface ScanState {
  stap: 1 | 2 | 3;
  route: ScanRoute | null;
  resultaat: ScanResultaat | null;
  kiesRoute: (route: ScanRoute) => void;
  toonResultaat: (resultaat: ScanResultaat) => void;
  terug: () => void;
  opnieuw: () => void;
  laatsteInput: ScanInput | null;
}

const ScanContext = createContext<ScanState | null>(null);

export function ScanProvider({ children }: { children: React.ReactNode }) {
  const [stap, setStap] = useState<1 | 2 | 3>(1);
  const [route, setRoute] = useState<ScanRoute | null>(null);
  const [resultaat, setResultaat] = useState<ScanResultaat | null>(null);

  const value: ScanState = {
    stap,
    route,
    resultaat,
    laatsteInput: resultaat?.input ?? null,
    kiesRoute: (r) => {
      setRoute(r);
      setStap(2);
    },
    toonResultaat: (r) => {
      setResultaat(r);
      setStap(3);
    },
    terug: () => setStap((s) => (s > 1 ? ((s - 1) as 1 | 2) : s)),
    opnieuw: () => {
      setStap(1);
      setRoute(null);
      setResultaat(null);
    },
  };

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
}

export function useScan(): ScanState {
  const ctx = useContext(ScanContext);
  if (!ctx) throw new Error("useScan moet binnen <ScanProvider> gebruikt worden");
  return ctx;
}
