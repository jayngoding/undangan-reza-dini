import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Gift } from 'lucide-react';
import weddingData from '../../data/weddingData.json';
import SectionHeader from '../SectionHeader';

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
  return <span className="font-serif text-base font-bold text-primary">{bankName}</span>;
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
      <SectionHeader
        script="Tanda Kasih"
        title="Kirim Hadiah"
        icon={<Gift size={12} className="text-gold" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-lg md:max-w-3xl mx-auto relative z-10">
        {giftAccounts.map((account, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            className="bg-white rounded-3xl shadow-md shadow-primary/8 border border-gold/20 p-6 flex flex-col items-center"
          >
            {/* Bank logo */}
            <div className="h-9 flex items-center justify-center mb-5 w-full">
              {getBankLogo(account.bank)}
            </div>

            {/* Account number */}
            <div className="w-full bg-bg-cream/80 rounded-2xl border border-gold/25 py-5 px-5 mb-5 text-center relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-gold/10 rounded-full blur-xl" />
              <p className="font-serif text-lg font-bold text-primary tracking-[0.12em] mb-1">
                {account.number}
              </p>
              <p className="text-xs text-text-light font-medium">a.n {account.holder}</p>
            </div>

            {/* Copy button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => copyToClipboard(account.number)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-primary text-white rounded-full text-xs sm:text-[13px] font-semibold shadow-md shadow-primary/20 hover:bg-primary-light transition-all cursor-pointer active:scale-[0.97]"
            >
              {copied === account.number ? (
                <Check size={14} className="text-gold-light" />
              ) : (
                <Copy size={14} />
              )}
              <span>
                {copied === account.number ? 'Berhasil Disalin!' : 'Salin No. Rekening'}
              </span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GiftSection;
