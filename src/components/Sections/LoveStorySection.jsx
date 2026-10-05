import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';
import SectionHeader from '../SectionHeader';

const LoveStorySection = () => {
  const loveStory = weddingData.loveStory || [];

  if (loveStory.length === 0) return null;

  return (
    <section className="section-padding text-center relative overflow-hidden">
      <div className="max-w-md mx-auto relative z-10">
        <SectionHeader script="Perjalanan Kami" title="Kisah Cinta" />

        {/* Timeline */}
        <div className="relative border-l border-gold/25 ml-4 space-y-6">
          {loveStory.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex items-start"
            >
              {/* Dot */}
              <div className="absolute -left-[6.5px] top-2 w-2.5 h-2.5 rotate-45 bg-gold border border-white shadow-sm" />

              {/* Card */}
              <div className="ml-6 bg-white rounded-xl border border-gold/20 shadow-sm shadow-primary/5 p-5 w-full text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/6 text-primary font-semibold text-[10px] tracking-wide mb-2">
                  {story.date}
                </span>
                <h3 className="font-serif text-sm text-primary font-bold tracking-wider mb-1.5">
                  {story.title}
                </h3>
                <p className="text-[13px] text-text-light leading-relaxed">{story.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;
