import React from 'react';
import { motion } from 'motion/react';
import { TimelineItem } from '../types';
import { Wine, Heart, Camera, Music, UtensilsCrossed, Sparkles } from 'lucide-react';

interface TimelineSectionProps {
  timeline: TimelineItem[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ timeline }) => {
  const getIcon = (type: TimelineItem['iconType']) => {
    switch (type) {
      case 'drink':
        return <Wine className="w-5 h-5 text-slate-200" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-slate-200" />;
      case 'music':
        return <Music className="w-5 h-5 text-slate-200" />;
      case 'dinner':
        return <UtensilsCrossed className="w-5 h-5 text-slate-200" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <section id="program-timeline-section" className="relative w-full flex flex-col items-center py-10 px-4">
      {/* Container matching mobile layout */}
      <div className="w-full max-w-[390px] sm:max-w-[420px] flex flex-col items-center">
        {/* Header Ribbon Bow and Titles */}
        <div className="flex flex-col items-center text-center mb-6">
          {/* Ribbon Bow Minimalist SVG Icon */}
          <div className="mb-2">
            <svg
              className="w-12 h-12 text-slate-300"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Bow loop left */}
              <path d="M 32 30 C 22 16 10 24 16 34 C 20 40 28 34 32 32" />
              {/* Bow loop right */}
              <path d="M 32 30 C 42 16 54 24 48 34 C 44 40 36 34 32 32" />
              {/* Center knot */}
              <circle cx="32" cy="31" r="3.5" fill="currentColor" opacity="0.4" />
              {/* Tails */}
              <path d="M 30 34 Q 24 44 20 50" />
              <path d="M 34 34 Q 40 44 44 50" />
            </svg>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PROGRAM &amp; TIMELINE</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            برنامه زمان‌بندی جشن
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
            همگام با لحظات به‌یادماندنی این شب طلایی
          </p>
        </div>

        {/* Main Dark Slate Blue Card matching Reference 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#415a72] rounded-[34px] shadow-2xl p-6 sm:p-7 border border-slate-600/40 text-white relative overflow-hidden"
        >
          {/* Interlocking Golden Wedding Rings at top center */}
          <div className="flex justify-center mb-6">
            <div className="relative w-12 h-8 flex items-center justify-center">
              <svg className="w-12 h-8 text-amber-300" viewBox="0 0 60 40" fill="none">
                <circle cx="22" cy="20" r="14" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.9" />
                <circle cx="38" cy="20" r="14" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.9" />
              </svg>
            </div>
          </div>

          {/* Timeline Items List */}
          <div className="flex flex-col space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                {/* Right Time Badge */}
                <div className="shrink-0">
                  <div className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-center shadow-inner">
                    <span className="text-sm font-bold text-white tracking-wide">
                      {item.time}
                    </span>
                  </div>
                </div>

                {/* Center Content */}
                <div className="flex-1 min-w-0 pt-0.5 text-right">
                  <h3 className="text-base font-bold text-white tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Left Circular Icon */}
                <div className="shrink-0 pt-1">
                  <div className="w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    {getIcon(item.iconType)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
