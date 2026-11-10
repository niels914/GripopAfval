import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Gestileerde native select: toegankelijk en licht (geen extra JS op mobiel). */
const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex h-11 w-full appearance-none border border-mist bg-white px-3 py-2 pr-10 text-base text-tekst focus-visible:border-diepblauw focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-diepblauw disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tekst-2"
      />
    </div>
  )
);
Select.displayName = "Select";

export { Select };
