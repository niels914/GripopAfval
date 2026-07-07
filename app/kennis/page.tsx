import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, ExternalLink } from "lucide-react";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { LeadForm } from "@/components/LeadForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { kennis } from "@/content/kennis";
import { artikelen } from "@/content/library/artikelen";
import { praktijkvoorbeelden } from "@/content/library/praktijkvoorbeelden";
import { kerncijfers } from "@/content/library/statistieken";
import { bronnen } from "@/content/library/bronnen";
import { faq } from "@/content/library/faq";

export const metadata: Metadata = {
  title: kennis.meta.title,
  description: kennis.meta.description,
  openGraph: { title: kennis.meta.title, description: kennis.meta.description },
};

export default function KennisPagina() {
  return (
    <>
      <section className="bg-white py-16 sm:py-20">
        <Container className="text-center">
          <h1 className="text-4xl sm:text-5xl">{kennis.hero.titel}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-kpv-grijs/70">
            {kennis.hero.subtitel}
          </p>
        </Container>
      </section>

      {/* Whitepaper leadmagnet */}
      <section aria-labelledby="whitepaper-kop" className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <div className="grid gap-8 rounded-card border-2 border-kpv-paars bg-white p-8 shadow-sm sm:p-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-kpv-blauw-tekst">
                  Gratis whitepaper
                </p>
                <h2 id="whitepaper-kop" className="mt-2 text-2xl sm:text-3xl">
                  {kennis.whitepaper.kop}
                </h2>
                <p className="mt-3 text-kpv-grijs/70">{kennis.whitepaper.tekst}</p>
                <ul className="mt-4 space-y-2">
                  {kennis.whitepaper.punten.map((punt) => (
                    <li key={punt} className="flex items-start gap-2 text-sm">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-kpv-paars"
                        aria-hidden="true"
                      />
                      {punt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:pt-10">
                <LeadForm variant="whitepaper" submitLabel={kennis.whitepaper.knop} />
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Artikelen uit de library */}
      <section aria-labelledby="artikelen-kop" className="bg-white py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="artikelen-kop" className="text-3xl sm:text-4xl">
              Artikelen
            </h2>
            <p className="mt-2 max-w-2xl text-kpv-grijs/70">
              Onderbouwd met openbaar onderzoek — elke claim heeft een bron.
            </p>
          </FadeIn>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artikelen.map((artikel, i) => (
              <FadeIn key={artikel.slug} delay={i * 0.05}>
                <Link href={`/kennis/${artikel.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                    <CardHeader>
                      <p className="flex items-center gap-1.5 text-xs text-kpv-grijs/70">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {artikel.leestijdMinuten} min leestijd
                      </p>
                      <CardTitle className="mt-1 text-lg leading-snug group-hover:text-kpv-paars">
                        {artikel.titel}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                      <p className="flex-1 text-sm leading-relaxed text-kpv-grijs/70">
                        {artikel.samenvatting}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-kpv-blauw-tekst">
                        Lees artikel
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Kerncijfers */}
      <section aria-labelledby="cijfers-kop" className="bg-kpv-paars-donker py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="cijfers-kop" className="text-center text-3xl text-white sm:text-4xl">
              De cijfers die u moet kennen
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-white/70">
              Uit openbaar onderzoek van o.a. Rijkswaterstaat, CBS en de Rijksoverheid.
            </p>
          </FadeIn>
          <dl className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {kerncijfers.slice(0, 8).map((cijfer, i) => (
              <FadeIn key={cijfer.label} delay={i * 0.04}>
                <div className="h-full rounded-card bg-white/10 p-5 text-center">
                  <dd className="font-heading text-3xl font-bold text-white">
                    {cijfer.waarde}
                  </dd>
                  <dt className="mt-2 text-sm text-white/80">{cijfer.label}</dt>
                </div>
              </FadeIn>
            ))}
          </dl>
        </Container>
      </section>

      {/* Praktijkvoorbeelden */}
      <section aria-labelledby="cases-kop" className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="cases-kop" className="text-3xl sm:text-4xl">
              Zo doen de koplopers het
            </h2>
            <p className="mt-2 max-w-2xl text-kpv-grijs/70">
              Van het drukste station tot de afvalvrije school: praktijkvoorbeelden
              met de lessen die u morgen kunt toepassen.
            </p>
          </FadeIn>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {praktijkvoorbeelden.map((voorbeeld, i) => (
              <FadeIn key={voorbeeld.id} delay={i * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-kpv-paars/10 px-3 py-0.5 text-xs font-semibold text-kpv-paars">
                        {voorbeeld.organisatie}
                      </span>
                      <span className="rounded-full bg-kpv-offwhite px-3 py-0.5 text-xs font-medium text-kpv-grijs/70">
                        {voorbeeld.sector}
                      </span>
                    </div>
                    <CardTitle className="mt-2 text-lg">{voorbeeld.titel}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-kpv-grijs/80">
                      {voorbeeld.samenvatting}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {voorbeeld.lessen.map((les) => (
                        <li key={les} className="flex items-start gap-2 text-sm">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-kpv-paars"
                            aria-hidden="true"
                          />
                          {les}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-kop" className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl">
          <FadeIn>
            <h2 id="faq-kop" className="text-3xl sm:text-4xl">
              Veelgestelde vragen
            </h2>
          </FadeIn>
          <div className="mt-8 space-y-3">
            {faq.map((item) => (
              <FadeIn key={item.vraag}>
                <details className="group rounded-card border border-kpv-border bg-kpv-offwhite p-5 open:bg-white open:shadow-sm">
                  <summary className="cursor-pointer font-heading font-semibold marker:text-kpv-paars">
                    {item.vraag}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-kpv-grijs/80">
                    {item.antwoord}
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Bronnenbank */}
      <section aria-labelledby="bronnen-kop" className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="bronnen-kop" className="text-3xl sm:text-4xl">
              Bronnenbank
            </h2>
            <p className="mt-2 max-w-2xl text-kpv-grijs/70">
              Het onderzoek achter onze cijfers. Wij vatten samen in eigen woorden
              — de originelen vindt u hier.
            </p>
          </FadeIn>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {bronnen.map((b) => (
              <FadeIn key={b.id}>
                <div className="h-full rounded-card border border-kpv-border bg-white p-5">
                  <p className="font-heading font-semibold leading-snug">
                    {b.url ? (
                      <a
                        href={b.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-1.5 hover:text-kpv-paars"
                      >
                        {b.titel}
                        <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    ) : (
                      b.titel
                    )}
                  </p>
                  <p className="mt-1 text-xs text-kpv-grijs/70">
                    {b.uitgever} · {b.jaar}
                    {b.status === "te-valideren" && (
                      <span className="ml-2 rounded-full bg-kpv-offwhite px-2 py-0.5 text-kpv-grijs/70">
                        te valideren
                      </span>
                    )}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {b.kernbevindingen.map((bevinding) => (
                      <li key={bevinding} className="text-sm leading-relaxed text-kpv-grijs/80">
                        · {bevinding}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
