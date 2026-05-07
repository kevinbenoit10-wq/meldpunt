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
    if (!user) { router.replace('/login'); return }

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

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"

  return (
    <main className="min-h-screen bg-[#0B0D1A]">
      <header className="bg-[#0f1120] border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <span className="font-semibold text-white text-sm">Nieuwe melding</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-6 py-8">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white tracking-tight">Nieuwe melding</h1>
          <p className="text-slate-500 text-sm mt-1">Vul het formulier in en wij bezorgen het aan de juiste gemeente.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/10">
          <div className="p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Categorie <span className="text-red-400">*</span></label>
              <select value={categorie} onChange={(e) => setCategorie(e.target.value)} required className={inputClass + ' appearance-none cursor-pointer'}>
                <option value="" className="bg-[#0f1120]">Kies een categorie</option>
                {CATEGORIEEN.map((c) => <option key={c} value={c} className="bg-[#0f1120]">{c}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Gemeente <span className="text-red-400">*</span></label>
              <select value={gemeente} onChange={(e) => setGemeente(e.target.value)} required className={inputClass + ' appearance-none cursor-pointer'}>
                <option value="" className="bg-[#0f1120]">Kies een gemeente</option>
                {GEMEENTES.map((g) => <option key={g} value={g} className="bg-[#0f1120]">{g}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Straat &amp; huisnummer <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={straat}
                onChange={(e) => setStraat(e.target.value)}
                required
                placeholder="bv. Gentstraat 12"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Beschrijving <span className="text-red-400">*</span></label>
              <textarea
                value={beschrijving}
                onChange={(e) => setBeschrijving(e.target.value)}
                required
                rows={4}
                placeholder="Beschrijf het probleem zo duidelijk mogelijk..."
                className={inputClass + ' resize-none'}
              />
              <p className="text-xs text-slate-600">{beschrijving.length} tekens</p>
            </div>
          </div>

          {error && (
            <div className="px-6 py-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3.5 py-2.5 flex items-start gap-2">
                <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="px-6 py-5 flex items-center justify-between gap-4 rounded-b-2xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-xs text-slate-600"><span className="text-red-400">*</span> Verplicht veld</p>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 text-white py-2.5 px-6 rounded-lg font-semibold text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Bezig...
                </>
              ) : (
                <>
                  Melding versturen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
