'use client'

import { useState } from 'react'

const quiz = [
  { q: "Which rocket family can land boosters?", o: ["Falcon 9", "Atlas V", "Ariane 5", "SLS"], a: 0 },
  { q: "How many Raptor engines on Super Heavy booster (2025)?", o: ["31", "33", "35", "39"], a: 1 },
  { q: "First orbital rocket to be reused?", o: ["Falcon 9", "Space Shuttle", "Starship", "Electron"], a: 0 },
  { q: "Starlink satellites per launch right now (average 2025)?", o: ["22", "54", "60+", "120"], a: 2 },
  { q: "What does ASDS stand for?", o: ["Autonomous Spaceport Drone Ship", "Always Super Dangerous Stuff", "A Ship Does Stuff", "All Systems Deployed Successfully"], a: 0 },
  { q: "First crewed Dragon mission name?", o: ["Crew-1", "Demo-2", "Inspiration4", "Crew Dragon 1"], a: 1 },
  { q: "How many engines on Starship (ship only)?", o: ["3", "6", "9", "12"], a: 1 },
  { q: "Name of the first reused Falcon 9 booster?", o: ["B1021", "B1058", "B1031", "B0001"], a: 0 },
  { q: "What is the main material of Starship?", o: ["Aluminium", "Carbon fibre", "Stainless steel", "Titanium"], a: 2 },
  { q: "Elon’s favourite number (obviously)?", o: ["13", "42", "69", "420"], a: 1 },
  { q: "First Falcon Heavy side booster landing?", o: ["Never happened", "Both landed", "One landed", "Both crashed"], a: 1 },
  { q: "Starship’s heat shield material?", o: ["Ablative", "Ceramic tiles", "Nickel alloy", "Gold foil"], a: 1 },
  { q: "Current record for most reuses of a single booster?", o: ["16", "21", "28", "33"], a: 2 },
  { q: "Name of the drone ship that reads “I still love you”?", o: ["Of Course I Still Love You", "Just Read The Instructions", "A Shortfall of Gravitas", "Love Me Tender"], a: 0 },
  { q: "First fully successful Starship orbital flight test (as of Nov 2025)?", o: ["IFT-1", "IFT-3", "IFT-5", "Still waiting"], a: 3 },
  { q: "How tall is the full Starship stack?", o: ["50 m", "90 m", "120 m", "150 m"], a: 2 },
  { q: "What does “hot staging” mean?", o: ["Upper stage lights engines while still attached", "Booster lights engines while hot", "Re-entry plasma", "Coffee break"], a: 0 },
  { q: "First private company to dock with the ISS?", o: ["SpaceX", "Blue Origin", "Virgin Galactic", "Rocket Lab"], a: 0 },
  { q: "Starship payload to LEO (fully reusable)?", o: ["100 t", "150 t", "250 t", "500 t"], a: 1 },
  { q: "What is the name of the tower that catches the booster?", o: ["Mechazilla", "Chopstick Tower", "Tower of Terror", "The Claw"], a: 0 },
  { q: "First Falcon 9 landing on land (not drone ship)?", o: ["ORBCOMM OG2", "CRS-8", "SES-10", "CRS-11"], a: 0 },
  { q: "Which mission had the Tesla Roadster in space?", o: ["Falcon Heavy test flight", "Starlink 1", "Crew Dragon Demo-1", "GPS III"], a: 0 },
  { q: "Starship’s planned propellant?", o: ["RP-1 + LOX", "Hydrogen + LOX", "Methane + LOX", "Solid"], a: 2 },
  { q: "How many successful booster catches so far (Nov 2025)?", o: ["0", "1", "2", "5+"], a: 1 },
  { q: "What is “Boca Chica” now officially renamed to?", o: ["Starbase", "Mars City", "South Padre", "Elonville"], a: 0 },
  { q: "First all-civilian orbital mission?", o: ["Inspiration4", "Polaris Dawn", "DearMoon", "Crew-3"], a: 0 },
  { q: "Falcon 9 Block 5 first flight?", o: ["May 2018", "January 2019", "March 2020", "November 2016"], a: 0 },
  { q: "How many Starlink satellites launched in total (Nov 2025)?", o: ["< 5000", "5000–7000", "7000–9000", "> 9000"], a: 2 },
  { q: "What does the “42” on the Roadster dashboard mean?", o: ["Speed limit", "Answer to life", "Launch attempt number", "Elon’s age"], a: 1 },
  { q: "Starship’s final goal destination?", o: ["Moon", "Mars", "Both", "Venus"], a: 2 },
  { q: "First booster to fly 20 times?", o: ["B1058", "B1062", "B1071", "B1081"], a: 0 },
  { q: "Name of the spaceship that will go around the Moon with dearMoon?", o: ["Starship HLS", "DearMoon Starship", "Ship 24", "Still unnamed"], a: 1 },
  { q: "What does “RUD” stand for?", o: ["Rapid Unscheduled Disassembly", "Really Ugly Design", "Rocket Under Development", "Return Under Doubt"], a: 0 },
  { q: "Current Starship prototype that caught the booster?", o: ["Ship 30", "Ship 31", "Ship 33", "Ship 29"], a: 0 },
  { q: "How many engines light for booster catch burn?", o: ["1", "3", "9", "13"], a: 3 },
  { q: "First customer for Starship lunar lander?", o: ["NASA", "JAXA", "ESA", "China"], a: 0 },
  { q: "What is the name of the new drone ship (2024)?", o: ["A Shortfall of Gravitas", "Megabay 1", "Gravity Wins", "Still in construction"], a: 0 },
  { q: "Starship’s first full stack orbital attempt?", o: ["April 2023", "November 2023", "March 2024", "October 2024"], a: 0 },
  { q: "What is the grid fins made of?", o: ["Aluminium", "Titanium", "Steel", "Carbon"], a: 1 },
  { q: "How many people has SpaceX sent to space so far?", o: ["< 20", "20–40", "40–60", "> 60"], a: 3 },
  { q: "What is the famous phrase painted on the drone ships?", o: ["I love you", "Don’t Panic", "To the Moon", "Mars or Bust"], a: 0 },
  { q: "First Falcon 9 to fly 15+ times?", o: ["B1058", "B1060", "B1073", "B1080"], a: 0 },
  { q: "Starship’s planned refueling method in orbit?", o: ["Depot ship", "Direct ship-to-ship", "Both", "None"], a: 2 },
  { q: "What is the name of the launch pad for Starship?", o: ["LC-39A", "SLC-40", "Starbase OLM", "Vandenberg"], a: 2 },
  { q: "First payload to be caught by Mechazilla?", o: ["Booster", "Starship", "Nothing yet", "Dummy mass"], a: 0 },
  { q: "What is the diameter of Starship?", o: ["7 m", "9 m", "12 m", "15 m"], a: 1 },
  { q: "What is the famous “How hard can it be?” tweet about?", o: ["Reusability", "Electric cars", "Tunnels", "All of them"], a: 0 },
  { q: "Current record for fastest booster turnaround?", o: ["< 1 month", "21 days", "9 days", "3 days"], a: 2 },
  { q: "What is the ultimate goal of SpaceX?", o: ["Make life multiplanetary", "Sell satellites", "Win NASA contracts", "Beat Blue Origin"], a: 0 },
  { q: "The Answer to Life, the Universe, and Everything?", o: ["42", "69", "420", "9000"], a: 0 }   
    ]

export default function QuizPage() {
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)

  const answer = (idx: number) => {
    const isCorrect = idx === quiz[i].a
    if (isCorrect) setScore(score + 1)
    setFeedback(isCorrect ? 'correct' : 'wrong')

    // Show feedback for 1.2 seconds then move on
    setTimeout(() => {
      setFeedback(null)
      if (i === quiz.length - 1) setDone(true)
      else setI(i + 1)
    }, 1200)
  }

  if (done) {
    return (
      <div className="text-center py-40">
        <h1 className="text-8xl font-bold text-white mb-8">Quiz Complete!</h1>
        <p className="text-6xl text-white">Score: {score} / {quiz.length}</p>
        <p className="text-4xl text-white/90 mt-8">
          {score >= 40 ? "🚀 Absolute Legend" : score >= 30 ? "Mostly Harmless" : "Don’t Panic… study more"}
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-7xl font-bold text-white mb-16">SpaceX Trivia Quiz</h1>

        <div className="bg-zinc-900/90 rounded-3xl p-12 shadow-2xl border border-red-900/50">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-12">
            {quiz[i].q}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quiz[i].o.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => answer(idx)}
                disabled={feedback !== null}
                className={`py-10 rounded-2xl text-2xl md:text-3xl font-medium transition-all duration-500 border-4
                  ${feedback === null 
                    ? 'bg-gray-800 hover:bg-red-600 hover:scale-105 text-white border-gray-700' 
                    : idx === quiz[i].a 
                      ? 'bg-green-600 border-green-400 text-white scale-110' 
                      : feedback === 'wrong' && idx === quiz[i].o.indexOf(opt)
                        ? 'bg-red-700 border-red-400 text-white' 
                        : 'bg-gray-800 text-gray-500 border-gray-700'
                  }`}
              >
                {opt}
                {feedback !== null && idx === quiz[i].a && ' ✅'}
                {feedback === 'wrong' && idx === quiz[i].o.indexOf(opt) && ' ❌'}
              </button>
            ))}
          </div>

          {/* Instant feedback text */}
          {feedback && (
            <div className={`mt-10 text-5xl font-bold animate-pulse
              ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
              {feedback === 'correct' ? 'Correct!' : 'Wrong!'}
            </div>
          )}

          <p className="mt-12 text-xl text-white/80">
            Question {i + 1} / {quiz.length}  •  Score: {score}
          </p>
        </div>
      </div>
    </div>
  )
}