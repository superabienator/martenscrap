import React, { useEffect, useRef } from 'react';

interface SandFogCanvasProps {
  currentTheme?: 'light' | 'candlelight';
}

interface GrainParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  baseOpacity: number;
  pulseSpeed: number;
  angle: number;
}

interface FogCloud {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

export const SandFogCanvas: React.FC<SandFogCanvasProps> = ({ currentTheme = 'light' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Martenscrap Multicolor Palette
    // Violeta Púrpura, Dorado Ámbar, Rosa Magenta, Turquesa Menta, Coral
    const brandColors = [
      '168, 85, 247',  // Purple #A855F7
      '245, 158, 11',  // Amber #F59E0B
      '236, 72, 153',  // Pink #EC4899
      '20, 184, 166',  // Teal #14B8A6
      '249, 115, 22'   // Coral #F97316
    ];

    // Responsive particle count: lightweight on mobile to ensure solid 60 FPS
    const isMobile = width < 768;
    const grainCount = isMobile ? 32 : 110;
    const grains: GrainParticle[] = [];

    for (let i = 0; i < grainCount; i++) {
      grains.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isMobile ? 1.8 : 2.2) + 1.0,
        speedX: (Math.random() * 0.45 - 0.15),
        speedY: (Math.random() * 0.35 - 0.15),
        color: brandColors[i % brandColors.length],
        baseOpacity: Math.random() * 0.4 + 0.3,
        pulseSpeed: Math.random() * 0.035 + 0.01,
        angle: Math.random() * Math.PI * 2
      });
    }

    // Atmospheric ambient clouds (reduced on mobile for zero GPU lag)
    const cloudCount = isMobile ? 4 : 12;
    const clouds: FogCloud[] = [];

    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isMobile ? 60 : 90) + (isMobile ? 35 : 50),
        speedX: (Math.random() * 0.25 - 0.08),
        speedY: (Math.random() * 0.2 - 0.1),
        color: brandColors[i % brandColors.length],
        opacity: Math.random() * 0.03 + 0.01
      });
    }

    // Respect prefers-reduced-motion [A11Y-04]
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle Page Visibility API to save battery & GPU [UX-03]
    let isVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let animationFrameId: number;

    const render = () => {
      if (!ctx || !canvas || !isVisible) return;
      ctx.clearRect(0, 0, width, height);

      const isCandle = currentTheme === 'candlelight';

      // 1. Draw soft colored nebula fog layer
      for (let i = 0; i < clouds.length; i++) {
        const c = clouds[i];
        if (!prefersReducedMotion) {
          c.x += c.speedX;
          c.y += c.speedY;

          if (c.x > width + c.size) c.x = -c.size;
          if (c.x < -c.size) c.x = width + c.size;
          if (c.y > height + c.size) c.y = -c.size;
          if (c.y < -c.size) c.y = height + c.size;
        }

        const activeColor = isCandle ? '245, 158, 11' : c.color;
        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.size);
        grad.addColorStop(0, `rgba(${activeColor}, ${c.opacity * 1.5})`);
        grad.addColorStop(0.5, `rgba(${activeColor}, ${c.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(${activeColor}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw crisp multicolor stardust / sand grains with shimmer
      for (let i = 0; i < grains.length; i++) {
        const g = grains[i];
        if (!prefersReducedMotion) {
          g.x += g.speedX;
          g.y += g.speedY;
          g.angle += g.pulseSpeed;

          if (g.x > width + 5) g.x = -5;
          if (g.x < -5) g.x = width + 5;
          if (g.y > height + 5) g.y = -5;
          if (g.y < -5) g.y = height + 5;
        }

        // Twinkling sparkle opacity
        const shimmer = prefersReducedMotion ? 0 : Math.sin(g.angle);
        const currentOpacity = Math.max(0.2, Math.min(0.9, g.baseOpacity + shimmer * 0.25));

        const activeColor = isCandle ? (i % 2 === 0 ? '245, 158, 11' : '236, 72, 153') : g.color;

        ctx.fillStyle = `rgba(${activeColor}, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra specular glint on brighter grains
        if (shimmer > 0.75) {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8})`;
          ctx.beginPath();
          ctx.arc(g.x, g.y, g.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-700"
    />
  );
};
