import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';

const VerseSection = () => {
  const { quotes } = weddingData;
  if (!quotes || !quotes.verse) return null;

  const { verse, translation, source } = quotes;

  return (
    <section className="section-padding flex-center text-center relative overflow-hidden bg-white/40">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-primary/8 px-6 py-8">
          <p className="font-wedding-name text-2xl sm:text-3xl text-gold font-normal mb-2">
            Kutipan Suci
          </p>

          <p className="arabic-font text-lg sm:text-xl text-primary font-medium leading-[2.2] mb-5 px-2">
            {verse}
          </p>

          <div className="w-12 h-px bg-gold/30 mx-auto mb-4" />

          <p className="text-xs text-primary/70 leading-relaxed italic mb-3 px-2">
            &ldquo;{translation}&rdquo;
          </p>

          <p className="text-[11px] text-gold font-semibold">
            {source}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default VerseSection;
