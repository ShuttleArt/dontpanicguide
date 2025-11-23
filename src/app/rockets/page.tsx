// src/app/rockets/page.tsx
import Image from 'next/image'

export const revalidate = 86400

const rockets = [
  {
    name: 'Falcon 1',
    image: 'https://i.imgur.com/3rJ9k8P.jpg',  // ← Grok-generated: Falcon 1 Flight 4 liftoff
    status: 'Retired (2006–2009)',
    height: '21.3 m',
    payloadLEO: '670 kg',
    engine: '1 × Merlin 1C → 1D',
    fuel: 'RP-1 / LOX',
    thrustSL: '454 kN',
    ispVac: '304 s',
    note: 'First privately developed liquid-fuel rocket to orbit',
  },
  {
    name: 'Falcon 9 Block 5',
    image: 'https://i.imgur.com/8vL2mXw.jpg',  // ← Grok-generated: Block 5 on pad, clean shot
    status: 'Active · 500+ flights',
    height: '70 m',
    payloadLEO: '22,800 kg',
    engine: '9 × Merlin 1D+',
    fuel: 'RP-1 / LOX',
    thrustSL: '7,607 kN',
    ispVac: '311 s',
    note: 'Most flown rocket in history',
  },
  {
    name: 'Falcon Heavy',
    image: 'https://i.imgur.com/QwE7r9N.jpg',  // ← Grok-generated: Falcon Heavy Demo 2 liftoff
    status: 'Active · Most powerful operational rocket',
    height: '70 m',
    payloadLEO: '63,800 kg',
    engine: '27 × Merlin 1D+',
    fuel: 'RP-1 / LOX',
    thrustSL: '22,819 kN',
    ispVac: '311 s',
    note: 'Sent Tesla Roadster to space in 2018',
  },
  {
    name: 'Starship + Super Heavy',
    image: 'https://i.imgur.com/5pX9vZk.jpg',  // ← Grok-generated: Full stack at Starbase
    status: 'In Development · IFT-7 soon',
    height: '121 m',
    payloadLEO: '150+ t reusable',
    engine: '33 × Raptor 2 (booster) · 6 × Raptor (ship)',
    fuel: 'CH₄ / LOX',
    thrustSL: '~75,900 kN',
    ispVac: '380 s',
    note: 'Fully reusable · Designed for Mars',
  },
]

export default function RocketsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-6">SpaceX Rockets</h1>
        <p className="text-xl md:text-2xl text-gray-400 text-center mb-20">
          From Falcon 1 to Starship – Full Specs & Engines
        </p>

        <div className="grid gap-12 md:gap-16 lg:grid-cols-2">
          {rockets.map((rocket) => (
            <div
              key={rocket.name}
              className="group bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-3xl overflow-hidden hover:border-red-800/50 transition-all"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-96 md:h-full overflow-hidden">
                  <Image
                    src={rocket.image}
                    alt={rocket.name}
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
                  <div className="grid grid-cols-2 gap-6 text-lg">
                    <div><span className="text-gray-500">Height</span><p className="font-bold text-xl">{rocket.height}</p></div>
                    <div><span className="text-gray-500">Payload LEO</span><p className="font-bold text-xl">{rocket.payloadLEO}</p></div>
                    <div><span className="text-gray-500">Engine</span><p className="font-bold text-xl">{rocket.engine}</p></div>
                    <div><span className="text-gray-500">Fuel</span><p className="font-bold text-green-400 text-xl">{rocket.fuel}</p></div>
                    <div><span className="text-gray-500">Thrust (SL)</span><p className="font-bold text-xl">{rocket.thrustSL}</p></div>
                    <div><span className="text-gray-500">ISP (vac)</span><p className="font-bold text-xl">{rocket.ispVac}</p></div>
                  </div>
                  <p className="text-lg text-gray-300 pt-6 border-t border-zinc-700">{rocket.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}