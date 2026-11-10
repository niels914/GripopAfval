import { ChevList } from "@/components/huisstijl/ChevList";
import { cn } from "@/lib/utils";

export function ProductLayerCard({
  stap,
  tier,
  price,
  duration,
  description,
  punten,
  highlight = false,
}: {
  stap: string;
  tier: string;
  price: string;
  duration: string;
  description: string;
  punten?: readonly string[];
  highlight?: boolean;
}) {
  return (
    <div className={cn("blok flex h-full flex-col", highlight && "blok-violet")}>
      <p className="text-sm font-semibold uppercase tracking-wide text-inkt">{stap}</p>
      <h3 className="mt-1 text-2xl font-bold text-tekst">{tier}</h3>
      <p className="mt-1 text-xl font-bold text-purper">{price}</p>
      <p className="text-sm text-tekst-2">{duration}</p>
      <p className="mt-4 text-sm leading-relaxed text-tekst">{description}</p>
      {punten && punten.length > 0 && (
        <ChevList className="mt-4 text-sm">
          {punten.map((punt) => (
            <li key={punt}>{punt}</li>
          ))}
        </ChevList>
      )}
    </div>
  );
}
