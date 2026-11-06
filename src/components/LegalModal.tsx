import React, { useEffect } from 'react';
import { X, ShieldCheck, Scale, Cookie, FileText } from 'lucide-react';

export type LegalTabType = 'aviso' | 'privacidad' | 'cookies' | 'terminos';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTabType;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'aviso'
}) => {
  const [activeTab, setActiveTab] = React.useState<LegalTabType>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-[#FAF8F5] border border-stone-200 shadow-2xl p-6 sm:p-8 overflow-hidden living-border">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar ventana de información legal"
          className="absolute top-6 right-6 p-2 rounded-full bg-white text-stone-600 hover:text-stone-900 shadow-sm transition-all hover:scale-105 z-10 cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#9333EA] text-xs font-bold mb-2">
            <Scale className="w-3.5 h-3.5" />
            Marco Normativo & Transparencia (LSSI-CE & RGPD)
          </div>
          <h2 id="legal-modal-title" className="font-display text-2xl sm:text-3xl font-black text-stone-900">
            Información Legal y <span className="text-iridescent">Protección al Consumidor</span>
          </h2>
        </div>

        {/* Tab selection */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-stone-200 shrink-0">
          {[
            { id: 'aviso', label: 'Aviso Legal (LSSI-CE)', icon: Scale },
            { id: 'privacidad', label: 'Política de Privacidad (RGPD)', icon: ShieldCheck },
            { id: 'cookies', label: 'Política de Cookies', icon: Cookie },
            { id: 'terminos', label: 'Términos y Desistimiento 14D', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as LegalTabType)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto py-4 text-xs sm:text-sm text-stone-600 space-y-4 pr-2">
          {activeTab === 'aviso' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h3 className="font-bold text-stone-900 text-base">Aviso Legal y Datos Identificativos (Art. 10 LSSI-CE)</h3>
              <p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Titular:</strong> Marta Pastor Escribano</li>
                <li><strong>Nombre Comercial:</strong> Martenscrap</li>
                <li><strong>Actividad:</strong> Creación de papelería artesanal, marcapáginas magnéticos y figuras de colección 3D.</li>
                <li><strong>Domicilio Social:</strong> Valencia, España</li>
                <li><strong>Contacto Electrónico:</strong> hola@martenscrap.com</li>
              </ul>
              <p>El acceso y uso de este portal confiere la condición de USUARIO, que acepta desde dicho acceso las presentes condiciones de uso.</p>
            </div>
          )}

          {activeTab === 'privacidad' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h3 className="font-bold text-stone-900 text-base">Política de Privacidad y Protección de Datos (RGPD UE 2016/679)</h3>
              <p>Martenscrap garantiza la protección de todos los datos de carácter personal que el usuario proporcione a través de sus formularios:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Responsable del Tratamiento:</strong> Marta Pastor Escribano.</li>
                <li><strong>Finalidad del Tratamiento:</strong> Tramitación de pedidos, atención de dudas en formularios de contacto y envío de actualizaciones de encargos autorizados.</li>
                <li><strong>Legitimación:</strong> Consentimiento libre, específico, informado e inequívoco del interesado (Art. 6.1.a RGPD).</li>
                <li><strong>Destinatarios:</strong> Empresas de paquetería (Correos, SEUR, GLS) para la entrega efectiva de compras físicas. No se ceden datos a terceros para publicidad ni transferencias internacionales fuera de la UE.</li>
                <li><strong>Derechos:</strong> Acceso, rectificación, supresión, oposición, limitación y portabilidad dirigiendo correo electrónico a <em>hola@martenscrap.com</em>.</li>
              </ul>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h3 className="font-bold text-stone-900 text-base">Política de Cookies (Art. 22.2 LSSI-CE)</h3>
              <p>Este sitio web utiliza cookies técnicas indispensables para el funcionamiento de la cesta de la compra y la memorización del modo visual seleccionado (tema claro / modo vela):</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Cookies Técnicas / Esenciales:</strong> Almacenan el estado local del carrito y no recopilan identificadores personales persistentes.</li>
                <li><strong>Cookies Analíticas / Publicitarias:</strong> Este prototipo no implementa píxeles de seguimiento ni rastreo invasivo de terceros.</li>
              </ul>
              <p>El usuario puede revocar o configurar el almacenamiento de cookies en cualquier momento a través de los ajustes de su navegador web.</p>
            </div>
          )}

          {activeTab === 'terminos' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h3 className="font-bold text-stone-900 text-base">Condiciones de Contratación & Derecho de Desistimiento</h3>
              <p>Conforme al Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Derecho de Desistimiento:</strong> El comprador dispone de un plazo legal de <strong>14 días naturales</strong> desde la recepción del producto para devolverlo sin necesidad de justificación, recibiendo el reembolso completo del importe abonado.</li>
                <li><strong>Excepciones (Art. 103 RDL 1/2007):</strong> Artículos confeccionados conforme a las especificaciones del consumidor o claramente personalizados (e.g. marcapáginas con nombres grabados a medida).</li>
                <li><strong>Plazos de Envío:</strong> Envíos a península en 24/72 horas laborales mediante mensajería certificada.</li>
                <li><strong>Garantía Legal:</strong> Garantía de conformidad de 3 años conforme a la normativa española de consumo.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-[#9333EA] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Entendido y Aceptar
          </button>
        </div>

      </div>
    </div>
  );
};
