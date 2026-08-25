/**
 * Shared casual/modern design elements
 * Redesigned to be minimalist and casual while maintaining compatibility with existing imports.
 */

import React from 'react';

/* ── Minimal Modern Arch Silhouette ── */
export const MihrabIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M20 95 V40 C20 20, 35 10, 50 10 C65 10, 80 20, 80 40 V95 Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 95 V45 C30 30, 38 20, 50 20 C62 20, 70 30, 70 45 V95" opacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Decorative Leaf/Botanical Branch (Replaces Arabesque Ornament) ── */
export const ArabesqueOrnament = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    {/* Stem */}
    <path d="M50 85 C50 60, 50 35, 50 15" />
    {/* Leaves */}
    <path d="M50 70 Q65 65, 68 55 Q56 58, 50 70 Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M50 55 Q35 50, 32 40 Q44 43, 50 55 Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M50 45 Q65 40, 68 30 Q56 33, 50 45 Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M50 30 Q35 25, 32 15 Q44 18, 50 30 Z" fill="currentColor" fillOpacity="0.1" />
    {/* Top leaf */}
    <path d="M50 15 Q55 5, 50 0 Q45 5, 50 15 Z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

/* ── Minimalist Clean Frame Corner ── */
export const ArabesqueCorner = ({ className }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M10,10 L40,10" strokeLinecap="round" opacity="0.5" />
    <path d="M10,10 L10,40" strokeLinecap="round" opacity="0.5" />
    <circle cx="10" cy="10" r="2" fill="currentColor" />
    <path d="M18,18 L30,18" strokeLinecap="round" opacity="0.25" />
    <path d="M18,18 L18,30" strokeLinecap="round" opacity="0.25" />
  </svg>
);

export const GoldDivider = ({ className = '' }) => (
  <div className={`gold-divider ${className}`}>
    <div className="w-1 h-1 rounded-full bg-[#D4AF37] mx-1" />
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2 C12 2, 16 6, 16 10 C16 13, 14 15, 12 15 C10 15, 8 13, 8 10 C8 6, 12 2, 12 2 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M12 15 V22" strokeLinecap="round" />
    </svg>
    <div className="w-1 h-1 rounded-full bg-[#D4AF37] mx-1" />
  </div>
);

export const IslamicCard = ({ children, className = '', style = {} }) => (
  <div
    className={`relative bg-white/80 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-md ${className}`}
    style={style}
  >
    <ArabesqueCorner className="absolute top-3 left-3 w-6 h-6 text-[#D4AF37]/40" />
    <ArabesqueCorner className="absolute top-3 right-3 w-6 h-6 text-[#D4AF37]/40 scale-x-[-1]" />
    <ArabesqueCorner className="absolute bottom-3 left-3 w-6 h-6 text-[#D4AF37]/40 scale-y-[-1]" />
    <ArabesqueCorner className="absolute bottom-3 right-3 w-6 h-6 text-[#D4AF37]/40 scale-[-1]" />
    {children}
  </div>
);

/* ── Minimalist Aesthetic Blob/Arch (Replaces Mosque Dome) ── */
export const MosqueDome = ({ className = '', color = '#D4AF37' }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Abstract arched lines */}
    <path 
      d="M30 140 C30 60, 60 30, 100 30 C140 30, 170 60, 170 140" 
      stroke={color} 
      strokeWidth="1.2" 
      strokeOpacity="0.25" 
      strokeDasharray="4 4"
    />
    <path 
      d="M50 140 C50 80, 70 50, 100 50 C130 50, 150 80, 150 140" 
      stroke={color} 
      strokeWidth="1" 
      strokeOpacity="0.15" 
    />
    <circle cx="100" cy="30" r="3.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
  </svg>
);

/* ── Minimalist Outline Arch (Replaces traditional Islamic Arch) ── */
export const IslamicArch = ({ className = '', color = '#D4AF37' }) => (
  <svg viewBox="0 0 100 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M15 150 V50 C15 25, 30 15, 50 15 C70 15, 85 25, 85 50 V150" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeOpacity="0.25" 
    />
    <path 
      d="M25 150 V55 C25 35, 35 25, 50 25 C65 25, 75 35, 75 55 V150" 
      stroke={color} 
      strokeWidth="0.8" 
      strokeOpacity="0.15" 
      strokeDasharray="2 2"
    />
  </svg>
);
