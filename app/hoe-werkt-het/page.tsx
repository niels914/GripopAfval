import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { ProductLayerCard } from "@/components/ProductLayerCard";
import { hoeWerktHet } from "@/content/hoeWerktHet";

export const metadata: Metadata = {
  title: hoeWerktHet.meta.title,
  description: hoeWerktHet.meta.description,
  openGraph: {
    title: hoeWerktHet.meta.title,
    description: hoeWerktHet.meta.description,
  },
};

export default function HoeWerktHetPagina() {
  return (
    <>
      <section className="bg-white py-16 sm:py-20">
        <Container className="text-center">
          <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl">
            {hoeWerktHet.hero.titel}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-kpv-grijs/70">
            {hoeWerktHet.hero.subtitel}
          </p>
        </Container>
      </section>

      <section aria-label="De drie lagen" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {hoeWerktHet.lagen.map((laag, i) => (
              <FadeIn key={laag.tier} delay={i * 0.1}>
                <ProductLayerCard {...laag} highlight={i === 1} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-kop" className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl">
          <FadeIn>
            <h2 id="faq-kop" className="text-3xl sm:text-4xl">
              Veelgestelde vragen
            </h2>
          </FadeIn>
          <div className="mt-8 space-y-4">
            {hoeWerktHet.faq.map((item) => (
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
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link href="/afvalscan">Begin met de gratis online scan</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
