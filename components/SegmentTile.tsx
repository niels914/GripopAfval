import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SegmentTile({
  name,
  description,
  href,
  icon: Icon,
  featured = false,
}: {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-3 blok",
        featured && "blok-violet sm:col-span-2 sm:flex-row sm:items-center sm:gap-6"
      )}
    >
      <Icon className="h-6 w-6 shrink-0 text-purper" aria-hidden="true" />
      <div className="flex-1">
        <p className="flex items-center gap-2 text-lg font-bold text-tekst">
          {name}
          {featured && <span className="status-pil">Primaire focus</span>}
        </p>
        <p className="mt-1 text-sm text-tekst-2">{description}</p>
      </div>
      <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-diepblauw">
        Lees meer
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
