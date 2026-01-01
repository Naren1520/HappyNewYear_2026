import { useState } from "react";
import { motion } from "motion/react";
import { Wand2, Loader2 } from "lucide-react";
import { generateNewYearCard } from "../aiService";

interface Props {
  userPhoto: Blob | string;
  userName: string;
  onDone: (img: string) => void;
}

export function AIServicePage({ userPhoto, userName, onDone }: Props) {
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
            <Wand2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl mb-3 text-white font-semibold">
              Customize with AI
            </h1>
            <p className="text-lg text-white/70">
              Describe your New Year card vision
            </p>
          </div>

          {/* Main card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg">
            {/* Textarea */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">
                Description
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Festive fireworks with golden sparkles, elegant design..."
                className="w-full p-4 rounded-xl bg-black/30 text-white placeholder:text-white/40 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all resize-none min-h-[120px]"
                disabled={loading}
              />
            </div>

            {/* Example prompts */}
            <div className="mb-6">
              <p className="text-white/70 text-sm mb-2">Quick ideas:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(example)}
                    disabled={loading}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white/80 text-sm transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </span>
              ) : (
                "Generate AI Card"
              )}
            </button>

            {/* User info */}
            <div className="mt-6 text-center text-sm text-white/60">
              Creating for <span className="text-purple-300 font-medium">{userName}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
