import { z } from "zod";
import type { HandvatCategorie } from "@/content/library/types";

/** Rollen zoals de Messages API ze verwacht. */
export const chatBerichtSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

export const chatVerzoekSchema = z.object({
  messages: z
    .array(chatBerichtSchema)
    .min(1)
    .max(40)
    // Het laatste bericht moet van de bezoeker komen.
    .refine((msgs) => msgs[msgs.length - 1]?.role === "user", {
      message: "Laatste bericht moet van de gebruiker zijn",
    }),
});

export type ChatBericht = z.infer<typeof chatBerichtSchema>;
export type ChatVerzoek = z.infer<typeof chatVerzoekSchema>;

const categorieSchema = z.enum([
  "contract",
  "middelen",
  "inrichting",
  "gedrag",
  "meten",
  "pilot",
  "communicatie",
  "kennis",
]) satisfies z.ZodType<HandvatCategorie>;

/** Eén concreet handvat zoals de bot het aanlevert. */
export const handvatSchema = z.object({
  titel: z.string().min(3).max(160),
  categorie: categorieSchema,
  toelichting: z.string().min(10).max(900),
  /** De eerste concrete stap die de bezoeker morgen kan zetten. */
  actie: z.string().max(300).optional(),
  links: z
    .array(
      z.object({
        label: z.string().min(1).max(120),
        // Alleen http(s) of interne paden; voorkomt javascript:-links.
        url: z.string().regex(/^(https?:\/\/|\/)/, "Alleen http(s)- of interne links"),
      })
    )
    .max(4)
    .optional(),
});

export const handvattenAdviesSchema = z.object({
  intro: z.string().min(10).max(600),
  handvatten: z.array(handvatSchema).min(5).max(12),
});

export type Handvat = z.infer<typeof handvatSchema>;
export type HandvattenAdvies = z.infer<typeof handvattenAdviesSchema>;
