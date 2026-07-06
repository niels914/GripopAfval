import Link from "next/link";
import { Linkedin, Mail, Phone } from "lucide-react";
import { KpvLogo, GripOpAfvalLogo } from "@/components/KpvLogo";
import { footerKolommen, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-kpv-border bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <GripOpAfvalLogo className="h-7 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-kpv-grijs/70">
              {site.tagline}. Wij verdienen aan minder afval — niet aan meer.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm text-kpv-grijs/70">Een propositie van</span>
              <a href={site.kplusv.url} target="_blank" rel="noopener noreferrer">
                <KpvLogo className="h-6 w-auto" />
              </a>
            </div>
            <p className="mt-2 text-xs text-kpv-grijs/60">{site.kplusv.regel}</p>
          </div>

          {footerKolommen.map((kolom) => (
            <nav key={kolom.titel} aria-label={`Footer: ${kolom.titel}`}>
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-kpv-grijs">
                {kolom.titel}
              </h2>
              <ul className="mt-4 space-y-2">
                {kolom.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-kpv-grijs/70 hover:text-kpv-paars"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-kpv-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-kpv-grijs/60">
            © {new Date().getFullYear()} {site.naam} · onderdeel van{" "}
            <a
              href={site.kplusv.url}
              className="underline hover:text-kpv-paars"
              target="_blank"
              rel="noopener noreferrer"
            >
              KplusV
            </a>{" "}
            ·{" "}
            <Link href="/privacy" className="underline hover:text-kpv-paars">
              Privacy
            </Link>
          </p>
          <ul className="flex items-center gap-4">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-kpv-grijs/60 hover:text-kpv-paars"
                aria-label="E-mail ons"
              >
                <Mail className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.telefoon.replace(/[^+\d]/g, "")}`}
                className="text-kpv-grijs/60 hover:text-kpv-paars"
                aria-label="Bel ons"
              >
                <Phone className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={site.linkedinNiels}
                target="_blank"
                rel="noopener noreferrer"
                className="text-kpv-grijs/60 hover:text-kpv-paars"
                aria-label="LinkedIn van Niels Ahsmann"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
