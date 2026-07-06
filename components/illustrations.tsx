/**
 * Abstracte SVG-illustraties in KplusV-huisstijl.
 * Geen stockfoto's: eenvoudige, rustige vormen in paars/blauw.
 */

/** Drie afvalstromen die samenkomen in één gescheiden systeem (hero). */
export function WasteStreamsIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 400"
      className={className}
      role="img"
      aria-label="Illustratie: drie afvalstromen komen samen in gescheiden inzameling"
    >
      {/* Achtergrondvlak */}
      <circle cx="240" cy="200" r="180" fill="#F7F5FA" />
      <circle cx="240" cy="200" r="180" fill="none" stroke="#E5E1EC" strokeWidth="2" />

      {/* Drie stromen */}
      <path
        d="M60 60 C 140 80, 170 140, 220 180"
        fill="none"
        stroke="#9462A6"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M240 30 C 240 90, 240 130, 240 175"
        fill="none"
        stroke="#007DB5"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M420 60 C 340 80, 310 140, 260 180"
        fill="none"
        stroke="#B8AED6"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Stroom-bollen */}
      <circle cx="60" cy="60" r="16" fill="#9462A6" />
      <circle cx="240" cy="30" r="16" fill="#007DB5" />
      <circle cx="420" cy="60" r="16" fill="#B8AED6" />

      {/* Trechter / scheider */}
      <path d="M200 185 h80 l-14 40 h-52 z" fill="#5760A6" />
      <rect x="222" y="225" width="36" height="14" rx="4" fill="#5760A6" />

      {/* Drie gescheiden containers */}
      <g>
        <rect x="140" y="280" width="56" height="64" rx="8" fill="#9462A6" />
        <rect x="136" y="270" width="64" height="12" rx="4" fill="#5760A6" />
        <rect x="212" y="280" width="56" height="64" rx="8" fill="#007DB5" />
        <rect x="208" y="270" width="64" height="12" rx="4" fill="#5760A6" />
        <rect x="284" y="280" width="56" height="64" rx="8" fill="#B8AED6" />
        <rect x="280" y="270" width="64" height="12" rx="4" fill="#5760A6" />
      </g>

      {/* Pijlen van scheider naar containers */}
      <path d="M226 245 L 172 268" stroke="#5760A6" strokeWidth="4" strokeLinecap="round" />
      <path d="M240 245 L 240 268" stroke="#5760A6" strokeWidth="4" strokeLinecap="round" />
      <path d="M254 245 L 308 268" stroke="#5760A6" strokeWidth="4" strokeLinecap="round" />

      {/* Recycle-accent */}
      <g transform="translate(360 300)">
        <path
          d="M20 0 a20 20 0 1 1 -14 6"
          fill="none"
          stroke="#007DB5"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="M0 2 l6 8 8-6" fill="none" stroke="#007DB5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/** Dalende kostenlijn met containers (voor sectorpagina's). */
export function SavingsIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      role="img"
      aria-label="Illustratie: dalende afvalkosten"
    >
      <rect x="0" y="0" width="400" height="260" rx="16" fill="#F7F5FA" />
      {/* Staafjes die dalen */}
      <rect x="48" y="60" width="44" height="150" rx="6" fill="#B8AED6" />
      <rect x="118" y="95" width="44" height="115" rx="6" fill="#9462A6" />
      <rect x="188" y="125" width="44" height="85" rx="6" fill="#5760A6" />
      <rect x="258" y="150" width="44" height="60" rx="6" fill="#007DB5" />
      {/* Dalende pijl */}
      <path
        d="M60 48 C 160 70, 240 110, 330 145"
        fill="none"
        stroke="#2E2E38"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M318 130 l14 16 -20 5"
        fill="none"
        stroke="#2E2E38"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Vergrootglas boven afvalstromen (voor de scan). */
export function ScanIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      role="img"
      aria-label="Illustratie: afvalscan met vergrootglas"
    >
      <rect x="0" y="0" width="400" height="260" rx="16" fill="#F7F5FA" />
      {/* Stromen */}
      <rect x="40" y="170" width="70" height="50" rx="8" fill="#9462A6" />
      <rect x="130" y="170" width="70" height="50" rx="8" fill="#007DB5" />
      <rect x="220" y="170" width="70" height="50" rx="8" fill="#B8AED6" />
      {/* Vergrootglas */}
      <circle cx="200" cy="95" r="52" fill="#fff" stroke="#5760A6" strokeWidth="8" />
      <line x1="238" y1="133" x2="290" y2="185" stroke="#5760A6" strokeWidth="12" strokeLinecap="round" />
      {/* Percentageteken in glas */}
      <g stroke="#9462A6" strokeWidth="6" strokeLinecap="round">
        <line x1="180" y1="115" x2="220" y2="75" />
        <circle cx="184" cy="80" r="8" fill="none" />
        <circle cx="216" cy="110" r="8" fill="none" />
      </g>
    </svg>
  );
}
