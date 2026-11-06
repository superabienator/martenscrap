import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Box, CheckCircle2 } from 'lucide-react';

interface Asset3DStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCustomTexture: (textureUrl: string, modelType: 'bookmark' | 'standee' | 'clicker' | 'dragon') => void;
}

export const Asset3DStudioModal: React.FC<Asset3DStudioModalProps> = ({
  isOpen,
  onClose,
  onApplyCustomTexture
}) => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'simulator'>('workflow');
  const [selectedType, setSelectedType] = useState<'bookmark' | 'standee' | 'clicker' | 'dragon'>('bookmark');
  const [previewName, setPreviewName] = useState<string | null>(null);
  const currentObjectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (currentObjectUrlRef.current) {
        URL.revokeObjectURL(currentObjectUrlRef.current);
      }
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Strict validation [SEC-04]
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(file.type)) {
      alert('Solo se admiten texturas en formato JPG, PNG o WebP.');
      return;
    }
    if (file.size > maxSizeBytes) {
      alert('El archivo excede el tamaño máximo permitido (5 MB).');
      return;
    }

    if (currentObjectUrlRef.current) {
      URL.revokeObjectURL(currentObjectUrlRef.current);
    }

    setPreviewName(file.name);
    const objectUrl = URL.createObjectURL(file);
    currentObjectUrlRef.current = objectUrl;
    onApplyCustomTexture(objectUrl, selectedType);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="studio-3d-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FAF8F5] border border-stone-200 shadow-2xl p-6 sm:p-8 living-border">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar estudio 3D"
          className="absolute top-6 right-6 p-2 rounded-full bg-white text-stone-600 hover:text-stone-900 shadow-sm transition-all hover:scale-105 z-10 cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#9333EA] text-xs font-bold">
            <Box className="w-3.5 h-3.5" />
            Flujo de Publicación & Laboratorio 3D
          </div>
          <h2 id="studio-3d-title" className="font-display text-2xl sm:text-3xl font-black text-stone-900">
            ¿Cómo se suben y gestionan los <span className="text-iridescent">artículos 3D</span>?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Explicación para el cliente y simulador en vivo para probar texturas y modelos directamente en el visor WebGL.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-stone-200/60 rounded-2xl mb-6 w-fit">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'workflow'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            📋 El Flujo en WordPress / WooCommerce
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'simulator'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🧪 Simulador de Carga 3D
          </button>
        </div>

        {activeTab === 'workflow' ? (
          <div className="space-y-6">
            
            {/* 3 Simple Steps for Marta / Store Admin */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="h-9 w-9 rounded-xl bg-purple-100 text-[#9333EA] font-black flex items-center justify-center text-sm">
                  1
                </div>
                <h4 className="font-bold text-sm text-stone-900">El Archivo 3D (.GLB)</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  El formato estándar web es <strong>.GLB</strong> (el equivalente al JPEG en 3D: ultra-ligero, comprimido, con colores y animación de apertura).
                </p>
                <div className="text-[11px] bg-purple-50 text-purple-900 p-2.5 rounded-xl font-medium">
                  💡 Si usas Nomad Sculpt, Blender o archivos de impresión 3D (.STL / .OBJ), se exportan a .GLB en 1 solo clic.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-700 font-black flex items-center justify-center text-sm">
                  2
                </div>
                <h4 className="font-bold text-sm text-stone-900">Subida en WooCommerce</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  En el panel de WordPress, al crear un producto, aparece un campo simple: <strong>"Archivo 3D / GLB"</strong>. Marta solo arrastra el archivo igual que sube una foto.
                </p>
                <div className="text-[11px] bg-amber-50 text-amber-900 p-2.5 rounded-xl font-medium">
                  ✅ Sin tocar código: la web detecta el campo y activa el botón de inspección 3D automáticamente en la tienda.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm">
                  3
                </div>
                <h4 className="font-bold text-sm text-stone-900">Modo Auto-Generado (2D a 3D)</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  ¿Y si tienes 300 marcapáginas y no tienes tiempo de modelar todos en 3D?
                </p>
                <div className="text-[11px] bg-emerald-50 text-emerald-900 p-2.5 rounded-xl font-medium">
                  🚀 <strong>Modo Procedural:</strong> El sistema crea la bisagra y el imán en 3D automáticamente usando la foto frontal del producto.
                </div>
              </div>

            </div>

            {/* Architecture Schema Card */}
            <div className="p-5 rounded-2xl bg-[#1C1917] text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Esquema Técnico para la Presentación
                </span>
                <span className="text-[11px] text-stone-400">Three.js + GLTFLoader</span>
              </div>
              <div className="text-xs font-mono bg-stone-900 p-3.5 rounded-xl text-stone-300 leading-relaxed overflow-x-auto">
                {`[Panel WordPress / WooCommerce]
     │
     ├── 1. Marta sube "dragón-cristal.glb" (o foto del marcapáginas)
     │
     ├── 2. WooCommerce REST API entrega: { id: "p101", model3d_url: "/uploads/dragon.glb" }
     │
     └── 3. Frontend Next.js / React -> Three.js GLTFLoader renderiza el modelo en 360°`}
              </div>
            </div>

          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white border border-stone-200">
              <label className="text-xs font-bold text-stone-800 block mb-2">
                Paso 1: Elige qué tipo de objeto quieres simular
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'bookmark', title: '🧲 Marcapáginas' },
                  { id: 'dragon', title: '🐉 Dragón 3D' },
                  { id: 'clicker', title: '🔘 Clicker Fidget' },
                  { id: 'standee', title: '✨ Standee Acrílico' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id as any)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      selectedType === type.id
                        ? 'border-[#9333EA] bg-purple-50 text-[#9333EA] shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-700'
                    }`}
                  >
                    {type.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Dropzone */}
            <div className="p-8 rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50/40 text-center relative hover:bg-purple-50 transition-colors">
              <input
                type="file"
                accept="image/*,.glb"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-8 h-8 text-[#9333EA] mx-auto mb-2" />
              <h4 className="text-sm font-bold text-stone-900">
                Arrastra una imagen (PNG/JPG) o archivo 3D (.GLB)
              </h4>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                El sistema aplicará la textura inmediatamente en el visor 3D para que veas el resultado.
              </p>
              {previewName && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Archivo cargado: {previewName}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-[#9333EA] transition-colors"
              >
                Ver en el Laboratorio 3D
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
