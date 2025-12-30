import { motion } from 'motion/react';

interface FireworkProps {
  x: number;
  y: number;
}

export function Firework({ x, y }: FireworkProps) {
  const colors = [
    '#FFD700',
    '#FF69B4',
    '#8A2BE2',
    '#00CED1',
    '#FF4500',
    '#32CD32',
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const particles = 30;

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* Central burst */}
      <motion.div
        className="absolute w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Particles */}
      {Array.from({ length: particles }).map((_, i) => {
        const angle = (i / particles) * Math.PI * 2;
        const velocity = 50 + Math.random() * 30;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;

        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: x,
              y: y,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1 + Math.random() * 0.5,
              ease: 'easeOut',
            }}
          />
        );
      })}

      {/* Light trails */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const length = 40;
        const x = Math.cos(angle) * length;
        const y = Math.sin(angle) * length;

        return (
          <motion.div
            key={`trail-${i}`}
            className="absolute w-0.5 h-8"
            style={{
              background: `linear-gradient(to bottom, ${color}, transparent)`,
              transformOrigin: 'top',
              rotate: `${(angle * 180) / Math.PI + 90}deg`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scaleY: 1 }}
            animate={{
              x: x,
              y: y,
              opacity: 0,
              scaleY: 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
}
