import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { artikel, artikelen } from "@/content/library/artikelen";
import { bron } from "@/content/library/bronnen";

export function generateStaticParams() {
  return artikelen.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = artikel(slug);
  if (!a) return {};
  return {
    title: a.titel,
    description: a.samenvatting,
    openGraph: { title: a.titel, description: a.samenvatting, type: "article" },
  };
}

export default async function ArtikelPagina({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = artikel(slug);
  if (!a) notFound();

  const bronLijst = a.bronIds
    .map((id) => bron(id))
    .filter((b): b is NonNullable<typeof b> => !!b);

  return (
    <article className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <Link
          href="/kennis"
          className="inline-flex items-center gap-1 text-sm font-medium text-kpv-blauw-tekst hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Alle kennis
        </Link>

        <header className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-kpv-blauw-tekst">
            {a.ondertitel}
          </p>
          <h1 className="mt-2 text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {a.titel}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-sm text-kpv-grijs/70">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {a.leestijdMinuten} min leestijd ·{" "}
            {new Date(a.datum).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </header>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-kpv-grijs/90">
          {a.body.map((blok, i) =>
            blok.startsWith("## ") ? (
              <h2 key={i} className="pt-4 text-2xl">
                {blok.slice(3)}
              </h2>
            ) : (
              <p key={i}>{blok}</p>
            )
          )}
        </div>

        <div className="mt-10 rounded-card border-2 border-kpv-paars bg-white p-6 text-center sm:p-8">
          <h2 className="text-xl sm:text-2xl">
            Benieuwd wat dit voor uw organisatie betekent?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-kpv-grijs/70">
            De gratis afvalscan rekent uw besparingspotentieel in 2 minuten door
            — inclusief het 2028-scenario.
          </p>
          <Button asChild size="lg" className="mt-5">
            <Link href="/afvalscan">Doe de gratis afvalscan</Link>
          </Button>
        </div>

        {bronLijst.length > 0 && (
          <footer className="mt-10 border-t border-kpv-border pt-6">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-kpv-grijs/70">
              Bronnen
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {bronLijst.map((b) => (
                <li key={b.id} className="text-kpv-grijs/80">
                  {b.url ? (
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-kpv-blauw-tekst underline-offset-2 hover:underline"
                    >
                      {b.titel}
                    </a>
                  ) : (
                    b.titel
                  )}{" "}
                  — {b.uitgever} ({b.jaar})
                  {b.status === "te-valideren" && (
                    <span className="ml-2 rounded-full bg-kpv-offwhite px-2 py-0.5 text-xs text-kpv-grijs/70">
                      te valideren
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </footer>
        )}
      </Container>
    </article>
  );
}
