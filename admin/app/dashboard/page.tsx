'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const STATUSSEN = ['nieuw', 'in behandeling', 'opgelost'] as const
type Status = typeof STATUSSEN[number]

const STATUS_KLEUREN: Record<Status, string> = {
  'nieuw': 'bg-yellow-100 text-yellow-700',
  'in behandeling': 'bg-blue-100 text-blue-700',
  'opgelost': 'bg-green-100 text-green-700',
}

type Melding = {
  id: string
  categorie: string
  gemeente: string
  straat: string
  beschrijving: string
  status: Status
  created_at: string
}

export default function AdminDashboard() {
  const [meldingen, setMeldingen] = useState<Melding[]>([])
  const [gemeente, setGemeente] = useState('')
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Status | 'alle'>('alle')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function laadData() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data: beheerder } = await supabase
        .from('beheerders')
        .select('gemeente')
        .eq('gebruiker_id', user.id)
        .single()

      if (!beheerder) {
        router.push('/login')
        return
      }

      setGemeente(beheerder.gemeente)

      const { data } = await supabase
        .from('meldingen')
        .select('*')
        .eq('gemeente', beheerder.gemeente)
        .order('created_at', { ascending: false })

      setMeldingen(data ?? [])
      setLoading(false)
    }

    laadData()
  }, [])

  async function updateStatus(id: string, status: Status) {
    await supabase.from('meldingen').update({ status }).eq('id', id)
    setMeldingen((prev) => prev.map((m) => m.id === id ? { ...m, status } : m))
  }

  async function uitloggen() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const gefilterd = filter === 'alle' ? meldingen : meldingen.filter((m) => m.status === filter)

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-lg">Alertix Beheer</h1>
          <p className="text-gray-400 text-sm">{gemeente}</p>
        </div>
        <button onClick={uitloggen} className="text-sm text-gray-400 hover:text-white transition">
          Uitloggen
        </button>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['alle', ...STATUSSEN] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                filter === s
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {s === 'alle' ? `Alle (${meldingen.length})` : `${s} (${meldingen.filter(m => m.status === s).length})`}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-400 text-center py-8">Laden...</p>}
        {!loading && gefilterd.length === 0 && (
          <p className="text-gray-400 text-center py-8">Geen meldingen</p>
        )}

        <div className="flex flex-col gap-4">
          {gefilterd.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="font-semibold text-gray-900">{m.categorie}</span>
                  <p className="text-sm text-gray-400">{m.straat}, {m.gemeente}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_KLEUREN[m.status]}`}>
                  {m.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{m.beschrijving}</p>

              <div className="flex gap-2 flex-wrap">
                {STATUSSEN.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(m.id, s)}
                    disabled={m.status === s}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                      m.status === s
                        ? 'bg-gray-100 text-gray-300 cursor-default'
                        : 'bg-gray-900 text-white hover:bg-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-300 mt-3">
                {new Date(m.created_at).toLocaleDateString('nl-BE', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
