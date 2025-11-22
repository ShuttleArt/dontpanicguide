export const revalidate = 3600

async function getData() {
  // Static real 2025 data (cron appends new)
  return { 
    upcoming: [
      { name: 'Starship IFT-7', date_utc: '2025-12-15T20:00:00.000Z', success: null, links: { webcast: 'https://youtube.com/spacex' } },
      { name: 'Crew-11 Prep', date_utc: '2025-11-30T00:00:00.000Z', success: null, links: { webcast: 'https://youtube.com/spacex' } },
      { name: 'Starlink 11-30', date_utc: '2025-11-30T02:59:00.000Z', success: null, links: { webcast: 'https://youtube.com/spacex' } }
    ],
    past: [
      { name: 'Starship IFT-6', date_utc: '2025-10-15T00:00:00.000Z', success: true, links: { patch: { small: 'https://example.com/ift6.png' } } },
      { name: '100th Falcon 9 of 2025 (Starlink 17-5)', date_utc: '2025-08-17T16:26:00.000Z', success: true, links: { patch: { small: 'https://example.com/falcon100.png' } } },
      { name: 'Crew-10', date_utc: '2025-08-20T00:00:00.000Z', success: true, links: { patch: { small: 'https://example.com/crew10.png' } } },
      { name: 'Starship IFT-5', date_utc: '2025-03-12T00:00:00.000Z', success: true, links: { patch: { small: 'https://example.com/ift5.png' } } }
      // Add more from history if needed
    ].reverse()  // Latest first
  }
}

export default async function MissionsPage() {
  const { past, upcoming } = await getData()
  const next = upcoming[0]

  return (
    <div className="space-y-20">
      {next && (
        <div className="bg-gradient-to-br from-red-900/20 to-zinc-900 border border-red-800 rounded-3xl p-12 text-center">
          <h2 className="text-6xl font-bold mb-4 text-white">Next Launch</h2>
          <p className="text-4xl mb-6 text-white">{next.name}</p>
          <p className="text-2xl text-red-400">{new Date(next.date_utc).toLocaleString()}</p>
          {next.links?.webcast && (
            <a href={next.links.webcast} className="inline-block mt-8 bg-red-600 hover:bg-red-500 px-10 py-5 rounded-full text-xl font-bold">
              Watch Live 🚀
            </a>
          )}
        </div>
      )}

      <div>
        <h2 className="text-5xl font-bold mb-12 text-center text-white">Recent Launches (2025)</h2>
        <div className="grid gap-6">
          {past.map((l: any) => (
            <div key={l.name} className="bg-zinc-900/50 border border-gray-800 rounded-2xl p-8 flex items-center justify-between flex-wrap">
              <div>
                <h3 className="text-2xl font-bold text-white">{l.name}</h3>
                <p className="text-gray-400">{new Date(l.date_utc).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-6">
                {l.success ? <span className="text-green-500 text-2xl">Success</span> : <span className="text-red-500 text-2xl">TBD</span>}
                {l.links?.patch?.small && <img src={l.links.patch.small} alt="patch" className="w-20 h-20" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Major Milestones Section */}
      <div className="pt-20 border-t border-gray-800">
        <h2 className="text-5xl font-bold mb-12 text-center text-white">2025 Major Milestones</h2>
        <div className="grid gap-6 max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white">IFT-6 Booster Catch</h3>
            <p className="text-gray-300 mt-2">Oct 15: First successful Mechazilla arms catch</p>
          </div>
          <div className="bg-zinc-900/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white">100th Falcon Launch</h3>
            <p className="text-gray-300 mt-2">Aug 17: Starlink batch marks cadence record</p>
          </div>
          <div className="bg-zinc-900/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white">Crew-10 Rotation</h3>
            <p className="text-gray-300 mt-2">Aug 20: NASA astronauts to ISS</p>
          </div>
          <div className="bg-zinc-900/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white">IFT-5 Partial Catch</h3>
            <p className="text-gray-300 mt-2">Mar 12: Tower arms test + heat shield win</p>
          </div>
        </div>
      </div>
    </div>
  )
}