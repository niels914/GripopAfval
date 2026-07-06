import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-kpv-border bg-white px-3 py-2 text-base text-kpv-grijs placeholder:text-kpv-grijs/40 focus-visible:border-kpv-blauw focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-kpv-blauw disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
