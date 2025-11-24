// src/app/assets/page.tsx
import Image from 'next/image'

export const revalidate = 86400

const assets = [
  {
    category: 'Launch Bases',
    items: [
      {
        name: 'LC-39A – Kennedy Space Center, FL',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Falcon_Heavy_at_LC-39A_%28cropped%29.jpg/1200px-Falcon_Heavy_at_LC-39A_%28cropped%29.jpg',
        note: 'Historic Apollo & Shuttle pad – now Falcon 9 & Falcon Heavy',
      },
      {
        name: 'SLC-40 – Cape Canaveral, FL',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Falcon_9_B1058_at_SLC-40.jpg/1200px-Falcon_9_B1058_at_SLC-40.jpg',
        note: 'Workhorse pad – 100+ launches since 2010',
      },
      {
        name: 'SLC-4E – Vandenberg, CA',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Falcon_9_at_SLC-4E.jpg/1200px-Falcon_9_at_SLC-4E.jpg',
        note: 'Polar orbit launches – Starlink & science missions',
      },
      {
        name: 'Starbase – Boca Chica, TX',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Starbase_Launch_Site_2_%28cropped%29.jpg/1200px-Starbase_Launch_Site_2_%28cropped%29.jpg',
        note: 'Starship factory & launch site – future of spaceflight',
      },
    ],
  },
  {
    category: 'Droneships',
    items: [
      {
        name: 'Just Read The Instructions (JRTI)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OCISLY_droneship.jpg/1200px-OCISLY_droneship.jpg',
        note: 'East coast – Atlantic Ocean',
      },
      {
        name: 'Of Course I Still Love You (OCISLY)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Of_Course_I_Still_Love_You_droneship.jpg/1200px-Of_Course_I_Still_Love_You_droneship.jpg',
        note: 'West coast – Pacific Ocean',
      },
      {
        name: 'A Shortfall of Gravitas (ASOG)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A_Shortfall_of_Gravitas_droneship.jpg/1200px-A_Shortfall_of_Gravitas_droneship.jpg',
        note: 'Newest ship – Gulf of Mexico',
      },
    ],
  },
  {
    category: 'Crew Capsules',
    items: [
      {
        name: 'Crew Dragon (C206–C212)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Crew_Dragon_Endeavour_docked_to_the_ISS_%28cropped%29.jpg/1200px-Crew_Dragon_Endeavour_docked_to_the_ISS_%28cropped%29.jpg',
        note: '7 crew – NASA Commercial Crew Program',
      },
      {
        name: 'Cargo Dragon 2',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Cargo_Dragon_CRS-22_docked_to_ISS.jpg/1200px-Cargo_Dragon_CRS-22_docked_to_ISS.jpg',
        note: 'Automated – supplies to ISS',
      },
    ],
  },
  {
    category: 'Starship Prototypes (Active)',
    items: [
      {
        name: 'Ship 33 + Booster 15',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Starship_S30_and_Super_Heavy_Booster_12_at_Starbase.jpg/1200px-Starship_S30_and_Super_Heavy_Booster_12_at_Starbase.jpg',
        note: 'Next flight candidate – IFT-7',
      },
      {
        name: 'Mechazilla Tower',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Starbase_Orbital_Launch_Tower_with_chopsticks.jpg/1200px-Starbase_Orbital_Launch_Tower_with_chopsticks.jpg',
        note: 'Catches boosters & ships – no legs needed',
      },
    ],
  },
]

export default function AssetsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-6">SpaceX Assets</h1>
        <p className="text-xl md:text-2xl text-gray-400 text-center mb-20">
          Launch pads, droneships, capsules, and the future
        </p>

        {assets.map((section) => (
          <div key={section.category} className="mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">{section.category}</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="group bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden hover:border-red-800/50 transition-all"
                >
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold">{item.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-300 text-lg">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="text-center text-gray-500 mt-20 text-lg">
          All images: Public domain / Wikimedia Commons • Data as of November 2025
        </p>
      </div>
    </div>
  )
}