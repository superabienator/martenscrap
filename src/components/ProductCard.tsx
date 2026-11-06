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
      className="living-border group relative flex flex-col justify-between rounded-3xl bg-white border border-[#EBE5DF] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(147,51,234,0.12)] transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
    >
      {/* Top badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.is3DPrint && (
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-700 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Box className="w-3 h-3" /> Impresión 3D
          </span>
        )}
        {product.isLegami && (
          <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Legami
          </span>
        )}
        {product.isNew && !product.is3DPrint && !product.isLegami && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#1C1917] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
            Novedad
          </span>
        )}
        {product.isBestseller && (
          <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
            Top Ventas
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className={`absolute top-6 right-6 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
          isWishlisted
            ? 'bg-red-50 text-red-500 shadow-sm'
            : 'bg-white/80 text-stone-400 hover:text-red-500 hover:scale-110'
        }`}
        aria-label="Añadir a favoritos"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Image Showcase */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F7F4F0] flex items-center justify-center p-3 mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          width="400"
          height="400"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Magnetic snap pill overlay */}
        {product.hasMagneticSnap && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-purple-900 border border-purple-200 shadow-xs">
            <span>🧲</span> Cierre Magnético
          </div>
        )}

        {/* Quick view hover action */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-2xl flex items-center justify-center transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span className="px-4 py-2 rounded-xl bg-white text-stone-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transform hover:scale-105 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            Vista Rápida
          </span>
        </div>
      </div>

      {/* Meta Information */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
            <span>{product.department} • {product.subCategory}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="font-display font-bold text-sm sm:text-base text-stone-900 leading-snug line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-3 flex items-center justify-between border-t border-stone-100">
          <div>
            {product.originalPrice && (
              <span className="text-[11px] text-stone-400 line-through block leading-none">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
            <span className="font-black text-lg text-stone-900">
              {product.price.toFixed(2)} €
            </span>
          </div>

          <button
            onClick={handleFastAdd}
            className="flex items-center justify-center h-10 w-10 rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label={`Añadir ${product.name} a la cesta`}
            title="Añadir a la cesta"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  );
};
