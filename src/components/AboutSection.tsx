import React from 'react';
import { Sparkles, Feather, Scissors } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="quienes-somos" className="py-16 lg:py-24 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-amber-100">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80"
                alt="Espacio creativo de Marta Pastor Escribano"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  El Estudio • Marta Pastor Escribano
                </span>
                <p className="font-display font-black text-xl mt-1">
                  Donde la tinta y el papel cobran vida
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-white shadow-xl border border-stone-200 hidden sm:flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-[#9333EA] flex items-center justify-center font-black">
                ★
              </div>
              <div>
                <span className="text-xs font-black text-stone-900 block leading-tight">+10.000 marcapáginas</span>
                <span className="text-[11px] text-stone-500">en bibliotecas de toda España</span>
              </div>
            </div>
          </div>

          {/* Right: Storytelling */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#9333EA] text-xs font-bold">
              <Feather className="w-3.5 h-3.5" />
              Nuestra Historia & Filosofía
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
              Diseños propios nacidos de la devoción por la <span className="text-iridescent">lectura y el arte manual</span>.
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Detrás de <strong>Martenscrap</strong> está Marta Pastor Escribano, ilustradora y creadora de la marca. Lo que comenzó como un pequeño rincón de papelería creativa se ha convertido en la tienda de referencia para miles de lectores que buscan acompañar sus historias favoritas con marcapáginas magnéticos, papelería Legami y figuras 3D coleccionables.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-3">
                <Scissors className="w-5 h-5 text-[#9333EA] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-stone-900">Corte & Ensamblado Propio</h3>
                  <p className="text-[11px] text-stone-500 mt-1">Cada marcapáginas se troquela, lamina e imanta a mano individualmente.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-stone-900">Imanes de Calidad Neodimio</h3>
                  <p className="text-[11px] text-stone-500 mt-1">Sujeción magnética suave que no pellizca ni rasga el gramaje de las hojas.</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed italic border-l-2 border-[#9333EA] pl-4">
              «Creemos que un libro merece ser guardado con el mismo mimo y cariño con el que fue escrito. Cada chibi, standee y marcapáginas lleva una pizca de esa magia.»
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
