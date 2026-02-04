"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 10 + 8,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 15,
      rotation: Math.random() * 360,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: "-20px",
          }}
          animate={{
            y: [0, window.innerHeight + 50],
            x: [0, Math.sin(petal.id * 0.5) * 100],
            rotate: [petal.rotation, petal.rotation + 720],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="rounded-[150px_0px]"
            style={{
              width: petal.size,
              height: petal.size,
              background: `linear-gradient(135deg,
                rgba(254, 205, 211, ${0.6 + Math.random() * 0.4}) 0%,
                rgba(253, 164, 175, ${0.6 + Math.random() * 0.4}) 100%)`,
              transform: "rotate(45deg)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
