import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";
import { Container } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Balk } from "@/components/huisstijl/Balk";
import { ChevList } from "@/components/huisstijl/ChevList";
import { KpiGrid } from "@/components/huisstijl/Kpi";
import { StatusPil } from "@/components/huisstijl/StatusPil";
import { PaginaAfsluiting } from "@/components/huisstijl/PaginaAfsluiting";
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
      <section className="sectie">
        <Container className="text-center">
          <Balk as="h1" kleur="inkt" className="mx-auto text-3xl sm:text-4xl">
            {kennis.hero.titel}
          </Balk>
          <p className="lead mx-auto mt-4">{kennis.hero.subtitel}</p>
        </Container>
      </section>

      {/* Whitepaper leadmagnet */}
      <section aria-labelledby="whitepaper-kop" className="sectie">
        <Container>
          <div className="blok-violet blok grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-inkt">
                Gratis whitepaper
              </p>
              <h2 id="whitepaper-kop" className="mt-2 text-2xl sm:text-3xl">
                {kennis.whitepaper.kop}
              </h2>
              <p className="mt-3 text-tekst">{kennis.whitepaper.tekst}</p>
              <ChevList className="mt-4 text-sm">
                {kennis.whitepaper.punten.map((punt) => (
                  <li key={punt}>{punt}</li>
                ))}
              </ChevList>
            </div>
            <div className="lg:pt-10">
              <LeadForm variant="whitepaper" submitLabel={kennis.whitepaper.knop} />
            </div>
          </div>
        </Container>
      </section>

      {/* Artikelen uit de library */}
      <section aria-labelledby="artikelen-kop" className="sectie">
        <Container>
          <Balk as="h2" id="artikelen-kop">
            Artikelen
          </Balk>
          <p className="lead mt-4">Onderbouwd met openbaar onderzoek — elke claim heeft een bron.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artikelen.map((artikel) => (
              <Link key={artikel.slug} href={`/kennis/${artikel.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col">
                  <CardHeader>
                    <p className="flex items-center gap-1.5 text-xs text-tekst-2">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {artikel.leestijdMinuten} min leestijd
                    </p>
                    <CardTitle className="mt-1 text-lg leading-snug group-hover:text-purper">
                      {artikel.titel}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="flex-1 text-sm leading-relaxed text-tekst-2">{artikel.samenvatting}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-diepblauw">
                      Lees artikel
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Kerncijfers */}
      <section aria-labelledby="cijfers-kop" className="sectie">
        <Container>
          <div className="bg-inkt px-6 py-10 sm:px-10">
            <h2 id="cijfers-kop" className="text-center text-3xl text-white sm:text-4xl">
              De cijfers die u moet kennen
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-white/70">
              Uit openbaar onderzoek van o.a. Rijkswaterstaat, CBS en de Rijksoverheid.
            </p>
            <KpiGrid className="mt-8 !grid-cols-2 lg:!grid-cols-4">
              {kerncijfers.slice(0, 8).map((cijfer) => (
                <div key={cijfer.label} className="bg-white/10 p-5 text-center">
                  <b className="block text-3xl font-bold text-white">{cijfer.waarde}</b>
                  <span className="mt-2 block text-sm text-white/80">{cijfer.label}</span>
                </div>
              ))}
            </KpiGrid>
          </div>
        </Container>
      </section>

      {/* Praktijkvoorbeelden */}
      <section aria-labelledby="cases-kop" className="sectie">
        <Container>
          <Balk as="h2" kleur="purper" id="cases-kop">
            Zo doen de koplopers het
          </Balk>
          <p className="lead mt-4">
            Van het drukste station tot de afvalvrije school: praktijkvoorbeelden met de lessen die u morgen
            kunt toepassen.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {praktijkvoorbeelden.map((voorbeeld) => (
              <Card key={voorbeeld.id} className="h-full">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="status-pil">{voorbeeld.organisatie}</span>
                    <span className="status-pil">{voorbeeld.sector}</span>
                  </div>
                  <CardTitle className="mt-2 text-lg">{voorbeeld.titel}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-tekst-2">{voorbeeld.samenvatting}</p>
                  <ChevList className="mt-4 text-sm">
                    {voorbeeld.lessen.map((les) => (
                      <li key={les}>{les}</li>
                    ))}
                  </ChevList>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-kop" className="sectie">
        <Container className="max-w-3xl">
          <Balk as="h2" id="faq-kop">
            Veelgestelde vragen
          </Balk>
          <div className="mt-8 space-y-3">
            {faq.map((item) => (
              <details key={item.vraag} className="group blok">
                <summary className="cursor-pointer font-semibold marker:text-purper">{item.vraag}</summary>
                <p className="mt-3 text-sm leading-relaxed text-tekst-2">{item.antwoord}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Bronnenbank */}
      <section aria-labelledby="bronnen-kop" className="sectie">
        <Container>
          <Balk as="h2" id="bronnen-kop">
            Bronnenbank
          </Balk>
          <p className="lead mt-4">
            Het onderzoek achter onze cijfers. Wij vatten samen in eigen woorden — de originelen vindt u hier.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {bronnen.map((b) => (
              <div key={b.id} className="blok h-full">
                <p className="font-semibold leading-snug">
                  {b.url ? (
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1.5 hover:text-purper"
                    >
                      {b.titel}
                      <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  ) : (
                    b.titel
                  )}
                </p>
                <p className="mt-1 flex items-center gap-2 text-xs text-tekst-2">
                  {b.uitgever} · {b.jaar}
                  {b.status === "te-valideren" && <StatusPil>te valideren</StatusPil>}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {b.kernbevindingen.map((bevinding) => (
                    <li key={bevinding} className="text-sm leading-relaxed text-tekst-2">
                      · {bevinding}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <PaginaAfsluiting
          meerWetenKop="Liever persoonlijk advies?"
          meerWetenTekst="Niels bespreekt graag hoe dit onderzoek vertaalt naar uw organisatie."
        />
      </Container>
    </>
  );
}
