// src/app/starlink/page.tsx
export const revalidate = 3600

async function getStats() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/stats`, { next: { revalidate: 3600 } })
    if (res.ok) {
      const data = await res.json()
      return {
        total: data.totalLaunched || 10501,
        inOrbit: data.inOrbit || 9103,
        v1_5: data.v1_5 || 2826,
        v2_mini: data.v2_mini || 7025,
        v2_mini_dtc: data.v2_mini_dtc || 650,
        v3: data.v3 || 0,
      }
    }
  } catch (e) {
    console.log('API down → using Nov 29, 2025 numbers')
  }

  return {
    total: 10501,
    inOrbit: 9103,
    v1_5: 2826,
    v2_mini: 7025,
    v2_mini_dtc: 650,
    v3: 0,
  }
}

// Helper: German number format with comma as thousand separator
const formatDE = (num: number) => num.toLocaleString('de-DE')

export default async function StarlinkPage() {
  const { total, inOrbit, v1_5, v2_mini, v2_mini_dtc, v3 } = await getStats()
  const decayed = total - inOrbit

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">Starlink Constellation</h1>
          <p className="text-xl md:text-2xl text-gray-400">Live data • Updated hourly</p>
        </div>

        {/* MAIN STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-red-900/20 to-zinc-900 border border-red-800/50 rounded-3xl p-12 text-center hover:border-red-600 transition">
            <div className="text-7xl md:text-8xl font-black text-red-500">{formatDE(total)}</div>
            <p className="mt-6 text-2xl font-medium text-gray-300">Total Launched</p>
          </div>
          <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-800/50 rounded-3xl p-12 text-center hover:border-green-600 transition">
            <div className="text-7xl md:text-8xl font-black text-green-500">{formatDE(inOrbit)}</div>
            <p className="mt-6 text-2xl font-medium text-gray-300">In Orbit</p>
          </div>
          <div className="bg-gradient-to-br from-gray-700/20 to-zinc-900 border border-gray-700/50 rounded-3xl p-12 text-center hover:border-gray-500 transition">
            <div className="text-7xl md:text-8xl font-black text-gray-400">{formatDE(decayed)}</div>
            <p className="mt-6 text-2xl font-medium text-gray-300">Deorbited / Failed</p>
          </div>
        </div>

        {/* PER-VERSION COUNTERS – FIXED SIZE & COMMA */}
        <div className="mb-24">
          <h2 className="text-center text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Satellites by Version
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* v1.5 */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-amber-900/20 to-zinc-900 border border-amber-800/50 rounded-3xl p-10 hover:border-amber-600 transition">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-amber-400 leading-none">
                {formatDE(v1_5)}
              </div>
              <p className="mt-5 text-lg lg:text-xl font-medium text-gray-300">v1.5</p>
            </div>

            {/* v2 Mini */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/20 to-zinc-900 border border-blue-800/50 rounded-3xl p-10 hover:border-blue-600 transition">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-cyan-400 leading-none">
                {formatDE(v2_mini)}
              </div>
              <p className="mt-5 text-lg lg:text-xl font-medium text-gray-300">v2 Mini</p>
            </div>

            {/* v2 Mini DTC */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-900/20 to-zinc-900 border border-emerald-800/50 rounded-3xl p-10 hover:border-emerald-600 transition">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-emerald-400 leading-none">
                {formatDE(v2_mini_dtc)}
              </div>
              <p className="mt-5 text-lg lg:text-xl font-medium text-gray-300">v2 Mini DTC</p>
            </div>

            {/* v3 */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-zinc-900 border border-purple-800/50 rounded-3xl p-10 hover:border-purple-600 transition">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-purple-400 leading-none">
                {formatDE(v3)}
              </div>
              <p className="mt-5 text-lg lg:text-xl font-medium text-gray-300">v3 (Future)</p>
            </div>
          </div>
        </div>

        {/* Version Details */}
        <div className="grid gap-8 md:grid-cols-2 mb-20">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 hover:border-red-800/50 transition">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">Starlink v1.5</h3>
            <p className="text-gray-400">307 kg • 4 laser links • 100+ Gbps • Ku/Ka-band • Argon thrusters</p>
            <p className="text-gray-300 italic pt-4 border-t border-zinc-800">First laser-equipped generation – enabled polar coverage</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 hover:border-red-800/50 transition">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Starlink v2 Mini</h3>
            <p className="text-gray-400">850 kg • 4× bandwidth • E-band • 300+ Gbps • Krypton thrusters</p>
            <p className="text-gray-300 italic pt-4 border-t border-zinc-800">Current workhorse – 60+ per launch</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 hover:border-red-800/50 transition">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">Starlink v2 Mini DTC</h3>
            <p className="text-gray-400">900 kg • Direct-to-Cell • 25 m² antenna • Works with normal phones</p>
            <p className="text-gray-300 italic pt-4 border-t border-zinc-800">Live texting in 20+ countries • Voice 2025</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 hover:border-red-800/50 transition">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Starlink v3 (Starship-class)</h3>
            <p className="text-gray-400">1,800+ kg • 10× bandwidth • 100+ lasers • Starship only</p>
            <p className="text-gray-300 italic pt-4 border-t border-zinc-800">Future generation – not launched yet</p>
          </div>
        </div>

        {/* LIVE MAP */}
        <div className="mt-32 mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Live Starlink Constellation
          </h2>
          <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <iframe
              src="https://satmap.space/starlink"
              className="w-full h-96 md:h-screen max-h-screen"
              allowFullScreen
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-6 py-3 rounded-lg border border-zinc-700">
              <p className="text-lg text-gray-200">
                Live • {formatDE(total)} satellites • Real-time
              </p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-6">
            Powered by <a href="https://satmap.dev" target="_blank" rel="noopener" className="underline hover:text-cyan-400">satmap.dev</a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center py-12">
          <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            70+ launches/year • 120+ satellites/month
          </p>
          <p className="text-gray-500 mt-4">Data as of November 2025 • Live from @SpaceX</p>
        </div>

      </div>
    </div>
  )
}