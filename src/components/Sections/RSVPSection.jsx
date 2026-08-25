import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, MessageSquare, Users2, Clock } from 'lucide-react';

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

  return (
    <section className="section-padding relative overflow-hidden bg-white/30">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto relative z-10"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <p className="font-wedding-name text-2xl sm:text-3xl text-gold font-normal mb-1">
            Kehadiran &amp; Doa
          </p>
          <h2 className="text-lg text-primary font-semibold">Konfirmasi Kehadiran</h2>
          <div className="w-10 h-px bg-gold/30 mx-auto mt-2" />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-primary/6 p-5 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/30" />
              <input
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama lengkap Anda"
                className="w-full py-3 pl-9 pr-4 bg-primary/3 border border-primary/8 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gold/30 focus:border-gold/30 text-primary placeholder:text-primary/25 transition-all font-medium"
              />
            </div>
 
            {/* Attendance */}
            <div className="relative">
              <Users2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/30 z-10 pointer-events-none" />
              <select
                required value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                className="w-full py-3 pl-9 pr-8 bg-primary/3 border border-primary/8 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gold/30 appearance-none cursor-pointer text-primary transition-all"
              >
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Berhalangan Hadir</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/25 pointer-events-none" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
 
            {/* Message */}
            <div className="relative">
              <MessageSquare size={14} className="absolute left-3 top-4 text-primary/30" />
              <textarea
                required rows="3" value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tuliskan ucapan & doa restu"
                className="w-full py-3 pl-9 pr-4 bg-primary/3 border border-primary/8 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gold/30 resize-none text-primary placeholder:text-primary/25 transition-all"
              />
            </div>

            {/* Honeypot */}
            <div className="absolute opacity-0 -z-10 pointer-events-none h-0 w-0 overflow-hidden">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.honey} onChange={(e) => setFormData({ ...formData, honey: e.target.value })} />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-2.5 bg-primary text-white rounded-lg font-medium text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={12} />
                  <span>Kirim Ucapan</span>
                </>
              )}
            </motion.button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-4 p-3 bg-green-50 text-green-600 border border-green-100 rounded-lg text-xs font-medium text-center"
              >
                Terima kasih! Pesan Anda telah terkirim.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Messages */}
        <div className="text-left">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-primary/6">
            <h3 className="text-sm text-primary font-semibold">Untaian Doa</h3>
            <span className="px-2.5 py-1 bg-primary/5 text-primary border border-primary/8 rounded-lg text-[10px] font-medium">
              {messages.length} pesan
            </span>
          </div>
 
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
            {loading ? (
              <div className="text-center py-8 text-primary/30 text-xs">Memuat pesan...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-primary/30 text-xs">Belum ada pesan.</div>
            ) : (
              messages.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  className="p-3 bg-white rounded-lg border border-primary/6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary font-semibold">{item.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${item.attendance === 'Hadir' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                        {item.attendance === 'Hadir' ? 'Hadir' : 'Berhalangan'}
                      </span>
                    </div>
                    <div className="text-[10px] text-primary/25 flex items-center gap-1">
                      <Clock size={10} />
                      {item.timestamp ? new Date(item.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : 'Baru'}
                    </div>
                  </div>
                  <p className="text-xs text-primary/50 leading-relaxed border-l-2 border-gold/15 pl-3">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RSVPSection;
