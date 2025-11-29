// src/app/page.tsx
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 86400

// Real historical data – launches & payload per year (metric tons)
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
  { year: 2025, launches: 152, payload: 3600 }, // Nov 29, 2025
]

const maxLaunches = Math.max(...launchesByYear.map(y => y.launches))
const maxPayload = Math.max(...launchesByYear.map(y => y.payload))

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      {/* ==================== LAUNCHES PER YEAR BAR CHART ==================== */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-5xl md:text-7xl font-bold mb-16 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Launches per Year
          </h2>
          <div className="space-y-4">
            {launchesByYear.map((item) => (
              <div key={item.year} className="flex items-center gap-6">
                <div className="w-20 text-right text-2xl font-bold text-gray-300">{item.year}</div>
                <div className="flex-1 relative h-16 bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-800">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-1000"
                    style={{ width: `${(item.launches / maxLaunches) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-end pr-6">
                    <span className="text-3xl font-black text-white drop-shadow-lg">
                      {item.launches}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PAYLOAD PER YEAR BAR CHART ==================== */}
      <section className="py-20 px-6 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-5xl md:text-7xl font-bold mb-16 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Payload to Orbit per Year (metric tons)
          </h2>
          <div className="space-y-4">
            {launchesByYear.map((item) => (
              <div key={item.year} className="flex items-center gap-6">
                <div className="w-20 text-right text-2xl font-bold text-gray-300">{item.year}</div>
                <div className="flex-1 relative h-16 bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-800">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-blue-500 transition-all duration-1000"
                    style={{ width: `${(item.payload / maxPayload) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-end pr-6">
                    <span className="text-3xl font-black text-white drop-shadow-lg">
                      {item.payload >= 1000 ? `${(item.payload / 1000).toFixed(1)}k` : item.payload.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HERO STATS – PERFECTLY CENTERED ==================== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Starlink Launched */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-900/20 to-zinc-900 border border-red-800/50 rounded-3xl p-12 hover:border-red-600 transition">
            <div className="text-7xl lg:text-8xl font-black text-red-500 leading-none">10,501</div>
            <p className="mt-6 text-xl lg:text-2xl font-medium text-gray-300 text-center">Starlink Launched</p>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </div>

          {/* Falcon 9 in 2025 */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-cyan-900/20 to-zinc-900 border border-cyan-800/50 rounded-3xl p-12 hover:border-cyan-600 transition">
            <div className="text-7xl lg:text-8xl font-black text-cyan-400 leading-none">152</div>
            <p className="mt-6 text-xl lg:text-2xl font-medium text-gray-300 text-center">Falcon 9 in 2025</p>
            <p className="text-sm text-gray-500 mt-1">World record</p>
          </div>

          {/* Most Reused Booster */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-zinc-900 border border-purple-800/50 rounded-3xl p-12 hover:border-purple-600 transition">
            <div className="text-7xl lg:text-8xl font-black text-purple-400 leading-none">31×</div>
            <p className="mt-6 text-xl lg:text-2xl font-medium text-gray-300 text-center">Most Reused Booster</p>
            <p className="text-sm text-gray-500 mt-1">B1067</p>
          </div>

          {/* Starlink Users */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-800/50 rounded-3xl p-12 hover:border-green-600 transition">
            <div className="text-7xl lg:text-8xl font-black text-green-400 leading-none">8M+</div>
            <p className="mt-6 text-xl lg:text-2xl font-medium text-gray-300 text-center">Starlink Users</p>
            <p className="text-sm text-gray-500 mt-1">Worldwide</p>
          </div>

        </div>
      </section>

      {/* Call to action */}
      <div className="text-center py-32">
        <h2 className="text-6xl md:text-8xl font-bold mb-12">So long, and thanks for all the launches</h2>
        <Link href="/missions" className="inline-block bg-red-600 hover:bg-red-500 px-16 py-8 rounded-full text-3xl font-bold transition transform hover:scale-105 shadow-2xl">
          Explore Missions
        </Link>
      </div>

      <footer className="text-center py-20 text-gray-500 border-t border-zinc-800">
        Live from @SpaceX • Updated hourly • Don't Panic.
      </footer>
    </div>
  )
}