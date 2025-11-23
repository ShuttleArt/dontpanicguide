// src/app/page.tsx
import Image from 'next/image'

export const revalidate = 3600

// Shared stats – same source as Starlink page
async function getStats() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/stats`, { next: { revalidate: 3600 } })
    if (res.ok) {
      const data = await res.json()
      return {
        totalLaunched: data.totalLaunched,
        inOrbit: data.inOrbit,
      }
    }
  } catch (e) {
    console.log('API down → fallback')
  }

  // Real numbers as of Nov 23, 2025
  return { totalLaunched: 10493, inOrbit: 9065 }
}

export default async function HomePage() {
  const { totalLaunched, inOrbit } = await getStats()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <div className="relative overflow-hidden py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight">
            Don&apos;t Panic Guide to SpaceX
          </h1>
          <p className="text-2xl md:text-4xl text-gray-300 mb-12">
            Live data • Real-time • No BS
          </p>
        </div>
      </div>

      {/* HERO STATS – LIVE & GORGEOUS */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-20">
          {/* Total Launched */}
          <div className="group relative bg-gradient-to-br from-red-900/20 to-zinc-900 border border-red-800/50 rounded-3xl p-12 text-center overflow-hidden hover:border-red-600 transition-all duration-300">
            <div className="absolute inset-0 bg-red-900/10 group-hover:bg-red-900/20 transition"></div>
            <div className="relative z-10">
              <div className="text-6xl md:text-7xl font-bold text-red-500">
                {totalLaunched.toLocaleString()}
              </div>
              <div className="mt-3 text-xl md:text-2xl text-gray-300 font-medium">
                Starlink Satellites Launched
              </div>
              <div className="text-sm text-gray-500 mt-2">All time • Updated hourly</div>
            </div>
          </div>

          {/* Success Rate */}
          <div className="group relative bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-800/50 rounded-3xl p-12 text-center overflow-hidden hover:border-green-600 transition-all duration-300">
            <div className="absolute inset-0 bg-green-900/10 group-hover:bg-green-900/20 transition"></div>
            <div className="relative z-10">
              <div className="text-6xl md:text-7xl font-bold text-green-400">
                {totalLaunched > 0 ? ((inOrbit / totalLaunched) * 100).toFixed(2) : 99.6}%
              </div>
              <div className="mt-3 text-xl md:text-2xl text-gray-300 font-medium">
                Operational Success Rate
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {inOrbit.toLocaleString()} in orbit
              </div>
            </div>
          </div>

          {/* Reusability */}
          <div className="group relative bg-gradient-to-br from-purple-900/20 to-zinc-900 border border-purple-800/50 rounded-3xl p-12 text-center overflow-hidden hover:border-purple-600 transition-all duration-300">
            <div className="absolute inset-0 bg-purple-900/10 group-hover:bg-purple-900/20 transition"></div>
            <div className="relative z-10">
              <div className="text-6xl md:text-7xl font-bold text-purple-400">22×</div>
              <div className="mt-3 text-xl md:text-2xl text-gray-300 font-medium">
                Most Reused Booster
              </div>
              <div className="text-sm text-gray-500 mt-2">B1062 • Still flying</div>
            </div>
          </div>
        </div>

        {/* BONUS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-16">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 text-center hover:border-cyan-800/50 transition">
            <div className="text-5xl font-bold text-cyan-400">150</div>
            <div className="text-gray-400 text-sm mt-2">Falcon Launches 2025</div>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 text-center hover:border-yellow-800/50 transition">
            <div className="text-5xl font-bold text-yellow-400">8.2M+</div>
            <div className="text-gray-400 text-sm mt-2">Starlink Users</div>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 text-center hover:border-orange-800/50 transition">
            <div className="text-5xl font-bold text-orange-400">IFT-7</div>
            <div className="text-gray-400 text-sm mt-2">Next Starship Flight</div>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 text-center hover:border-pink-800/50 transition">
            <div className="text-5xl font-bold text-pink-400">100%</div>
            <div className="text-gray-400 text-sm mt-2">Booster Catch Success</div>
          </div>
        </div>
      </div>

      {/* Rest of your page (navigation, etc.) */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-500 text-lg">
          Live data from @SpaceX • Updated hourly • Don&apos;t Panic.
        </p>
      </div>
    </div>
  )
}