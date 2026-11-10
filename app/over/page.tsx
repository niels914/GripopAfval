import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Balk } from "@/components/huisstijl/Balk";
import { PaginaAfsluiting } from "@/components/huisstijl/PaginaAfsluiting";
import { TrustBar } from "@/components/TrustBar";
import { over } from "@/content/over";

export const metadata: Metadata = {
  title: over.meta.title,
  description: over.meta.description,
  openGraph: { title: over.meta.title, description: over.meta.description },
};

export default function OverPagina() {
  return (
    <>
      <section className="sectie">
        <Container className="text-center">
          <Balk as="h1" kleur="inkt" className="mx-auto text-3xl sm:text-4xl">
            {over.hero.titel}
          </Balk>
          <p className="lead mx-auto mt-4">{over.hero.subtitel}</p>
        </Container>
      </section>

      <TrustBar />

      <section aria-label="Over GripOpAfval" className="sectie">
        <Container className="max-w-3xl space-y-8">
          {over.blokken.map((blok) => (
            <div key={blok.titel}>
              <h2 className="text-2xl font-bold sm:text-3xl">{blok.titel}</h2>
              <p className="mt-3 leading-relaxed text-tekst-2">{blok.tekst}</p>
            </div>
          ))}
        </Container>
      </section>

      <section aria-labelledby="cta-kop" className="sectie">
        <Container className="text-center">
          <h2 id="cta-kop" className="text-3xl sm:text-4xl">
            {over.cta.kop}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-tekst-2">{over.cta.tekst}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href={over.cta.primair.href}>{over.cta.primair.label}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={over.cta.secundair.href}>{over.cta.secundair.label}</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Container>
        <PaginaAfsluiting
          meerWetenKop="In gesprek met Niels?"
          meerWetenTekst="Hij denkt graag mee over wat GripOpAfval voor uw organisatie kan betekenen."
        />
      </Container>
    </>
  );
}
