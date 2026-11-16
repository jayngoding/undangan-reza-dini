import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import gsap from 'gsap';
import weddingData from '../data/weddingData.json';

const OpeningOverlay = ({ isOpen, onOpen, guestName }) => {
  const { groom, bride } = weddingData.couple;
  const cardRef = useRef(null);

  const brideName = bride.nickname || bride.name;
  const groomName = groom.nickname || groom.name;

  const handleOpen = () => {
    gsap.to(cardRef.current, {
      y: -20,
      opacity: 0,
      scale: 0.98,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: onOpen,
    });
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 overflow-hidden bg-primary-dark"
          style={{ willChange: 'opacity' }}
        >
          {/* Full background photo */}
          <div className="absolute inset-0">
            <img
              src="/foto_5.jpeg"
              alt="Reza & Dini"
              className="w-full h-full object-cover object-[50%_32%]"
            />
            {/* Maroon gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/75 via-primary-dark/45 to-primary-dark/90" />
            {/* Subtle gold vignette at edges */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 55%, rgba(72, 13, 24, 0.55) 100%)',
              }}
            />
          </div>

          {/* Elegant maroon glass card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-sm text-center bg-primary-dark/60 backdrop-blur-md rounded-3xl shadow-2xl border border-gold/35 px-6 py-8 sm:px-8 sm:py-10"
          >
            {/* Label */}
            <p className="text-[10px] text-gold-light font-medium tracking-[0.3em] mb-4 uppercase">
              The Wedding Of
            </p>

            {/* Names */}
            <div className="my-5">
              <h1 className="font-wedding-name text-4xl sm:text-6xl text-accent font-normal leading-[1.15]">
                {brideName} <span className="text-gold mx-1">&amp;</span> {groomName}
              </h1>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-14 bg-gradient-to-r from-transparent to-gold/70" />
              <span className="block w-1.5 h-1.5 rotate-45 bg-gold" />
              <div className="h-px w-14 bg-gradient-to-l from-transparent to-gold/70" />
            </div>

            {/* Date */}
            <p className="text-xs text-accent/85 font-medium tracking-wider mb-7">
              {weddingData.event.dateFullText}
            </p>

            {/* Guest */}
            <div className="mb-7">
              <div className="border border-gold/30 bg-white/5 rounded-xl inline-block px-5 py-3 min-w-[190px]">
                <p className="text-gold-light/75 text-[9px] tracking-[0.25em] uppercase mb-1">
                  Kepada Yth.
                </p>
                <p className="text-sm text-accent font-semibold leading-snug">
                  {guestName || 'Tamu Undangan'}
                </p>
              </div>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpen}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-light to-gold text-primary-dark text-[11px] font-bold tracking-wide shadow-lg shadow-black/25 hover:brightness-105 transition-all cursor-pointer sm:px-7 sm:py-3 sm:text-xs"
            >
              <MailOpen size={14} />
              <span>Buka Undangan</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningOverlay;
