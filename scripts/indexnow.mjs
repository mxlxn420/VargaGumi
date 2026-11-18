// IndexNow: a sitemap összes URL-jét elküldi a Bingnek (és a többi IndexNow-keresőnek).
// A kulcs nyilvános (public/<kulcs>.txt), ezt az IndexNow így várja.
// Futtatás: npm run indexnow  (a GitHub Action minden éles deploy után futtatja)
const HOST = 'vargagumiszikszo.hu'
const KEY = '8cd4f897554dc21bf9e6de0ecfb8c245'
const SITE = `https://${HOST}`

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((r) => {
  if (!r.ok) throw new Error(`sitemap.xml: HTTP ${r.status}`)
  return r.text()
})
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
if (urlList.length === 0) throw new Error('A sitemap.xml-ben nincs URL')

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
})

console.log(`IndexNow: HTTP ${res.status} – ${urlList.length} URL`)
urlList.forEach((u) => console.log(`  ${u}`))
// 200 = elfogadva, 202 = elfogadva, a kulcs ellenőrzése folyamatban
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text())
  process.exit(1)
}
