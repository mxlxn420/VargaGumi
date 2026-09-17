import { ImageResponse } from 'next/og'
import { Mark, iconFonts } from '@/lib/brandMark'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// iOS maga kerekíti a sarkokat, ezért itt szögletes az alap
export default async function AppleIcon() {
  return new ImageResponse(<Mark size={size.width} radius={0} />, {
    ...size,
    fonts: await iconFonts(),
  })
}
