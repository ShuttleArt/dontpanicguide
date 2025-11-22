export const revalidate = 86400

async function getCapsules() {
  try {
    const res = await fetch('https://api.spacexdata.com/v5/capsules', { next: { revalidate: 86400 } })
    if (!res.ok) throw new Error('API down')
    return await res.json()
  } catch (e) {
    console.error('Capsules API error:', e)
    return [
      { serial: "C206", type: "Crew Dragon", status: "active", last_update: "Currently flying Crew-9", launches: 7 },
      { serial: "C212", type: "Crew Dragon", status: "active", last_update: "Used for Polaris Dawn", launches: 3 },
      { serial: "C113", type: "Cargo Dragon", status: "retired", last_update: "Last flight CRS-22", launches: 3 }
    ]
  }
}

export default async function SatellitesPage() {
  const capsules = await getCapsules()

  return (
    <div className="py-20">
      <h1 className="text-7xl font-bold text-center mb-16 text-white">Crew & Cargo Capsules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {capsules.map((c: any) => (
          <div key={c.serial} className="bg-zinc-900/70 border border-red-900/30 rounded-2xl p-8">
            <h2 className="text-4xl font-bold text-white mb-4">{c.serial}</h2>
            <p className="text-2xl text-red-400 mb-4">{c.type}</p>
            <p className="text-gray-300 mb-6">{c.last_update || c.status}</p>
            <div className="text-lg">
              <span className="text-green-400">Launches: {c.launches || 'N/A'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}