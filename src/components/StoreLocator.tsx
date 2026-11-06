import React, { useState } from 'react';
import { PHYSICAL_STORES } from '../data/mockData';
import { MapPin, ExternalLink, Copy, Check, Navigation } from 'lucide-react';

export const StoreLocator: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('TODAS');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const provinces = ['TODAS', 'Valencia', 'Pontevedra', 'Tarragona', 'Málaga', 'Santa Cruz de Tenerife'];

  const filteredStores = PHYSICAL_STORES.filter(store => {
    if (selectedProvince === 'TODAS') return true;
    return store.province === selectedProvince;
  });

  const handleCopy = async (address: string, id: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback silently without throwing unhandled promise rejection [ARCH-04]
      setCopiedId(null);
    }
  };

  return (
    <section id="tiendas-fisicas" className="py-12 sm:py-16 lg:py-24 border-t border-stone-200/80 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            Presencia Física
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
            ¿Dónde puedes encontrar <span className="text-iridescent">nuestros productos</span>?
          </h2>
          <p className="text-sm text-stone-600">
            Además de nuestra tienda online, colaboramos con librerías de autor y espacios selectos para que puedas ver y tocar nuestros marcapáginas y complementos en persona.
          </p>
        </div>

        {/* Province Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {provinces.map((prov) => (
            <button
              key={prov}
              onClick={() => setSelectedProvince(prov)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedProvince === prov
                  ? 'bg-[#1C1917] text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="p-6 rounded-3xl bg-white border border-stone-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between group living-border"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-purple-50 text-[#9333EA] text-[11px] font-bold">
                    {store.province}
                  </span>
                  {store.isMall && (
                    <span className="text-[10px] font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
                      {store.mallName}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-stone-900 group-hover:text-[#9333EA] transition-colors">
                  {store.name}
                </h3>

                <p className="text-xs text-stone-600 mt-2 leading-relaxed flex items-start gap-2">
                  <Navigation className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>
                    {store.address}<br />
                    <span className="text-stone-400 font-medium">{store.postalCode} • {store.city}</span>
                  </span>
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopy(`${store.address}, ${store.postalCode} ${store.city}`, store.id)}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-[11px] font-semibold text-stone-700 flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === store.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                      Copiar dirección
                    </>
                  )}
                </button>

                <a
                  href={store.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-[#9333EA] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Cómo llegar</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
