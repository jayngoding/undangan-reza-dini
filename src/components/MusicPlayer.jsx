import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Music2 } from 'lucide-react';

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const wasPlayingBeforeHidden = useRef(false);

  // Handle play / pause based on isPlaying state
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch((e) => {
        console.warn("Audio autoplay prevented or error:", e);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Page Visibility API: Auto pause when tab is hidden, resume when tab is active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.hidden) {
        // Tab is hidden or minimized
        if (isPlaying) {
          wasPlayingBeforeHidden.current = true;
          audioRef.current.pause();
        }
      } else {
        // Tab is active / visible again
        if (wasPlayingBeforeHidden.current) {
          wasPlayingBeforeHidden.current = false;
          if (isPlaying) {
            audioRef.current.play().catch((e) => {
              console.warn("Resume audio error:", e);
            });
          }
        }
      }
    };

    const handleWindowBlur = () => {
      if (document.hidden) handleVisibilityChange();
    };

    const handleWindowFocus = () => {
      if (!document.hidden) handleVisibilityChange();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50">
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        src="/audio.mp3" 
      />
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="group relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-white/90 backdrop-blur-md text-primary rounded-full shadow-lg shadow-primary/15 border border-primary/15 overflow-hidden cursor-pointer transition-all"
        title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              className="relative z-10 flex items-center justify-center text-primary group-hover:text-gold transition-colors"
            >
              <Music2 size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors"
            >
              <Music size={18} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring animation when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping pointer-events-none opacity-40" />
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
