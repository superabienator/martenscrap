import React, { useState, useEffect } from 'react';
import { X, User, Lock, Mail, ArrowRight, CheckCircle2, Eye, EyeOff, LogOut, Package } from 'lucide-react';
import { playPopSound } from '../utils/audio';

export interface UserProfile {
  name: string;
  email: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onOpenOrders?: () => void;
  onOpenLegal?: (tab: 'aviso' | 'privacidad' | 'cookies' | 'terminos') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  onOpenLegal
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFeedbackMsg(null);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detection

    playPopSound();

    if (mode === 'login') {
      const cleanEmail = email.trim();
      if (!cleanEmail || !password) return;
      onLogin({
        name: cleanEmail.split('@')[0],
        email: cleanEmail
      });
      onClose();
    } else if (mode === 'register') {
      if (!acceptedTerms) return;
      const cleanName = name.trim().slice(0, 80);
      const cleanEmail = email.trim().slice(0, 100);
      if (!cleanName || !cleanEmail || !password) return;
      onLogin({
        name: cleanName,
        email: cleanEmail
      });
      onClose();
    } else if (mode === 'forgot') {
      setFeedbackMsg('Te hemos enviado un enlace de recuperación seguro a tu correo electrónico.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-[#FAF8F5] border border-stone-200 shadow-2xl p-6 sm:p-8 living-border overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar ventana de cuenta"
          className="absolute top-6 right-6 p-2 rounded-full bg-white text-stone-600 hover:text-stone-900 shadow-sm transition-all hover:scale-105 z-10 cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* LOGGED IN USER PROFILE VIEW */}
        {currentUser ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-[#9333EA] to-[#E0A96D] flex items-center justify-center text-white font-black text-2xl shadow-md">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 id="auth-modal-title" className="font-display font-black text-xl text-stone-900">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {currentUser.email}
                </p>
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Cliente Verificado
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                <span className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#9333EA]" />
                  Mis Pedidos Activos
                </span>
                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-[#9333EA]">1 en preparación</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Pedido #MS-2026-894 • Dragón Articulado 3D + 2 Marcapáginas Magnéticos. Entrega estimada en 48h.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onLogout();
                  setFeedbackMsg(null);
                }}
                className="w-full py-3 px-4 rounded-xl border border-stone-200 bg-white hover:bg-red-50 hover:border-red-200 text-red-600 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        ) : (
          /* GUEST / AUTH FORMS VIEW */
          <div>
            {/* Header */}
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#9333EA] text-xs font-bold">
                <User className="w-3.5 h-3.5" />
                Área de Clientes Martenscrap
              </div>
              <h2 id="auth-modal-title" className="font-display text-2xl font-black text-stone-900 pt-1">
                {mode === 'login' && 'Iniciar Sesión'}
                {mode === 'register' && 'Crear Nueva Cuenta'}
                {mode === 'forgot' && 'Recuperar Contraseña'}
              </h2>
              <p className="text-xs text-stone-500">
                {mode === 'login' && 'Accede a tus pedidos, direcciones de envío y lista de deseos guardada.'}
                {mode === 'register' && 'Únete a nuestra comunidad de lectores y consigue un 10% de bienvenida.'}
                {mode === 'forgot' && 'Introduce tu email y te enviaremos un enlace para restablecer tu clave.'}
              </p>
            </div>

            {feedbackMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-3">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Solicitud tramitada</span>
                </div>
                <p>{feedbackMsg}</p>
                <button
                  onClick={() => {
                    setFeedbackMsg(null);
                    setMode('login');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Volver al inicio de sesión
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for anti-bot mitigation [SEC-03] */}
                <input
                  type="text"
                  name="auth_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  className="hidden"
                  autoComplete="off"
                  aria-hidden="true"
                />

                {mode === 'register' && (
                  <div>
                    <label htmlFor="auth-name" className="text-xs font-bold text-stone-700 block mb-1">
                      Nombre y Apellidos *
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3.5 w-4 h-4 text-stone-400" />
                      <input
                        id="auth-name"
                        required
                        type="text"
                        maxLength={80}
                        placeholder="Ej: Lucía Martínez"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="auth-email" className="text-xs font-bold text-stone-700 block mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 w-4 h-4 text-stone-400" />
                    <input
                      id="auth-email"
                      required
                      type="email"
                      maxLength={100}
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="auth-password" className="text-xs font-bold text-stone-700">
                        Contraseña *
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-[11px] font-bold text-[#9333EA] hover:underline cursor-pointer"
                        >
                          ¿La olvidaste?
                        </button>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3.5 w-4 h-4 text-stone-400" />
                      <input
                        id="auth-password"
                        required
                        type={showPassword ? 'text' : 'password'}
                        minLength={6}
                        maxLength={60}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                        className="absolute right-3 text-stone-400 hover:text-stone-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* RGPD Acceptance Checkbox on Registration [LEGAL compliance] */}
                {mode === 'register' && (
                  <div className="space-y-2 pt-1">
                    <label className="flex items-start gap-2 cursor-pointer text-[11px] text-stone-600">
                      <input
                        id="auth-rgpd"
                        type="checkbox"
                        required
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-0.5 rounded border-stone-300 text-[#9333EA] focus:ring-[#9333EA]"
                      />
                      <span>
                        He leído y acepto la{' '}
                        <button
                          type="button"
                          onClick={() => onOpenLegal?.('privacidad')}
                          className="font-bold text-[#9333EA] underline cursor-pointer"
                        >
                          Política de Privacidad
                        </button>{' '}
                        y las condiciones de usuario. *
                      </span>
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={mode === 'register' && !acceptedTerms}
                  className="w-full py-3 px-6 rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-xs font-black shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>
                    {mode === 'login' && 'Entrar a mi cuenta'}
                    {mode === 'register' && 'Crear cuenta de cliente'}
                    {mode === 'forgot' && 'Enviar enlace de recuperación'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Switch Mode Links */}
            <div className="mt-6 pt-4 border-t border-stone-200 text-center text-xs text-stone-600">
              {mode === 'login' ? (
                <p>
                  ¿Aún no tienes cuenta?{' '}
                  <button
                    onClick={() => {
                      setMode('register');
                      setFeedbackMsg(null);
                    }}
                    className="font-bold text-[#9333EA] hover:underline cursor-pointer"
                  >
                    Regístrate aquí
                  </button>
                </p>
              ) : (
                <p>
                  ¿Ya tienes cuenta?{' '}
                  <button
                    onClick={() => {
                      setMode('login');
                      setFeedbackMsg(null);
                    }}
                    className="font-bold text-[#9333EA] hover:underline cursor-pointer"
                  >
                    Inicia sesión
                  </button>
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
