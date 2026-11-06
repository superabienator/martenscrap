import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      setQuery('');
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.department.toLowerCase().includes(query.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(query.toLowerCase()) ||
        p.fandom.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const quickTags = ['Dragón 3D', 'Legami', 'Harry Potter', 'Halloween', 'Marcapáginas', 'Romantasy', 'Vela'];

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda de productos y colecciones"
      className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 p-2.5 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#FAF8F5] border border-stone-200 shadow-2xl p-4 sm:p-6 overflow-hidden">
        
        {/* Input Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-stone-400" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            aria-label="Buscar dragones 3D, bolis Legami, marcapáginas o fandoms"
            placeholder="Buscar dragones 3D, bolis Legami, marcapáginas o fandoms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-stone-200 text-sm font-semibold text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9333EA] shadow-inner"
          />
          <button
            onClick={onClose}
            aria-label="Cerrar buscador"
            className="absolute right-3 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-2">
          <span className="text-[11px] font-bold uppercase text-stone-400 mr-1">Sugerencias:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 rounded-xl bg-white text-xs font-semibold text-stone-700 border border-stone-200 hover:border-[#9333EA] transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mt-4 max-h-80 overflow-y-auto space-y-2 pr-1">
          {query.trim() && filtered.length === 0 ? (
            <div className="text-center py-8 text-stone-500 text-xs font-medium">
              No encontramos resultados para "{query}". Prueba con otra búsqueda o una sugerencia.
            </div>
          ) : (
            filtered.map((prod) => (
              <button
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                className="w-full p-3 rounded-2xl bg-white hover:bg-purple-50/70 border border-stone-200/80 text-left flex items-center justify-between gap-3 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="h-12 w-12 object-cover rounded-xl"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      {prod.department} • {prod.subCategory}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {prod.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-black text-[#9333EA]">
                    {prod.price.toFixed(2)} €
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-[#9333EA] transition-all" />
                </div>
              </button>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
