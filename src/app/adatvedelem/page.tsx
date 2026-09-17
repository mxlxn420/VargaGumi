import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { SubpageHeader } from '@/components/SubpageHeader'
import { CookieConsentBanner } from '@/components/CookieConsentBanner'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Adatvédelmi tájékoztató',
  alternates: { canonical: '/adatvedelem' },
  description: 'Hogyan kezeli a Varga Gumi (Anibal Kft.) weboldala az adatokat: tárhely, Google Térkép, sütik, kapcsolatfelvétel és az Ön jogai.',
}

const UPDATED = '2026. szeptember 17.'

const SECTIONS = [
  { id: 'adatkezelo', title: 'Adatkezelő' },
  { id: 'attekintes', title: 'Röviden' },
  { id: 'tarhely', title: 'Tárhely és szervernaplók' },
  { id: 'terkep', title: 'Google Térkép és sütik' },
  { id: 'tarolo', title: 'Böngésző helyi tárolója' },
  { id: 'kapcsolat', title: 'Telefonos és e-mailes megkeresés' },
  { id: 'jogok', title: 'Az Ön jogai' },
  { id: 'panasz', title: 'Jogorvoslat' },
]

export default function PrivacyPage() {
  return (
    <>
      <SubpageHeader />

      <main className={styles.main}>
        <div className="container">
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Jogi információk</p>
            <h1 className={styles.title}>
              Adatvédelmi <span className={styles.accent}>tájékoztató</span>
            </h1>
            <p className={styles.updated}>Hatályos: {UPDATED}</p>
          </div>

          <div className={styles.grid}>
            <nav className={styles.toc} aria-label="Tartalom">
              <p className={styles.tocTitle}>Tartalom</p>
              <ol>
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>
                      <span className={styles.tocNum}>{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className={styles.content}>
              <Section index={0}>
                <dl className={styles.facts}>
                  <div><dt>Név</dt><dd>Anibal Kft. (Varga Gumi)</dd></div>
                  <div><dt>Székhely</dt><dd>3800 Szikszó, Kassai út 52.</dd></div>
                  <div><dt>Cégjegyzékszám</dt><dd>05-09-009532</dd></div>
                  <div><dt>Adószám</dt><dd>12816833-2-05</dd></div>
                  <div><dt>E-mail</dt><dd><a href="mailto:anibalkftiroda@gmail.com">anibalkftiroda@gmail.com</a></dd></div>
                  <div><dt>Telefon</dt><dd><a href="tel:+3646796692">(06 46) 796 692</a></dd></div>
                </dl>
              </Section>

              <Section index={1}>
                <p>
                  A weboldal bemutatja a szervizt és elérhetőségeit. Nincs rajta regisztráció, kapcsolatfelvételi
                  űrlap, hírlevél, látogatottságmérő vagy hirdetési követőkód. A betűtípusokat a saját tárhelyünkről
                  töltjük be, nem külső szolgáltatótól.
                </p>
                <p>
                  Személyes adat három esetben kerülhet kezelésre: az oldal kiszolgálásakor keletkező technikai
                  naplókban, a Google Térkép betöltésekor, illetve ha telefonon vagy e-mailben megkeres minket.
                </p>
              </Section>

              <Section index={2}>
                <p>
                  A weboldalt a <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA)
                  tárhelyszolgáltató szolgálja ki, adatfeldolgozóként. Az oldal megnyitásakor a szerver automatikusan
                  rögzít technikai adatokat: IP-cím, időpont, a kért oldal címe, böngésző és eszköz típusa.
                </p>
                <ul>
                  <li><strong>Cél:</strong> az oldal működtetése, hibakeresés, visszaélések kiszűrése.</li>
                  <li><strong>Jogalap:</strong> jogos érdek (GDPR 6. cikk (1) f) pont).</li>
                  <li><strong>Időtartam:</strong> a tárhelyszolgáltató naplómegőrzési szabályai szerint, rövid ideig.</li>
                  <li>
                    <strong>Adattovábbítás:</strong> a szolgáltató az Európai Unión kívül (USA) is kezelhet adatot,
                    a saját adatfeldolgozási feltételei szerint. Részletek:{' '}
                    <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>
                  </li>
                </ul>
              </Section>

              <Section index={3}>
                <p>
                  A Kapcsolat részben beágyazott Google Térkép csak akkor töltődik be, ha a sütikre vonatkozó
                  tájékoztatón az „Elfogadom” gombot választja, vagy a térképnél a „Térkép betöltése” gombra kattint.
                  Addig a Google felé nem megy adat.
                </p>
                <p>
                  Betöltéskor a <strong>Google LLC</strong> sütiket helyezhet el, és megkaphatja többek között az
                  IP-címét és a böngésző adatait. Ezeket a Google saját adatkezelőként, a saját szabályai szerint kezeli:{' '}
                  <a href="https://policies.google.com/privacy?hl=hu" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>
                </p>
                <ul>
                  <li><strong>Jogalap:</strong> az Ön hozzájárulása (GDPR 6. cikk (1) a) pont).</li>
                  <li>
                    <strong>Visszavonás:</strong> bármikor, az oldal alján lévő „Süti beállítások” gombbal. A visszavonás
                    nem érinti a korábbi betöltések jogszerűségét.
                  </li>
                </ul>
                <p>
                  Az „Útvonal”, „Útvonaltervezés” és „Összes vélemény a Google-on” hivatkozások a Google oldalát nyitják
                  meg új lapon. Ott már a Google adatkezelési szabályai érvényesek.
                </p>
              </Section>

              <Section index={4}>
                <p>
                  A sütikre vonatkozó döntését („elfogadva” vagy „elutasítva”) a böngészője helyi tárolójában
                  (localStorage, <code>cookie-consent</code> kulcs) rögzítjük, hogy ne kérdezzük meg minden
                  látogatáskor. Ez az adat csak az Ön eszközén van, hozzánk nem jut el. Törölheti a böngésző
                  adatainak törlésével vagy a „Süti beállítások” gombbal.
                </p>
                <p>A „Térkép betöltése” gomb használatát nem tároljuk, az csak az adott megtekintésre szól.</p>
              </Section>

              <Section index={5}>
                <p>
                  Ha telefonon vagy e-mailben keres minket, a megadott adatokat (név, telefonszám vagy e-mail-cím,
                  az üzenet tartalma) a megkeresés megválaszolására és a szervizmunka egyeztetésére használjuk.
                </p>
                <ul>
                  <li>
                    <strong>Jogalap:</strong> szerződés megkötését megelőző lépések, illetve a szerződés teljesítése
                    (GDPR 6. cikk (1) b) pont), egyéb esetben jogos érdek (f) pont).
                  </li>
                  <li><strong>Időtartam:</strong> az ügy lezárásáig, illetve amíg jogszabály megőrzést ír elő.</li>
                  <li>
                    Az e-maileket a Google (Gmail) levelezőszolgáltatásán keresztül fogadjuk.
                  </li>
                </ul>
              </Section>

              <Section index={6}>
                <p>Az adatkezeléssel kapcsolatban Önt a következő jogok illetik meg (GDPR 15–22. cikk):</p>
                <ul>
                  <li><strong>Hozzáférés:</strong> tájékoztatást kérhet az Önről kezelt adatokról.</li>
                  <li><strong>Helyesbítés:</strong> kérheti a pontatlan adatok javítását.</li>
                  <li><strong>Törlés:</strong> kérheti adatai törlését.</li>
                  <li><strong>Korlátozás:</strong> kérheti az adatkezelés korlátozását.</li>
                  <li><strong>Adathordozhatóság:</strong> kérheti adatai géppel olvasható kiadását.</li>
                  <li><strong>Tiltakozás:</strong> tiltakozhat a jogos érdeken alapuló adatkezelés ellen.</li>
                  <li><strong>Hozzájárulás visszavonása:</strong> bármikor, következmények nélkül.</li>
                </ul>
                <p>
                  Kérését az <a href="mailto:anibalkftiroda@gmail.com">anibalkftiroda@gmail.com</a> címre küldheti.
                  Legfeljebb egy hónapon belül válaszolunk.
                </p>
              </Section>

              <Section index={7}>
                <p>Ha úgy érzi, hogy adatai kezelése jogsértő, panaszt tehet a felügyeleti hatóságnál:</p>
                <dl className={styles.facts}>
                  <div><dt>Hatóság</dt><dd>Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)</dd></div>
                  <div><dt>Cím</dt><dd>1055 Budapest, Falk Miksa utca 9–11.</dd></div>
                  <div><dt>Honlap</dt><dd><a href="https://naih.hu" target="_blank" rel="noopener noreferrer">naih.hu</a></dd></div>
                </dl>
                <p>Jogai megsértése esetén bírósághoz is fordulhat.</p>
              </Section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CookieConsentBanner />
    </>
  )
}

function Section({ index, children }: { index: number; children: React.ReactNode }) {
  const s = SECTIONS[index]
  return (
    <section id={s.id} className={styles.section} aria-labelledby={`${s.id}-title`}>
      <p className={styles.num} aria-hidden="true">{String(index + 1).padStart(2, '0')}</p>
      <div>
        <h2 id={`${s.id}-title`} className={styles.sectionTitle}>{s.title}</h2>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  )
}
