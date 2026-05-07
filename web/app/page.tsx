import Link from 'next/link'
import HomeHero from './components/HomeHero'


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
    <main className="min-h-screen relative flex flex-col">

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
        <Link href="/login" className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
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

          <HomeHero />
        </div>
      </div>
    </main>
  )
}
