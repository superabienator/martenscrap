import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Calendar,
  MapPin,
  Gift,
  X,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { EDITORIAL_FEATURES, type EditorialFeature, getPromoBadgeClasses } from '../data/promotionsData';
import type { MainDepartment, FandomCategory, SubCategory } from '../types';
import { TRANSLATIONS, type Language } from '../i18n/translations';

interface FeaturedPromotionsDeckProps {
  onSelectDepartment: (dept: MainDepartment, sub?: SubCategory) => void;
  onSelectFandom: (fandom: FandomCategory) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenBoxBuilder: () => void;
  language?: Language;
  compactPadding?: boolean;
  promotions?: EditorialFeature[];
}

export const FeaturedPromotionsDeck: React.FC<FeaturedPromotionsDeckProps> = ({
  onSelectDepartment,
  onSelectFandom,
  onNavigateSection,
  onOpenBoxBuilder,
  language = 'es',
  compactPadding = false,
  promotions
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['es'];
  const featuresList = promotions || EDITORIAL_FEATURES;

  // Active card index in the fanning deck (0..3)
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  // Image index per card
  const [cardImageIndex, setCardImageIndex] = useState<Record<string, number>>({});
  // Optional modal for full editorial entry reading
  const [activeModalFeature, setActiveModalFeature] = useState<EditorialFeature | null>(null);
  // User motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  // Mobile touch scrolling reference
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // AUTO-PLAY SLIDESHOW: Transición automática en CADA una de las tarjetas a ritmo sereno
  useEffect(() => {
    if (prefersReducedMotion) return;

    const timeoutIds: number[] = [];
    const intervalIds: number[] = [];

    // Cada tarjeta cicla sus fotos con un ligero desfase orgánico (1.2s entre cada una)
    featuresList.forEach((feature, idx) => {
      if (feature.images.length <= 1) return;

      const staggerStartMs = 600 + idx * 1200;
      const cycleIntervalMs = 4600; // Ritmo tranquilo y no apresurado

      const toId = window.setTimeout(() => {
        const intId = window.setInterval(() => {
          setCardImageIndex(prev => {
            const currentImg = prev[feature.id] || 0;
            const nextImg = (currentImg + 1) % feature.images.length;
            return {
              ...prev,
              [feature.id]: nextImg
            };
          });
        }, cycleIntervalMs);
        intervalIds.push(intId);
      }, staggerStartMs);

      timeoutIds.push(toId);
    });

    return () => {
      timeoutIds.forEach(id => window.clearTimeout(id));
      intervalIds.forEach(id => window.clearInterval(id));
    };
  }, [prefersReducedMotion]);

  // Keyboard navigation for deck: ArrowLeft / ArrowRight (Sin sonido)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % EDITORIAL_FEATURES.length;
      setActiveCardIndex(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + EDITORIAL_FEATURES.length) % EDITORIAL_FEATURES.length;
      setActiveCardIndex(prev);
    }
  };

  // Controles manuales de avance / retroceso de fotos por tarjeta (Sin sonido)
  const handlePrevImage = (e: React.MouseEvent, featureId: string, totalImages: number) => {
    e.stopPropagation();
    setCardImageIndex(prev => {
      const current = prev[featureId] || 0;
      return {
        ...prev,
        [featureId]: (current - 1 + totalImages) % totalImages
      };
    });
  };

  const handleNextImage = (e: React.MouseEvent, featureId: string, totalImages: number) => {
    e.stopPropagation();
    setCardImageIndex(prev => {
      const current = prev[featureId] || 0;
      return {
        ...prev,
        [featureId]: (current + 1) % totalImages
      };
    });
  };

  const handleSelectImageDot = (e: React.MouseEvent, featureId: string, imgIdx: number) => {
    e.stopPropagation();
    setCardImageIndex(prev => ({
      ...prev,
      [featureId]: imgIdx
    }));
  };

  // Dispatch Action for Event / Season / Mystery Box (Sin sonido)
  const handleCtaClick = (e: React.MouseEvent, item: EditorialFeature) => {
    e.stopPropagation();

    if (item.targetAction === 'box') {
      onOpenBoxBuilder();
      return;
    }

    if (item.targetAction === 'locator') {
      onNavigateSection('tiendas-fisicas');
      return;
    }

    if (item.targetFilter) {
      if (item.targetFilter.department) {
        onSelectDepartment(item.targetFilter.department, item.targetFilter.subCategory);
      } else if (item.targetFilter.fandom) {
        onSelectFandom(item.targetFilter.fandom);
      } else {
        onNavigateSection('catalogo');
      }
    } else {
      onNavigateSection('catalogo');
    }
  };

  // Base transformations calculation for desktop fanning deck
  const getCardTransform = (index: number) => {
    if (prefersReducedMotion) {
      return {
        transform: activeCardIndex === index ? 'scale(1.02)' : 'scale(1)',
        zIndex: activeCardIndex === index ? 30 : index + 1,
        opacity: 1
      };
    }

    // Inclinaciones armónicas de abanico natural sin desbordamiento
    const baseAngles = [-5.5, -1.8, 1.8, 5.5];
    const baseYOffsets = [10, 3, 3, 10];

    if (activeCardIndex === -1) {
      return {
        transform: `translate3d(0, ${baseYOffsets[index]}px, 0) rotate(${baseAngles[index]}deg)`,
        zIndex: index + 1,
        opacity: 1
      };
    }

    if (activeCardIndex === index) {
      // Carta activa: se endereza a 0deg, se eleva hacia arriba y escala hacia el frente
      return {
        transform: 'translate3d(0, -20px, 0) rotate(0deg) scale(1.055)',
        zIndex: 35,
        opacity: 1
      };
    }

    // Cartas no activas: sutil rotación exterior para ceder protagonismo
    if (index < activeCardIndex) {
      return {
        transform: `translate3d(-4px, ${baseYOffsets[index] + 4}px, 0) rotate(${baseAngles[index] - 1.5}deg) scale(0.96)`,
        zIndex: index + 1,
        opacity: 0.92
      };
    } else {
      return {
        transform: `translate3d(4px, ${baseYOffsets[index] + 4}px, 0) rotate(${baseAngles[index] + 1.5}deg) scale(0.96)`,
        zIndex: 10 - index,
        opacity: 0.92
      };
    }
  };

  return (
    <section 
      id="promociones-destacadas"
      aria-label="Eventos, novedades de temporada y colecciones del taller"
      className={compactPadding ? "relative py-4 lg:py-6 overflow-visible w-full" : "relative py-12 lg:py-16 overflow-visible w-full"}
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-purple-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 overflow-visible">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto space-y-2.5 ${compactPadding ? 'mb-6 lg:mb-8' : 'mb-10 lg:mb-14'}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-[#9333EA] text-xs font-bold border border-purple-200/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.featuredDeckBadge}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1917] tracking-tight leading-[1.12]">
            {t.featuredDeckTitle} <span className="text-iridescent">{t.featuredDeckHighlight}</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            {t.featuredDeckSubtitle}
          </p>

          <p className="text-xs font-semibold text-purple-700/80 flex items-center justify-center gap-1.5 pt-1">
            <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            <span>{t.cardDeckHint}</span>
          </p>
        </div>

        {/* DESKTOP FANNING DECK CONTAINER: Adaptable a cualquier resolución sin cortes laterales */}
        <div 
          className="hidden md:flex justify-center items-center py-6 min-h-[530px] select-none perspective-[1200px] overflow-x-auto xl:overflow-visible scrollbar-none w-full px-4 lg:px-6"
          onMouseLeave={() => setActiveCardIndex(0)}
        >
          <div className="flex items-center justify-center -space-x-2 md:space-x-1 lg:space-x-2 xl:space-x-3.5 2xl:space-x-5 px-4 overflow-visible max-w-full mx-auto">
            {featuresList.map((item, index) => {
              const currentImgIdx = cardImageIndex[item.id] || 0;
              const transformStyles = getCardTransform(index);
              const isActive = activeCardIndex === index;

              return (
                <div
                  key={item.id}
                  role="group"
                  tabIndex={0}
                  aria-roledescription="card"
                  aria-label={`Novedad ${index + 1} de 4: ${item.title}. ${item.subtitle}`}
                  onMouseEnter={() => {
                    if (activeCardIndex !== index) {
                      setActiveCardIndex(index);
                    }
                  }}
                  onFocus={() => {
                    setActiveCardIndex(index);
                  }}
                  onClick={() => {
                    setActiveCardIndex(index);
                    setActiveModalFeature(item);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalFeature(item);
                    } else {
                      handleKeyDown(e, index);
                    }
                  }}
                  style={{
                    ...transformStyles,
                    transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease, opacity 0.3s ease'
                  }}
                  className={`living-border group relative shrink-0 w-[205px] md:w-[220px] lg:w-[245px] xl:w-[270px] 2xl:w-[285px] h-[450px] md:h-[470px] lg:h-[495px] xl:h-[515px] rounded-3xl overflow-hidden cursor-pointer bg-white border border-[#E7E2D9] focus:outline-none focus:ring-4 focus:ring-purple-400/40 ${
                    isActive 
                      ? 'shadow-[0_28px_60px_-12px_rgba(147,51,234,0.32),0_10px_25px_rgba(0,0,0,0.1)]' 
                      : 'shadow-[0_10px_26px_rgba(0,0,0,0.07)]'
                  }`}
                >
                  {/* CARD IMAGE CONTAINER (73% surface with Ken Burns Crossfade) */}
                  <div className="relative w-full h-[73%] overflow-hidden bg-stone-900">
                    {/* Dynamic Auto-Advance Images */}
                    {item.images.map((imgObj, imgIdx) => {
                      const isImageActive = imgIdx === currentImgIdx;
                      return (
                        <img
                          key={imgObj.url}
                          src={imgObj.url}
                          alt={`${item.title} - ${imgObj.caption}`}
                          width={400}
                          height={500}
                          {...(index === 0 && imgIdx === 0 ? { fetchPriority: 'high', loading: 'eager' } : { loading: 'lazy', decoding: 'async' })}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                            isImageActive
                              ? 'opacity-100 scale-105'
                              : 'opacity-0 scale-100 pointer-events-none'
                          }`}
                        />
                      );
                    })}

                    {/* Gradient Overlay for Top Badges */}
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Badges & Category Header */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black tracking-wide uppercase shadow-md ${getPromoBadgeClasses(item.badgeStyle)}`}>
                        {item.badgeText}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-stone-800 font-bold text-[10px] shadow-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#9333EA]" />
                        <span>{item.dateLabel.split('•')[0]}</span>
                      </span>
                    </div>

                    {/* Image Progress Dashes (Clickable) */}
                    {item.images.length > 1 && (
                      <div className="absolute top-13 left-4 right-4 flex items-center gap-1.5 z-20 py-1.5">
                        {item.images.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={(e) => handleSelectImageDot(e, item.id, dotIdx)}
                            aria-label={`Ver foto ${dotIdx + 1} de ${item.images.length}`}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer flex-1 ${
                              dotIdx === currentImgIdx
                                ? 'bg-white shadow-md ring-1 ring-black/20'
                                : 'bg-white/45 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Manual Navigation Chevrons: Visible on hover or active */}
                    {item.images.length > 1 && (
                      <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <button
                          onClick={(e) => handlePrevImage(e, item.id, item.images.length)}
                          aria-label="Foto anterior"
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/55 hover:bg-black/85 text-white backdrop-blur-md transition-all active:scale-90 hover:scale-110 z-20 cursor-pointer shadow-lg"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleNextImage(e, item.id, item.images.length)}
                          aria-label="Foto siguiente"
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/55 hover:bg-black/85 text-white backdrop-blur-md transition-all active:scale-90 hover:scale-110 z-20 cursor-pointer shadow-lg"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Bottom Vignette */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-950 via-stone-950/75 to-transparent pointer-events-none" />

                    {/* Text on Image */}
                    <div className="absolute inset-x-4 bottom-3 z-10 text-white space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[9px] font-black uppercase tracking-wider text-amber-300">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-stone-300 truncate">
                          {item.images[currentImgIdx]?.caption}
                        </span>
                      </div>
                      <h3 className="font-display font-black text-lg lg:text-xl text-white leading-tight drop-shadow-sm line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-300 leading-snug line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM EDITORIAL FOOTER (Story summary + Encompassed items + Action) */}
                  <div className="h-[27%] px-4 py-3 flex flex-col justify-between bg-white text-stone-900 border-t border-stone-100">
                    {/* Story Preview & Included Items count */}
                    <div className="space-y-1.5">
                      <p className="text-[11px] text-stone-600 leading-relaxed line-clamp-2">
                        {item.story}
                      </p>

                      <div className="flex items-center gap-1.5 text-[10px] text-purple-700 font-bold overflow-hidden whitespace-nowrap">
                        <span className="px-1.5 py-0.5 rounded-md bg-purple-50 border border-purple-200">
                          {item.itemCountLabel}
                        </span>
                        <span className="text-stone-400">•</span>
                        <span className="text-stone-500 truncate">
                          {item.includedItemsSummary[0]} & más
                        </span>
                      </div>
                    </div>

                    {/* CTA Action (Full Width Button) */}
                    <div className="pt-2 border-t border-stone-100">
                      <button
                        onClick={(e) => handleCtaClick(e, item)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-[11px] font-extrabold shadow-sm hover:shadow-purple-500/25 transition-all transform active:scale-95 cursor-pointer"
                      >
                        {item.targetAction === 'box' && <Gift className="w-3.5 h-3.5 text-purple-300 shrink-0" />}
                        {item.targetAction === 'locator' && <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                        {item.targetAction === 'filter' && <Compass className="w-3.5 h-3.5 text-cyan-300 shrink-0" />}
                        <span className="truncate">{item.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE RESPONSIVE CAROUSEL STACK (Visible below md) */}
        <div className="md:hidden space-y-4">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-2 px-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
          >
            {featuresList.map((item, index) => {
              const currentImgIdx = cardImageIndex[item.id] || 0;
              const isActive = activeCardIndex === index;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveCardIndex(index);
                    setActiveModalFeature(item);
                  }}
                  className={`living-border snap-center shrink-0 w-[84vw] max-w-[320px] h-[500px] rounded-3xl overflow-hidden bg-white border border-[#E7E2D9] shadow-lg transition-all cursor-pointer ${
                    isActive ? 'ring-2 ring-[#9333EA]' : 'opacity-95'
                  }`}
                >
                  {/* Card Image Container */}
                  <div className="relative w-full h-[72%] overflow-hidden bg-stone-900">
                    {item.images.map((imgObj, imgIdx) => (
                      <img
                        key={imgObj.url}
                        src={imgObj.url}
                        alt={`${item.title} - ${imgObj.caption}`}
                        width={400}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                          imgIdx === currentImgIdx ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}

                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

                    {/* Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-md ${getPromoBadgeClasses(item.badgeStyle)}`}>
                        {item.badgeText}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white text-stone-800 font-bold text-[10px] shadow-sm">
                        {item.dateLabel.split('•')[0]}
                      </span>
                    </div>

                    {/* Indicators */}
                    {item.images.length > 1 && (
                      <div className="absolute top-12 left-4 right-4 flex items-center gap-1.5 z-20 py-1">
                        {item.images.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={(e) => handleSelectImageDot(e, item.id, dotIdx)}
                            className={`h-1.5 rounded-full transition-all flex-1 ${
                              dotIdx === currentImgIdx ? 'bg-white shadow' : 'bg-white/45'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Arrows */}
                    {item.images.length > 1 && (
                      <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-20">
                        <button
                          onClick={(e) => handlePrevImage(e, item.id, item.images.length)}
                          aria-label="Anterior"
                          className="p-2 rounded-full bg-black/55 text-white pointer-events-auto active:scale-90 shadow-md"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleNextImage(e, item.id, item.images.length)}
                          aria-label="Siguiente"
                          className="p-2 rounded-full bg-black/55 text-white pointer-events-auto active:scale-90 shadow-md"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-stone-950 via-stone-950/75 to-transparent pointer-events-none" />

                    <div className="absolute inset-x-4 bottom-3 z-10 text-white space-y-1">
                      <span className="px-2 py-0.5 rounded bg-white/20 text-[9px] font-black uppercase text-amber-300">
                        {item.category}
                      </span>
                      <h3 className="font-display font-black text-base text-white leading-snug line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-stone-300 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Mobile */}
                  <div className="h-[28%] px-4 py-3 flex flex-col justify-between bg-white border-t border-stone-100">
                    <p className="text-[11px] text-stone-600 line-clamp-2">
                      {item.story}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-100">
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded-md">
                        {item.itemCountLabel}
                      </span>

                      <button
                        onClick={(e) => handleCtaClick(e, item)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1C1917] text-white text-xs font-bold active:scale-95 shadow-md"
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Dot Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {EDITORIAL_FEATURES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCardIndex(idx);
                  if (scrollContainerRef.current) {
                    const cardWidth = scrollContainerRef.current.clientWidth * 0.85;
                    scrollContainerRef.current.scrollTo({
                      left: idx * cardWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
                aria-label={`Ir a novedad ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeCardIndex === idx
                    ? 'w-6 bg-[#9333EA]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* MODAL CRÓNICA EDITORIAL DE TALLER */}
      {activeModalFeature && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-feature-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveModalFeature(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="living-border bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative"
          >
            <button
              onClick={() => setActiveModalFeature(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              aria-label="Cerrar crónica"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase shadow-xs ${getPromoBadgeClasses(activeModalFeature.badgeStyle)}`}>
                {activeModalFeature.badgeText}
              </span>
              <h3 id="modal-feature-title" className="font-display text-2xl sm:text-3xl font-black text-stone-900">
                {activeModalFeature.title}
              </h3>
              <p className="text-sm font-medium text-stone-500">
                {activeModalFeature.dateLabel} • Por Marta Pastor Escribano
              </p>
            </div>

            {/* Gallery Strip */}
            <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden">
              {activeModalFeature.images.map((img, i) => (
                <div key={i} className="aspect-square bg-stone-100 relative group overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm text-stone-700 leading-relaxed font-normal border-t border-stone-100 pt-4">
              <p>{activeModalFeature.story}</p>
              <p className="text-xs text-stone-500 italic">
                Cada pieza se fabrica y revisa a mano en nuestro taller de Valencia, garantizando que el diseño y el tacto sean exactamente los concebidos por la autora.
              </p>
            </div>

            {/* Included Items Section */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Artículos englobados en este especial:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalFeature.includedItemsSummary.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
              <button
                onClick={() => setActiveModalFeature(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
              <button
                onClick={(e) => {
                  handleCtaClick(e, activeModalFeature);
                  setActiveModalFeature(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>{activeModalFeature.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
