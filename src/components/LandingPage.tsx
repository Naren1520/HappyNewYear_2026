import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Firework } from './Firework';

export function LandingPage() {
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Generate random fireworks
    const interval = setInterval(() => {
      const newFirework = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 60 + 10,
      };
      setFireworks((prev) => [...prev.slice(-8), newFirework]);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#0f0f2a] overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Fireworks */}
      {fireworks.map((fw) => (
        <Firework key={fw.id} x={fw.x} y={fw.y} />
      ))}

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              background: `hsl(${Math.random() * 360}, 100%, 70%)`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [-20, -800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="text-6xl md:text-8xl mb-8"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.8)',
                  '0 0 40px rgba(255, 105, 180, 0.8)',
                  '0 0 20px rgba(138, 43, 226, 0.8)',
                  '0 0 40px rgba(255, 215, 0, 0.8)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Welcome to a Magical
            </motion.h1>

            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-400 to-blue-400"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              New Beginning
            </motion.h2>

            <motion.div
              className="text-3xl md:text-5xl text-yellow-300"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{
                textShadow: '0 0 30px rgba(255, 215, 0, 0.8)',
              }}
            >
              2026
            </motion.div>
          </motion.div>

          <motion.p
            className="mt-8 text-white/70 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Get ready for something magical...
          </motion.p>
        </div>
      </div>
    </div>
  );
}
