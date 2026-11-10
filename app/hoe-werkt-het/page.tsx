import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Balk } from "@/components/huisstijl/Balk";
import { Knop } from "@/components/huisstijl/Knop";
import { PaginaAfsluiting } from "@/components/huisstijl/PaginaAfsluiting";
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
      <section className="sectie">
        <Container className="text-center">
          <Balk as="h1" kleur="inkt" className="mx-auto text-3xl sm:text-4xl">
            {hoeWerktHet.hero.titel}
          </Balk>
          <p className="lead mx-auto mt-4">{hoeWerktHet.hero.subtitel}</p>
        </Container>
      </section>

      <section aria-label="De drie lagen" className="sectie">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {hoeWerktHet.lagen.map((laag, i) => (
              <ProductLayerCard key={laag.tier} {...laag} highlight={i === 1} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-kop" className="sectie">
        <Container className="max-w-3xl">
          <Balk as="h2" id="faq-kop">
            Veelgestelde vragen
          </Balk>
          <div className="mt-8 space-y-4">
            {hoeWerktHet.faq.map((item) => (
              <details key={item.vraag} className="group blok">
                <summary className="cursor-pointer font-semibold marker:text-purper">
                  {item.vraag}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tekst-2">{item.antwoord}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Knop href="/afvalscan">Begin met de gratis online scan</Knop>
          </div>
        </Container>
      </section>

      <Container>
        <PaginaAfsluiting
          meerWetenKop="Vragen over de aanpak?"
          meerWetenTekst="Niels denkt graag mee over welke laag bij uw situatie past."
        />
      </Container>
    </>
  );
}
