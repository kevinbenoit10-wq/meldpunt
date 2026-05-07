'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

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
  // Oost-Vlaanderen
  'Aalst', 'Aalter', 'Assenede', 'Berlare', 'Beveren', 'Brakel', 'Buggenhout',
  'De Pinte', 'Deinze', 'Denderleeuw', 'Dendermonde', 'Destelbergen', 'Eeklo',
  'Erpe-Mere', 'Evergem', 'Gavere', 'Gent', 'Geraardsbergen', 'Hamme', 'Herzele',
  'Horebeke', 'Kaprijke', 'Kluisbergen', 'Kruibeke', 'Kruisem', 'Laarne',
  'Lebbeke', 'Lede', 'Lierde', 'Lievegem', 'Lochristi', 'Lokeren', 'Maarkedal',
  'Maldegem', 'Merelbeke', 'Moerbeke', 'Ninove', 'Oosterzele', 'Oudenaarde',
  'Ronse', 'Sint-Laureins', 'Sint-Lievens-Houtem', 'Sint-Martens-Latem',
  'Sint-Niklaas', 'Stekene', 'Temse', 'Wachtebeke', 'Wetteren', 'Wichelen',
  'Wortegem-Petegem', 'Zele', 'Zottegem', 'Zulte', 'Zwalm',
  // West-Vlaanderen
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
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        <button onClick={() => router.back()} className="text-gray-400 text-sm mb-4 hover:text-gray-600">
          ← Terug
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Nieuwe melding</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Kies een categorie</option>
              {CATEGORIEEN.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gemeente</label>
            <select
              value={gemeente}
              onChange={(e) => setGemeente(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Kies een gemeente</option>
              {GEMEENTES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Straat & huisnummer</label>
            <input
              type="text"
              value={straat}
              onChange={(e) => setStraat(e.target.value)}
              required
              placeholder="bv. Gentstraat 12"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
            <textarea
              value={beschrijving}
              onChange={(e) => setBeschrijving(e.target.value)}
              required
              rows={4}
              placeholder="Beschrijf het probleem zo duidelijk mogelijk..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Bezig...' : 'Melding versturen'}
          </button>
        </form>
      </div>
    </main>
  )
}
