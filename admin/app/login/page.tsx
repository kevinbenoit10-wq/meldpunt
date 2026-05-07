'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    if (loginError) {
      setError('Ongeldig e-mailadres of wachtwoord.')
      setLoading(false)
      return
    }

    const { data: { user } } = await supabase.auth.getUser()

    const { data: beheerder } = await supabase
      .from('beheerders')
      .select('gemeente')
      .eq('gebruiker_id', user!.id)
      .single()

    if (!beheerder) {
      await supabase.auth.signOut()
      setError('Je hebt geen beheerderstoegang.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-base">A</span>
          </div>
          <div>
            <span className="font-bold text-white text-lg">Alertix</span>
            <span className="text-gray-500 text-xs ml-2">Beheer</span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <h1 className="text-xl font-bold text-white mb-1">Gemeenteportaal</h1>
          <p className="text-gray-500 text-sm mb-6">Enkel toegankelijk voor beheerders</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="beheerder@gemeente.be"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Wachtwoord</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg px-3 py-2">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-500 transition disabled:opacity-50 mt-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Bezig...
                </>
              ) : 'Inloggen'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
