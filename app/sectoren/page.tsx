import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { sectoren } from "@/content/sectoren";

export const metadata: Metadata = {
  title: sectoren.meta.title,
  description: sectoren.meta.description,
  openGraph: { title: sectoren.meta.title, description: sectoren.meta.description },
};

export default function SectorenPagina() {
  return (
    <>
      <section className="bg-white py-16 sm:py-20">
        <Container className="text-center">
          <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl">
            {sectoren.hero.titel}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-kpv-grijs/70">
            {sectoren.hero.subtitel}
          </p>
        </Container>
      </section>

      {/* MBO-verwijzing */}
      <section aria-labelledby="mbo-kop" className="py-12">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-start justify-between gap-4 rounded-card border-2 border-kpv-paars bg-white p-8 shadow-sm sm:flex-row sm:items-center">
              <div>
                <h2 id="mbo-kop" className="text-xl sm:text-2xl">
                  {sectoren.mboVerwijzing.kop}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-kpv-grijs/70">
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
          </FadeIn>
        </Container>
      </section>

      {/* Sectorblokken */}
      <section aria-label="Sectoroverzicht" className="pb-16 sm:pb-20">
        <Container className="space-y-8">
          {sectoren.segmenten.map((segment) => (
            <FadeIn key={segment.id}>
              <article
                id={segment.id}
                className="scroll-mt-24 rounded-card border border-kpv-border bg-white p-8 shadow-sm"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <h2 className="text-2xl">{segment.naam}</h2>
                    <p className="mt-1 text-sm font-medium text-kpv-blauw">
                      {segment.kengetal}
                    </p>
                    <p className="mt-3 leading-relaxed text-kpv-grijs/80">
                      {segment.tekst}
                    </p>
                  </div>
                  <div className="shrink-0 lg:w-72">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-kpv-grijs/60">
                      Quick wins
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {segment.quickWins.map((win) => (
                        <li key={win} className="flex items-start gap-2 text-sm">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-kpv-paars"
                            aria-hidden="true"
                          />
                          {win}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}

          <div className="pt-4 text-center">
            <Button asChild size="lg">
              <Link href="/afvalscan">Bereken uw besparing per sector</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
