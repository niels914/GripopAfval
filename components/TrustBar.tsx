import { KpvLogo } from "@/components/KpvLogo";
import { site } from "@/content/site";

export function TrustBar() {
  return (
    <section
      aria-label="Onderdeel van KplusV"
      className="border-y border-kpv-border bg-white"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 px-4 py-6 text-center sm:flex-row sm:gap-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-kpv-grijs/70">
            Onderdeel van
          </span>
          <KpvLogo className="h-7 w-auto" />
        </div>
        <span className="hidden h-6 w-px bg-kpv-border sm:block" aria-hidden="true" />
        <p className="text-sm text-kpv-grijs/70">{site.kplusv.regel}</p>
        <span className="hidden h-6 w-px bg-kpv-border sm:block" aria-hidden="true" />
        <p className="text-sm text-kpv-grijs/70">{site.kplusv.partner}</p>
      </div>
    </section>
  );
}
