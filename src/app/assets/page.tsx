// src/app/assets/page.tsx
import Image from 'next/image'

export const revalidate = 86400  // Daily refresh

const assets = [
  {
    category: 'Launch Bases',
    items: [
      {
        name: 'Starbase (Boca Chica, TX)',
        image: 'https://i.imgur.com/starbase-render.jpg',  // Grok-generated: Starbase pad with Mechazilla tower under sunset sky
        specs: 'Primary Starship hub | 2 pads (A & B) | 121m towers | Water deluge system (422k gal/launch) | 11 IFTs by Nov 2025 | ~5,000 employees',
        note: 'Mars factory – home of Super Heavy catches',
      },
      {
        name: 'LC-39A (Kennedy Space Center, FL)',
        image: 'https://i.imgur.com/lc39a-render.jpg',  // Grok-generated: LC-39A tower with Falcon Heavy stack at dawn
        specs: 'Falcon/Starship shared | 1,300-acre historic site | 145m tower | Deluge system + tank farm | 500+ Falcon launches | Apollo/Space Shuttle legacy',
        note: 'East Coast powerhouse – Starship ops by 2026',
      },
      {
        name: 'SLC-40 (Cape Canaveral, FL)',
        image: 'https://i.imgur.com/slc40-render.jpg',  // Grok-generated: SLC-40 pad with Falcon 9 vertical at night
        specs: 'Falcon 9/Heavy dedicated | 150m tower | 100+ launches/year | RTLS landings | Fairing recovery ops | 3.7m diameter rockets',
        note: 'High-cadence beast – 150 Falcon flights in 2025',
      },
      {
        name: 'SLC-4E (Vandenberg, CA)',
        image: 'https://i.imgur.com/slc4e-render.jpg',  // Grok-generated: SLC-4E with Falcon 9 in coastal fog
        specs: 'West Coast polar orbits | 1,200-acre site | 100m tower | 50+ launches | Starlink west launches | Ocean views for drone landings',
        note: 'Polar + Starlink specialist – 28 sats per flight',
      },
    ],
  },
  {
    category: 'Droneships',
    items: [
      {
        name: 'Of Course I Still Love You (OCISLY)',
        image: 'https://i.imgur.com/ocisly-render.jpg',  // Grok-generated: OCISLY barge with landed Falcon booster at sea
        specs: 'Marmac 304 barge | 90m long | 4 thrusters for positioning | 171 landings (163 success) | Pacific ops | Iain M. Banks homage',
        note: 'West Coast veteran – first drone ship landing (2016)',
      },
      {
        name: 'Just Read the Instructions (JRTI)',
        image: 'https://i.imgur.com/jrti-render.jpg',  // Grok-generated: JRTI with Falcon 9 booster secured, waves crashing
        specs: 'Marmac 303 barge | 90m long | GPS + thrusters | 143 landings (140 success) | East Coast ops | Iain M. Banks homage',
        note: 'Florida workhorse – 150th Falcon milestone (2025)',
      },
      {
        name: 'A Shortfall of Gravitas (ASOG)',
        image: 'https://i.imgur.com/asog-render.jpg',  // Grok-generated: ASOG in Atlantic storm, booster landing glow
        specs: 'Marmac 302 barge | 90m long | Autonomous positioning | 135 landings (134 success) | East Coast ops | Iain M. Banks homage',
        note: 'Newest addition – CRS-23 first landing (2021)',
      },
    ],
  },
  {
    category: 'Capsules',
    items: [
      {
        name: 'Crew Dragon (Resilience C207)',
        image: 'https://i.imgur.com/crew-dragon-render.jpg',  // Grok-generated: Crew Dragon docked to ISS, Earth backdrop
        specs: 'Crewed variant | 4–7 crew | 8.1m tall | 3,000 kg return mass | SuperDraco escape (8 engines) | 210 days docked | Heat shield for ocean splashdown',
        note: 'ISS rotations + private (Inspiration4, Polaris Dawn)',
      },
      {
        name: 'Cargo Dragon (C211)',
        image: 'https://i.imgur.com/cargo-dragon-render.jpg',  // Grok-generated: Cargo Dragon approaching ISS with trunk deployed
        specs: 'Uncrewed cargo | 6,000 kg up / 3,000 kg down | 8.1m tall | Trunk for unpressurized | Draco thrusters | Solar arrays | CRS-2 missions',
        note: 'Supply runs to ISS – 30+ flights by 2025',
      },
    ],
  },
  {
    category: 'Other Assets',
    items: [
      {
        name: 'Reusable Boosters',
        image: 'https://i.imgur.com/booster-render.jpg',  // Grok-generated: Falcon 9 booster landing on droneship at dusk
        specs: 'Falcon 9 Block 5 | 9 Merlin 1D engines | 20+ reuses | Grid fins for steering | Octaweb landing legs | 98% success rate',
        note: 'B1058 flew 21 times – reusability king',
      },
      {
        name: 'Starlink Ground Stations',
        image: 'https://i.imgur.com/starlink-ground-render.jpg',  // Grok-generated: Starlink gateway in remote field, satellite beam
        specs: 'Global gateways | Phased array antennas | 10 Gbps links | Laser inter-sats | 8M+ users | 1.5M km² coverage',
        note: 'Backbone of global internet – 10k+ sats in orbit',
      },
    ],
  },
  {
    category: 'Satellites & Constellation',
    items: [
      {
        name: 'Starlink v1.5',
        image: 'https://i.imgur.com/starlink-v15-deploy.jpg',  // Grok-generated: v1.5 sat with laser links glowing in orbit
        specs: 'Mass: 307 kg | Size: 2.8 × 1.5 m | 4 laser terminals | 100+ Gbps per sat | Ku/Ka-band | Argon Hall thrusters | Deorbit in <5 years',
        note: 'First generation with inter-satellite lasers – enabled global coverage without ground stations',
      },
      {
        name: 'Starlink v2 Mini',
        image: 'https://i.imgur.com/starlink-v2mini.jpg',  // Grok-generated: v2 Mini unfolding solar arrays + laser array
        specs: 'Mass: 850 kg | 3.3× longer solar array | 4× more bandwidth | E-band phased array | 3× laser links | 300+ Gbps per sat | Krypton thrusters',
        note: 'Current workhorse – launched 60+ per Falcon 9 | Powers 8M+ users worldwide',
      },
      {
        name: 'Starlink v2 Mini Direct-to-Cell',
        image: 'https://i.imgur.com/starlink-dtc.jpg',  // Grok-generated: v2 Mini DTC with massive cell antenna deployed
        specs: 'Mass: ~900 kg | Giant 25 m² phased-array antenna | Acts as cell tower in space | 7 MHz LTE bandwidth | 2–4 Mbps per beam | Works with unmodified phones',
        note: 'Live in 20+ countries – text now, voice/data 2025 | T-Mobile, Rogers, Optus, KDDI partners',
      },
      {
        name: 'Starlink v3 (Future)',
        image: 'https://i.imgur.com/starlink-v3-concept.jpg',  // Grok-generated: v3 sat with huge folded antenna + laser grid
        specs: 'Mass: ~1,800 kg | Launch on Starship | 10× bandwidth of v2 | 100+ laser links | Direct-to-home 1–10 Gbps | Full mobile backhaul',
        note: 'Coming 2026+ – will make Starship economically mandatory',
      },
    ],
  },
]

export default function AssetsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-6">SpaceX Assets</h1>
        <p className="text-xl md:text-2xl text-gray-400 text-center mb-20">Launch pads, ships, capsules, and more – the full ecosystem</p>

        {assets.map((category) => (
          <section key={category.category} className="mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-red-400">{category.category}</h2>
            <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="group bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-3xl overflow-hidden hover:border-red-800/50 transition-all"
                >
                  <div className="grid md:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-80 md:h-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{item.name}</h3>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="p-6 md:p-8 space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-gray-300">Key Specs</h4>
                        <p className="text-gray-400 leading-relaxed">{item.specs}</p>
                      </div>
                      {item.note && (
                        <div className="pt-4 border-t border-zinc-700">
                          <p className="text-sm text-gray-500 italic">{item.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <p className="text-center text-gray-500 mt-20 text-lg">
          Data as of November 2025 • Sources: SpaceX.com, Wikipedia, NSF
        </p>
      </div>
    </div>
  )
}