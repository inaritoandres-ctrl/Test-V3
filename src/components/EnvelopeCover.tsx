import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import envelopeVideo from '../assets/videos/envelope-open.mp4';
import { soundEngine } from '../utils/audio';

export interface EnvelopeCoverProps {
  onVideoEnd?: () => void;
  onOpenStart?: () => void;
  groomName?: string;
  brideName?: string;
  videoSrc?: string;
  helperText?: string;
  ariaLabel?: string;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({
  onVideoEnd,
  onOpenStart,
  videoSrc,
  helperText = 'برای باز کردن کارت، مهر را لمس کنید',
  ariaLabel = 'باز کردن پاکت دعوت با لمس مهر موم',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ensure the video is loaded and paused at frame 0 on initial mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.pause();

    const handleLoadedMetadata = () => {
      if (video && !isPlaying) {
        video.currentTime = 0;
        video.pause();
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // 3D tilt effect on desktop mouse move (only before playback)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPlaying) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleWaxSealClick = () => {
    if (isPlaying) return;

    // 1. Mark playing immediately
    setIsPlaying(true);

    // 2. Play the envelope video directly and synchronously with its own sound ON
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;

      try {
        if (videoRef.current.currentTime > 0) {
          videoRef.current.currentTime = 0;
        }
      } catch {
        // safely ignore seek issues
      }

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback error:', err);
          // If browser restricted unmuted playback in this specific environment, retry or proceed
          if (videoRef.current) {
            videoRef.current.play().catch(() => {
              onVideoEnd?.();
            });
          } else {
            onVideoEnd?.();
          }
        });
      }
    }

    // 3. Notify parent sequence started
    onOpenStart?.();
  };

  return (
    <div
      id="envelope-intro-screen"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d141e] px-3 py-4 select-none overflow-hidden font-sans"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient luxury background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-sky-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl" />
      </div>

      {/* 
        ENVELOPE CONTAINER:
        Strictly matches the exact aspect ratio of the envelope (608x1080 = 76/135).
        Fits responsively into viewport without letterboxing or pillarboxing.
        No outer white box, no white card, no border, no padding.
      */}
      <div
        onClick={!isPlaying ? handleWaxSealClick : undefined}
        className={`relative max-w-[420px] w-auto h-auto max-h-[92vh] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex items-center justify-center ${
          !isPlaying ? 'cursor-pointer' : ''
        }`}
        style={{
          aspectRatio: '608 / 1080',
          transform: !isPlaying
            ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
            : 'none',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* 
          THE ENVELOPE VIDEO:
          Single source of truth. Resolution 608x1080.
          Every pixel edge is 100% envelope - zero white side margins.
          Unmuted: plays with its own audio track intact.
        */}
        <video
          id="envelope-opening-video"
          ref={videoRef}
          src={videoSrc || envelopeVideo}
          playsInline
          preload="auto"
          muted={false}
          onEnded={() => {
            onVideoEnd?.();
          }}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration > 0 && v.currentTime >= v.duration - 0.2) {
              onVideoEnd?.();
            }
          }}
          onError={() => {
            onVideoEnd?.();
          }}
          className="w-full h-full object-cover block"
        />

        {/* 
          WAX SEAL HOTSPOT & HIGHLIGHT:
          Directly calibrated to superimpose exactly over the circular wax seal in the video:
          - Center: left: 48.4%, top: 52.8%
          - Dimensions: w-[29%] aspect-square perfectly covers the circular wax seal body
          Fades out cleanly when video starts playing.
        */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <button
            id="wax-seal-hotspot"
            type="button"
            onClick={handleWaxSealClick}
            disabled={isPlaying}
            aria-label={ariaLabel}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[29%] aspect-square rounded-full cursor-pointer pointer-events-auto group focus:outline-none focus:ring-4 focus:ring-amber-300/60 transition-transform duration-200 active:scale-95 flex items-center justify-center"
            style={{
              left: '48.4%',
              top: '52.8%',
            }}
          >
            {/* Glowing aura aligned precisely on the circular contour of the wax seal */}
            <span className="absolute inset-0 rounded-full bg-amber-400/35 blur-md animate-pulse group-hover:bg-amber-400/50 transition-colors border border-amber-300/50" />

            {/* Subtle center shimmer hint */}
            <span className="relative text-amber-200 text-lg sm:text-xl drop-shadow select-none">
              ✨
            </span>
          </button>
        </div>

        {/* 
          Helper Text:
          "برای باز کردن کارت، مهر را لمس کنید"
        */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center pointer-events-none px-4 text-center"
            >
              <div className="bg-slate-900/85 backdrop-blur-md px-5 py-2.5 rounded-full border border-amber-300/30 shadow-xl flex items-center gap-2.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <p className="text-xs sm:text-sm font-medium text-amber-100 tracking-wide font-sans">
                  {helperText}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
