import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card
      className={
        highlight
          ? "relative border-2 border-kpv-paars shadow-md"
          : "relative"
      }
    >
      <CardHeader>
        <p className="text-sm font-medium uppercase tracking-wide text-kpv-blauw">
          {stap}
        </p>
        <CardTitle className="text-2xl">{tier}</CardTitle>
        <p className="font-heading text-xl font-semibold text-kpv-paars">{price}</p>
        <p className="text-sm text-kpv-grijs/60">{duration}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-kpv-grijs/80">{description}</p>
        {punten && punten.length > 0 && (
          <ul className="mt-4 space-y-2">
            {punten.map((punt) => (
              <li key={punt} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-kpv-blauw" aria-hidden="true" />
                <span>{punt}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
