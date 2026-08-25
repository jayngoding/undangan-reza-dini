import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import weddingData from '../../data/weddingData.json';

const EventSection = () => {
  const { dateFullText, akad, resepsi } = weddingData.event;

  const events = [
    akad && {
      title: "Akad Nikah",
      date: dateFullText,
      time: akad.time,
      locationName: akad.location,
      address: akad.address,
      mapUrl: akad.googleMaps,
    },
    resepsi && {
      title: "Resepsi",
      date: dateFullText,
      time: resepsi.time,
      locationName: resepsi.location,
      address: resepsi.address,
      mapUrl: resepsi.googleMaps,
    }
  ].filter(Boolean);

  const getCalendarUrl = (event) => {
    const dateStr = weddingData.event.date.replace(/-/g, '');
    const times = event.time.split(' - ');
    const start = (times[0] || '08.00').replace('.', '').substring(0, 4) + '00';
    const end = (times[1] || '14.00').split(' ')[0].replace('.', '').substring(0, 4) + '00';
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + ' - Reza & Dini')}&dates=${dateStr}T${start}/${dateStr}T${end}&location=${encodeURIComponent(event.address)}`;
  };

  // Parse dateFullText ("Minggu, 06 Desember 2026")
  const dateParts = dateFullText.split(' ');
  const dayName = dateParts[0] ? dateParts[0].replace(',', '') : '';
  const dayNum = dateParts[1] || '';
  const monthYear = dateParts[2] && dateParts[3] ? `${dateParts[2]} ${dateParts[3]}` : '';

  return (
    <section className="section-padding relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 relative z-10"
      >
        <p className="font-wedding-name text-2xl sm:text-3xl text-gold font-normal mb-1">
          Simpan Tanggal
        </p>
        <h2 className="text-lg text-primary font-semibold">Rangkaian Acara</h2>
        <div className="w-10 h-px bg-gold/30 mx-auto mt-2" />
      </motion.div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg md:max-w-3xl mx-auto relative z-10">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.7 }}
            className="bg-white rounded-xl shadow-sm border border-primary/6 overflow-hidden"
          >
            {/* Top banner */}
            <div className="bg-primary/5 px-5 py-3 border-b border-primary/6">
              <h3 className="text-sm text-primary font-semibold">{event.title}</h3>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              {/* Date */}
              <div className="flex items-center gap-3">
                <span className="text-2xl text-primary font-semibold leading-none">{dayNum}</span>
                <div className="text-xs text-primary/60 leading-tight">
                  <span className="font-medium text-primary block">{dayName}</span>
                  <span>{monthYear}</span>
                </div>
              </div>

              <hr className="border-primary/6" />

              {/* Time */}
              <div className="flex items-center gap-2 text-xs text-primary/60">
                <Clock className="w-3.5 h-3.5 text-primary/40" />
                <span>{event.time}</span>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs text-primary/40 font-medium mb-0.5">Lokasi</p>
                <p className="text-sm text-primary font-medium mb-0.5">{event.locationName}</p>
                <p className="text-xs text-primary/50 leading-relaxed">{event.address}</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-1">
                <a
                  href={event.mapUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-white text-xs font-medium transition-all"
                >
                  <MapPin size={12} /> Lokasi
                </a>
                <a
                  href={getCalendarUrl(event)} target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-primary/15 text-primary text-xs font-medium bg-white hover:bg-primary/3 transition-all"
                >
                  <Calendar size={12} /> Kalender
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
