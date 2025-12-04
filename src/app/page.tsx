// src/app/page.tsx
import Link from 'next/link'
import { getSpaceXData } from '@/lib/spacex-data'

export const revalidate = 300

// Starship projections (unchanged)
const starshipProjections: Record<number, number> = {
  2026: 5000, 2027: 15000, 2028: 30000, 2029: 50000,
  2030: 100000, 2031: 180000, 2032: 280000, 2033: 400000,
  2034: 550000, 2035: 750000, 2040: 2000000, 2050: 10000000,
}

export default async function Home() {
  const data = await getSpaceXData()
  const { nextLaunch, totalLaunches, starlinkSats, allLaunches } = data

  // ─────────────────────── REAL DATA FOREVER ───────────────────────
  const launchesByYear: Record<number, number> = {}
  const payloadByYear: Record<number, number> = {}   // ← THIS WAS MISSING

  allLaunches.forEach((launch: any) => {
    if (!launch.date_utc) return
    const year = new Date(launch.date_utc).getFullYear()

    launchesByYear[year] = (launchesByYear[year] || 0) + 1

    const massKg = launch.payloads?.reduce((sum: number, p: any) => {
      if (!p?.mass_kg && launch.name.toLowerCase().includes('starlink')) {
        return sum + (launch.name.includes('v2') ? 850 : 307)
      }
      return sum + (p?.mass_kg || 0)
    }, 0) || 0

    payloadByYear[year] = (payloadByYear[year] || 0) + massKg / 1000
  })

  const currentYear = new Date().getFullYear()
  const displayYears: number[] = []
  for (let y = 2008; y <= currentYear + 5; y++) displayYears.push(y)

  const maxLaunches = Math.max(...Object.values(launchesByYear), 200)
  const maxPayload   = Math.max(...Object.values(payloadByYear), 10000)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      {/* 1. LAUNCHES PER YEAR – GROWS FOREVER */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Launches per Year
          </h2>
          <div className="space-y-3">
            {displayYears.map(year => (
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

      {/* 2. PAYLOAD TO ORBIT – GROWS FOREVER (now fixed) */}
      <section className="py-12 px-6 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Payload to Orbit (tons/year)
          </h2>
          <div className="space-y-3">
            {displayYears.map(year => {
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
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-900/20 to-zinc-900 border border-red-800/50 rounded-3xl p-8 hover:border-red-600 transition group">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-red-500">
              {starlinkSats.toLocaleString()}
            </div>
            <p className="mt-4 text-base md:text-lg font-medium text-gray-300">Starlink Launched</p>
            <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition">
              {nextLaunch?.name?.toLowerCase().includes('starlink') ? '+ Next batch' : '+ Next mission'}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-cyan-900/20 to-zinc-900 border border-cyan-800/50 rounded-3xl p-8 hover:border-cyan-600 transition">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-cyan-400">
              {totalLaunches}
            </div>
            <p className="mt-4 text-base md:text-lg font-medium text-gray-300">Total Launches</p>
          </div>

          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-zinc-900 border border-purple-800/50 rounded-3xl p-8 hover:border-purple-600 transition">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-purple-400">31×</div>
            <p className="mt-4 text-base md:text-lg font-medium text-gray-300">Most Reused Booster</p>
          </div>

          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-800/50 rounded-3xl p-8 hover:border-green-600 transition">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-green-400">8M+</div>
            <p className="mt-4 text-base md:text-lg font-medium text-gray-300">Starlink Users</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          So long, and thanks for all the launches
        </h2>
        <Link 
          href="/missions"
          className="inline-block bg-red-600 hover:bg-red-500 px-8 py-3 rounded-full text-lg font-bold transition hover:scale-105"
        >
          Explore Missions
        </Link>
      </div>

      {/* STARSHIP PROJECTIONS – AFTER CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-zinc-950/50 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-5xl md:text-7xl font-bold mb-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Starship Era: Projected Payload to Orbit
          </h2>
          <div className="space-y-4">
            {Object.entries(starshipProjections).map(([year, tons]) => {
              const kTons = tons / 1000
              return (
                <div key={year} className="flex items-center gap-6">
                  <div className="w-20 text-right text-2xl font-bold text-purple-300">
                    {year}
                    <span className="block text-sm text-purple-500">proj.</span>
                  </div>
                  <div className="flex-1 relative h-16 bg-zinc-900/60 rounded-xl overflow-hidden border border-purple-800/30">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-90 transition-all duration-1000"
                      style={{ width: `${Math.min((kTons / 10000) * 100, 100)}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-end pr-8">
                      <span className="text-3xl font-black text-white drop-shadow-2xl">
                        {kTons.toLocaleString()}k tons
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-center text-gray-400 mt-12 text-lg">
            When Starship scales — 1000+ launches/year — humanity sends <strong>millions of tons</strong> to orbit annually.<br />
            Mars stops being fiction.
          </p>
        </div>
      </section>

      <footer className="text-center py-8 text-gray-500 text-xs border-t border-zinc-800">
        Live from api.spacexdata.com • Real data + projections • Don't Panic.
      </footer>
    </div>
  )
}