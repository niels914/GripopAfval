import Link from "next/link";
import { cn } from "@/lib/utils";

type KnopKleur = "magenta" | "diepblauw";

interface KnopProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  kleur?: KnopKleur;
  className?: string;
  children: React.ReactNode;
}

/**
 * CTA-knop: schuine rechterrand, standaard Magenta. Gebruik spaarzaam
 * (één hoofd-CTA per scherm); een tweede actie kan `kleur="diepblauw"` zijn.
 */
export function Knop({ href, kleur = "magenta", className, children, ...props }: KnopProps) {
  const classNamen = cn("knop", kleur === "diepblauw" && "knop-diepblauw", className);
  if (href) {
    return (
      <Link href={href} className={classNamen}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classNamen} {...props}>
      {children}
    </button>
  );
}
