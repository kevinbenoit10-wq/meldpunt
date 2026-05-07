import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">Alertix</span>
        </div>
        <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">
          Inloggen
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            Oost- &amp; West-Vlaanderen
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Meld een probleem<br />in jouw buurt
          </h1>
          <p className="text-gray-400 text-lg mb-10">
            Snel, eenvoudig en rechtstreeks bij jouw gemeente. Volg de status van je melding op de voet.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/melding/nieuw"
              className="bg-blue-600 text-white py-3 px-8 rounded-xl font-semibold text-base hover:bg-blue-700 transition shadow-sm"
            >
              + Nieuwe melding
            </Link>
            <Link
              href="/dashboard"
              className="bg-gray-50 text-gray-700 py-3 px-8 rounded-xl font-semibold text-base border border-gray-200 hover:bg-gray-100 transition"
            >
              Mijn meldingen
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg w-full text-center">
          {[
            { label: 'Snel melden', desc: 'In minder dan 1 minuut' },
            { label: 'Statusopvolging', desc: 'Altijd op de hoogte' },
            { label: 'Per gemeente', desc: 'Rechtstreeks bij de juiste dienst' },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
              <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
