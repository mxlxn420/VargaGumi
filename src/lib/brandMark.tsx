import { loadGoogleFont } from './googleFont'

// Dőlt Fraunces „V” tintakék, lekerekített alapon (favicon és apple-icon)
export function Mark({ size, radius = 0.25 }: { size: number; radius?: number }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1E3A5C',
        borderRadius: size * radius,
        color: '#F3EDE3',
        fontFamily: 'Fraunces',
        fontStyle: 'italic',
        fontWeight: 800,
        fontSize: size * 0.72,
        lineHeight: 1,
        paddingRight: size * 0.03,
        paddingTop: size * 0.02,
      }}
    >
      V
    </div>
  )
}

export async function iconFonts() {
  const data = await loadGoogleFont('Fraunces', 'ital,opsz,wght@1,9,800', 'V')
  return data ? [{ name: 'Fraunces', data, style: 'italic' as const, weight: 800 as const }] : []
}
