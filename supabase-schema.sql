-- Meldingen tabel
create table meldingen (
  id uuid default gen_random_uuid() primary key,
  gebruiker_id uuid references auth.users(id) on delete cascade not null,
  categorie text not null,
  beschrijving text not null,
  locatie text not null,
  status text default 'nieuw' check (status in ('nieuw', 'in behandeling', 'opgelost')),
  created_at timestamptz default now()
);

-- Alleen eigen meldingen zien
alter table meldingen enable row level security;

create policy "Gebruiker ziet eigen meldingen"
  on meldingen for select
  using (auth.uid() = gebruiker_id);

create policy "Gebruiker kan melding aanmaken"
  on meldingen for insert
  with check (auth.uid() = gebruiker_id);
