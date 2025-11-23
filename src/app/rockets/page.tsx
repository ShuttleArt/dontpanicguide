// src/app/rockets/page.tsx
import Image from 'next/image'

export const revalidate = 86400  // Daily refresh

const rockets = [
  {
    name: 'Falcon 1',
    image: 'https://live.staticflickr.com/3882/14850115573_9c2c7e5b0f_o.jpg',  // Official SpaceX Flickr – high-res Falcon 1
    status: 'Retired (2006–2009)',
    height: '21.3 m',
    diameter: '1.7 m',
    mass: '38,555 kg',
    payloadLEO: '670 kg',
    engine: '1 × Merlin 1C → 1D',
    fuel: 'RP-1 / LOX (kerosene + liquid oxygen)',
    thrustSL: '454 kN (102,000 lbf)',
    thrustVac: '505 kN (113,500 lbf)',
    ispSL: '255 s',
    ispVac: '304 s',
    note: 'First privately developed liquid-fuel rocket to reach orbit (5 flights total)',
  },
  {
    name: 'Falcon 9 (Block 5)',
    image: 'https://live.staticflickr.com/65535/53492143454_1f7a9f3b4d_o.jpg',  // Official SpaceX Flickr – Falcon 9 Block 5
    status: 'Active (500+ launches)',
    height: '70 m',
    diameter: '3.7 m',
    mass: '549,054 kg',
    payloadLEO: '22,800 kg (reusable: 13,150 kg)',
    engine: '9 × Merlin 1D+ (first stage)',
    fuel: 'RP-1 / LOX (kerosene + liquid oxygen)',
    thrustSL: '7,607 kN (1.71 million lbf)',
    thrustVac: '8,227 kN (1.85 million lbf)',
    ispSL: '282 s',
    ispVac: '311 s',
    note: 'World\'s most reliable orbital rocket – reusable boosters fly 20+ times',
  },
  {
    name: 'Falcon Heavy',
    image: 'https://live.staticflickr.com/3882/25254688767_8a7b2c4e2f_o.jpg',  // Official SpaceX Flickr – Falcon Heavy demo
    status: 'Active (10+ launches)',
    height: '70 m',
    diameter: '12.2 m (with boosters)',
    mass: '1,420,788 kg',
    payloadLEO: '63,800 kg (reusable: 26,700 kg)',
    engine: '27 × Merlin 1D+ (3 cores)',
    fuel: 'RP-1 / LOX (kerosene + liquid oxygen)',
    thrustSL: '22,819 kN (5.13 million lbf)',
    thrustVac: '24,681 kN (5.55 million lbf)',
    ispSL: '282 s',
    ispVac: '311 s',
    note: 'Most powerful operational rocket – sent Tesla Roadster to space in 2018',
  },
  {
    name: 'Starship (Full Stack)',
    image: 'https://live.staticflickr.com/65535/53492143454_1f7a9f3b4d_o.jpg',  // Official SpaceX Flickr – Starship stack
    status: 'In Development (IFT-7 soon)',
    height: '121 m',
    diameter: '9 m',
    mass: '5,000,000+ kg',
    payloadLEO: '100–150 t (reusable)',
    engineBooster: '33 × Raptor 2 (Super Heavy)',
    engineShip: '6 × Raptor (3 SL + 3 Vac)',
    fuel: 'CH4 / LOX (methane + liquid oxygen)',
    thrustSL: '72,000 kN (16.2 million lbf) – booster',
    thrustVac: '1,500 kN (337,000 lbf) – vacuum Raptor',
    ispSL: '327 s',
    ispVac: '380 s',
    note: 'Fully reusable super heavy-lift – designed for Mars colonization',
  },
]

export default function RocketsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-6">SpaceX Rockets</h1>
        <p className="text-xl md:text-2xl text-gray-400 text-center mb-20">From Falcon 1 to Starship – Full Specs & Engines</p>

        <div className="grid gap-12 md:gap-16 lg:grid-cols-2">
          {rockets.map((rocket, index) => (
            <div
              key={rocket.name}
              className="group bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-3xl overflow-hidden hover:border-red-800/50 transition-all duration-300"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-96 md:h-full overflow-hidden">
                  <Image
                    src={rocket.image}
                    alt={`${rocket.name} rocket`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{rocket.name}</h2>
                    <span className="text-red-400 text-lg">{rocket.status}</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="p-8 md:p-12 space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
                    <div>
                      <span className="text-gray-500 block">Height</span>
                      <p className="font-bold text-white">{rocket.height}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Payload to LEO</span>
                      <p className="font-bold text-white">{rocket.payloadLEO}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Engine</span>
                      <p className="font-bold text-white">{rocket.engine || rocket.engineBooster}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Fuel Type</span>
                      <p className="font-bold text-green-400">{rocket.fuel}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Thrust (SL)</span>
                      <p className="font-bold text-white">{rocket.thrustSL}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 block">ISP (Vacuum)</span>
                      <p className="font-bold text-white">{rocket.ispVac}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-700">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {rocket.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-20 text-lg">
          Data current as of November 2025 • Sources: SpaceX.com, Wikipedia
        </p>
      </div>
    </div>
  )
}