// src/app/page.tsx
import Link from 'next/link'
import { getSpaceXData } from '@/lib/spacex-data'

export const revalidate = 300

export default async function Home() {
  const data = await getSpaceXData()
  const { nextLaunch, totalLaunches, starlinkSats, allLaunches } = data

  // === REAL LAUNCHES PER YEAR (2008 → forever) ===
  const launchesByYear: Record<number, number> = {}
  allLaunches.forEach((launch: any) => {
    if (!launch.date_utc) return
    const year = new Date(launch.date_utc).getFullYear()
    launchesByYear[year] = (launchesByYear[year] || 0) + 1
  })

  // Generate years: 2008 → current + 5 future
  const currentYear = new Date().getFullYear()
  const allYears: number[] = []
  for (let y = 2008; y <= currentYear + 5; y++) allYears.push(y)

  const maxLaunches = Math.max(...Object.values(launchesByYear), 200)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      {/* LAUNCHES PER YEAR – GROWS FOREVER */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Launches per Year
          </h2>
          <div className="space-y-2">
            {allYears.map(year => (
              <div key={year} className="flex items-center gap-4">
                <div className="w-14 text-right text-lg font-bold text-gray-500">
                  {year === currentYear && <span className="text-green-400 animate-pulse">LIVE</span>}
                  {year}
                </div>
                <div className="flex-1 relative h-10 bg-zinc-900/70 rounded overflow-hidden border border-zinc-800">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-1000"
                    style={{ width: `${((launchesByYear[year] || 0) / maxLaunches) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-end pr-4">
                    <span className="text-xl font-black text-white drop-shadow-sm">
                      {launchesByYear[year] || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYLOAD TO ORBIT – GROWS FOREVER */}
      <section className="py-8 px-6 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Payload to Orbit (tons/year)
          </h2>
          <div className="space-y-2">
            {allYears.map(year => {
              const payload = Math.round(realPayloadByYear[year] || 0)
              return (
                <div key={year} className="flex items-center gap-4">
                  <div className="w-14 text-right text-lg font-bold text-gray-500">
                    {year === currentYear && <span className="text-green-400 animate-pulse">LIVE</span>}
                    {year}
                  </div>
                  <div className="flex-1 relative h-10 bg-zinc-900/70 rounded overflow-hidden border border-zinc-800">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-blue-500 transition-all duration-1000"
                      style={{ width: `${(payload / maxPayload) * 100}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-end pr-4">
                      <span className="text-xl font-black text-white drop-shadow-sm">
                        {payload >= 1000 ? `${(payload / 1000).toFixed(1)}k` : payload}
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