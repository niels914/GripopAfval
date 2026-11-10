import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { AdviesChat } from "@/components/chat/AdviesChat";
import { Button } from "@/components/ui/button";
import { Balk } from "@/components/huisstijl/Balk";
import { advies } from "@/content/advies";

export const metadata: Metadata = {
  title: advies.meta.title,
  description: advies.meta.description,
  openGraph: { title: advies.meta.title, description: advies.meta.description },
};

export default function AdviesPagina() {
  return (
    <>
      <section className="sectie">
        <Container className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-diepblauw">
            {advies.hero.kicker}
          </p>
          <Balk as="h1" kleur="inkt" className="mx-auto mt-2 text-3xl sm:text-4xl">
            {advies.hero.titel}
          </Balk>
          <p className="lead mx-auto mt-4">{advies.hero.subtitel}</p>
        </Container>
      </section>

      <section aria-label="Adviesgesprek" className="sectie">
        <Container className="max-w-3xl">
          <div className="h-[calc(100vh-16rem)] min-h-[28rem] sm:h-[38rem]">
            <AdviesChat />
          </div>
        </Container>
      </section>

      <section aria-labelledby="na-advies-kop" className="sectie">
        <Container className="max-w-3xl text-center">
          <h2 id="na-advies-kop" className="text-2xl sm:text-3xl">
            {advies.naAdvies.kop}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-tekst-2">{advies.naAdvies.tekst}</p>
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
