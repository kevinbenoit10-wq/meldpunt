'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CATEGORIEEN = [
  'Wegen & voetpaden',
  'Verlichting',
  'Groen & netheid',
  'Wateroverlast',
  'Vandalisme',
  'Verkeer & veiligheid',
  'Andere',
]

const GEMEENTES = [
  'Aalst', 'Aalter', 'Assenede', 'Berlare', 'Beveren', 'Brakel', 'Buggenhout',
  'De Pinte', 'Deinze', 'Denderleeuw', 'Dendermonde', 'Destelbergen', 'Eeklo',
  'Erpe-Mere', 'Evergem', 'Gavere', 'Gent', 'Geraardsbergen', 'Hamme', 'Herzele',
  'Horebeke', 'Kaprijke', 'Kluisbergen', 'Kruibeke', 'Kruisem', 'Laarne',
  'Lebbeke', 'Lede', 'Lierde', 'Lievegem', 'Lochristi', 'Lokeren', 'Maarkedal',
  'Maldegem', 'Merelbeke', 'Moerbeke', 'Ninove', 'Oosterzele', 'Oudenaarde',
  'Ronse', 'Sint-Laureins', 'Sint-Lievens-Houtem', 'Sint-Martens-Latem',
  'Sint-Niklaas', 'Stekene', 'Temse', 'Wachtebeke', 'Wetteren', 'Wichelen',
  'Wortegem-Petegem', 'Zele', 'Zottegem', 'Zulte', 'Zwalm',
  'Anzegem', 'Ardooie', 'Avelgem', 'Beernem', 'Blankenberge', 'Brugge', 'Damme',
  'De Haan', 'De Panne', 'Deerlijk', 'Dentergem', 'Diksmuide', 'Gistel',
  'Harelbeke', 'Heuvelland', 'Hooglede', 'Ieper', 'Ingelmunster', 'Izegem',
  'Jabbeke', 'Knokke-Heist', 'Koksijde', 'Kortemark', 'Kortrijk', 'Kuurne',
  'Langemark-Poelkapelle', 'Ledegem', 'Lendelede', 'Lichtervelde', 'Lo-Reninge',
  'Menen', 'Mesen', 'Middelkerke', 'Moorslede', 'Nieuwpoort', 'Oostende',
  'Oostkamp', 'Oostrozebeke', 'Oudenburg', 'Pittem', 'Poperinge', 'Roeselare',
  'Ruiselede', 'Spiere-Helkijn', 'Staden', 'Tielt', 'Torhout', 'Veurne',
  'Vleteren', 'Waregem', 'Wervik', 'Wevelgem', 'Wielsbeke', 'Wingene',
  'Zedelgem', 'Zonnebeke', 'Zuienkerke', 'Zwevegem',
].sort()

export default function NieuweMeldingPage() {
  const [categorie, setCategorie] = useState('')
  const [gemeente, setGemeente] = useState('')
  const [straat, setStraat] = useState('')
  const [beschrijving, setBeschrijving] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const { error } = await supabase.from('meldingen').insert({
      gebruiker_id: user.id,
      categorie,
      gemeente,
      straat,
      beschrijving,
      status: 'nieuw',
    })

    setLoading(false)

    if (error) {
      setError('Er ging iets mis. Probeer opnieuw.')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-700 transition text-sm">
            ← Terug
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="font-bold text-gray-900 text-sm">Alertix</span>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Nieuwe melding</h1>
        <p className="text-gray-400 text-sm mb-6">Vul het formulier in en wij bezorgen het aan de juiste gemeente.</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Categorie</label>
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Kies een categorie</option>
              {CATEGORIEEN.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Gemeente</label>
            <select
              value={gemeente}
              onChange={(e) => setGemeente(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Kies een gemeente</option>
              {GEMEENTES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Straat & huisnummer</label>
            <input
              type="text"
              value={straat}
              onChange={(e) => setStraat(e.target.value)}
              required
              placeholder="bv. Gentstraat 12"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Beschrijving</label>
            <textarea
              value={beschrijving}
              onChange={(e) => setBeschrijving(e.target.value)}
              required
              rows={4}
              placeholder="Beschrijf het probleem zo duidelijk mogelijk..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Bezig...
              </>
            ) : 'Melding versturen'}
          </button>
        </form>
      </div>
    </main>
  )
}
