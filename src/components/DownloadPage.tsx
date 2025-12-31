import { motion } from 'motion/react';
import { Download, Share2, ArrowLeft, Sparkles } from 'lucide-react';

interface DownloadPageProps {
  generatedImage: string;
  userName: string;
  onBackToTemplates: () => void;
}

export function DownloadPage({
  generatedImage,
  userName,
  onBackToTemplates,
}: DownloadPageProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `NewYear2026-${userName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      '🎉 WISH YOU HAPPY NEW YEAR 2026 🎆 ✨\n\nCheck out this amazing New Year greeting: https://happy-newyear-20-26.netlify.app/ 🌟💖🎊'
    );
    
    // For web WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        // Convert base64 to blob for sharing
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const file = new File([blob], `NewYear2026-${userName}.png`, {
          type: 'image/png',
        });

        await navigator.share({
          title: 'Happy New Year 2026!',
          text: '✨ Happy New Year 2026! I created this just for you 🎆 Check it out 💖',
          files: [file],
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to WhatsApp
        handleWhatsAppShare();
      }
    } else {
      // Fallback to WhatsApp
      handleWhatsAppShare();
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0f0a1f] via-[#2d1b4e] to-[#1a0f3a] overflow-auto">
      {/* Celebration particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200],
              opacity: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {['🎉', '✨', '🎊', '🎆', '💫', '⭐'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          {/* Success message */}
          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <motion.div
              className="inline-block mb-4"
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-20 h-20 text-yellow-300 mx-auto" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
              Your Card is Ready! 🎉
            </h1>
            <p className="text-xl text-white/80">
              Share the magic with your loved ones
            </p>
          </motion.div>

          {/* Preview card */}
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
              <img
                src={generatedImage}
                alt="Generated New Year Card"
                className="w-full h-auto"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10"
                animate={{
                  opacity: [0, 0.5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.button
                onClick={handleDownload}
                className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl flex items-center justify-center gap-3 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-6 h-6" />
                <span className="text-lg">Download Image</span>
              </motion.button>

              <motion.button
                onClick={handleShare}
                className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center gap-3 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-6 h-6" />
                <span className="text-lg">Share with Friends</span>
              </motion.button>
            </div>

            {/* WhatsApp specific button */}
            <motion.button
              onClick={handleWhatsAppShare}
              className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl flex items-center justify-center gap-3 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="text-lg">Share on WhatsApp</span>
            </motion.button>
          </motion.div>

          {/* Back button */}
          <motion.button
            onClick={onBackToTemplates}
            className="w-full px-6 py-3 bg-white/10 border border-white/30 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Try Another Template</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
