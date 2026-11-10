import { Knop } from "@/components/huisstijl/Knop";
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
    <section>
      <Container className="grid items-center gap-10 py-10 lg:grid-cols-2">
        <div>
          <h1 className="balk balk-inkt text-4xl sm:text-5xl">{h1}</h1>
          <p className="lead mt-6 max-w-xl">{subheader}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Knop href={ctaPrimair.href}>{ctaPrimair.label}</Knop>
            {ctaSecundair && (
              <Knop href={ctaSecundair.href} kleur="diepblauw">
                {ctaSecundair.label}
              </Knop>
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
