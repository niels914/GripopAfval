import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Balk } from "@/components/huisstijl/Balk";
import { ChevList } from "@/components/huisstijl/ChevList";
import { PaginaAfsluiting } from "@/components/huisstijl/PaginaAfsluiting";
import { sectoren } from "@/content/sectoren";

export const metadata: Metadata = {
  title: sectoren.meta.title,
  description: sectoren.meta.description,
  openGraph: { title: sectoren.meta.title, description: sectoren.meta.description },
};

export default function SectorenPagina() {
  return (
    <>
      <section className="sectie">
        <Container className="text-center">
          <Balk as="h1" kleur="inkt" className="mx-auto text-3xl sm:text-4xl">
            {sectoren.hero.titel}
          </Balk>
          <p className="lead mx-auto mt-4">{sectoren.hero.subtitel}</p>
        </Container>
      </section>

      {/* MBO-verwijzing */}
      <section aria-labelledby="mbo-kop" className="sectie">
        <Container>
          <div className="blok-violet blok flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 id="mbo-kop" className="text-xl sm:text-2xl">
                {sectoren.mboVerwijzing.kop}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-tekst">
                {sectoren.mboVerwijzing.tekst}
              </p>
            </div>
            <Button asChild>
              <Link href={sectoren.mboVerwijzing.linkHref}>
                {sectoren.mboVerwijzing.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Sectorblokken */}
      <section aria-label="Sectoroverzicht" className="sectie space-y-6">
        <Container className="space-y-6">
          {sectoren.segmenten.map((segment) => (
            <article key={segment.id} id={segment.id} className="blok scroll-mt-24">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold">{segment.naam}</h2>
                  <p className="mt-1 text-sm font-medium text-diepblauw">{segment.kengetal}</p>
                  <p className="mt-3 leading-relaxed text-tekst-2">{segment.tekst}</p>
                </div>
                <div className="shrink-0 lg:w-72">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-tekst-2">
                    Quick wins
                  </h3>
                  <ChevList className="mt-3 text-sm">
                    {segment.quickWins.map((win) => (
                      <li key={win}>{win}</li>
                    ))}
                  </ChevList>
                </div>
              </div>
            </article>
          ))}

          <div className="pt-4 text-center">
            <Button asChild size="lg">
              <Link href="/afvalscan">Bereken uw besparing per sector</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Container>
        <PaginaAfsluiting
          meerWetenKop="Uw sector niet terug zien?"
          meerWetenTekst="De aanpak werkt breder dan deze voorbeelden — neem gerust contact op."
        />
      </Container>
    </>
  );
}
