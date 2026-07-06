"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  naam: z.string().min(2, "Vul uw naam in"),
  email: z.email("Vul een geldig e-mailadres in"),
  organisatie: z.string().optional(),
  functie: z.string().optional(),
  bericht: z.string().optional(),
});

const whitepaperSchema = z.object({
  naam: z.string().min(2, "Vul uw naam in"),
  email: z.email("Vul een geldig e-mailadres in"),
});

type ContactValues = z.infer<typeof contactSchema>;

export type LeadFormVariant = "whitepaper" | "scan" | "contact";

/**
 * Leadformulier in drie varianten:
 * - whitepaper: naam + e-mail (compact, inline)
 * - contact:    volledig formulier met bericht
 * - scan:       naam/e-mail/organisatie/functie; scanresultaat gaat mee in de payload
 */
export function LeadForm({
  variant,
  scanResult,
  sector,
  afvalkosten,
  submitLabel,
  className,
}: {
  variant: LeadFormVariant;
  scanResult?: unknown;
  sector?: string;
  afvalkosten?: number;
  submitLabel?: string;
  className?: string;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const schema = variant === "whitepaper" ? whitepaperSchema : contactSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(schema as typeof contactSchema),
  });

  async function onSubmit(values: ContactValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam: values.naam,
          email: values.email,
          organisatie: values.organisatie || null,
          functie: values.functie || null,
          afvalkosten: afvalkosten ?? null,
          sector: sector ?? null,
          scan_result_json:
            variant === "scan"
              ? scanResult ?? null
              : values.bericht
                ? { bericht: values.bericht }
                : null,
          bron: variant,
        }),
      });
      if (!res.ok) throw new Error("Versturen mislukt");
      router.push("/bedankt");
    } catch {
      setServerError(
        "Er ging iets mis bij het versturen. Probeer het opnieuw of mail ons direct."
      );
    }
  }

  const compact = variant === "whitepaper";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4", className)}
      noValidate
    >
      <div className={cn(compact && "flex flex-col gap-3 sm:flex-row sm:items-start")}>
        <div className={cn("space-y-1", compact ? "flex-1" : "mb-4")}>
          <Label htmlFor={`${variant}-naam`}>Naam</Label>
          <Input
            id={`${variant}-naam`}
            autoComplete="name"
            aria-invalid={!!errors.naam}
            {...register("naam")}
          />
          {errors.naam && (
            <p role="alert" className="text-sm text-red-600">
              {errors.naam.message}
            </p>
          )}
        </div>
        <div className={cn("space-y-1", compact ? "flex-1" : "mb-4")}>
          <Label htmlFor={`${variant}-email`}>Zakelijk e-mailadres</Label>
          <Input
            id={`${variant}-email`}
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p role="alert" className="text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
        {compact && (
          <div className="sm:pt-6">
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              )}
              {submitLabel ?? "Stuur me de whitepaper"}
            </Button>
          </div>
        )}
      </div>

      {!compact && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor={`${variant}-organisatie`}>Organisatie</Label>
              <Input
                id={`${variant}-organisatie`}
                autoComplete="organization"
                {...register("organisatie")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${variant}-functie`}>Functie</Label>
              <Input
                id={`${variant}-functie`}
                autoComplete="organization-title"
                {...register("functie")}
              />
            </div>
          </div>

          {variant === "contact" && (
            <div className="space-y-1">
              <Label htmlFor="contact-bericht">Uw vraag of situatie</Label>
              <Textarea id="contact-bericht" rows={5} {...register("bericht")} />
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            {submitLabel ??
              (variant === "scan" ? "Ontvang uw rapport per e-mail" : "Verstuur")}
          </Button>
        </>
      )}

      {serverError && (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      )}

      <p className="text-xs text-kpv-grijs/50">
        Wij gaan zorgvuldig om met uw gegevens en delen ze nooit met inzamelaars.{" "}
        Zie onze <a href="/privacy" className="underline">privacyverklaring</a>.
      </p>
    </form>
  );
}
