'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type ConsentState = 'accepted' | 'declined' | null

interface CookieConsentContextType {
  consent: ConsentState
  accept: () => void
  decline: () => void
  reset: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(null)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent') as ConsentState
    if (stored) setConsent(stored)
  }, [])

  const accept = () => {
    setConsent('accepted')
    localStorage.setItem('cookie-consent', 'accepted')
  }

  const decline = () => {
    setConsent('declined')
    localStorage.setItem('cookie-consent', 'declined')
  }

  const reset = () => {
    setConsent(null)
    localStorage.removeItem('cookie-consent')
  }

  return (
    <CookieConsentContext.Provider value={{ consent, accept, decline, reset }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used inside CookieConsentProvider')
  return ctx
}
