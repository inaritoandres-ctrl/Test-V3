import React from 'react';
import { motion } from 'motion/react';
import { InvitationData } from '../types';
import { HeroSection } from './HeroSection';
import { TimelineSection } from './TimelineSection';
import { DressCodeSection } from './DressCodeSection';
import { LocationSection } from './LocationSection';
import { GallerySection } from './GallerySection';
import { RsvpSection } from './RsvpSection';
import { GuestbookSection } from './GuestbookSection';
import { BottomNavigationBar } from './BottomNavigationBar';

interface MainInvitationProps {
  data: InvitationData;
  onCloseEnvelope: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const MainInvitation: React.FC<MainInvitationProps> = ({
  data,
  onCloseEnvelope,
  isMusicPlaying,
  onToggleMusic,
}) => {
  return (
    <motion.main
      id="main-invitation-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full bg-[#182330] text-white flex flex-col items-center pb-28"
    >
      {/* Subtle ambient lighting glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-sky-900/15 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-rose-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        {/* 1. Hero Section */}
        {(data.modules?.hero?.enabled ?? true) && (
          <HeroSection couple={data.couple} wedding={data.wedding} />
        )}

        {/* 2. Program & Timeline Section */}
        {(data.modules?.timeline?.enabled ?? true) && (
          <TimelineSection timeline={data.timeline} />
        )}

        {/* 3. Dress Code Section */}
        {(data.modules?.dressCode?.enabled ?? true) && (
          <DressCodeSection dressCode={data.dressCode} />
        )}

        {/* 4. Location & Venue Section */}
        {(data.modules?.location?.enabled ?? true) && (
          <LocationSection location={data.location} />
        )}

        {/* 5. Photo Gallery Section */}
        {(data.modules?.gallery?.enabled ?? true) && (
          <GallerySection gallery={data.gallery} />
        )}

        {/* 6. RSVP Form Section */}
        {(data.modules?.rsvp?.enabled ?? true) && (
          <RsvpSection
            coupleNames={`${data.couple.brideName} و ${data.couple.groomName}`}
            notePlaceholder={data.rsvp?.notePlaceholder}
          />
        )}

        {/* 7. Guestbook & Wishes Section */}
        {(data.modules?.guestbook?.enabled ?? true) && (
          <GuestbookSection
            initialEntries={data.guestbook}
            coupleNames={`${data.couple.brideName} و ${data.couple.groomName}`}
            messagePlaceholder={data.guestbookConfig?.messagePlaceholder}
          />
        )}

        {/* Footer Signature */}
        <footer className="w-full text-center py-10 px-4 text-slate-400">
          <p className="font-script text-3xl text-amber-200/90 mb-2">
            {data.footer?.signature || data.couple.latinNames}
          </p>
          <p className="text-xs text-slate-400 font-medium">
            {data.footer?.wishesText || 'با آرزوی روزهایی سرشار از شادمانی و عشق برای تک‌تک شما عزیزان'}
          </p>
          <p className="text-[10px] text-slate-500 mt-3">
            {data.footer?.badgeText || '✨ دعوت‌نامه دیجیتال هوشمند عروسی ✨'}
          </p>
        </footer>
      </div>

      {/* Sticky Bottom Floating Navigation Bar */}
      <BottomNavigationBar
        onCloseEnvelope={onCloseEnvelope}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={onToggleMusic}
        shareConfig={data.share}
      />
    </motion.main>
  );
};
