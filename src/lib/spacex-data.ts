// src/lib/spacex-data.ts
export const revalidate = 300 // 5 min cache site-wide

export type Launch = {
  id: string
  name: string
  date_utc: string
  success: boolean | null
  upcoming: boolean
  rocket: { id: string; name?: string }
  links: { patch: { large?: string | null } }
  payloads: any[]
}

export async function getSpaceXData() {
  const res = await fetch('https://api.spacexdata.com/v5/launches/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: {},
      options: { limit: 100, sort: { date_utc: 'desc' }, populate: ['payloads'] },
    }),
    next: { revalidate: 300 },
  })

  const { docs } = await res.json() as { docs: Launch[] }

  const spaceXLaunches = docs.filter(l => {
    const name = l.rocket.name?.toLowerCase() || ''
    const id = l.rocket.id
    return name.includes('falcon') || name.includes('starship') ||
      ['5e9d0d95eda69973a809d1ec', '5e9d0d95eda69955f709d1eb', '5e9d0d96eda699382d09d1ee'].includes(id)
  })

  const upcoming = spaceXLaunches.filter(l => l.upcoming)
  const nextLaunch = upcoming[0] || spaceXLaunches.find(l => l.upcoming) || spaceXLaunches[0]

  const totalLaunches = spaceXLaunches.length
  const successful = spaceXLaunches.filter(l => l.success === true).length

  // Starlink satellites launched
  const starlinkSats = spaceXLaunches
    .filter(l => l.name.toLowerCase().includes('starlink'))
    .reduce((sum, l) => sum + (l.payloads?.filter(p => p.type === 'Satellite')?.length || 0), 0)

  return {
    nextLaunch,
    upcoming,
    recent: spaceXLaunches.filter(l => !l.upcoming && l.success !== null).slice(0, 5),
    totalLaunches,
    successful,
    starlinkSats,
    allLaunches: spaceXLaunches,
  }
}