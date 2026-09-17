'use client'

import { createContext, useContext, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'

type ConsentState = 'accepted' | 'declined' | null

interface CookieConsentContextType {
  consent: ConsentState
  accept: () => void
  decline: () => void
  reset: () => void
}

const STORAGE_KEY = 'cookie-consent'

const CookieConsentContext = createContext<CookieConsentContextType | null>(null)

// A döntés a localStorage-ban él; useSyncExternalStore-ral olvassuk, így nincs setState effectben,
// és hydration közben a szerveroldali érték (null) érvényes, utána a mentett döntés.
const listeners = new Set<() => void>()
// Tartalék, ha a böngésző tiltja a tárolót (pl. privát mód): ebben a munkamenetben így is megmarad a döntés
let memory: ConsentState = null

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Másik fülön hozott döntés is frissítse az oldalt
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot(): ConsentState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'accepted' || stored === 'declined' ? stored : memory
  } catch {
    return memory
  }
}

function getServerSnapshot(): ConsentState {
  return null
}

function write(value: ConsentState) {
  memory = value
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Tiltott tároló: a memory-ben marad meg
  }
  listeners.forEach((l) => l())
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const accept = () => write('accepted')
  const decline = () => write('declined')
  const reset = () => write(null)

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
