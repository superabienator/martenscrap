import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phoneNumber = '34600000000',
  defaultMessage = '¡Hola Marta! He visto tu tienda Martenscrap y me gustaría consultarte una duda sobre un producto de la tienda.'
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 select-none">
      {/* Friendly Tooltip Pill */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-stone-800 text-xs font-bold shadow-lg animate-in fade-in slide-in-from-right-4 duration-300">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>¿Dudas? Habla con Marta</span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Cerrar sugerencia de WhatsApp"
            className="p-0.5 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp con Marta Pastor de Martenscrap"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_8px_25px_rgba(16,185,129,0.38)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.48)] transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300/50"
      >
        <MessageCircle className="w-6 h-6 fill-current transition-transform duration-300 group-hover:rotate-6" />
        
        {/* Subtle Online Notification Ping */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white" />
        </span>
      </a>
    </div>
  );
};
