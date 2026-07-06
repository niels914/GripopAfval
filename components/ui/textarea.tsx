import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[100px] w-full rounded-lg border border-kpv-border bg-white px-3 py-2 text-base text-kpv-grijs placeholder:text-kpv-grijs/40 focus-visible:border-kpv-blauw focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-kpv-blauw disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
