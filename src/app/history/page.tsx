export const revalidate = 86400

async function getMilestones() {
  try {
    const res = await fetch('https://api.spacexdata.com/v5/launches', { 
      next: { revalidate: 86400 } 
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const launches = await res.json()

    // Filter for milestones (Starship, Crew, First, failures)
    return launches
      .filter((l: any) => 
        l.name?.includes('Starship') || 
        l.name?.includes('Crew') || 
        l.name?.includes('First') || 
        l.success === false
      )
      .reverse()
      .slice(0, 30) || []  // Empty array fallback
  } catch (error) {
    console.error('History API error:', error)
    // Fallback: Static milestones so build never crashes
    return [
      { name: "Falcon 1 Flight 1", date_utc: "2006-03-24T00:00:00.000Z", success: false, details: "First SpaceX launch – engine failure at T+33s" },
      { name: "Falcon 1 Flight 2", date_utc: "2007-03-21T00:00:00.000Z", success: false, details: "Reached space but failed orbit" },
      { name: "First Falcon 9 Success", date_utc: "2010-06-04T00:00:00.000Z", success: true, details: "Dragon capsule in orbit" },
      { name: "First Booster Landing", date_utc: "2015-12-21T00:00:00.000Z", success: true, details: "CRS-8 – historic RTLS landing" },
      { name: "Crew Dragon Demo-2", date_utc: "2020-05-30T00:00:00.000Z", success: true, details: "First crewed US launch since Shuttle" },
      { name: "Starship IFT-1", date_utc: "2023-04-20T00:00:00.000Z", success: false, details: "First integrated flight test – RUD" },
      { name: "Starship IFT-5", date_utc: "2025-10-13T00:00:00.000Z", success: true, details: "First successful booster catch" },  // Update as needed
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
              <div className="text-2xl font-bold text-white">{new Date(l.date_utc).getFullYear()}</div>
              <div className="text-gray-500">{new Date(l.date_utc).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </div>
            <div className="w-4 h-4 bg-red-600 rounded-full mt-2 flex-shrink-0 -ml-5"></div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white">{l.name}</h3>
              <p className="text-xl text-gray-300 mt-2">{l.details || 'No details available'}</p>
              {l.success === false && <span className="inline-block mt-4 px-4 py-2 bg-red-900/50 rounded-full text-red-400">Failure</span>}
            </div>
          </div>
        ))}
        {launches.length === 0 && (
          <p className="text-center text-gray-400 text-2xl">Loading milestones... (API taking a nap)</p>
        )}
      </div>
    </div>
  )
}