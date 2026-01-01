import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Image as ImageIcon, Sparkles, Wand2 } from 'lucide-react';

interface UploadPageProps {
  onChooseTemplate: (photo: string) => void;
  onCustomizeAI: (photo: string) => void;
}

export function UploadPage({ onChooseTemplate, onCustomizeAI }: UploadPageProps) {
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

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1a1a3a] via-[#2d1b4e] to-[#0f0a1f] overflow-auto">
      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl w-full"
        >
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl mb-3 text-white font-semibold">
              Create Your Card
            </h1>
            <p className="text-lg text-white/70">
              Upload your photo to get started
            </p>
          </div>

          {/* Upload area */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg">
            {!preview ? (
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  dragActive
                    ? 'border-purple-400 bg-purple-500/20'
                    : 'border-white/30 bg-white/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                <Upload className="w-16 h-16 text-purple-300 mx-auto mb-4" />

                <h3 className="text-xl text-white mb-2">
                  Drop your photo here
                </h3>
                <p className="text-white/60 mb-6">
                  or click to browse
                </p>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium transition-opacity hover:opacity-90"
                >
                  Choose Photo
                </button>

                <p className="text-white/50 mt-4 text-sm">
                  Supports JPG, PNG (Max 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative rounded-xl overflow-hidden bg-black/20">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-contain mx-auto"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3 flex-col sm:flex-row">
                    <button
                      onClick={() => {
                        setPreview(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg hover:bg-white/20 transition-colors font-medium"
                    >
                      Change Photo
                    </button>
                    <button
                      onClick={() => {
                        if (preview) {
                          onChooseTemplate(preview);
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-opacity hover:opacity-90"
                    >
                      <ImageIcon className="w-5 h-5" />
                      Choose Template
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (preview) {
                        onCustomizeAI(preview);
                      }
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center justify-center gap-2 font-semibold transition-opacity hover:opacity-90"
                  >
                    <Wand2 className="w-5 h-5" />
                    Customize using AI
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}


