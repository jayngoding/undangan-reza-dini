import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';

const CountdownSection = () => {
  const { date, dateFullText } = weddingData.event;
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetTime = new Date(`${date}T08:00:00`).getTime();
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetTime - now.getTime();
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [date]);

  const items = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark">
      <div className="absolute inset-0 maroon-pattern opacity-60" />
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="section-padding text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-wedding-name text-3xl sm:text-4xl text-gold-light font-normal mb-7">
            Menuju Hari Bahagia
          </p>

          <div className="flex justify-center gap-2.5 sm:gap-3.5 mb-7">
            {items.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="flex flex-col items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-gold/30 shadow-lg shadow-black/10"
                style={{ width: '4.6rem', minHeight: '5.4rem' }}
              >
                <span className="font-serif text-2xl text-gold-light font-bold">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] text-accent/75 font-medium tracking-widest uppercase mt-1.5">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="text-sm text-accent/90 font-semibold tracking-wide">
            {dateFullText}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownSection;
