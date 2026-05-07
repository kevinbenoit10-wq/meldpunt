-- Meldingen tabel (volledig opnieuw)
drop table if exists meldingen;

create table meldingen (
  id uuid default gen_random_uuid() primary key,
  gebruiker_id uuid references auth.users(id) on delete cascade not null,
  categorie text not null,
  gemeente text not null,
  straat text not null,
  beschrijving text not null,
  status text default 'nieuw' check (status in ('nieuw', 'in behandeling', 'opgelost')),
  created_at timestamptz default now()
);

-- Beveiliging
alter table meldingen enable row level security;

create policy "Gebruiker ziet eigen meldingen"
  on meldingen for select
  using (auth.uid() = gebruiker_id);

create policy "Gebruiker kan melding aanmaken"
  on meldingen for insert
  with check (auth.uid() = gebruiker_id);

create policy "Beheerder ziet meldingen van zijn gemeente"
  on meldingen for select
  using (
    exists (
      select 1 from beheerders
      where beheerders.gebruiker_id = auth.uid()
      and beheerders.gemeente = meldingen.gemeente
    )
  );

create policy "Beheerder kan status aanpassen"
  on meldingen for update
  using (
    exists (
      select 1 from beheerders
      where beheerders.gebruiker_id = auth.uid()
      and beheerders.gemeente = meldingen.gemeente
    )
  );

-- Beheerders tabel
create table if not exists beheerders (
  id uuid default gen_random_uuid() primary key,
  gebruiker_id uuid references auth.users(id) on delete cascade not null,
  gemeente text not null,
  created_at timestamptz default now()
);

alter table beheerders enable row level security;

create policy "Beheerder ziet eigen record"
  on beheerders for select
  using (auth.uid() = gebruiker_id);
