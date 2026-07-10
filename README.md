# GripOpAfval – marketingwebsite

Productieklare marketingwebsite voor **GripOpAfval**, de propositie van
[KplusV](https://www.kplusv.nl) voor onafhankelijke afvalscheiding op de
werkvloer. Primaire doelgroep: MBO-instellingen.

## Livegang-checklist

Technisch is alles voorbereid; deze stappen vragen accounts/keuzes van het team:

1. **Supabase**: project aanmaken → `supabase/schema.sql` uitvoeren →
   `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Netlify.
2. **Resend**: account + domein `gripopafval.nl` verifiëren (SPF/DKIM) →
   `RESEND_API_KEY`, `RESEND_FROM`, `LEAD_NOTIFY_EMAIL` in Netlify.
3. **Contactgegevens**: telefoonnummer en LinkedIn-URL in `content/site.ts`
   zijn placeholders — vervangen door echte waarden.
4. **Redactie**: whitepaper (`npm run whitepaper`-bron in
   `whitepaper/generate.ts`), placeholder-quotes (`content/homepage.ts`) en
   -cases (`content/cases.ts`) redigeren; alle "te valideren"-markeringen
   in de whitepaper checken.
5. **Privacyverklaring** (`app/privacy/page.tsx`) juridisch laten toetsen.
6. **Testlead** end-to-end op productie: scan invullen → rij in Supabase +
   rapportmail + notificatiemail controleren.

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

### Tests & tooling

```bash
npm test              # Vitest: kernberekeningen van de afvalscan (15 tests)
npm run build         # productiebuild
npm run test:e2e      # Playwright-rooktest: scanflow, leadformulier, 404, sitemap
npm run whitepaper    # regenereert whitepaper (HTML + PDF) uit lib/scanCalculator.ts
npm run assets        # regenereert apple-icon.png en opengraph-image.png
```

CI (GitHub Actions, `.github/workflows/ci.yml`) draait lint, typecheck,
unit tests, build en de e2e-rooktest op elke push/PR naar `main` en `staging`.

### Branches

- `main` — productie (Netlify production deploy)
- `staging` — reviewomgeving; activeer als branch-deploy in Netlify
  (Site settings → Build & deploy → Branches). Bouw features op `staging`,
  merge naar `main` na review.

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
ANTHROPIC_API_KEY=<anthropic api-key voor de adviesbot>
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

## Adviesbot (/advies)

De adviesbot voert een kort intakegesprek en geeft daarna **tien concrete
handvatten** op maat: offertepartijen, bakkenkeuze, plaatsing, gedragsaanpak,
pilotopzet, enzovoort. Opbouw:

- `content/library/handvatten.ts` — de bouwstenenbank waaruit de bot put
  (alle genoemde partijen/links komen hiervandaan; de bot mag geen URL's
  verzinnen)
- `lib/chat/prompt.ts` — systemprompt (intake → tienpuntsadvies, guardrails)
- `lib/chat/parser.ts` + `types.ts` — het advies komt als JSON tussen
  `<HANDVATTEN>`-markers en wordt met zod gevalideerd (getest in
  `lib/chat/parser.test.ts`)
- `app/api/chat/route.ts` — streamt het antwoord van Claude
  (`claude-opus-4-8`, adaptieve thinking) als platte tekst
- `components/chat/AdviesChat.tsx` — chat-UI; rendert het advies als kaarten

Vereist `ANTHROPIC_API_KEY` (maak er een aan op
[console.anthropic.com](https://console.anthropic.com)). Zonder key blijft de
pagina werken: de route stuurt dan een nette fallback die naar de afvalscan en
het contactformulier verwijst. Gesprekken worden niet opgeslagen (zie ook de
privacyverklaring, sectie 7).

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
