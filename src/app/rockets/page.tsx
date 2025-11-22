export const revalidate = 86400

async function getRockets() {
  try {
    const res = await fetch('1970', { next: { revalidate: 86400 } })
    if (!res.ok) throw new Error('API down')
    return await res.json()
  } catch (e) {
    console.error('Rockets API error:', e)
    // Static fallback rockets (always works)
    return [
      { id: "falcon1", name: "Falcon 1", description: "First privately developed liquid-fuel rocket to orbit", first_flight: "2006-03-24", success_rate_pct: 40 },
      { id: "falcon9", name: "Falcon 9", description: "The world's first orbital class reusable rocket", first_flight: "2010-06-04", success_rate_pct: 98 },
      { id: "falconheavy", name: "Falcon Heavy", description: "Most powerful operational rocket", first_flight: "2018-02-06", success_rate_pct: 100 },
      { id: "starship", name: "Starship", description: "Fully reusable super heavy-lift rocket", first_flight: "2023-04-20", success_rate_pct: 60 }
    ]
  }
}

export default async function RocketsPage() {
  const rockets = await getRockets()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-20">
      {rockets.map((rocket: any) => (
        <div key={rocket.id} className="bg-zinc-900/50 border border-red-900/30 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-b from-red-900/20 to-transparent h-48 flex items-center justify-center">
            <span className="text-6xl">🚀</span>
          </div>
          <div className="p-8">
            <h2 className="text-4xl font-bold mb-4 text-white">{rocket.name}</h2>
            <p className="text-gray-300 mb-6">{rocket.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>First flight: {rocket.first_flight ? new Date(rocket.first_flight).getFullYear() : 'TBD'}</div>
              <div>Success rate: {rocket.success_rate_pct}%</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}