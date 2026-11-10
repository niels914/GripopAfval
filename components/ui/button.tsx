import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Knoppen in huisstijl 2.2: primary/secondary zijn de "knop"-vorm (schuine
 * rechterrand, Magenta resp. Diepblauw); ghost/link zijn gewone Diepblauw-tekst.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "knop",
        secondary: "knop knop-diepblauw",
        ghost: "text-diepblauw font-semibold hover:underline",
        link: "text-diepblauw font-semibold underline-offset-4 hover:underline",
      },
      size: {
        // Minimaal 18px: wit-op-Magenta haalt pas voldoende contrast (3,5:1)
        // bij vette tekst van 18px of groter (huisstijlgids 2.2).
        default: "text-lg",
        sm: "text-sm",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
