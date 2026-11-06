import React, { useState } from 'react';
import type { Product } from '../types';
import { Eye, Plus, Star, Heart, Box, Sparkles } from 'lucide-react';
import { playPopSound, playMagneticSnapSound } from '../utils/audio';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleFastAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.hasMagneticSnap) {
      playMagneticSnapSound();
    } else {
      playPopSound();
    }
    onAddToCart(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    onToggleWishlist(product);
  };

  return (
    <article
      data-cursor="Ver"
      role="button"
      tabIndex={0}
      onClick={() => onQuickView(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onQuickView(product);
        }
      }}
      aria-label={`Ver detalles de ${product.name}, precio ${product.price.toFixed(2)} euros`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="living-border group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white border border-[#EBE5DF] p-2.5 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(147,51,234,0.12)] transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
    >
      {/* Top badges */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex flex-col gap-1 pointer-events-none">
        {product.is3DPrint && (
          <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-cyan-700 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-0.5 sm:gap-1">
            <Box className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 3D
          </span>
        )}
        {product.isLegami && (
          <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-0.5 sm:gap-1">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Legami
          </span>
        )}
        {product.isNew && !product.is3DPrint && !product.isLegami && (
          <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#1C1917] text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm">
            Novedad
          </span>
        )}
        {product.isBestseller && (
          <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm">
            Top
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className={`absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all ${
          isWishlisted
            ? 'bg-red-50 text-red-500 shadow-sm'
            : 'bg-white/80 text-stone-400 hover:text-red-500 hover:scale-110'
        }`}
        aria-label="Añadir a favoritos"
      >
        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Image Showcase */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#F7F4F0] flex items-center justify-center p-1.5 sm:p-3 mb-2 sm:mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          width="400"
          height="400"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Magnetic snap pill overlay */}
        {product.hasMagneticSnap && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-purple-900 border border-purple-200 shadow-xs">
            <span>🧲</span> <span className="hidden sm:inline">Cierre</span> Imán
          </div>
        )}

        {/* Quick view hover action */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-xl sm:rounded-2xl flex items-center justify-center transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white text-stone-900 text-[11px] sm:text-xs font-bold shadow-lg flex items-center gap-1.5 transform hover:scale-105 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vista Rápida</span>
          </span>
        </div>
      </div>

      {/* Meta Information */}
      <div className="space-y-1 sm:space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-0.5 sm:mb-1">
            <span className="truncate max-w-[70%]">{product.department}</span>
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="font-display font-bold text-xs sm:text-base text-stone-900 leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
            {product.name}
          </h3>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2 sm:pt-3 flex items-center justify-between border-t border-stone-100">
          <div>
            {product.originalPrice && (
              <span className="text-[9px] sm:text-[11px] text-stone-400 line-through block leading-none">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
            <span className="font-black text-sm sm:text-lg text-stone-900">
              {product.price.toFixed(2)} €
            </span>
          </div>

          <button
            onClick={handleFastAdd}
            className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label={`Añadir ${product.name} a la cesta`}
            title="Añadir a la cesta"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </article>
  );
};
