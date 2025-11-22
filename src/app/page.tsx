import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        <div className="bg-zinc-900/50 border border-red-900/30 rounded-2xl p-10 text-center">
          <div className="text-5xl font-bold text-red-500">42</div>
          <div className="mt-2 text-gray-400">Total Rocket Types (including the Answer)</div>
        </div>
        <div className="bg-zinc-900/50 border border-red-900/30 rounded-2xl p-10 text-center">
          <div className="text-5xl font-bold text-red-500">Live</div>
          <div className="mt-2 text-gray-400">Data updates automatically every day</div>
        </div>
        <div className="bg-zinc-900/50 border border-red-900/30 rounded-2xl p-10 text-center">
          <div className="text-5xl font-bold text-red-500">∞</div>
          <div className="mt-2 text-gray-400">No maintenance. Ever.</div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center my-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">So long, and thanks for all the launches</h2>
        <Link href="/rockets" className="inline-block bg-red-600 hover:bg-red-500 px-12 py-6 rounded-full text-2xl font-bold transition transform hover:scale-105">
          Start Exploring 🚀
        </Link>
      </div>

      {/* SpaceX logo or Starship image */}
      <div className="flex justify-center mt-20 opacity-50">
        <img 
          src="https://www.spacex.com/favicon.ico" 
          alt="SpaceX" 
          width={128} 
          height={128} 
        />
      </div>
    </>
  )
}