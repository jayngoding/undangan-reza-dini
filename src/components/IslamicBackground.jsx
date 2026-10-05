import React from 'react';
import { ArabesqueOrnament, IslamicArch } from './IslamicDesign';
import { motion } from 'framer-motion';

// Posisi partikel dihitung sekali di level modul agar render tetap murni
const PARTICLES = Array.from({ length: 8 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  scale: Math.random() * 0.4 + 0.4,
  rotate: Math.random() * 360,
  duration: 6 + Math.random() * 6,
}));

const IslamicBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-bg-cream">
      {/* Soft gradient aura */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(109, 17, 32, 0.07) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(197, 160, 89, 0.09) 0%, transparent 60%)',
        }}
      />

      {/* Decorative ornament grid — very subtle */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-12 p-8">
          {Array.from({ length: 32 }).map((_, i) => (
            <ArabesqueOrnament key={i} className="w-full h-full text-primary" />
          ))}
        </div>
      </div>

      {/* Soft organic aesthetic shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.16, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-gold/30 filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut', delay: 0.3 }}
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-primary/15 filter blur-3xl"
      />

      {/* Sleek minimal arches on the sides */}
      <div className="absolute inset-y-0 left-0 w-48 opacity-[0.04] hidden lg:block py-10">
        <IslamicArch className="h-full w-full" color="#6D1120" />
      </div>
      <div className="absolute inset-y-0 right-0 w-48 opacity-[0.04] hidden lg:block scale-x-[-1] py-10">
        <IslamicArch className="h-full w-full" color="#6D1120" />
      </div>

      {/* Floating ornament particles */}
      <div className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/8"
            initial={{
              x: `${p.x}%`,
              y: `${p.y}%`,
              scale: p.scale,
              rotate: p.rotate,
            }}
            animate={{
              y: [null, '-30px', '0px'],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArabesqueOrnament className="w-16 h-16" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IslamicBackground;
