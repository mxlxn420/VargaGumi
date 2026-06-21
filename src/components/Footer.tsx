'use client'

import { useState } from 'react'
import { useCookieConsent } from '@/context/CookieConsentContext'

export function Footer() {
  const { reset } = useCookieConsent()
  const [showPrivacy, setShowPrivacy] = useState(false)

  const scrollTo = (id: string) => {
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr',
            gap: 'clamp(32px, 5vw, 80px)',
            padding: 'clamp(60px, 8vw, 100px) 0 clamp(40px, 5vw, 60px)',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display), serif', fontWeight: 900, fontSize: '22px', letterSpacing: '0.03em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '16px', lineHeight: 1 }}>
              VARGA <span style={{ color: 'var(--accent)' }}>GUMI</span>
            </div>
            <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.75, maxWidth: '240px', marginBottom: '20px' }}>
              Prémium gumiszerviz Szikszón.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="var(--accent)">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.06em' }}>4.6 · 69 értékelés</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <FTitle>Elérhetőség</FTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FLine>3800 Szikszó, Kassai út 52.</FLine>
              <FLine><a href="tel:+3646796692" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}>(06 46) 796 692</a></FLine>
              <FLine><a href="mailto:anibalkftiroda@gmail.com" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}>anibalkftiroda@gmail.com</a></FLine>
              <div style={{ marginTop: '8px' }}>
                <FLine>H–P: 07:00 – 17:00</FLine>
                <FLine>Szo: 07:00 – 12:00</FLine>
                <FLine style={{ color: 'var(--text-muted)' }}>Vasárnap: Zárva</FLine>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div>
            <FTitle>Navigáció</FTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { label: 'Főoldal', id: 'top' },
                { label: 'Szolgáltatások', id: 'services' },
                { label: 'Rólunk', id: 'about' },
                { label: 'Vélemények', id: 'reviews' },
                { label: 'Kapcsolat', id: 'contact' },
              ].map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)}
                  style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '13px', color: 'var(--text-dim)', textAlign: 'left', padding: '4px 0', lineHeight: 2, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--border)', padding: 'clamp(24px, 3vw, 32px) 0' }}>
          <div style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.06em', lineHeight: 1.8, marginBottom: '16px' }}>
            <strong style={{ color: 'var(--text-dim)' }}>Anibal Kft.</strong> &nbsp;·&nbsp; Adószám: 12816833-2-05 &nbsp;·&nbsp; Cégjegyzékszám: 05-09-009532 &nbsp;·&nbsp; Székhely: 3800 Szikszó, Kassai út 52.
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>© 2025 Anibal Kft.</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              {[
                { label: 'Adatvédelmi tájékoztató', action: () => setShowPrivacy(true) },
                { label: 'Süti beállítások', action: reset },
              ].map((btn) => (
                <button key={btn.label} onClick={btn.action}
                  style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

function FTitle({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>{children}</div>
}

function FLine({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '13px', color: 'var(--text-dim)', letterSpacing: '0.04em', lineHeight: 1.6, ...style }}>{children}</div>
}

function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(12,11,10,0.88)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--surface)', border: '1px solid var(--border)', maxWidth: '600px', width: '100%', maxHeight: '80vh', overflow: 'auto', padding: 'clamp(32px, 5vw, 48px)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--text-dim)', fontSize: '18px', lineHeight: 1 }} aria-label="Bezárás">×</button>
        <h2 style={{ fontFamily: 'var(--font-display), serif', fontWeight: 900, fontSize: '28px', textTransform: 'uppercase', lineHeight: 1, color: 'var(--text)', marginBottom: '24px' }}>Adatvédelmi tájékoztató</h2>
        <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '16px' }}><strong style={{ color: 'var(--text)' }}>Adatkezelő:</strong> Anibal Kft., 3800 Szikszó, Kassai út 52. · E-mail: anibalkftiroda@gmail.com · Adószám: 12816833-2-05</p>

          <p style={{ marginBottom: '16px' }}><strong style={{ color: 'var(--text)' }}>Kezelt adatok és cél:</strong> Az oldalon kizárólag Google Maps megjelenítéséhez használunk harmadik féltől (Google LLC) származó sütit (cookie-t). A Google Maps betöltésekor a Google saját adatvédelmi szabályzata szerint adatokat gyűjthet (pl. IP-cím, böngésző adatok). Egyéb személyes adat kezelése nem történik. A Google adatvédelmi tájékoztatója: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>policies.google.com/privacy</a></p>

          <p style={{ marginBottom: '16px' }}><strong style={{ color: 'var(--text)' }}>Jogalap:</strong> Az Ön önkéntes hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont).</p>

          <p style={{ marginBottom: '16px' }}><strong style={{ color: 'var(--text)' }}>Adatmegőrzés:</strong> A hozzájárulás tényét a böngésző helyi tárolójában (localStorage) rögzítjük. Az adat a böngésző adatainak törléséig marad, vagy az Ön által bármikor visszavonható.</p>

          <p style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--text)' }}>Az Ön jogai (GDPR 15–21. cikk):</strong></p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            {[
              'Hozzáférés joga – tájékoztatást kérhet az Önről kezelt adatokról',
              'Helyesbítés joga – kérheti a pontatlan adatok javítását',
              'Törlés joga – kérheti adatai törlését („elfeledtetéshez való jog")',
              'Adathordozhatóság joga – kérheti adatai géppel olvasható formában való kiadását',
              'Tiltakozás joga – tiltakozhat adatai kezelése ellen',
              'Korlátozás joga – kérheti az adatkezelés korlátozását',
            ].map((item, i) => (
              <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
            ))}
          </ul>
          <p style={{ marginBottom: '8px' }}>Jogait az adatkezelő e-mail-címén (anibalkftiroda@gmail.com) gyakorolhatja.</p>

          <p style={{ marginBottom: '16px' }}><strong style={{ color: 'var(--text)' }}>Panasz:</strong> Ha úgy ítéli meg, hogy adatkezelésünk sérti a GDPR-t, panaszt nyújthat be a felügyeleti hatósághoz: <strong style={{ color: 'var(--text)' }}>Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)</strong> · 1055 Budapest, Falk Miksa u. 9–11. · <a href="https://naih.hu" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>naih.hu</a></p>

          <p><strong style={{ color: 'var(--text)' }}>Visszavonás:</strong> Hozzájárulását bármikor visszavonhatja a „Süti beállítások" gombbal az oldal alján. A visszavonás nem érinti a korábbi hozzájáruláson alapuló adatkezelés jogszerűségét.</p>
        </div>
      </div>
    </div>
  )
}
