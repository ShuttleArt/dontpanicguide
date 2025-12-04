// src/app/page.tsx
import Link from 'next/link'
import { getSpaceXData } from '@/lib/spacex-data'

export const revalidate = 300

// Starship-era payload projections (tons/year) — tweak if you want
const starshipProjections: Record<number, number> = {
  2026: 5000,
  2027: 15000,
  2028: 30000,
  2029: 50000,
  2030: 100000,
  2031: 180000,
  2032: 280000,
  2033: 400000,
  2034: 550000,
  2035: 750000,
  2040: 2000000,
  2050: 10000000,
}

export default async function Home() {
  // Fallback in case your ISP blocks the API (looking at you, Telekom)
  let data: any = {
    nextLaunch: null,
    totalLaunches: 579,
    starlinkSats: 10501,
    allLaunches: [],
  }

  try {
    data = await getSpaceXData()
  } catch (e) {
    console.log('API unreachable — using fallback data')
  }

  const { nextLaunch, totalLaunches, starlinkSats, allLaunches } = data

  // ─────────────────────────────────────────────────────────────
  // 100% FUTURE-PROOF: Real launches & payload per year
  // ─────────────────────────────────────────────────────────────
  const launchesByYear: Record<number, number> = {}
  const payloadByYear: Record<number, number> = {}

  allLaunches?.forEach((launch: any) => {
    if (!launch.date_utc) return
    const year = new Date(launch.date_utc).getFullYear()

    // Count launches
    launchesByYear[year] = (launchesByYear[year] || 0) + 1

    // Calculate payload mass (tons)
    const massKg =
      launch.payloads?.reduce((sum: number, p: any) => {
        if (!p?.mass_kg && launch.name.toLowerCase().includes('starlink')) {
          // Estimate Starlink satellites
          return sum + (launch.name.includes('v2') ? 850 : 307)
        }
        return sum + (p?.mass_kg || 0)
      }, 0) || 0

    payloadByYear[year] = (payloadByYear[year] || 0) + massKg / 1000
  })

  // Generate list of years to display: 2008 → current year + 5 future years
  const currentYear = new Date().getFullYear()
  const displayYears: number[] = []
  for (let y = 2008; y <= currentYear + 5; y++) {
    displayYears.push(y)
  }

  // Max values for bar scaling
  const maxLaunches = Math.max(...Object.values(launchesByYear), 200)
  const maxPayload = Math.max(...Object.values(payloadByYear), 10000)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      {/* 1. LAUNCHES PER YEAR — GROWS FOREVER */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Launches per Year
          </h2>
          <div className="space-y-3">
            {displayYears.map((year) => (
              <div key={year} className="flex items-center gap-5">
                <div className="w-16 text-right text-xl font-bold text-gray-400">
                  {year === currentYear && <span className="text-green-400 animate-pulse text-sm">LIVE </span>}
                  {year}
                </div>
                <div className="flex-1 relative h-12 bg-zinc-900/70 rounded-xl overflow-hidden border border-zinc-800">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-1000"
                    style={{ width: `${((launchesByYear[year] || 0) / maxLaunches) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-end pr-6">
                    <span className="text-2xl font-black text-white drop-shadow-lg">
                      {launchesByYear[year] || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PAYLOAD TO ORBIT — GROWS FOREVER */}
      <section className="py-12 px-6 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Payload to Orbit (tons/year)
          </h2>
          <div className="space-y-3">
            {displayYears.map((year) => {
              const tons = Math.round(payloadByYear[year] || 0)
              return (
                <div key={year} className="flex items-center gap-5">
                  <div className="w-16 text-right text-xl font-bold text-gray-400">
                    {year === currentYear && <span className="text-green-400 animate-pulse text-sm">LIVE </span>}
                    {year}
                  </div>
                  <div className="flex-1 relative h-12 bg-zinc-900/70 rounded-xl overflow-hidden border border-zinc-800">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000"
                      style={{ width: `${(tons / maxPayload) * 100}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-end pr-6">
                      <span className="text-2xl font-black text-white drop-shadow-lg">
                        {tons >= 1000 ? `${(tons / 1000).toFixed(1)}k` : tons}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HERO STATS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center bg-gradient-to-br from-red-900/20 to-zinc-900 border border-red-800/40 rounded-3xl p-10 hover:border-red-600 transition group">
            <div className="text-6xl md:text-7xl font-black text-red-500">{starlinkSats.toLocaleString()}</div>
            <p className="mt-4 text-lg text-gray-300">Starlink Launched</p>
            <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition">
              {nextLaunch?.name?.toLowerCase().includes('starlink') ? '+ Next batch soon' : '+ Next mission'}
            </p>
          </div>

          <div className="text-center bg-gradient-to-br from-cyan-900/20 to-zinc-900 border border-cyan-800/40 rounded-3xl p-10 hover:border-cyan-600 transition">
            <div className="text-6xl md:text-7xl font-black text-cyan-400">{totalLaunches}</div>
            <p className="mt-4 text-lg text-gray-300">Total Launches</p>
          </div>

          <div className="text-center bg-gradient-to-br from-purple-900/20 to-zinc-900 border border-purple-800/40 rounded-3xl p-10 hover:border-purple-600 transition">
            <div className="text-6xl md:text-7xl font-black text-purple-400">31×</div>
            <p className="mt-4 text-lg text-gray-300">Most Reused Booster</p>
          </div>

          <div className="text-center bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-800/40 rounded-3xl p-10 hover:border-green-600 transition">
            <div className="text-6xl md:text-7xl font-black text-green-400">8M+</div>
            <p className="mt-4 text-lg text-gray-300">Starlink Users</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">
          So long, and thanks for all the launches
        </h2>
        <Link
          href="/missions"
          className="inline-block bg-red-600 hover:bg-red-500 px-12 py-4 rounded-full text-2xl font-bold transition hover:scale-105 shadow-2xl"
        >
          Explore Missions →
        </Link>
      </div>

      {/* STARSHIP PAYLOAD PROJECTIONS — EPIC SECTION */}
      <section className="py-24 px-6 bg-gradient-to-b from-zinc-950 via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-5xl md:text-8xl font-black mb-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Starship Era<br />Projected Payload to Orbit
          </h2>
          <div className="space-y-6 max-w-5xl mx-auto">
            {Object.entries(starshipProjections).map(([year, tons]) => {
              const kTons = tons / 1000
              return (
                <div key={year} className="flex items-center gap-8">
                  <div className="w-24 text-right">
                    <div className="text-4xl font-bold text-purple-300">{year}</div>
                    <div className="text-sm text-purple-500">projected</div>
                  </div>
                  <div className="flex-1 relative h-20 bg-zinc-900/50 rounded-2xl overflow-hidden border border-purple-800/30">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-90 transition-all duration-1500"
                      style={{ width: `${Math.min((kTons / 10000) * 100, 100)}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-end pr-10">
                      <span className="text-4xl font-black text-white drop-shadow-2xl">
                        {kTons.toLocaleString()}k tons
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-center text-gray-400 mt-16 text-xl max-w-4xl mx-auto">
            When Starship reaches fleet scale — hundreds to thousands of launches per year —
            humanity will send <strong>millions of tons</strong> to orbit annually.<br />
            Mars stops being science fiction.
          </p>
        </div>
      </section>

      <footer className="text-center py-12 text-gray-500 border-t border-zinc-800">
        Live from api.spacexdata.com • Real data + realistic projections • Built to last forever • Don’t Panic.
      </footer>
    </div>
  )
}