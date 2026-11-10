import { cn } from "@/lib/utils";

/** Inhoudsblok in Mist-grijs, zonder rand, schaduw of afronding. */
export function Blok({
  variant = "mist",
  className,
  children,
}: {
  variant?: "mist" | "violet";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("blok", variant === "violet" && "blok-violet", className)}>
      {children}
    </div>
  );
}
