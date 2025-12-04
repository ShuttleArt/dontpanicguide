// src/app/core/page.tsx
export const revalidate = 86400

const core = [
  {
    category: 'Launch Bases',
    items: [
      {
        name: 'LC-39A – Kennedy Space Center, FL',
        image: '/images/lc39a.jpg',
        specs: 'Falcon + Starship shared | 145m tower | Deluge + tank farm | 500+ Falcon launches | Historic Apollo/Saturn V pad',
        note: 'Apollo & Space Shuttle legacy – now the heart of Starship',
      },
      {
        name: 'SLC-40 – Cape Canaveral, FL',
        image: '/images/slc40.jpg',
        specs: 'Falcon 9/Heavy dedicated | 150m tower | 100+ launches/year | RTLS landings | Fairing recovery | 3.7m rockets',
        note: 'SpaceX’s most active pad – workhorse of the Falcon fleet',
      },
      {
        name: 'SLC-4E – Vandenberg, CA',
        image: '/images/slc4e.jpg',
        specs: 'Polar orbit launches | 100m tower | 50+ launches | Starlink west coast | Drone ship landings in Pacific',
        note: 'Only West Coast Falcon pad – critical for polar Starlink',
      },
      {
        name: 'Starbase – Boca Chica, TX',
        image: '/images/starbase.jpg',
        specs: 'Starship factory + launch site | 2 orbital pads | 121m towers | 422k gal water deluge | 11 IFTs by Nov 2025',
        note: 'Birthplace of Starship – future Mars launch site',
      },
    ],
  },
  {
    category: 'Droneships',
    items: [
      {
        name: 'Just Read The Instructions (JRTI)',
        image: '/images/jrti.jpg',
        specs: 'Marmac 303 | 90m × 30m | 143 landings | 140 successes | East Coast ops | GPS + thrusters',
        note: 'Named after Iain M. Banks ship – Atlantic Ocean',
      },
      {
        name: 'Of Course I Still Love You (OCISLY)',
        image: '/images/ocisly.jpg',
        specs: 'Marmac 304 | 90m × 30m | 171 landings | 163 successes | Pacific ops | 4 thrusters',
        note: 'West Coast veteran – Pacific Ocean',
      },
      {
        name: 'A Shortfall of Gravitas (ASOG)',
        image: '/images/asog.jpg',
        specs: 'Marmac 302 | 90m × 30m | 135 landings | 134 successes | Autonomous positioning | Gulf of Mexico',
        note: 'Newest & smartest droneship – Iain M. Banks tribute',
      },
    ],
  },
  {
    category: 'Capsules',
    items: [
      {
        name: 'Crew Dragon (C206–C212)',
        image: '/images/crewdragon.jpg',
        specs: '4–7 crew | 8.1m tall | SuperDraco abort (8 engines) | 210 days docked | PICA-X heat shield | Ocean splashdown',
        note: 'NASA Commercial Crew – 12+ crewed flights by 2025',
      },
      {
        name: 'Cargo Dragon 2',
        image: '/images/cargo-dragon.jpg',
        specs: '6,000 kg up / 3,000 kg down | Trunk cargo | Draco thrusters | Solar arrays | Automated docking',
        note: 'CRS-2 missions – supplies to ISS',
      },
    ],
  },
  {
    category: 'Starship Prototypes',
    items: [
      {
        name: 'Ship 33 + Booster 15',
        image: '/images/starship-ship33.jpg',
        specs: '9m diameter | 50m tall (Ship) | 71m tall (Booster) | 33 Raptor engines (Booster) | 6 Raptors (Ship) | Full hot-stage ring | Heat shield tiles v2',
        note: 'Next flight candidate – IFT-7 (Dec 2025)',
      },
      {
        name: 'Ship 34 + Booster 16',
        image: '/images/starship-s34.jpg',
        specs: 'Block 2 upgrades | Improved heat shield | Redesigned forward flaps | 9 Raptor Vacuum (Ship) | 35 Raptor engines (Booster)',
        note: 'In final assembly – IFT-8 candidate',
      },
      {
        name: 'Mechazilla Tower',
        image: '/images/mechazilla-tower.jpg',
        specs: '146m tall | 2 chopstick arms | 1,000+ ton lift capacity | Catches booster + ship | No landing legs needed | Hydraulic + electric',
        note: 'First successful booster catch: IFT-5 (Oct 2025)',
      },
    ],
  },
]

export default function CorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          SpaceX Core
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 text-center mb-20">
          Launch pads, droneships, capsules, and the future of spaceflight
        </p>

        {core.map((section) => (
          <div key={section.category} className="mb-32">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              {section.category}
            </h2>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="group bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden hover:border-red-700/60 transition-all duration-300 shadow-2xl"
                >
                  {/* Image or placeholder */}
                  {item.image ? (
                    <div className="relative h-72 md:h-80 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <h3 className="absolute bottom-6 left-6 right-6 text-2xl md:text-3xl font-bold">
                        {item.name}
                      </h3>
                    </div>
                  ) : (
                    <div className="h-72 md:h-80 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                      <h3 className="text-3xl md:text-4xl font-bold text-center px-8">{item.name}</h3>
                    </div>
                  )}

                  {/* Specs & Note */}
                  <div className="p-8 space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-300 mb-3">Key Specs</h4>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base">{item.specs}</p>
                    </div>
                    <p className="text-gray-300 italic text-lg border-t border-zinc-800 pt-4">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <footer className="text-center py-16 text-gray-500 border-t border-zinc-800 mt-20">
          <p className="text-lg">All data live • November 2025 • Built with love for the future</p>
        </footer>
      </div>
    </div>
  )
}