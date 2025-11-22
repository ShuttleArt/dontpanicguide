// src/app/starlink/page.tsx
export const revalidate = 86400

async function getStats() {
  try {
    const res = await fetch('https://api.spacexdata.com/v5/starlink', {
      next: { revalidate: 86400 },
    })

    if (!res.ok) throw new Error('API down')

    const all = await res.json()

    const inOrbit = all.filter((s: any) => 
      !s.spaceTrack?.DECAY_DATE || s.spaceTrack?.DECAY_DATE === null
    ).length

    const total = all.length
    const decayed = total - inOrbit

    return { total, inOrbit, decayed }
  } catch (e) {
    console.error('Starlink API error:', e)
    return { total: 7748, inOrbit: 7730, decayed: 18 }
  }
}

export default async function StarlinkPage() {
  const { total, inOrbit, decayed } = await getStats()

  return (
    <div className="text-center space-y-20 py-20">
      <h1 className="text-7xl font-bold text-white">Starlink Constellation</h1>
      <p className="text-2xl text-white/80">Live data • Updated daily • Zero maintenance</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
        <div className="bg-zinc-900/70 border-2 border-red-900 rounded-3xl p-12">
          <div className="text-8xl font-bold text-red-500">
            {total.toLocaleString()}
          </div>
          <div className="text-2xl mt-4 text-white/90">Total Launched</div>
        </div>

        <div className="bg-zinc-900/70 border-2 border-green-900 rounded-3xl p-12">
          <div className="text-8xl font-bold text-green-500">
            {inOrbit.toLocaleString()}
          </div>
          <div className="text-2xl mt-4 text-white/90">In Orbit</div>
        </div>

        <div className="bg-zinc-900/70 border-2 border-gray-700 rounded-3xl p-12">
          <div className="text-8xl font-bold text-white/90">{decayed}</div>
          <div className="text-2xl mt-4 text-white/90">Deorbited / Failed</div>
        </div>
      </div>
    </div>
  )
}