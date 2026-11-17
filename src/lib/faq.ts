// Gyakori kérdések: a GYIK szekció, a FAQPage strukturált adat és az llms.txt közös forrása.
// Csak megerősített tények kerülhetnek ide.
export type FaqItem = { q: string; a: string }

export const FAQ: FaqItem[] = [
  {
    q: 'Kell időpont a gumicseréhez?',
    a: 'Igen, gumicseréhez hívjon előre a (06 46) 796 692-es számon, és egyeztetünk időpontot.',
  },
  {
    q: 'Defekttel bejelentkezés nélkül is mehetek?',
    a: 'Igen. Defekttel és minden más szolgáltatással nyitvatartási időben bejelentkezés nélkül is jöhet.',
  },
  {
    q: 'SUV-ot és kisteherautót is vállalnak?',
    a: 'Igen, személyautók, SUV-ok és kisteherautók gumijait is szereljük és javítjuk.',
  },
  {
    q: 'Tárolják a gumimat?',
    a: 'Igen, szezonális gumitárolást is vállalunk: a nem használt garnitúrát megőrizzük a következő szezonig.',
  },
  {
    q: 'Lehet náluk új gumit venni?',
    a: 'Igen, új gumiabroncsot is vásárolhat nálunk, és helyben fel is szereljük. Méretért és elérhetőségért hívjon.',
  },
  {
    q: 'Kezelnek TPMS-t?',
    a: 'Igen, gumicserénél szelepet cserélünk, és kezeljük a guminyomás-érzékelőket (TPMS) is.',
  },
  {
    q: 'Hol tudok parkolni?',
    a: 'Az udvarunkon. A címünk: 3800 Szikszó, Kassai út 52.',
  },
  {
    q: 'Mikor vannak nyitva?',
    a: 'Hétfőtől péntekig 7 és 17 óra között, szombaton 7 és 12 óra között. Vasárnap zárva vagyunk.',
  },
]
