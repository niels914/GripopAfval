"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { GripOpAfvalLogo } from "@/components/KpvLogo";
import { Button } from "@/components/ui/button";
import { navigatie } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-kpv-border bg-white/90 backdrop-blur">
      <nav
        aria-label="Hoofdnavigatie"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="shrink-0" aria-label="GripOpAfval – naar homepage">
          <GripOpAfvalLogo className="h-7 w-auto" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navigatie.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "inline-block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-kpv-offwhite hover:text-kpv-paars",
                  pathname === item.href ? "text-kpv-paars" : "text-kpv-grijs"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button asChild size="sm">
            <Link href="/afvalscan">Doe de gratis afvalscan</Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-kpv-grijs lg:hidden"
          aria-expanded={open}
          aria-controls="mobiel-menu"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div id="mobiel-menu" className="border-t border-kpv-border bg-white lg:hidden">
          <ul className="space-y-1 px-4 py-4">
            {navigatie.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium hover:bg-kpv-offwhite",
                    pathname === item.href ? "text-kpv-paars" : "text-kpv-grijs"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full">
                <Link href="/afvalscan" onClick={() => setOpen(false)}>
                  Doe de gratis afvalscan
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
