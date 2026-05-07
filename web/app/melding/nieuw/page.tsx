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

export default function NieuweMeldingPage() {
  const [categorie, setCategorie] = useState('')
  const [beschrijving, setBeschrijving] = useState('')
  const [locatie, setLocatie] = useState('')
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
      beschrijving,
      locatie,
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Locatie</label>
            <input
              type="text"
              value={locatie}
              onChange={(e) => setLocatie(e.target.value)}
              required
              placeholder="bv. Gentstraat 12, Gent"
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
