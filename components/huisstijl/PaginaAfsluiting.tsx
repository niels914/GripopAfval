import Link from "next/link";
import { MeerWeten } from "./MeerWeten";

interface PaginaAfsluitingProps {
  meerWetenKop: string;
  meerWetenTekst: string;
  ctaLabel?: string;
  ctaHref?: string;
  bronnen?: string;
}

/**
 * Standaardafsluiting van een pagina (huisstijl 2.2): het "Meer weten?"-blok,
 * optioneel de bronvermelding, en eenmalig de tagline linksonder.
 */
export function PaginaAfsluiting({
  meerWetenKop,
  meerWetenTekst,
  ctaLabel,
  ctaHref,
  bronnen,
}: PaginaAfsluitingProps) {
  return (
    <div className="mt-14">
      <MeerWeten kop={meerWetenKop} tekst={meerWetenTekst} ctaLabel={ctaLabel} ctaHref={ctaHref} />
      {bronnen && <p className="bron mt-4">{bronnen}</p>}
      <div className="mt-4 flex items-center justify-between">
        <div className="slot-tagline">Verschil zien, verschil maken</div>
        <Link href="/privacy" className="bron hover:underline">
          Privacy
        </Link>
      </div>
    </div>
  );
}
