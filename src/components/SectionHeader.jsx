import React from 'react';
import { motion } from 'framer-motion';

/**
 * Header section yang konsisten: judul script + judul serif + ornamen pembatas emas.
 * variant="dark" dipakai di atas background maroon.
 */
const SectionHeader = ({ script, title, icon, variant = 'light', className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`text-center mb-9 ${className}`}
  >
    {script && (
      <p className={`font-wedding-name text-2xl sm:text-3xl font-normal mb-1 ${variant === 'dark' ? 'text-gold-light' : 'text-gold-deep'}`}>
        {script}
      </p>
    )}
    <h2 className={`font-serif text-xl sm:text-2xl font-semibold tracking-wide ${variant === 'dark' ? 'text-accent' : 'text-primary'}`}>
      {title}
    </h2>
    <div className="flex items-center justify-center gap-2.5 mt-4">
      <div className={`h-px w-12 ${variant === 'dark' ? 'bg-gold-light/50' : 'bg-gold/50'}`} />
      <span className={`block w-1.5 h-1.5 rotate-45 ${variant === 'dark' ? 'bg-gold-light' : 'bg-gold'}`} />
      {icon ? (
        <span className={variant === 'dark' ? 'text-gold-light/70' : 'text-gold'}>{icon}</span>
      ) : null}
      <span className={`block w-1.5 h-1.5 rotate-45 ${variant === 'dark' ? 'bg-gold-light' : 'bg-gold'}`} />
      <div className={`h-px w-12 ${variant === 'dark' ? 'bg-gold-light/50' : 'bg-gold/50'}`} />
    </div>
  </motion.div>
);

export default SectionHeader;
