import React from 'react';
import { motion } from 'framer-motion';

const VerseSection = () => {
  return (
    <section className="section-padding flex-center min-h-[40vh] text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white rounded-xl shadow-sm border border-primary/6 px-5 py-8">
          <p className="italic text-xs text-primary/50 leading-relaxed mb-4 px-2">
            &ldquo;Nothing's gonna change my love for you. You ought to know by now how much I love you. One thing you can be sure of, I'll never ask for more than your love.&rdquo;
          </p>
 
          <div className="w-10 h-px bg-gold/30 mx-auto mb-3" />
 
          <p className="text-gold font-medium text-[10px]">
            George Benson / Glenn Medeiros
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default VerseSection;
