"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import FallingPetals from "@/components/FallingPetals";
import SparkleEffect from "@/components/SparkleEffect";
import HeartButton from "@/components/HeartButton";

export default function Home() {
  const [answered, setAnswered] = useState<"yes" | "no" | null>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noHoverCount, setNoHoverCount] = useState(0);

  const handleYes = () => {
    setAnswered("yes");
  };

  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 200;
    setNoButtonPosition({ x: newX, y: newY });
    setNoHoverCount((prev) => prev + 1);
  };

  const noMessages = [
    "Are you sure, darling?",
    "Really, Lola?",
    "Think again...",
    "Please darling? 🥺",
    "Pretty please, Lola?",
    "I'll be sad...",
    "One more chance, darling?",
    "You're breaking my heart, Lola!",
    "Nooo darling!",
    "💔",
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <FloatingHearts />
      <FallingPetals />
      <SparkleEffect />

      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-rose-100/50 via-pink-50/30 to-red-100/50 pointer-events-none z-0" />

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Decorative heart */}
              <motion.div
                className="mb-8"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg
                  className="w-24 h-24 mx-auto drop-shadow-lg"
                  viewBox="0 0 24 24"
                  fill="url(#heartGradient)"
                >
                  <defs>
                    <linearGradient
                      id="heartGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="50%" stopColor="#e11d48" />
                      <stop offset="100%" stopColor="#be123c" />
                    </linearGradient>
                  </defs>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>

              {/* Script title */}
              <motion.h2
                className="font-script text-4xl md:text-5xl text-rose-400 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                My Darling Lola
              </motion.h2>

              {/* Main question */}
              <motion.h1
                className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold gradient-text romantic-shadow mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Will You Be My
                <br />
                <span className="text-rose-600">Valentine?</span>
              </motion.h1>

              {/* Romantic message */}
              <motion.p
                className="font-sans text-xl md:text-2xl text-rose-800/80 mb-12 max-w-xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                My darling, every moment spent with you makes my heart quiver and butterflies flutter in my tummy. You make my
                heart skip a beat and fill my days with joy. I can&apos;t imagine
                anyone else I&apos;d rather share this special day with...
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-6 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <HeartButton
                  text="Yes, I'd Love To!"
                  onClick={handleYes}
                  variant="primary"
                />

                <motion.div
                  animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.button
                    className="px-12 py-4 rounded-full font-serif text-xl tracking-wider bg-white/80 backdrop-blur-sm border-2 border-rose-300 text-rose-700 hover:bg-rose-50 hover:border-rose-400 transition-all duration-300 heart-cursor"
                    onMouseEnter={handleNoHover}
                    onTouchStart={handleNoHover}
                    whileHover={{ scale: 0.9 }}
                  >
                    {noHoverCount > 0
                      ? noMessages[
                          Math.min(noHoverCount - 1, noMessages.length - 1)
                        ]
                      : "No..."}
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Hint text */}
              {noHoverCount > 3 && (
                <motion.p
                  className="mt-8 text-rose-400 font-sans italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  (The &quot;No&quot; button seems to have a mind of its own...
                  maybe it&apos;s a sign? 💕)
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="answer-yes"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Celebration hearts */}
              <motion.div
                className="text-8xl md:text-9xl mb-8"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💕
              </motion.div>

              <motion.h1
                className="font-script text-6xl md:text-8xl text-rose-500 mb-6 romantic-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                You Said Yes!
              </motion.h1>

              <motion.div
                className="font-serif text-3xl md:text-4xl gradient-text mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Lola, you&apos;ve made me the happiest person in the world!
              </motion.div>

              <motion.p
                className="font-sans text-xl md:text-2xl text-rose-700/80 max-w-xl mx-auto leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                My darling, I promise to make this Valentine&apos;s Day
                unforgettable. Can&apos;t wait to celebrate these moments together! 💕
              </motion.p>

              {/* Floating celebration emojis */}
              <motion.div
                className="flex justify-center gap-4 text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {["🌹", "💝", "💖", "💗", "🌹"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>

              {/* Reset button */}
              <motion.button
                className="mt-12 text-rose-400 font-sans text-sm hover:text-rose-600 transition-colors"
                onClick={() => {
                  setAnswered(null);
                  setNoHoverCount(0);
                  setNoButtonPosition({ x: 0, y: 0 });
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                ← Start over (just kidding, no take-backs! 😉)
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative corner roses */}
      <div className="fixed top-0 left-0 w-32 h-32 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-rose-400">
          <circle cx="20" cy="20" r="15" />
          <circle cx="35" cy="25" r="12" />
          <circle cx="25" cy="35" r="10" />
        </svg>
      </div>

      <div className="fixed bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-rose-400">
          <circle cx="20" cy="20" r="15" />
          <circle cx="35" cy="25" r="12" />
          <circle cx="25" cy="35" r="10" />
        </svg>
      </div>
    </main>
  );
}
