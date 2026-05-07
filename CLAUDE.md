# Alertix — Meldplatform Oost- & West-Vlaanderen

## Project
Meldplatform waar burgers problemen kunnen melden per gemeente. Beheerders per gemeente kunnen meldingen opvolgen en status aanpassen.

## Tech Stack
- **Website**: Next.js 16 (TypeScript + Tailwind v4) — map `/web`
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
- `/` — startpagina (dark, kaartachtergrond, animerend stickfigure)
- `/login` — inloggen + registreren (zelfde kaartachtergrond)
- `/melding/nieuw` — nieuwe melding indienen (dark mode, vereist login)
- `/dashboard` — overzicht eigen meldingen (dark mode, vereist login)

## Huidige branch
`claude/review-website-design-p6sFy`

## Design (afgewerkt)
- **Thema**: volledig dark (`#0B0D1A`), paarse Alertix branding
- **Achtergrond**: Leaflet kaart (CartoDB dark tiles) persistent in `layout.tsx` — hermonteert nooit
- **Overlay**: `rgba(11,13,26,0.55)` fixed over de kaart
- **Pagina-overgangen**: Framer Motion fade via `app/template.tsx`
- **Homepage hero**: stagger-animaties via `HomeHero.tsx` (client component)
- **Stickfigure**: SVG animatie — arm wijst naar alert, benen bewegen, cirkel pulseert
- **Knoppen**: oranje (melding doen), paars gradient (login/acties)
- **Auth**: beveiligd via `proxy.ts` (Next.js 16 equivalent van middleware)

## Architectuur `/web/app`
```
app/
├── layout.tsx          # Persistent kaartachtergrond + overlay
├── template.tsx        # Framer Motion pagina-overgang (fade)
├── proxy.ts            # Auth beveiliging: /dashboard en /melding/* vereisen login
├── globals.css         # Keyframe animaties stickfigure
├── page.tsx            # Homepage (server component)
├── login/page.tsx      # Login + register
├── dashboard/page.tsx  # Gebruikers dashboard (dark)
├── melding/nieuw/      # Nieuw melding formulier (dark)
├── api/stats/route.ts  # GET /api/stats — echte tellingen uit Supabase
└── components/
    ├── MapBackground.tsx  # Leaflet kaart (client, fixed inset-0)
    ├── MapWrapper.tsx     # Dynamic import wrapper (ssr: false)
    └── HomeHero.tsx       # Geanimeerde rechterkolom homepage
```

## .env.local (in /web)
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # nodig voor /api/stats (bypast RLS)
```

## Lokaal draaien
```bash
cd web
npm install
npm run dev
# → http://localhost:3000
```

## Nog te doen
- [ ] `SUPABASE_SERVICE_ROLE_KEY` toevoegen aan `.env.local` → echte stats op homepage
- [ ] Admin dashboard per gemeente (`/admin`) — beheerder logt in, ziet meldingen van zijn gemeente, kan status aanpassen
- [ ] Foto uploaden bij melding
- [ ] GPS locatie automatisch detecteren
- [ ] E-mail notificaties via Resend (noreply@alertix.be)
- [ ] Expo app (mobiel)
- [ ] Eigen SMTP instellen in Supabase
