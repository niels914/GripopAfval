import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WasteStreamsIllustration } from "@/components/illustrations";
import { Container } from "@/components/Container";

export function Hero({
  h1,
  subheader,
  ctaPrimair,
  ctaSecundair,
}: {
  h1: string;
  subheader: string;
  ctaPrimair: { label: string; href: string };
  ctaSecundair?: { label: string; href: string };
}) {
  return (
    <section className="bg-white">
      <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        <div>
          <h1 className="text-5xl leading-[1.05] font-bold sm:text-6xl lg:text-7xl">
            {h1}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-kpv-grijs/80">
            {subheader}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={ctaPrimair.href}>{ctaPrimair.label}</Link>
            </Button>
            {ctaSecundair && (
              <Button asChild variant="secondary" size="lg">
                <Link href={ctaSecundair.href}>{ctaSecundair.label}</Link>
              </Button>
            )}
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <WasteStreamsIllustration className="h-auto w-full" />
        </div>
      </Container>
    </section>
  );
}
