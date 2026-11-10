import { site } from "@/content/site";
import { Knop } from "./Knop";

interface MeerWetenProps {
  kop: string;
  tekst: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * "Meer weten?"-contactblok (huisstijl 2.2): Mist-blok met links kop+tekst,
 * rechts een vierkant fotoblok dat boven de bovenrand uitsteekt.
 *
 * De transparante portretfoto van Niels (PNG/WebP, 2000x2000, glimlachend)
 * is niet aangeleverd in de huisstijl-skill — het fotoblok toont daarom
 * voorlopig alleen de Violet kleurachtergrond, zonder foto. Zodra het
 * bestand er is, zet het in assets/foto-niels.png en geef het hier door.
 */
export function MeerWeten({ kop, tekst, ctaLabel, ctaHref }: MeerWetenProps) {
  return (
    <div className="meer">
      <div>
        <h2>{kop}</h2>
        <p>{tekst}</p>
        {ctaLabel && ctaHref && (
          <div className="mt-4">
            <Knop href={ctaHref}>{ctaLabel}</Knop>
          </div>
        )}
      </div>
      <div className="persoon">
        <div className="meer-fotoblok" aria-hidden="true" />
        <div className="meer-naam">{site.niels.naam}</div>
        <div className="meer-rol">{site.niels.functie}</div>
        <div className="meer-contact">
          <span>{site.niels.telefoon}</span>
          <a href={`mailto:${site.niels.email}`}>{site.niels.email}</a>
        </div>
      </div>
    </div>
  );
}
