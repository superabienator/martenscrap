import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Coordinates stored in refs for 120Hz/60Hz zero-latency updates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const cursorTextRef = useRef<string | null>(null);

  useEffect(() => {
    // Detect touch device or prefers-reduced-motion [A11Y-04]
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isCoarse || isReducedMotion) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      mousePos.current.x = clientX;
      mousePos.current.y = clientY;

      if (!isVisible) setIsVisible(true);

      // Center dot follows pointer with 0ms delay
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [role="button"], label, .interactive-hover');
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');

      const nextHover = !!(interactive || cursorAttr);
      const nextText = cursorAttr || null;

      if (nextHover !== isHoveredRef.current || nextText !== cursorTextRef.current) {
        // If entering an interactive element, instantly snap ring position to cursor
        // so the purple circle never appears lagging outside the button!
        if (nextHover && !isHoveredRef.current) {
          ringPos.current.x = clientX;
          ringPos.current.y = clientY;
          if (ringRef.current) {
            ringRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
          }
        }

        isHoveredRef.current = nextHover;
        cursorTextRef.current = nextText;
        setIsHovered(nextHover);
        setCursorText(nextText);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth tracking loop
    let animId: number;
    const updateLoop = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // When hovered on button, track extra tightly (0.65) so it stays centered
      // When normal, smooth follow (0.45)
      const lerp = isHoveredRef.current ? 0.65 : 0.45;
      ringPos.current.x += (targetX - ringPos.current.x) * lerp;
      ringPos.current.y += (targetY - ringPos.current.y) * lerp;

      if (ringRef.current) {
        // translate container to exact coordinates, inner element centers itself with -translate-x-1/2 -translate-y-1/2
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(updateLoop);
    };
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Precision Core Dot (Zero latency, perfectly centered) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)` }}
      >
        <div className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9333EA] shadow-[0_0_8px_rgba(147,51,234,0.8)]" />
      </div>

      {/* Trailing Responsive Ring (Centers strictly on pointer, snaps smoothly onto button) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{ transform: `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)` }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out flex items-center justify-center font-black uppercase tracking-wider ${
            cursorText
              ? 'px-3.5 py-1.5 bg-[#1C1917]/95 text-white backdrop-blur-md shadow-xl border border-purple-400/60 text-[10px] scale-100'
              : isHovered
              ? 'w-10 h-10 border-2 border-[#9333EA] bg-purple-500/20 scale-100 shadow-[0_0_20px_rgba(147,51,234,0.35)]'
              : 'w-6 h-6 border border-stone-400/60 bg-stone-500/5 scale-100'
          }`}
        >
          {cursorText}
        </div>
      </div>
    </>
  );
};
