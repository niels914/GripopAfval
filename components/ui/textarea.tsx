import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[100px] w-full border border-mist bg-white px-3 py-2 text-base text-tekst placeholder:text-tekst-2 focus-visible:border-diepblauw focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-diepblauw disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
