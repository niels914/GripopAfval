import type { CashflowJaar } from "@/lib/scanCalculator";
import { formatEuro } from "@/lib/utils";
import { scanContent } from "@/content/scan";

/** Netto-cashflow over 3 jaar, inclusief de succes-fee — volledige transparantie. */
export function CashflowTabel({ cashflow }: { cashflow: CashflowJaar[] }) {
  const c = scanContent.stap3.cashflow;
  const cumulatief = cashflow[cashflow.length - 1]?.cumulatief ?? 0;

  return (
    <div className="overflow-x-auto rounded-card border border-kpv-border bg-white">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <caption className="sr-only">{c.titel}</caption>
        <thead>
          <tr className="border-b border-kpv-border bg-kpv-offwhite text-left">
            {c.kolommen.map((kolom, i) => (
              <th
                key={kolom}
                scope="col"
                className={`px-4 py-3 font-heading font-semibold ${i > 0 ? "text-right" : ""}`}
              >
                {kolom}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cashflow.map((rij) => (
            <tr key={rij.jaar} className="border-b border-kpv-border">
              <th scope="row" className="px-4 py-3 text-left font-medium">
                Jaar {rij.jaar}
              </th>
              <td className="px-4 py-3 text-right">{formatEuro(rij.brutoBesparing)}</td>
              <td className="px-4 py-3 text-right text-kpv-grijs/70">
                −{formatEuro(rij.succesFee)}
              </td>
              <td className="px-4 py-3 text-right text-kpv-grijs/70">
                {rij.investering > 0 ? `−${formatEuro(rij.investering)}` : "—"}
              </td>
              <td
                className={`px-4 py-3 text-right font-semibold ${rij.netto >= 0 ? "text-kpv-paars" : "text-red-600"}`}
              >
                {formatEuro(rij.netto)}
              </td>
            </tr>
          ))}
          <tr className="bg-kpv-offwhite">
            <th scope="row" colSpan={4} className="px-4 py-3 text-left font-heading font-semibold">
              {c.cumulatiefLabel}
            </th>
            <td className="px-4 py-3 text-right font-heading text-base font-bold text-kpv-paars">
              {formatEuro(cumulatief)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
