'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const STATUSSEN = ['nieuw', 'in behandeling', 'opgelost'] as const
type Status = typeof STATUSSEN[number]

const STATUS_STIJL: Record<Status, string> = {
  'nieuw': 'bg-yellow-900/30 text-yellow-400 border border-yellow-800',
  'in behandeling': 'bg-blue-900/30 text-blue-400 border border-blue-800',
  'opgelost': 'bg-green-900/30 text-green-400 border border-green-800',
}

const STATUS_DOT: Record<Status, string> = {
  'nieuw': 'bg-yellow-400',
  'in behandeling': 'bg-blue-400',
  'opgelost': 'bg-green-400',
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
  const counts = {
    alle: meldingen.length,
    nieuw: meldingen.filter(m => m.status === 'nieuw').length,
    'in behandeling': meldingen.filter(m => m.status === 'in behandeling').length,
    opgelost: meldingen.filter(m => m.status === 'opgelost').length,
  }

  return (
    <main className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <span className="font-bold text-white">Alertix</span>
              <span className="text-gray-500 text-xs ml-2">Beheer</span>
              {gemeente && (
                <span className="ml-2 bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-full border border-gray-700">
                  {gemeente}
                </span>
              )}
            </div>
          </div>
          <button onClick={uitloggen} className="text-sm text-gray-500 hover:text-white transition">
            Uitloggen
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { key: 'alle', label: 'Alle', count: counts.alle },
            { key: 'nieuw', label: 'Nieuw', count: counts.nieuw },
            { key: 'in behandeling', label: 'In behandeling', count: counts['in behandeling'] },
            { key: 'opgelost', label: 'Opgelost', count: counts.opgelost },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as Status | 'alle')}
              className={`rounded-xl p-4 text-left transition border ${
                filter === item.key
                  ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'bg-gray-900 border-gray-800 hover:border-gray-700'
              }`}
            >
              <p className={`text-2xl font-bold ${filter === item.key ? 'text-white' : 'text-gray-300'}`}>
                {item.count}
              </p>
              <p className={`text-xs mt-1 ${filter === item.key ? 'text-blue-100' : 'text-gray-500'}`}>
                {item.label}
              </p>
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && gefilterd.length === 0 && (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-12 text-center">
            <p className="text-gray-500">Geen meldingen in deze categorie</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {gefilterd.map((m) => (
            <div key={m.id} className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="font-semibold text-white">{m.categorie}</span>
                  <p className="text-sm text-gray-500 mt-0.5">{m.straat}, {m.gemeente}</p>
                </div>
                <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STIJL[m.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[m.status]}`} />
                  {m.status}
                </span>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-4">{m.beschrijving}</p>

              <div className="flex gap-2 flex-wrap">
                {STATUSSEN.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(m.id, s)}
                    disabled={m.status === s}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      m.status === s
                        ? 'bg-gray-800 text-gray-600 cursor-default'
                        : 'bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white border border-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-700 mt-3">
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
