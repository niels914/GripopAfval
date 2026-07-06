import type { Metadata } from "next";
import Link from "next/link";
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
import { FadeIn } from "@/components/FadeIn";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
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
      <section aria-labelledby="probleem-kop" className="py-16 sm:py-20">
        <Container>
          <h2 id="probleem-kop" className="sr-only">
            Waarom nu grip op afval?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {homepage.problemen.map((probleem, i) => (
              <FadeIn key={probleem.number} delay={i * 0.1}>
                <ProblemStat
                  number={probleem.number}
                  label={probleem.label}
                  source={probleem.source}
                  icon={probleemIconen[i]}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Verdienmodel */}
      <section aria-labelledby="verdienmodel-kop" className="bg-kpv-paars py-16 sm:py-20">
        <Container className="text-center">
          <FadeIn>
            <p
              id="verdienmodel-kop"
              className="text-sm font-semibold uppercase tracking-widest text-white/70"
            >
              {homepage.verdienmodel.kop}
            </p>
            <blockquote className="mx-auto mt-4 max-w-3xl">
              <p className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
                “{homepage.verdienmodel.uitspraak}”
              </p>
            </blockquote>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
              {homepage.verdienmodel.toelichting}
            </p>
            <Button
              asChild
              variant="secondary"
              className="mt-8 border-white text-white hover:bg-white hover:text-kpv-paars"
            >
              <Link href={homepage.verdienmodel.linkHref}>
                {homepage.verdienmodel.linkLabel}
              </Link>
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* Drie-lagen product */}
      <section aria-labelledby="lagen-kop" className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="lagen-kop" className="text-center text-3xl sm:text-4xl">
              {homepage.productLagen.kop}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-kpv-grijs/70">
              {homepage.productLagen.subtitel}
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {homepage.productLagen.lagen.map((laag, i) => (
              <FadeIn key={laag.tier} delay={i * 0.1}>
                <ProductLayerCard {...laag} highlight={i === 1} />
              </FadeIn>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="link">
              <Link href="/hoe-werkt-het">Bekijk de volledige aanpak →</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Segmenten */}
      <section aria-labelledby="segmenten-kop" className="bg-white py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="segmenten-kop" className="text-center text-3xl sm:text-4xl">
              {homepage.segmenten.kop}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-kpv-grijs/70">
              {homepage.segmenten.subtitel}
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homepage.segmenten.tegels.map((tegel, i) => (
              <FadeIn
                key={tegel.naam}
                delay={i * 0.05}
                className={"featured" in tegel && tegel.featured ? "sm:col-span-2" : undefined}
              >
                <SegmentTile
                  name={tegel.naam}
                  description={tegel.beschrijving}
                  href={tegel.href}
                  icon={segmentIconen[tegel.icon] ?? Building2}
                  featured={"featured" in tegel && !!tegel.featured}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Sociaal bewijs */}
      <section aria-labelledby="quotes-kop" className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 id="quotes-kop" className="text-center text-3xl sm:text-4xl">
              {homepage.quotes.kop}
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {homepage.quotes.items.map((item, i) => (
              <FadeIn key={item.naam} delay={i * 0.1}>
                <figure className="flex h-full flex-col rounded-card border border-kpv-border bg-white p-6 shadow-sm">
                  <Quote className="h-6 w-6 text-kpv-paars-licht" aria-hidden="true" />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-kpv-grijs/80">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold">{item.naam}</span>
                    <span className="block text-kpv-grijs/60">{item.functie}</span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Whitepaper leadmagnet */}
      <section aria-labelledby="whitepaper-kop" className="bg-white py-16 sm:py-20">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl rounded-card border-2 border-kpv-blauw/30 bg-kpv-offwhite p-8 sm:p-10">
              <h2 id="whitepaper-kop" className="text-2xl sm:text-3xl">
                {homepage.whitepaper.kop}
              </h2>
              <p className="mt-3 text-kpv-grijs/70">{homepage.whitepaper.tekst}</p>
              <LeadForm
                variant="whitepaper"
                submitLabel={homepage.whitepaper.knop}
                className="mt-6"
              />
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
