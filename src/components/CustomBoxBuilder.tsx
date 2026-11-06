import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { Gift, Plus, Trash2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound, playMagneticSnapSound } from '../utils/audio';

interface CustomBoxBuilderProps {
  products: Product[];
  onAddToCart: (product: Product, customText?: string) => void;
  onClose: () => void;
}

export const CustomBoxBuilder: React.FC<CustomBoxBuilderProps> = ({
  products,
  onAddToCart,
  onClose
}) => {
  const [selectedTheme, setSelectedTheme] = useState<'romantasy' | 'navidad' | 'anime'>('navidad');
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [giftNote, setGiftNote] = useState('');
  const [recipientName, setRecipientName] = useState('');

  const targetItems = 4;
  const progressPercent = Math.min((selectedItems.length / targetItems) * 100, 100);

  const basePrice = selectedItems.reduce((acc, item) => acc + item.price, 8.50);
  const discount = selectedItems.length >= 3 ? basePrice * 0.15 : 0;
  const finalPrice = basePrice - discount;

  const handleAddItem = (product: Product) => {
    if (selectedItems.length >= 6) return;
    playPopSound();
    setSelectedItems([...selectedItems, product]);
  };

  const handleRemoveItem = (index: number) => {
    playMagneticSnapSound();
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleCompleteBox = () => {
    playMagneticSnapSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const boxProduct: Product = {
      id: `custom-box-${Date.now()}`,
      name: `Caja Regalo Personalizada (${selectedTheme.toUpperCase()})`,
      department: 'PAPELERÍA',
      subCategory: 'Cajas de Regalo',
      fandom: selectedTheme === 'navidad' ? 'NAVIDAD' : selectedTheme === 'romantasy' ? 'LITERARIO' : 'ANIME / MANGA',
      price: finalPrice,
      images: [
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
      ],
      description: `Caja personalizada con ${selectedItems.length} artículos seleccionados a mano. Dedicatoria para: ${recipientName || 'Amigo Lector'}.`,
      features: selectedItems.map(item => `• ${item.name}`),
      rating: 5.0,
      reviewsCount: 1,
      inStock: true
    };

    onAddToCart(boxProduct, `Para: ${recipientName}. Mensaje: ${giftNote}`);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="box-builder-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FAF8F5] border border-stone-200 shadow-2xl p-4 sm:p-8 living-border">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar configurador de caja regalo"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white text-stone-600 hover:text-stone-900 shadow-sm transition-all hover:scale-105 z-10 cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#9333EA] text-xs font-bold">
            <Gift className="w-3.5 h-3.5" />
            Configurador Interactivo de Cajas & Packs
          </div>
          <h2 id="box-builder-title" className="font-display text-2xl sm:text-3xl font-black text-stone-900">
            Arma tu <span className="text-iridescent">Caja Mágica de Regalo</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Selecciona tus marcapáginas, artefactos 3D y complementos favoritos. Incluye caja regalo con lazo, dedicatoria manuscrita y 15% de descuento al incluir 3 o más artículos.
          </p>
        </div>

        {/* Step 1: Select Box Theme */}
        <div className="mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
            1. Elige la estética de la caja
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'navidad', title: 'Caja Navideña Mágica', desc: 'Tonos bosque, lazo carmesí y estrellas doradas', icon: '❄️' },
              { id: 'romantasy', title: 'Caja Romantasy & Clásicos', desc: 'Lila etéreo, rosas secas y motivos lunares', icon: '✨' },
              { id: 'anime', title: 'Caja Chibi & Manga Hub', desc: 'Colores vibrantes y stickers holográficos', icon: '🌸' }
            ].map(theme => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedTheme === theme.id
                    ? 'border-[#9333EA] bg-purple-50/60 shadow-md ring-2 ring-[#9333EA]/20'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <span className="text-2xl block mb-1">{theme.icon}</span>
                <h4 className="text-sm font-bold text-stone-900">{theme.title}</h4>
                <p className="text-xs text-stone-500 mt-1">{theme.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: The Box slots & Progress */}
        <div className="mb-8 p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                2. Contenido de la Caja ({selectedItems.length}/6 artículos)
              </span>
              <p className="text-xs text-stone-400">
                {selectedItems.length >= 3 ? '🎉 ¡15% de descuento aplicado!' : 'Añade al menos 3 artículos para descuento especial'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-400 line-through block">
                {discount > 0 ? `${basePrice.toFixed(2)} €` : ''}
              </span>
              <span className="text-xl font-black text-[#9333EA]">
                {finalPrice.toFixed(2)} €
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-[#9333EA] to-[#E0A96D] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Box slots visual grid (3 cols in mobile, 6 in desktop) */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, index) => {
              const item = selectedItems[index];
              return (
                <div
                  key={index}
                  className={`h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 relative transition-all ${
                    item
                      ? 'border-[#9333EA] bg-purple-50/40'
                      : 'border-stone-200 bg-stone-50 text-stone-300'
                  }`}
                >
                  {item ? (
                    <>
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-14 w-14 object-cover rounded-lg shadow-xs mb-1"
                      />
                      <span className="text-[10px] font-bold text-stone-800 line-clamp-1 text-center">
                        {item.name}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-semibold">Vacío</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Available Items Selector */}
        <div className="mb-8">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
            Elige los productos para meter en tu caja
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-56 overflow-y-auto p-1">
            {products.slice(0, 8).map(prod => (
              <div
                key={prod.id}
                className="p-3 rounded-2xl bg-white border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="h-20 w-full object-cover rounded-xl mb-2"
                />
                <div>
                  <h5 className="text-xs font-bold text-stone-900 line-clamp-1">{prod.name}</h5>
                  <span className="text-xs font-extrabold text-[#9333EA]">{prod.price.toFixed(2)} €</span>
                </div>
                <button
                  onClick={() => handleAddItem(prod)}
                  disabled={selectedItems.length >= 6}
                  className="mt-2 w-full py-1.5 rounded-xl bg-stone-900 hover:bg-[#9333EA] text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors disabled:opacity-40"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Añadir
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: Personalization note */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="box-recipient-name" className="text-xs font-bold text-stone-700 block mb-1">
              Nombre de la persona que recibe el regalo
            </label>
            <input
              id="box-recipient-name"
              type="text"
              maxLength={80}
              placeholder="Ej: Laura o Mi Lectora Favorita"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            />
          </div>
          <div>
            <label htmlFor="box-gift-note" className="text-xs font-bold text-stone-700 block mb-1">
              Dedicatoria manuscrita gratuita (tarjeta craft)
            </label>
            <input
              id="box-gift-note"
              type="text"
              maxLength={300}
              placeholder="Ej: ¡Feliz cumpleaños y felices lecturas!"
              value={giftNote}
              onChange={(e) => setGiftNote(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            />
          </div>
        </div>

        {/* Complete button */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-stone-200">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-bold transition-colors text-center cursor-pointer min-h-[44px]"
          >
            Cancelar
          </button>
          <button
            onClick={handleCompleteBox}
            disabled={selectedItems.length === 0}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-2xl bg-[#9333EA] hover:bg-[#7E22CE] text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer min-h-[46px]"
          >
            <Gift className="w-4 h-4" />
            <span>Añadir Caja a la Cesta ({finalPrice.toFixed(2)} €)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
