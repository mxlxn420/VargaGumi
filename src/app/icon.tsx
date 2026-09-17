import { ImageResponse } from 'next/og'
import { Mark, iconFonts } from '@/lib/brandMark'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default async function Icon() {
  return new ImageResponse(<Mark size={size.width} />, {
    ...size,
    fonts: await iconFonts(),
  })
}
