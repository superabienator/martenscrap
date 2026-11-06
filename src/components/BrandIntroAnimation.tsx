import React, { useState, useEffect } from 'react';

export const BrandIntroAnimation: React.FC = () => {
  // Animation state: 'animating' -> 'settled'
  const [isSettled, setIsSettled] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    // Check user's reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsSettled(true);
      return;
    }

    setIsSettled(false);

    // Timing:
    // 0s - 3.2s: Hand with Legami bear pen writes across the letters
    // 0.2s - 3.4s: Nebula mist blooms over the letters and dissolves
    // 3.4s: State settles, logo stays permanently floating
    const timer = setTimeout(() => {
      setIsSettled(true);
    }, 3400);

    return () => clearTimeout(timer);
  }, [replayKey]);

  const handleReplay = () => {
    if (isSettled) {
      setReplayKey(prev => prev + 1);
    }
  };

  return (
    <div 
      className="relative w-full flex flex-col items-center justify-center my-3 sm:my-5 select-none cursor-pointer group"
      onClick={handleReplay}
      title="Martenscrap • Clic para repetir animación"
      role="banner"
    >
      {/* 
        LOGOMARK STAGE:
        Directly wraps the logo so all coordinate calculations (hand travel, nebula mist, clip reveal)
        are 100% mathematically locked to the exact size and position of the logo on ANY screen.
      */}
      <div className="relative inline-flex items-center justify-center overflow-visible">

        {/* 1. THE OFFICIAL MARTENSCRAP LOGO */}
        <div 
          key={`logo-view-${replayKey}`}
          className="relative z-10 flex items-center justify-center will-change-transform"
          style={{
            animation: isSettled 
              ? 'floatingLogoGentle 5s ease-in-out infinite' 
              : 'logoSeamlessUnveil 3.2s cubic-bezier(0.2, 0.8, 0.3, 1) forwards'
          }}
        >
          <img
            src="/logo-original.png"
            alt="Martenscrap"
            className="h-20 sm:h-28 md:h-32 lg:h-36 w-auto max-w-[280px] sm:max-w-[420px] md:max-w-[540px] object-contain drop-shadow-[0_6px_18px_rgba(147,51,234,0.12)] filter transition-transform duration-300 group-hover:scale-105 pointer-events-none"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* 2. THE LINGERING NEBULA MIST CLOUD (Locks directly over the logo bounds) */}
        {!isSettled && (
          <div
            key={`nebula-cloud-${replayKey}`}
            className="absolute inset-x-[-15%] inset-y-[-25%] pointer-events-none z-20 will-change-transform"
            style={{
              animation: 'nebulaCloudLinger 3.4s cubic-bezier(0.25, 0.85, 0.35, 1) forwards'
            }}
          >
            <div className="relative w-full h-full">
              {/* Amethyst violet nebula core */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/35 via-fuchsia-400/30 to-purple-600/35 blur-2xl sm:blur-3xl transform scale-105" />
              {/* Warm sand & gold mist layer */}
              <div className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-r from-amber-300/35 via-amber-400/25 to-pink-300/25 blur-xl sm:blur-2xl transform -translate-x-3" />
              {/* Pastel coral & cyan stardust glow */}
              <div className="absolute inset-4 sm:inset-8 rounded-full bg-gradient-to-r from-teal-200/25 via-rose-300/25 to-purple-300/25 blur-lg sm:blur-xl transform translate-x-3" />
              
              {/* Twinkling stardust flecks drifting within the mist */}
              <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-xs animate-ping" />
              <div className="absolute top-1/2 left-2/3 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-200 shadow-xs animate-pulse" />
              <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-purple-200 shadow-xs animate-ping" />
            </div>
          </div>
        )}

        {/* 3. AUTHENTIC HAND WITH KAWAII LEGAMI BEAR PEN */}
        {!isSettled && (
          <div
            key={`hand-pen-${replayKey}`}
            className="absolute top-[65%] left-0 pointer-events-none z-30 w-24 sm:w-36 md:w-44 lg:w-48 h-auto will-change-transform"
            style={{
              animation: 'handWritingGlide 3.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards'
            }}
          >
            <div className="relative w-full">
              {/* Sparkles emanating exactly from the pen tip at [14.3%, 98.2%] */}
              <div 
                className="absolute pointer-events-none z-40"
                style={{
                  left: '14.3%',
                  top: '98.2%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-300 animate-ping absolute -top-1 -left-1" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400 animate-pulse absolute -top-2 -left-2.5" />
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-pink-300 animate-ping absolute top-1 left-1" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-xs absolute -top-0.5 left-1" />
                </div>
              </div>

              {/* The Hand & Legami Pen Image */}
              <img
                src="/hand-pen.png"
                alt="Mano escribiendo con bolígrafo kawaii"
                className="w-full h-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
