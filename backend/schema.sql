-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  ref text unique not null,
  name text not null,
  whatsapp text not null,
  email text,
  country text,
  method text,
  items text[] not null,
  total int not null,
  status text not null default 'pending' check (status in ('pending','paid','cancelled')),
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  expires_at timestamptz,
  downloads_used int not null default 0,
  max_downloads int not null default 15
);
-- Row Level Security ON with no policies: nobody can read or write from the browser.
-- Only the two Edge Functions (service role) can touch this table.
alter table public.orders enable row level security;

-- When you change status to 'paid', the download window starts (30 days).
create or replace function public.on_paid() returns trigger language plpgsql as $$
begin
  if new.status = 'paid' and old.status is distinct from 'paid' then
    new.paid_at := now();
    new.expires_at := coalesce(new.expires_at, now() + interval '30 days');
  end if;
  return new;
end $$;
create trigger orders_paid before update on public.orders
  for each row execute function public.on_paid();

-- Private bucket for the PDFs (public = false)
insert into storage.buckets (id, name, public) values ('books', 'books', false)
on conflict (id) do nothing;
