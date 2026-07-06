/**
 * KplusV-beeldmerk: het vierkante logo met diagonale strepen in de
 * huisstijlkleuren en de gestapelde tekst K / PLUS / V.
 * SVG-reconstructie van het officiële logo, zodat het schaalbaar en scherp blijft.
 */
const KPV_STRIPE_KLEUREN = [
  "#007DB5", // blauw
  "#5760A6", // donkerviolet
  "#9462A6", // purper
  "#B8AED6", // lichtviolet
  "#007DB5",
  "#5760A6",
  "#9462A6",
  "#B8AED6",
  "#007DB5",
  "#5760A6",
  "#9462A6",
  "#B8AED6",
];

export function KpvLogo({ className = "h-8 w-8" }: { className?: string }) {
  const stripeBreedte = 13;
  const start = -28;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="KplusV logo"
    >
      <defs>
        <clipPath id="kpv-vierkant">
          <rect x="0" y="0" width="100" height="100" />
        </clipPath>
      </defs>
      <g clipPath="url(#kpv-vierkant)">
        <rect x="0" y="0" width="100" height="100" fill="#007DB5" />
        <g transform="rotate(45 50 50)">
          {KPV_STRIPE_KLEUREN.map((kleur, i) => (
            <rect
              key={i}
              x={start + i * stripeBreedte}
              y={-30}
              width={stripeBreedte}
              height={160}
              fill={kleur}
            />
          ))}
        </g>
      </g>
      <g
        fill="#FFFFFF"
        fontFamily="var(--font-poppins), Arial, sans-serif"
        fontWeight={700}
        textAnchor="middle"
      >
        <text x="50" y="37" fontSize="34">
          K
        </text>
        <text x="50" y="65" fontSize="26" textLength="86" lengthAdjust="spacingAndGlyphs">
          PLUS
        </text>
        <text x="50" y="94" fontSize="34">
          V
        </text>
      </g>
    </svg>
  );
}

/** Woordmerk GripOpAfval. */
export function GripOpAfvalLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 210 32"
      className={className}
      role="img"
      aria-label="GripOpAfval logo"
    >
      <g>
        <circle cx="16" cy="16" r="13" fill="none" stroke="#9462A6" strokeWidth="3" />
        <path
          d="M16 8.5a7.5 7.5 0 1 1-7.3 9.2"
          fill="none"
          stroke="#007DB5"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M6.5 15.5l2.2 3.4 3.4-2.2" fill="none" stroke="#007DB5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text
        x="36"
        y="22.5"
        fontFamily="var(--font-poppins), sans-serif"
        fontWeight="700"
        fontSize="18"
        fill="#2E2E38"
      >
        Grip<tspan fill="#9462A6">Op</tspan>Afval
      </text>
    </svg>
  );
}
