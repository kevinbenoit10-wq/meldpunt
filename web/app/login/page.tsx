'use client'

import { useState } from 'react'
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

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = isRegister
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="relative z-[2] w-full max-w-sm">
        <Link href="/" className="flex flex-col items-center gap-3 mb-8 group">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
            <BellIcon className="w-7 h-7 text-white" />
          </div>
          <span className="font-bold text-white text-xl tracking-tight">Alertix</span>
        </Link>

        <div className="bg-[#0B0D1A]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-8 pt-7 pb-2">
            <h1 className="text-xl font-bold text-white">
              {isRegister ? 'Account aanmaken' : 'Welkom terug'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {isRegister ? 'Maak een gratis account aan' : 'Log in op je account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">E-mailadres</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="jouw@email.be"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Wachtwoord</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3.5 py-2.5 flex items-start gap-2">
                <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
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
              ) : isRegister ? 'Account aanmaken' : 'Inloggen'}
            </button>
          </form>

          <div className="px-8 py-5 border-t border-white/10 text-center">
            <p className="text-sm text-slate-400">
              {isRegister ? 'Al een account?' : 'Nog geen account?'}{' '}
              <button
                onClick={() => { setIsRegister(!isRegister); setError('') }}
                className="text-violet-400 font-medium hover:text-violet-300 transition-colors"
              >
                {isRegister ? 'Inloggen' : 'Gratis registreren'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Veilige verbinding · 256-bit encryptie
        </p>
      </div>
    </main>
  )
}
