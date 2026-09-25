import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CoupleInfo, WeddingDetails } from '../types';
import { Heart, Calendar, Clock, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  couple: CoupleInfo;
  wedding: WeddingDetails;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ couple, wedding }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(wedding.countdownTarget).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [wedding.countdownTarget]);

  // Persian number converter
  const toPersianNum = (n: number) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (d) => farsiDigits[parseInt(d, 10)]);
  };

  return (
    <section className="relative w-full flex flex-col items-center pt-6 pb-12 px-4">
      {/* Top Pill Banner: ✨ کارت دعوت عروسی • WEDDING INVITATION ✨ */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 backdrop-blur-md shadow-lg text-slate-200">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            کارت دعوت عروسی • WEDDING INVITATION
          </span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>
      </motion.div>

      {/* Main Arch Frame Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full max-w-[390px] sm:max-w-[420px] bg-[#f8f9fa] rounded-[38px] overflow-hidden shadow-2xl border border-slate-700/30 text-slate-800 flex flex-col items-center"
      >
        {/* Arch Photo Container */}
        <div className="relative w-full px-3 pt-3">
          <div className="relative w-full aspect-[4/5] rounded-t-[160px] sm:rounded-t-[180px] overflow-hidden shadow-inner bg-slate-100">
            <img
              src={couple.heroPhoto}
              alt={`${couple.brideName} & ${couple.groomName}`}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />

            {/* Script Typography Overlay at Top: Radin & Sara */}
            <div className="absolute top-6 left-0 right-0 text-center pointer-events-none">
              <h1 className="font-script text-4xl sm:text-5xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] tracking-wide">
                {couple.latinNames}
              </h1>
            </div>

            {/* Floating Date Badge at bottom of photo: 25 . 12 . 12 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md px-6 py-1.5 rounded-full shadow-md border border-white/60">
                <span className="font-serif-display font-semibold tracking-[0.25em] text-slate-800 text-sm sm:text-base">
                  {couple.dateBadge}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Below Arch Photo: Typography and Names */}
        <div className="w-full px-6 pt-5 pb-8 flex flex-col items-center text-center">
          {/* Couple Names in Persian */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#203a43] tracking-tight">
              {couple.brideName}
            </span>
            <span className="font-serif-display text-2xl sm:text-3xl font-light text-slate-400 italic">
              &amp;
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-[#203a43] tracking-tight">
              {couple.groomName}
            </span>
          </div>

          {/* Sparkle Subtitle */}
          <div className="flex items-center gap-1.5 mt-2.5 text-slate-600 text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{couple.sparkleQuote}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>

          {/* Decorative Diamond Row Divider */}
          <div className="w-full flex items-center justify-center gap-2 my-5 text-slate-300">
            <span className="h-px w-12 bg-slate-200" />
            <span className="text-[9px] tracking-widest text-slate-400">◆ ◇ ◆ ◇ ◆</span>
            <span className="h-px w-12 bg-slate-200" />
          </div>

          {/* Floating Heart Icon Badge */}
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm mb-4">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>

          {/* Invitation Verse */}
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed px-2 text-justify [text-align-last:center]">
            {couple.invitationVerse}
          </p>

          {/* Date & Time Highlights */}
          <div className="w-full mt-6 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-right">
              <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-500 font-medium">تاریخ جشن</span>
                <span className="text-xs font-bold text-slate-800 truncate">{wedding.dateSolar}</span>
                <span className="text-[10px] text-slate-400 truncate">{wedding.dateGregorian}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-right">
              <div className="w-9 h-9 rounded-xl bg-sky-100/70 text-sky-800 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-500 font-medium">ساعت مراسم</span>
                <span className="text-xs font-bold text-slate-800 truncate">{wedding.time} عصر</span>
                <span className="text-[10px] text-slate-400 truncate">{wedding.dayOfWeek}</span>
              </div>
            </div>
          </div>

          {/* Countdown Section */}
          <div className="w-full mt-6 pt-5 border-t border-slate-100 flex flex-col items-center">
            <span className="text-[11px] text-slate-500 font-medium mb-3">
              شمارش معکوس تا آغاز جشن وصال
            </span>
            <div className="grid grid-cols-4 gap-2 w-full max-w-[320px]">
              {[
                { label: 'روز', val: timeLeft.days },
                { label: 'ساعت', val: timeLeft.hours },
                { label: 'دقیقه', val: timeLeft.minutes },
                { label: 'ثانیه', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 text-white shadow-sm"
                >
                  <span className="text-base sm:text-lg font-bold text-amber-300 font-serif-display">
                    {toPersianNum(item.val)}
                  </span>
                  <span className="text-[10px] text-slate-300 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
