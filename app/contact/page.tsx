import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";
import { Balk } from "@/components/huisstijl/Balk";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact – plan een verkennend gesprek",
  description:
    "Neem contact op met GripOpAfval voor een verkennend gesprek over afvalscheiding in uw organisatie. We reageren binnen 2 werkdagen.",
};

export default function ContactPagina() {
  return (
    <section className="sectie">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Balk as="h1" kleur="inkt">
              Contact
            </Balk>
            <p className="mt-4 max-w-md text-lg text-tekst-2">
              Vertel ons kort over uw situatie — we reageren binnen 2 werkdagen
              met een eerlijke inschatting of wij u kunnen helpen.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purper" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-purper">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-purper" aria-hidden="true" />
                <a
                  href={`tel:${site.telefoon.replace(/[^+\d]/g, "")}`}
                  className="hover:text-purper"
                >
                  {site.telefoon}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-purper" aria-hidden="true" />
                <span>KplusV · Arnhem & Amsterdam</span>
              </li>
            </ul>
          </div>
          <div className="blok">
            <LeadForm variant="contact" />
          </div>
        </div>
      </Container>
    </section>
  );
}
