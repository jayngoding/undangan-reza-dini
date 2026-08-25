import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';

const CoupleSection = () => {
  const { groom, bride } = weddingData.couple;

  return (
    <section className="section-padding text-center relative overflow-hidden bg-white/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto relative z-10"
      >
        {/* Greeting */}
        <p className="text-gold text-sm font-medium mb-1">Halo</p>
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
            <div className="bg-white p-1 rounded-lg shadow-sm border border-primary/8 overflow-hidden">
              <img
                src="/couple.jpg"
                alt="Foto Mempelai"
                className="w-44 sm:w-56 rounded-md object-cover aspect-[3/4]"
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
          className="mb-4"
        >
          <h3 className="text-base text-primary font-semibold mb-0.5">
            {bride.fullName}
          </h3>
          <p className="text-primary/40 text-[10px] font-medium">Putri dari</p>
          <p className="text-primary/60 text-xs">
            {bride.parents.father} &amp; {bride.parents.mother}
          </p>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="h-px w-8 bg-gold/20" />
          <span className="text-lg text-gold font-medium">&amp;</span>
          <div className="h-px w-8 bg-gold/20" />
        </div>

        {/* Groom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-base text-primary font-semibold mb-0.5">
            {groom.fullName}
          </h3>
          <p className="text-primary/40 text-[10px] font-medium">Putra dari</p>
          <p className="text-primary/60 text-xs">
            {groom.parents.father} &amp; {groom.parents.mother}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoupleSection;
