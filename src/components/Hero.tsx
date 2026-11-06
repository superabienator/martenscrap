import React from 'react';
import { Sparkles, ArrowRight, Gift, ShieldCheck, Truck, Box } from 'lucide-react';
import { Viewer3D } from './Viewer3D';
import { BrandIntroAnimation } from './BrandIntroAnimation';
import { FeaturedPromotionsDeck } from './FeaturedPromotionsDeck';
import { TRANSLATIONS, type Language } from '../i18n/translations';
import type { MainDepartment, FandomCategory, SubCategory } from '../types';
import type { EditorialFeature } from '../data/promotionsData';

interface HeroProps {
  onExplore: () => void;
  onOpenBoxBuilder: () => void;
  onOpenStudio: () => void;
  currentTheme: 'light' | 'candlelight';
  customTextureUrl?: string | null;
  externalModelType?: 'bookmark' | 'standee' | 'clicker' | 'dragon' | null;
  language?: Language;
  onSelectDepartment: (dept: MainDepartment, sub?: SubCategory) => void;
  onSelectFandom: (fandom: FandomCategory) => void;
  onNavigateSection: (sectionId: string) => void;
  promotions?: EditorialFeature[];
}

export const Hero: React.FC<HeroProps> = ({ 
  onExplore, 
  onOpenBoxBuilder, 
  onOpenStudio,
  currentTheme,
  customTextureUrl,
  externalModelType,
  language = 'es',
  onSelectDepartment,
  onSelectFandom,
  onNavigateSection,
  promotions
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['es'];

  return (
    <section className="relative overflow-visible pt-6 pb-16 lg:pt-8 lg:pb-20">
      {/* Background ambient decorative blurs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none -z-10 animate-float" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none -z-10 animate-float-delayed" />

      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8 overflow-visible">
        
        {/* 1. Prominent Brand Signature Intro Animation & Permanent Centered Floating Logo */}
        <BrandIntroAnimation />

        {/* 2. BARAJA DESPLEGABLE JUSTO DESPUÉS DEL TÍTULO Y LOGOTIPO MARTENSCRAP */}
        <div className="my-2 sm:my-4 w-full overflow-visible">
          <FeaturedPromotionsDeck
            onSelectDepartment={onSelectDepartment}
            onSelectFandom={onSelectFandom}
            onNavigateSection={onNavigateSection}
            onOpenBoxBuilder={onOpenBoxBuilder}
            language={language}
            compactPadding={true}
            promotions={promotions}
          />
        </div>

        {/* 3. Laboratorio 3D WebGL y Propuesta de Valor Editorial */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-10 lg:mt-14 pt-8 border-t border-stone-200/60">
          
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-stone-200/80 shadow-xs backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-[#9333EA]" />
              <span className="text-xs font-bold tracking-wide uppercase text-stone-700">
                {t.heroPill}
              </span>
            </div>

            {/* H1 SEO ESTRATÉGICO CON IRIDISCENCIA VIVA */}
            <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-black text-[#1C1917] tracking-tight leading-[1.08]">
              {t.heroTitle1}{' '}
              <span className="text-iridescent">
                {t.heroTitleHighlight}
              </span>
            </h1>

            {/* Subtítulo enfocado en conversión */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal max-w-xl">
              {t.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExplore}
                className="px-7 py-3.5 rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white font-extrabold text-sm shadow-xl hover:shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group cursor-pointer"
              >
                {t.exploreCatalog}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenBoxBuilder}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-[#9333EA] font-extrabold text-sm border-2 border-[#9333EA]/30 hover:border-[#9333EA] shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#9333EA]" />
                {t.customBoxBtn}
              </button>

              <button
                onClick={onOpenStudio}
                className="px-5 py-3.5 rounded-2xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 font-extrabold text-xs border border-cyan-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Box className="w-4 h-4 text-cyan-600" />
                {t.workflow3D}
              </button>
            </div>

            {/* Social Proof & Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-100 text-[#9333EA]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 leading-none">{t.uniqueBadge}</p>
                  <span className="text-[11px] text-stone-500">{t.uniqueDesc}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 leading-none">{t.magnetBadge}</p>
                  <span className="text-[11px] text-stone-500">{t.magnetDesc}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 leading-none">{t.fastShippingBadge}</p>
                  <span className="text-[11px] text-stone-500">{t.fastShippingDesc}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive WebGL Playground */}
          <div className="lg:col-span-6 relative">
            <Viewer3D 
              currentTheme={currentTheme} 
              customTextureUrl={customTextureUrl}
              externalModelType={externalModelType}
              onOpenStudio={onOpenStudio}
              language={language}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
