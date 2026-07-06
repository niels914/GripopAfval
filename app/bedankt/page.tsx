import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Linkedin } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Bedankt – we nemen contact op",
  description: "Bedankt voor uw aanvraag. We nemen binnen 2 werkdagen contact op.",
  robots: { index: false },
};

export default function BedanktPagina() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-xl text-center">
        <CheckCircle2
          className="mx-auto h-16 w-16 text-kpv-paars"
          aria-hidden="true"
        />
        <h1 className="mt-6 text-4xl sm:text-5xl">Bedankt!</h1>
        <p className="mt-4 text-lg text-kpv-grijs/70">
          Uw aanvraag is ontvangen. <strong>We nemen binnen 2 werkdagen contact
          op</strong> om de volgende stap door te spreken.
        </p>
        <p className="mt-2 text-kpv-grijs/70">
          Alvast kennismaken? Connect met Niels Ahsmann op LinkedIn.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <a href={site.linkedinNiels} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              Niels Ahsmann op LinkedIn
            </a>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/">Terug naar home</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
