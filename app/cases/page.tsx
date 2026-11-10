import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Balk } from "@/components/huisstijl/Balk";
import { PaginaAfsluiting } from "@/components/huisstijl/PaginaAfsluiting";
import { cases } from "@/content/cases";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: cases.meta.title,
  description: cases.meta.description,
  openGraph: { title: cases.meta.title, description: cases.meta.description },
};

export default function CasesPagina() {
  return (
    <>
      <section className="sectie">
        <Container className="text-center">
          <Balk as="h1" kleur="inkt" className="mx-auto text-3xl sm:text-4xl">
            {cases.hero.titel}
          </Balk>
          <p className="lead mx-auto mt-4">{cases.hero.subtitel}</p>
        </Container>
      </section>

      <section aria-label="Overzicht van cases" className="sectie">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {cases.items.map((item) => (
              <Card key={item.titel} className={cn("h-full", item.echte && "blok-violet")}>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="status-pil">{item.sector}</span>
                    <span className="status-pil">{item.status}</span>
                    {!item.echte && <span className="status-pil">Placeholder</span>}
                  </div>
                  <CardTitle className="mt-2">{item.titel}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-tekst-2">{item.samenvatting}</p>
                  <p className="mt-4 text-sm font-semibold text-purper">{item.resultaat}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <PaginaAfsluiting
          meerWetenKop="Benieuwd wat dit voor u kan betekenen?"
          meerWetenTekst="Reken uw eigen situatie door of plan een kennismaking."
          ctaLabel="Doe de gratis afvalscan"
          ctaHref="/afvalscan"
        />
      </Container>
    </>
  );
}
