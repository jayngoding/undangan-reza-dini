import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import weddingData from '../../data/weddingData.json';

const GiftSection = () => {
  const [copied, setCopied] = useState('');
  const giftAccounts = weddingData.gift.accounts;

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
              className="bg-white rounded-xl shadow-sm border border-primary/6 p-5"
            >
              <h3 className="text-sm text-primary font-semibold mb-3">
                {account.bank}
              </h3>

              <div className="bg-primary/4 rounded-lg border border-primary/6 py-3 px-4 mb-3">
                <p className="text-sm text-primary font-semibold tracking-wide mb-0.5">
                  {account.number}
                </p>
                <p className="text-[10px] text-primary/40 font-medium">
                  a.n {account.holder}
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => copyToClipboard(account.number)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-medium shadow-sm cursor-pointer"
              >
                {copied === account.number ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied === account.number ? "Tersalin" : "Salin Nomor"}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default GiftSection;
