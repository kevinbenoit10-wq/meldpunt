'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const STATUS_KLEUREN: Record<string, string> = {
  'nieuw': 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  'in behandeling': 'bg-blue-50 text-blue-700 border border-blue-200',
  'opgelost': 'bg-green-50 text-green-700 border border-green-200',
}

const STATUS_DOT: Record<string, string> = {
  'nieuw': 'bg-yellow-400',
  'in behandeling': 'bg-blue-500',
  'opgelost': 'bg-green-500',
}

type Melding = {
  id: string
  categorie: string
  beschrijving: string
  gemeente: string
  straat: string
  status: string
  created_at: string
}

export default function DashboardPage() {
  const [meldingen, setMeldingen] = useState<Melding[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function laadMeldingen() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setEmail(user.email ?? '')

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
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="font-bold text-gray-900">Alertix</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">{email}</span>
            <button onClick={uitloggen} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mijn meldingen</h1>
          <Link
            href="/melding/nieuw"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
          >
            + Nieuw
          </Link>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && meldingen.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-400 mb-4">Je hebt nog geen meldingen</p>
            <Link
              href="/melding/nieuw"
              className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              Eerste melding doen
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {meldingen.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="font-semibold text-gray-900">{m.categorie}</span>
                  <p className="text-sm text-gray-400 mt-0.5">{m.straat}, {m.gemeente}</p>
                </div>
                <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_KLEUREN[m.status] ?? 'bg-gray-100 text-gray-600'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[m.status] ?? 'bg-gray-400'}`} />
                  {m.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{m.beschrijving}</p>
              <p className="text-xs text-gray-300 mt-3">
                {new Date(m.created_at).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
