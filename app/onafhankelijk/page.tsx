import type { Metadata } from "next";
import Link from "next/link";
import { FileX, PackageX, TrendingDown, type LucideIcon } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Balk } from "@/components/huisstijl/Balk";
import { PaginaAfsluiting } from "@/components/huisstijl/PaginaAfsluiting";
import {
  ComparisonTable,
  type ComparisonScore,
} from "@/components/ComparisonTable";
import { onafhankelijk } from "@/content/onafhankelijk";

export const metadata: Metadata = {
  title: onafhankelijk.meta.title,
  description: onafhankelijk.meta.description,
  openGraph: {
    title: onafhankelijk.meta.title,
    description: onafhankelijk.meta.description,
  },
};

const blokIconen: Record<string, LucideIcon> = {
  "package-x": PackageX,
  "file-x": FileX,
  "trending-down": TrendingDown,
};

export default function OnafhankelijkPagina() {
  return (
    <>
      {/* Grote uitspraak */}
      <section className="sectie">
        <Container className="text-center">
          <div className="bg-purper px-6 py-14 sm:px-10">
            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              {onafhankelijk.hero.titel}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
              {onafhankelijk.hero.subtitel}
            </p>
          </div>
        </Container>
      </section>

      {/* Drie subblokken */}
      <section aria-labelledby="blokken-kop" className="sectie">
        <Container>
          <h2 id="blokken-kop" className="sr-only">
            Waarom wij onafhankelijk zijn
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {onafhankelijk.blokken.map((blok) => {
              const Icon = blokIconen[blok.icon] ?? PackageX;
              return (
                <div key={blok.titel} className="blok h-full">
                  <Icon className="h-7 w-7 text-diepblauw" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-bold">{blok.titel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tekst-2">{blok.tekst}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Vergelijkingstabel */}
      <section aria-labelledby="vergelijking-kop" className="sectie">
        <Container>
          <Balk as="h2" id="vergelijking-kop">
            {onafhankelijk.vergelijking.kop}
          </Balk>
          <p className="lead mt-4">{onafhankelijk.vergelijking.toelichting}</p>
          <div className="mt-8">
            <ComparisonTable
              caption="Vergelijking van GripOpAfval met inzamelaars, adviesbureaus en startups op vijf assen"
              columns={onafhankelijk.vergelijking.kolommen}
              rows={onafhankelijk.vergelijking.rijen.map((rij) => ({
                as: rij.as,
                scores: rij.scores as readonly ComparisonScore[],
              }))}
            />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-kop" className="sectie">
        <Container className="text-center">
          <h2 id="cta-kop" className="text-3xl sm:text-4xl">
            {onafhankelijk.cta.kop}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-tekst-2">{onafhankelijk.cta.tekst}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href={onafhankelijk.cta.primair.href}>{onafhankelijk.cta.primair.label}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={onafhankelijk.cta.secundair.href}>{onafhankelijk.cta.secundair.label}</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Container>
        <PaginaAfsluiting
          meerWetenKop="Twijfelt u over een ander model?"
          meerWetenTekst="Niels legt graag uit waarom succes-fee de belangen gelijk trekt."
        />
      </Container>
    </>
  );
}
