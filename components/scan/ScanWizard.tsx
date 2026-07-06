"use client";

import { ScanProvider, useScan } from "@/components/scan/ScanContext";
import { StepChoice } from "@/components/scan/StepChoice";
import { StepForm } from "@/components/scan/StepForm";
import { StepResult } from "@/components/scan/StepResult";
import { scanContent } from "@/content/scan";
import { cn } from "@/lib/utils";

function Voortgang() {
  const { stap } = useScan();
  return (
    <ol
      className="mb-10 flex items-center justify-center gap-2 sm:gap-4"
      aria-label="Voortgang van de scan"
    >
      {scanContent.stappen.map((label, i) => {
        const nummer = (i + 1) as 1 | 2 | 3;
        const actief = stap === nummer;
        const afgerond = stap > nummer;
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-4">
            {i > 0 && <span className="h-px w-6 bg-kpv-border sm:w-12" aria-hidden="true" />}
            <span
              className="flex items-center gap-2"
              aria-current={actief ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  actief && "bg-kpv-paars text-white",
                  afgerond && "bg-kpv-paars-licht text-white",
                  !actief && !afgerond && "border border-kpv-border bg-white text-kpv-grijs/50"
                )}
              >
                {nummer}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-medium sm:inline",
                  actief ? "text-kpv-grijs" : "text-kpv-grijs/50"
                )}
              >
                {label}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function WizardInhoud() {
  const { stap } = useScan();
  return (
    <div>
      <Voortgang />
      {stap === 1 && <StepChoice />}
      {stap === 2 && <StepForm />}
      {stap === 3 && <StepResult />}
    </div>
  );
}

export function ScanWizard() {
  return (
    <ScanProvider>
      <WizardInhoud />
    </ScanProvider>
  );
}
