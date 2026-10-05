import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';

const Footer = () => {
  const { groom, bride } = weddingData.couple;

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-primary to-primary-dark">
      <div className="absolute inset-0 maroon-pattern opacity-60" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-gold/8 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-padding text-center max-w-sm mx-auto relative z-10"
      >
        <p className="text-accent/70 text-xs mb-6 leading-relaxed px-4">
          Merupakan kehormatan dan kebahagiaan bagi kami sekeluarga apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-gold/70" />
          <span className="block w-1.5 h-1.5 rotate-45 bg-gold" />
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-gold/70" />
        </div>

        <p className="text-gold-light/80 text-[10px] font-medium tracking-[0.3em] uppercase mb-2">
          Kami yang berbahagia
        </p>

        <h2 className="font-wedding-name text-5xl sm:text-6xl text-accent font-normal leading-[1.15] mb-3">
          {bride.name} <span className="text-gold mx-1">&amp;</span> {groom.name}
        </h2>

        <p className="text-accent/60 text-[11px] font-medium tracking-wide">
          Sampai jumpa di hari bahagia kami!
        </p>

        {/* Bottom hairline */}
        <div className="mt-10 pt-5 border-t border-gold/20">
          <p className="text-accent/35 text-[10px] tracking-wide">
            The Wedding of {bride.name} &amp; {groom.name} — {weddingData.event.dateFullText}
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
