import Link from 'next/link'
import MapWrapper from './components/MapWrapper'

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  )
}

function LocationPin({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="18" viewBox="0 0 14 18" fill="currentColor">
      <path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 11 7 11S14 12.25 14 7c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z" />
    </svg>
  )
}

function StickFigure() {
  return (
    <svg viewBox="0 0 130 175" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 200, height: 269 }}>
      {/* Alert badge — bounces up/down */}
      <g className="anim-alert-bounce">
        <circle cx="82" cy="20" r="13" fill="#EF4444" />
        <text x="82" y="26" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold" fontFamily="Arial, sans-serif">!</text>
      </g>

      {/* Head */}
      <circle cx="55" cy="54" r="18" fill="white" />

      {/* Body */}
      <line x1="55" y1="72" x2="55" y2="114" stroke="white" strokeWidth="3" strokeLinecap="round" />

      {/* Right arm — points up toward alert badge, waves */}
      <line x1="55" y1="84" x2="82" y2="46" stroke="white" strokeWidth="3" strokeLinecap="round" className="anim-arm-wave" />

      {/* Left arm — holds phone */}
      <line x1="55" y1="84" x2="22" y2="98" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Phone in left hand */}
      <rect x="10" y="93" width="13" height="20" rx="2" fill="white" opacity="0.9" />
      <rect x="12" y="96" width="9" height="12" rx="1" fill="#7C3AED" opacity="0.8" />

      {/* Left leg — spreads */}
      <line x1="55" y1="114" x2="32" y2="158" stroke="white" strokeWidth="3" strokeLinecap="round" className="anim-leg-left" />

      {/* Right leg — spreads */}
      <line x1="55" y1="114" x2="78" y2="158" stroke="white" strokeWidth="3" strokeLinecap="round" className="anim-leg-right" />
    </svg>
  )
}


export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0D1A] relative overflow-hidden flex flex-col">

      {/* Real Leaflet map background */}
      <MapWrapper />

      {/* Subtle purple glow behind figure */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '50%', left: '28%',
          transform: 'translate(-50%, -50%)',
          width: 420, height: 420,
          background: 'radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <header className="relative z-[2] px-8 py-5 flex justify-end">
        <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
          Inloggen
        </Link>
      </header>

      {/* Main content */}
      <div className="relative z-[2] flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: animated stick figure */}
          <div className="flex items-center justify-center">
            <div className="relative flex flex-col items-center">
              {/* Pulsing circle */}
              <div
                className="anim-pulse-ring rounded-full border-2 border-violet-700/50 flex items-center justify-center"
                style={{ width: 380, height: 380 }}
              >
                <StickFigure />
              </div>
            </div>
          </div>

          {/* Right: content in card */}
          <div className="flex flex-col gap-6 bg-[#0B0D1A]/75 backdrop-blur-sm border border-white/10 rounded-2xl p-8">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                <BellIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight">Alertix</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight">
              Meld problemen.<br />
              Maak het verschil.
            </h1>

            {/* Description */}
            <p className="text-slate-400 text-base leading-relaxed">
              Zie je iets mis in jouw buurt? Meld het direct bij je gemeente.
              Van putten in de weg tot kapotte verlichting — jouw meldingen houden de buurt veilig.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/melding/nieuw"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Melding doen
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Meldingen bekijken
              </Link>
            </div>

            {/* Divider + stats */}
            <div className="border-t border-slate-800/80 pt-5">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-2xl font-black text-white">2.5k+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Meldingen ingediend</p>
                </div>
                <LocationPin className="text-violet-600 opacity-70 shrink-0" />
                <div>
                  <p className="text-2xl font-black text-white">1.8k+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Problemen opgelost</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">98%</p>
                  <p className="text-xs text-slate-500 mt-0.5">Responstijd</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
