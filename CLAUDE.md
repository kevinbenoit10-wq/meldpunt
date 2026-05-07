# Alertix — Meldplatform Oost- & West-Vlaanderen

## Project
Meldplatform waar burgers problemen kunnen melden per gemeente. Beheerders per gemeente kunnen meldingen opvolgen en status aanpassen.

## Tech Stack
- **Website**: Next.js (TypeScript + Tailwind) — map `/web`
- **App**: Expo React Native — nog te bouwen
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Domein**: alertix.be / alertix.eu

## Database (Supabase)

### Tabel: `meldingen`
| Kolom | Type | Info |
|---|---|---|
| id | uuid | primary key |
| gebruiker_id | uuid | ref auth.users |
| categorie | text | dropdown keuze |
| gemeente | text | dropdown alle OVL+WVL gemeentes |
| straat | text | vrij tekstveld |
| beschrijving | text | vrij tekstveld |
| status | text | nieuw / in behandeling / opgelost |
| created_at | timestamptz | automatisch |

### Tabel: `beheerders`
| Kolom | Type | Info |
|---|---|---|
| id | uuid | primary key |
| gebruiker_id | uuid | ref auth.users |
| gemeente | text | gemeente die beheerder beheert |
| created_at | timestamptz | automatisch |

## Row Level Security
- Gebruiker ziet enkel eigen meldingen
- Beheerder ziet enkel meldingen van zijn gemeente
- Beheerder kan status aanpassen van zijn gemeente

## Pagina's (website)
- `/` — startpagina
- `/login` — inloggen + registreren
- `/melding/nieuw` — nieuwe melding indienen
- `/dashboard` — overzicht eigen meldingen

## Gemeentes
Alle gemeentes van Oost-Vlaanderen en West-Vlaanderen zijn opgenomen in de dropdown (alfabetisch gesorteerd).

## Lokaal draaien
```bash
cd web
npm install
npm run dev
# → http://localhost:3000
```

## .env.local (in /web)
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Nog te doen
- [ ] Admin dashboard per gemeente
- [ ] Foto uploaden bij melding
- [ ] GPS locatie automatisch detecteren
- [ ] E-mail notificaties via Resend (noreply@alertix.be)
- [ ] Design verbeteren + Alertix branding
- [ ] Expo app (mobiel)
- [ ] Eigen SMTP instellen in Supabase
