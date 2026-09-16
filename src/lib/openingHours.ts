// Nyitvatartás: H–P 07–17, Szo 07–12, V zárva (Europe/Budapest idő szerint)
// Index: 0 = vasárnap … 6 = szombat
export const OPENING_HOURS: ([number, number] | null)[] = [
  null,
  [7, 17],
  [7, 17],
  [7, 17],
  [7, 17],
  [7, 17],
  [7, 12],
]

const DAY_NAMES = ['vasárnap', 'hétfőn', 'kedden', 'szerdán', 'csütörtökön', 'pénteken', 'szombaton']
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export type OpenStatus = { open: boolean; label: string }

function budapestNow(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Budapest',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return {
    day: WEEKDAYS.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

// Aktuális nap (0 = vasárnap) és perc budapesti idő szerint
export function getBudapestTime(date = new Date()) {
  return budapestNow(date)
}

export function getOpenStatus(date = new Date()): OpenStatus {
  const { day, minutes } = budapestNow(date)
  const today = OPENING_HOURS[day]

  if (today && minutes >= today[0] * 60 && minutes < today[1] * 60) {
    return { open: true, label: `Nyitva ${today[1]}:00-ig` }
  }

  if (today && minutes < today[0] * 60) {
    return { open: false, label: `Zárva · ma ${today[0]}:00-kor nyit` }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = (day + offset) % 7
    const hours = OPENING_HOURS[next]
    if (!hours) continue
    const when = offset === 1 ? 'holnap' : DAY_NAMES[next]
    return { open: false, label: `Zárva · ${when} ${hours[0]}:00-kor nyit` }
  }

  return { open: false, label: 'Zárva' }
}
