import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';

const PrayerSection = () => {
  const { prayer } = weddingData.quotes;

  return (
    <section className="section-padding flex-center text-center relative overflow-hidden bg-white/30">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white rounded-xl shadow-sm border border-primary/6 px-5 py-8">
          <p className="text-xs text-gold font-medium mb-4">Doa Pengantin</p>

          <h3 className="arabic-font text-xl sm:text-2xl text-primary font-semibold mb-6 leading-[2] px-2">
            {prayer.arabic}
          </h3>
  
          <div className="w-10 h-px bg-gold/30 mx-auto mb-4" />
  
          <p className="text-primary/50 italic text-xs leading-relaxed mb-4 px-2">
            &ldquo;{prayer.translation}&rdquo;
          </p>
  
          <p className="text-gold font-medium text-[10px]">
            {prayer.source}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default PrayerSection;
