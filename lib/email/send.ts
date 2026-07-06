import { Resend } from "resend";
import type { EmailInhoud } from "@/lib/email/templates";
import { site } from "@/content/site";

/**
 * Dun laagje om Resend: stuurt e-mail als RESEND_API_KEY gezet is,
 * logt anders de payload zodat de flow lokaal/CI zonder keys werkt.
 * Fouten worden gelogd maar nooit doorgegooid — mail mag leadopslag
 * niet laten mislukken.
 */
export async function verstuurEmail(
  to: string,
  inhoud: EmailInhoud,
  opties?: { replyTo?: string }
): Promise<{ sent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? `GripOpAfval <noreply@gripopafval.nl>`;

  if (!apiKey) {
    console.warn(
      `[email] RESEND_API_KEY niet gezet; mail niet verstuurd. to=${to} subject="${inhoud.subject}"`
    );
    return { sent: false };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: inhoud.subject,
      html: inhoud.html,
      replyTo: opties?.replyTo ?? site.email,
    });
    if (error) {
      console.error(`[email] Versturen mislukt (${inhoud.subject}):`, error.message);
      return { sent: false };
    }
    return { sent: true };
  } catch (err) {
    console.error(`[email] Versturen mislukt (${inhoud.subject}):`, err);
    return { sent: false };
  }
}

/** Ontvanger van interne leadnotificaties. */
export function notificatieOntvanger(): string | null {
  return process.env.LEAD_NOTIFY_EMAIL ?? null;
}
