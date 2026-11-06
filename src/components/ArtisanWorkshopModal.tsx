import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Upload, 
  Package, 
  Layers, 
  Megaphone, 
  Save, 
  Download, 
  Eye, 
  CheckCircle2, 
  Smile,
  Lock,
  KeyRound,
  ShieldAlert,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import type { Product, MainDepartment, SubCategory, FandomCategory } from '../types';
import { MAIN_DEPARTMENTS, SUB_CATEGORIES, FANDOM_CATEGORIES } from '../data/mockData';
import { 
  type EditorialFeature, 
  PROMO_COLOR_PRESETS, 
  getPromoBadgeClasses,
  type PromoBadgeStyle
} from '../data/promotionsData';
import type { FAQItem } from './FAQSection';
import { playPopSound, playMagneticSnapSound } from '../utils/audio';

interface ArtisanWorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSaveProducts: (updated: Product[]) => void;
  promotions: EditorialFeature[];
  onSavePromotions: (updated: EditorialFeature[]) => void;
  announcementText: string;
  onSaveAnnouncementText: (text: string) => void;
  faqs: FAQItem[];
  onSaveFaqs: (updated: FAQItem[]) => void;
  whatsAppNumber: string;
  onSaveWhatsAppNumber: (phone: string) => void;
}

export const ArtisanWorkshopModal: React.FC<ArtisanWorkshopModalProps> = ({
  isOpen,
  onClose,
  products,
  onSaveProducts,
  promotions,
  onSavePromotions,
  announcementText,
  onSaveAnnouncementText,
  faqs,
  onSaveFaqs,
  whatsAppNumber,
  onSaveWhatsAppNumber
}) => {
  // Authentication & PIN Lock State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('martens_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);

  // Workshop PIN (default 2026, customizable by artisan)
  const [masterPin, setMasterPin] = useState<string>(() => {
    try {
      return localStorage.getItem('martens_workshop_pin') || '2026';
    } catch {
      return '2026';
    }
  });

  // Navigation tabs in simple human language
  const [activeTab, setActiveTab] = useState<'articulos' | 'novedades' | 'avisos' | 'faqs' | 'seguridad'>('articulos');

  // Products Management State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [variationInput, setVariationInput] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Promotions Management State (Fanning Deck with multi-image carousel)
  const [selectedPromoIndex, setSelectedPromoIndex] = useState<number>(0);
  const [editingPromo, setEditingPromo] = useState<EditorialFeature | null>(null);

  // FAQs State
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isCreatingFaq, setIsCreatingFaq] = useState(false);

  // Announcement & WhatsApp State
  const [currentNotice, setCurrentNotice] = useState(announcementText);
  const [currentPhone, setCurrentPhone] = useState(whatsAppNumber);

  // File upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const promoImageInputRef = useRef<HTMLInputElement>(null);
  const [targetImageSlotIndex, setTargetImageSlotIndex] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setPinInput('');
      setPinError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    playPopSound();
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  // --- PIN AUTHENTICATION ---
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === masterPin) {
      playMagneticSnapSound();
      setIsAuthenticated(true);
      setPinError(false);
      if (rememberDevice) {
        try {
          localStorage.setItem('martens_admin_auth', 'true');
        } catch {}
      }
    } else {
      setPinError(true);
      setPinInput('');
      playPopSound();
    }
  };

  const handleLogoutAdmin = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('martens_admin_auth');
    } catch {}
    onClose();
  };

  // --- PRODUCT MANAGEMENT ---
  const handleStartCreateProduct = () => {
    setIsCreatingNew(true);
    setVariationInput('');
    setEditingProduct({
      id: `prod-craft-${Date.now()}`,
      name: '',
      department: 'MARCAPÁGINAS',
      subCategory: 'Marcapáginas tradicionales',
      fandom: 'LITERARIO',
      price: 9.90,
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'Pieza confeccionada a mano con amor en el taller de Martenscrap.',
      features: ['100% hecho a mano en taller propio', 'Diseño de autor exclusivo'],
      variations: ['Brujita Calabaza', 'Vampiretta Elegante'],
      customizable: true,
      isNew: true,
      isBestseller: false,
      inStock: true,
      rating: 5.0,
      reviewsCount: 1,
      craftStatus: 'ready_to_ship',
      dimensions: 'Medida estándar',
      materials: 'Materiales seleccionados de primera calidad',
      careInstructions: 'Limpieza suave en seco con paño de microfibra.'
    });
  };

  const handleEditProduct = (prod: Product) => {
    setIsCreatingNew(false);
    setEditingProduct({ ...prod });
    setVariationInput('');
  };

  const handleToggleProductStock = (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p);
    onSaveProducts(updated);
    showNotification('Disponibilidad actualizada en tu tienda');
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`¿Seguro que deseas eliminar "${name}" de tu catálogo?`)) {
      const updated = products.filter(p => p.id !== id);
      onSaveProducts(updated);
      showNotification('Artículo eliminado con éxito');
    }
  };

  // Multi-image upload for products
  const handleProductImageUpload = (slotIndex: number) => {
    setTargetImageSlotIndex(slotIndex);
    fileInputRef.current?.click();
  };

  const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const newImages = [...(editingProduct.images || [])];
          newImages[targetImageSlotIndex] = result;
          setEditingProduct({ ...editingProduct, images: newImages });
          showNotification(`Foto ${targetImageSlotIndex + 1} cargada con éxito`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProductImageSlot = () => {
    if (!editingProduct) return;
    const currentImgs = editingProduct.images || [];
    if (currentImgs.length >= 20) {
      alert('Has alcanzado el límite máximo de 20 fotografías para este artículo.');
      return;
    }
    setEditingProduct({
      ...editingProduct,
      images: [...currentImgs, 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80']
    });
    showNotification(`Añadida casilla para foto ${currentImgs.length + 1}`);
  };

  const handleRemoveProductImageSlot = (idx: number) => {
    if (!editingProduct || !editingProduct.images || editingProduct.images.length <= 1) {
      alert('El producto debe tener al menos una foto principal.');
      return;
    }
    const updatedImgs = editingProduct.images.filter((_, i) => i !== idx);
    setEditingProduct({ ...editingProduct, images: updatedImgs });
  };

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;

    playMagneticSnapSound();
    let updated: Product[];

    if (isCreatingNew) {
      updated = [editingProduct as Product, ...products];
      showNotification(`¡"${editingProduct.name}" se ha publicado en tu tienda!`);
    } else {
      updated = products.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p);
      showNotification(`¡Cambios guardados en "${editingProduct.name}"!`);
    }

    onSaveProducts(updated);
    setEditingProduct(null);
    setIsCreatingNew(false);
  };

  // --- PROMOTIONS / FANNING DECK MANAGEMENT ---
  const currentPromo = editingPromo || promotions[selectedPromoIndex] || promotions[0];

  const handleSelectPromoToEdit = (idx: number) => {
    setSelectedPromoIndex(idx);
    setEditingPromo({ ...promotions[idx] });
  };

  // Multi-image upload for promotions / editorial deck
  const handlePromoImageUpload = (slotIndex: number) => {
    setTargetImageSlotIndex(slotIndex);
    promoImageInputRef.current?.click();
  };

  const handlePromoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentPromo) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const newImages = [...currentPromo.images];
          if (newImages[targetImageSlotIndex]) {
            newImages[targetImageSlotIndex] = {
              ...newImages[targetImageSlotIndex],
              url: result
            };
          } else {
            newImages.push({
              url: result,
              caption: 'Fotografía de detalle'
            });
          }
          setEditingPromo({ ...currentPromo, images: newImages });
          showNotification(`Foto ${targetImageSlotIndex + 1} de la novedad actualizada`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPromoImage = () => {
    if (currentPromo.images.length >= 3) {
      alert('Cada carta admite un micro-carrusel de hasta 3 fotografías dinámicas.');
      return;
    }
    const newImages = [
      ...currentPromo.images,
      {
        url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        caption: 'Nueva toma de la colección'
      }
    ];
    setEditingPromo({ ...currentPromo, images: newImages });
  };

  const handleRemovePromoImage = (idx: number) => {
    if (currentPromo.images.length <= 1) {
      alert('La carta debe tener al menos una imagen principal.');
      return;
    }
    const newImages = currentPromo.images.filter((_, i) => i !== idx);
    setEditingPromo({ ...currentPromo, images: newImages });
  };

  const handleSavePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromo) return;

    playMagneticSnapSound();
    const updated = [...promotions];
    updated[selectedPromoIndex] = editingPromo;
    onSavePromotions(updated);
    showNotification(`¡Novedad "${editingPromo.title}" actualizada en la baraja!`);
    setEditingPromo(null);
  };

  // --- FAQs ACTIONS ---
  const handleSaveFaqForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !editingFaq.question) return;

    let updated: FAQItem[];
    if (isCreatingFaq) {
      updated = [...faqs, { ...editingFaq, id: `faq-${Date.now()}` }];
      showNotification('Nueva pregunta frecuente añadida');
    } else {
      updated = faqs.map(f => f.id === editingFaq.id ? editingFaq : f);
      showNotification('Pregunta frecuente actualizada');
    }
    onSaveFaqs(updated);
    setEditingFaq(null);
    setIsCreatingFaq(false);
  };

  const handleDeleteFaq = (id: string) => {
    if (window.confirm('¿Deseas eliminar esta pregunta frecuente?')) {
      const updated = faqs.filter(f => f.id !== id);
      onSaveFaqs(updated);
      showNotification('Pregunta eliminada');
    }
  };

  // --- SETTINGS / ANNOUNCEMENT / WHATSAPP ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAnnouncementText(currentNotice);
    onSaveWhatsAppNumber(currentPhone);
    try {
      localStorage.setItem('martens_workshop_pin', masterPin);
    } catch {}
    showNotification('Avisos y datos del taller actualizados en la web');
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="workshop-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col bg-[#FAF8F5] rounded-3xl border border-stone-200 shadow-2xl overflow-hidden living-border">
        
        {/* IF NOT AUTHENTICATED: SHOW SECURE PIN LOCK SCREEN */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center max-w-md mx-auto space-y-6">
            <button
              onClick={onClose}
              aria-label="Cerrar ventana de acceso"
              className="absolute top-5 right-5 p-2 rounded-full bg-white text-stone-600 hover:text-stone-900 shadow-sm cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-lg">
              <KeyRound className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Zona Privada del Taller
              </span>
              <h3 id="workshop-title" className="font-display font-black text-2xl text-stone-900 pt-1">
                Acceso al Taller de Marta
              </h3>
              <p className="text-xs text-stone-600">
                Esta sección está protegida para que solo tú puedas editar los artículos, fotos y textos de tu tienda.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              <div className="space-y-1 text-left">
                <label className="block text-xs font-black text-stone-800">
                  Introduce tu PIN de administradora:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={8}
                    autoFocus
                    placeholder="PIN (por defecto: 2026)"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(false);
                    }}
                    className={`w-full px-4 py-3 rounded-2xl border text-center font-mono text-lg font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-[#9333EA] bg-white ${
                      pinError ? 'border-red-400 bg-red-50 text-red-700' : 'border-stone-300 text-stone-900'
                    }`}
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
                {pinError && (
                  <p className="text-[11px] text-red-600 font-bold flex items-center gap-1 pt-1">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>PIN incorrecto. (Si es la primera vez, introduce 2026).</span>
                  </p>
                )}
              </div>

              <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer text-left select-none">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded text-[#9333EA] focus:ring-purple-400 cursor-pointer"
                />
                <span>Recordar mi acceso en este equipo para no pedirme el PIN cada vez</span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-xs sm:text-sm font-black shadow-lg transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Desbloquear Mi Taller</span>
                <Check className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED: COMPLETE WORKSHOP CONTROL PANEL */
          <>
            {/* Top Header */}
            <div className="px-5 sm:px-8 py-3.5 bg-white border-b border-stone-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#9333EA] flex items-center justify-center shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 id="workshop-title" className="font-display font-black text-lg sm:text-xl text-stone-900">
                      El Taller de Marta
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Sesión Segura Activa
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Control total y sencillo de productos, cartas de novedades, fotos y preguntas frecuentes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogoutAdmin}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:text-red-600 hover:border-red-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cerrar Taller
                </button>
                <button
                  onClick={onClose}
                  aria-label="Cerrar panel de gestión"
                  className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Global Toast Success Message */}
            {successMessage && (
              <div className="absolute top-18 right-6 z-30 px-4 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Hidden File Inputs for Local Image Uploads */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleProductFileChange}
              className="hidden"
            />
            <input
              type="file"
              ref={promoImageInputRef}
              accept="image/*"
              onChange={handlePromoFileChange}
              className="hidden"
            />

            {/* Big Friendly Navigation Tabs */}
            <div className="px-5 sm:px-8 bg-stone-100/70 border-b border-stone-200 flex gap-2 sm:gap-4 shrink-0 overflow-x-auto">
              <button
                onClick={() => { setActiveTab('articulos'); setEditingProduct(null); }}
                className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'articulos'
                    ? 'border-[#9333EA] text-[#9333EA] bg-white rounded-t-xl shadow-xs'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>📦 Mis Artículos ({products.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('novedades'); setEditingPromo(null); }}
                className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'novedades'
                    ? 'border-[#9333EA] text-[#9333EA] bg-white rounded-t-xl shadow-xs'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>🃏 Novedades & Baraja (4)</span>
              </button>

              <button
                onClick={() => setActiveTab('faqs')}
                className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'faqs'
                    ? 'border-[#9333EA] text-[#9333EA] bg-white rounded-t-xl shadow-xs'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>❓ Preguntas Frecuentes ({faqs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('avisos')}
                className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'avisos'
                    ? 'border-[#9333EA] text-[#9333EA] bg-white rounded-t-xl shadow-xs'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Megaphone className="w-4 h-4" />
                <span>📢 Avisos & WhatsApp</span>
              </button>

              <button
                onClick={() => setActiveTab('seguridad')}
                className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'seguridad'
                    ? 'border-[#9333EA] text-[#9333EA] bg-white rounded-t-xl shadow-xs'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>🔐 PIN de Seguridad</span>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8">
              
              {/* TAB 1: MIS ARTÍCULOS (CON MÚLTIPLES FOTOS) */}
              {activeTab === 'articulos' && (
                <div>
                  {editingProduct ? (
                    /* FORMULARIO DE PRODUCTO CON MÚLTIPLES FOTOS Y VARIACIONES */
                    <form onSubmit={handleSaveProductForm} className="space-y-6">
                      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                        <div>
                          <h3 className="font-display font-black text-xl text-stone-900">
                            {isCreatingNew ? '✨ Añadir Nuevo Producto al Catálogo' : `✏️ Modificar: ${editingProduct.name}`}
                          </h3>
                          <p className="text-xs text-stone-500">
                            Puedes subir varias fotos, añadir modelos de personajes y detalles de confección.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="px-3.5 py-1.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 cursor-pointer"
                        >
                          Volver a la lista
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Campos de entrada (Izquierda) */}
                        <div className="lg:col-span-7 space-y-4">
                          
                          {/* Nombre */}
                          <div>
                            <label className="block text-xs font-black text-stone-800 mb-1">
                              1. ¿Cómo se llama esta creación? *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ej: Marcapáginas Mágico Princesa de Hielo"
                              value={editingProduct.name || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#9333EA] bg-white"
                            />
                          </div>

                          {/* Departamento y Categoría */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-black text-stone-800 mb-1">
                                2. Categoría Principal
                              </label>
                              <select
                                value={editingProduct.department || 'MARCAPÁGINAS'}
                                onChange={(e) => setEditingProduct({ 
                                  ...editingProduct, 
                                  department: e.target.value as MainDepartment,
                                  subCategory: (SUB_CATEGORIES[e.target.value as MainDepartment]?.[1] || 'TODOS') as SubCategory
                                })}
                                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#9333EA] bg-white"
                              >
                                {MAIN_DEPARTMENTS.filter(d => d !== 'TODOS').map(d => (
                                  <option key={d} value={d}>{d}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-black text-stone-800 mb-1">
                                Sub-tipo de pieza
                              </label>
                              <select
                                value={editingProduct.subCategory || 'TODOS'}
                                onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value as SubCategory })}
                                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#9333EA] bg-white"
                              >
                                {(SUB_CATEGORIES[editingProduct.department as MainDepartment] || ['TODOS']).map(sub => (
                                  <option key={sub} value={sub}>{sub}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Precio y Disponibilidad */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-black text-stone-800 mb-1">
                                3. Precio (€) *
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  step="0.05"
                                  min="0.50"
                                  required
                                  value={editingProduct.price ?? 9.90}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-300 text-sm font-black focus:outline-none focus:ring-2 focus:ring-[#9333EA] bg-white"
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">€</span>
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-black text-stone-800 mb-1">
                                4. ¿Cómo lo tienes en el taller?
                              </label>
                              <select
                                value={editingProduct.craftStatus || 'ready_to_ship'}
                                onChange={(e) => setEditingProduct({ ...editingProduct, craftStatus: e.target.value as 'ready_to_ship' | 'made_to_order' })}
                                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#9333EA] bg-white"
                              >
                                <option value="ready_to_ship">🟢 Listo para enviar (24-48h)</option>
                                <option value="made_to_order">🟣 Hecho a mano bajo pedido (2-4 días)</option>
                              </select>
                            </div>
                          </div>

                          {/* GESTIÓN DE MÚLTIPLES FOTOS DEL PRODUCTO */}
                          <div className="p-4 rounded-2xl bg-white border border-stone-200/90 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="block text-xs font-black text-stone-800">
                                  5. Fotografías del artículo ({(editingProduct.images || []).length} fotos añadidas)
                                </label>
                                <p className="text-[11px] text-stone-500">
                                  Sube tantas fotos como colores o modelos tenga la pieza (hasta 20 fotos). Cada foto se vinculará ordenadamente a las variaciones.
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={handleAddProductImageSlot}
                                className="px-3 py-1 rounded-xl bg-purple-50 text-[#9333EA] hover:bg-purple-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>+ Añadir otra foto</span>
                              </button>
                            </div>

                            <div className="space-y-2.5">
                              {(editingProduct.images || []).map((imgUrl, imgIdx) => (
                                <div key={imgIdx} className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/70 flex items-center gap-3">
                                  <img
                                    src={imgUrl}
                                    alt={`Foto ${imgIdx + 1}`}
                                    className="w-14 h-14 object-cover rounded-lg border border-stone-200 shrink-0"
                                  />

                                  <div className="flex-1 space-y-1 min-w-0">
                                    <span className="text-[10px] font-black uppercase text-purple-700 block">
                                      {imgIdx === 0
                                        ? 'Foto 1 (Principal de portada)'
                                        : `Foto ${imgIdx + 1}${
                                            editingProduct.variations && editingProduct.variations[imgIdx]
                                              ? ` • Asociada a: ${editingProduct.variations[imgIdx]}`
                                              : ' (Ángulo o variación adicional)'
                                          }`}
                                    </span>
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleProductImageUpload(imgIdx)}
                                        className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 hover:border-purple-300 text-[#9333EA] text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                                      >
                                        <Upload className="w-3 h-3" />
                                        <span>Subir foto</span>
                                      </button>
                                      <input
                                        type="url"
                                        placeholder="O URL de imagen..."
                                        value={imgUrl}
                                        onChange={(e) => {
                                          const copy = [...(editingProduct.images || [])];
                                          copy[imgIdx] = e.target.value;
                                          setEditingProduct({ ...editingProduct, images: copy });
                                        }}
                                        className="flex-1 px-2.5 py-1 rounded-lg border border-stone-200 text-xs bg-white"
                                      />
                                    </div>
                                  </div>

                                  {editingProduct.images && editingProduct.images.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveProductImageSlot(imgIdx)}
                                      className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-200 cursor-pointer"
                                      title="Quitar foto"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Modelos / Variaciones de Personajes */}
                          <div className="p-4 rounded-2xl bg-white border border-stone-200/90 space-y-2.5">
                            <label className="block text-xs font-black text-stone-800">
                              6. Variaciones / Personajes disponibles
                            </label>
                            <p className="text-[11px] text-stone-500">
                              Escribe opciones que el cliente pueda elegir (ej. Brujita Calabaza, Vampiretta, Panda, etc.).
                            </p>

                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Escribe un modelo y pulsa añadir..."
                                value={variationInput}
                                onChange={(e) => setVariationInput(e.target.value)}
                                className="flex-1 px-3 py-1.5 rounded-xl border border-stone-300 text-xs bg-stone-50"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (variationInput.trim()) {
                                    setEditingProduct({
                                      ...editingProduct,
                                      variations: [...(editingProduct.variations || []), variationInput.trim()]
                                    });
                                    setVariationInput('');
                                  }
                                }}
                                className="px-3.5 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-[#9333EA] cursor-pointer"
                              >
                                Añadir
                              </button>
                            </div>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {(editingProduct.variations || []).map((v, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-50 text-[#9333EA] text-xs font-bold border border-purple-200 flex items-center gap-1.5">
                                  <span>{v}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingProduct({
                                        ...editingProduct,
                                        variations: (editingProduct.variations || []).filter((_, idx) => idx !== i)
                                      });
                                    }}
                                    className="hover:text-red-500 cursor-pointer"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Personalizable & Bestseller Switches */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-white border border-stone-200">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={editingProduct.customizable ?? true}
                                onChange={(e) => setEditingProduct({ ...editingProduct, customizable: e.target.checked })}
                                className="w-4 h-4 rounded text-[#9333EA]"
                              />
                              <span className="text-xs font-bold text-stone-800">
                                ✍️ Admite personalización (nombre o dedicatoria)
                              </span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={editingProduct.isBestseller ?? false}
                                onChange={(e) => setEditingProduct({ ...editingProduct, isBestseller: e.target.checked })}
                                className="w-4 h-4 rounded text-[#9333EA]"
                              />
                              <span className="text-xs font-bold text-stone-800">
                                ⭐ Marcar como "Más Vendido"
                              </span>
                            </label>
                          </div>

                          {/* Descripción */}
                          <div>
                            <label className="block text-xs font-black text-stone-800 mb-1">
                              7. Descripción o historia de la pieza
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Cuenta los detalles, para quién está pensado o qué lo hace especial..."
                              value={editingProduct.description || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                              className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA] bg-white"
                            />
                          </div>

                          {/* Medidas y Materiales */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-stone-700 mb-1">
                                Dimensiones reales (ej: 14 x 4.5 cm)
                              </label>
                              <input
                                type="text"
                                placeholder="Ej: 14 x 4.5 cm"
                                value={editingProduct.dimensions || ''}
                                onChange={(e) => setEditingProduct({ ...editingProduct, dimensions: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-stone-700 mb-1">
                                Materiales (ej: PLA Seda / Papel 300g)
                              </label>
                              <input
                                type="text"
                                placeholder="Ej: PLA Seda vegetal / Papel 300g"
                                value={editingProduct.materials || ''}
                                onChange={(e) => setEditingProduct({ ...editingProduct, materials: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                              />
                            </div>
                          </div>

                          {/* Botón Guardar Gigante */}
                          <div className="pt-2">
                            <button
                              type="submit"
                              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
                            >
                              <Check className="w-5 h-5" />
                              <span>¡Guardar y Publicar en Mi Tienda!</span>
                            </button>
                          </div>

                        </div>

                        {/* Previsualización en Vivo (Derecha) */}
                        <div className="lg:col-span-5 space-y-3 sticky top-4">
                          <div className="flex items-center gap-1.5 text-xs font-black text-purple-900">
                            <Eye className="w-4 h-4 text-[#9333EA]" />
                            <span>Vista previa en directo (así se verá en tu web):</span>
                          </div>

                          <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-lg text-left space-y-3">
                            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 flex items-center justify-center border border-stone-100 relative">
                              <img
                                src={editingProduct.images?.[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'}
                                alt="Vista previa"
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                                {editingProduct.department || 'PAPELERÍA'}
                              </span>
                              {editingProduct.images && editingProduct.images.length > 1 && (
                                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                                  +{editingProduct.images.length - 1} fotos
                                </span>
                              )}
                            </div>

                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-display font-black text-base text-stone-900 line-clamp-2">
                                  {editingProduct.name || 'Nombre del producto'}
                                </h4>
                                <span className="text-base font-black text-[#9333EA] shrink-0">
                                  {(editingProduct.price || 0).toFixed(2)} €
                                </span>
                              </div>

                              <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                                {editingProduct.description || 'Breve descripción de la pieza...'}
                              </p>

                              {/* Variations preview tags */}
                              {editingProduct.variations && editingProduct.variations.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {editingProduct.variations.map((v, i) => (
                                    <span key={i} className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-md">
                                      {v}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                                {editingProduct.craftStatus === 'made_to_order' ? (
                                  <span className="text-purple-700 font-bold">🟣 Hecho a mano bajo pedido</span>
                                ) : (
                                  <span className="text-emerald-700 font-bold">🟢 Listo para enviar</span>
                                )}
                                <span className="text-stone-400">Taller Martenscrap</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </form>
                  ) : (
                    /* LISTA PRINCIPAL DE ARTÍCULOS */
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                        <div>
                          <h3 className="font-display font-black text-xl text-stone-900">
                            Catálogo de Artículos del Taller
                          </h3>
                          <p className="text-xs text-stone-500">
                            Activa o desactiva el stock con un clic o pulsa para editar fotos y precios.
                          </p>
                        </div>

                        <button
                          onClick={handleStartCreateProduct}
                          className="px-5 py-2.5 rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-xs sm:text-sm font-black shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                          <span>+ Crear Nuevo Artículo</span>
                        </button>
                      </div>

                      {/* Tarjetas Visuales de Productos */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {products.map((prod) => (
                          <div
                            key={prod.id}
                            className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-3 hover:border-purple-300 transition-all"
                          >
                            <div className="relative shrink-0">
                              <img
                                src={prod.images[0]}
                                alt={prod.name}
                                className="w-16 h-16 object-cover rounded-xl border border-stone-100"
                              />
                              {prod.images.length > 1 && (
                                <span className="absolute -bottom-1 -right-1 px-1 rounded-md bg-stone-900 text-white text-[9px] font-bold">
                                  {prod.images.length}📸
                                </span>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold uppercase text-purple-700 block truncate">
                                {prod.department}
                              </span>
                              <h4 className="text-xs font-bold text-stone-900 truncate">
                                {prod.name}
                              </h4>
                              <span className="text-xs font-black text-stone-900 block mt-0.5">
                                {prod.price.toFixed(2)} €
                              </span>

                              <button
                                type="button"
                                onClick={() => handleToggleProductStock(prod.id)}
                                className={`mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-black cursor-pointer transition-colors ${
                                  prod.inStock
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }`}
                              >
                                {prod.inStock ? '🟢 En Stock' : '🔴 Agotado'}
                              </button>
                            </div>

                            {/* Botones de Acción */}
                            <div className="flex flex-col gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleEditProduct(prod)}
                                title="Editar este artículo"
                                className="p-2 rounded-xl bg-stone-100 hover:bg-purple-100 hover:text-[#9333EA] text-stone-600 transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                title="Eliminar del catálogo"
                                className="p-2 rounded-xl bg-stone-100 hover:bg-red-100 hover:text-red-600 text-stone-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: NOVEDADES DE LA BARAJA (MICRO-CARRUSEL DE 2 A 3 FOTOS Y CRÓNICA) */}
              {activeTab === 'novedades' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-stone-200">
                    <h3 className="font-display font-black text-xl text-stone-900">
                      Novedades de la Baraja Desplegable (Editorial y Eventos)
                    </h3>
                    <p className="text-xs text-stone-500">
                      Modifica las 4 cartas principales. Cada una soporta un micro-carrusel de 2 a 3 fotos que transicionan en la web.
                    </p>
                  </div>

                  {/* Selector de las 4 cartas */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {promotions.map((promo, idx) => (
                      <button
                        key={promo.id}
                        type="button"
                        onClick={() => handleSelectPromoToEdit(idx)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedPromoIndex === idx
                            ? 'bg-purple-50 border-[#9333EA] ring-2 ring-purple-300 shadow-md'
                            : 'bg-white border-stone-200 hover:border-stone-300 shadow-xs'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase text-purple-700 block">
                          Carta {idx + 1} ({promo.images.length} fotos)
                        </span>
                        <h5 className="font-bold text-xs text-stone-900 truncate mt-1">
                          {promo.title}
                        </h5>
                        <span className="text-[10px] text-stone-500 truncate block">
                          {promo.badgeText}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Formulario de la Carta Seleccionada */}
                  <form onSubmit={handleSavePromo} className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                      <h4 className="font-display font-black text-base text-stone-900 flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-[#9333EA]" />
                        <span>Editando Carta {selectedPromoIndex + 1}: "{currentPromo.title}"</span>
                      </h4>
                      <span className="text-xs text-stone-400">
                        Micro-carrusel activo: {currentPromo.images.length} fotografías
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-stone-800 mb-1">
                          Etiqueta de cabecera (ej. 🎃 ESPECIAL HALLOWEEN o 🎪 FERIA DEL LIBRO)
                        </label>
                        <input
                          type="text"
                          value={currentPromo.badgeText}
                          onChange={(e) => setEditingPromo({ ...currentPromo, badgeText: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-stone-800 mb-1">
                          Fecha o Lugar (ej. Campaña de Otoño o Valencia • 15 Nov)
                        </label>
                        <input
                          type="text"
                          value={currentPromo.dateLabel}
                          onChange={(e) => setEditingPromo({ ...currentPromo, dateLabel: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                        />
                      </div>
                    </div>

                    {/* SELECTOR DE GAMA DE COLOR TEMÁTICO DE LA CARTA */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="block text-xs font-black text-stone-800">
                            Color temático y estilo de la carta
                          </label>
                          <p className="text-[11px] text-stone-500">
                            Elige la gama de color según la ocasión (Otoño/Halloween, Kawaii/Pastel, Ferias/Verano, Navidad, etc.).
                          </p>
                        </div>
                        {/* Live Badge Preview */}
                        <div className="shrink-0 flex items-center gap-2">
                          <span className="text-[10px] text-stone-400 font-bold hidden sm:inline">Vista previa:</span>
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide shadow-xs ${getPromoBadgeClasses(currentPromo.badgeStyle)}`}>
                            {currentPromo.badgeText || 'Texto de etiqueta'}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                        {PROMO_COLOR_PRESETS.map((preset) => {
                          const isSelected = currentPromo.badgeStyle === preset.id;
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => setEditingPromo({ ...currentPromo, badgeStyle: preset.id as PromoBadgeStyle })}
                              className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-white border-[#9333EA] ring-2 ring-purple-300 shadow-sm'
                                  : 'bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white'
                              }`}
                            >
                              <span
                                className="w-5 h-5 rounded-full shrink-0 shadow-xs flex items-center justify-center text-[10px] text-white font-bold"
                                style={{ backgroundColor: preset.dotColor }}
                              >
                                {isSelected ? '✓' : ''}
                              </span>
                              <span className={`text-[11px] font-bold truncate ${isSelected ? 'text-stone-900 font-black' : 'text-stone-600'}`}>
                                {preset.name.split('/')[0].trim()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-black text-stone-800 mb-1">
                          Categoría de la Carta
                        </label>
                        <select
                          value={currentPromo.category}
                          onChange={(e) => setEditingPromo({ ...currentPromo, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#9333EA] bg-white"
                        >
                          <option value="TEMPORADA">🍂 TEMPORADA</option>
                          <option value="EVENTO">🎪 EVENTO / FERIA</option>
                          <option value="COLECCIÓN CÁPSULA">✨ COLECCIÓN CÁPSULA</option>
                          <option value="DIARIO DE TALLER">📖 DIARIO DE TALLER</option>
                          <option value="EDICIÓN LIMITADA">💎 EDICIÓN LIMITADA</option>
                          <option value="LANZAMIENTO EXCLUSIVO">🚀 LANZAMIENTO EXCLUSIVO</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-black text-stone-800 mb-1">
                          Título Principal de la Novedad
                        </label>
                        <input
                          type="text"
                          value={currentPromo.title}
                          onChange={(e) => setEditingPromo({ ...currentPromo, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-stone-800 mb-1">
                        Subtítulo descriptivo en una línea
                      </label>
                      <input
                        type="text"
                        value={currentPromo.subtitle}
                        onChange={(e) => setEditingPromo({ ...currentPromo, subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                      />
                    </div>

                    {/* GESTIÓN DE LAS 2 A 3 FOTOS DEL MICRO-CARRUSEL DE LA CARTA */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-xs font-black text-stone-900">
                            Micro-carrusel de Fotos de esta Novedad (2 a 3 imágenes con rotación)
                          </label>
                          <p className="text-[11px] text-stone-500">
                            Las fotos van rotando suavemente en la baraja y el cliente puede pasarlas con flechas.
                          </p>
                        </div>
                        {currentPromo.images.length < 3 && (
                          <button
                            type="button"
                            onClick={handleAddPromoImage}
                            className="px-3 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#9333EA] text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Añadir foto al carrusel</span>
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {currentPromo.images.map((imgObj, slotIdx) => (
                          <div key={slotIdx} className="p-3 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <img
                              src={imgObj.url}
                              alt={`Foto ${slotIdx + 1}`}
                              className="w-16 h-16 object-cover rounded-xl border border-stone-200 shrink-0"
                            />

                            <div className="flex-1 space-y-1.5 w-full">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-purple-700">
                                  Foto {slotIdx + 1} de {currentPromo.images.length}
                                </span>
                                {currentPromo.images.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePromoImage(slotIdx)}
                                    className="text-stone-400 hover:text-red-500 text-xs flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Quitar foto</span>
                                  </button>
                                )}
                              </div>

                              <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                  type="button"
                                  onClick={() => handlePromoImageUpload(slotIdx)}
                                  className="px-3 py-1.5 rounded-xl bg-purple-50 text-[#9333EA] hover:bg-purple-100 text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Subir foto</span>
                                </button>
                                <input
                                  type="url"
                                  placeholder="O URL de la foto..."
                                  value={imgObj.url}
                                  onChange={(e) => {
                                    const copy = [...currentPromo.images];
                                    copy[slotIdx] = { ...copy[slotIdx], url: e.target.value };
                                    setEditingPromo({ ...currentPromo, images: copy });
                                  }}
                                  className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs bg-stone-50"
                                />
                              </div>

                              <input
                                type="text"
                                placeholder="Pie de foto / Descripción del ángulo (ej: Marcapáginas en mesa de lectura)..."
                                value={imgObj.caption}
                                onChange={(e) => {
                                  const copy = [...currentPromo.images];
                                  copy[slotIdx] = { ...copy[slotIdx], caption: e.target.value };
                                  setEditingPromo({ ...currentPromo, images: copy });
                                }}
                                className="w-full px-3 py-1 rounded-lg border border-stone-200 text-[11px] text-stone-700"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Historia / Crónica */}
                    <div>
                      <label className="block text-xs font-black text-stone-800 mb-1">
                        Historia o crónica completa (aparece al pulsar "Crónica")
                      </label>
                      <textarea
                        rows={4}
                        value={currentPromo.story}
                        onChange={(e) => setEditingPromo({ ...currentPromo, story: e.target.value })}
                        className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                      />
                    </div>

                    {/* Artículos englobados y Texto del Botón */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-stone-800 mb-1">
                          Texto del Botón Principal
                        </label>
                        <input
                          type="text"
                          value={currentPromo.ctaText}
                          onChange={(e) => setEditingPromo({ ...currentPromo, ctaText: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-stone-800 mb-1">
                          Etiqueta de conteo (ej: +14 novedades de temporada)
                        </label>
                        <input
                          type="text"
                          value={currentPromo.itemCountLabel}
                          onChange={(e) => setEditingPromo({ ...currentPromo, itemCountLabel: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold"
                        />
                      </div>
                    </div>

                    {/* Destino del Botón Principal */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
                      <div>
                        <label className="block text-xs font-black text-stone-800">
                          ¿A qué sección o filtro lleva el botón de esta carta?
                        </label>
                        <p className="text-[11px] text-stone-500">
                          Configura qué ocurre cuando el cliente pulsa el botón principal en la portada.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-white cursor-pointer">
                          <input
                            type="radio"
                            name="targetAction"
                            checked={currentPromo.targetAction === 'filter'}
                            onChange={() => setEditingPromo({ ...currentPromo, targetAction: 'filter' })}
                            className="text-[#9333EA]"
                          />
                          <span className="text-xs font-bold text-stone-800">Filtrar Catálogo</span>
                        </label>

                        <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-white cursor-pointer">
                          <input
                            type="radio"
                            name="targetAction"
                            checked={currentPromo.targetAction === 'locator'}
                            onChange={() => setEditingPromo({ ...currentPromo, targetAction: 'locator' })}
                            className="text-[#9333EA]"
                          />
                          <span className="text-xs font-bold text-stone-800">Ver Ferias / Tiendas</span>
                        </label>

                        <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-white cursor-pointer">
                          <input
                            type="radio"
                            name="targetAction"
                            checked={currentPromo.targetAction === 'box'}
                            onChange={() => setEditingPromo({ ...currentPromo, targetAction: 'box' })}
                            className="text-[#9333EA]"
                          />
                          <span className="text-xs font-bold text-stone-800">Arma tu Caja Regalo</span>
                        </label>
                      </div>

                      {currentPromo.targetAction === 'filter' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                          <div>
                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                              Filtrar por Departamento (opcional):
                            </label>
                            <select
                              value={currentPromo.targetFilter?.department || 'TODOS'}
                              onChange={(e) => setEditingPromo({
                                ...currentPromo,
                                targetFilter: {
                                  ...currentPromo.targetFilter,
                                  department: e.target.value as MainDepartment
                                }
                              })}
                              className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs bg-white"
                            >
                              {MAIN_DEPARTMENTS.map(d => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                              O filtrar por Temática / Fandom (opcional):
                            </label>
                            <select
                              value={currentPromo.targetFilter?.fandom || 'TODOS'}
                              onChange={(e) => setEditingPromo({
                                ...currentPromo,
                                targetFilter: {
                                  ...currentPromo.targetFilter,
                                  fandom: e.target.value as FandomCategory
                                }
                              })}
                              className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs bg-white"
                            >
                              {FANDOM_CATEGORIES.map(f => (
                                <option key={f} value={f}>{f}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Novedad y Micro-Carrusel en la Baraja</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: PREGUNTAS FRECUENTES (FAQS) */}
              {activeTab === 'faqs' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                    <div>
                      <h3 className="font-display font-black text-xl text-stone-900">
                        Preguntas Frecuentes del Taller
                      </h3>
                      <p className="text-xs text-stone-500">
                        Modifica las respuestas sobre envíos, materiales, fundas o añade nuevas dudas comunes.
                      </p>
                    </div>

                    {!editingFaq && (
                      <button
                        onClick={() => {
                          setIsCreatingFaq(true);
                          setEditingFaq({
                            id: `faq-${Date.now()}`,
                            category: 'envios',
                            question: '',
                            answer: ''
                          });
                        }}
                        className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Nueva Pregunta</span>
                      </button>
                    )}
                  </div>

                  {editingFaq ? (
                    <form onSubmit={handleSaveFaqForm} className="p-5 rounded-3xl bg-white border border-stone-200 space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                        <h4 className="font-bold text-sm text-stone-900">
                          {isCreatingFaq ? 'Nueva Pregunta Frecuente' : 'Editar Pregunta Frecuente'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingFaq(null)}
                          className="text-xs text-stone-500 hover:text-stone-800 font-bold"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-stone-800 mb-1">
                          Pregunta que suelen hacerte:
                        </label>
                        <input
                          type="text"
                          required
                          value={editingFaq.question}
                          onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-stone-800 mb-1">
                          Respuesta detallada y tranquilizadora:
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={editingFaq.answer}
                          onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                          className="w-full p-3 rounded-xl border border-stone-300 text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>Guardar Pregunta en la Web</span>
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      {faqs.map((faq) => (
                        <div key={faq.id} className="p-4 rounded-2xl bg-white border border-stone-200 flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-purple-700">
                              {faq.category}
                            </span>
                            <h4 className="text-xs font-black text-stone-900">
                              {faq.question}
                            </h4>
                            <p className="text-xs text-stone-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>

                          <div className="flex gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setIsCreatingFaq(false);
                                setEditingFaq({ ...faq });
                              }}
                              className="p-2 rounded-lg bg-stone-100 hover:bg-purple-100 hover:text-[#9333EA] cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteFaq(faq.id)}
                              className="p-2 rounded-lg bg-stone-100 hover:bg-red-100 hover:text-red-600 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: AVISOS Y CONTACTO WHATSAPP */}
              {activeTab === 'avisos' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-stone-200">
                    <h3 className="font-display font-black text-xl text-stone-900">
                      Avisos de la Tienda y WhatsApp de Contacto
                    </h3>
                    <p className="text-xs text-stone-500">
                      Personaliza la barra superior de la web y el teléfono al que te llegan las consultas.
                    </p>
                  </div>

                  <form onSubmit={handleSaveSettings} className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
                    {/* Aviso Superior */}
                    <div>
                      <label className="block text-xs font-black text-stone-800 mb-1.5">
                        Texto de la Banda Superior (lo leen todos los visitantes arriba):
                      </label>
                      <input
                        type="text"
                        value={currentNotice}
                        onChange={(e) => setCurrentNotice(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                      />
                    </div>

                    {/* Presets rápidos */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-stone-600 block">
                        Frases rápidas para poner con 1 clic:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          '✨ ¡Envíos gratis en pedidos superiores a 45 € a toda la Península!',
                          '🎪 ¡Nos vemos este fin de semana en la Feria del Libro! Ven a saludarnos.',
                          '🎃 Colección especial de otoño disponible por tiempo limitado.',
                          '🏖️ Aviso de taller: del 1 al 10 los pedidos se prepararán a la vuelta con regalo sorpresa.'
                        ].map((preset, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setCurrentNotice(preset)}
                            className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-purple-50 text-left text-xs font-medium text-stone-800 cursor-pointer"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Teléfono de WhatsApp */}
                    <div className="pt-3 border-t border-stone-100">
                      <label className="block text-xs font-black text-stone-800 mb-1">
                        Número de WhatsApp para el botón flotante:
                      </label>
                      <div className="relative max-w-sm">
                        <input
                          type="text"
                          placeholder="34600000000"
                          value={currentPhone}
                          onChange={(e) => setCurrentPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs font-bold"
                        />
                        <PhoneCall className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                      <span className="text-[10px] text-stone-400 block mt-1">
                        Formato internacional con prefijo (ej: 34 para España seguido de los 9 dígitos).
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>Guardar Avisos y Contacto</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 5: CAMBIAR PIN DE SEGURIDAD */}
              {activeTab === 'seguridad' && (
                <div className="space-y-6 max-w-lg">
                  <div className="pb-3 border-b border-stone-200">
                    <h3 className="font-display font-black text-xl text-stone-900">
                      PIN de Acceso Privado al Taller
                    </h3>
                    <p className="text-xs text-stone-500">
                      Puedes cambiar la clave que protege este panel por cualquier número fácil de recordar.
                    </p>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    try {
                      localStorage.setItem('martens_workshop_pin', masterPin);
                    } catch {}
                    showNotification('PIN de acceso actualizado con éxito');
                  }} className="p-5 rounded-3xl bg-white border border-stone-200 space-y-4">
                    <div>
                      <label className="block text-xs font-black text-stone-800 mb-1">
                        Tu PIN actual:
                      </label>
                      <input
                        type="text"
                        maxLength={8}
                        value={masterPin}
                        onChange={(e) => setMasterPin(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-mono text-center text-lg font-black tracking-widest text-[#9333EA]"
                      />
                    </div>

                    <p className="text-xs text-stone-500">
                      💡 Para volver a entrar en cualquier momento, basta con escribir en la barra de tu navegador la dirección:
                      <code className="block mt-1 p-2 rounded-lg bg-purple-50 text-purple-900 font-mono text-xs select-all">
                        https://martenscrap.com/#taller
                      </code>
                    </p>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Actualizar mi PIN</span>
                    </button>
                  </form>
                </div>
              )}

            </div>

            {/* Bottom Safety Bar */}
            <div className="px-5 sm:px-8 py-3 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs text-stone-500 shrink-0 gap-2">
              <div className="flex items-center gap-2">
                <Smile className="w-4 h-4 text-[#9333EA]" />
                <span>Todo lo que guardas aquí se refleja inmediatamente en tu web.</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ 
                      products, 
                      promotions, 
                      announcementText,
                      faqs,
                      whatsAppNumber 
                    }, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", `martenscrap_copia_${new Date().toISOString().slice(0, 10)}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                    showNotification('Copia de seguridad descargada en tu equipo');
                  }}
                  className="hover:text-stone-800 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar copia de seguridad</span>
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
