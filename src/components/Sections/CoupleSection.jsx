import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';

const InstagramIcon = ({ className = "w-3 h-3" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const CoupleSection = () => {
  const { groom, bride } = weddingData.couple;

  const getInstagramUrl = (handle) => {
    if (!handle) return '#';
    const cleanHandle = handle.replace('@', '');
    return `https://instagram.com/${cleanHandle}`;
  };

  return (
    <section className="section-padding text-center relative overflow-hidden bg-white/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto relative z-10"
      >
        {/* Greeting */}
        <p className="font-wedding-name text-3xl text-gold font-normal mb-1">
          Assalamu’alaikum Wr. Wb.
        </p>
        <h2 className="text-lg text-primary font-semibold mb-2">
          Keluarga &amp; Sahabat Tercinta
        </h2>
        <div className="w-10 h-px bg-gold/30 mx-auto mb-6" />

        {/* Intro */}
        <p className="text-primary/60 text-xs leading-relaxed mb-8 px-2">
          Dengan penuh rasa syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari istimewa kami.
        </p>

        {/* Photo */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-1 rounded-xl shadow-sm border border-primary/8 overflow-hidden">
              <img
                src="/couple.jpg"
                alt="Foto Mempelai"
                className="w-48 sm:w-60 rounded-lg object-cover aspect-[3/4]"
              />
            </div>
          </motion.div>
        </div>

        {/* Bride */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex flex-col items-center"
        >
          {/* Nickname in Great Vibes script */}
          <h3 className="font-wedding-name text-3xl sm:text-4xl text-primary font-normal leading-tight">
            {bride.name}
          </h3>
          
          {/* Full formal name with title */}
          <p className="text-xs sm:text-sm text-primary font-semibold tracking-wide mb-1">
            {bride.fullName}
          </p>

          <p className="text-primary/40 text-[10px] font-medium">Putri dari</p>
          <p className="text-primary/60 text-xs mb-2.5">
            {bride.parents.father} &amp; {bride.parents.mother}
          </p>

          {bride.instagram && (
            <a
              href={getInstagramUrl(bride.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/6 hover:bg-primary/10 text-primary text-[11px] font-medium transition-colors"
            >
              <InstagramIcon className="w-3 h-3 text-primary" />
              <span>{bride.instagram}</span>
            </a>
          )}
        </motion.div>

        {/* Divider with matching script ampersand */}
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="h-px w-8 bg-gold/20" />
          <span className="font-wedding-name text-3xl text-gold font-normal px-2">&amp;</span>
          <div className="h-px w-8 bg-gold/20" />
        </div>

        {/* Groom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Nickname in Great Vibes script */}
          <h3 className="font-wedding-name text-3xl sm:text-4xl text-primary font-normal leading-tight">
            {groom.name}
          </h3>

          {/* Full formal name with title */}
          <p className="text-xs sm:text-sm text-primary font-semibold tracking-wide mb-1">
            {groom.fullName}
          </p>

          <p className="text-primary/40 text-[10px] font-medium">Putra dari</p>
          <p className="text-primary/60 text-xs mb-2.5">
            {groom.parents.father} &amp; {groom.parents.mother}
          </p>

          {groom.instagram && (
            <a
              href={getInstagramUrl(groom.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/6 hover:bg-primary/10 text-primary text-[11px] font-medium transition-colors"
            >
              <InstagramIcon className="w-3 h-3 text-primary" />
              <span>{groom.instagram}</span>
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoupleSection;
