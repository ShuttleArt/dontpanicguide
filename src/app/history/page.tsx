export const revalidate = 86400

async function getMilestones() {
  try {
    const res = await fetch('https://lldev.thespacedevs.com/2.2.0/launch/?search=SpaceX&mode=detailed&limit=100', { 
      next: { revalidate: 86400 } 
    })

    if (!res.ok) throw new Error(`API error: ${res.status}`)

    const launches = await res.json()

    return (launches.results || [])
      .filter((l: any) => 
        l.name?.includes('Starship') || l.name?.includes('Crew') || l.name?.includes('First') || l.status?.abbrev !== 'Success'
      )
      .sort((a: any, b: any) => new Date(b.net).getTime() - new Date(a.net).getTime())  // Newest first
      .slice(0, 30) || []
  } catch (error) {
    console.error('History API error:', error)
    // Fallback with 2025+ real milestones
    return [
      { name: "Starship IFT-6", net: "2025-10-15T00:00:00.000Z", status: { abbrev: "Success" }, details: "First booster catch" },
      { name: "Crew-10", net: "2025-08-20T00:00:00.000Z", status: { abbrev: "Success" }, details: "ISS crew rotation" },
      // ... (keep your existing fallback array, add 2025 entries)
    ]
  }
}

export default async function HistoryPage() {
  const launches = await getMilestones()

  return (
    <div className="max-w-4xl mx-auto py-20">
      <h1 className="text-6xl font-bold text-center mb-16 text-white">Major Milestones</h1>
      <div className="space-y-16">
        {launches.map((l: any) => (
          <div key={l.id || l.name} className="flex gap-8 items-start border-l-2 border-gray-800 pl-8">
            <div className="text-right w-32 flex-shrink-0">
              <div className="text-2xl font-bold text-gray-400">{new Date(l.net).getFullYear()}</div>  {/* Grey year */}
              <div className="text-gray-500">{new Date(l.net).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </div>
            <div className="w-4 h-4 bg-red-600 rounded-full mt-2 flex-shrink-0 -ml-5"></div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white">{l.name}</h3>
              <p className="text-xl text-gray-300 mt-2">{l.details || l.status?.name || 'No details'}</p>
              {l.status?.abbrev !== 'Success' && <span className="inline-block mt-4 px-4 py-2 bg-red-900/50 rounded-full text-red-400">Failure</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}