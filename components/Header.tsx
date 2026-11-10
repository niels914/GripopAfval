"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/huisstijl/Logo";
import { HuisstijlElement } from "@/components/huisstijl/HuisstijlElement";
import { navigatie } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Kop in huisstijl 2.2: logo tegen de rand linksboven, huisstijlelement
 * rechts. Geen navbar, geen sticky balk, geen kleurstreep — de navigatie
 * loopt als compacte Diepblauw-balkjes onder het element.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="pagina pt-6">
      <div className="top">
        <Link href="/" aria-label="GripOpAfval – naar homepage" className="-ml-6">
          <Logo className="h-24 w-24 sm:h-32 sm:w-32" />
        </Link>
        <HuisstijlElement delen={3} className="hidden h-16 w-auto sm:block" />
      </div>

      {/* Desktop: navigatie als balk-chips, geen navbar-styling */}
      <nav aria-label="Hoofdnavigatie" className="mt-5 hidden flex-wrap gap-2 lg:flex">
        {navigatie.map((item) => {
          const actief = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={actief ? "page" : undefined}
              className={cn(
                "px-3 py-1.5 text-sm font-semibold transition-colors",
                actief ? "bg-diepblauw text-white" : "bg-mist text-tekst hover:bg-violet"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobiel/tablet: toggle-menu, zelfde stijl als desktop-chips */}
      <div className="mt-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobiel-menu"
          className="flex items-center gap-2 bg-mist px-3 py-1.5 text-sm font-semibold text-tekst"
        >
          {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          Menu
        </button>
        {open && (
          <nav id="mobiel-menu" aria-label="Hoofdnavigatie" className="mt-2 flex flex-wrap gap-2">
            {navigatie.map((item) => {
              const actief = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={actief ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-semibold",
                    actief ? "bg-diepblauw text-white" : "bg-mist text-tekst"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
