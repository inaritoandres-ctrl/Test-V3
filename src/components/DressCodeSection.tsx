import React from 'react';
import { motion } from 'motion/react';
import { DressCode } from '../types';
import { Sparkles, Check } from 'lucide-react';

interface DressCodeSectionProps {
  dressCode: DressCode;
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({ dressCode }) => {
  return (
    <section className="relative w-full flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-[390px] sm:max-w-[420px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/80 rounded-[32px] p-6 sm:p-7 border border-slate-700/60 shadow-xl backdrop-blur-md text-white"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 text-amber-400">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-lg font-extrabold tracking-tight text-white">
              {dressCode.title}
            </h3>
          </div>
          <p className="text-xs text-slate-300 mb-5 leading-relaxed">
            {dressCode.subtitle}
          </p>

          {/* Color Palette Swatches */}
          <div className="mb-6">
            <span className="text-[11px] font-semibold text-slate-400 block mb-3">
              پالت رنگی پیشنهادی جشن:
            </span>
            <div className="flex items-center justify-between gap-2">
              {dressCode.palette.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl shadow-md border border-white/20 flex items-center justify-center transition-transform hover:scale-105"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1.5 font-medium text-center truncate max-w-[60px]">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dress Guidelines */}
          <div className="space-y-2.5 pt-4 border-t border-slate-800">
            {dressCode.notes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-right">
                <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
