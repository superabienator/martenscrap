import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Flame, 
  Sun, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  MapPin, 
  Gift, 
  Heart,
  Box,
  Tag,
  User,
  Globe
} from 'lucide-react';
import { MAIN_DEPARTMENTS, FANDOM_CATEGORIES, SUB_CATEGORIES } from '../data/mockData';
import type { MainDepartment, FandomCategory, SubCategory } from '../types';
import { TRANSLATIONS, type Language } from '../i18n/translations';
import type { UserProfile } from './AuthModal';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  currentUser: UserProfile | null;
  onOpenSearch: () => void;
  onOpenBoxBuilder: () => void;
  onOpen3DStudio: () => void;
  onSelectDepartment: (dept: MainDepartment, sub?: SubCategory) => void;
  onSelectFandom: (fandom: FandomCategory) => void;
  onNavigateSection: (sectionId: string) => void;
  currentTheme: 'light' | 'candlelight';
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  announcementText?: string;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'es', label: 'Castellano', flag: '🇪🇸' },
  { code: 'ca', label: 'Valencià / Català', flag: '🏴' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  currentUser,
  onOpenSearch,
  onOpenBoxBuilder,
  onOpen3DStudio,
  onSelectDepartment,
  onSelectFandom,
  onNavigateSection,
  currentTheme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  language,
  onSelectLanguage,
  announcementText
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS['es'];

  const handleDeptClick = (dept: MainDepartment, sub?: SubCategory) => {
    onSelectDepartment(dept, sub);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigateSection('catalogo');
  };

  const handleFandomClick = (fandom: FandomCategory) => {
    onSelectFandom(fandom);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigateSection('catalogo');
  };

  const currentLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-300">
      
      {/* Top Banner Notice */}
      <div className="bg-[#1C1917] text-[#FAF8F5] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#9333EA] text-white font-bold text-[10px]">
              <Sparkles className="w-3 h-3" /> {t.handcrafted}
            </span>
            <span className="text-stone-300 hidden sm:inline">
              {announcementText || `${t.topNotice} • ${t.freeShippingBanner}`}
            </span>
            <span className="text-stone-300 sm:hidden">
              {announcementText || t.freeShippingBanner}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium text-stone-300 shrink-0">
            {/* 3D Workflow trigger */}
            <button
              onClick={onOpen3DStudio}
              className="text-purple-300 hover:text-white flex items-center gap-1 font-bold transition-colors cursor-pointer"
              aria-label={t.workflow3D}
            >
              <Box className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">{t.workflow3D}</span>
              <span className="sm:hidden">3D</span>
            </button>

            {/* Tiendas físicas */}
            <button
              onClick={() => onNavigateSection('tiendas-fisicas')}
              className="hover:text-white flex items-center gap-1 transition-colors hidden md:flex cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>{t.storesLink}</span>
            </button>

            <div className="h-3 w-px bg-stone-700 hidden sm:block" />

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                aria-expanded={isLangOpen}
                aria-haspopup="true"
                aria-label={`Seleccionar idioma, idioma actual ${currentLangObj.label}`}
              >
                <Globe className="w-3 h-3 text-purple-400" />
                <span>{currentLangObj.flag}</span>
                <span className="uppercase text-[11px] font-bold">{currentLangObj.code}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div 
                  className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-stone-900 border border-stone-700 shadow-2xl p-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                >
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      role="menuitem"
                      onClick={() => {
                        onSelectLanguage(item.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                        language === item.code
                          ? 'bg-[#9333EA] text-white font-bold'
                          : 'text-stone-200 hover:bg-stone-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      <span className="text-[10px] uppercase opacity-75">{item.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <nav className="glass-panel border-b border-[#E7E5E4] px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => onNavigateSection('inicio')}
              className="flex items-center text-left group cursor-pointer mr-2 sm:mr-4"
              aria-label="Martenscrap Inicio"
            >
              <img
                src="/logo-original.png"
                alt="Martenscrap"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onNavigateSection('inicio')}
              className="px-3 py-2 text-xs font-bold text-[#1C1917] hover:text-[#9333EA] rounded-xl hover:bg-white/60 transition-all cursor-pointer"
            >
              {t.home}
            </button>

            {/* IMPRESIÓN 3D Dropdown */}
            <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => handleDeptClick('IMPRESIÓN 3D')}
                onMouseEnter={() => setActiveDropdown('3d')}
                className="px-3 py-2 text-xs font-bold text-cyan-800 bg-cyan-50/80 hover:bg-cyan-100 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
              >
                <Box className="w-3.5 h-3.5 text-cyan-600" />
                {t.print3D}
                <span className="px-1.5 py-0.2 rounded-md bg-cyan-600 text-white text-[9px]">{t.newBadge}</span>
              </button>

              {activeDropdown === '3d' && (
                <div 
                  onMouseEnter={() => setActiveDropdown('3d')}
                  className="absolute top-full left-0 w-64 rounded-2xl bg-white shadow-2xl border border-stone-200/80 p-2 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
                    Colección 3D Print
                  </div>
                  {SUB_CATEGORIES['IMPRESIÓN 3D'].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleDeptClick('IMPRESIÓN 3D', sub)}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-700 hover:text-cyan-700 hover:bg-cyan-50 rounded-xl transition-colors cursor-pointer"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* LEGAMI Dropdown */}
            <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => handleDeptClick('LEGAMI')}
                onMouseEnter={() => setActiveDropdown('legami')}
                className="px-3 py-2 text-xs font-bold text-rose-800 bg-rose-50/80 hover:bg-rose-100 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
              >
                {t.legami}
                <ChevronDown className="w-3 h-3 text-rose-400" />
              </button>

              {activeDropdown === 'legami' && (
                <div 
                  onMouseEnter={() => setActiveDropdown('legami')}
                  className="absolute top-full left-0 w-64 rounded-2xl bg-white shadow-2xl border border-stone-200/80 p-2 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 px-3 py-1">
                    Kawaii & Bolis Borrables
                  </div>
                  {SUB_CATEGORIES['LEGAMI'].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleDeptClick('LEGAMI', sub)}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-700 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MARCAPÁGINAS */}
            <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => handleDeptClick('MARCAPÁGINAS')}
                onMouseEnter={() => setActiveDropdown('marcapaginas')}
                className="px-3 py-2 text-xs font-bold text-[#1C1917] hover:text-[#9333EA] rounded-xl hover:bg-white/60 transition-all flex items-center gap-1 cursor-pointer"
              >
                {t.bookmarks}
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {activeDropdown === 'marcapaginas' && (
                <div 
                  onMouseEnter={() => setActiveDropdown('marcapaginas')}
                  className="absolute top-full left-0 w-64 rounded-2xl bg-white shadow-2xl border border-stone-200/80 p-2 py-3 z-50"
                >
                  {SUB_CATEGORIES['MARCAPÁGINAS'].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleDeptClick('MARCAPÁGINAS', sub)}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-700 hover:text-[#9333EA] hover:bg-purple-50 rounded-xl transition-colors cursor-pointer"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PAPELERÍA & TEXTIL */}
            <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => handleDeptClick('PAPELERÍA')}
                onMouseEnter={() => setActiveDropdown('papeleria')}
                className="px-3 py-2 text-xs font-bold text-[#1C1917] hover:text-[#9333EA] rounded-xl hover:bg-white/60 transition-all flex items-center gap-1 cursor-pointer"
              >
                {t.stationery}
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {activeDropdown === 'papeleria' && (
                <div 
                  onMouseEnter={() => setActiveDropdown('papeleria')}
                  className="absolute top-full left-0 w-72 rounded-2xl bg-white shadow-2xl border border-stone-200/80 p-3 z-50 grid grid-cols-2 gap-2"
                >
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Papelería</span>
                    {SUB_CATEGORIES['PAPELERÍA'].slice(0, 5).map(sub => (
                      <button
                        key={sub}
                        onClick={() => handleDeptClick('PAPELERÍA', sub)}
                        className="w-full text-left py-1 text-xs text-stone-700 hover:text-[#9333EA] block"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Textil & Tazas</span>
                    {SUB_CATEGORIES['TEXTIL'].slice(1).map(sub => (
                      <button
                        key={sub}
                        onClick={() => handleDeptClick('TEXTIL', sub)}
                        className="w-full text-left py-1 text-xs text-stone-700 hover:text-[#9333EA] block"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FANDOMS */}
            <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => handleFandomClick('TODOS')}
                onMouseEnter={() => setActiveDropdown('fandoms')}
                className="px-3 py-2 text-xs font-bold text-[#1C1917] hover:text-[#9333EA] rounded-xl hover:bg-white/60 transition-all flex items-center gap-1 cursor-pointer"
              >
                {t.fandoms}
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {activeDropdown === 'fandoms' && (
                <div 
                  onMouseEnter={() => setActiveDropdown('fandoms')}
                  className="absolute top-full left-0 w-60 rounded-2xl bg-white shadow-2xl border border-stone-200/80 p-2 py-3 z-50"
                >
                  {FANDOM_CATEGORIES.map((fandom) => (
                    <button
                      key={fandom}
                      onClick={() => handleFandomClick(fandom)}
                      className="w-full text-left px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-[#9333EA] hover:bg-purple-50 rounded-xl transition-colors cursor-pointer"
                    >
                      {fandom}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* OUTLET */}
            <button
              onClick={() => handleDeptClick('OUTLET')}
              className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
            >
              <Tag className="w-3 h-3" />
              {t.outlet}
            </button>

            {/* Mystery Box Builder Feature */}
            <button
              onClick={onOpenBoxBuilder}
              className="px-3.5 py-2 text-xs font-bold text-[#9333EA] bg-purple-100/70 hover:bg-purple-200/80 rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ml-1"
            >
              <Gift className="w-3.5 h-3.5" />
              {t.buildBox}
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-2xl bg-white/70 hover:bg-white text-stone-700 border border-stone-200/60 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={t.searchPlaceholder}
              title={`${t.searchPlaceholder} (Ctrl+K)`}
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* User Account / Auth Modal Trigger (Desktop & Tablet) */}
            <button
              onClick={onOpenAuth}
              className={`p-2 sm:p-2.5 rounded-2xl border transition-all cursor-pointer hidden md:flex items-center gap-1.5 ${
                currentUser
                  ? 'bg-purple-50 text-[#9333EA] border-purple-200 font-bold text-xs'
                  : 'bg-white/70 hover:bg-white text-stone-700 border border-stone-200/60 shadow-xs'
              }`}
              aria-label={currentUser ? `Cuenta de ${currentUser.name}` : t.myAccount}
              title={currentUser ? `Conectado como ${currentUser.name}` : t.myAccount}
            >
              <User className="w-4 h-4" />
              {currentUser && (
                <span className="text-xs font-bold max-w-[80px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Wishlist Button - Interactive & opens Drawer */}
            <button
              onClick={onOpenWishlist}
              className={`p-2 sm:p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                wishlistCount > 0
                  ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100 shadow-xs'
                  : 'bg-white/70 hover:bg-white text-stone-400 border border-stone-200/60'
              }`}
              aria-label={`${t.wishlist} (${wishlistCount})`}
              title={`${t.wishlist} (${wishlistCount})`}
            >
              <Heart className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${wishlistCount > 0 ? 'fill-current text-red-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="text-xs font-bold text-red-600">{wishlistCount}</span>
              )}
            </button>

            {/* Audio Toggle (Desktop) */}
            <button
              onClick={onToggleSound}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer hidden sm:flex ${
                soundEnabled
                  ? 'bg-purple-50 text-[#9333EA] border-purple-200'
                  : 'bg-white/70 text-stone-400 border-stone-200/60'
              }`}
              aria-label={soundEnabled ? 'Sonido táctil activado' : 'Sonido silenciado'}
              title={soundEnabled ? 'Sonido táctil activado' : 'Sonido silenciado'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Candlelight / Light Mode (Desktop) */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-2xl bg-white/70 hover:bg-white text-stone-700 border border-stone-200/60 shadow-xs transition-all hover:scale-105 cursor-pointer hidden sm:flex"
              aria-label={currentTheme === 'candlelight' ? 'Modo Día' : 'Modo Lectura a la Luz de las Velas'}
              title={currentTheme === 'candlelight' ? 'Modo Día' : 'Modo Lectura a la Luz de las Velas'}
            >
              {currentTheme === 'candlelight' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Flame className="w-4 h-4 text-amber-600" />
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#1C1917] text-white hover:bg-[#9333EA] transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer ml-1"
              aria-label={`${t.cart} (${cartCount})`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-bold text-xs sm:text-sm">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Enhanced Touch-Friendly Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-stone-200/80 space-y-4 max-h-[80vh] overflow-y-auto pb-6 pr-1 animate-in fade-in slide-in-from-top-4 duration-200">
            
            {/* User Account Tile */}
            <div 
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="p-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 border border-stone-200 flex items-center justify-between cursor-pointer active:scale-98 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-[#9333EA] flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-black text-stone-900 block">
                    {currentUser ? currentUser.name : t.myAccount}
                  </span>
                  <span className="text-xs text-stone-500">
                    {currentUser ? currentUser.email : 'Inicia sesión para ver tus pedidos y favoritos'}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-stone-400 -rotate-90" />
            </div>

            {/* Core Feature Tiles (Big touch buttons) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => { onOpenBoxBuilder(); setMobileMenuOpen(false); }}
                className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-left flex items-center gap-3 active:scale-98 transition-all cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-black text-purple-900 block leading-tight">
                    {t.buildBox}
                  </span>
                  <span className="text-[11px] text-purple-700">Caja personalizada con lacre</span>
                </div>
              </button>

              <button
                onClick={() => { onOpen3DStudio(); setMobileMenuOpen(false); }}
                className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-left flex items-center gap-3 active:scale-98 transition-all cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-700 text-white flex items-center justify-center shrink-0">
                  <Box className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-black text-cyan-900 block leading-tight">
                    {t.workflow3D}
                  </span>
                  <span className="text-[11px] text-cyan-700">Visor y personalizador 3D</span>
                </div>
              </button>

              <button
                onClick={() => { onNavigateSection('tiendas-fisicas'); setMobileMenuOpen(false); }}
                className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-left flex items-center gap-3 active:scale-98 transition-all cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-black text-amber-900 block leading-tight">
                    {t.storesLink}
                  </span>
                  <span className="text-[11px] text-amber-700">Puntos de venta oficiales</span>
                </div>
              </button>
            </div>

            {/* Department Navigation List (Clear, readable and touch-friendly) */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-black uppercase tracking-wider text-stone-400 block px-1">
                Explorar Catálogo
              </span>
              <div className="grid grid-cols-2 gap-2">
                {MAIN_DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => handleDeptClick(dept)}
                    className="p-3 rounded-2xl bg-white border border-stone-200 text-left hover:border-purple-300 transition-all flex items-center justify-between shadow-xs active:scale-98 cursor-pointer"
                  >
                    <span className="text-xs font-bold text-stone-800">
                      {dept === 'IMPRESIÓN 3D' && '🐉 '}
                      {dept === 'LEGAMI' && '🌸 '}
                      {dept === 'MARCAPÁGINAS' && '🧲 '}
                      {dept === 'PAPELERÍA' && '📖 '}
                      {dept === 'COMPLEMENTOS' && '👜 '}
                      {dept === 'OUTLET' && '🏷️ '}
                      {dept}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400 -rotate-90" />
                  </button>
                ))}
              </div>
            </div>

            {/* Fandoms Grid */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-black uppercase tracking-wider text-stone-400 block px-1">
                Tus Fandoms Favoritos
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FANDOM_CATEGORIES.map((fandom) => (
                  <button
                    key={fandom}
                    onClick={() => handleFandomClick(fandom)}
                    className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-700 hover:text-purple-600 hover:border-purple-200 transition-all active:scale-95 cursor-pointer shadow-2xs"
                  >
                    {fandom}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Settings Row: Theme, Sound & Language */}
            <div className="pt-3 border-t border-stone-200 grid grid-cols-3 gap-2">
              <button
                onClick={onToggleTheme}
                className="p-2.5 rounded-xl bg-white border border-stone-200 flex flex-col items-center justify-center gap-1 text-center active:scale-95 transition-all"
              >
                {currentTheme === 'candlelight' ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Flame className="w-4 h-4 text-amber-600" />
                )}
                <span className="text-[10px] font-bold text-stone-700">
                  {currentTheme === 'candlelight' ? 'Modo Día' : 'Modo Velas'}
                </span>
              </button>

              <button
                onClick={onToggleSound}
                className="p-2.5 rounded-xl bg-white border border-stone-200 flex flex-col items-center justify-center gap-1 text-center active:scale-95 transition-all"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-[#9333EA]" />
                ) : (
                  <VolumeX className="w-4 h-4 text-stone-400" />
                )}
                <span className="text-[10px] font-bold text-stone-700">
                  {soundEnabled ? 'Sonido On' : 'Sonido Off'}
                </span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="w-full h-full p-2.5 rounded-xl bg-white border border-stone-200 flex flex-col items-center justify-center gap-1 text-center active:scale-95 transition-all"
                >
                  <span className="text-base leading-none">{currentLangObj.flag}</span>
                  <span className="text-[10px] font-bold text-stone-700 uppercase">
                    {currentLangObj.code}
                  </span>
                </button>
              </div>
            </div>

            {/* Language Selection List if open in mobile */}
            {isLangOpen && (
              <div className="grid grid-cols-2 gap-2 p-2 bg-stone-100 rounded-2xl border border-stone-200">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      onSelectLanguage(item.code);
                      setIsLangOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      language === item.code
                        ? 'bg-[#9333EA] text-white shadow-xs'
                        : 'bg-white text-stone-800 border border-stone-200'
                    }`}
                  >
                    <span>{item.flag}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}

          </div>
        )}
      </nav>
    </header>
  );
};
