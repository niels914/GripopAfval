import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
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
      <section className="bg-white py-16 sm:py-20">
        <Container className="text-center">
          <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl">{over.hero.titel}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-kpv-grijs/70">
            {over.hero.subtitel}
          </p>
        </Container>
      </section>

      <TrustBar />

      <section aria-label="Over GripOpAfval" className="py-16 sm:py-20">
        <Container className="max-w-3xl space-y-10">
          {over.blokken.map((blok) => (
            <FadeIn key={blok.titel}>
              <div>
                <h2 className="text-2xl sm:text-3xl">{blok.titel}</h2>
                <p className="mt-3 leading-relaxed text-kpv-grijs/80">{blok.tekst}</p>
              </div>
            </FadeIn>
          ))}
        </Container>
      </section>

      <section aria-labelledby="cta-kop" className="bg-white py-16 sm:py-20">
        <Container className="text-center">
          <FadeIn>
            <h2 id="cta-kop" className="text-3xl sm:text-4xl">
              {over.cta.kop}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-kpv-grijs/70">{over.cta.tekst}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={over.cta.primair.href}>{over.cta.primair.label}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={over.cta.secundair.href}>{over.cta.secundair.label}</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
