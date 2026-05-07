import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Meldpunt</h1>
        <p className="text-gray-500 mb-8">Meld snel een probleem in jouw buurt</p>

        <div className="flex flex-col gap-3">
          <Link
            href="/melding/nieuw"
            className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
          >
            + Nieuwe melding
          </Link>
          <Link
            href="/dashboard"
            className="bg-white text-gray-700 py-3 px-6 rounded-xl font-semibold text-lg border border-gray-200 hover:bg-gray-100 transition"
          >
            Mijn meldingen
          </Link>
          <Link
            href="/login"
            className="text-gray-400 text-sm mt-2 hover:text-gray-600 transition"
          >
            Inloggen / Registreren
          </Link>
        </div>
      </div>
    </main>
  )
}
