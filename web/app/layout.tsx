import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import MapWrapper from "./components/MapWrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Alertix — Meldplatform",
  description: "Meld problemen in jouw buurt in Oost- en West-Vlaanderen",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-[#0B0D1A] relative">
        {/* Persistente kaartachtergrond — hermonteert nooit */}
        <MapWrapper />
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 1, background: 'rgba(11,13,26,0.55)' }}
        />
        {/* Pagina-inhoud */}
        <div className="relative z-[2]">
          {children}
        </div>
      </body>
    </html>
  )
}
