import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <section className="bg-white py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-kpv-blauw">
              Primaire doelgroep
            </p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
              {mbo.hero.titel}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-kpv-grijs/80">
              {mbo.hero.subtitel}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
      <section aria-labelledby="waarom-kop" className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="waarom-kop" className="text-3xl sm:text-4xl">
              {mbo.waaromMbo.kop}
            </h2>
          </FadeIn>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {mbo.waaromMbo.punten.map((punt, i) => (
              <FadeIn key={punt.titel} delay={i * 0.05}>
                <div className="flex gap-4 rounded-card border border-kpv-border bg-white p-6 shadow-sm">
                  <CheckCircle2
                    className="mt-1 h-6 w-6 shrink-0 text-kpv-paars"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg">{punt.titel}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-kpv-grijs/70">
                      {punt.tekst}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Kengetallen */}
      <section aria-labelledby="kengetallen-kop" className="bg-kpv-paars-donker py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="kengetallen-kop" className="text-center text-3xl text-white sm:text-4xl">
              {mbo.kengetallen.kop}
            </h2>
            <p className="mt-2 text-center text-white/70">
              {mbo.kengetallen.toelichting}
            </p>
          </FadeIn>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mbo.kengetallen.items.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.05}>
                <div className="rounded-card bg-white/10 p-6 text-center">
                  <dd className="font-heading text-4xl font-bold text-white">
                    {item.waarde}
                  </dd>
                  <dt className="mt-2 text-sm text-white/80">{item.label}</dt>
                </div>
              </FadeIn>
            ))}
          </dl>
        </Container>
      </section>

      {/* Cases */}
      <section aria-labelledby="cases-kop" className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="cases-kop" className="text-3xl sm:text-4xl">
              {mbo.cases.kop}
            </h2>
          </FadeIn>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {mbo.cases.items.map((item, i) => (
              <FadeIn key={item.titel} delay={i * 0.05}>
                <Card>
                  <CardHeader>
                    <CardTitle>{item.titel}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-kpv-grijs/70">
                      {item.tekst}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
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
      <section aria-labelledby="cta-kop" className="bg-white py-16 sm:py-20">
        <Container className="text-center">
          <FadeIn>
            <h2 id="cta-kop" className="text-3xl sm:text-4xl">
              {mbo.cta.kop}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-kpv-grijs/70">{mbo.cta.tekst}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={mbo.cta.primair.href}>{mbo.cta.primair.label}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={mbo.cta.secundair.href}>{mbo.cta.secundair.label}</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
