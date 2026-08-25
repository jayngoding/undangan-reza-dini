import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import weddingData from '../../data/weddingData.json';

const getBankLogo = (bankName) => {
  const name = (bankName || '').toLowerCase();
  if (name.includes('btn')) {
    return (
      <img
        src="/btn.svg"
        alt="Logo Bank BTN"
        className="h-8 max-w-[120px] object-contain"
      />
    );
  }
  if (name.includes('bca')) {
    return (
      <img
        src="/bca.svg"
        alt="Logo Bank BCA"
        className="h-8 max-w-[110px] object-contain"
      />
    );
  }
  return <span className="text-base font-bold text-primary">{bankName}</span>;
};

const GiftSection = () => {
  const [copied, setCopied] = useState('');
  const giftAccounts = weddingData.gift.accounts || [];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <section className="section-padding text-center relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 relative z-10"
      >
        <p className="font-wedding-name text-2xl sm:text-3xl text-gold font-normal mb-1">
          Tanda Kasih
        </p>
        <h2 className="text-lg text-primary font-semibold">Kirim Hadiah</h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-px w-10 bg-gold/30" />
          <span className="text-gold/60 text-[10px]">🎁</span>
          <div className="h-px w-10 bg-gold/30" />
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-lg md:max-w-3xl mx-auto relative z-10">
          {giftAccounts.map((account, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="rounded-xl overflow-hidden shadow-md shadow-primary/8 bg-white border border-primary/5"
            >
              {/* Card Header */}
              <div className="bg-primary/5 px-6 py-4 border-b border-primary/5 flex items-center justify-between">
                 <div className="h-8 flex items-center">
                    {getBankLogo(account.bank)}
                 </div>
                 <span className="text-xl">💳</span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col items-center">
                
                {/* Account Number Box */}
                <div className="w-full bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-primary/10 py-4 px-5 mb-5 text-center relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary/5 rounded-full blur-xl" />
                  <p className="text-lg font-bold text-primary tracking-widest mb-1 font-mono">
                    {account.number}
                  </p>
                  <p className="text-xs text-primary/60 font-medium">
                    a.n {account.holder}
                  </p>
                </div>

                {/* Copy Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(account.number)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg text-[13px] font-semibold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer active:scale-95"
                >
                  {copied === account.number ? <Check size={14} className="text-green-300" /> : <Copy size={14} />}
                  <span>{copied === account.number ? "Berhasil Disalin!" : "Salin No. Rekening"}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default GiftSection;
