import type { CashflowJaar } from "@/lib/scanCalculator";
import { formatEuro } from "@/lib/utils";
import { scanContent } from "@/content/scan";

/** Netto-cashflow over 3 jaar, inclusief de succes-fee — volledige transparantie. */
export function CashflowTabel({ cashflow }: { cashflow: CashflowJaar[] }) {
  const c = scanContent.stap3.cashflow;
  const cumulatief = cashflow[cashflow.length - 1]?.cumulatief ?? 0;

  return (
    <div className="overflow-x-auto">
      <table className="tabel-huisstijl min-w-[560px]">
        <caption className="sr-only">{c.titel}</caption>
        <thead>
          <tr>
            {c.kolommen.map((kolom) => (
              <th key={kolom} scope="col">
                {kolom}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cashflow.map((rij) => (
            <tr key={rij.jaar}>
              <th scope="row" className="font-medium">
                Jaar {rij.jaar}
              </th>
              <td>{formatEuro(rij.brutoBesparing)}</td>
              <td className="text-tekst-2">−{formatEuro(rij.succesFee)}</td>
              <td className="text-tekst-2">
                {rij.investering > 0 ? `−${formatEuro(rij.investering)}` : "—"}
              </td>
              <td className={`font-semibold ${rij.netto >= 0 ? "text-purper" : "text-red-600"}`}>
                {formatEuro(rij.netto)}
              </td>
            </tr>
          ))}
          <tr className="bg-mist">
            <th scope="row" colSpan={4} className="font-semibold">
              {c.cumulatiefLabel}
            </th>
            <td className="text-base font-bold text-purper">{formatEuro(cumulatief)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
