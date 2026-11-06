import React, { useEffect } from 'react';
import type { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { playPopSound, playMagneticSnapSound } from '../utils/audio';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onClearWishlist: () => void;
  onAddToCart: (product: Product) => void;
  onExplore: () => void;
  title?: string;
  emptyText?: string;
  emptySubText?: string;
  moveToCartText?: string;
  clearText?: string;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onClearWishlist,
  onAddToCart,
  onExplore,
  title = 'Tus Artículos Favoritos',
  emptyText = 'Tu lista de deseos está vacía',
  emptySubText = 'Explora nuestros dragones 3D, bolis Legami y marcapáginas y pulsa en el corazón para guardarlos aquí.',
  moveToCartText = 'Añadir a la cesta',
  clearText = 'Vaciar favoritos'
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddAndRemove = (product: Product) => {
    if (product.hasMagneticSnap) {
      playMagneticSnapSound();
    } else {
      playPopSound();
    }
    onAddToCart(product);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md h-full bg-[#FAF8F5] border-l border-stone-200 shadow-2xl flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <h3 id="wishlist-drawer-title" className="font-display font-black text-lg text-stone-900">
              {title}
            </h3>
            <span className="text-xs font-bold text-stone-400">
              ({wishlistProducts.length})
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar lista de deseos"
            className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-red-50 text-red-400 flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-base text-stone-800">
                {emptyText}
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                {emptySubText}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="mt-2 px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-[#9333EA] text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Descubrir catálogo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between gap-3 group hover:border-[#9333EA]/30 transition-all"
              >
                {/* Image */}
                <div className="h-16 w-16 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200 flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    width="64"
                    height="64"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    {product.department}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-black text-xs text-stone-900">
                      {product.price.toFixed(2)} €
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-stone-400 line-through">
                        {product.originalPrice.toFixed(2)} €
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => handleAddAndRemove(product)}
                    className="px-3 py-1.5 rounded-xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                    title={moveToCartText}
                    aria-label={`Añadir ${product.name} a la cesta`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Cesta</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-1.5 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer self-end"
                    aria-label={`Eliminar ${product.name} de favoritos`}
                    title="Eliminar de favoritos"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between shrink-0">
            <button
              onClick={onClearWishlist}
              className="text-xs font-bold text-stone-400 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{clearText}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onExplore();
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-[#9333EA] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Seguir explorando
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
