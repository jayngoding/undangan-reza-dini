import React from 'react';
import { ArabesqueOrnament, IslamicArch } from './IslamicDesign';
import { motion } from 'framer-motion';

const IslamicBackground = ({ isOpen }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#FAF6F0]">
      {/* Soft gradient aura */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(125, 28, 36, 0.08) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)'
        }}
      />

      {/* Decorative Ornaments Background - Subtle Leaf Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-12 p-8">
          {Array.from({ length: 32 }).map((_, i) => (
            <ArabesqueOrnament key={i} className="w-full h-full text-[#7D1C24]" />
          ))}
        </div>
      </div>

      {/* Soft organic aesthetic shapes */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#D4AF37]/25 filter blur-3xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-[#7D1C24]/12 filter blur-3xl"
      />

      {/* Sleek minimal arches on the sides */}
      <div className="absolute inset-y-0 left-0 w-48 opacity-[0.03] hidden lg:block py-10">
        <IslamicArch className="h-full w-full" />
      </div>
      <div className="absolute inset-y-0 right-0 w-48 opacity-[0.03] hidden lg:block scale-x-[-1] py-10">
        <IslamicArch className="h-full w-full" />
      </div>

      {/* Floating aesthetic leaf particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#7D1C24]/8"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.4 + 0.4,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: [null, "-30px", "0px"],
              rotate: [0, 15, 0]
            }}
            transition={{ 
              duration: 6 + Math.random() * 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
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
