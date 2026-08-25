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
        {/* Section Header */}
        <div className="text-center mb-10 relative z-10">
          <p className="font-wedding-name text-2xl sm:text-3xl text-gold font-normal mb-1">
            Kehadiran &amp; Doa
          </p>
          <h2 className="text-lg text-primary font-semibold">Konfirmasi Kehadiran</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px w-10 bg-gold/30" />
            <span className="text-gold/60 text-[10px]">💌</span>
            <div className="h-px w-10 bg-gold/30" />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md shadow-primary/8 border border-primary/5 p-6 mb-10 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Name */}
            <div className="relative group">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-gold transition-colors" />
              <input
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama Lengkap Anda"
                className="w-full py-3.5 pl-11 pr-4 bg-primary/3 border border-primary/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/30 text-primary placeholder:text-primary/30 transition-all font-medium"
              />
            </div>
 
            {/* Attendance */}
            <div className="relative group">
              <Users2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 z-10 pointer-events-none group-focus-within:text-gold transition-colors" />
              <select
                required value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                className="w-full py-3.5 pl-11 pr-10 bg-primary/3 border border-primary/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 appearance-none cursor-pointer text-primary transition-all font-medium"
              >
                <option value="Hadir">✨ Ya, Saya Akan Hadir</option>
                <option value="Tidak Hadir">🙏 Maaf, Berhalangan Hadir</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/30 pointer-events-none" width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
 
            {/* Message */}
            <div className="relative group">
              <MessageSquare size={16} className="absolute left-4 top-4 text-primary/30 group-focus-within:text-gold transition-colors" />
              <textarea
                required rows="3" value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tuliskan ucapan selamat & doa restu..."
                className="w-full py-3.5 pl-11 pr-4 bg-primary/3 border border-primary/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none text-primary placeholder:text-primary/30 transition-all font-medium"
              />
            </div>

            {/* Honeypot */}
            <div className="absolute opacity-0 -z-10 pointer-events-none h-0 w-0 overflow-hidden">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.honey} onChange={(e) => setFormData({ ...formData, honey: e.target.value })} />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-primary to-[#A83232] text-white rounded-lg font-semibold text-[13px] shadow-md shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer active:scale-95"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={16} />
                  <span>Kirim Pesan</span>
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
        <div className="text-left bg-white/60 p-6 rounded-xl border border-primary/5 shadow-sm">
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-primary/10">
            <div className="flex items-center gap-2">
               <h3 className="text-base text-primary font-bold">Untaian Doa</h3>
               <span className="text-sm">💬</span>
            </div>
            <span className="px-3 py-1 bg-gold/10 text-gold border border-gold/20 rounded-full text-xs font-bold">
              {messages.length} Pesan
            </span>
          </div>
 
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              <div className="text-center py-10 text-primary/40 text-sm font-medium">Memuat pesan...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-10 text-primary/40 text-sm font-medium">Belum ada pesan. Jadilah yang pertama!</div>
            ) : (
              messages.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-3 bg-white rounded-xl border border-primary/5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] uppercase">
                         {item.name.charAt(0)}
                      </div>
                      <span className="text-xs text-primary font-bold">{item.name}</span>
                    </div>
                    <div className="text-[9px] text-primary/30 flex items-center gap-1 font-medium">
                      <Clock size={10} />
                      {item.timestamp ? new Date(item.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : 'Baru'}
                    </div>
                  </div>
                  
                  <div className="pl-8">
                     <span className={`inline-block mb-1.5 text-[9px] px-2 py-0.5 rounded-md font-semibold ${item.attendance === 'Hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {item.attendance === 'Hadir' ? '✓ Hadir' : '× Berhalangan'}
                     </span>
                     <p className="text-xs text-primary/60 leading-relaxed italic">
                        &ldquo;{item.message}&rdquo;
                     </p>
                  </div>
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
