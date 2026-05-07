'use client'

import { useEffect, useRef } from 'react'

const MARKERS: [number, number][] = [
  [51.054, 3.717],   // Gent
  [51.209, 3.224],   // Brugge
  [50.828, 3.264],   // Kortrijk
  [50.938, 4.038],   // Aalst
  [51.162, 4.143],   // Sint-Niklaas
  [50.947, 3.123],   // Roeselare
  [51.028, 4.100],   // Dendermonde
  [50.851, 2.882],   // Ieper
  [50.850, 3.609],   // Oudenaarde
  [50.882, 3.425],   // Waregem
]

const PIN_SVG = `
  <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 6 8 14 8 14s8-8 8-14c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#7C3AED" opacity="0.8"/>
  </svg>
`

export default function MapBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import('leaflet').then((L) => {
      if (!containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        center: [51.0, 3.5],
        zoom: 10,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
        attributionControl: false,
        tap: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map)

      const icon = L.divIcon({
        html: PIN_SVG,
        className: '',
        iconSize: [16, 22],
        iconAnchor: [8, 22],
      })

      MARKERS.forEach(([lat, lng]) => {
        L.marker([lat, lng], { icon }).addTo(map)
      })

      mapRef.current = map
    })

    return () => {
      if (mapRef.current) {
        ;(mapRef.current as { remove: () => void }).remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div ref={containerRef} className="absolute inset-0 z-0" />
      {/* Dark overlay to blend with page color */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'rgba(11,13,26,0.55)' }} />
    </>
  )
}
