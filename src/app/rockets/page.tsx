export const revalidate = 86400

async function getRockets() {
  // Static real SpaceX rockets (unique, no dups)
  return [
    { 
      id: "falcon1", 
      name: "Falcon 1", 
      description: "SpaceX's debut rocket – first private liquid-fueled orbital launch (2008). Retired after 5 flights.", 
      first_flight: "2006-03-24", 
      success_rate_pct: 40, 
      height_m: 21.3, 
      mass_kg: 28200 
    },
    { 
      id: "falcon9", 
      name: "Falcon 9", 
      description: "Workhorse reusable rocket – 500+ launches, 98% success, lands boosters for $60M per flight.", 
      first_flight: "2010-06-04", 
      success_rate_pct: 98, 
      height_m: 70, 
      mass_kg: 549054 
    },
    { 
      id: "falconheavy", 
      name: "Falcon Heavy", 
      description: "Triple-booster beast – most powerful operational rocket, sent Tesla to space in 2018.", 
      first_flight: "2018-02-06", 
      success_rate_pct: 100, 
      height_m: 70, 
      mass_kg: 1386378 
    },
    { 
      id: "starship-proto", 
      name: "Starship (Prototype)", 
      description: "IFT series testers – stainless steel, Raptor engines, full reusability push (2023–2025).", 
      first_flight: "2023-04-20", 
      success_rate_pct: 60, 
      height_m: 50, 
      mass_kg: 5000000 
    },
    { 
      id: "starship-full", 
      name: "Starship (Full Stack)", 
      description: "Super Heavy + Ship – 33 Raptors, 150t to LEO reusable, Mars-bound vehicle.", 
      first_flight: "2025-10-15", 
      success_rate_pct: 80, 
      height_m: 120, 
      mass_kg: 5000000 
    }
  ]
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
              <div>First flight: {new Date(rocket.first_flight).getFullYear()}</div>
              <div>Success rate: {rocket.success_rate_pct}%</div>
              <div>Height: {rocket.height_m}m</div>
              <div>Mass: {rocket.mass_kg.toLocaleString()}kg</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}