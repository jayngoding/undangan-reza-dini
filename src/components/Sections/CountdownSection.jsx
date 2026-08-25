import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import weddingData from '../../data/weddingData.json';

const CountdownSection = () => {
  const { date, dateFullText } = weddingData.event;
  const targetDate = new Date(`${date}T08:00:00`);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference <= 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section className="section-padding text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <p className="font-wedding-name text-2xl sm:text-3xl text-gold font-normal mb-1">
          Menghitung Hari
        </p>
        <h2 className="text-lg text-primary font-semibold">Menuju Hari Bahagia</h2>
        <div className="flex items-center justify-center gap-2 mt-3 mb-6">
          <div className="h-px w-10 bg-gold/30" />
          <span className="text-gold/60 text-[10px]">⏳</span>
          <div className="h-px w-10 bg-gold/30" />
        </div>
  
        <div className="flex justify-center gap-2.5 mb-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-primary/8"
              style={{ width: '4.2rem', minHeight: '4.8rem' }}
            >
              <span className="text-lg text-primary font-semibold">
                {item.value.toString().padStart(2, '0')}
              </span>
              <span className="text-[9px] text-gold font-medium mt-0.5">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="w-10 h-px bg-gold/30 mx-auto mb-3" />
        <p className="text-primary/60 text-xs font-medium">{dateFullText}</p>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
