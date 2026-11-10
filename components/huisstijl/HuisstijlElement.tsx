const KLEUREN = ["#5760A6", "#B8AED6", "#9462A6"] as const;

/**
 * Huisstijlelement: schuine lijnen (45°) afgeleid uit het logo, 1-3 delen
 * met witte tussenruimte. `delen` bepaalt hoeveel polygonen getoond worden.
 */
export function HuisstijlElement({
  delen = 3,
  className = "h-24 w-auto",
}: {
  delen?: 1 | 2 | 3;
  className?: string;
}) {
  const deelbreedte = 56;
  const tussenruimte = 12;
  const hoogte = 96;
  const stap = deelbreedte + tussenruimte;
  // De polygonen hellen naar rechts; het rechtse punt van het laatste deel
  // bepaalt de breedte, niet de onderkant.
  const breedte = (delen - 1) * stap + hoogte + deelbreedte;

  return (
    <svg
      viewBox={`0 0 ${breedte} ${hoogte}`}
      className={className}
      role="img"
      aria-label="KplusV huisstijlelement"
    >
      {Array.from({ length: delen }, (_, i) => {
        const x = i * stap;
        return (
          <polygon
            key={i}
            points={`${x + hoogte},0 ${x + hoogte + deelbreedte},0 ${x + deelbreedte},${hoogte} ${x},${hoogte}`}
            fill={KLEUREN[i % KLEUREN.length]}
          />
        );
      })}
    </svg>
  );
}
