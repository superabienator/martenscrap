import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomBoxBuilder } from './components/CustomBoxBuilder';
import { ProductModal } from './components/ProductModal';
import { StoreLocator } from './components/StoreLocator';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection, DEFAULT_FAQS, type FAQItem } from './components/FAQSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AuthModal, type UserProfile } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import { Asset3DStudioModal } from './components/Asset3DStudioModal';
import { LegalModal, type LegalTabType } from './components/LegalModal';
import { ArtisanWorkshopModal } from './components/ArtisanWorkshopModal';
import { SandFogCanvas } from './components/SandFogCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/mockData';
import { EDITORIAL_FEATURES, type EditorialFeature } from './data/promotionsData';
import type { Product, CartItem, MainDepartment, FandomCategory, SubCategory } from './types';
import { TRANSLATIONS, type Language } from './i18n/translations';
import { toggleSound } from './utils/audio';

export const App: React.FC = () => {
  // Multilingual & User Auth states
  const [language, setLanguage] = useState<Language>('es');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Navigation & Category states
  const [selectedDepartment, setSelectedDepartment] = useState<MainDepartment>('TODOS');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>('TODOS');
  const [selectedFandom, setSelectedFandom] = useState<FandomCategory>('TODOS');

  // Theme & Audio states
  const [currentTheme, setCurrentTheme] = useState<'light' | 'candlelight'>('light');
  const [soundActive, setSoundActive] = useState<boolean>(true);

  // 3D Texture & Model Simulator states
  const [customTextureUrl, setCustomTextureUrl] = useState<string | null>(null);
  const [simulatedModelType, setSimulatedModelType] = useState<'bookmark' | 'standee' | 'clicker' | 'dragon' | null>(null);

  // Modals & Drawers states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBoxBuilderOpen, setIsBoxBuilderOpen] = useState(false);
  const [is3DStudioOpen, setIs3DStudioOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTabType>('aviso');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Dynamic Artisan Products & Promotions Managed from Workshop
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('martens_custom_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return PRODUCTS;
  });

  const [promotionsList, setPromotionsList] = useState<EditorialFeature[]>(() => {
    try {
      const saved = localStorage.getItem('martens_custom_promotions');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return EDITORIAL_FEATURES;
  });

  const [announcementText, setAnnouncementText] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('martens_announcement_text');
      if (saved) return saved;
    } catch {
      // Fallback
    }
    return '✨ ¡Envíos gratis en pedidos superiores a 45 € a toda la Península!';
  });

  const [faqsList, setFaqsList] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem('martens_custom_faqs');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_FAQS;
  });

  const [whatsAppNumber, setWhatsAppNumber] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('martens_whatsapp_number');
      if (saved) return saved;
    } catch {
      // Fallback
    }
    return '34600000000';
  });

  // Sync Workshop Data to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('martens_custom_products', JSON.stringify(productsList));
    } catch {}
  }, [productsList]);

  useEffect(() => {
    try {
      localStorage.setItem('martens_custom_promotions', JSON.stringify(promotionsList));
    } catch {}
  }, [promotionsList]);

  useEffect(() => {
    try {
      localStorage.setItem('martens_announcement_text', announcementText);
    } catch {}
  }, [announcementText]);

  useEffect(() => {
    try {
      localStorage.setItem('martens_custom_faqs', JSON.stringify(faqsList));
    } catch {}
  }, [faqsList]);

  useEffect(() => {
    try {
      localStorage.setItem('martens_whatsapp_number', whatsAppNumber);
    } catch {}
  }, [whatsAppNumber]);

  // Private URL Routing (/#taller, /#admin, ?modo=taller)
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        hash.includes('taller') || 
        hash.includes('admin') || 
        search.includes('taller') || 
        search.includes('admin')
      ) {
        setIsWorkshopOpen(true);
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);

  // Secret Artisan Keyboard Shortcut: Ctrl + Shift + M or Alt + T
  useEffect(() => {
    const handleSecretKey = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'M' || e.key === 'm')) ||
        (e.altKey && (e.key === 't' || e.key === 'T'))
      ) {
        e.preventDefault();
        setIsWorkshopOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleSecretKey);
    return () => window.removeEventListener('keydown', handleSecretKey);
  }, []);

  const handleCloseWorkshop = () => {
    setIsWorkshopOpen(false);
    if (window.location.hash.toLowerCase().includes('taller') || window.location.hash.toLowerCase().includes('admin')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  // E-commerce items & Wishlist states with LocalStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('martens_cart_items');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [
      {
        product: PRODUCTS[0], // Dragón 3D
        quantity: 1,
        selectedVariation: 'Seda Esmeralda & Oro'
      },
      {
        product: PRODUCTS[3], // Bolígrafo Legami
        quantity: 2,
        selectedVariation: 'Panda (Tinta Negra)'
      }
    ];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('martens_wishlist_ids');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return ['prod-3d-1', 'prod-bm-1'];
  });

  // Sync to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('martens_cart_items', JSON.stringify(cartItems));
    } catch {
      // Ignore quota error
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('martens_wishlist_ids', JSON.stringify(wishlistIds));
    } catch {
      // Ignore quota error
    }
  }, [wishlistIds]);

  const t = TRANSLATIONS[language] || TRANSLATIONS['es'];

  // Map wishlist IDs to full Product instances
  const wishlistProducts = useMemo(() => {
    return productsList.filter(p => wishlistIds.includes(p.id));
  }, [wishlistIds, productsList]);

  // Handle Ctrl+K shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Theme switch effect
  const handleToggleTheme = () => {
    const next = currentTheme === 'light' ? 'candlelight' : 'light';
    setCurrentTheme(next);
    if (next === 'candlelight') {
      document.documentElement.setAttribute('data-theme', 'candlelight');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const handleToggleSound = () => {
    const updated = toggleSound();
    setSoundActive(updated);
  };

  // Cart operations
  const handleAddToCart = (product: Product, customText?: string, variation?: string, quantity: number = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === product.id && i.selectedVariation === variation && i.customText === customText
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, quantity, selectedVariation: variation, customText }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    setCartItems(prev => {
      const copy = [...prev];
      copy[index].quantity = quantity;
      return copy;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev =>
      prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]
    );
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds(prev => prev.filter(id => id !== productId));
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDepartmentSelection = (dept: MainDepartment, sub?: SubCategory) => {
    setSelectedDepartment(dept);
    setSelectedSubCategory(sub || 'TODOS');
    scrollToSection('catalogo');
  };

  const handleApplyCustomTexture = (url: string, type: 'bookmark' | 'standee' | 'clicker' | 'dragon') => {
    setCustomTextureUrl(url);
    setSimulatedModelType(type);
    scrollToSection('inicio');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative">
      
      {/* 1. Sand Fog Ethereal Canvas Background */}
      <SandFogCanvas currentTheme={currentTheme} />

      {/* 2. Custom Magnetic Creative Cursor */}
      <CustomCursor />

      {/* 3. Navigation Mega Header */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        onOpen3DStudio={() => setIs3DStudioOpen(true)}
        announcementText={announcementText}
        onSelectDepartment={handleDepartmentSelection}
        onSelectFandom={(f) => { setSelectedFandom(f); scrollToSection('catalogo'); }}
        onNavigateSection={scrollToSection}
        currentTheme={currentTheme}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundActive}
        onToggleSound={handleToggleSound}
        language={language}
        onSelectLanguage={setLanguage}
      />

      {/* 4. Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section: Logo Intro -> Baraja Desplegable -> 3D WebGL Lab */}
        <Hero
          onExplore={() => scrollToSection('catalogo')}
          onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
          onOpenStudio={() => setIs3DStudioOpen(true)}
          currentTheme={currentTheme}
          customTextureUrl={customTextureUrl}
          externalModelType={simulatedModelType}
          language={language}
          onSelectDepartment={handleDepartmentSelection}
          onSelectFandom={(f) => { setSelectedFandom(f); scrollToSection('catalogo'); }}
          onNavigateSection={scrollToSection}
          promotions={promotionsList}
        />

        {/* Complete Catalog: 3D Print, Legami, Bookmarks, Stationery, Textile, Mugs, Outlet */}
        <ProductCatalog
          products={productsList}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={handleDepartmentSelection}
          selectedSubCategory={selectedSubCategory}
          onSelectSubCategory={setSelectedSubCategory}
          selectedFandom={selectedFandom}
          onSelectFandom={setSelectedFandom}
          onQuickView={(p) => setActiveModalProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          language={language}
        />

        {/* Physical Stores Locator */}
        <StoreLocator />

        {/* About Marta Pastor Escribano & Workshop */}
        <AboutSection />

        {/* Interactive Workshop FAQ Accordion */}
        <FAQSection language={language} faqs={faqsList} />

        {/* Contact & Custom Event Orders */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onSelectFandom={(f) => { setSelectedFandom(f); scrollToSection('catalogo'); }}
        onSelectComplement={(c) => { handleDepartmentSelection('COMPLEMENTOS', c as any); }}
        onOpenLegal={(tab) => {
          setLegalTab(tab);
          setIsLegalOpen(true);
        }}
      />

      {/* Floating Discrete WhatsApp Contact Button */}
      <WhatsAppFloatingButton phoneNumber={whatsAppNumber} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onClearWishlist={handleClearWishlist}
        onAddToCart={(p) => {
          handleAddToCart(p);
          handleRemoveFromWishlist(p.id);
        }}
        onExplore={() => {
          setIsWishlistOpen(false);
          scrollToSection('catalogo');
        }}
        title={t.wishlistTitle}
        emptyText={t.wishlistEmpty}
        emptySubText={t.wishlistEmptySub}
        moveToCartText={t.moveToCart}
        clearText={t.clearWishlist}
      />

      {/* Customer Login & Account Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
        }}
        onLogout={() => {
          setCurrentUser(null);
          setIsAuthOpen(false);
        }}
        onOpenLegal={(tab) => {
          setIsAuthOpen(false);
          setLegalTab(tab);
          setIsLegalOpen(true);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={productsList}
        onSelectProduct={(p) => setActiveModalProduct(p)}
      />

      {/* Custom Box Builder / Mystery Box Modal */}
      {isBoxBuilderOpen && (
        <CustomBoxBuilder
          products={productsList}
          onAddToCart={(boxProd, note) => handleAddToCart(boxProd, note)}
          onClose={() => setIsBoxBuilderOpen(false)}
        />
      )}

      {/* Artisan Workshop Manager Modal (El Taller de Marta - Acceso Privado /#taller) */}
      <ArtisanWorkshopModal
        isOpen={isWorkshopOpen}
        onClose={handleCloseWorkshop}
        products={productsList}
        onSaveProducts={setProductsList}
        promotions={promotionsList}
        onSavePromotions={setPromotionsList}
        announcementText={announcementText}
        onSaveAnnouncementText={setAnnouncementText}
        faqs={faqsList}
        onSaveFaqs={setFaqsList}
        whatsAppNumber={whatsAppNumber}
        onSaveWhatsAppNumber={setWhatsAppNumber}
      />

      {/* Product Detail / Quick View Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={activeModalProduct ? wishlistIds.includes(activeModalProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* 3D Asset Studio / Upload Workflow Modal */}
      <Asset3DStudioModal
        isOpen={is3DStudioOpen}
        onClose={() => setIs3DStudioOpen(false)}
        onApplyCustomTexture={handleApplyCustomTexture}
      />

      {/* Legal & Compliance Modal (RGPD & LSSI-CE) */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialTab={legalTab}
      />

    </div>
  );
};

export default App;
