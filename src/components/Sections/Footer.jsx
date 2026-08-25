import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';

const Footer = () => {
  const { groom, bride } = weddingData.couple;

  return (
    <footer className="section-padding text-center relative overflow-hidden border-t border-primary/6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto py-6 relative z-10"
      >
        <p className="text-primary/40 text-xs mb-4 leading-relaxed px-4">
          Merupakan kehormatan atas kehadiran dan doa restu Anda.
        </p>

        <div className="w-10 h-px bg-gold/30 mx-auto mb-4" />

        <p className="text-xs text-primary/40 font-medium mb-1">Terima Kasih</p>

        <h2 className="font-wedding-name text-3xl sm:text-4xl text-primary font-normal leading-tight mb-2">
          {bride.name} <span className="font-wedding-name text-gold mx-1">&amp;</span> {groom.name}
        </h2>
        <p className="text-[10px] text-primary/35 font-medium">
          Sampai jumpa di hari bahagia kami!
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
