import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const images = [
    { src: '/couple.jpg', alt: 'Foto Mempelai 1' },
    { src: '/cover_bg.jpg', alt: 'Foto Mempelai 2' },
    { src: '/gallery1.jpg', alt: 'Foto Mempelai 3' },
    { src: '/gallery2.jpg', alt: 'Foto Mempelai 4' },
    { src: '/gallery3.jpg', alt: 'Foto Mempelai 5' },
    { src: '/gallery4.jpg', alt: 'Foto Mempelai 6' },
  ];

  // Classes for scattered overlapping collage effect
  const collageStyles = [
    "col-span-1 aspect-[3/4] rotate-[-2deg] mt-4 z-10 hover:z-50",
    "col-span-1 aspect-square rotate-[3deg] -ml-5 mt-10 z-20 hover:z-50",
    "col-span-1 aspect-[4/5] rotate-[1.5deg] -mt-6 z-10 hover:z-50",
    "col-span-1 aspect-[3/4] rotate-[-3deg] -ml-3 -mt-12 z-30 hover:z-50",
    "col-span-2 aspect-video rotate-[2deg] -mt-8 z-10 hover:z-50",
    "col-span-2 aspect-[21/9] rotate-[-1.5deg] -mt-6 z-20 hover:z-50",
  ];

  return (
    <section className="section-padding text-center relative overflow-hidden">
      <div className="max-w-lg mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="font-wedding-name text-2xl sm:text-3xl text-gold font-normal mb-1">
            Momen Bahagia
          </p>
          <h2 className="text-lg text-primary font-semibold">Galeri Foto</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px w-10 bg-gold/30" />
            <span className="text-gold/60 text-[10px]">📷</span>
            <div className="h-px w-10 bg-gold/30" />
          </div>
        </motion.div>

        {/* Irregular Collage Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 px-4 pb-10">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => setSelectedIndex(idx)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl bg-white border-[3px] border-white shadow-md transition-all duration-300 hover:scale-105 ${collageStyles[idx] || "col-span-1 aspect-square"}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 p-2.5 rounded-full text-primary shadow-sm transform scale-90 group-hover:scale-100 transition-transform">
                  <ZoomIn size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && typeof document !== 'undefined' && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[150] w-full h-full bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-[160]"
            >
              <X size={20} />
            </button>
            
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="absolute left-2 sm:left-5 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-[160]"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="max-w-[90vw] sm:max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl relative z-[155] m-auto"
              onClick={(e) => {
                 // Clicking image also closes it
                 e.stopPropagation();
                 setSelectedIndex(null);
              }}
            />

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-2 sm:right-5 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-[160]"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
