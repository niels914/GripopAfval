import { Logo } from "@/components/huisstijl/Logo";
import { site } from "@/content/site";

export function TrustBar() {
  return (
    <section aria-label="Onderdeel van KplusV" className="blok">
      <div className="pagina flex flex-col items-center justify-center gap-3 py-2 text-center sm:flex-row sm:gap-8">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-tekst-2">Onderdeel van</span>
          <Logo className="h-10 w-10" />
        </div>
        <p className="text-sm text-tekst-2">{site.kplusv.regel}</p>
        <p className="text-sm text-tekst-2">{site.kplusv.partner}</p>
      </div>
    </section>
  );
}
