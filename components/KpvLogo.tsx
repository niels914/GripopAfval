import Image from "next/image";
import kplusvLogo from "@/assets/logos/kplusv-logo.png";

/**
 * KplusV-beeldmerk: het officiële vierkante logo (diagonale strepen in de
 * huisstijlkleuren met de gestapelde tekst K / PLUS / V), aangeleverd als
 * beeldmateriaal. Alleen gebruikt in kleine formaten (footer, trustbar).
 */
export function KpvLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src={kplusvLogo}
      alt="KplusV logo"
      className={`${className} rounded-sm`}
    />
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
