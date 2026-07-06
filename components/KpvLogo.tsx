/** Logo-placeholder voor KplusV, in huisstijlkleuren. Vervang door het echte logo-SVG. */
export function KpvLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 32"
      className={className}
      role="img"
      aria-label="KplusV logo"
    >
      <rect x="0" y="4" width="24" height="24" rx="6" fill="#9462A6" />
      <path
        d="M7 10v12M7 16l7-6M7 16l7 6"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="32"
        y="23"
        fontFamily="var(--font-poppins), sans-serif"
        fontWeight="700"
        fontSize="17"
        fill="#2E2E38"
      >
        KplusV
      </text>
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
