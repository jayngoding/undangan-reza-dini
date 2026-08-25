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
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto relative z-10"
      >
        {/* Title */}
        <p className="font-wedding-name text-2xl sm:text-3xl text-gold font-normal mb-1">
          Tanda Kasih
        </p>
        <h2 className="text-lg text-primary font-semibold mb-2">Kirim Hadiah</h2>
        <div className="w-10 h-px bg-gold/30 mx-auto mb-8" />
        
        <div className="space-y-4">
          {giftAccounts.map((account, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-sm border border-primary/8 p-5 flex flex-col items-center"
            >
              {/* Official Bank Logo from public/ */}
              <div className="mb-4 flex items-center justify-center h-9">
                {getBankLogo(account.bank)}
              </div>

              {/* Account Number Box */}
              <div className="w-full bg-primary/4 rounded-xl border border-primary/8 py-3.5 px-4 mb-3.5 text-center">
                <p className="text-base font-semibold text-primary tracking-wider mb-0.5 font-mono">
                  {account.number}
                </p>
                <p className="text-[11px] text-primary/50 font-medium">
                  a.n {account.holder}
                </p>
              </div>

              {/* Copy Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => copyToClipboard(account.number)}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-primary text-white rounded-xl text-xs font-semibold shadow-sm shadow-primary/10 hover:bg-primary-light transition-all cursor-pointer"
              >
                {copied === account.number ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied === account.number ? "Nomor Tersalin" : "Salin No. Rekening"}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default GiftSection;
