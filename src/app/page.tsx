// src/app/page.tsx
import Link from 'next/link'

export const revalidate = 86400

const launchesByYear = [
  { year: 2008, launches: 1, payload: 0.165 },
  { year: 2009, launches: 1, payload: 0.335 },
  { year: 2010, launches: 2, payload: 0.5 },
  { year: 2012, launches: 2, payload: 0.9 },
  { year: 2013, launches: 3, payload: 4.2 },
  { year: 2014, launches: 6, payload: 10.9 },
  { year: 2015, launches: 7, payload: 24.1 },
  { year: 2016, launches: 8, payload: 27 },
  { year: 2017, launches: 18, payload: 88 },
  { year: 2018, launches: 21, payload: 130 },
  { year: 2019, launches: 21, payload: 137 },
  { year: 2020, launches: 26, payload: 240 },
  { year: 2021, launches: 31, payload: 385 },
  { year: 2022, launches: 61, payload: 1250 },
  { year: 2023, launches: 96, payload: 2100 },
  { year: 2024, launches: 138, payload: 3100 },
  { year: 2025, launches: 152, payload: 3600 },
]

const maxLaunches = Math.max(...launchesByYear.map(y => y.launches))
const maxPayload = Math.max(...launchesByYear.map(y => y.payload))

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      {/* LAUNCHES PER YEAR – ULTRA COMPACT */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Launches per Year
          </h2>
          <div className="space-y-2">
            {launchesByYear.map((item) => (
              <div key={item.year} className="flex items-center gap-4">
                <div className="w-14 text-right text-lg font-bold text-gray-500">{item.year}</div>
                <div className="flex-1 relative h-10 bg-zinc-900/70 rounded overflow-hidden border border-zinc-800">
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-500"
                    style={{ width: `${(item.launches / maxLaunches) * 100}%` }} />
                  <div className="absolute inset-0 flex items-center justify-end pr-4">
                    <span className="text-xl font-black text-white drop-shadow-sm">{item.launches}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYLOAD PER YEAR – ULTRA COMPACT */}
      <section className="py-8 px-6 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Payload to Orbit (tons/year)
          </h2>
          <div className="space-y-2">
            {launchesByYear.map((item) => (
              <div key={item.year} className="flex items-center gap-4">
                <div className="w-14 text-right text-lg font-bold text-gray-500">{item.year}</div>
                <div className="flex-1 relative h-10 bg-zinc-900/70 rounded overflow-hidden border border-zinc-800">
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-blue-500"
                    style={{ width: `${(item.payload / maxPayload) * 100}%` }} />
                  <div className="absolute inset-0 flex items-center justify-end pr-4">
                    <span className="text-xl font-black text-white drop-shadow-sm">
                      {item.payload >= 1000 ? `${(item.payload / 1000).toFixed(1)}k` : item.payload.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HERO STATS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-900/20 to-zinc-900 border border-red-800/50 rounded-3xl p-8 hover:border-red-600 transition">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-red-500 leading-none">10,501</div>
            <p className="mt-4 text-base md:text-lg font-medium text-gray-300">Starlink Launched</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-cyan-900/20 to-zinc-900 border border-cyan-800/50 rounded-3xl p-8 hover:border-cyan-600 transition">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-cyan-400 leading-none">152</div>
            <p className="mt-4 text-base md:text-lg font-medium text-gray-300">Falcon 9 in 2025</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-zinc-900 border border-purple-800/50 rounded-3xl p-8 hover:border-purple-600 transition">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-purple-400 leading-none">31×</div>
            <p className="mt-4 text-base md:text-lg font-medium text-gray-300">Most Reused Booster</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-800/50 rounded-3xl p-8 hover:border-green-600 transition">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-green-400 leading-none">8M+</div>
            <p className="mt-4 text-base md:text-lg font-medium text-gray-300">Starlink Users</p>
          </div>
        </div>
      </section>

      {/* TINY CTA — HALF THE SIZE, DOUBLE THE POWER */}
      <div className="text-center py-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          So long, and thanks for all the launches
        </h2>
        <Link 
          href="/missions"
          className="inline-block bg-red-600 hover:bg-red-500 px-8 py-3 rounded-full text-lg font-bold transition hover:scale-105"
        >
          Explore Missions →
        </Link>
      </div>

      <footer className="text-center py-8 text-gray-500 text-xs border-t border-zinc-800">
        Live from @SpaceX • Updated hourly • Don't Panic.
      </footer>
    </div>
  )
}