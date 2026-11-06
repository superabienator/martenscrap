import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'duda',
    message: ''
  });
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Anti-bot honeypot
    if (!acceptedPrivacy) return;

    // Sanitize and trim
    const cleanName = formData.name.trim().slice(0, 80);
    const cleanEmail = formData.email.trim().slice(0, 100);
    const cleanMessage = formData.message.trim().slice(0, 1000);

    if (!cleanName || !cleanEmail || !cleanMessage) return;

    playPopSound();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-12 sm:py-16 lg:py-24 border-t border-stone-200/80 bg-stone-50/50 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#9333EA] text-xs font-bold">
              <MessageCircle className="w-3.5 h-3.5" />
              Estamos aquí para ayudarte
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
              ¿Tienes una duda o quieres un <span className="text-iridescent">encargo personalizado</span>?
            </h2>

            <p className="text-sm text-stone-600 leading-relaxed">
              Realizamos marcapáginas y complementos personalizados para eventos, clubes de lectura, autores independientes, bodas y comuniones. Escríbenos y te responderemos en menos de 24 horas.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="p-2.5 rounded-xl bg-purple-50 text-[#9333EA]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Email directo</span>
                  <a href="mailto:info@martenscrap.com" className="text-sm font-bold text-stone-900 hover:text-[#9333EA] transition-colors">
                    info@martenscrap.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Atención al cliente</span>
                  <span className="text-sm font-bold text-stone-900">Lunes a Viernes de 09:30 a 19:30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-stone-900">
                    ¡Mensaje recibido con éxito!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Gracias por escribir a Martenscrap. Marta o nuestro equipo se pondrán en contacto contigo muy pronto a través de tu email.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', type: 'duda', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-[#9333EA] transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for bot mitigation [SEC-03] */}
                  <input
                    type="text"
                    name="contact_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    className="hidden"
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="text-xs font-bold text-stone-700 block mb-1">
                        Tu nombre *
                      </label>
                      <input
                        id="contact-name"
                        required
                        type="text"
                        maxLength={80}
                        placeholder="Ej: Lucía Martínez"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="text-xs font-bold text-stone-700 block mb-1">
                        Tu correo electrónico *
                      </label>
                      <input
                        id="contact-email"
                        required
                        type="email"
                        maxLength={100}
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-type" className="text-xs font-bold text-stone-700 block mb-1">
                      Tipo de consulta
                    </label>
                    <select
                      id="contact-type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                    >
                      <option value="duda">Duda sobre un pedido o envío</option>
                      <option value="personalizado">Encargo personalizado (bodas, eventos, clubes de lectura)</option>
                      <option value="tienda">Distribución en tienda o librería física</option>
                      <option value="sugerencia">Sugerencia de nuevo fandom / personaje</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-xs font-bold text-stone-700 block mb-1">
                      ¿En qué podemos ayudarte? *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      maxLength={1000}
                      rows={4}
                      placeholder="Cuéntanos los detalles de lo que necesitas..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                    />
                  </div>

                  {/* RGPD Consent Checkbox & Layer 1 Information [LEGAL-03] */}
                  <div className="space-y-2 pt-1">
                    <label className="flex items-start gap-2 cursor-pointer text-xs text-stone-600">
                      <input
                        id="contact-rgpd"
                        type="checkbox"
                        required
                        checked={acceptedPrivacy}
                        onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                        className="mt-0.5 rounded border-stone-300 text-[#9333EA] focus:ring-[#9333EA]"
                      />
                      <span>
                        He leído y acepto la <span className="font-bold text-[#9333EA] underline">Política de Privacidad</span> para el tratamiento de mis datos personales en esta consulta. *
                      </span>
                    </label>
                    
                    <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-[10px] text-stone-500 leading-normal">
                      <strong>Información Básica de Protección de Datos (RGPD):</strong> Responsable: Marta Pastor Escribano. Finalidad: Responder y gestionar consultas y presupuestos. Legitimación: Consentimiento expreso del interesado. Derechos: Acceso, rectificación, supresión y oposición en hola@martenscrap.com.
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!acceptedPrivacy}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-sm font-extrabold shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
