import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Image as ImageIcon, Sparkles } from 'lucide-react';

interface UploadPageProps {
  onUpload: (photo: string) => void;
}

export function UploadPage({ onUpload }: UploadPageProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (preview) {
      onUpload(preview);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1a1a3a] via-[#2d1b4e] to-[#0f0a1f] overflow-auto">
      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-block mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-16 h-16 text-yellow-300 mx-auto" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
              Create Your Magical Card
            </h1>
            <p className="text-xl text-white/80">
              Upload your photo to get started with beautiful New Year templates
            </p>
          </div>

          {/* Upload area */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            {!preview ? (
              <motion.div
                className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-purple-400 bg-purple-500/20'
                    : 'border-white/30 bg-white/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                whileHover={{ scale: 1.02 }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Upload className="w-20 h-20 text-purple-300 mx-auto mb-6" />
                </motion.div>

                <h3 className="text-2xl md:text-3xl text-white mb-3">
                  Drop your photo here
                </h3>
                <p className="text-white/70 mb-6 text-lg">
                  or click to browse
                </p>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-shadow"
                >
                  Choose Photo
                </button>

                <p className="text-white/50 mt-6">
                  Supports JPG, PNG (Max 10MB)
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="relative rounded-2xl overflow-hidden bg-black/20">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-contain mx-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>

                <div className="flex gap-4 flex-col sm:flex-row">
                  <button
                    onClick={() => {
                      setPreview(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="flex-1 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-xl hover:bg-white/20 transition-colors"
                  >
                    Change Photo
                  </button>
                  <motion.button
                    onClick={handleContinue}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Continue to Templates</span>
                    <ImageIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
