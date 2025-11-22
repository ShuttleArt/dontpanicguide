export const revalidate = 3600  // hourly refresh when deployed

async function getData() {
  try {
    const [pastRes, upcomingRes] = await Promise.all([
      fetch('https://api.spacexdata.com/v5/launches/past', { next: { revalidate: 3600 } }),
      fetch('https://api.spacexdata.com/v5/launches/upcoming', { next: { revalidate: 3600 } })
    ])

    if (!pastRes.ok || !upcomingRes.ok) {
      throw new Error(`API error: ${pastRes.status} / ${upcomingRes.status}`)
    }

    const past = await pastRes.json()
    const upcoming = await upcomingRes.json()

    return { 
      past: past.reverse().slice(0, 50),  // Latest 50
      upcoming 
    }
  } catch (error) {
    console.error('Missions API error:', error)
    // Fallback: Static data so build never fails
    return { 
      past: [
        { id: 'fallback-1', name: 'CRS-28', date_utc: '2023-06-05T00:00:00.000Z', success: true, links: { patch: { small: 'https://images2.imgbox.com/...' } } },  // Update with real-ish
        { id: 'fallback-2', name: 'Starlink Group 6-1', date_utc: '2023-05-20T00:00:00.000Z', success: true, links: { patch: { small: 'https://images2.imgbox.com/...' } } },
        // Add 3-5 more static past launches if you want, or keep minimal
      ],
      upcoming: [
        { id: 'fallback-next', name: 'Falcon 9 - Starlink 6-2', date_utc: new Date(Date.now() + 86400000 * 7).toISOString(), success: null, links: { webcast: 'https://youtube.com/watch?v=dQw4w9WgXcQ' } }  // Fake next week
      ]
    }
  }
}

export default async function MissionsPage() {
  const { past, upcoming } = await getData()
  const next = upcoming[0]

  return (
    <div className="space-y-20">
      {/* NEXT LAUNCH CARD */}
      {next && (
        <div className="bg-gradient-to-br from-red-900/20 to-zinc-900 border border-red-800 rounded-3xl p-12 text-center">
          <h2 className="text-6xl font-bold mb-4 text-white">Next Launch</h2>
          <p className="text-4xl mb-6 text-white">{next.name}</p>
          <p className="text-2xl text-red-400">
            {new Date(next.date_utc).toLocaleString()}
          </p>
          {next.links?.webcast && (
            <a href={next.links.webcast} className="inline-block mt-8 bg-red-600 hover:bg-red-500 px-10 py-5 rounded-full text-xl font-bold">
              Watch Live 🚀
            </a>
          )}
        </div>
      )}

      {/* PAST LAUNCHES */}
      <div>
        <h2 className="text-5xl font-bold mb-12 text-center text-white">Last 50 Launches</h2>
        <div className="grid gap-6">
          {past.map((l: any) => (
            <div key={l.id} className="bg-zinc-900/50 border border-gray-800 rounded-2xl p-8 flex items-center justify-between flex-wrap">
              <div>
                <h3 className="text-2xl font-bold text-white">{l.name}</h3>
                <p className="text-gray-400">{new Date(l.date_utc).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-6">
                {l.success ? <span className="text-green-500 text-2xl">Success</span> : <span className="text-red-500 text-2xl">Failure</span>}
                {l.links?.patch?.small && <img src={l.links.patch.small} alt="patch" className="w-20 h-20" />}
              </div>
            </div>
          ))}
          {past.length === 0 && <p className="text-center text-gray-400 text-2xl">Loading launches... (API taking a coffee break)</p>}
        </div>
      </div>
    </div>
  )
}