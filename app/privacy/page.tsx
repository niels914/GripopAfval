import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Hoe GripOpAfval (KplusV) omgaat met uw persoonsgegevens, conform de AVG.",
};

export default function PrivacyPagina() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="prose-kpv max-w-3xl">
        <h1 className="text-4xl sm:text-5xl">Privacyverklaring</h1>
        <p className="mt-2 text-sm text-kpv-grijs/70">
          Versie: concept (AVG-conform placeholder — juridisch te toetsen vóór livegang)
        </p>

        <div className="mt-8 space-y-8 leading-relaxed text-kpv-grijs/80">
          <section aria-labelledby="wie">
            <h2 id="wie" className="text-2xl">1. Wie zijn wij?</h2>
            <p className="mt-2">
              GripOpAfval is een propositie van KplusV B.V. (hierna: “wij”). Wij zijn
              verwerkingsverantwoordelijke voor de persoonsgegevens die via deze
              website worden verzameld. Contact: {site.email}.
            </p>
          </section>

          <section aria-labelledby="welke">
            <h2 id="welke" className="text-2xl">2. Welke gegevens verwerken wij?</h2>
            <p className="mt-2">
              Via onze formulieren (afvalscan, whitepaper, contact) verwerken wij:
              naam, zakelijk e-mailadres, organisatie, functie en — indien u de
              afvalscan invult — de door u opgegeven organisatiegegevens zoals
              afvalkosten, oppervlakte en sector, plus het berekende scanresultaat.
            </p>
          </section>

          <section aria-labelledby="doel">
            <h2 id="doel" className="text-2xl">3. Waarvoor gebruiken wij uw gegevens?</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Het toesturen van uw scanrapport of whitepaper;</li>
              <li>Opvolging van uw aanvraag (binnen 2 werkdagen);</li>
              <li>Het verbeteren van onze benchmark en dienstverlening (geaggregeerd, niet herleidbaar).</li>
            </ul>
            <p className="mt-2">
              Grondslag: uitvoering van uw verzoek (art. 6 lid 1 sub b AVG) en ons
              gerechtvaardigd belang bij opvolging van zakelijke leads (sub f).
            </p>
          </section>

          <section aria-labelledby="delen">
            <h2 id="delen" className="text-2xl">4. Delen wij uw gegevens?</h2>
            <p className="mt-2">
              Wij verkopen uw gegevens nooit en delen ze niet met inzamelaars of
              andere commerciële partijen. Voor opslag gebruiken wij Supabase
              (EU-hosting) en voor e-mail een verwerker waarmee wij een
              verwerkersovereenkomst hebben.
            </p>
          </section>

          <section aria-labelledby="bewaren">
            <h2 id="bewaren" className="text-2xl">5. Hoe lang bewaren wij uw gegevens?</h2>
            <p className="mt-2">
              Leadgegevens bewaren wij maximaal 24 maanden na het laatste contact,
              tenzij er een klantrelatie ontstaat.
            </p>
          </section>

          <section aria-labelledby="rechten">
            <h2 id="rechten" className="text-2xl">6. Uw rechten</h2>
            <p className="mt-2">
              U heeft recht op inzage, rectificatie, verwijdering, beperking,
              bezwaar en dataportabiliteit. Mail uw verzoek naar {site.email}. U
              kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.
            </p>
          </section>

          <section aria-labelledby="adviesbot">
            <h2 id="adviesbot" className="text-2xl">7. De adviesbot</h2>
            <p className="mt-2">
              De adviesbot op /advies gebruikt AI van Anthropic (Claude). Uw
              gespreksberichten worden voor het genereren van een antwoord
              doorgestuurd naar Anthropic; wij slaan de gesprekken zelf niet op
              en koppelen ze niet aan uw persoon. Deel in het gesprek daarom
              geen persoonsgegevens — de bot vraagt er ook niet naar. Het
              advies van de bot is indicatief; er kunnen geen rechten aan
              worden ontleend.
            </p>
          </section>

          <section aria-labelledby="cookies">
            <h2 id="cookies" className="text-2xl">8. Cookies</h2>
            <p className="mt-2">
              Deze website gebruikt geen tracking- of marketingcookies. Alleen
              functionele opslag die nodig is om de site te laten werken.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
