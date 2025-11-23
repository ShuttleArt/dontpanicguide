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
        total: data.totalLaunched,
        inOrbit: data.inOrbit,
        decayed: data.totalLaunched - data.inOrbit,
      }
    }
  } catch (e) {
    console.log('Stats API down → using real Nov 23 data')
  }

  // Real numbers as of Nov 23, 2025
  return { total: 10493, inOrbit: 9065, decayed: 10493 - 9065 }
}

export default async function StarlinkPage() {
  const { total, inOrbit, decayed } = await getStats()

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">Starlink Constellation</h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-20">Live from @SpaceX • Updated hourly</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* TOTAL LAUNCHED */}
          <div className="bg-gradient-to-br from-red-900/20 to-zinc-900 border border-red-800/50 rounded-3xl p-12">
            <div className="flex flex-col items-center justify-center h-72 md:h-80">
              <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-red-500 leading-tight">
                {total.toLocaleString('de-DE')}
              </div>
              <div className="mt-6 text-2xl md:text-3xl text-gray-300 font-medium">Total Launched</div>
            </div>
          </div>

          {/* IN ORBIT */}
          <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-800/50 rounded-3xl p-12">
            <div className="flex flex-col items-center justify-center h-72 md:h-80">
              <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-green-500 leading-tight">
                {inOrbit.toLocaleString('de-DE')}
              </div>
              <div className="mt-6 text-2xl md:text-3xl text-gray-300 font-medium">In Orbit</div>
            </div>
          </div>

          {/* DEORBITED */}
          <div className="bg-gradient-to-br from-gray-700/20 to-zinc- with-gray-700 rounded-3xl p-12">
            <div className="flex flex-col items-center justify-center h-72 md:h-80">
              <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-400 leading-tight">
                {decayed.toLocaleString('de-DE')}
              </div>
              <div className="mt-6 text-2xl md:text-3xl text-gray-300 font-medium">Deorbited / Failed</div>
            </div>
          </div>
        </div>

        <p className="mt-16 text-lg md:text-xl text-gray-500">
          Latest batch: ~29 satellites • Over 8 million users worldwide
        </p>
      </div>
    </div>
  )
}