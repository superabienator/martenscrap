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
    // 0s - 3.4s: Hand with Legami bear pen writes across the logo
    // 0.2s - 3.8s: Nebula cloud rolls in, lingers softly over the letters, and dissolves seamlessly
    // 3.8s: State settles, logo stays permanently floating
    const timer = setTimeout(() => {
      setIsSettled(true);
    }, 3800);

    return () => clearTimeout(timer);
  }, [replayKey]);

  const handleReplay = () => {
    if (isSettled) {
      setReplayKey(prev => prev + 1);
    }
  };

  return (
    <div 
      className="relative w-full flex flex-col items-center justify-center my-4 sm:my-6 select-none cursor-pointer group"
      onClick={handleReplay}
      title="Martenscrap • Clic para repetir animación"
      role="banner"
    >
      {/* Centered Floating Logo Canvas Area (Seamless, overflow-visible, natural integration without box cuts) */}
      <div className="relative w-full max-w-2xl min-h-[120px] sm:min-h-[150px] md:min-h-[170px] flex items-center justify-center overflow-visible">

        {/* 1. THE OFFICIAL MARTENSCRAP LOGO */}
        <div 
          key={`logo-view-${replayKey}`}
          className="relative z-10 flex items-center justify-center will-change-transform"
          style={{
            animation: isSettled 
              ? 'floatingLogoGentle 5s ease-in-out infinite' 
              : 'logoSeamlessUnveil 3.4s cubic-bezier(0.2, 0.8, 0.3, 1) forwards'
          }}
        >
          <img
            src="/logo-original.png"
            alt="Martenscrap"
            className="h-20 sm:h-28 md:h-32 lg:h-36 w-auto max-w-[320px] sm:max-w-[460px] md:max-w-[560px] object-contain drop-shadow-[0_6px_18px_rgba(147,51,234,0.12)] filter transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* 2. THE LINGERING NEBULA MIST CLOUD (Diffuses softly and organically over the letters without any square boundary) */}
        {!isSettled && (
          <div
            key={`nebula-cloud-${replayKey}`}
            className="absolute top-1/2 left-1/2 pointer-events-none z-20 w-72 sm:w-[480px] h-44 sm:h-56 will-change-transform"
            style={{
              animation: 'nebulaCloudLinger 3.8s cubic-bezier(0.25, 0.85, 0.35, 1) forwards'
            }}
          >
            {/* Soft multilayered atmospheric vapor: Purple, Warm Honey Sand & Pastel Pink */}
            <div className="relative w-full h-full">
              {/* Amethyst violet nebula core */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/35 via-fuchsia-400/30 to-purple-600/35 blur-3xl transform scale-110" />
              {/* Warm sand & gold mist layer */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-amber-300/35 via-amber-400/25 to-pink-300/25 blur-2xl transform -translate-x-6" />
              {/* Pastel coral & cyan stardust glow */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-r from-teal-200/25 via-rose-300/25 to-purple-300/25 blur-xl transform translate-x-6" />
              
              {/* Twinkling stardust flecks drifting within the mist */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white shadow-xs animate-ping" />
              <div className="absolute top-1/2 left-2/3 w-2.5 h-2.5 rounded-full bg-amber-200 shadow-xs animate-pulse" />
              <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-purple-200 shadow-xs animate-ping" />
            </div>
          </div>
        )}

        {/* 3. AUTHENTIC HAND WITH KAWAII LEGAMI BEAR PEN */}
        {!isSettled && (
          <div
            key={`hand-pen-${replayKey}`}
            className="absolute top-1/2 left-1/2 pointer-events-none z-30 w-36 sm:w-48 md:w-56 h-auto will-change-transform"
            style={{
              animation: 'handWritingGlide 3.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards'
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
                  <div className="w-3 h-3 rounded-full bg-amber-300 animate-ping absolute -top-1.5 -left-1.5" />
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse absolute -top-3 -left-4" />
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-300 animate-ping absolute top-2 left-2" />
                  <div className="w-2 h-2 rounded-full bg-white shadow-xs absolute -top-1 left-2" />
                </div>
              </div>

              {/* The Hand & Legami Pen Image */}
              <img
                src="/hand-pen.png"
                alt="Mano escribiendo con bolígrafo kawaii"
                className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
