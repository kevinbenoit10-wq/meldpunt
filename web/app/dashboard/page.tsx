'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  )
}

const STATUS_CONFIG: Record<string, { badge: string; dot: string; label: string }> = {
  'nieuw':          { badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',   dot: 'bg-amber-400',   label: 'Nieuw' },
  'in behandeling': { badge: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',      dot: 'bg-blue-400',    label: 'In behandeling' },
  'opgelost':       { badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25', dot: 'bg-emerald-400', label: 'Opgelost' },
}

const CATEGORIE_ICONS: Record<string, string> = {
  'Wegen & voetpaden': '🛣️',
  'Verlichting': '💡',
  'Groen & netheid': '🌿',
  'Wateroverlast': '💧',
  'Vandalisme': '🔨',
  'Verkeer & veiligheid': '🚦',
  'Andere': '📋',
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
      if (!user) { router.replace('/login'); return }

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

  const stats = {
    totaal: meldingen.length,
    nieuw: meldingen.filter(m => m.status === 'nieuw').length,
    inBehandeling: meldingen.filter(m => m.status === 'in behandeling').length,
    opgelost: meldingen.filter(m => m.status === 'opgelost').length,
  }

  return (
    <main className="min-h-screen bg-[#0B0D1A]">
      <header className="bg-[#0f1120] border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
              <BellIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white tracking-tight">Alertix</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden sm:block truncate max-w-[200px]">{email}</span>
            <button
              onClick={uitloggen}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Mijn meldingen</h1>
            <p className="text-slate-500 text-sm mt-0.5">Overzicht van al je ingediende meldingen</p>
          </div>
          <Link
            href="/melding/nieuw"
            className="inline-flex items-center gap-1.5 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Nieuw
          </Link>
        </div>

        {!loading && meldingen.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Totaal',          value: stats.totaal,         color: 'text-white' },
              { label: 'Nieuw',           value: stats.nieuw,          color: 'text-amber-400' },
              { label: 'In behandeling',  value: stats.inBehandeling,  color: 'text-blue-400' },
              { label: 'Opgelost',        value: stats.opgelost,       color: 'text-emerald-400' },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <svg className="w-6 h-6 text-violet-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}

        {!loading && meldingen.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-14 text-center">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BellIcon className="w-7 h-7 text-slate-500" />
            </div>
            <p className="font-semibold text-white mb-1">Nog geen meldingen</p>
            <p className="text-slate-500 text-sm mb-6">Heb je een probleem opgemerkt in je buurt?</p>
            <Link
              href="/melding/nieuw"
              className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Eerste melding doen
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {meldingen.map((m) => {
            const status = STATUS_CONFIG[m.status] ?? { badge: 'bg-white/10 text-slate-400 border border-white/10', dot: 'bg-slate-500', label: m.status }
            const icon = CATEGORIE_ICONS[m.categorie] ?? '📋'
            return (
              <div key={m.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] hover:border-white/20 transition-all">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-white">{m.categorie}</p>
                      <p className="text-sm text-slate-500 mt-0.5 truncate">{m.straat}, {m.gemeente}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${status.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mt-3 line-clamp-2">{m.beschrijving}</p>
                <p className="text-xs text-slate-600 mt-3">
                  {new Date(m.created_at).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
