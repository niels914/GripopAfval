import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <section className="bg-white py-16 sm:py-20">
        <Container className="text-center">
          <h1 className="text-4xl sm:text-5xl">{cases.hero.titel}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-kpv-grijs/70">
            {cases.hero.subtitel}
          </p>
        </Container>
      </section>

      <section aria-label="Overzicht van cases" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {cases.items.map((item, i) => (
              <FadeIn key={item.titel} delay={i * 0.05}>
                <Card className={cn("h-full", item.echte && "border-2 border-kpv-paars")}>
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-kpv-blauw/10 px-3 py-0.5 text-xs font-semibold text-kpv-blauw-tekst">
                        {item.sector}
                      </span>
                      <span className="rounded-full bg-kpv-offwhite px-3 py-0.5 text-xs font-medium text-kpv-grijs/70">
                        {item.status}
                      </span>
                      {!item.echte && (
                        <span className="rounded-full bg-kpv-paars-licht/30 px-3 py-0.5 text-xs font-medium text-kpv-paars-donker">
                          Placeholder
                        </span>
                      )}
                    </div>
                    <CardTitle className="mt-2">{item.titel}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-kpv-grijs/80">
                      {item.samenvatting}
                    </p>
                    <p className="mt-4 font-heading text-sm font-semibold text-kpv-paars">
                      {item.resultaat}
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
