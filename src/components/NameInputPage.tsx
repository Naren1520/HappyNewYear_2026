import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface NameInputPageProps {
  onSubmit: (name: string) => void;
}

export function NameInputPage({ onSubmit }: NameInputPageProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1a1a3a] via-[#2d1b4e] to-[#1a1a3a] overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Light waves */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.3), transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <motion.div
              className="flex justify-center mb-6"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-16 h-16 text-yellow-300" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl text-center mb-3 text-white">
              What's your beautiful name?
            </h2>

            <p className="text-center text-white/70 mb-8">
              Let's make this celebration personal
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-6 py-4 bg-white/5 border-2 border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-all duration-300 backdrop-blur-sm"
                  autoFocus
                />
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  animate={{
                    opacity: name ? 1 : 0,
                    scale: name ? 1 : 0.5,
                  }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </motion.div>
              </div>

              <motion.button
                type="submit"
                disabled={!name.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                whileHover={{ scale: name.trim() ? 1.02 : 1 }}
                whileTap={{ scale: name.trim() ? 0.98 : 1 }}
              >
                <span>Continue</span>
                <Sparkles className="w-5 h-5" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
