import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Music2 } from 'lucide-react';

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Audio playback error:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
      <audio 
        ref={audioRef} 
        loop 
        src="/audio.mp3" 
      />
      <motion.button
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="group relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center bg-white text-primary rounded-full shadow-[0_15px_40px_rgba(47,79,111,0.25)] border-2 border-[#D4AF37]/40 overflow-hidden"
      >
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FAF8F5] to-[#f0e6d2] opacity-80" />
        
        {/* Vinyl Grooves - Decorative */}
        <div className="absolute inset-1 border border-[#D4AF37]/20 rounded-full hidden sm:block animate-pulse" />
        <div className="absolute inset-4 border border-[#D4AF37]/10 rounded-full hidden md:block" />
        
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="relative z-10"
            >
              <Music2 className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-[#D4AF37]" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10"
            >
              <Music className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-primary/40" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Rings when playing - Enhanced Pulse */}
        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.15, 0, 0.15] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#D4AF37]/30 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 2.5, 1], opacity: [0.1, 0, 0.1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.8 }}
              className="absolute inset-0 bg-primary/20 rounded-full"
            />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
