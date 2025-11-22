export const revalidate = 86400  // Re-fetch once per day (or 3600 for hourly)

async function getRockets() {
  const res = await fetch('https://api.spacexdata.com/v5/rockets', {
    next: { revalidate: 86400 }  // This line = auto-update magic
  })
  return res.json()
}

export default async function RocketsPage() {
  const rockets = await getRockets()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {rockets.map((rocket: any) => (
        <div key={rocket.id} className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-red-900/30">
          <img src={rocket.flickr_images[0]} alt={rocket.name} className="w-full h-64 object-cover" />
          <div className="p-8">
            <h2 className="text-4xl font-bold mb-4">{rocket.name}</h2>
            <p className="text-gray-400 mb-6">{rocket.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>First flight: {new Date(rocket.first_flight).getFullYear()}</div>
              <div>Success rate: {rocket.success_rate_pct}%</div>
              <div>Height: {rocket.height.meters}m</div>
              <div>Mass: {rocket.mass.kg.toLocaleString()} kg</div>
            </div>
            
            <a href={rocket.wikipedia} className="inline-block mt-6 text-red-500 hover:underline">
              Wikipedia → 
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}