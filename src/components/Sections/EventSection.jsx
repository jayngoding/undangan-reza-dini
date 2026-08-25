import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import weddingData from '../../data/weddingData.json';


const EventSection = () => {
  const { dateFullText, akad, resepsi } = weddingData.event;

  const events = [
    akad && {
      title: "Akad Nikah",
      emoji: "💍",
      date: dateFullText,
      time: akad.time,
      locationName: akad.location,
      address: akad.address,
      mapUrl: akad.googleMaps,
      gradient: "from-[#8B1A1A] to-[#A83232]"
    },
    resepsi && {
      title: "Resepsi",
      emoji: "🎊",
      date: dateFullText,
      time: resepsi.time,
      locationName: resepsi.location,
      address: resepsi.address,
      mapUrl: resepsi.googleMaps,
      gradient: "from-[#C8973E] to-[#D4AA5C]"
    }
  ].filter(Boolean);

  const getCalendarUrl = (event) => {
    const dateStr = weddingData.event.date.replace(/-/g, '');
    const times = event.time.split(' - ');
    const start = (times[0] || '08.00').replace('.', '').substring(0, 4) + '00';
    const end = (times[1] || '14.00').split(' ')[0].replace('.', '').substring(0, 4) + '00';
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + ' - Reza & Dini')}&dates=${dateStr}T${start}/${dateStr}T${end}&location=${encodeURIComponent(event.address)}`;
  };

  const dateParts = dateFullText.split(' ');
  const dayName = dateParts[0] ? dateParts[0].replace(',', '') : '';
  const dayNum = dateParts[1] || '';
  const month = dateParts[2] || '';
  const year = dateParts[3] || '';

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 relative z-10"
      >
        <p className="font-wedding-name text-2xl sm:text-3xl text-gold font-normal mb-1">
          Simpan Tanggal
        </p>
        <h2 className="text-lg text-primary font-semibold">Rangkaian Acara</h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-px w-10 bg-gold/30" />
          <Sparkles size={10} className="text-gold/60" />
          <div className="h-px w-10 bg-gold/30" />
        </div>
      </motion.div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-lg md:max-w-3xl mx-auto relative z-10">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            className="rounded-xl overflow-hidden shadow-md shadow-primary/8"
          >
            {/* Colorful Header Banner */}
            <div className={`bg-gradient-to-br ${event.gradient} p-5 relative overflow-hidden`}>
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/8" />

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="text-2xl mb-1 block">{event.emoji}</span>
                  <h3 className="text-white font-bold text-lg leading-tight">{event.title}</h3>
                  <p className="text-white/70 text-[11px] mt-0.5">{dateFullText}</p>
                </div>
                {/* Removed Cultural badge */}
              </div>

              {/* Large Day Number Watermark */}
              <div className="absolute right-4 bottom-2 opacity-20">
                <span className="text-7xl font-black text-white leading-none">{dayNum}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="bg-white px-5 py-4 space-y-3">
              {/* Date pill */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/6 text-primary text-[11px] font-semibold border border-primary/10">
                  📅 {dayName}, {dayNum} {month} {year}
                </span>
              </div>

              {/* Time Row */}
              <div className="flex items-center gap-2 text-xs text-primary/60">
                <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={13} className="text-gold" />
                </div>
                <span className="font-medium text-primary">{event.time}</span>
              </div>

              {/* Location Row */}
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={13} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary leading-tight">{event.locationName}</p>
                  <p className="text-[11px] text-primary/50 leading-relaxed mt-0.5">{event.address}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-primary/6" />

              {/* Action Buttons */}
              <div className="flex gap-2 pt-0.5 pb-0.5">
                <a
                  href={event.mapUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-white text-[13px] font-semibold transition-all hover:opacity-90 active:scale-95 shadow-sm"
                >
                  <MapPin size={14} />
                  Lihat Lokasi
                </a>
                <a
                  href={getCalendarUrl(event)} target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-lg border border-primary/15 text-primary text-[13px] font-semibold bg-white hover:bg-primary/4 transition-all active:scale-95 shadow-sm"
                >
                  <Calendar size={14} />
                  Simpan Kalender
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventSection;
