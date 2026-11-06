import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { 
  X, 
  Star, 
  Heart, 
  Sparkles, 
  Volume2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Ruler, 
  Layers, 
  HeartHandshake, 
  Gift, 
  Check 
} from 'lucide-react';
import { playPopSound, playMagneticSnapSound } from '../utils/audio';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, customText?: string, variation?: string, quantity?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState<string>('');
  const [customText, setCustomText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [activeTab, setActiveTab] = useState<'descripcion' | 'especificaciones' | 'cuidados'>('descripcion');

  useEffect(() => {
    if (product && product.variations && product.variations.length > 0) {
      setSelectedVariation(product.variations[0]);
    } else {
      setSelectedVariation('');
    }
    setActiveImageIndex(0);
    setCustomText('');
    setQuantity(1);
    setIsGiftWrap(false);
    setActiveTab('descripcion');
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  // Dynamic estimated delivery date calculation
  const isMadeToOrder = product.craftStatus === 'made_to_order';
  const startDays = isMadeToOrder ? 3 : 1;
  const endDays = isMadeToOrder ? 5 : 2;

  const now = new Date();
  const estStart = new Date(now.getTime() + startDays * 24 * 60 * 60 * 1000);
  const estEnd = new Date(now.getTime() + endDays * 24 * 60 * 60 * 1000);
  const dateFormatOptions: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  const estimatedDeliveryText = `${estStart.toLocaleDateString('es-ES', dateFormatOptions)} y ${estEnd.toLocaleDateString('es-ES', dateFormatOptions)}`;

  const handleAdd = () => {
    if (product.hasMagneticSnap) {
      playMagneticSnapSound();
    } else {
      playPopSound();
    }
    const finalNote = isGiftWrap ? `${customText} [Regalo preparado]`.trim() : customText;
    onAddToCart(product, finalNote, selectedVariation, quantity);
    onClose();
  };

  const totalPrice = (product.price * quantity) + (isGiftWrap ? 1.50 : 0);

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FAF8F5] border border-stone-200 shadow-2xl p-4 sm:p-8 living-border">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar detalles del producto"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white text-stone-600 hover:text-stone-900 shadow-md transition-all hover:scale-105 z-10 cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          
          {/* Left: Gallery & Interactive 3D / Sound Preview */}
          <div className="space-y-3">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-stone-200 flex items-center justify-center p-4 shadow-xs relative">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="h-full w-full object-contain filter drop-shadow-md select-none transition-all duration-300"
              />

              {product.hasMagneticSnap && (
                <button
                  onClick={playMagneticSnapSound}
                  className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-purple-900 border border-purple-200 shadow-md hover:scale-105 transition-transform cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#9333EA]" />
                  Probar Chasquido Imán
                </button>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Ver foto ${idx + 1}`}
                    className={`h-16 w-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#9333EA] scale-105 shadow-sm' : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Miniatura ${idx + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Dynamic Delivery Date Banner */}
            <div className="p-3 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#9333EA] flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-stone-900 block">
                  Recíbelo entre el {estimatedDeliveryText}
                </span>
                <span className="text-[11px] text-stone-500">
                  Envío gratis a partir de 45 € • Correos Express con tracking
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Info, Customization & Specs */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  {product.department} • {product.subCategory}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-stone-400 font-normal">({product.reviewsCount} valoraciones)</span>
                </div>
              </div>

              <h2 id="product-modal-title" className="font-display text-2xl font-black text-stone-900 mt-1">
                {product.name}
              </h2>

              {/* Price & Dual Stock Status */}
              <div className="mt-2 flex flex-wrap items-center gap-2.5">
                <span className="text-2xl font-black text-[#9333EA]">
                  {product.price.toFixed(2)} €
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
                
                {/* Stock Status Badge */}
                {isMadeToOrder ? (
                  <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#9333EA]" />
                    Hecho a mano bajo pedido (2-4 días)
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Listo para enviar (24-48h)
                  </span>
                )}
              </div>
            </div>

            {/* TAB SELECTOR: Descripción / Ficha Técnica / Cuidados */}
            <div className="flex border-b border-stone-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('descripcion')}
                className={`pb-2 px-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'descripcion'
                    ? 'border-[#9333EA] text-[#9333EA]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Descripción
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('especificaciones')}
                className={`pb-2 px-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'especificaciones'
                    ? 'border-[#9333EA] text-[#9333EA]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Ficha Técnica
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cuidados')}
                className={`pb-2 px-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'cuidados'
                    ? 'border-[#9333EA] text-[#9333EA]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Cuidados
              </button>
            </div>

            {/* TAB CONTENTS */}
            {activeTab === 'descripcion' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Features list */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-white border border-stone-200/80">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block mb-0.5">
                    Detalles de confección
                  </span>
                  {product.features.map((feat, i) => (
                    <div key={i} className="text-xs text-stone-700 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-[#9333EA] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'especificaciones' && (
              <div className="space-y-2.5 p-3 rounded-2xl bg-white border border-stone-200/80 text-xs animate-in fade-in duration-150">
                <div className="flex items-start gap-2.5 pb-2 border-b border-stone-100">
                  <Ruler className="w-4 h-4 text-[#9333EA] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800 block">Dimensiones reales:</span>
                    <span className="text-stone-600">{product.dimensions || 'Diseño ergonómico estándar de taller'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pb-2 border-b border-stone-100">
                  <Layers className="w-4 h-4 text-[#9333EA] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800 block">Materiales empleados:</span>
                    <span className="text-stone-600">{product.materials || 'Materiales seleccionados de primera calidad'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800 block">Marca & Diseño:</span>
                    <span className="text-stone-600">Creación original de Marta Pastor Escribano</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cuidados' && (
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 text-xs space-y-2 animate-in fade-in duration-150">
                <span className="font-bold text-stone-800 block">Recomendaciones de conservación:</span>
                <p className="text-stone-600 leading-relaxed">
                  {product.careInstructions || 'Limpiar con un paño seco suave. Evitar la exposición directa a fuentes de calor extremo y humedad continuada.'}
                </p>
                <div className="text-[11px] text-purple-700 bg-purple-50 p-2 rounded-xl border border-purple-100">
                  ✨ Cada artículo es revisado individualmente antes de enviarse para garantizar la máxima calidad.
                </div>
              </div>
            )}

            {/* Variation Picker if available */}
            {product.variations && product.variations.length > 0 && (
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Selecciona tu personaje / modelo:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variations.map((v, vIdx) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setSelectedVariation(v);
                        if (vIdx < product.images.length) {
                          setActiveImageIndex(vIdx);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedVariation === v
                          ? 'border-[#9333EA] bg-purple-50 text-[#9333EA] font-bold shadow-xs'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization input */}
            {product.customizable && (
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">
                  Personalización gratuita (nombre o dedicatoria):
                </label>
                <input
                  type="text"
                  placeholder="Ej: Clara • Booklover"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA] bg-white"
                />
              </div>
            )}

            {/* Gift Wrap Checkbox */}
            <div className="p-3 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setIsGiftWrap(e.target.checked)}
                  className="w-4 h-4 rounded text-[#9333EA] focus:ring-purple-400 cursor-pointer"
                />
                <div className="flex-1">
                  <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-600" />
                    Envolver para regalo (+1.50 €)
                  </span>
                  <span className="text-[10px] text-stone-500 block leading-tight">
                    Papel craft con cinta y tarjeta caligrafiada
                  </span>
                </div>
              </label>
            </div>

            {/* Quantity & Buy Section (Desktop) */}
            <div className="pt-2 flex items-center gap-2.5">
              <div className="flex items-center rounded-xl border border-stone-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Reducir cantidad"
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-600 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-black text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Aumentar cantidad"
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-600 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-3 px-5 rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-xs sm:text-sm font-extrabold shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Añadir a la Cesta • {totalPrice.toFixed(2)} €</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                aria-label={isWishlisted ? "Quitar de favoritos" : "Guardar en favoritos"}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  isWishlisted
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-stone-200 bg-white text-stone-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Trust Mini Tag */}
            <div className="text-[11px] text-center text-stone-400 flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Garantía de devolución 14 días • Pago seguro Bizum / Tarjeta</span>
            </div>

          </div>

        </div>

        {/* STICKY BOTTOM MOBILE CTA (Instant Thumb Purchase on Mobile) */}
        <div className="md:hidden sticky bottom-0 -mx-4 -mb-4 mt-4 p-3.5 bg-white/95 backdrop-blur-md border-t border-stone-200 flex items-center gap-2.5 z-20 shadow-lg">
          <div className="flex-1 text-left">
            <span className="text-[10px] text-stone-400 uppercase block font-bold">Total</span>
            <span className="text-base font-black text-[#9333EA]">{totalPrice.toFixed(2)} €</span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-2 py-3 px-4 rounded-xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-xs font-black shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Añadir al Carrito</span>
          </button>
        </div>

      </div>
    </div>
  );
};
