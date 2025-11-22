export const revalidate = 86400

async function getRockets() {
  try {
    const res = await fetch('https://lldev.thespacedevs.com/2.2.0/config/launcher/?search=SpaceX', { next: { revalidate: 86400 } })
    if (!res.ok) throw new Error('API down')
    const data = await res.json()
    return data.results || []
  } catch (e) {
    console.error('Rockets API error:', e)
    // Static fallback
    return [
      { name: 'Falcon 9', family: 'Falcon', description: 'Reusable workhorse', first_flight: '2010' },
      { name: 'Falcon Heavy', family: 'Falcon', description: 'Heavy lift beast', first_flight: '2018' },
      { name: 'Starship', family: 'Starship', description: 'Mars or bust', first_flight: '2023' }
    ]
  }
}

export default async function RocketsPage() {
  const rockets = await getRockets()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-20">
      {rockets.map((rocket: any) => (
        <div key={rocket.id || rocket.name} className="bg-zinc-900/50 border border-red-900/30 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-b from-red-900/20 to-transparent h-48 flex items-center justify-center">
            <span className="text-6xl">🚀</span>
          </div>
          <div className="p-8">
            <h2 className="text-4xl font-bold mb-4 text-white">{rocket.name || rocket.full_name}</h2>
            <p className="text-gray-300 mb-6">{rocket.description || `${rocket.family} family rocket`}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>Family: {rocket.family}</div>
              <div>First flight: {rocket.first_flight || 'TBD'}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}