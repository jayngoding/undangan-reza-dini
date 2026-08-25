import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Clock, Heart, Shirt, CameraOff, Eye } from 'lucide-react';

const AdabSection = () => {
  const adabs = [
    {
      icon: <Utensils size={18} />,
      title: "Adab Makan & Minum",
      desc: "Memulai dengan Bismillah, makan dengan tangan kanan, tidak berlebihan"
    },
    {
      icon: <Clock size={18} />,
      title: "Menjaga Waktu Sholat",
      desc: "Tetap menunaikan sholat tepat waktu saat menghadiri acara"
    },
    {
      icon: <Heart size={18} />,
      title: "Mendoakan Mempelai",
      desc: "Barakallaahu lakuma wa baaraka 'alaikuma"
    },
    {
      icon: <Shirt size={18} />,
      title: "Berpakaian Syar'i",
      desc: "Menutup aurat dengan sempurna & berpenampilan sopan"
    },
    {
      icon: <Eye size={18} />,
      title: "Menjaga Pandangan",
      desc: "Menundukkan pandangan sebagai bentuk adab kepada Allah"
    },
    {
      icon: <CameraOff size={18} />,
      title: "Etika Dokumentasi",
      desc: "Meminta izin sebelum mengambil & menyebarkan foto/video"
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto text-center relative z-10"
      >
        <p className="text-xs text-gold font-medium mb-1">Tata Cara</p>
        <h2 className="text-lg text-primary font-semibold mb-2">Adab Menghadiri Walimah</h2>
        <div className="w-10 h-px bg-gold/30 mx-auto mb-8" />

        <div className="grid grid-cols-2 gap-3">
          {adabs.map((adab, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.5 }}
              className="bg-white rounded-xl border border-primary/6 shadow-sm p-4 text-center"
            >
              <div className="w-9 h-9 mx-auto mb-2.5 flex items-center justify-center text-gold rounded-lg bg-gold/8">
                {adab.icon}
              </div>
              <h4 className="text-xs text-primary font-semibold mb-1 leading-tight">{adab.title}</h4>
              <p className="text-[10px] text-primary/40 leading-relaxed">{adab.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AdabSection;
