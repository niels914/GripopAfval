# GripOpAfval – marketingwebsite

Productieklare marketingwebsite voor **GripOpAfval**, de propositie van
[KplusV](https://www.kplusv.nl) voor onafhankelijke afvalscheiding op de
werkvloer. Primaire doelgroep: MBO-instellingen.

## Tech-stack

- **Next.js 16** (App Router) + TypeScript — let op: het oorspronkelijke plan
  noemde Next 14; dit project gebruikt de actuele major, de API's zijn gelijkwaardig
- **Tailwind CSS v4** — huisstijl-tokens staan in `app/globals.css` onder
  `@theme` (Tailwind v4 configureert via CSS in plaats van `tailwind.config.ts`)
- **shadcn/ui-stijl componenten** (`components/ui/`) op basis van Radix
- **Framer Motion** voor fade-ins (respecteert `prefers-reduced-motion`)
- **react-hook-form + zod** voor formulieren en validatie
- **Supabase** voor leadopslag, **Vitest** voor unit tests

## Snel starten

```bash
npm install
cp .env.example .env.local   # vul je Supabase-keys in (optioneel voor dev)
npm run dev                  # http://localhost:3000
```

Zonder Supabase-keys werkt de site gewoon; leads worden dan alleen server-side
gelogd in plaats van opgeslagen.

### Tests

```bash
npm test          # Vitest: kernberekeningen van de afvalscan
```

## Structuur

| Map | Inhoud |
| --- | --- |
| `app/` | Routes (App Router), incl. `sitemap.ts`, `robots.ts`, `api/leads` |
| `components/` | Herbruikbare componenten (`Hero`, `ScanWizard`, `LeadForm`, …) |
| `components/ui/` | Basiscomponenten in shadcn/ui-stijl |
| `content/*.ts` | **Alle teksten** — pas copy hier aan, niet in componenten |
| `lib/scanCalculator.ts` | Alle kengetallen, tarieven en scanberekeningen |
| `supabase/schema.sql` | SQL voor de `leads`-tabel incl. RLS |

### Content aanpassen

Alle zichtbare teksten staan in `content/*.ts` (bijv. `content/homepage.ts`,
`content/mbo.ts`, `content/scan.ts`). Kengetallen en tarieven van de scan staan
in `lib/scanCalculator.ts` — de unit tests in `lib/scanCalculator.test.ts`
bewaken dat de rekenlogica blijft kloppen na aanpassingen.

## Supabase instellen

1. Maak een project op [supabase.com](https://supabase.com).
2. Voer `supabase/schema.sql` uit in de SQL-editor (maakt de `leads`-tabel met
   RLS: anon mag alleen invoegen).
3. Zet in `.env.local` (en in Netlify → Environment variables):

```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
RESEND_API_KEY=<resend api-key>
RESEND_FROM="GripOpAfval <noreply@gripopafval.nl>"
LEAD_NOTIFY_EMAIL=<ontvanger interne leadnotificaties>
NEXT_PUBLIC_SITE_URL=https://gripopafval.nl
```

## E-mails (Resend)

Bij elke lead verstuurt `/api/leads` automatisch (templates: `lib/email/templates.ts`):

| Bron | Naar invuller | Naar `LEAD_NOTIFY_EMAIL` |
| --- | --- | --- |
| Afvalscan | Volledig scanrapport (cijfers, samenstelling, scenario's) | Notificatie + scan-samenvatting |
| Whitepaper | Downloadlink whitepaper | Notificatie |
| Contact | — | Notificatie (reply-to = invuller) |

Setup: maak een [Resend](https://resend.com)-account, verifieer het domein
`gripopafval.nl` (SPF + DKIM-records) en zet de drie env-vars. Zonder
`RESEND_API_KEY` blijft alles werken; mails worden dan alleen gelogd.
Formulieren hebben spam-bescherming (honeypot + minimale invultijd) —
verdachte submissies worden stil genegeerd.

## Deploy naar Netlify

1. Koppel deze repo aan een nieuwe Netlify-site. `netlify.toml` staat klaar met
   de `@netlify/plugin-nextjs`-runtime (SSR + API-routes werken out of the box).
2. Zet bovenstaande environment variables in de Netlify-UI.
3. **Staging**: maak een branch `staging` en activeer die als branch-deploy in
   Netlify (Site settings → Build & deploy → Branches). Elke push naar
   `staging` krijgt dan een preview-URL.

## SEO

- Metadata per pagina via de Next Metadata API (incl. Open Graph)
- `app/sitemap.ts` → `/sitemap.xml`, `app/robots.ts` → `/robots.txt`
- `NEXT_PUBLIC_SITE_URL` bepaalt de canonical basis-URL

## Ideeën voor uitbreiding

- **A/B-testen** van hero-copy en CTA's (bijv. Netlify Edge Functions + cookie)
- **Benchmarkdatabase**: geaggregeerde scanresultaten per sector terugkoppelen
  ("u zit 20% boven het sectorgemiddelde")
- **Self-service dashboard**: klantlogin met kwartaalcijfers, trend en
  CSRD-export (Supabase Auth ligt er al onder)
- **PDF-bijlage** van het scanrapport in de bevestigingsmail
  (bijv. `@react-pdf/renderer`; de HTML-mail is er al)
