// src/app/missions/page.tsx
export const revalidate = 3600

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
  success: boolean
  webcast?: string
}

async function getData() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/x-updates`, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error('Failed to fetch')

    const { posts } = await res.json()

    // Deduplicate missions by date
    const missionsByDate: Record<string, Launch> = {}

    ;(posts as XPost[])
      .filter((p: XPost) => p.type === 'launch' || p.type === 'starlink')
      .forEach((p: XPost) => {
        const dateKey = new Date(p.date).toISOString().split('T')[0] // YYYY-MM-DD

        if (!missionsByDate[dateKey]) {
          missionsByDate[dateKey] = {
            name: p.content.split(' launches')[0] || p.content.split(' satellites')[0] || 'Falcon 9 Mission',
            date_utc: p.date + 'T00:00:00.000Z',
            rocket: p.content.includes('Starship') ? 'Starship' : 'Falcon 9',
            achievement: p.content.includes('Starlink')
              ? 'Starlink deployment'
              : 'Orbital mission',
            success: true,
            webcast: 'https://youtube.com/spacex',
          }
        }
      })

    const recent = Object.values(missionsByDate).sort(
      (a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime()
    )

    return { recent }
  } catch (error) {
    console.log('Using fallback data')
    return {
      recent: [
        {
          name: 'Falcon 9 – Transporter-15 Rideshare',
          date_utc: '2025-11-26T18:18:00.000Z',  // NET Nov 26, 6:18 p.m. UTC
          rocket: 'Falcon 9',
          achievement: 'Dozens of CubeSats to SSO',
          success: null,
          webcast: 'https://youtube.com/spacex',
        },
        {
          name: 'Falcon 9 – Starlink Group 6-79',
          date_utc: '2025-11-22T07:53:00.000Z',
          rocket: 'Falcon 9',
          achievement: '29 satellites + 150th launch of 2025',
          success: true,
        },
        {
          name: 'Falcon 9 – Starlink from Vandenberg',
          date_utc: '2025-11-23T05:54:00.000Z',
          rocket: 'Falcon 9',
          achievement: '28 satellites deployed',
          success: true,
        },
      ],
    }
  }
}

export default async function MissionsPage() {
  const { recent } = await getData()
  const next = recent[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      {/* NEXT LAUNCH HERO */}
      {next && (
        <section className="relative overflow-hidden py-32 px-6">
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-transparent" />
          <div className="relative max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Next Launch</h1>
            <p className="text-4xl md:text-6xl font-bold mb-6">{next.name}</p>
            <p className="text-2xl md:text-3xl text-red-400 mb-10 font-light">
              {new Date(next.date_utc).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <a
              href={next.webcast}
              className="inline-block bg-red-600 hover:bg-red-500 px-16 py-6 rounded-full text-2xl font-bold transition-all hover:scale-105 shadow-2xl"
            >
              Watch Live 🚀
            </a>
          </div>
        </section>
      )}

      {/* RECENT LAUNCHES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Recent Launches</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {recent.slice(1).map((l) => (  // Skip next, show recent
            <div
              key={l.date_utc}
              className="group bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-8 hover:border-red-800/50 transition-all"
            >
              <h3 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition">
                {l.name}
              </h3>
              <p className="text-gray-400 mb-3">
                {new Date(l.date_utc).toLocaleDateString()}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm bg-zinc-800 px-4 py-1 rounded-full">{l.rocket}</span>
                <span className="text-green-400 text-sm">{l.achievement}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MILESTONES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-20">Major Milestones (2006–2025)</h2>
        <div className="space-y-16">
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32">
              <div className="text-4xl font-bold text-red-500">2008</div>
              <div className="text-gray-500">Sep 28</div>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Falcon 1 Flight 4</h3>
              <p className="text-xl text-gray-300 leading-relaxed">First privately funded liquid rocket to orbit</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="bg-zinc-800 px-5 py-2 rounded-full text-sm">Falcon 1</span>
              </div>
            </div>
          </div>
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32">
              <div className="text-4xl font-bold text-red-500">2015</div>
              <div className="text-gray-500">Dec 21</div>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">First Booster Landing</h3>
              <p className="text-xl text-gray-300 leading-relaxed">Orbital-class rocket returns to launch site</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="bg-zinc-800 px-5 py-2 rounded-full text-sm">Falcon 9 v1.1</span>
              </div>
            </div>
          </div>
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32">
              <div className="text-4xl font-bold text-red-500">2018</div>
              <div className="text-gray-500">Feb 6</div>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Falcon Heavy Demo</h3>
              <p className="text-xl text-gray-300 leading-relaxed">Tesla Roadster to heliocentric orbit</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="bg-zinc-800 px-5 py-2 rounded-full text-sm">Falcon Heavy</span>
              </div>
            </div>
          </div>
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32">
              <div className="text-4xl font-bold text-red-500">2020</div>
              <div className="text-gray-500">May 30</div>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Crew Dragon Demo-2</h3>
              <p className="text-xl text-gray-300 leading-relaxed">First crewed US orbital flight since Shuttle</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="bg-zinc-800 px-5 py-2 rounded-full text-sm">Falcon 9</span>
              </div>
            </div>
          </div>
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32">
              <div className="text-4xl font-bold text-red-500">2023</div>
              <div className="text-gray-500">Apr 20</div>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Starship IFT-1</h3>
              <p className="text-xl text-gray-300 leading-relaxed">First fully integrated Starship flight test</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="bg-zinc-800 px-5 py-2 rounded-full text-sm">Starship</span>
                <span className="bg-red-900/50 text-red-400 px-5 py-2 rounded-full text-sm">Failure</span>
              </div>
            </div>
          </div>
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32">
              <div className="text-4xl font-bold text-red-500">2025</div>
              <div className="text-gray-500">Oct 15</div>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Starship IFT-6</h3>
              <p className="text-xl text-gray-300 leading-relaxed">First successful booster catch by Mechazilla</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="bg-zinc-800 px-5 py-2 rounded-full text-sm">Starship</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-16 text-gray-500">
        Live from @SpaceX • Updated hourly • Don't Panic.
      </footer>
    </div>
  )
}