import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, ShieldCheck, Truck, HeartHandshake, PackageCheck } from 'lucide-react';
import type { Language } from '../i18n/translations';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'envios' | 'materiales' | 'pedidos';
}

interface FAQSectionProps {
  language?: Language;
  faqs?: FAQItem[];
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'envios',
    question: '¿Cuánto tardan los envíos y cuál es el coste?',
    answer: 'Los artículos en stock se envían en 24-48 horas laborables mediante Correos Express o GLS con seguimiento en tiempo real. Los pedidos hechos a medida o personalizados se elaboran en nuestro taller en 2 a 4 días antes del envío. Los gastos de envío son de 3,95 € para Península y ¡GRATUITOS en pedidos superiores a 45 €! También realizamos envíos a Baleares y Canarias.'
  },
  {
    id: 'faq-2',
    category: 'materiales',
    question: '¿Los dragones y objetos en impresión 3D son resistentes?',
    answer: '¡Absolutamente! Están impresos con filamentos PLA Silk de origen vegetal (biodegradables y no tóxicos) a alta densidad y precisión milimétrica print-in-place. Son articulados, flexibles y duraderos para uso diario o como accesorio antiestrés de escritorio. La única precaución es no exponerlos a fuentes de calor extremas superiores a 55ºC (como el salpicadero de un coche cerrado al sol en verano).'
  },
  {
    id: 'faq-3',
    category: 'materiales',
    question: '¿Cómo elijo el tamaño de las fundas de tela acolchadas para libros?',
    answer: 'Nuestras fundas acolchadas tienen unas dimensiones de 28 x 21 cm, diseñadas específicamente para albergar cómodamente el 95% de los libros del mercado: desde ediciones de bolsillo hasta tochos de tapa dura de hasta 650 páginas (como novelas de fantasía juvenil). También son perfectas para llevar tu Kindle o e-reader protegido junto a un cuaderno.'
  },
  {
    id: 'faq-4',
    category: 'materiales',
    question: '¿Los marcapáginas magnéticos estropean o marcan las páginas?',
    answer: 'Para nada. Empleamos imanes de neodimio N52 ultra-planos y esquinas redondeadas recubiertas de un laminado suave soft-touch anti-arañazos. Se adhieren firmemente a las hojas sin pellizcar el papel, no se caen aunque lleves el libro en el bolso y no dejan residuos ni marcas.'
  },
  {
    id: 'faq-5',
    category: 'pedidos',
    question: '¿Puedo solicitar encargos personalizados para regalos o eventos?',
    answer: '¡Por supuesto! En Martenscrap nos encanta crear piezas únicas. Si buscas detalles para clubes de lectura, cumpleaños, bodas o marcapáginas con nombres y dedicatorias exclusivas, puedes escribirnos por nuestro formulario o directamente por WhatsApp para coordinar colores, tipografías y presupuestos sin compromiso.'
  },
  {
    id: 'faq-6',
    category: 'pedidos',
    question: '¿Qué métodos de pago aceptáis y cómo funciona la devolución?',
    answer: 'Puedes abonar tu pedido con total seguridad mediante Bizum instantáneo, tarjeta de crédito/débito (Visa, Mastercard a través de pasarela cifrada SSL 256-bit Redsys) o PayPal. Si algún artículo llega con incidencias o no cumple tus expectativas, dispones de 14 días naturales de garantía de devolución según la legislación europea de consumo.'
  }
];

export const FAQSection: React.FC<FAQSectionProps> = ({ 
  language: _language = 'es',
  faqs
}) => {
  const currentFaqs = faqs || DEFAULT_FAQS;
  const [openId, setOpenId] = useState<string | null>(currentFaqs[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section 
      id="preguntas-frecuentes"
      aria-label="Preguntas Frecuentes del Taller Martenscrap"
      className="py-16 sm:py-20 bg-stone-100/60 border-t border-stone-200/80 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-[#9333EA] text-xs font-bold border border-purple-200/60 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Resolvemos tus dudas</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Preguntas Frecuentes del <span className="text-iridescent">Taller Artesano</span>
          </h2>
          
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
            Todo lo que necesitas saber sobre envíos, materiales de impresión 3D, cuidados y encargos personalizados.
          </p>
        </div>

        {/* Trust Mini Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
            <Truck className="w-4 h-4 text-[#9333EA] shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-black text-stone-900 leading-tight">Envío 24-48h</p>
              <p className="text-[10px] text-stone-500">Gratis desde 45 €</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-black text-stone-900 leading-tight">Garantía 14 Días</p>
              <p className="text-[10px] text-stone-500">Devolución fácil</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
            <PackageCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-black text-stone-900 leading-tight">Empaquetado Mimo</p>
              <p className="text-[10px] text-stone-500">Listo para regalo</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
            <HeartHandshake className="w-4 h-4 text-rose-500 shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-black text-stone-900 leading-tight">Trato Directo</p>
              <p className="text-[10px] text-stone-500">Con Marta Pastor</p>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {currentFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-[#9333EA]/40 shadow-md ring-1 ring-purple-100' 
                    : 'bg-white/80 hover:bg-white border-stone-200/80 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#9333EA]/30"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-stone-900 flex items-center gap-2.5">
                    <Sparkles className={`w-3.5 h-3.5 shrink-0 ${isOpen ? 'text-[#9333EA]' : 'text-stone-400'}`} />
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-stone-100 text-stone-500 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-purple-50 text-[#9333EA]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in duration-200"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
