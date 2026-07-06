-- Supabase-schema voor GripOpAfval leadopslag.
-- Uitvoeren in de SQL-editor van je Supabase-project.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  naam text not null,
  email text not null,
  organisatie text,
  functie text,
  afvalkosten numeric,
  sector text,
  scan_result_json jsonb,
  bron text not null default 'contact' check (bron in ('scan', 'whitepaper', 'contact'))
);

-- Row Level Security: anon mag alleen invoegen, nooit lezen.
alter table public.leads enable row level security;

create policy "anon mag leads invoegen"
  on public.leads for insert
  to anon
  with check (true);

-- Leads uitlezen doe je met de service-role key of via het dashboard.
