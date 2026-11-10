import type { Metadata } from "next";
import {
  BedDouble,
  Building2,
  Eye,
  GraduationCap,
  Landmark,
  PiggyBank,
  Quote,
  ShoppingBag,
  Theater,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ProblemStat } from "@/components/ProblemStat";
import { ProductLayerCard } from "@/components/ProductLayerCard";
import { SegmentTile } from "@/components/SegmentTile";
import { LeadForm } from "@/components/LeadForm";
import { Container } from "@/components/Container";
import { Balk } from "@/components/huisstijl/Balk";
import { Blok } from "@/components/huisstijl/Blok";
import { Knop } from "@/components/huisstijl/Knop";
import { PaginaAfsluiting } from "@/components/huisstijl/PaginaAfsluiting";
import { homepage } from "@/content/homepage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.naam} – Wij verdienen pas als u bespaart`,
  description: site.beschrijving,
};

const probleemIconen: LucideIcon[] = [PiggyBank, Eye, TrendingUp];
const segmentIconen: Record<string, LucideIcon> = {
  "graduation-cap": GraduationCap,
  "bed-double": BedDouble,
  "shopping-bag": ShoppingBag,
  landmark: Landmark,
  theater: Theater,
  "building-2": Building2,
};

export default function Homepage() {
  return (
    <>
      <Hero {...homepage.hero} />
      <TrustBar />

      {/* Probleemblok */}
      <section aria-labelledby="probleem-kop" className="sectie">
        <Container>
          <h2 id="probleem-kop" className="sr-only">
            Waarom nu grip op afval?
          </h2>
          <div className="kpis">
            {homepage.problemen.map((probleem, i) => (
              <ProblemStat
                key={probleem.number}
                number={probleem.number}
                label={probleem.label}
                source={probleem.source}
                icon={probleemIconen[i]}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Verdienmodel */}
      <section aria-labelledby="verdienmodel-kop" className="sectie">
        <Container>
          <div className="bg-inkt px-6 py-12 text-center sm:px-10">
            <p id="verdienmodel-kop" className="text-sm font-semibold uppercase tracking-widest text-white/70">
              {homepage.verdienmodel.kop}
            </p>
            <blockquote className="mx-auto mt-4 max-w-3xl">
              <p className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                “{homepage.verdienmodel.uitspraak}”
              </p>
            </blockquote>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{homepage.verdienmodel.toelichting}</p>
            <div className="mt-8 flex justify-center">
              <Knop href={homepage.verdienmodel.linkHref}>{homepage.verdienmodel.linkLabel}</Knop>
            </div>
          </div>
        </Container>
      </section>

      {/* Drie-lagen product */}
      <section aria-labelledby="lagen-kop" className="sectie">
        <Container>
          <Balk as="h2" id="lagen-kop">
            {homepage.productLagen.kop}
          </Balk>
          <p className="lead mt-4">{homepage.productLagen.subtitel}</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {homepage.productLagen.lagen.map((laag, i) => (
              <ProductLayerCard key={laag.tier} {...laag} highlight={i === 1} />
            ))}
          </div>
          <p className="mt-6">
            <a href="/hoe-werkt-het" className="font-semibold text-diepblauw hover:underline">
              Bekijk de volledige aanpak →
            </a>
          </p>
        </Container>
      </section>

      {/* Segmenten */}
      <section aria-labelledby="segmenten-kop" className="sectie">
        <Container>
          <Balk as="h2" kleur="purper" id="segmenten-kop">
            {homepage.segmenten.kop}
          </Balk>
          <p className="lead mt-4">{homepage.segmenten.subtitel}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homepage.segmenten.tegels.map((tegel) => (
              <SegmentTile
                key={tegel.naam}
                name={tegel.naam}
                description={tegel.beschrijving}
                href={tegel.href}
                icon={segmentIconen[tegel.icon] ?? Building2}
                featured={"featured" in tegel && !!tegel.featured}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Sociaal bewijs */}
      <section aria-labelledby="quotes-kop" className="sectie">
        <Container>
          <Balk as="h2" id="quotes-kop">
            {homepage.quotes.kop}
          </Balk>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {homepage.quotes.items.map((item) => (
              <figure key={item.naam} className="blok flex h-full flex-col">
                <Quote className="h-6 w-6 text-violet" aria-hidden="true" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-tekst">{item.quote}</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-bold">{item.naam}</span>
                  <span className="block text-tekst-2">{item.functie}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Whitepaper leadmagnet */}
      <section aria-labelledby="whitepaper-kop" className="sectie">
        <Container>
          <Blok className="mx-auto max-w-2xl">
            <h2 id="whitepaper-kop" className="text-2xl">
              {homepage.whitepaper.kop}
            </h2>
            <p className="mt-3 text-tekst-2">{homepage.whitepaper.tekst}</p>
            <LeadForm variant="whitepaper" submitLabel={homepage.whitepaper.knop} className="mt-6" />
          </Blok>
        </Container>
      </section>

      <Container>
        <PaginaAfsluiting
          meerWetenKop="Weten wat dit voor uw organisatie betekent?"
          meerWetenTekst="Reken uw besparingspotentieel door met de gratis afvalscan, of plan direct een gesprek."
          ctaLabel="Doe de gratis afvalscan"
          ctaHref="/afvalscan"
        />
      </Container>
    </>
  );
}
