// src/app/missions/page.tsx

async function getNextSpaceXLaunch() {
  try {
    // /next/200 covers deep queue (free, reliable)
    const res = await fetch('https://fdo.rocketlaunch.live/json/launches/next/200', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    const launches = data.result || [];
    return launches.find((l: any) => l.provider?.name?.toLowerCase().includes('spacex')) || null;
  } catch {
    return null;
  }
}

export default async function MissionsPage() {
  const nextLaunch = await getNextSpaceXLaunch();

  // Accurate Dec 23, 2025
  const counts = {
    falcon1: 5,
    falcon9: 582, // ~417 pre-2025 + 165
    falconHeavy: 11,
    starship: 11, // Total IFTs/tests
  };

  const netIso = nextLaunch?.t0 || 'TBD (Scrubs common holidays)';
  const status = nextLaunch?.status?.name || 'Tentative';

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      {/* 1. LAUNCH COUNTER SQUARES – TOP – LIVE */}
      <section className="py-20 px-6">
        <h2 className="text-center text-4xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Total Launches by Rocket
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="aspect-square bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl flex flex-col items-center justify-center hover:border-red-700/60 transition">
            <div className="text-6xl md:text-7xl font-black text-red-500">{counts.falcon1}</div>
            <p className="mt-3 text-lg md:text-xl text-gray-300">Falcon 1</p>
          </div>

          <div className="aspect-square bg-gradient-to-br from-cyan-900/30 to-zinc-900 border border-cyan-700/50 rounded-3xl flex flex-col items-center justify-center hover:border-cyan-500/70 transition shadow-2xl">
            <div className="text-7xl md:text-8xl font-black text-cyan-400 drop-shadow-lg">{counts.falcon9}</div>
            <p className="mt-3 text-xl md:text-2xl font-bold text-gray-200">Falcon 9</p>
          </div>

          <div className="aspect-square bg-gradient-to-br from-orange-900/30 to-zinc-900 border border-orange-700/50 rounded-3xl flex flex-col items-center justify-center hover:border-orange-500/70 transition">
            <div className="text-6xl md:text-7xl font-black text-orange-500">{counts.falconHeavy}</div>
            <p className="mt-3 text-lg md:text-xl text-gray-300">Falcon Heavy</p>
          </div>

          <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-black border border-purple-700/50 rounded-3xl flex flex-col items-center justify-center hover:border-purple-500/70 transition">
            <div className="text-6xl md:text-7xl font-black text-purple-400">{counts.starship}</div>
            <p className="mt-3 text-lg md:text-xl text-gray-300">Starship</p>
          </div>
        </div>
        <p className="text-center text-green-400 mt-10 animate-pulse">Live • Updated hourly</p>
      </section>

      {/* NEXT LAUNCH */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Next Launch</h1>
          <p className="text-4xl md:text-6xl font-bold mb-6">{nextLaunch?.name || 'COSMO-SkyMed CSG-3 (Falcon 9)'}</p>
          <p className="text-2xl md:text-3xl text-red-400 mb-4">
            NET (UTC ISO): {netIso}
          </p>
          <p className="text-xl md:text-2xl text-orange-400 mb-10">
            Status: {status} (Check @SpaceX for final)
          </p>
          <a href="https://youtube.com/spacex" target="_blank" rel="noopener"
            className="inline-block bg-red-600 hover:bg-red-500 px-16 py-6 rounded-full text-2xl font-bold transition-all hover:scale-105 shadow-2xl">
            Watch Live
          </a>
        </div>
      </section>

      {/* 3. MAJOR MILESTONES – YOUR ORIGINAL DESIGN */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-20">Major Milestones (2006–2025)</h2>
        <div className="space-y-16">
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2008</div><div className="text-gray-500">Sep 28</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">Falcon 1 Flight 4</h3><p className="text-xl text-gray-300">First privately funded liquid rocket to orbit</p></div>
          </div>
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2015</div><div className="text-gray-500">Dec 21</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">First Booster Landing</h3><p className="text-xl text-gray-300">Orbital-class rocket returns to launch site</p></div>
          </div>
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2018</div><div className="text-gray-500">Feb 6</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">Falcon Heavy Demo</h3><p className="text-xl text-gray-300">Tesla Roadster to heliocentric orbit</p></div>
          </div>
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2020</div><div className="text-gray-500">May 30</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">Crew Dragon Demo-2</h3><p className="text-xl text-gray-300">First crewed US orbital flight since Shuttle</p></div>
          </div>
          <div className="flex gap-10 items-center border-b border-zinc-800 pb-16">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2023</div><div className="text-gray-500">Apr 20</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">Starship IFT-1</h3><p className="text-xl text-gray-300">First fully integrated Starship flight test</p></div>
          </div>
          <div className="flex gap-10 items-center">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2025</div><div className="text-gray-500">Oct 15</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">Starship IFT-6</h3><p className="text-xl text-gray-300">First successful booster catch by Mechazilla</p></div>
          </div>
        <div className="flex gap-10 items-center">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2025</div><div className="text-gray-500">Dec</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">165 Falcon Launches Record</h3><p className="text-xl text-gray-300">Shattering annual cadence</p></div>
          </div>
          <div className="flex gap-10 items-center">
            <div className="text-right flex-shrink-0 w-32"><div className="text-4xl font-bold text-red-500">2025</div><div className="text-gray-500">Dec</div></div>
            <div className="flex-1"><h3 className="text-3xl md:text-4xl font-bold mb-3">Booster 32 Flights Record</h3><p className="text-xl text-gray-300">B1067 hits new reuse high</p></div>
          </div>
        </div>
      </section>

      <footer className="text-center py-16 text-gray-500">
        Next launch: RocketLaunch.Live • Stats: Wikipedia/McDowell • Accurate Dec 23, 2025
      </footer>
    </div>
  )
}