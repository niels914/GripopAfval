import Link from "next/link";
import { SearchX } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Balk } from "@/components/huisstijl/Balk";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-xl text-center">
        <SearchX className="mx-auto h-16 w-16 text-violet" aria-hidden="true" />
        <p className="mt-6 font-sans text-sm font-semibold uppercase tracking-widest text-diepblauw">
          404 — pagina niet gevonden
        </p>
        <Balk as="h1" kleur="inkt" className="mx-auto mt-2 text-2xl sm:text-3xl">
          Deze pagina is gescheiden ingezameld
        </Balk>
        <p className="mt-4 text-lg text-tekst-2">
          De pagina die u zoekt bestaat niet (meer). Geen zorgen — het
          besparingspotentieel van uw organisatie vindt u hier wél.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/afvalscan">Doe de gratis afvalscan</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/">Naar de homepage</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
