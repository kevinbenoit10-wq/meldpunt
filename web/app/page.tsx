import Link from 'next/link'

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  )
}

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Snel melden',
    desc: 'Dien een melding in binnen de minuut, rechtstreeks via je browser.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Statusopvolging',
    desc: 'Volg de voortgang van elke melding in je persoonlijk dashboard.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Per gemeente',
    desc: 'Elke melding komt automatisch bij de juiste gemeentedienst terecht.',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <BellIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">Alertix</span>
        </div>
        <Link
          href="/login"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          Inloggen
        </Link>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-2xl w-full text-center">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-8 border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            Oost- &amp; West-Vlaanderen
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-5 leading-[1.1] tracking-tight">
            Meld een probleem<br className="hidden sm:block" />
            <span className="text-blue-600"> in jouw buurt</span>
          </h1>
          <p className="text-slate-500 text-lg sm:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
            Snel, eenvoudig en rechtstreeks bij jouw gemeente. Volg de status van je melding op de voet.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/melding/nieuw"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 px-8 rounded-xl font-semibold text-base hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shadow-blue-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Nieuwe melding
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 py-3.5 px-8 rounded-xl font-semibold text-base border border-slate-200 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              Mijn meldingen
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-slate-100">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">{f.title}</p>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-6 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Alertix — Meldplatform Oost- &amp; West-Vlaanderen
        </p>
      </footer>
    </main>
  )
}
