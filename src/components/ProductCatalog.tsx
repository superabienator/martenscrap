import React, { useState, useMemo } from 'react';
import type { Product, MainDepartment, FandomCategory, SubCategory } from '../types';
import { MAIN_DEPARTMENTS, FANDOM_CATEGORIES, SUB_CATEGORIES } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { Sparkles, Filter } from 'lucide-react';
import { TRANSLATIONS, type Language } from '../i18n/translations';

interface ProductCatalogProps {
  products: Product[];
  selectedDepartment: MainDepartment;
  onSelectDepartment: (dept: MainDepartment, sub?: SubCategory) => void;
  selectedSubCategory: SubCategory;
  onSelectSubCategory: (sub: SubCategory) => void;
  selectedFandom: FandomCategory;
  onSelectFandom: (f: FandomCategory) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  language?: Language;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedDepartment,
  onSelectDepartment,
  selectedSubCategory,
  onSelectSubCategory,
  selectedFandom,
  onSelectFandom,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  language = 'es'
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['es'];
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [only3D, setOnly3D] = useState(false);
  const [onlyLegami, setOnlyLegami] = useState(false);
  const [onlyMagnetic, setOnlyMagnetic] = useState(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedDepartment !== 'TODOS' && p.department !== selectedDepartment) return false;
        if (selectedSubCategory !== 'TODOS' && p.subCategory !== selectedSubCategory) return false;
        if (selectedFandom !== 'TODOS' && p.fandom !== selectedFandom) return false;
        if (only3D && !p.is3DPrint) return false;
        if (onlyLegami && !p.isLegami) return false;
        if (onlyMagnetic && !p.hasMagneticSnap) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedDepartment, selectedSubCategory, selectedFandom, only3D, onlyLegami, onlyMagnetic, sortBy]);

  const currentSubList = SUB_CATEGORIES[selectedDepartment] || ['TODOS'];

  return (
    <section id="catalogo" className="py-12 lg:py-20 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#9333EA] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {t.catalogBadge}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {t.catalogTitle} <span className="text-iridescent">{t.catalogTitleHighlight}</span>
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              {t.catalogSubtitle}
            </p>
          </div>

          <div className="text-xs font-semibold text-stone-500">
            {t.showingItems} <span className="font-bold text-stone-900">{filteredProducts.length}</span>
          </div>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MAIN_DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              onClick={() => onSelectDepartment(dept, 'TODOS')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDepartment === dept
                  ? dept === 'IMPRESIÓN 3D'
                    ? 'bg-cyan-700 text-white shadow-md'
                    : dept === 'LEGAMI'
                    ? 'bg-rose-700 text-white shadow-md'
                    : 'bg-[#1C1917] text-white shadow-md'
                  : 'bg-white/80 text-stone-700 hover:bg-white border border-stone-200'
              }`}
            >
              {dept === 'IMPRESIÓN 3D' && '✨ '}
              {dept}
            </button>
          ))}
        </div>

        {/* Secondary Subcategories & Fandoms Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Subcategoría:
            </span>
            <select
              value={selectedSubCategory}
              onChange={(e) => onSelectSubCategory(e.target.value as SubCategory)}
              className="text-xs font-bold text-stone-800 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            >
              {currentSubList.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>

            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-2">
              Fandom:
            </span>
            <select
              value={selectedFandom}
              onChange={(e) => onSelectFandom(e.target.value as FandomCategory)}
              className="text-xs font-bold text-stone-800 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            >
              {FANDOM_CATEGORIES.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>

            {/* Quick check toggles */}
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 ml-2 cursor-pointer">
              <input
                type="checkbox"
                checked={only3D}
                onChange={(e) => setOnly3D(e.target.checked)}
                className="rounded text-cyan-600 focus:ring-cyan-600"
              />
              🐉 Solo 3D
            </label>

            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyLegami}
                onChange={(e) => setOnlyLegami(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-600"
              />
              🌸 Solo Legami
            </label>

            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyMagnetic}
                onChange={(e) => setOnlyMagnetic(e.target.checked)}
                className="rounded text-[#9333EA] focus:ring-[#9333EA]"
              />
              🧲 Solo imán
            </label>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-semibold text-stone-500">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold text-stone-800 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: de menor a mayor</option>
              <option value="price-desc">Precio: de mayor a menor</option>
              <option value="rating">Mejor valorados ★</option>
            </select>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-3xl bg-white border border-stone-200">
            <p className="text-base font-bold text-stone-700">
              No hemos encontrado productos con esos filtros.
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Prueba seleccionando "TODOS" o quitando los filtros aplicados.
            </p>
            <button
              onClick={() => {
                onSelectDepartment('TODOS');
                onSelectSubCategory('TODOS');
                onSelectFandom('TODOS');
                setOnly3D(false);
                setOnlyLegami(false);
                setOnlyMagnetic(false);
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-[#9333EA] transition-colors cursor-pointer"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
