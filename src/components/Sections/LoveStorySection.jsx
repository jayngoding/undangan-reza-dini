import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';

const LoveStorySection = () => {
  const loveStory = weddingData.loveStory || [];

  if (loveStory.length === 0) return null;

  return (
    <section className="section-padding text-center relative overflow-hidden bg-white/30">
      <div className="max-w-md mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="font-wedding-name text-2xl sm:text-3xl text-gold font-normal mb-1">
            Perjalanan Kami
          </p>
          <h2 className="text-lg text-primary font-semibold">Kisah Cinta</h2>
          <div className="w-10 h-px bg-gold/30 mx-auto mt-2" />
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-primary/10 ml-4 space-y-6">
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
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-primary/30" />

              {/* Card */}
              <div className="ml-6 bg-white rounded-lg border border-primary/6 shadow-sm p-4 w-full text-left">
                <span className="inline-block px-2 py-0.5 rounded bg-primary/8 text-primary font-medium text-[10px] mb-1.5">
                  {story.date}
                </span>
                <h3 className="text-sm text-gold font-semibold mb-1">{story.title}</h3>
                <p className="text-xs text-primary/50 leading-relaxed">{story.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;
