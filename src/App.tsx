/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   TWIN SCISSORS BARBERSHOP — Premium Website Rebuild            ║
 * ║   Designer notes:                                               ║
 * ║   • Brand: Dark concrete + gold — matches real shop aesthetic   ║
 * ║   • 3D card effects, depth layers, perspective transforms       ║
 * ║   • Real shop photos as hero backdrop                           ║
 * ║   • Full Bahrain pricelist + updated hours & contact            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Scissors, Star, ChevronDown, ChevronUp,
  MessageSquare, X, Send, MapPin, Clock, Phone,
  Loader2, ChevronLeft, ChevronRight,
  Instagram, Menu, Sparkles, ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewsSection from './components/ReviewsSection';

/* ── Brand palette — concrete grey + gold, matches real shop ────── */
const BRAND = {
  gold:    '#c9a84c',
  goldLight: '#e8c96d',
  goldDark: '#9a7a30',
  silver:  '#9ca3af',
  bg:      '#0a0a0b',
  surface: '#111113',
  concrete:'#1a1a1c',
  white:   '#f5f0e8',
};

/* ── Full price menu from the pricelist photo ──────────────────── */
const fullMenu = [
  { en: 'Hair Cut',            ar: 'قص الشعر',             price: '11',       unit: 'BD' },
  { en: 'Shave',               ar: 'حلاقة',                price: '5.5',      unit: 'BD' },
  { en: 'Hair Style',          ar: 'تصفيف الشعر',          price: '7.7',      unit: 'BD' },
  { en: 'Hair Color',          ar: 'صباغة الشعر',          price: '27.5',     unit: 'BD' },
  { en: 'Scalp Scraping',      ar: 'تقشير الرأس',          price: '7.7 / 16.5', unit: 'BD' },
  { en: 'Facial',              ar: 'العناية بالوجه',       price: '27.5',     unit: 'BD' },
  { en: 'Face Scraping',       ar: 'تقشير الوجه',          price: '5.5',      unit: 'BD' },
  { en: 'Manicure',            ar: 'العناية بالأظافر',     price: '11',       unit: 'BD' },
  { en: 'Pedicure',            ar: 'العناية بأظافر القدم', price: '13.2',     unit: 'BD' },
  { en: 'Foot Scraping',       ar: 'تقشير القدم',          price: '5.5',      unit: 'BD' },
  { en: 'Foot Massage',        ar: 'تدليك القدم',          price: '5.5',      unit: 'BD' },
  { en: 'Hand Nails Cutting',  ar: 'قص أظافر اليد',        price: '3.3',      unit: 'BD' },
  { en: 'Foot Nails Cutting',  ar: 'قص أظافر القدم',       price: '4.4',      unit: 'BD' },
];

/* ── Hours ───────────────────────────────────────────────────────── */
const HOURS = [
  { day: 'Monday',    hours: '10 AM – 9 PM' },
  { day: 'Tuesday',   hours: '10 AM – 9 PM' },
  { day: 'Wednesday', hours: '10 AM – 9 PM' },
  { day: 'Thursday',  hours: '10 AM – 9 PM' },
  { day: 'Friday',    hours: '10 AM – 9 PM' },
  { day: 'Saturday',  hours: '10 AM – 9 PM' },
  { day: 'Sunday',    hours: '10 AM – 7:30 PM' },
];

/* ══════════════════════════════════════════════════════════════════
   LOADING SCREEN — Scissors + gold ring
   ══════════════════════════════════════════════════════════════════ */
function LoadingScreen({ isRTL }: { isRTL: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: BRAND.bg }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated concrete texture grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${BRAND.gold} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.gold} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />

      {/* Floating barber pole scissors */}
      {[
        { top: '8%',  left: '6%',  size: '3rem', delay: '0s',   rot: '-15deg' },
        { top: '14%', right: '8%', size: '2rem', delay: '1.4s', rot: '20deg'  },
        { top: '55%', left: '4%',  size: '2.5rem',delay: '2.8s',rot: '-8deg'  },
        { top: '72%', right: '6%', size: '1.8rem',delay: '0.7s',rot: '12deg'  },
        { top: '82%', left: '30%', size: '1.6rem',delay: '3.2s',rot: '-22deg' },
      ].map((s, i) => (
        <div key={i} className="absolute pointer-events-none"
          style={{
            top: s.top, left: (s as any).left, right: (s as any).right,
            fontSize: s.size, color: BRAND.gold, opacity: 0.12,
            transform: `rotate(${s.rot})`,
            animation: `loadFloat 5s ease-in-out infinite`,
            animationDelay: s.delay,
          }}>✂</div>
      ))}

      {/* Central gold ring */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${BRAND.gold}, ${BRAND.goldDark}, #fff2, ${BRAND.goldLight}, ${BRAND.gold})`,
            padding: 4, filter: 'blur(0.5px)',
          }}
        />
        <div className="relative z-10 w-60 h-60 rounded-full flex items-center justify-center"
          style={{ background: BRAND.bg, boxShadow: 'inset 0 0 60px rgba(0,0,0,0.9)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring', damping: 12 }}>
            <img
              src="/gallery/logo.webp"
              alt="Twin Scissors"
              className="w-48 h-48 object-contain"
              onError={e => {
                const img = e.target as HTMLImageElement;
                img.src = '/gallery/logo.png';
                img.onerror = () => {
                  img.style.display = 'none';
                  const fb = img.nextElementSibling as HTMLElement;
                  if (fb) fb.style.display = 'flex';
                };
              }}
            />
            <div className="hidden w-40 h-40 items-center justify-center text-7xl">✂️</div>
          </motion.div>
        </div>
        <div className="absolute w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }} />
      </div>

      {/* Brand name */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
        className="mt-10 text-center">
        <div className="text-4xl md:text-5xl font-black tracking-[0.15em] mb-1 leading-none"
          style={{ color: BRAND.white, letterSpacing: '0.1em' }}>
          <span style={{ color: BRAND.gold, textShadow: `0 0 30px ${BRAND.gold}` }}>TWIN </span>
          <span style={{ color: BRAND.white }}>SCISSORS</span>
        </div>
        <div className="text-xs tracking-[0.5em] uppercase font-bold mt-2"
          style={{ color: BRAND.goldDark }}>
          Barbershop · Bahrain
        </div>
      </motion.div>

      {/* Loading bar */}
      <motion.div className="mt-10 h-[2px] rounded-full overflow-hidden"
        style={{ width: '220px', background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.7, ease: 'easeInOut', delay: 0.2 }}
          style={{ background: `linear-gradient(90deg, ${BRAND.goldDark}, ${BRAND.gold}, ${BRAND.goldLight})` }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-4 text-xs tracking-[0.3em] uppercase"
        style={{ color: 'rgba(255,255,255,0.2)' }}>
        {isRTL ? 'جاري التحميل...' : 'Loading...'}
      </motion.p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HERO — Shop interior as cinematic backdrop
   ══════════════════════════════════════════════════════════════════ */
function HeroSection({ isRTL, onChatOpen }: { isRTL: boolean; onChatOpen: () => void }) {
  const { t } = useTranslation();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* Shop photo — 4-layer cinematic treatment */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: '#08080a' }} />

        {/* Hero background using uploaded shop interior photo */}
        <img
          src="/gallery/interior.jpg"
          alt="Twin Scissors Barbershop Interior"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{
            objectPosition: 'center 30%',
            opacity: imgLoaded ? 1 : 0,
            animation: imgLoaded ? 'heroZoom 22s ease-in-out infinite alternate' : 'none',
          }}
          onLoad={() => setImgLoaded(true)}
          onError={e => {
            const img = e.target as HTMLImageElement;
            if (img.src.includes('interior.jpg')) {
              img.src = '/gallery/11.jpg';
            } else if (img.src.includes('11.jpg')) {
              img.src = '/gallery/6.jpg';
              setImgLoaded(true);
            }
          }}
        />

        {/* Deep vignette */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.75) 100%)' }} />

        {/* Top-bottom gradient */}
        <div className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(10,10,11,0.90) 0%, rgba(10,10,11,0.25) 30%, rgba(10,10,11,0.25) 55%, rgba(10,10,11,0.70) 80%, ${BRAND.bg} 100%)`,
          }} />

        {/* Gold neon wash — the brand color diffused through the dark space */}
        <div className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.03) 40%, transparent 75%)`,
          }} />

        {/* Side darkening */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)' }} />
      </div>

      {/* Ambient gold orbs */}
      <div className="absolute top-[18%] left-[8%] w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)`, filter: 'blur(60px)', animation: 'floatOrb 9s ease-in-out infinite' }} />
      <div className="absolute bottom-[20%] right-[8%] w-72 h-72 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)`, filter: 'blur(50px)', animation: 'floatOrb 12s ease-in-out infinite reverse' }} />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-28 pb-20">

        {/* Rating pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current"
                style={{ color: BRAND.gold, filter: `drop-shadow(0 0 6px ${BRAND.gold})` }} />
            ))}
          </div>
          <span className="text-sm font-bold tracking-wide" style={{ color: BRAND.silver }}>5.0 · Bahrain</span>
        </motion.div>

        {/* 3D Sign Board — the centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring', damping: 13, stiffness: 90 }}
          className="mb-8">
          <div className="inline-block relative">
            {/* 3D depth shadow layers */}
            <div className="absolute inset-0 rounded-3xl translate-x-3 translate-y-3"
              style={{ background: BRAND.goldDark, opacity: 0.35, filter: 'blur(2px)' }} />
            <div className="absolute inset-0 rounded-3xl translate-x-1.5 translate-y-1.5"
              style={{ background: BRAND.gold, opacity: 0.15 }} />

            {/* Main sign */}
            <div className="relative rounded-3xl px-8 py-7 md:px-12 md:py-9"
              style={{
                background: 'rgba(8,7,5,0.88)',
                backdropFilter: 'blur(32px) saturate(1.8)',
                WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
                border: `1px solid rgba(201,168,76,0.35)`,
                boxShadow: `
                  0 0 0 1px rgba(201,168,76,0.12),
                  0 0 60px rgba(201,168,76,0.22),
                  0 0 120px rgba(201,168,76,0.10),
                  inset 0 1px 0 rgba(255,255,255,0.08),
                  0 50px 100px rgba(0,0,0,0.70)
                `,
                transform: 'perspective(800px) rotateX(2deg)',
              }}>

              {/* Decorative top rule */}
              <div className="flex items-center gap-3 justify-center mb-4">
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}80, transparent)` }} />
                <Scissors className="w-4 h-4" style={{ color: BRAND.gold }} />
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}80, transparent)` }} />
              </div>

              {/* Arabic line */}
              <div className="text-base md:text-lg font-black mb-3 leading-none tracking-widest" style={{ direction: 'rtl', color: BRAND.silver, letterSpacing: '0.15em' }}>
                <span style={{ color: BRAND.gold, textShadow: `0 0 20px ${BRAND.gold}80` }}>توين سيزرز </span>
                <span style={{ color: BRAND.white }}>حلاق البحرين</span>
              </div>

              {/* Main English logotype */}
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.12em] leading-none">
                <span style={{ color: BRAND.gold, textShadow: `0 0 40px ${BRAND.gold}, 0 0 80px ${BRAND.goldDark}80` }}>TWIN</span>
                <span style={{ color: BRAND.white, textShadow: `0 0 30px rgba(255,255,255,0.2)` }}> SCISSORS</span>
              </div>

              {/* Subtitle */}
              <div className="text-sm md:text-base font-black tracking-[0.5em] uppercase mt-4"
                style={{ color: BRAND.goldDark, letterSpacing: '0.45em' }}>
                BARBERSHOP · BAHRAIN
              </div>

              {/* Decorative bottom rule */}
              <div className="flex items-center gap-3 justify-center mt-4">
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}80, transparent)` }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: BRAND.gold }} />
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}80, transparent)` }} />
              </div>

              {/* Top glass shine */}
              <div className="absolute inset-x-8 top-0 h-px rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
            </div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-sm md:text-base font-semibold mb-12 max-w-lg mx-auto leading-loose tracking-widest uppercase"
          style={{ color: 'rgba(201,168,76,0.65)', letterSpacing: '0.18em' }}>
          {isRTL ? '— حلاقة احترافية · عناية فائقة · البحرين —' : '— Premium Grooming · Professional Care · Bahrain —'}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          {/* Primary — Book via WhatsApp */}
          <a href={`https://wa.me/97317000900?text=${encodeURIComponent(isRTL ? 'السلام عليكم، أريد الحجز' : 'Hello, I would like to book an appointment')}`}
            target="_blank" rel="noopener noreferrer"
            className="relative overflow-hidden group flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-transform duration-200 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
              color: '#0a0a0b',
              boxShadow: `0 0 40px rgba(201,168,76,0.5), 0 15px 40px rgba(0,0,0,0.4)`,
            }}>
            <span className="relative z-10">
              {isRTL ? '✂ احجز موعدك' : '✂ Book Appointment'}
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${BRAND.goldLight}, ${BRAND.gold})` }} />
          </a>

          {/* Secondary — Directions */}
          <a href="https://www.google.com/maps/place/Twin+scissors+barbershop+%23bahrain/@26.2402735,50.5738485,15z/data=!4m17!1m10!3m9!1s0x3e49a5fbd2ccf531:0x59990426e9da287c!2sTwin+scissors+barbershop+%23bahrain!8m2!3d26.2402735!4d50.5738485!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11xfydrhwx!3m5!1s0x3e49a5fbd2ccf531:0x59990426e9da287c!8m2!3d26.2402735!4d50.5738485!16s%2Fg%2F11xfydrhwx?entry=ttu"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid rgba(201,168,76,0.30)`,
              color: BRAND.white,
              backdropFilter: 'blur(12px)',
            }}>
            <MapPin className="w-4 h-4" style={{ color: BRAND.gold }} />
            {isRTL ? 'اعثر علينا' : 'Get Directions'}
          </a>
        </motion.div>

        {/* Scroll indicator — clear separation from buttons */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none">
          <span className="text-[9px] font-black tracking-[0.5em] uppercase px-3 py-1 rounded-full"
            style={{
              color: 'rgba(201,168,76,0.6)',
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.12)',
              letterSpacing: '0.5em',
            }}>
            {isRTL ? 'اكتشف المزيد' : 'DISCOVER'}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1">
            <div className="w-px h-6 rounded-full" style={{ background: `linear-gradient(to bottom, ${BRAND.gold}, transparent)` }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: BRAND.gold, boxShadow: `0 0 6px ${BRAND.gold}` }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SERVICES / PRICELIST
   ══════════════════════════════════════════════════════════════════ */
function ServicesSection({ isRTL }: { isRTL: boolean }) {
  const { i18n } = useTranslation();

  return (
    <section id="services" className="py-24 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${BRAND.bg} 0%, ${BRAND.surface} 100%)` }}>

      {/* Subtle diagonal lines — like brushed metal */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${BRAND.gold} 0px, ${BRAND.gold} 1px, transparent 1px, transparent 40px)`,
        }} />

      {/* Gold center bloom */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)`, filter: 'blur(80px)' }} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.4em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{ color: BRAND.gold, background: 'rgba(201,168,76,0.08)', border: `1px solid rgba(201,168,76,0.25)` }}>
            <Scissors className="w-3 h-3" />
            {isRTL ? 'قائمة الأسعار' : 'Price List'}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase"
            style={{ color: BRAND.white }}>
            {isRTL ? 'خدماتنا' : 'Our Services'}
          </h2>
          <div className="w-24 h-[2px] mx-auto rounded-full mt-5"
            style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)` }} />
        </motion.div>

        {/* 3D Price card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative">

          {/* 3D depth shadow */}
          <div className="absolute inset-0 rounded-3xl translate-x-2 translate-y-2"
            style={{ background: BRAND.goldDark, opacity: 0.2, filter: 'blur(4px)', borderRadius: '24px' }} />

          {/* Card */}
          <div className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(14,13,11,0.95)',
              border: `1px solid rgba(201,168,76,0.25)`,
              boxShadow: `0 0 80px rgba(201,168,76,0.08), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,168,76,0.15)`,
              transform: 'perspective(1000px) rotateX(1deg)',
            }}>

            {/* Gold top bar */}
            <div className="h-1" style={{ background: `linear-gradient(90deg, ${BRAND.goldDark}, ${BRAND.gold}, ${BRAND.goldLight}, ${BRAND.gold}, ${BRAND.goldDark})` }} />

            {/* Card header */}
            <div className="px-8 pt-8 pb-6 text-center"
              style={{ borderBottom: `1px solid rgba(201,168,76,0.12)` }}>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}60)` }} />
                <img src="/gallery/logo.png" alt="Twin Scissors" className="w-12 h-12 object-contain"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${BRAND.gold}60, transparent)` }} />
              </div>
              <div className="text-lg font-black tracking-[0.3em] uppercase" style={{ color: BRAND.gold }}>
                Pricelist
              </div>
              <div className="text-xs tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {isRTL ? 'الأسعار بالدينار البحريني' : 'Prices in Bahraini Dinar (BD)'}
              </div>
            </div>

            {/* Menu rows */}
            <div className="px-6 md:px-10 py-6">
              {fullMenu.map((svc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04, duration: 0.35 }}
                  className="flex items-center justify-between py-4 group relative"
                  style={{ borderBottom: idx < fullMenu.length - 1 ? `1px solid rgba(201,168,76,0.08)` : 'none' }}>
                  {/* Hover fill */}
                  <div className="absolute inset-x-0 inset-y-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ background: `rgba(201,168,76,0.04)` }} />

                  <span className="font-semibold text-sm md:text-base relative z-10 transition-colors group-hover:text-white"
                    style={{ color: BRAND.silver }}>
                    {i18n.language === 'ar' ? svc.ar : svc.en}
                  </span>

                  {/* Dotted leader */}
                  <div className="flex-1 mx-5 min-w-0"
                    style={{ borderBottom: `1px dotted rgba(201,168,76,0.15)`, marginTop: '-2px' }} />

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 relative z-10">
                    <span className="font-black text-xl md:text-2xl tabular-nums"
                      style={{ color: BRAND.gold, textShadow: `0 0 12px ${BRAND.gold}60` }}>
                      {svc.price}
                    </span>
                    <span className="text-xs font-bold tracking-wider" style={{ color: 'rgba(201,168,76,0.5)' }}>
                      {svc.unit}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="px-8 pb-7 text-center"
              style={{ borderTop: `1px solid rgba(201,168,76,0.08)` }}>
              <p className="text-xs tracking-wide mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
                {isRTL ? '* الأسعار شاملة ضريبة القيمة المضافة' : '* All prices include VAT'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   GALLERY — Auto-scrolling strip + lightbox
   ══════════════════════════════════════════════════════════════════ */
function GallerySection() {
  const { i18n } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => `/gallery/${n}.jpg`);

  useEffect(() => {
    let id: number; let dir = 1;
    const loop = () => {
      if (scrollRef.current && !isPaused) {
        const el = scrollRef.current;
        const max = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= max - 1) dir = -1;
        else if (el.scrollLeft <= 0) dir = 1;
        el.scrollLeft += dir * 1.2;
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [isPaused]);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${BRAND.surface} 0%, ${BRAND.concrete} 100%)` }}>

      {/* Gold floor line */}
      <div className="absolute inset-x-0 bottom-0 h-px opacity-40"
        style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.4em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{ color: BRAND.gold, background: 'rgba(201,168,76,0.08)', border: `1px solid rgba(201,168,76,0.25)` }}>
            <Sparkles className="w-3.5 h-3.5" />
            {i18n.language === 'ar' ? 'معرض الصور' : 'Photo Gallery'}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-wider uppercase" style={{ color: BRAND.white }}>
            ✂ {i18n.language === 'ar' ? 'المعرض' : 'Gallery'}
          </h2>
          <div className="w-28 h-[2px] mx-auto rounded-full mt-5"
            style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)` }} />
        </motion.div>
      </div>

      <div className="relative w-full"
        onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)} dir="ltr">

        {(['left','right'] as const).map(side => (
          <div key={side}
            className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-4 md:left-8' : 'right-4 md:right-8'} hidden md:block z-10`}>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: side === 'left' ? -360 : 360, behavior: 'smooth' })}
              className="p-3 rounded-full transition-all hover:scale-110"
              style={{
                background: 'rgba(8,7,5,0.95)',
                border: `1px solid rgba(201,168,76,0.4)`,
                color: BRAND.gold,
                boxShadow: `0 0 20px rgba(201,168,76,0.2)`,
              }}>
              {side === 'left' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        ))}

        <div ref={scrollRef}
          className="flex overflow-x-auto gap-5 pb-10 pt-4 px-8 lg:px-24"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.07, duration: 0.5 }}
              className="shrink-0 w-[220px] md:w-[280px] aspect-[3/4] overflow-hidden rounded-2xl relative group cursor-pointer"
              style={{
                border: `1px solid rgba(201,168,76,0.2)`,
                boxShadow: `0 0 20px rgba(201,168,76,0.1), 0 20px 50px rgba(0,0,0,0.6)`,
                transform: 'perspective(600px)',
              }}
              onClick={() => setSelected(src)}
              whileHover={{ scale: 1.04, y: -8, rotateY: 2 }}>
              <img src={src} alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={e => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
              {/* Gold hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to top, rgba(201,168,76,0.35) 0%, transparent 60%)` }} />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.8)', border: `1px solid ${BRAND.gold}` }}>
                  <ArrowRight className="w-5 h-5" style={{ color: BRAND.gold }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs mt-1 md:hidden tracking-widest font-bold"
          style={{ color: BRAND.goldDark }}>← swipe →</p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(20px)' }}
            onClick={() => setSelected(null)}>
            <button
              className="absolute top-6 right-6 p-3 rounded-full z-10"
              style={{ background: 'rgba(8,7,5,0.98)', border: `1px solid rgba(201,168,76,0.4)`, color: BRAND.gold }}
              onClick={() => setSelected(null)}>
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              src={selected} alt="Selected"
              className="max-w-full max-h-full object-contain rounded-2xl"
              style={{ boxShadow: `0 0 90px rgba(201,168,76,0.3)` }}
              onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CHAT INTERFACE
   ══════════════════════════════════════════════════════════════════ */
function ChatInterface({ isRTL, t }: { isRTL: boolean; t: any }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: t('ChatWelcome') },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsTyping(true);

    try {
      const systemPrompt = isRTL
        ? `أنت مساعد حجز ذكي لـ Twin Scissors Barbershop في البحرين. مهمتك مساعدة العملاء في الحجز وإعطاء معلومات عن الخدمات والأسعار. الخدمات: قص الشعر 11 BD، حلاقة 5.5 BD، تصفيف شعر 7.7 BD، صباغة شعر 27.5 BD، تقشير الرأس 7.7/16.5 BD، العناية بالوجه 27.5 BD، تقشير الوجه 5.5 BD، مانيكير 11 BD، بديكير 13.2 BD، تقشير القدم 5.5 BD، تدليك القدم 5.5 BD، قص أظافر اليد 3.3 BD، قص أظافر القدم 4.4 BD. ساعات العمل: الاثنين-الجمعة 10 ص-9 م، السبت 10 ص-9 م، الأحد 10 ص-7:30 م. للحجز: https://wa.me/97317000900. العنوان: Rd 4625, Manama 973, Bahrain. كن ودودًا ومهنيًا وأجب باللغة العربية.`
        : `You are a smart booking assistant for Twin Scissors Barbershop in Bahrain. Help customers book appointments and provide info about services and prices. Services: Hair Cut 11 BD, Shave 5.5 BD, Hair Style 7.7 BD, Hair Color 27.5 BD, Scalp Scraping 7.7/16.5 BD, Facial 27.5 BD, Face Scraping 5.5 BD, Manicure 11 BD, Pedicure 13.2 BD, Foot Scraping 5.5 BD, Foot Massage 5.5 BD, Hand Nails Cutting 3.3 BD, Foot Nails Cutting 4.4 BD. Hours: Mon-Sat 10 AM-9 PM, Sun 10 AM-7:30 PM. To book: https://wa.me/97317000900. Address: Rd 4625, Manama 973, Bahrain. Be friendly, professional.`;

      // Build conversation history — Gemini needs strictly alternating user/model
      // Skip the first bot welcome message (index 0), only include real exchanges
      const pastMessages = messages.slice(1); // drop bot welcome
      const contents: { role: string; parts: { text: string }[] }[] = [];
      for (const m of pastMessages) {
        contents.push({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] });
      }
      contents.push({ role: 'user', parts: [{ text }] });

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key not configured. Please set VITE_GEMINI_API_KEY in Vercel environment variables.');
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: { maxOutputTokens: 600, temperature: 0.7 },
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error?.message || `HTTP ${res.status}`);
      }
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        (isRTL ? 'عذراً، حدث خطأ.' : 'Sorry, something went wrong.');
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    } catch (err: any) {
      const msg = err?.message || 'Unknown error';
      setMessages(prev => [...prev, { role: 'bot', text: isRTL ? `خطأ: ${msg}` : `Error: ${msg}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'rgba(5,5,4,0.98)' }}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={m.role === 'user' ? {
                  background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                  color: '#0a0a0b', fontWeight: 600,
                } : {
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid rgba(201,168,76,0.15)`,
                  color: BRAND.silver,
                }}>
                {m.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(201,168,76,0.15)` }}>
                <Loader2 className="w-4 h-4 animate-spin" style={{ color: BRAND.gold }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-4 flex gap-2" style={{ borderTop: '1px solid rgba(201,168,76,0.10)' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder={isRTL ? 'اكتب رسالتك...' : 'Type a message...'}
          dir={isRTL ? 'rtl' : 'ltr'}
          className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
          style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(201,168,76,0.18)`, color: BRAND.white }}
        />
        <button onClick={send}
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})` }}>
          <Send className="w-4 h-4" style={{ color: '#0a0a0b' }} />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FAQ ITEM
   ══════════════════════════════════════════════════════════════════ */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: open ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${open ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}
      onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-black text-sm md:text-base" style={{ color: open ? BRAND.gold : BRAND.white }}>
          {question}
        </span>
        <div className="flex-shrink-0 ml-4">
          {open
            ? <ChevronUp className="w-5 h-5" style={{ color: BRAND.gold }} />
            : <ChevronDown className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.3)' }} />}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: BRAND.silver }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   APP ROOT
   ══════════════════════════════════════════════════════════════════ */
export default function App() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
    setIsMobileMenuOpen(false);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'services', label: t('Services')  },
    { id: 'gallery',  label: t('Photos')    },
    { id: 'reviews',  label: t('Reviews')   },
    { id: 'faq',      label: t('FAQ')       },
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen isRTL={isRTL} />}
      </AnimatePresence>

      <div className={`min-h-screen ${isRTL ? 'dir-rtl' : 'dir-ltr'}`}
        style={{ background: BRAND.bg, color: BRAND.white, fontFamily: 'system-ui, sans-serif' }}
        dir={isRTL ? 'rtl' : 'ltr'}>

        {/* ── Navbar ── */}
        <nav className="fixed top-0 w-full z-50"
          style={{ background: 'rgba(10,10,11,0.95)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
          {/* Gold top stripe */}
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}, ${BRAND.goldLight}, ${BRAND.gold}, transparent)` }} />

          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 md:h-16">

              {/* Logo */}
              <div className="flex items-center gap-3 flex-shrink-0 group cursor-pointer">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: `2px solid rgba(201,168,76,0.6)`, boxShadow: `0 0 18px rgba(201,168,76,0.35)` }}>
                  <img src="/gallery/logo.webp" alt="Twin Scissors"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={e => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/gallery/logo.png';
                      img.onerror = () => { img.style.display = 'none'; };
                    }}
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-black tracking-[0.12em] leading-tight">
                    <span style={{ color: BRAND.gold }}>TWIN </span>
                    <span style={{ color: BRAND.white }}>SCISSORS</span>
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: BRAND.goldDark }}>Barbershop · Bahrain</div>
                </div>
              </div>

              {/* Desktop nav */}
              <div className="hidden lg:flex gap-8 items-center text-[11px] font-black tracking-[0.18em] uppercase">
                {navLinks.map((item, i) => (
                  <button key={i} onClick={() => scrollTo(item.id)}
                    className="text-zinc-400 hover:text-white transition-colors relative group bg-transparent border-0 cursor-pointer">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[2px] transition-all duration-300 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${BRAND.gold}, ${BRAND.goldLight})` }} />
                  </button>
                ))}
                <div className={`flex items-center gap-2 ${isRTL ? 'border-r pr-6' : 'border-l pl-6'}`}
                  style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                  <button onClick={toggleLang}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black tracking-widest transition-all hover:scale-105"
                    style={{ background: 'rgba(201,168,76,0.08)', border: `1px solid rgba(201,168,76,0.2)`, color: BRAND.gold }}
                    title={i18n.language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}>
                    <span className="text-base leading-none">{i18n.language === 'ar' ? '🇬🇧' : '🇸🇦'}</span>
                    <span>{i18n.language === 'ar' ? 'EN' : 'ع'}</span>
                  </button>
                </div>
              </div>

              {/* Mobile controls */}
              <div className="flex lg:hidden items-center gap-2">
                <button onClick={toggleLang}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest"
                  style={{ background: 'rgba(201,168,76,0.08)', border: `1px solid rgba(201,168,76,0.2)`, color: BRAND.gold }}
                  title={i18n.language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}>
                  <span className="text-base leading-none">{i18n.language === 'ar' ? '🇬🇧' : '🇸🇦'}</span>
                  <span>{i18n.language === 'ar' ? 'EN' : 'ع'}</span>
                </button>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-zinc-300">
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
                style={{ borderTop: `1px solid rgba(201,168,76,0.1)`, background: 'rgba(10,10,11,0.98)' }}>
                {navLinks.map((item, i) => (
                  <button key={i} onClick={() => scrollTo(item.id)}
                    className="w-full flex justify-between items-center px-5 py-4 text-sm text-zinc-300 hover:text-white font-bold tracking-widest uppercase transition-colors"
                    style={{ borderBottom: `1px solid rgba(201,168,76,0.07)` }}>
                    <span>{item.label}</span>
                    <span style={{ color: BRAND.gold }}>›</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main>
          <HeroSection isRTL={isRTL} onChatOpen={() => setIsChatOpen(true)} />
          <ServicesSection isRTL={isRTL} />
          <GallerySection />
          <ReviewsSection />

          {/* FAQ */}
          <section id="faq" className="py-24"
            style={{ background: `linear-gradient(180deg, ${BRAND.surface} 0%, ${BRAND.bg} 100%)` }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} className="text-center mb-14">
                <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.4em] uppercase mb-5 px-5 py-2 rounded-full"
                  style={{ color: BRAND.gold, background: 'rgba(201,168,76,0.08)', border: `1px solid rgba(201,168,76,0.25)` }}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {isRTL ? 'لديك سؤال؟' : 'Got Questions?'}
                </span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest" style={{ color: BRAND.white }}>{t('FAQ')}</h2>
                <div className="w-24 h-[2px] mx-auto rounded-full mt-5"
                  style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)` }} />
              </motion.div>
              <div className="space-y-4">
                {[1, 2, 3].map(n => (
                  <FAQItem key={n} question={t(`FaqQ${n}` as any)} answer={t(`FaqA${n}` as any)} />
                ))}
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer style={{ background: '#07070a', borderTop: `1px solid rgba(201,168,76,0.10)` }}>
            {/* Gold gradient top border */}
            <div className="h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${BRAND.goldDark}, ${BRAND.gold}, ${BRAND.goldLight}, ${BRAND.gold}, ${BRAND.goldDark}, transparent)` }} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                {/* Brand */}
                <div>
                  <div className="text-2xl font-black tracking-[0.12em] mb-1">
                    <span style={{ color: BRAND.gold }}>TWIN </span>
                    <span style={{ color: BRAND.white }}>SCISSORS</span>
                  </div>
                  <div className="text-xs tracking-[0.3em] uppercase mb-5 font-bold" style={{ color: BRAND.goldDark }}>Barbershop · Bahrain</div>
                  <p className="text-zinc-500 text-sm leading-relaxed">{t('Tagline')}</p>
                  <div className="flex gap-3 mt-6">
                    <a href="https://www.instagram.com/twin.scissors.bh" target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                      style={{ background: 'rgba(201,168,76,0.08)', border: `1px solid rgba(201,168,76,0.2)` }}>
                      <Instagram className="w-4 h-4" style={{ color: BRAND.gold }} />
                    </a>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="font-black mb-5 text-xs uppercase tracking-[0.3em]" style={{ color: BRAND.gold }}>{t('Contact')}</h4>
                  <div className="space-y-4 text-zinc-400 text-sm">
                    <a
                      href="https://www.google.com/maps/place/Twin+scissors+barbershop+%23bahrain/@26.2402735,50.5738485,15z/data=!4m17!1m10!3m9!1s0x3e49a5fbd2ccf531:0x59990426e9da287c!2sTwin+scissors+barbershop+%23bahrain!8m2!3d26.2402735!4d50.5738485!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11xfydrhwx!3m5!1s0x3e49a5fbd2ccf531:0x59990426e9da287c!8m2!3d26.2402735!4d50.5738485!16s%2Fg%2F11xfydrhwx?entry=ttu"
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-3 hover:text-white transition-colors">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: BRAND.gold }} />
                      <span className="leading-snug">Rd 4625, Manama 973, Bahrain</span>
                    </a>
                    <a href="tel:+97317000900" className="flex items-center gap-3 hover:text-white transition-colors">
                      <Phone className="w-4 h-4 flex-shrink-0" style={{ color: BRAND.gold }} />
                      <span dir="ltr" className="font-bold text-white tracking-wide">+973 1700 0900</span>
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <h4 className="font-black mb-5 text-xs uppercase tracking-[0.3em]" style={{ color: BRAND.gold }}>{t('Hours')}</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4" style={{ color: BRAND.gold }} />
                    <span className="text-zinc-300 text-sm font-semibold">{t('Opening_Hours')}</span>
                  </div>
                  <div className={`grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm ${isRTL ? 'pr-2' : 'pl-2'}`}>
                    {HOURS.map(({ day, hours }) => (
                      <>
                        <span key={day + 'a'} className="text-zinc-500">{t(day)}</span>
                        <span key={day + 'b'} dir="ltr" className="font-semibold" style={{ color: BRAND.white }}>{hours}</span>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8 text-center text-xs text-zinc-700"
                style={{ borderTop: `1px solid rgba(201,168,76,0.07)` }}>
                © {new Date().getFullYear()} Twin Scissors Barbershop — Bahrain. All rights reserved.
              </div>
            </div>
          </footer>
        </main>

        {/* ── Chat FAB ── */}
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-24 right-4 sm:right-6 w-14 h-14 rounded-full flex items-center justify-center z-50"
          whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}
          style={{
            background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
            boxShadow: `0 0 36px rgba(201,168,76,0.5), 0 10px 35px rgba(0,0,0,0.5)`,
          }}>
          <AnimatePresence mode="wait">
            <motion.div key={isChatOpen ? 'x' : 'msg'}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}>
              {isChatOpen
                ? <X className="w-6 h-6" style={{ color: '#0a0a0b' }} />
                : <MessageSquare className="w-6 h-6" style={{ color: '#0a0a0b' }} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* ── Chat panel ── */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.94 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="fixed bottom-[108px] right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-[400px] rounded-2xl z-[60] overflow-hidden flex flex-col"
              style={{
                maxHeight: '580px', height: '68vh',
                border: `1px solid rgba(201,168,76,0.22)`,
                boxShadow: `0 0 50px rgba(201,168,76,0.12), 0 40px 80px rgba(0,0,0,0.6)`,
              }}>
              <div className="p-4 flex justify-between items-center flex-shrink-0"
                style={{ background: 'rgba(10,10,11,0.98)', borderBottom: `1px solid rgba(201,168,76,0.10)` }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`, boxShadow: `0 0 16px rgba(201,168,76,0.4)` }}>
                    <Scissors className="w-5 h-5" style={{ color: '#0a0a0b' }} />
                  </div>
                  <div>
                    <h3 className="font-black text-sm" style={{ color: BRAND.white }}>{isRTL ? 'مساعد الحجز' : 'Booking Assistant'}</h3>
                    <p className="text-xs flex items-center gap-1.5" style={{ color: BRAND.gold }}>
                      <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                        style={{ background: BRAND.gold, boxShadow: `0 0 6px ${BRAND.gold}` }} />
                      {isRTL ? 'متاح الآن' : 'Online'}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ChatInterface isRTL={isRTL} t={t} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── WhatsApp FAB ── */}
        <motion.a
          href={`https://wa.me/97317000900?text=${encodeURIComponent(isRTL ? 'السلام عليكم، أريد الحجز' : 'Hello, I would like to book an appointment')}`}
          target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform"
          style={{ background: '#25D366', boxShadow: '0 0 30px rgba(37,211,102,0.5)' }}
          aria-label="Contact on WhatsApp">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </motion.a>
      </div>

      {/* ════ Global CSS ════ */}
      <style>{`
        @keyframes loadFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40%       { transform: translateY(-16px) rotate(4deg); }
          70%       { transform: translateY(-8px) rotate(-3deg); }
        }
        @keyframes heroZoom {
          from { transform: scale(1.00); }
          to   { transform: scale(1.06); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33%       { transform: translateY(-20px) translateX(8px); }
          66%       { transform: translateY(-10px) translateX(-5px); }
        }
        .dir-rtl { direction: rtl; }
        .dir-ltr { direction: ltr; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}