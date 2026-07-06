import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase-client voor leadopslag. Geeft null terug zolang de env-vars niet
 * gezet zijn, zodat de site ook zonder Supabase-koppeling blijft werken
 * (formulieren loggen dan alleen server-side).
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

export interface LeadRecord {
  naam: string;
  email: string;
  organisatie?: string | null;
  functie?: string | null;
  afvalkosten?: number | null;
  sector?: string | null;
  scan_result_json?: unknown | null;
  bron?: string | null;
}
