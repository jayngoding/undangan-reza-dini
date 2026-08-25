import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../data/weddingData.json';

const Sidebar = () => {
  const { groom, bride } = weddingData.couple;
  const { dateFullText } = weddingData.event;

  return (
    <div className="relative w-full min-h-screen h-screen lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:w-[40%] flex items-center justify-center shrink-0 overflow-hidden p-5">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/cover_bg.jpg"
          alt="Wedding Cover"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/75" />
      </div>

      {/* Card matching overlay */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xs text-center bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 px-6 py-8"
      >
        {/* Label */}
        <p className="text-[11px] text-primary font-medium tracking-wide mb-3 uppercase">
          The Wedding Of
        </p>

        {/* Names */}
        <div className="space-y-0.5 mb-5">
          <h1 className="text-2xl text-primary font-semibold leading-tight">
            {bride.nickname || bride.name}
          </h1>
          <p className="text-base text-gold font-medium">&amp;</p>
          <h1 className="text-2xl text-primary font-semibold leading-tight">
            {groom.nickname || groom.name}
          </h1>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-gold/40 mx-auto mb-5" />

        {/* Date */}
        <div className="space-y-0.5">
          <p className="text-sm text-primary font-semibold">
            {dateFullText}
          </p>
          <p className="text-xs text-gold font-medium">
            Simpan Tanggal
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
