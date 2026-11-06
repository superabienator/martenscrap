import React from 'react';
import { Sparkles, ArrowUp, ShieldCheck, Truck } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onSelectFandom: (fandom: any) => void;
  onSelectComplement: (comp: any) => void;
  onOpenLegal?: (tab: 'aviso' | 'privacidad' | 'cookies' | 'terminos') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onSelectFandom,
  onSelectComplement,
  onOpenLegal
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141210] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        
        {/* Top Guarantee Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-stone-900 text-[#E0A96D]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Diseño Propio & Calidad</h4>
              <p className="text-xs text-stone-400">Artículos cuidados al detalle y creaciones pensadas para lectores.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-stone-900 text-[#E0A96D]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Envíos Cuidados</h4>
              <p className="text-xs text-stone-400">Embalaje libre de plástico con detalles coleccionables en cada paquete.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-stone-900 text-[#E0A96D]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pago Seguro</h4>
              <p className="text-xs text-stone-400">Transacciones cifradas con Bizum, Tarjetas de Crédito y PayPal.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-original.png" 
                alt="Martenscrap" 
                className="h-11 w-auto max-w-[170px] object-contain drop-shadow-sm brightness-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <span className="font-display font-black text-2xl text-white block leading-none tracking-tight">
                  <span className="text-iridescent">Martenscrap</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  Marta Pastor Escribano
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Marcapáginas magnéticos de diseño propio, papelería kawaii Legami, figuras 3D y objetos de colección pensados para los amantes de las buenas historias.
            </p>

            {/* Social handles */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/martenscrap/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-stone-900 hover:bg-[#9333EA] text-stone-300 hover:text-white transition-colors flex items-center justify-center"
                aria-label="Instagram de Martenscrap"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <span className="text-xs text-stone-400">@martenscrap en Instagram & TikTok</span>
            </div>
          </div>

          {/* Fandoms */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Universos</h4>
            <ul className="space-y-2 text-xs">
              {['HARRY POTTER', 'DISNEY', 'ANIME / MANGA', 'CINE - TV', 'LITERARIO', 'NAVIDAD'].map((f) => (
                <li key={f}>
                  <button
                    onClick={() => {
                      onSelectFandom(f);
                      onNavigateSection('catalogo');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {f}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Complementos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Coleccionables</h4>
            <ul className="space-y-2 text-xs">
              {['Marcapáginas magnéticos', 'Standee', 'Contador de libros', 'Llaveros', 'Pendientes', 'Diarios y Cajas'].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => {
                      onSelectComplement(c);
                      onNavigateSection('catalogo');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tienda & Puntos físicos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Puntos de Venta</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateSection('tiendas-fisicas')} className="hover:text-white transition-colors">
                  Valencia (Quart, Benicalap, C.C.)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('tiendas-fisicas')} className="hover:text-white transition-colors">
                  Pontevedra (Gondomar)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('tiendas-fisicas')} className="hover:text-white transition-colors">
                  Tarragona (Reus)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('tiendas-fisicas')} className="hover:text-white transition-colors">
                  Málaga Centro
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('tiendas-fisicas')} className="hover:text-white transition-colors">
                  Santa Cruz de Tenerife
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Copyright & Legal Compliance [LEGAL-02] */}
        <div className="pt-8 border-t border-stone-800 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Martenscrap • Marta Pastor Escribano. Todos los derechos reservados.
          </div>

          <nav aria-label="Enlaces legales y normativa" className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenLegal?.('aviso')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Aviso Legal (LSSI-CE)
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal?.('privacidad')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Política de Privacidad (RGPD)
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal?.('cookies')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Política de Cookies
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal?.('terminos')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Términos & Desistimiento 14D
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              aria-label="Volver arriba de la página"
              className="p-2 rounded-xl bg-stone-900 hover:bg-[#9333EA] text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
