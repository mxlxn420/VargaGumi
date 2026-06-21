'use client'

import { useState } from 'react'
import { useCookieConsent } from '@/context/CookieConsentContext'

export function CookieConsentBanner() {
  const { consent, accept, decline } = useCookieConsent()
  const [dismissed, setDismissed] = useState(false)

  if (consent !== null || dismissed) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        maxWidth: '420px',
        zIndex: 150,
        background: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        padding: '24px 28px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      }}
    >
      <div style={{ width: '20px', height: '1px', background: 'var(--accent)', marginBottom: '14px' }} />
      <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '20px' }}>
        Google Maps megjelenítéséhez sütiket használunk. Elfogadja?
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={accept}
          style={{
            fontFamily: 'var(--font-condensed), sans-serif', fontWeight: 600,
            fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--bg)', background: 'var(--accent)', padding: '10px 20px',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Elfogadom
        </button>
        <button
          onClick={() => { decline(); setDismissed(true) }}
          style={{
            fontFamily: 'var(--font-condensed), sans-serif', fontWeight: 600,
            fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-dim)', background: 'transparent',
            border: '1px solid var(--border)', padding: '10px 20px',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)' }}
        >
          Elutasítom
        </button>
      </div>
    </div>
  )
}
