import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full border border-mist bg-white px-3 py-2 text-base text-tekst placeholder:text-tekst-2 focus-visible:border-diepblauw focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-diepblauw disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
