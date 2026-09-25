/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { EnvelopeCover } from './components/EnvelopeCover';
import { MainInvitation } from './components/MainInvitation';
import { defaultInvitationData } from './data/invitationData';

export default function App() {
  const [data] = useState(defaultInvitationData);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpeningSequence, setIsOpeningSequence] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(data.music.src);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handlePlay = () => setIsMusicPlaying(true);
    const handlePause = () => setIsMusicPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, [data.music.src]);

  // When user taps wax seal, opening sequence starts
  const handleOpenStart = () => {
    setIsOpeningSequence(true);
  };

  // Called strictly from the video's onEnded event (no setTimeout guessing)
  const handleVideoEnd = () => {
    setIsOpeningSequence(false);
    setIsOpen(true);
    if (data.music.autoPlayOnOpen && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Handled silently if browser restricts
      });
    }
  };

  // Re-close envelope
  const handleCloseEnvelope = () => {
    setIsOpen(false);
    setIsOpeningSequence(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle background music
  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-[#182330] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900">
      {/* 
        The initial screen is the Envelope.
        When the video reaches onEnded, isOpen becomes true and Main Invitation appears.
      */}
      {!isOpen ? (
        <EnvelopeCover
          onOpenStart={handleOpenStart}
          onVideoEnd={handleVideoEnd}
          videoSrc={data.envelope.videoSrc}
          helperText={data.envelope.helperText}
          ariaLabel={data.envelope.ariaLabel}
          groomName={data.couple.groomName}
          brideName={data.couple.brideName}
        />
      ) : (
        <MainInvitation
          data={data}
          onCloseEnvelope={handleCloseEnvelope}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />
      )}
    </div>
  );
}
