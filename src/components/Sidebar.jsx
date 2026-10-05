import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../data/weddingData.json';

const Sidebar = () => {
  const { groom, bride } = weddingData.couple;
  const { dateFullText } = weddingData.event;

  const brideName = bride.nickname || bride.name;
  const groomName = groom.nickname || groom.name;

  return (
    <div className="relative w-full h-[100dvh] min-h-[560px] lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:w-[40%] flex items-center justify-center shrink-0 overflow-hidden p-5 bg-primary-dark">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src="/foto_5.jpeg"
          alt="Reza & Dini"
          className="w-full h-full object-cover object-[50%_32%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/70 via-primary-dark/40 to-primary-dark/85" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 55%, rgba(72, 13, 24, 0.5) 100%)',
          }}
        />
      </div>

      {/* Elegant maroon glass card */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm text-center bg-primary-dark/60 backdrop-blur-md rounded-3xl shadow-2xl border border-gold/35 px-6 py-8 sm:px-8 sm:py-10"
      >
        {/* Label */}
        <p className="text-[10px] text-gold-light font-medium tracking-[0.3em] mb-4 uppercase">
          The Wedding Of
        </p>

        {/* Names */}
        <div className="my-5">
          <h1 className="font-wedding-name text-4xl sm:text-6xl text-accent font-normal leading-[1.15]">
            {brideName} <span className="text-gold mx-1">&amp;</span> {groomName}
          </h1>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-gold/70" />
          <span className="block w-1.5 h-1.5 rotate-45 bg-gold" />
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-gold/70" />
        </div>

        {/* Date */}
        <div className="space-y-1">
          <p className="text-sm text-accent font-semibold tracking-wide">
            {dateFullText}
          </p>
          <p className="text-[10px] text-gold-light font-medium tracking-[0.25em] uppercase">
            Simpan Tanggal
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
