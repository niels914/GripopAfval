import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { AdviesChat } from "@/components/chat/AdviesChat";
import { Button } from "@/components/ui/button";
import { advies } from "@/content/advies";

export const metadata: Metadata = {
  title: advies.meta.title,
  description: advies.meta.description,
  openGraph: { title: advies.meta.title, description: advies.meta.description },
};

export default function AdviesPagina() {
  return (
    <>
      <section className="bg-white py-12 sm:py-16">
        <Container className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-kpv-blauw-tekst">
            {advies.hero.kicker}
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl">{advies.hero.titel}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-kpv-grijs/70">
            {advies.hero.subtitel}
          </p>
        </Container>
      </section>

      <section aria-label="Adviesgesprek" className="pb-16 sm:pb-20">
        <Container className="max-w-3xl">
          <FadeIn>
            <div className="h-[calc(100vh-16rem)] min-h-[28rem] sm:h-[38rem]">
              <AdviesChat />
            </div>
          </FadeIn>
        </Container>
      </section>

      <section aria-labelledby="na-advies-kop" className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h2 id="na-advies-kop" className="text-2xl sm:text-3xl">
            {advies.naAdvies.kop}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-kpv-grijs/70">
            {advies.naAdvies.tekst}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/afvalscan">{advies.naAdvies.scanKnop}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">{advies.naAdvies.contactKnop}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
