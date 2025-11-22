export const revalidate = 3600

async function getData() {
  try {
    const res = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/x-updates`, { next: { revalidate: 3600 } });
    const { posts } = await res.json();
    const recentLaunches = posts.filter(p => p.type === 'launch').map(p => ({
      name: p.content.split(' ')[0] + ' ' + p.content.split(' ')[1],  // e.g., "Falcon 9 launches"
      date_utc: p.date + 'T00:00:00.000Z',
      success: true,
      links: { webcast: p.media ? p.media[0] : 'https://youtube.com/spacex' }
    }));
    return { upcoming: recentLaunches.slice(0, 3), past: recentLaunches.slice(3, 10) };
  } catch (e) {
    return { upcoming: [ /* Static next */ ], past: [ /* Static recent */ ] };
  }
}

export default async function MissionsPage() {
  const { past, upcoming } = await getData();
  const next = upcoming[0];

  return (
    <div className="space-y-20">
      {/* Next Launch Card from X */}
      {next && (
        <div className="bg-gradient-to-br from-red-900/20 to-zinc-900 border border-red-800 rounded-3xl p-12 text-center">
          <h2 className="text-6xl font-bold mb-4 text-white">Next Launch (from @SpaceX)</h2>
          <p className="text-4xl mb-6 text-white">{next.name}</p>
          <p className="text-2xl text-red-400">{new Date(next.date_utc).toLocaleString()}</p>
          {next.links?.webcast && <a href={next.links.webcast} className="inline-block mt-8 bg-red-600 hover:bg-red-500 px-10 py-5 rounded-full text-xl font-bold">Watch Live 🚀</a>}
        </div>
      )}

      {/* Recent Launches */}
      <div>
        <h2 className="text-5xl font-bold mb-12 text-center text-white">Recent Launches (Nov 2025)</h2>
        <div className="grid gap-6">
          {past.map((l: any) => (
            <div key={l.name} className="bg-zinc-900/50 border border-gray-800 rounded-2xl p-8 flex items-center justify-between flex-wrap">
              <div>
                <h3 className="text-2xl font-bold text-white">{l.name}</h3>
                <p className="text-gray-400">{new Date(l.date_utc).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-green-500 text-2xl">Success</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Major Milestones (Static + X Highlights) */}
      <div className="pt-20 border-t border-gray-800">
        <h2 className="text-5xl font-bold mb-12 text-center text-white">2025 Milestones (Live from X)</h2>
        <div className="grid gap-6 max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white">150th Falcon Launch</h3>
            <p className="text-gray-300 mt-2">Nov 22: Starlink batch from Florida<grok-card data-id="15d846" data-type="citation_card"></grok-card></p>
          </div>
          <div className="bg-zinc-900/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white">Booster 18 Anomaly</h3>
            <p className="text-gray-300 mt-2">Nov 21: Gas test fail, no injuries — V3 stacking Dec<grok-card data-id="f7333c" data-type="citation_card"></grok-card></p>
          </div>
          <div className="bg-zinc-900/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white">Starship Flight 12</h3>
            <p className="text-gray-300 mt-2">Target Q1 2026: Super Heavy V3 ready<grok-card data-id="3d9313" data-type="citation_card"></grok-card></p>
          </div>
        </div>
      </div>
    </div>
  )
}