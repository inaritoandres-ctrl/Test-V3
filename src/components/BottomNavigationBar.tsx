import React, { useState } from 'react';
import { Mail, Share2, Volume2, VolumeX, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ShareConfig } from '../types';

interface BottomNavigationBarProps {
  onCloseEnvelope: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  shareConfig?: ShareConfig;
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  onCloseEnvelope,
  isMusicPlaying,
  onToggleMusic,
  shareConfig,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareTitle = shareConfig?.title || 'کارت دعوت عروسی';
    const shareText = shareConfig?.text || 'شما به جشن پیوند آسمانی دعوت شده‌اید';

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* Toast message for copy link */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-amber-200 px-5 py-2 rounded-full border border-amber-400/40 shadow-xl text-xs font-medium flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>لینک دعوت‌نامه کپی شد!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Bar matching Reference 1 & 2 */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[360px]">
        <div className="bg-[#1b2633]/92 backdrop-blur-xl border border-slate-700/80 rounded-full px-4 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center justify-between text-white">
          {/* 1. Share Button */}
          <button
            type="button"
            onClick={handleShare}
            aria-label="اشتراک‌گذاری کارت دعوت"
            className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all text-slate-300 hover:text-white"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-slate-700/80" />

          {/* 2. Close Envelope Button (بستن پاکت) */}
          <button
            type="button"
            onClick={onCloseEnvelope}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-slate-200 hover:text-white font-medium text-xs sm:text-[13px]"
          >
            <span>بستن پاکت</span>
            <Mail className="w-4 h-4 text-slate-300" />
          </button>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-slate-700/80" />

          {/* 3. Music Toggle with Equalizer Wave Bars */}
          <button
            type="button"
            onClick={onToggleMusic}
            aria-label={isMusicPlaying ? 'قطع موسیقی' : 'پخش موسیقی'}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-600/50 active:scale-95 transition-all"
          >
            {/* Animated Equalizer Waveform Bars */}
            <div className="flex items-end gap-[2px] h-3.5 w-4">
              <span
                className={`w-[2.5px] bg-amber-400 rounded-full transition-all duration-300 ${
                  isMusicPlaying ? 'h-3.5 animate-pulse' : 'h-1'
                }`}
              />
              <span
                className={`w-[2.5px] bg-amber-400 rounded-full transition-all duration-300 delay-75 ${
                  isMusicPlaying ? 'h-2 animate-bounce' : 'h-1'
                }`}
              />
              <span
                className={`w-[2.5px] bg-amber-400 rounded-full transition-all duration-300 delay-150 ${
                  isMusicPlaying ? 'h-3.5 animate-pulse' : 'h-1'
                }`}
              />
            </div>

            {isMusicPlaying ? (
              <Volume2 className="w-4 h-4 text-amber-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
