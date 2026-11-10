import { cn } from "@/lib/utils";

type BalkKleur = "diepblauw" | "inkt" | "purper";
type BalkTag = "h1" | "h2" | "h3" | "div" | "span";

interface BalkProps extends React.HTMLAttributes<HTMLElement> {
  as?: BalkTag;
  kleur?: BalkKleur;
  className?: string;
  children: React.ReactNode;
}

/**
 * Tekstbalk met schuine rechterrand (de snede is zo breed als de balk hoog
 * is). Voor koptitels, kernboodschappen, quotes — één kernboodschap per blok.
 */
export function Balk({ as = "div", kleur = "diepblauw", className, children, ...props }: BalkProps) {
  const Tag = as;
  return (
    <Tag className={cn("balk", `balk-${kleur}`, className)} {...props}>
      {children}
    </Tag>
  );
}
