import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface TemplatePageProps {
  userPhoto: string;
  userName: string;
  onTemplateSelect: (templateId: number, generatedImage: string) => void;
}

const templates = [
  {
    id: 1,
    name: 'Fireworks Celebration',
    bgColor: 'from-purple-900 via-pink-900 to-orange-900',
    overlay: 'https://images.unsplash.com/photo-1657032178129-fedec8a0947a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJld29ya3MlMjBjZWxlYnJhdGlvbiUyMG5pZ2h0fGVufDF8fHx8MTc2NzAwODk0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    textColor: '#FFD700',
  },
  {
    id: 2,
    name: 'Golden Luxury',
    bgColor: 'from-yellow-900 via-amber-900 to-orange-900',
    overlay: 'https://images.unsplash.com/photo-1761437856311-3ba13025f161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbHV4dXJ5JTIwZWxlZ2FudHxlbnwxfHx8fDE3NjcxMTkyNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    textColor: '#FFFFFF',
  },
  {
    id: 3,
    name: 'Minimal Pastel',
    bgColor: 'from-pink-200 via-purple-200 to-blue-200',
    overlay: null,
    textColor: '#8B5CF6',
  },
  {
    id: 4,
    name: 'Neon Cyber',
    bgColor: 'from-cyan-900 via-purple-900 to-pink-900',
    overlay: 'https://images.unsplash.com/photo-1626972309141-bee9f36a0499?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwY2l0eXxlbnwxfHx8fDE3NjcwMjgxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    textColor: '#00FFFF',
  },
  {
    id: 5,
    name: 'Floral Festive',
    bgColor: 'from-rose-300 via-pink-300 to-fuchsia-300',
    overlay: null,
    textColor: '#BE185D',
  },
  {
    id: 6,
    name: 'Night Sky Stars',
    bgColor: 'from-indigo-950 via-purple-950 to-blue-950',
    overlay: 'https://images.unsplash.com/photo-1502957291543-d85480254bf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreSUyMHN0YXJzfGVufDF8fHx8MTc2NzA5MTcyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    textColor: '#FBBF24',
  },
  {
    id: 7,
    name: 'Celebration Party',
    bgColor: 'from-orange-400 via-red-400 to-pink-400',
    overlay: null,
    textColor: '#FFFFFF',
  },
  {
    id: 8,
    name: 'Elegant Typography',
    bgColor: 'from-slate-900 via-gray-900 to-zinc-900',
    overlay: null,
    textColor: '#F4F4F5',
  },
  {
    id: 9,
    name: 'Creative Collage',
    bgColor: 'from-teal-400 via-cyan-400 to-blue-400',
    overlay: null,
    textColor: '#FFFFFF',
  },
  {
    id: 10,
    name: 'Glassmorphism',
    bgColor: 'from-violet-500 via-purple-500 to-fuchsia-500',
    overlay: null,
    textColor: '#FFFFFF',
  },
  {
    id: 11,
    name: 'Midnight Noir',
    bgColor: 'from-black via-gray-900 to-slate-900',
    overlay: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=1080&auto=format&fit=crop', // Subtle city lights
    textColor: '#E2E8F0', // Slate 200
  },
  {
    id: 12,
    name: 'Retro Disco',
    bgColor: 'from-fuchsia-600 via-purple-600 to-indigo-600',
    overlay: 'https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?q=80&w=1080&auto=format&fit=crop', // Disco ball/glitter
    textColor: '#FF00FF', // Hot Pink
  },
  { 
   id: 13,
   name: 'Glitter Blast',
   bgColor: 'from-pink-500 via-red-500 to-yellow-500',
   overlay: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1080', 
   textColor: '#FFFFFF' 
  },
  { 
    id: 14, name: 'Silver Sparkle',
    bgColor: 'from-slate-400 via-gray-500 to-slate-600', 
    overlay: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1080', 
    textColor: '#F8FAFC' 
  },
  {
    id: 15, 
    name: 'Golden Hour', 
    bgColor: 'from-orange-500 via-amber-500 to-yellow-500', 
    overlay: null, 
    textColor: '#451A03' 
  },
  { 
    id: 16, 
    name: 'Confetti Rain', 
    bgColor: 'from-blue-400 via-magenta-500 to-purple-500', 
    overlay: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1080', 
    textColor: '#FFFFFF' 
  },
  { 
    id: 17, 
    name: 'Rose Gold', 
    bgColor: 'from-rose-200 via-pink-300 to-rose-400', 
    overlay: null, 
    textColor: '#881337' 
  },
  

  { id: 18, 
    name: 'Cyberpunk Red', 
    bgColor: 'from-red-600 via-red-900 to-black', 
    overlay: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1080', 
    textColor: '#FF0000' 
  },
  { id: 19, 
    name: 'Vaporwave', 
    bgColor: 'from-cyan-300 via-pink-300 to-purple-400', 
    overlay: null, 
    textColor: '#FFFFFF' 
  },
  { id: 20, 
    name: 'Toxic Glow', 
    bgColor: 'from-black via-gray-900 to-green-900', 
    overlay: null, 
    textColor: '#4ADE80' 
  },
  { 
    id: 21, 
    name: 'Ultraviolet', 
    bgColor: 'from-violet-900 via-purple-900 to-black', 
    overlay: null, 
    textColor: '#E879F9' 
  },

  { id: 22, 
    name: 'Ocean Deep', 
    bgColor: 'from-blue-900 via-cyan-900 to-black', 
    overlay: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1080', 
    textColor: '#A5F3FC' 
  },
  { id: 23, 
    name: 'Winter Frost', 
    bgColor: 'from-blue-50 via-indigo-50 to-blue-100', 
    overlay: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=1080', 
    textColor: '#1E40AF'
  },
  { 
    id: 24, 
    name: 'Lavender Fields', 
    bgColor: 'from-indigo-200 via-purple-200 to-pink-200', 
    overlay: null, 
    textColor: '#4C1D95' 
  },

  {
    id: 25,
    name: 'Arctic Whisper',
    bgColor: 'from-slate-100 via-cyan-50 to-blue-100',
    overlay: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=80&w=1080', // Close up ice crystals
    textColor: '#0891B2',
  },
  {
    id: 26,
    name: 'Frosted Ember',
    bgColor: 'from-blue-900 via-slate-800 to-red-900', // Fire meets ice
    overlay: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1080', // Cold mountain lake
    textColor: '#FECACA',
  },
  {
    id: 27,
    name: 'Frozen Palace',
    bgColor: 'from-blue-200 via-sky-300 to-indigo-400',
    overlay: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1080', // Abstract ice patterns
    textColor: '#FFFFFF',
  },
  {
    id: 28,
    name: 'Silver Blizzard',
    bgColor: 'from-gray-300 via-slate-400 to-gray-500',
    overlay: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=1080', // Heavy snow blur
    textColor: '#F8FAFC',
  },

  {
    id: 29,
    name: 'Snowy Peak',
    bgColor: 'from-blue-50 to-white',
    overlay: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1080', // Crisp mountain top
    textColor: '#334155',
  },

  {
    id: 30,
    name: 'Deep Borealis',
    bgColor: 'from-green-900 via-emerald-950 to-black',
    overlay: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?q=80&w=1080', // Bright green aurora
    textColor: '#A7F3D0',
  },
  {
    id: 31,
    name: 'Midnight Frost',
    bgColor: 'from-black via-slate-900 to-blue-950',
    overlay: 'https://images.unsplash.com/photo-1498623116890-37e912163d5d?q=80&w=1080', // Frozen window pane
    textColor: '#BAE6FD',
  },
  {
    id: 32,
    name: 'Alpine Glow',
    bgColor: 'from-rose-100 via-purple-100 to-blue-200',
    overlay: null,
    textColor: '#BE185D',
  },
  {
    id: 33,
    name: 'Ice Cave',
    bgColor: 'from-cyan-700 via-blue-800 to-indigo-900',
    overlay: 'https://images.unsplash.com/photo-1520113412646-04fc68c0bc21?q=80&w=1080', // Inside an ice cave
    textColor: '#E0F2FE',
  },
  {
    id: 34,
    name: 'Polar Light',
    bgColor: 'from-sky-300 via-blue-400 to-indigo-500',
    overlay: 'https://images.unsplash.com/photo-1489674267075-cee793167910?q=80&w=1080',
    textColor: '#1E3A8A',
  }
];

export function TemplatePage({
  userPhoto,
  userName,
  onTemplateSelect,
}: TemplatePageProps) {
  const [loading, setLoading] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateImage = async (templateId: number) => {
    setLoading(templateId);
    const template = templates.find((t) => t.id === templateId);
    if (!template || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1080;
    canvas.height = 1080;

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const colors = template.bgColor.match(/from-(\S+)\s+via-(\S+)\s+to-(\S+)/);
    if (colors) {
      gradient.addColorStop(0, getColorFromTailwind(colors[1]));
      gradient.addColorStop(0.5, getColorFromTailwind(colors[2]));
      gradient.addColorStop(1, getColorFromTailwind(colors[3]));
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw overlay image if exists
    if (template.overlay) {
      try {
        const overlayImg = await loadImage(template.overlay);
        ctx.globalAlpha = 0.4;
        ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      } catch (error) {
        console.log('Overlay load failed, continuing without it');
      }
    }

    // Draw user photo in circular frame
    try {
      const userImg = await loadImage(userPhoto);
      const photoSize = 400;
      const photoX = (canvas.width - photoSize) / 2;
      const photoY = 200;

      // Create circular clipping path
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        photoX + photoSize / 2,
        photoY + photoSize / 2,
        photoSize / 2,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.clip();

      // Draw photo
      const aspect = userImg.width / userImg.height;
      let drawWidth = photoSize;
      let drawHeight = photoSize;
      let drawX = photoX;
      let drawY = photoY;

      if (aspect > 1) {
        drawWidth = photoSize * aspect;
        drawX = photoX - (drawWidth - photoSize) / 2;
      } else {
        drawHeight = photoSize / aspect;
        drawY = photoY - (drawHeight - photoSize) / 2;
      }

      ctx.drawImage(userImg, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();

      // Draw photo border
      ctx.strokeStyle = template.textColor;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(
        photoX + photoSize / 2,
        photoY + photoSize / 2,
        photoSize / 2,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    } catch (error) {
      console.error('Error loading user photo:', error);
    }

    // Add decorative elements based on template
    if (templateId === 10) {
      // Glassmorphism effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(100, 700, canvas.width - 200, 250);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(100, 700, canvas.width - 200, 250);
    }

    // Draw text
    ctx.textAlign = 'center';
    ctx.fillStyle = template.textColor;

    // "Happy New Year 2026"
    ctx.font = 'bold 80px Arial';
    ctx.fillText('Happy New Year', canvas.width / 2, 750);
    ctx.font = 'bold 100px Arial';
    ctx.fillText('2026', canvas.width / 2, 860);

    // User name
    ctx.font = 'bold 60px Arial';
    ctx.fillText(userName, canvas.width / 2, 960);

    // Add sparkle decorations
    ctx.font = '40px Arial';
    ctx.fillText('✨', 200, 750);
    ctx.fillText('✨', canvas.width - 200, 750);
    ctx.fillText('🎉', 150, 900);
    ctx.fillText('🎆', canvas.width - 150, 900);

    // Convert to image
    const generatedImage = canvas.toDataURL('image/png');
    setLoading(null);
    onTemplateSelect(templateId, generatedImage);
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const getColorFromTailwind = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      'purple-900': '#581c87',
      'pink-900': '#831843',
      'orange-900': '#7c2d12',
      'yellow-900': '#713f12',
      'amber-900': '#78350f',
      'pink-200': '#fbcfe8',
      'purple-200': '#e9d5ff',
      'blue-200': '#bfdbfe',
      'cyan-900': '#164e63',
      'rose-300': '#fda4af',
      'pink-300': '#f9a8d4',
      'fuchsia-300': '#f0abfc',
      'indigo-950': '#1e1b4b',
      'purple-950': '#3b0764',
      'blue-950': '#172554',
      'orange-400': '#fb923c',
      'red-400': '#f87171',
      'pink-400': '#f472b6',
      'slate-900': '#0f172a',
      'gray-900': '#111827',
      'zinc-900': '#18181b',
      'teal-400': '#2dd4bf',
      'cyan-400': '#22d3ee',
      'blue-400': '#60a5fa',
      'violet-500': '#8b5cf6',
      'purple-500': '#a855f7',
      'fuchsia-500': '#d946ef',
    };
    return colorMap[colorName] || '#000000';
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0f0a1f] via-[#1a1a3a] to-[#2d1b4e] overflow-auto">
      <canvas ref={canvasRef} className="hidden" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
              Choose Your Perfect Template
            </h1>
            <p className="text-xl text-white/80">
              Click on any template to create your personalized New Year card
            </p>
          </div>

          {/* Template grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => generateImage(template.id)}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:border-white/40 transition-all hover:scale-105 hover:shadow-2xl">
                  <div
                    className={`relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${template.bgColor} mb-3`}
                  >
                    {template.overlay && (
                      <img
                        src={template.overlay}
                        alt={template.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-40 user-image"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {loading === template.id ? (
                        <Loader2 className="w-12 h-12 text-white animate-spin" />
                      ) : (
                        <div className="text-center px-4">
                          <div className="text-2xl mb-2" style={{ color: template.textColor }}>
                            Happy New Year
                          </div>
                          <div className="text-4xl" style={{ color: template.textColor }}>
                            2026
                          </div>
                        </div>
                      )}
                    </div>
                    {template.id === 10 && (
                      <div className="absolute bottom-4 left-4 right-4 h-16 bg-white/10 backdrop-blur-md rounded-lg border border-white/30" />
                    )}
                  </div>
                  <h3 className="text-white text-center group-hover:text-yellow-300 transition-colors">
                    {template.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}





