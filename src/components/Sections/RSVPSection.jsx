import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, X, Clock, MessageCircleHeart } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const RSVPSection = ({ guestName = '' }) => {
  const [formData, setFormData] = useState({
    name: guestName || '',
    message: '',
    attendance: 'Hadir',
    honey: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scriptURL = 'https://script.google.com/macros/s/AKfycbzgP_9txlpe2G43XA-gA7HU3MvGY3xrV155uA1WKPtJWnMwnv6tjoknDiLNpZq3M_hV/exec';

  const fetchMessages = async () => {
    try {
      const response = await fetch(scriptURL);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (guestName) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name ? prev.name : guestName,
      }));
    }
  }, [guestName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (formData.honey) return;

    try {
      setIsSubmitting(true);
      setSubmitted(false);

      const payload = {
        name: formData.name.trim(),
        message: formData.message.trim(),
        attendance: formData.attendance
      };

      if (!payload.name || !payload.message) {
        alert('Mohon lengkapi nama dan pesan Anda.');
        setIsSubmitting(false);
        return;
      }

      await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setFormData({ name: guestName || '', message: '', attendance: 'Hadir', honey: '' });
      setSubmitted(true);
      setTimeout(() => fetchMessages(), 1500);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error!', error.message);
      alert('Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const attendanceOptions = [
    { value: 'Hadir', label: 'Ya, Saya Hadir', icon: Check },
    { value: 'Tidak Hadir', label: 'Berhalangan', icon: X },
  ];

  const inputClass =
    'w-full px-4 py-3.5 bg-bg-cream/80 border border-primary/10 rounded-2xl text-base text-primary placeholder:text-primary/30 font-medium focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all';

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-md mx-auto relative z-10">
        <SectionHeader script="Kehadiran & Doa" title="Konfirmasi Kehadiran" />

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-lg shadow-primary/8 border border-gold/20 p-6 sm:p-7 mb-8 relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Name */}
            <div>
              <label htmlFor="rsvp-name" className="block text-xs font-semibold text-primary mb-2">
                Nama Lengkap
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tulis nama Anda di sini"
                className={inputClass}
              />
            </div>

            {/* Attendance — pill buttons */}
            <div>
              <span className="block text-xs font-semibold text-primary mb-2">
                Apakah Anda bisa hadir?
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {attendanceOptions.map((opt) => {
                  const active = formData.attendance === opt.value;
                  const Icon = opt.icon;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setFormData({ ...formData, attendance: opt.value })}
                      className={`flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-2xl text-xs sm:text-[13px] font-semibold border transition-all cursor-pointer ${
                        active
                          ? 'bg-primary text-white border-primary shadow-md shadow-primary/25'
                          : 'bg-bg-cream/80 text-text-light border-primary/10 hover:border-gold/50 hover:text-primary'
                      }`}
                    >
                      <Icon size={15} />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="rsvp-message" className="block text-xs font-semibold text-primary mb-2">
                Ucapan & Doa Restu
              </label>
              <textarea
                id="rsvp-message"
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tuliskan ucapan & doa terbaik untuk kami..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Honeypot */}
            <div className="absolute opacity-0 -z-10 pointer-events-none h-0 w-0 overflow-hidden">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honey}
                onChange={(e) => setFormData({ ...formData, honey: e.target.value })}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 sm:py-4 bg-primary hover:bg-primary-light text-white rounded-full font-semibold text-[13px] sm:text-sm shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={16} />
                  <span>Kirim Ucapan</span>
                </>
              )}
            </motion.button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3.5 bg-primary/5 text-primary border border-primary/10 rounded-2xl text-[13px] font-medium text-center"
              >
                Terima kasih! Ucapan & doa Anda sudah terkirim.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Messages */}
        <div className="bg-white/75 p-5 sm:p-6 rounded-3xl border border-gold/20 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/6 border border-primary/10 flex items-center justify-center">
                <MessageCircleHeart size={15} className="text-primary" />
              </div>
              <h3 className="font-serif text-base text-primary font-bold">Untaian Doa</h3>
            </div>
            <span className="px-3 py-1 bg-gold/10 text-gold-deep border border-gold/25 rounded-full text-[11px] font-bold">
              {messages.length} Doa
            </span>
          </div>

          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1.5 custom-scrollbar">
            {loading ? (
              <div className="text-center py-10 text-primary/35 text-[13px] font-medium">
                Memuat doa-doanya...
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-10 text-primary/35 text-[13px] font-medium">
                Belum ada ucapan. Jadilah yang pertama!
              </div>
            ) : (
              messages.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                  className="p-4 bg-bg-cream/70 rounded-2xl border border-primary/5"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-accent flex items-center justify-center font-serif font-bold text-sm shrink-0">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-primary font-semibold truncate">{item.name}</p>
                      <span
                        className={`inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          item.attendance === 'Hadir'
                            ? 'bg-primary/8 text-primary'
                            : 'bg-primary/4 text-primary/45'
                        }`}
                      >
                        {item.attendance === 'Hadir' ? '✓ Akan hadir' : '× Berhalangan'}
                      </span>
                    </div>
                    <span className="text-[10px] text-primary/30 flex items-center gap-1 font-medium shrink-0 self-start">
                      <Clock size={10} />
                      {item.timestamp
                        ? new Date(item.timestamp).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                          })
                        : 'Baru'}
                    </span>
                  </div>
                  <p className="text-[13px] text-text-light leading-relaxed">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
