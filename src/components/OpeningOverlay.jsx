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
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 overflow-hidden"
          style={{ willChange: 'opacity' }}
        >
          {/* Full background image */}
          <div className="absolute inset-0">
            <img
              src="/cover_bg.jpg"
              alt="Background Cover"
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/75" />
          </div>

          {/* Clean glass card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-sm text-center bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 px-6 py-8"
          >
            {/* Label */}
            <p className="text-[11px] text-primary font-medium tracking-wide mb-3 uppercase">
              The Wedding Of
            </p>

            {/* Names on one single line with matching script font */}
            <div className="my-4">
              <h1 className="font-wedding-name text-4xl sm:text-5xl text-primary font-normal leading-tight">
                {brideName} <span className="font-wedding-name text-gold mx-1.5">&amp;</span> {groomName}
              </h1>
            </div>

            {/* Date */}
            <p className="text-xs text-primary/70 font-medium mb-6">
              {weddingData.event.dateFullText}
            </p>

            {/* Guest */}
            <div className="mb-6">
              <div className="bg-primary/5 border border-primary/10 rounded-xl inline-block px-4 py-2.5 min-w-[160px]">
                <p className="text-primary/50 text-[10px] mb-0.5">Kepada Yth.</p>
                <p className="text-sm text-primary font-semibold">
                  {guestName || 'Tamu Undangan'}
                </p>
              </div>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpen}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-md shadow-primary/20 hover:bg-primary-light transition-all cursor-pointer"
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