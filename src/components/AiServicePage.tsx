import { useState } from "react";
import { motion } from "motion/react";
import { Wand2, Loader2, ArrowLeft, Sparkles } from "lucide-react";
import { generateNewYearCard } from "../aiService";

interface Props {
  userPhoto: Blob | string;
  userName: string;
  onDone: (img: string) => void;
  onBack?: () => void;
}

export function AIServicePage({ userPhoto, userName, onDone, onBack }: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const img = await generateNewYearCard(userPhoto, prompt, userName);
      if (img) onDone(img);
    } catch (err) {
      console.error("Failed to generate AI card:", err);
    } finally {
      setLoading(false);
    }
  };

  const examplePrompts = [
    "Festive fireworks with golden sparkles",
    "Elegant winter wonderland theme",
    "Modern minimalist with bold typography",
    "Vintage retro celebration style",
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0f0a1f] via-[#1a1a3a] to-[#2d1b4e] overflow-auto">
      {/* Back button */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          onClick={onBack}
          className="fixed top-6 left-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white transition-all duration-300 backdrop-blur-xl"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
      )}

      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <Wand2 className="w-12 h-12 text-purple-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl mb-3 text-white font-semibold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Customize with AI
            </h1>
            <p className="text-lg text-white/70">
              Describe your perfect New Year card vision
            </p>
          </div>

          {/* Main card with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative group"
          >
            {/* Gradient border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg">
              {/* Textarea */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  Describe Your Vision
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., Festive fireworks with golden sparkles, elegant design..."
                  className="w-full p-4 rounded-xl bg-black/30 text-white placeholder:text-white/40 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all resize-none min-h-[140px]"
                  disabled={loading}
                />
              </div>

              {/* Example prompts */}
              <div className="mb-6">
                <p className="text-white/70 text-sm mb-3 font-medium">✨ Quick ideas:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {examplePrompts.map((example, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPrompt(example)}
                      disabled={loading}
                      className="px-4 py-2.5 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/30 hover:border-purple-400/50 rounded-xl text-white/90 text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                    >
                      {example}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Generate button - More attractive */}
              <motion.button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                whileHover={{ scale: loading || !prompt.trim() ? 1 : 1.02 }}
                whileTap={{ scale: loading || !prompt.trim() ? 1 : 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-purple-500/50 relative group overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating your masterpiece...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate AI Card
                    </>
                  )}
                </span>
              </motion.button>

              {/* User info */}
              <div className="mt-6 text-center text-sm text-white/60">
                Creating a magical moment for{" "}
                <span className="text-purple-300 font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {userName}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
