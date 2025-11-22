export const revalidate = 86400

async function getCapsules() {
  try {
    const res = await fetch('https://lldev.thespacedevs.com/2.2.0/spacestation/crew/?search=SpaceX&limit=20', { next: { revalidate: 86400 } })
    if (!res.ok) throw new Error('API down')
    return (await res.json()).results || []
  } catch (e) {
    console.error('Capsules API error:', e)
    return [
      { name: 'Crew Dragon C206', type: 'Crew Dragon', status: 'Active', missions: 7 },
      { name: 'Cargo Dragon C113', type: 'Cargo Dragon', status: 'Retired', missions: 3 }
    ]
  }
}

export default async function CapsulesPage() {
  const capsules = await getCapsules()

  return (
    <div className="py-20">
      <h1 className="text-7xl font-bold text-center mb-16 text-white">Crew & Cargo Capsules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {capsules.map((c: any) => (
          <div key={c.id || c.name} className="bg-zinc-900/70 border border-red-900/30 rounded-2xl p-8">
            <h2 className="text-4xl font-bold text-white mb-4">{c.name || c.vehicle?.name}</h2>
            <p className="text-2xl text-red-400 mb-4">{c.type || 'Crew Dragon'}</p>
            <p className="text-gray-300 mb-6">{c.status || 'Active'}</p>
            <div className="text-lg">
              <span className="text-green-400">Missions: {c.missions || c.flight_number || 'N/A'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}