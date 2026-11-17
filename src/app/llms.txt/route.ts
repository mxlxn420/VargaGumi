// /llms.txt: rövid, AI-asszisztenseknek szóló összefoglaló a cégről. Csak megerősített tények.
import { FAQ } from '@/lib/faq'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

const body = `# Varga Gumi – Gumiszerviz Szikszón

> ${SITE_DESCRIPTION}

Gumiszerviz Szikszón (autószerviz nincs). Üzemeltető: Anibal Kft.

## Elérhetőség

- Cím: 3800 Szikszó, Kassai út 52.
- Telefon: (06 46) 796 692 (+36 46 796 692)
- E-mail: anibalkftiroda@gmail.com
- Nyitvatartás: hétfő–péntek 7–17, szombat 7–12, vasárnap zárva
- Parkolás: az udvaron
- Weboldal: ${SITE_URL}

## Időpont

Csak gumicseréhez kell telefonos időpont-egyeztetés. Defekttel és minden más szolgáltatással nyitvatartási időben bejelentkezés nélkül is lehet jönni.

## Szolgáltatások

- Gumiabroncs szerelése (személyautó, SUV, kisteherautó)
- Defektjavítás
- Centrírozás
- Futómű-beállítás
- Gumitárolás (szezonális)
- Új gumi értékesítés, helyszíni felszereléssel
- Szelepcsere és TPMS (guminyomás-érzékelők)

Árak nincsenek a weboldalon; árért, méretért és elérhetőségért telefonon lehet érdeklődni.

## Gyakori kérdések

${FAQ.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

## Oldalak

- [Főoldal](${SITE_URL}/): szolgáltatások, vélemények, GYIK, nyitvatartás és térkép
- [Adatvédelmi tájékoztató](${SITE_URL}/adatvedelem)
`

export function GET() {
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
