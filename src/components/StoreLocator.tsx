import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PHYSICAL_STORES } from '../data/mockData';
import { 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  Navigation, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  RotateCw 
} from 'lucide-react';

export const StoreLocator: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('TODAS');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const dragStartXRef = useRef<number | null>(null);
  const dragDeltaRef = useRef<number>(0);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const provinces = ['TODAS', 'Valencia', 'Pontevedra', 'Tarragona', 'Málaga', 'Santa Cruz de Tenerife'];

  const filteredStores = PHYSICAL_STORES.filter(store => {
    if (selectedProvince === 'TODAS') return true;
    return store.province === selectedProvince;
  });

  // Reset active index when province changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedProvince]);

  const handleCopy = async (address: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  const goToNext = useCallback(() => {
    if (filteredStores.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % filteredStores.length);
  }, [filteredStores.length]);

  const goToPrev = useCallback(() => {
    if (filteredStores.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + filteredStores.length) % filteredStores.length);
  }, [filteredStores.length]);

  // Autoplay loop (smooth auto-scroll cylinder)
  useEffect(() => {
    if (!isAutoPlaying || isDragging || filteredStores.length <= 1) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      goToNext();
    }, 3400);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, isDragging, filteredStores.length, goToNext]);

  // Drag handlers (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartXRef.current = e.clientX;
    dragDeltaRef.current = 0;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartXRef.current === null) return;
    const delta = e.clientX - dragStartXRef.current;
    dragDeltaRef.current = delta;
    setDragOffset(delta);
  };

  const handleMouseEnd = () => {
    if (!isDragging) return;
    const delta = dragDeltaRef.current;
    if (delta > 45) {
      goToPrev();
    } else if (delta < -45) {
      goToNext();
    }
    dragStartXRef.current = null;
    dragDeltaRef.current = 0;
    setIsDragging(false);
    setDragOffset(0);
  };

  // Drag handlers (Touch)
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartXRef.current = e.touches[0].clientX;
    dragDeltaRef.current = 0;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || dragStartXRef.current === null) return;
    const delta = e.touches[0].clientX - dragStartXRef.current;
    dragDeltaRef.current = delta;
    setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const delta = dragDeltaRef.current;
    if (delta > 40) {
      goToPrev();
    } else if (delta < -40) {
      goToNext();
    }
    dragStartXRef.current = null;
    dragDeltaRef.current = 0;
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section 
      id="tiendas-fisicas" 
      className="py-12 sm:py-16 border-t border-stone-200/80 bg-white/60 overflow-hidden w-full max-w-full"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            Presencia Física
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight leading-snug sm:leading-tight pb-1">
            ¿Dónde puedes encontrar <span className="text-iridescent">nuestros productos</span>?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
            Colaboramos con librerías de autor y espacios selectos. Gira el cilindro para descubrir cada punto de venta en persona.
          </p>
        </div>

        {/* Province Filter Pills */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
          {provinces.map((prov) => (
            <button
              key={prov}
              onClick={() => setSelectedProvince(prov)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedProvince === prov
                  ? 'bg-[#1C1917] text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>

        {/* 3D Cylindrical Carousel Arena */}
        <div className="relative w-full py-4 sm:py-6 overflow-hidden">
          
          {/* Edge Gradient Fades for Cylindrical Immersion */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-stone-50/90 via-stone-50/40 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-stone-50/90 via-stone-50/40 to-transparent z-20" />

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            aria-label="Tienda anterior"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-stone-900 shadow-xl border border-stone-200 transition-all hover:scale-110 active:scale-95 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            aria-label="Siguiente tienda"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-stone-900 shadow-xl border border-stone-200 transition-all hover:scale-110 active:scale-95 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cylindrical Stage */}
          <div 
            className="relative h-[320px] sm:h-[300px] max-w-4xl mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
            style={{ perspective: '1100px' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseEnd}
            onMouseLeave={handleMouseEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {filteredStores.map((store, index) => {
              // Calculate circular offset relative to activeIndex
              const count = filteredStores.length;
              let diff = index - activeIndex;
              while (diff > count / 2) diff -= count;
              while (diff < -count / 2) diff += count;

              // Only render stores within visible cylindrical horizon
              const isVisible = Math.abs(diff) <= 2;
              if (!isVisible && count > 4) return null;

              // Cylindrical 3D transform metrics
              const isActive = diff === 0;
              const cardSpacing = 280; // horizontal separation
              const translateX = diff * cardSpacing + (isDragging ? dragOffset * 0.6 : 0);
              const rotateY = diff * -18; // cylindrical curve angle
              const scale = isActive ? 1 : Math.max(0.85, 1 - Math.abs(diff) * 0.1);
              const zIndex = 20 - Math.abs(diff) * 5;
              const opacity = isActive ? 1 : Math.max(0.35, 1 - Math.abs(diff) * 0.35);

              return (
                <div
                  key={store.id}
                  onClick={() => !isActive && setActiveIndex(index)}
                  className={`absolute w-[86vw] max-w-[340px] sm:max-w-[380px] p-5 sm:p-6 rounded-3xl bg-white border shadow-lg transition-transform duration-300 ease-out select-none ${
                    isActive 
                      ? 'border-[#9333EA]/30 ring-2 ring-purple-100 shadow-2xl cursor-default' 
                      : 'border-stone-200/90 cursor-pointer hover:border-stone-300'
                  }`}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${isActive ? 0 : -60}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#9333EA] text-[11px] font-bold">
                      {store.province}
                    </span>
                    {store.isMall && (
                      <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md truncate max-w-[150px]">
                        {store.mallName}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 group-hover:text-[#9333EA] transition-colors leading-snug line-clamp-1">
                    {store.name}
                  </h3>

                  <div className="text-xs text-stone-600 mt-2 leading-relaxed flex items-start gap-2 min-h-[44px]">
                    <Navigation className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">
                      {store.address}<br />
                      <span className="text-stone-400 font-medium">{store.postalCode} • {store.city}</span>
                    </span>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => handleCopy(`${store.address}, ${store.postalCode} ${store.city}`, store.id, e)}
                      className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-[11px] font-semibold text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedId === store.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>

                    <a
                      href={store.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-[#9333EA] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <span>Cómo llegar</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Interactive Controls & Dots Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-xl mx-auto mt-2 pt-2 px-4">
            
            {/* 3-in-1 Instructions Pill */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 bg-stone-100/90 px-3 py-1 rounded-full">
              <RotateCw className={`w-3 h-3 text-[#9333EA] ${isAutoPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span>Gira arrastrando, usa las flechas o déjalo autodesplazarse</span>
            </div>

            {/* Pagination Dots + Autoplay Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {filteredStores.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Ver tienda ${i + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === activeIndex 
                        ? 'w-6 bg-[#9333EA]' 
                        : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIsAutoPlaying(prev => !prev)}
                aria-label={isAutoPlaying ? 'Pausar giro automático' : 'Activar giro automático'}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors ml-2 cursor-pointer"
                title={isAutoPlaying ? 'Pausar autogiro' : 'Reanudar autogiro'}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
