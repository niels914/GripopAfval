import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Balk } from "@/components/huisstijl/Balk";
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
    <div className="sectie">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Balk as="h1" kleur="inkt" className="mx-auto text-3xl sm:text-4xl">
            {scanContent.hero.titel}
          </Balk>
          <p className="lead mx-auto mt-4">{scanContent.hero.subtitel}</p>
        </div>
        <ScanWizard />
      </Container>
    </div>
  );
}
