import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { LeadForm } from "@/components/LeadForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { kennis } from "@/content/kennis";

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
                <p className="text-sm font-semibold uppercase tracking-widest text-kpv-blauw">
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

      {/* Artikelen */}
      <section aria-labelledby="artikelen-kop" className="bg-white py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="artikelen-kop" className="text-3xl sm:text-4xl">
              Artikelen
            </h2>
          </FadeIn>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {kennis.artikelen.map((artikel, i) => (
              <FadeIn key={artikel.titel} delay={i * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <span className="w-fit rounded-full bg-kpv-offwhite px-3 py-0.5 text-xs font-medium text-kpv-grijs/70">
                      {artikel.status}
                    </span>
                    <CardTitle className="mt-2 text-lg leading-snug">
                      {artikel.titel}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-kpv-grijs/70">
                      {artikel.samenvatting}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
