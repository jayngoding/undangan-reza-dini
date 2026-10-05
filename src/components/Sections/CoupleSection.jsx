import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';

const InstagramIcon = ({ className = 'w-3 h-3' }) => (
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
    <section className="section-padding text-center relative overflow-hidden">
      <div className="max-w-md mx-auto relative z-10">
        {/* Greeting */}
        <p className="font-wedding-name text-3xl text-gold-deep font-normal mb-1">
          Assalamu&rsquo;alaikum Wr. Wb.
        </p>
        <h2 className="font-serif text-xl text-primary font-semibold">
          Keluarga &amp; Sahabat Tercinta
        </h2>

        {/* Intro */}
        <p className="text-text-light text-[13px] leading-relaxed mt-5 mb-9 px-2">
          Dengan penuh rasa syukur dan kebahagiaan, kami mengundang
          Bapak/Ibu/Saudara/i untuk menghadiri hari istimewa kami.
        </p>

        {/* Featured photo in elegant arch frame */}
        <div className="flex justify-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-52 sm:w-60"
          >
            {/* Outer gold hairline arch */}
            <div className="absolute -inset-2.5 rounded-t-[10rem] rounded-b-2xl border border-gold/40 pointer-events-none" />
            <div className="rounded-t-[9rem] rounded-b-xl overflow-hidden border-[3px] border-white shadow-lg shadow-primary/15">
              <img
                src="/foto_4.jpeg"
                alt="Reza & Dini"
                className="w-full aspect-[3/4] object-cover object-[50%_28%]"
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
          <h3 className="font-wedding-name text-4xl sm:text-5xl text-primary font-normal leading-tight">
            {bride.name}
          </h3>
          <p className="font-serif italic text-sm sm:text-base text-primary/90 tracking-wide mt-1 mb-2">
            {bride.fullName}
          </p>

          <p className="text-primary/40 text-[10px] font-medium uppercase tracking-[0.2em]">Putri dari</p>
          <p className="text-text-light text-[13px] mb-3">
            {bride.parents.father} &amp; {bride.parents.mother}
          </p>

          {bride.instagram && (
            <a
              href={getInstagramUrl(bride.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 text-primary text-[11px] font-medium transition-colors"
            >
              <InstagramIcon className="w-3 h-3 text-primary" />
              <span>{bride.instagram}</span>
            </a>
          )}
        </motion.div>

        {/* Divider with script ampersand */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-px w-12 bg-gold/30" />
          <span className="font-wedding-name text-4xl text-gold-deep font-normal px-1">&amp;</span>
          <div className="h-px w-12 bg-gold/30" />
        </div>

        {/* Groom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <h3 className="font-wedding-name text-4xl sm:text-5xl text-primary font-normal leading-tight">
            {groom.name}
          </h3>
          <p className="font-serif italic text-sm sm:text-base text-primary/90 tracking-wide mt-1 mb-2">
            {groom.fullName}
          </p>

          <p className="text-primary/40 text-[10px] font-medium uppercase tracking-[0.2em]">Putra dari</p>
          <p className="text-text-light text-[13px] mb-3">
            {groom.parents.father} &amp; {groom.parents.mother}
          </p>

          {groom.instagram && (
            <a
              href={getInstagramUrl(groom.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 text-primary text-[11px] font-medium transition-colors"
            >
              <InstagramIcon className="w-3 h-3 text-primary" />
              <span>{groom.instagram}</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleSection;
