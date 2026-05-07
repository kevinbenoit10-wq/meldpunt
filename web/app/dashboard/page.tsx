'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const STATUS_KLEUREN: Record<string, string> = {
  nieuw: 'bg-yellow-100 text-yellow-700',
  'in behandeling': 'bg-blue-100 text-blue-700',
  opgelost: 'bg-green-100 text-green-700',
}

type Melding = {
  id: string
  categorie: string
  beschrijving: string
  locatie: string
  status: string
  created_at: string
}

export default function DashboardPage() {
  const [meldingen, setMeldingen] = useState<Melding[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function laadMeldingen() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('meldingen')
        .select('*')
        .eq('gebruiker_id', user.id)
        .order('created_at', { ascending: false })

      setMeldingen(data ?? [])
      setLoading(false)
    }

    laadMeldingen()
  }, [])

  async function uitloggen() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mijn meldingen</h1>
          <button onClick={uitloggen} className="text-sm text-gray-400 hover:text-gray-600 transition">
            Uitloggen
          </button>
        </div>

        <Link
          href="/melding/nieuw"
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition mb-6"
        >
          + Nieuwe melding
        </Link>

        {loading && <p className="text-gray-400 text-center py-8">Laden...</p>}

        {!loading && meldingen.length === 0 && (
          <p className="text-gray-400 text-center py-8">Nog geen meldingen</p>
        )}

        <div className="flex flex-col gap-3">
          {meldingen.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-800">{m.categorie}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_KLEUREN[m.status] ?? 'bg-gray-100 text-gray-600'}`}>
                  {m.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">{m.locatie}</p>
              <p className="text-sm text-gray-600">{m.beschrijving}</p>
              <p className="text-xs text-gray-300 mt-2">
                {new Date(m.created_at).toLocaleDateString('nl-BE')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
