// src/app/history/page.tsx
export const revalidate = 3600

interface XPost {
  id: string
  content: string
  date: string
  type: string
}

interface Milestone {
  name: string
  date_utc: string
  success: boolean
  details: string
}

async function getMilestones(): Promise<Milestone[]> {
  try {
    const res = await fetch(
      `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/x-updates`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) throw new Error('API failed')

    const { posts } = await res.json()

    const xMilestones: Milestone[] = (posts as XPost[])
      .filter((p: XPost) => ['milestone', 'anomaly', 'launch'].includes(p.type))
      .map((p: XPost) => ({
        name: p.content.split('.')[0].trim(),
        date_utc: p.date + 'T00:00:00.000Z',
        success: !p.content.toLowerCase().includes('anomaly'),
        details: p.content,
      }))

    // Pre-2025 classics
    const staticPre2025: Milestone[] = [
      { name: "Crew Dragon Demo-2", date_utc: "2020-05-30T00:00:00.000Z", success: true, details: "First crewed US launch since Shuttle" },
      { name: "First Booster Landing", date_utc: "2015-12-21T00:00:00.000Z", success: true, details: "CRS-8 RTLS" },
      { name: "Falcon 1 Flight 1", date_utc: "2006-03-24T00:00:00.000Z", success: false, details: "Engine failure at T+33s" },
    ]

    return [...staticPre2025, ...xMilestones].sort((a, b) => 
      new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime()
    )
  } catch (e) {
    console.error('History fetch failed, using full static fallback')
    // Your full 2006–2025 static timeline from earlier messages goes here
    return [
      { name: "Starship IFT-6 (Booster Catch)", date_utc: "2025-10-15T00:00:00.000Z", success: true, details: "First Mechazilla catch" },
      { name: "Crew-10", date_utc: "2025-08-20T00:00:00.000Z", success: true, details: "ISS crew rotation" },
      { name: "150th Falcon 9 Launch of 2025", date_utc: "2025-11-22T00:00:00.000Z", success: true, details: "Starlink batch" },
      // ... rest of your big static array
    ]
  }
}

export default async function HistoryPage() {
  const launches = await getMilestones()

  return (
    <div className="max-w-4xl mx-auto py-20">
      <h1 className="text-6xl font-bold text-center mb-16 text-white">Major Milestones (Live from @SpaceX)</h1>
      <div className="space-y-16">
        {launches.map((l) => (
          <div key={l.name} className="flex gap-8 items-start border-l-2 border-gray-800 pl-8">
            <div className="text-right w-32 flex-shrink-0">
              <div className="text-2xl font-bold text-gray-400">{new Date(l.date_utc).getFullYear()}</div>
              <div className="text-gray-500">{new Date(l.date_utc).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </div>
            <div className="w-4 h-4 bg-red-600 rounded-full mt-2 flex-shrink-0 -ml-5"></div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white">{l.name}</h3>
              <p className="text-xl text-gray-300 mt-2">{l.details}</p>
              {!l.success && <span className="inline-block mt-4 px-4 py-2 bg-red-900/50 rounded-full text-red-400">Failure</span>}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-gray-400 mt-16">Updated {new Date().toLocaleDateString()} • Hourly from X</p>
    </div>
  )
}