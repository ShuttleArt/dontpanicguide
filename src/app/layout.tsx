// app/layout.tsx
import './globals.css'
import { Luckiest_Guy } from 'next/font/google'
import Link from 'next/link'
import '@fontsource/luckiest-guy'   // ← this line makes the font work

const luckiest = Luckiest_Guy({ weight: '400', subsets: ['latin'] })

export const metadata = {
  title: "Don't Panic Guide – The Ultimate SpaceX Resource",
  description: "Always up-to-date rockets, missions, Starlink, history and quizzes.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {/* BIG DON'T PANIC HEADER — now super bright */}
<header className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-black py-20 md:py-32">
  <div className="relative max-w-6xl mx-auto px-6 text-center">
    <h1 className={`${luckiest.className} text-7xl md:text-9xl lg:text-[180px] leading-none tracking-tighter text-white drop-shadow-2xl`}>
      DON&apos;T PANIC
    </h1>
    <p className="mt-6 text-xl md:text-3xl text-white/95 font-light tracking-wide">
      The Ultimate SpaceX Resource – In Large, Friendly Letters
    </p>
  </div>
</header>

        {/* STICKY MENU — now bright white + red hover */}
<nav className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-red-900/50">
  <div className="max-w-6xl mx-auto px-6 py-5">
    <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-lg font-medium">
      {['Home','History','Rockets','Missions','Starlink','Satellites','Quizzes'].map((item)=>(
        <Link key={item} href={item==='Home'?'/':`/${item.toLowerCase()}`}
          className="text-white hover:text-red-400 transition duration-300 hover:scale-110">
          {item}
        </Link>
      ))}
    </div>
  </div>
</nav>

        {/* PAGE CONTENT GOES HERE */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-zinc-950 py-12 text-center text-sm opacity-60 mt-20">
          <p>Built by an indie hacker • Data from api.spacexdata.com • {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  )
}