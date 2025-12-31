import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Users } from 'lucide-react';

interface GreetingPageProps {
  name: string;
  onContinue: () => void;
  onGoToContributors: () => void;
}

const inspiringQuotes = [
  "May this year bring you endless joy, boundless success, and dreams that come true.",
  "New year, new adventures, new memories to create. Your best chapter starts now!",
  "Embrace the magic of new beginnings and let your dreams take flight.",
  "Chase your dreams with passion and fill your days with wonder and possibility.",
  "May every sunrise bring hope and every sunset bring peace in this beautiful year ahead.",
];

export function GreetingPage({ name, onContinue, onGoToContributors }: GreetingPageProps) {
  const randomQuote = inspiringQuotes[Math.floor(Math.random() * inspiringQuotes.length)];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0f0a1f] via-[#2d1b4e] to-[#1a0f3a] overflow-hidden">
      {/* Animated background fireworks */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `hsl(${Math.random() * 360}, 100%, 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 20px hsl(${Math.random() * 360}, 100%, 70%)`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Golden particles rising */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300"
            style={{
              left: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
            }}
            animate={{
              y: [800, -100],
              opacity: [0, 1, 1, 0],
              x: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full text-center">
          {/* Inspiring quote */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="inline-block bg-white/5 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <p className="text-xl md:text-2xl text-white/90 italic">
                "{randomQuote}"
              </p>
            </div>
          </motion.div>

          {/* Main greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Sparkles className="w-20 h-20 text-yellow-300 mx-auto" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl mb-6"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FF69B4, #8A2BE2, #00CED1)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Happy New Year 2026
            </motion.h1>

            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl mb-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                textShadow: '0 0 40px rgba(255, 105, 180, 0.6)',
              }}
            >
              {name} 🎆
            </motion.h2>
          </motion.div>

          {/* Firework burst animation */}
          <motion.div
            className="flex justify-center gap-2 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {['🎉', '✨', '🎊', '💫', '🌟'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-5xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Continue button */}
          <motion.button
            onClick={onContinue}
            className="group px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full flex items-center gap-3 mx-auto shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">Create Your Magical Card</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Contributors button */}
          <motion.button
            onClick={onGoToContributors}
            className="group px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white rounded-full flex items-center gap-3 mx-auto shadow-2xl backdrop-blur-sm mt-6 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-6 h-6" />
            <span className="text-lg">View Contributors</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
