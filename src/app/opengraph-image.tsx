import { ImageResponse } from 'next/og'
import { loadGoogleFont } from '@/lib/googleFont'

export const alt = 'Varga Gumi – gumiszerviz Szikszón. Defekt? Hívjon, megoldjuk. (06 46) 796 692'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const BG = '#F3EDE3'
const TEXT = '#1F1A15'
const DIM = '#6B6154'
const ACCENT = '#1E3A5C'

const EYEBROW = 'Varga Gumi — Gumiszerviz Szikszón'
const PHONE = '(06 46) 796 692'
const ADDRESS = '· 3800 Szikszó, Kassai út 52.'

export default async function OpengraphImage() {
  const [display, displayItalic, body, bodyBold] = await Promise.all([
    loadGoogleFont('Fraunces', 'opsz,wght@144,800', 'Defekt?megoldjuk.'),
    loadGoogleFont('Fraunces', 'ital,opsz,wght@1,144,600', 'Hívjon,'),
    loadGoogleFont('Manrope', 'wght@600', EYEBROW + ADDRESS),
    loadGoogleFont('Manrope', 'wght@800', PHONE),
  ])

  const fonts = [
    display && { name: 'Fraunces', data: display, style: 'normal' as const, weight: 800 as const },
    displayItalic && { name: 'Fraunces', data: displayItalic, style: 'italic' as const, weight: 600 as const },
    body && { name: 'Manrope', data: body, style: 'normal' as const, weight: 600 as const },
    bodyBold && { name: 'Manrope', data: bodyBold, style: 'normal' as const, weight: 800 as const },
  ].filter((f) => f !== null)

  const treads = Array.from({ length: 36 }, (_, i) => i * 10)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          background: BG,
          fontFamily: 'Manrope',
          position: 'relative',
        }}
      >
        {/* Halvány gumi a jobb oldalon, mint a hero-ban */}
        <svg
          width="560"
          height="560"
          viewBox="0 0 400 400"
          style={{ position: 'absolute', right: -190, top: 36, opacity: 0.14 }}
        >
          <circle cx="200" cy="200" r="176" fill="none" stroke={ACCENT} strokeWidth="36" />
          {treads.map((deg) => (
            <rect
              key={deg}
              x="194"
              y="14"
              width="12"
              height="34"
              rx="3"
              fill={BG}
              transform={`rotate(${deg} 200 200)`}
            />
          ))}
          <circle cx="200" cy="200" r="118" fill="none" stroke={ACCENT} strokeWidth="6" />
          <circle cx="200" cy="200" r="34" fill="none" stroke={ACCENT} strokeWidth="6" />
          <circle cx="200" cy="200" r="12" fill={ACCENT} />
        </svg>

        <div style={{ display: 'flex', fontSize: 30, fontWeight: 600, color: DIM }}>{EYEBROW}</div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Fraunces',
            fontSize: 132,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            color: TEXT,
          }}
        >
          <span>Defekt?</span>
          <span style={{ display: 'flex' }}>
            <span style={{ fontStyle: 'italic', fontWeight: 600, color: ACCENT, marginRight: 28 }}>Hívjon,</span>
            megoldjuk.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 34 }}>
          <span style={{ fontWeight: 800, color: TEXT, marginRight: 14 }}>{PHONE}</span>
          <span style={{ fontWeight: 600, color: DIM }}>{ADDRESS}</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
