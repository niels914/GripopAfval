import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.naam} – ${site.tagline}`,
    template: `%s | ${site.naam}`,
  },
  description: site.beschrijving,
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: site.naam,
    title: `${site.naam} – ${site.tagline}`,
    description: site.beschrijving,
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Gestructureerde data voor zoekmachines (Organization + Service).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organisatie`,
      name: site.naam,
      url: site.url,
      email: site.email,
      description: site.beschrijving,
      parentOrganization: {
        "@type": "Organization",
        name: site.kplusv.naam,
        url: site.kplusv.url,
      },
    },
    {
      "@type": "Service",
      name: "Onafhankelijke afvalscheiding op de werkvloer",
      provider: { "@id": `${site.url}/#organisatie` },
      areaServed: "NL",
      audience: {
        "@type": "BusinessAudience",
        name: "KWD-organisaties (MBO, hotels, retail, gemeenten, cultuur, kantoren)",
      },
      description:
        "Afvalscan, implementatie op succes-fee en borgingsabonnement voor minder restafval, lagere kosten en CO2-reductie.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${poppins.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-kpv-paars focus:px-4 focus:py-2 focus:text-white"
        >
          Direct naar inhoud
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
