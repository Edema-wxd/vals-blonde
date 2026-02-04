"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface HeartButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function HeartButton({
  text,
  onClick,
  variant = "primary",
  className = "",
}: HeartButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = `
    relative px-12 py-4 rounded-full font-serif text-xl tracking-wider
    transition-all duration-300 overflow-hidden heart-cursor
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700
      text-white glow-button shimmer
      hover:from-rose-600 hover:via-rose-700 hover:to-rose-800
    `,
    secondary: `
      bg-white/80 backdrop-blur-sm border-2 border-rose-300
      text-rose-700 hover:bg-rose-50 hover:border-rose-400
    `,
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {variant === "primary" && (
          <motion.span
            animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
          >
            💕
          </motion.span>
        )}
        {text}
        {variant === "primary" && (
          <motion.span
            animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
            transition={{
              duration: 0.3,
              repeat: isHovered ? Infinity : 0,
              delay: 0.15,
            }}
          >
            💕
          </motion.span>
        )}
      </span>

      {/* Ripple effect on hover */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovered ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
}
