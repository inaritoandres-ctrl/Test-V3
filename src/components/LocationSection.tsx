import React from 'react';
import { motion } from 'motion/react';
import { LocationInfo } from '../types';
import { MapPin, Navigation, Car, ExternalLink } from 'lucide-react';

interface LocationSectionProps {
  location: LocationInfo;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ location }) => {
  return (
    <section id="venue-location-section" className="relative w-full flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-[390px] sm:max-w-[420px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[34px] p-6 sm:p-7 shadow-2xl border border-slate-200/80 text-slate-800"
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {location.venueName}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{location.hallName}</p>
            </div>
          </div>

          {/* Address */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">
              آدرس لوکیشن عمارت:
            </span>
            <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
              {location.address}
            </p>
          </div>

          {/* Parking Info */}
          <div className="flex items-start gap-2.5 mb-6 text-slate-600 text-xs leading-relaxed">
            <Car className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>{location.parkingInfo}</span>
          </div>

          {/* Stylized Vector Map Preview */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200 mb-6 bg-slate-100 group">
            {/* Map background illustration */}
            <div className="absolute inset-0 bg-[#e5e3df] flex items-center justify-center opacity-85">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Roads */}
                <path d="M 0 100 Q 150 70 400 120" stroke="#ffffff" strokeWidth="18" fill="none" />
                <path d="M 0 100 Q 150 70 400 120" stroke="#fcd34d" strokeWidth="3" strokeDasharray="6,6" fill="none" />
                <path d="M 220 0 Q 200 100 230 200" stroke="#ffffff" strokeWidth="14" fill="none" />
                {/* Green landscape areas */}
                <circle cx="280" cy="80" r="45" fill="#d1fae5" />
                <circle cx="120" cy="140" r="35" fill="#d1fae5" />
                {/* Lake */}
                <path d="M 40 40 Q 80 20 100 60 Q 70 80 40 40 Z" fill="#bae6fd" />
              </svg>
            </div>

            {/* Glowing venue pinpoint */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-rose-500 animate-ping absolute" />
              <div className="relative z-10 w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                <MapPin className="w-5 h-5 fill-white" />
              </div>
              <div className="bg-slate-900/90 text-white text-[10px] font-bold px-3 py-1 rounded-full mt-1.5 shadow-md border border-slate-700 whitespace-nowrap">
                {location.venueName}
              </div>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={location.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>مسیریابی با Waze</span>
            </a>

            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md shadow-slate-900/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>گوگل مپ (Google)</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
