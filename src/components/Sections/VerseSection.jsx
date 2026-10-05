import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';

const VerseSection = () => {
  const { quotes } = weddingData;
  if (!quotes || !quotes.verse) return null;

  const { verse, translation, source } = quotes;

  return (
    <section className="section-padding flex-center text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gold/25 px-6 py-9 relative overflow-hidden">
          {/* Gold hairline top accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

          <p className="font-wedding-name text-2xl sm:text-3xl text-gold-deep font-normal mb-4">
            Kutipan Suci
          </p>

          <p className="arabic-font text-lg sm:text-xl text-primary font-medium leading-[2.2] mb-6 px-2">
            {verse}
          </p>

          <div className="flex items-center justify-center gap-2.5 mb-5">
            <div className="h-px w-10 bg-gold/40" />
            <span className="block w-1.5 h-1.5 rotate-45 bg-gold" />
            <div className="h-px w-10 bg-gold/40" />
          </div>

          <p className="text-[13px] text-text-light leading-relaxed italic mb-4 px-2">
            &ldquo;{translation}&rdquo;
          </p>

          <p className="text-[11px] text-gold-deep font-semibold tracking-wide">
            {source}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default VerseSection;
