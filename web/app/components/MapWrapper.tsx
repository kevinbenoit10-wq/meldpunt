'use client'

import dynamic from 'next/dynamic'

const MapBackground = dynamic(() => import('./MapBackground'), { ssr: false })

export default function MapWrapper() {
  return <MapBackground />
}
