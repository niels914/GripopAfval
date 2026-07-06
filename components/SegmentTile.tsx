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
        "group flex flex-col gap-3 rounded-card border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        featured
          ? "border-2 border-kpv-paars sm:col-span-2 sm:flex-row sm:items-center sm:gap-6"
          : "border-kpv-border"
      )}
    >
      <span
        className={cn(
          "w-fit rounded-lg p-3",
          featured ? "bg-kpv-paars text-white" : "bg-kpv-offwhite text-kpv-paars"
        )}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div className="flex-1">
        <p className="flex items-center gap-2 font-heading text-lg font-semibold">
          {name}
          {featured && (
            <span className="rounded-full bg-kpv-paars/10 px-2.5 py-0.5 text-xs font-medium text-kpv-paars">
              Primaire focus
            </span>
          )}
        </p>
        <p className="mt-1 text-sm text-kpv-grijs/70">{description}</p>
      </div>
      <span className="mt-auto flex items-center gap-1 text-sm font-medium text-kpv-blauw">
        Lees meer
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
