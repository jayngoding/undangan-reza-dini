import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const GallerySection = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const images = [
    { src: '/couple.jpg', alt: 'Foto Mempelai 1' },
    { src: '/cover_bg.jpg', alt: 'Foto Mempelai 2' },
    { src: '/gallery1.jpg', alt: 'Foto Mempelai 3' },
    { src: '/gallery2.jpg', alt: 'Foto Mempelai 4' },
    { src: '/gallery3.jpg', alt: 'Foto Mempelai 5' },
    { src: '/gallery4.jpg', alt: 'Foto Mempelai 6' },
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
          <div className="w-10 h-px bg-gold/30 mx-auto mt-2" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              onClick={() => setSelectedImg(img)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-white border border-primary/10 shadow-sm aspect-[3/4]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 p-2 rounded-full text-primary shadow-sm">
                  <ZoomIn size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImg.src}
              alt={selectedImg.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
