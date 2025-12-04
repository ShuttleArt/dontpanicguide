// src/app/KonamiListener.tsx
'use client'

import { useEffect } from 'react'

export default function KonamiListener() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/konami-js@1.0.0/dist/konami.min.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      // @ts-ignore
      new window.Konami(() => {
        const style = 'font-size: 5rem; font-weight: bold; color: #ff3366; text-shadow: 0 0 30px #ff3366;'
        console.log('%c４２', style)
        alert('🪐 ４２ – The Answer to Life, the Universe, and Everything 🪐\n\nYou found the secret. Don’t Panic.')
      })
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return null
}