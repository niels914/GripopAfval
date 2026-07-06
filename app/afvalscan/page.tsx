import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ScanWizard } from "@/components/scan/ScanWizard";
import { scanContent } from "@/content/scan";

export const metadata: Metadata = {
  title: scanContent.meta.title,
  description: scanContent.meta.description,
  openGraph: {
    title: scanContent.meta.title,
    description: scanContent.meta.description,
  },
};

export default function AfvalscanPagina() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="text-4xl sm:text-5xl">{scanContent.hero.titel}</h1>
          <p className="mt-4 text-lg text-kpv-grijs/70">
            {scanContent.hero.subtitel}
          </p>
        </div>
        <ScanWizard />
      </Container>
    </div>
  );
}
