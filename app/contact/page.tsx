import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact – plan een verkennend gesprek",
  description:
    "Neem contact op met GripOpAfval voor een verkennend gesprek over afvalscheiding in uw organisatie. We reageren binnen 2 werkdagen.",
};

export default function ContactPagina() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl sm:text-5xl">Contact</h1>
            <p className="mt-4 max-w-md text-lg text-kpv-grijs/70">
              Vertel ons kort over uw situatie — we reageren binnen 2 werkdagen
              met een eerlijke inschatting of wij u kunnen helpen.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-kpv-paars" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-kpv-paars">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-kpv-paars" aria-hidden="true" />
                <a
                  href={`tel:${site.telefoon.replace(/[^+\d]/g, "")}`}
                  className="hover:text-kpv-paars"
                >
                  {site.telefoon}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-kpv-paars" aria-hidden="true" />
                <span>KplusV · Arnhem & Amsterdam</span>
              </li>
            </ul>
          </div>
          <div className="rounded-card border border-kpv-border bg-white p-6 shadow-sm sm:p-8">
            <LeadForm variant="contact" />
          </div>
        </div>
      </Container>
    </section>
  );
}
