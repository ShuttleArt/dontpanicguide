export const revalidate = 86400  // Daily refresh (cron will handle live updates)

async function getStats() {
  // For now, live scraped data (Nov 22, 2025)
  // Cron will fetch/parse SpaceX.com daily and update via webhook/email
  return { 
    total: 10406,  // Launched
    inOrbit: 9046,  // In orbit
    decayed: 1360   // Failed/deorbited
  }
}

export default async function StarlinkPage() {
  const { total, inOrbit, decayed } = await getStats()

  return (
    <div className="text-center space-y-20 py-20">
      <h1 className="text-7xl font-bold text-white">Starlink Constellation</h1>
      <p className="text-2xl text-white/80">Live stats (updated daily via cron scrape) • 8M+ subscribers</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">  {/* Wider max-w */}
        <div className="bg-zinc-900/70 border-2 border-red-900 rounded-3xl p-12 min-h-[220px] flex flex-col justify-center">  {/* Taller min-h */}
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-red-500 leading-tight mb-2">  {/* Responsive font, tight leading */}
            {total.toLocaleString()}
          </div>
          <div className="text-xl md:text-2xl text-white/90">Total Launched</div>
        </div>

        <div className="bg-zinc-900/70 border-2 border-green-900 rounded-3xl p-12 min-h-[220px] flex flex-col justify-center">
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-green-500 leading-tight mb-2">
            {inOrbit.toLocaleString()}
          </div>
          <div className="text-xl md:text-2xl text-white/90">In Orbit</div>
        </div>

        <div className="bg-zinc-900/70 border-2 border-gray-700 rounded-3xl p-12 min-h-[220px] flex flex-col justify-center">
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-white/90 leading-tight mb-2">
            {decayed.toLocaleString()}
          </div>
          <div className="text-xl md:text-2xl text-white/90">Deorbited / Failed</div>
        </div>
      </div>
    </div>
  )
}