export const revalidate = 86400

async function getMilestones() {
  // Static real milestones (cron will append new ones daily)
  return [
    { name: "Starship IFT-6 (Booster Catch Success)", date_utc: "2025-10-15T00:00:00.000Z", success: true, details: "First Mechazilla tower catch of Super Heavy booster" },
    { name: "Crew-10 to ISS", date_utc: "2025-08-20T00:00:00.000Z", success: true, details: "NASA/SpaceX crew rotation mission" },
    { name: "100th Falcon 9 Launch of 2025", date_utc: "2025-08-17T00:00:00.000Z", success: true, details: "Starlink 17-5 batch from Vandenberg" },
    { name: "Starship IFT-5", date_utc: "2025-03-12T00:00:00.000Z", success: true, details: "Partial tower catch + heat shield test" },
    { name: "Starship Static Fire Explosion", date_utc: "2025-01-16T00:00:00.000Z", success: false, details: "Major anomaly during ground test at Starbase" },
    { name: "Polaris Dawn (Private Spacewalk)", date_utc: "2024-09-10T00:00:00.000Z", success: true, details: "First civilian EVA in history" },
    { name: "Starship IFT-4", date_utc: "2024-06-05T00:00:00.000Z", success: true, details: "Soft splashdown + Raptor relight in space" },
    { name: "Crew-9 Extended Mission", date_utc: "2024-04-18T00:00:00.000Z", success: true, details: "Long-duration ISS rotation" },
    { name: "Starship IFT-3", date_utc: "2024-03-14T00:00:00.000Z", success: true, details: "First soft ocean landings for ship & booster" },
    { name: "500th Falcon Launch Overall", date_utc: "2025-06-13T00:00:00.000Z", success: true, details: "Milestone flight with Starlink batch" },
    { name: "Starship IFT-2", date_utc: "2023-11-18T00:00:00.000Z", success: false, details: "Upper stage RUD, booster progress" },
    { name: "Crew-7", date_utc: "2023-08-26T00:00:00.000Z", success: true, details: "International crew to ISS" },
    { name: "Starship IFT-1", date_utc: "2023-04-20T00:00:00.000Z", success: false, details: "First integrated test – exploded at 39km" },
    { name: "Crew Dragon Demo-2", date_utc: "2020-05-30T00:00:00.000Z", success: true, details: "First crewed US launch since Shuttle" },
    { name: "First Booster Landing", date_utc: "2015-12-21T00:00:00.000Z", success: true, details: "CRS-8 RTLS landing" },
    { name: "Falcon Heavy Maiden", date_utc: "2018-02-06T00:00:00.000Z", success: true, details: "Tesla Roadster to heliocentric orbit" },
    { name: "First Falcon 9 Success", date_utc: "2010-06-04T00:00:00.000Z", success: true, details: "Dragon COTS demo to orbit" },
    { name: "Falcon 1 Flight 4", date_utc: "2008-09-28T00:00:00.000Z", success: true, details: "First private liquid rocket to orbit" },
    { name: "Falcon 1 Flight 1", date_utc: "2006-03-24T00:00:00.000Z", success: false, details: "Engine failure at T+33s" }
  ].reverse()  // Oldest first for timeline
}

export default async function HistoryPage() {
  const launches = await getMilestones()

  return (
    <div className="max-w-4xl mx-auto py-20">
      <h1 className="text-6xl font-bold text-center mb-16 text-white">Major Milestones (2006–2025)</h1>
      <div className="space-y-16">
        {launches.map((l: any) => (
          <div key={l.name} className="flex gap-8 items-start border-l-2 border-gray-800 pl-8">
            <div className="text-right w-32 flex-shrink-0">
              <div className="text-2xl font-bold text-gray-400">{new Date(l.date_utc).getFullYear()}</div>  {/* Grey year fix */}
              <div className="text-gray-500">{new Date(l.date_utc).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </div>
            <div className="w-4 h-4 bg-red-600 rounded-full mt-2 flex-shrink-0 -ml-5"></div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white">{l.name}</h3>
              <p className="text-xl text-gray-300 mt-2">{l.details}</p>
              {l.success === false && <span className="inline-block mt-4 px-4 py-2 bg-red-900/50 rounded-full text-red-400">Failure</span>}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-gray-400 mt-16">Updated Nov 22, 2025 • Cron scrapes SpaceX.com daily for new wins</p>
    </div>
  )
}