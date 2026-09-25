import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';
import { Sparkles, X, ChevronRight, ChevronLeft } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % gallery.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-[390px] sm:max-w-[420px]">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-400 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MEMORIES &amp; MOMENTS</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            گالری تصاویر یادگاری
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            گوشه‌هایی از قاب‌های عاشقانه پیوندمان
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-3">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => setSelectedIdx(index)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-white/10 ${
                item.span === 'wide'
                  ? 'col-span-2 aspect-[16/9]'
                  : item.span === 'tall'
                  ? 'row-span-2 aspect-[3/4]'
                  : 'aspect-square'
              }`}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-[11px] font-medium leading-tight">
                  {item.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={selectedIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center"
            >
              <img
                src={gallery[selectedIdx].src}
                alt={gallery[selectedIdx].caption}
                className="max-h-[75vh] w-auto object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <p className="mt-3 text-white text-xs sm:text-sm font-medium text-center bg-black/50 px-4 py-1.5 rounded-full">
                {gallery[selectedIdx].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
