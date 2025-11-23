// src/app/missions/page.tsx
export const revalidate = 3600

interface Launch {
  name: string
  date_utc: string
  rocket: string
  achievement: string
  success: boolean
  webcast?: string
}

async function getData() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/x-updates`, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error()
    const { posts } = await res.json()

    // Group by date to dedupe (one entry per day/mission)
    const missionsByDate = {}
    posts.filter(p => p.type === 'launch' || p.type === 'starlink').forEach(p => {
      const dateKey = new Date(p.date).toISOString().split('T')[0]  // YYYY-MM-DD
      if (!missionsByDate[dateKey]) {
        missionsByDate[dateKey] = {
          name: p.content.split(' launches')[0] || p.content.split(' satellites')[0],
          date_utc: p.date + 'T00:00:00.000Z',
          rocket: p.content.includes('Starship') ? 'Starship' : 'Falcon 9',
          achievement: p.content.includes('Starlink') ? `${p.content.includes('28') ? '28' : '29'} satellites deployed` : 'Orbital mission',
          success: true,
          webcast: 'https://youtube.com/spacex',
        }
      } else {
        // Merge if same date (e.g., add milestone like "150th")
        missionsByDate[dateKey].achievement += ` + ${p.content.includes('150th') ? '150th Falcon of 2025' : ''}`
      }
    })

    const recent = Object.values(missionsByDate).sort((a, b) => new Date(b.date_utc) - new Date(a.date_utc))  // Newest first

    return { recent }
  } catch {
    // Static fallback: Real unique recent missions from X
    return {
      recent: [
        { name: 'Falcon 9 – Starlink from California (28 sats)', date_utc: '2025-11-23T05:54:00.000Z', rocket: 'Falcon 9', achievement: 'Vandenberg launch + deployment', success: true, webcast: 'https://youtube.com/spacex' },
        { name: 'Falcon 9 – Starlink Group 6-79 from Florida (29 sats)', date_utc: '2025-11-22T07:53:00.000Z', rocket: 'Falcon 9', achievement: '150th Falcon of 2025 + booster landing', success: true, webcast: 'https://youtube.com/spacex' },
        { name: 'Falcon 9 – Starlink from Florida (29 sats)', date_utc: '2025-11-21T09:16:00.000Z', rocket: 'Falcon 9', achievement: 'Standard Starlink deployment', success: true, webcast: 'https://youtube.com/spacex' },
        { name: 'Falcon 9 – Sentinel-6B', date_utc: '2025-11-17T10:23:00.000Z', rocket: 'Falcon 9', achievement: '500th overall Falcon mission + LZ-4 landing', success: true, webcast: 'https://youtube.com/spacex' },
      ],
    }
  }
}

const milestones: Launch[] = [
  { name: 'Falcon 1 Flight 4', date_utc: '2008-09-28', rocket: 'Falcon 1', achievement: 'First privately funded liquid rocket to reach orbit', success: true },
  { name: 'First Booster Landing', date_utc: '2015-12-21', rocket: 'Falcon 9 v1.1', achievement: 'Historic orbital booster RTLS landing', success: true },
  { name: 'Falcon Heavy Demo', date_utc: '2018-02-06', rocket: 'Falcon Heavy', achievement: 'Tesla Roadster in space', success: true },
  { name: 'Crew Dragon Demo-2', date_utc: '2020-05-30', rocket: 'Falcon 9', achievement: 'First crewed US orbital flight since Shuttle', success: true },
  { name: 'Starship IFT-1', date_utc: '2023-04-20', rocket: 'Starship', achievement: 'First fully stacked orbital attempt', success: false },
  { name: 'Starship IFT-4', date_utc: '2024-06-05', rocket: 'Starship', achievement: 'Soft water landing both stages', success: true },
  { name: 'Polaris Dawn', date_utc: '2024-09-10', rocket: 'Falcon 9', achievement: 'First commercial spacewalk', success: true },
  { name: 'Starship IFT-6', date_utc: '2025-10-15', rocket: 'Starship', achievement: 'First booster catch by Mechazilla', success: true },
].reverse()

export default async function MissionsPage() {
  const { recent } = await getData()
  const next = recent[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      {/* NEXT LAUNCH – HERO */}
      {next && (
        <section className="relative overflow-hidden py-32 px-6">
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-transparent" />
          <div className="relative max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Next Launch</h1>
            <p className="text-4xl md:text-6xl font-bold mb-6">{next.name}</p>
            <p className="text-2xl md:text-3xl text-red-400 mb-10 font-light">
              {new Date(next.date_utc).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <a href={next.webcast} className="inline-block bg-red-600 hover:bg-red-500 px-16 py-6 rounded-full text-2xl font-bold transition-all hover:scale-105 shadow-2xl">
              Watch Live 🚀
            </a>
          </div>
        </section>
      )}

      {/* RECENT LAUNCHES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Recent Launches</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {recent.slice(0, 8).map((l) => (
            <div key={l.name} className="group bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-8 hover:border-red-800/50 transition-all">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition">{l.name}</h3>
              <p className="text-gray-400 mb-3">{new Date(l.date_utc).toLocaleDateString()}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm bg-zinc-800 px-4 py-1 rounded-full">{l.rocket}</span>
                <span className="text-green-400 text-sm">{l.achievement}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MILESTONES */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-20">Major Milestones (2006–2025)</h2>
        <div className="space-y-16">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-10 items-center border-b border-zinc-800 pb-16 last:border-0">
              <div className="text-right flex-shrink-0 w-32">
                <div className="text-4xl font-bold text-red-500">{new Date(m.date_utc).getFullYear()}</div>
                <div className="text-gray-500">{new Date(m.date_utc).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold mb-3">{m.name}</h3>
                <p className="text-xl text-gray-300 leading-relaxed">{m.achievement}</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="bg-zinc-800 px-5 py-2 rounded-full text-sm">{m.rocket}</span>
                  {!m.success && <span className="bg-red-900/50 text-red-400 px-5 py-2 rounded-full text-sm">Failure</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-16 text-gray-500">
        Live from @SpaceX • Updated hourly • Don’t Panic.
      </footer>
    </div>
  )
}