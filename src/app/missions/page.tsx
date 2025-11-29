// src/app/missions/page.tsx
export const revalidate = 86400

interface XPost {
  type: string
  content: string
  date: string
}

interface Launch {
  name: string
  date_utc: string
  rocket: string
  achievement: string
  success: boolean | null
  webcast?: string
}

// ──────────────────────────────────────────────────────────────
// Recent launches from X
// ──────────────────────────────────────────────────────────────
async function getData() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/x-updates`, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error('Failed')

    const { posts } = await res.json()

    const missionsByDate: Record<string, Launch> = {}

    ;(posts as XPost[])
      .filter((p) => p.type === 'launch' || p.type === 'starlink')
      .forEach((p) => {
        const dateKey = new Date(p.date).toISOString().split('T')[0]
        if (!missionsByDate[dateKey]) {
          missionsByDate[dateKey] = {
            name: p.content.split(' launches')[0] || p.content.split(' satellites')[0] || 'Falcon 9 Mission',
            date_utc: p.date + 'T00:00:00.000Z',
            rocket: p.content.includes('Starship') ? 'Starship' : 'Falcon 9',
            achievement: p.content.includes('Starlink') ? 'Starlink deployment' : 'Orbital mission',
            success: true,
            webcast: 'https://youtube.com/spacex',
          }
        }
      })

    const recent = Object.values(missionsByDate).sort(
      (a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime()
    )

    return { recent }
  } catch {
    console.log('Using fallback data')
    return {
      recent: [
        { name: 'Falcon 9 – Transporter-15 Rideshare', date_utc: '2025-11-26T18:18:00.000Z', rocket: 'Falcon 9', achievement: 'CubeSats to SSO', success: null, webcast: 'https://youtube.com/spacex' },
        { name: 'Falcon 9 – Starlink Group 6-79', date_utc: '2025-11-22T07:53:00.000Z', rocket: 'Falcon 9', achievement: '29 satellites', success: true },
        { name: 'Falcon 9 – Starlink from Vandenberg', date_utc: '2025-11-23T05:54:00.000Z', rocket: 'Falcon 9', achievement: '28 satellites', success: true },
      ],
    }
  }
}

// ──────────────────────────────────────────────────────────────
// Total launches by rocket
// ──────────────────────────────────────────────────────────────
async function getLaunchCounts() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/launches/counts`, { next: { revalidate: 86400 } })
    if (res.ok) return await res.json()
  } catch {}
  return { falcon1: 5, falcon9: 412, falconHeavy: 11, starship: 7 }
}

// ──────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────
export default async function MissionsPage() {
  const { recent } = await getData()
  const counts = await getLaunchCounts()
  const next = recent[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      {/* 1. LAUNCH COUNTER SQUARES – TOP */}
      <section className="py-20 px-6">
        <h2 className="text-center text-4xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Total Launches by Rocket
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="aspect-square bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl flex flex-col items-center justify-center hover:border-red-700/60 transition">
            <div className="text-6xl md:text-7xl font-black text-red-500">{counts.falcon1}</div>
            <p className="mt-3 text-lg md:text-xl text-gray-300">Falcon 1</p>
          </div>

          <div className="aspect-square bg-gradient-to-br from-cyan-900/30 to-zinc-900 border border-cyan-700/50 rounded-3xl flex flex-col items-center justify-center hover:border-cyan-500/70 transition shadow-2xl">
            <div className="text-7xl md:text-8xl font-black text-cyan-400 drop-shadow-lg">{counts.falcon9}</div>
            <p className="mt-3 text-xl md:text-2xl font-bold text-gray-200">Falcon 9</p>
          </div>

          <div className="aspect-square bg-gradient-to-br from-orange-900/30 to-zinc-900 border border-orange-700/50 rounded-3xl flex flex-col items-center justify-center hover:border-orange-500/70 transition">
            <div className="text-6xl md:text-7xl font-black text-orange-500">{counts.falconHeavy}</div>
            <p className="mt-3 text-lg md:text-xl text-gray-300">Falcon Heavy</p>
          </div>

          <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-black border border-purple-700/50 rounded-3xl flex flex-col items-center justify-center hover:border-purple-500/70 transition">
            <div className="text-6xl md:text-7xl font-black text-purple-400">{counts.starship}</div>
            <p className="mt-3 text-lg md:text-xl text-gray-300">Starship</p>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-10">Updated daily</p>
      </section>

      {/* 2. NEXT LAUNCH HERO */}
      {next && (
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-transparent" />
          <div className="relative max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Next Launch</h1>
            <p className="text-4xl md:text-6xl font-bold mb-6">{next.name}</p>
            <p className="text-2xl md:text-3xl text-red-400 mb-10">
              {new Date(next.date_utc).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <a href={next.webcast} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-500 px-16 py-6 rounded-full text-2xl font-bold transition-all hover:scale-105 shadow-2xl">
              Watch Live
            </a>
          </div>
        </section>
      )}

      {/* 3. RECENT LAUNCHES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Recent Launches</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {recent.slice(1).map((l) => (
            <div key={l.date_utc} className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-red-800/50 transition-all">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-red-400">{l.name}</h3>
              <p className="text-gray-400 mb-3">{new Date(l.date_utc).toLocaleDateString()}</p>
              <div className="flex justify-between">
                <span className="bg-zinc-800 px-4 py-1 rounded-full text-sm">{l.rocket}</span>
                <span className="text-green-400 text-sm">{l.achievement}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MILESTONES – FULLY RESTORED */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-20">Major Milestones (2006–2025)</h2>
        <div className="space-y-16">
          {/* 2008 – Falcon 1 */}
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2008</div><div className="text-gray-500">Sep 28</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">Falcon 1 Flight 4</h3><p className="text-xl text-gray-300">First privately funded liquid rocket to orbit</p></div>
          </div>

          {/* 2015 – First Landing */}
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2015</div><div className="text-gray-500">Dec 21</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">First Booster Landing</h3><p className="text-xl text-gray-300">Orbital-class rocket returns to launch site</p></div>
          </div>

          {/* 2018 – Falcon Heavy */}
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2018</div><div className="text-gray-500">Feb 6</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">Falcon Heavy Demo</h3><p className="text-xl text-gray-300">Tesla Roadster to heliocentric orbit</p></div>
          </div>

          {/* 2020 – Crew Dragon */}
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2020</div><div className="text-gray-500">May 30</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">Crew Dragon Demo-2</h3><p className="text-xl text-gray-300">First crewed US orbital flight since Shuttle</p></div>
          </div>

          {/* 2023 – IFT-1 */}
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2023</div><div className="text-gray-500">Apr 20</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">Starship IFT-1</h3><p className="text-xl text-gray-300">First fully integrated Starship flight test</p></div>
          </div>

          {/* 2025 – IFT-6 Booster Catch */}
          <div className="flex gap-10 items-center">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2025</div><div className="text-gray-500">Oct 15</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">Starship IFT-6</h3><p className="text-xl text-gray-300">First successful booster catch by Mechazilla</p></div>
          </div>
        </div>
      </section>

      <footer className="text-center py-16 text-gray-500">
        Live from @SpaceX • Updated hourly • Don't Panic.
      </footer>
    </div>
  )
}