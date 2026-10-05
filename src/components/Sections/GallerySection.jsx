import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const images = [
    { src: '/foto_1.jpeg', alt: 'Momen Bahagia 1' },
    { src: '/foto_2.jpeg', alt: 'Momen Bahagia 2' },
    { src: '/foto_3.jpeg', alt: 'Momen Bahagia 3' },
    { src: '/foto_4.jpeg', alt: 'Momen Bahagia 4' },
    { src: '/foto_5.jpeg', alt: 'Momen Bahagia 5' },
  ];

  const gridImages = images.slice(0, 4);
  const closingImage = images[4];

  return (
    <section className="section-padding text-center relative overflow-hidden">
      <div className="max-w-lg mx-auto relative z-10">
        <SectionHeader script="Momen Bahagia" title="Galeri Kami" />

        {/* Neat 2-column grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-4">
          {gridImages.map((img, idx) => (
            <motion.button
              key={idx}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 2) * 0.1, duration: 0.6 }}
              onClick={() => setSelectedIndex(idx)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-white p-1.5 shadow-md shadow-primary/10 border border-gold/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow hover:shadow-lg hover:shadow-primary/15"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/95 p-2.5 rounded-full text-primary shadow transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn size={16} />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Closing wide photo */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => setSelectedIndex(4)}
          className="group relative block w-full mt-3 sm:mt-4 px-2 sm:px-4 overflow-hidden rounded-2xl bg-white p-1.5 shadow-md shadow-primary/10 border border-gold/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow hover:shadow-lg hover:shadow-primary/15"
        >
          <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
            <img
              src={closingImage.src}
              alt={closingImage.alt}
              className="w-full h-full object-cover object-[50%_48%] transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white/95 p-2.5 rounded-full text-primary shadow transform scale-90 group-hover:scale-100 transition-transform">
                <ZoomIn size={16} />
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Lightbox — portal dirender langsung agar selalu muncul */}
      {selectedIndex !== null && typeof document !== 'undefined' && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-[150] w-full h-full bg-primary-dark/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
        >
            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-5 right-5 text-accent/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors z-[160]"
            >
              <X size={20} />
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="absolute left-2 sm:left-5 text-accent/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors z-[160]"
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
              className="max-w-[90vw] sm:max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl relative z-[155] m-auto border border-gold/25"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
            />

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-2 sm:right-5 text-accent/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors z-[160]"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>,
        document.body
      )}
    </section>
  );
};

export default GallerySection;
