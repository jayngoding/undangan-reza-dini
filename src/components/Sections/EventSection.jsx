import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CalendarDays, Clock } from 'lucide-react';
import weddingData from '../../data/weddingData.json';
import SectionHeader from '../SectionHeader';

const EventSection = () => {
  const { dateFullText, akad, resepsi } = weddingData.event;

  const events = [
    akad && {
      title: 'Akad Nikah',
      time: akad.time,
      locationName: akad.location,
      address: akad.address,
      mapUrl: akad.googleMaps,
    },
    resepsi && {
      title: 'Resepsi',
      time: resepsi.time,
      locationName: resepsi.location,
      address: resepsi.address,
      mapUrl: resepsi.googleMaps,
    },
  ].filter(Boolean);

  const getCalendarUrl = (event) => {
    const dateStr = weddingData.event.date.replace(/-/g, '');
    const times = event.time.split(' - ');
    const start = (times[0] || '08.00').replace('.', '').substring(0, 4) + '00';
    const end = (times[1] || '14.00').split(' ')[0].replace('.', '').substring(0, 4) + '00';
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + ' - Reza & Dini')}&dates=${dateStr}T${start}/${dateStr}T${end}&location=${encodeURIComponent(event.address)}`;
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <SectionHeader script="Save The Date" title="Rangkaian Acara" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-lg md:max-w-3xl mx-auto relative z-10">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-primary/8 border border-gold/20"
          >
            {/* Slim maroon header */}
            <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light px-6 py-5 relative overflow-hidden">
              <div className="absolute inset-0 maroon-pattern opacity-50" />
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gold/10" />
              <div className="relative z-10 flex items-end justify-between">
                <div className="text-left">
                  <p className="text-gold-light text-[10px] font-bold tracking-[0.3em] uppercase mb-1.5">
                    {event.title}
                  </p>
                  <h3 className="font-serif text-xl text-white font-bold leading-snug">
                    {dateFullText}
                  </h3>
                </div>
                <CalendarDays size={20} className="text-gold-light/70 shrink-0 mb-0.5" />
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-4">
              {/* Time */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-gold/12 border border-gold/25 flex items-center justify-center shrink-0">
                  <Clock size={15} className="text-gold-deep" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-text-light/80 uppercase tracking-[0.15em] font-semibold">
                    Waktu
                  </p>
                  <p className="text-[13px] text-primary font-semibold">{event.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={15} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-text-light/80 uppercase tracking-[0.15em] font-semibold">
                    Lokasi
                  </p>
                  <p className="text-[13px] text-primary font-semibold leading-snug">
                    {event.locationName}
                  </p>
                  <p className="text-xs text-text-light leading-relaxed mt-0.5">{event.address}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2.5 pt-1.5">
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-full bg-primary text-white text-xs sm:text-[13px] font-semibold transition-all hover:bg-primary-light active:scale-[0.97] shadow-md shadow-primary/20"
                >
                  <MapPin size={14} />
                  Lihat Lokasi
                </a>
                <a
                  href={getCalendarUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-full border border-primary/20 text-primary text-xs sm:text-[13px] font-semibold bg-white hover:bg-primary/5 transition-all active:scale-[0.97]"
                >
                  <CalendarDays size={14} />
                  Simpan Tanggal
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
