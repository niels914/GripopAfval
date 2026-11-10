import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Balk } from "@/components/huisstijl/Balk";
import { KpiGrid } from "@/components/huisstijl/Kpi";
import { PaginaAfsluiting } from "@/components/huisstijl/PaginaAfsluiting";
import { SavingsIllustration } from "@/components/illustrations";
import { mbo } from "@/content/mbo";

export const metadata: Metadata = {
  title: mbo.meta.title,
  description: mbo.meta.description,
  openGraph: { title: mbo.meta.title, description: mbo.meta.description },
};

export default function VoorMboPagina() {
  return (
    <>
      {/* Hero */}
      <section className="sectie">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-diepblauw">
              Primaire doelgroep
            </p>
            <Balk as="h1" kleur="inkt" className="mt-3 text-3xl sm:text-4xl">
              {mbo.hero.titel}
            </Balk>
            <p className="lead mt-5">{mbo.hero.subtitel}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={mbo.cta.primair.href}>{mbo.cta.primair.label}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={mbo.cta.secundair.href}>{mbo.cta.secundair.label}</Link>
              </Button>
            </div>
          </div>
          <SavingsIllustration className="mx-auto h-auto w-full max-w-md" />
        </Container>
      </section>

      {/* Waarom MBO */}
      <section aria-labelledby="waarom-kop" className="sectie">
        <Container>
          <Balk as="h2" id="waarom-kop">
            {mbo.waaromMbo.kop}
          </Balk>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {mbo.waaromMbo.punten.map((punt) => (
              <div key={punt.titel} className="blok flex gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-purper" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold">{punt.titel}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-tekst-2">{punt.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Kengetallen */}
      <section aria-labelledby="kengetallen-kop" className="sectie">
        <Container>
          <div className="bg-inkt px-6 py-10 sm:px-10">
            <h2 id="kengetallen-kop" className="text-center text-3xl text-white sm:text-4xl">
              {mbo.kengetallen.kop}
            </h2>
            <p className="mt-2 text-center text-white/70">{mbo.kengetallen.toelichting}</p>
            <KpiGrid className="mt-8 !grid-cols-2 lg:!grid-cols-4">
              {mbo.kengetallen.items.map((item) => (
                <div key={item.label} className="bg-white/10 p-6 text-center">
                  <b className="block text-4xl font-bold text-white">{item.waarde}</b>
                  <span className="mt-2 block text-sm text-white/80">{item.label}</span>
                </div>
              ))}
            </KpiGrid>
          </div>
        </Container>
      </section>

      {/* Cases */}
      <section aria-labelledby="cases-kop" className="sectie">
        <Container>
          <Balk as="h2" kleur="purper" id="cases-kop">
            {mbo.cases.kop}
          </Balk>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {mbo.cases.items.map((item) => (
              <Card key={item.titel}>
                <CardHeader>
                  <CardTitle>{item.titel}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mt-2 text-sm leading-relaxed text-tekst-2">{item.tekst}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Button asChild variant="link">
              <Link href="/cases">Alle klantverhalen →</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-kop" className="sectie">
        <Container className="text-center">
          <h2 id="cta-kop" className="text-3xl sm:text-4xl">
            {mbo.cta.kop}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-tekst-2">{mbo.cta.tekst}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href={mbo.cta.primair.href}>{mbo.cta.primair.label}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={mbo.cta.secundair.href}>{mbo.cta.secundair.label}</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Container>
        <PaginaAfsluiting
          meerWetenKop="Vragen vanuit het mbo?"
          meerWetenTekst="Niels denkt graag mee over de aanpak die bij uw instelling past."
        />
      </Container>
    </>
  );
}
