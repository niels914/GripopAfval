"use client";

import type { MeerjarenJaar } from "@/lib/scanCalculator";
import { formatEuro } from "@/lib/utils";

const KLEUR_ZONDER = "#2E2E38";
const KLEUR_MET = "#9462A6";

function compact(bedrag: number): string {
  if (bedrag >= 100_000) return `€ ${Math.round(bedrag / 1000)}k`;
  if (bedrag >= 10_000) return `€ ${(bedrag / 1000).toFixed(0)}k`;
  if (bedrag >= 1_000) return `€ ${(bedrag / 1000).toFixed(1)}k`;
  return formatEuro(bedrag);
}

/**
 * Staafgrafiek 2026-2030: verwerkingskosten zonder actie vs. met scenario.
 * Pure SVG in huisstijl; leesbare samenvatting via aria-label.
 */
export function MeerjarenGrafiek({ jaren }: { jaren: MeerjarenJaar[] }) {
  const max = Math.max(...jaren.map((j) => j.kostenZonderActie), 1);
  const B = 640;
  const H = 250;
  const padX = 8;
  const padBottom = 28;
  const padTop = 24;
  const groepBreedte = (B - padX * 2) / jaren.length;
  const staafBreedte = Math.min(34, groepBreedte / 2.6);
  const schaal = (H - padTop - padBottom) / max;

  const laatste = jaren[jaren.length - 1];
  const samenvatting = `Zonder actie stijgen de jaarlijkse verwerkingskosten van ${formatEuro(
    jaren[0].kostenZonderActie
  )} in ${jaren[0].jaar} naar ${formatEuro(laatste.kostenZonderActie)} in ${
    laatste.jaar
  }; met het gekozen scenario blijven ze op ${formatEuro(laatste.kostenMetScenario)}.`;

  return (
    <figure>
      <svg
        viewBox={`0 0 ${B} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={samenvatting}
      >
        {jaren.map((j, i) => {
          const xMidden = padX + groepBreedte * i + groepBreedte / 2;
          const hZonder = j.kostenZonderActie * schaal;
          const hMet = j.kostenMetScenario * schaal;
          return (
            <g key={j.jaar}>
              <rect
                x={xMidden - staafBreedte - 3}
                y={H - padBottom - hZonder}
                width={staafBreedte}
                height={hZonder}
                rx={4}
                fill={KLEUR_ZONDER}
              />
              <rect
                x={xMidden + 3}
                y={H - padBottom - hMet}
                width={staafBreedte}
                height={hMet}
                rx={4}
                fill={KLEUR_MET}
              />
              <text
                x={xMidden - staafBreedte / 2 - 3}
                y={H - padBottom - hZonder - 6}
                textAnchor="middle"
                fontSize="11"
                fill={KLEUR_ZONDER}
                fontWeight="600"
              >
                {compact(j.kostenZonderActie)}
              </text>
              <text
                x={xMidden + staafBreedte / 2 + 3}
                y={H - padBottom - hMet - 6}
                textAnchor="middle"
                fontSize="11"
                fill={KLEUR_MET}
                fontWeight="600"
              >
                {compact(j.kostenMetScenario)}
              </text>
              <text
                x={xMidden}
                y={H - 8}
                textAnchor="middle"
                fontSize="12"
                fill="#6b6876"
              >
                {j.jaar}
                {j.jaar === 2028 ? " ⚠" : ""}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-kpv-grijs/70">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: KLEUR_ZONDER }}
            aria-hidden="true"
          />
          Zonder actie
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: KLEUR_MET }}
            aria-hidden="true"
          />
          Met uw scenario
        </span>
        <span>⚠ 2028: verdubbeling restafvaltarief (aanname)</span>
      </figcaption>
    </figure>
  );
}
