import type { Metadata } from "next";
import Link from "next/link";
import { FileX, PackageX, TrendingDown, type LucideIcon } from "lucide-react";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
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
      <section className="bg-kpv-paars py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-4xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {onafhankelijk.hero.titel}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            {onafhankelijk.hero.subtitel}
          </p>
        </Container>
      </section>

      {/* Drie subblokken */}
      <section aria-labelledby="blokken-kop" className="py-16 sm:py-20">
        <Container>
          <h2 id="blokken-kop" className="sr-only">
            Waarom wij onafhankelijk zijn
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {onafhankelijk.blokken.map((blok, i) => {
              const Icon = blokIconen[blok.icon] ?? PackageX;
              return (
                <FadeIn key={blok.titel} delay={i * 0.1}>
                  <div className="h-full rounded-card border border-kpv-border bg-white p-8 shadow-sm">
                    <span className="inline-flex rounded-lg bg-kpv-offwhite p-3 text-kpv-blauw">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-xl">{blok.titel}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-kpv-grijs/70">
                      {blok.tekst}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Vergelijkingstabel */}
      <section aria-labelledby="vergelijking-kop" className="bg-white py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="vergelijking-kop" className="text-3xl sm:text-4xl">
              {onafhankelijk.vergelijking.kop}
            </h2>
            <p className="mt-2 max-w-2xl text-kpv-grijs/70">
              {onafhankelijk.vergelijking.toelichting}
            </p>
          </FadeIn>
          <FadeIn className="mt-8">
            <ComparisonTable
              caption="Vergelijking van GripOpAfval met inzamelaars, adviesbureaus en startups op vijf assen"
              columns={onafhankelijk.vergelijking.kolommen}
              rows={onafhankelijk.vergelijking.rijen.map((rij) => ({
                as: rij.as,
                scores: rij.scores as readonly ComparisonScore[],
              }))}
            />
          </FadeIn>
        </Container>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-kop" className="py-16 sm:py-20">
        <Container className="text-center">
          <FadeIn>
            <h2 id="cta-kop" className="text-3xl sm:text-4xl">
              {onafhankelijk.cta.kop}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-kpv-grijs/70">
              {onafhankelijk.cta.tekst}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={onafhankelijk.cta.primair.href}>
                  {onafhankelijk.cta.primair.label}
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={onafhankelijk.cta.secundair.href}>
                  {onafhankelijk.cta.secundair.label}
                </Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
