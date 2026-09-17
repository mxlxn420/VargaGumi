// Betűtípus letöltése a megosztási képhez / faviconhoz (a next/og TTF-et vár, a next/font woff2-t ad).
// Hiba esetén null: a kép ilyenkor alapértelmezett betűvel készül el, a build nem áll meg.
export async function loadGoogleFont(family: string, axes: string, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:${axes}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
    if (!src) return null
    const res = await fetch(src)
    return res.ok ? await res.arrayBuffer() : null
  } catch {
    return null
  }
}
