import React, { useState, useEffect } from 'react';
import type { CartItem, Product } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  Truck, 
  Gift, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard,
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound, playMagneticSnapSound } from '../utils/audio';
import { PRODUCTS } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onAddToCart?: (product: Product, customText?: string, variation?: string, quantity?: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddToCart
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Gift Wrap option
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Order Confirmation Screen (Replaces window.alert)
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    totalAmount: number;
    itemsCount: number;
    deliveryEstimate: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setConfirmedOrder(null);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 45.0;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const giftWrapCost = isGiftWrap ? 1.50 : 0;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 3.95;
  const discountAmount = subtotal * appliedDiscount;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + giftWrapCost);

  // Cross-selling recommendations (< 10 € and not already in the cart)
  const cartProductIds = new Set(items.map(i => i.product.id));
  const crossSellCandidates = PRODUCTS.filter(
    p => !cartProductIds.has(p.id) && p.price <= 10.0 && p.inStock
  ).slice(0, 3);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'BOOKTOK10' || clean === 'MARTA10') {
      setAppliedDiscount(0.10);
      setCouponSuccess('¡Cupón del 10% aplicado con éxito!');
      setCouponError(null);
      playPopSound();
    } else if (clean === 'ENVIOGRATIS') {
      setAppliedDiscount(0.05);
      setCouponSuccess('¡Descuento promocional aplicado!');
      setCouponError(null);
      playPopSound();
    } else {
      setCouponError('Cupón no válido o caducado (Prueba con BOOKTOK10)');
      setCouponSuccess(null);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    playMagneticSnapSound();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });

    const now = new Date();
    const estStart = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    const estEnd = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    const deliveryString = `${estStart.toLocaleDateString('es-ES', options)} - ${estEnd.toLocaleDateString('es-ES', options)}`;

    setTimeout(() => {
      setConfirmedOrder({
        orderNumber: `#MS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        totalAmount: total,
        itemsCount: items.reduce((acc, i) => acc + i.quantity, 0),
        deliveryEstimate: deliveryString
      });
      onClearCart();
      setIsCheckingOut(false);
    }, 900);
  };

  const handleAddCrossSell = (prod: Product) => {
    playPopSound();
    if (onAddToCart) {
      onAddToCart(prod);
    }
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg h-full bg-[#FAF8F5] border-l border-stone-200 shadow-2xl flex flex-col justify-between p-5 sm:p-6 overflow-hidden">
        
        {/* If order is confirmed: Show real celebratory confirmation screen */}
        {confirmedOrder ? (
          <div className="flex-1 flex flex-col justify-between py-6 px-2 text-center animate-in zoom-in-95 duration-300">
            <div className="space-y-4 my-auto">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  ¡Pedido Confirmado con Éxito!
                </span>
                <h3 className="font-display font-black text-2xl text-stone-900 pt-1">
                  ¡Gracias por tu pedido!
                </h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Marta Pastor ya ha recibido tu encargo y comienza a prepararlo con mimo para enviártelo cuanto antes.
                </p>
              </div>

              {/* Order Details Card */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 text-left space-y-2.5 text-xs shadow-xs">
                <div className="flex justify-between items-center pb-2 border-b border-stone-100 font-bold">
                  <span className="text-stone-500">Número de Pedido:</span>
                  <span className="text-[#9333EA] font-mono font-black">{confirmedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center text-stone-600">
                  <span>Artículos:</span>
                  <span className="font-bold text-stone-800">{confirmedOrder.itemsCount} piezas</span>
                </div>
                <div className="flex justify-between items-center text-stone-600">
                  <span>Importe Total:</span>
                  <span className="font-black text-stone-900">{confirmedOrder.totalAmount.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center text-stone-600 pt-1 border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Entrega Estimada:</span>
                  </span>
                  <span className="font-bold text-emerald-700 capitalize">{confirmedOrder.deliveryEstimate}</span>
                </div>
                {isGiftWrap && (
                  <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 shrink-0" />
                    <span>Incluye empaquetado para regalo con tarjeta manuscrita.</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-stone-400">
                Hemos enviado un correo de confirmación con el enlace de seguimiento a tu email.
              </p>
            </div>

            <button
              onClick={() => {
                setConfirmedOrder(null);
                onClose();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-xs sm:text-sm font-extrabold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continuar explorando la tienda</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Normal Cart View Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-stone-200 shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#9333EA]" />
                <h3 id="cart-drawer-title" className="font-display font-black text-lg text-stone-900">
                  Tu Cesta de Lecturas
                </h3>
                <span className="text-xs font-bold text-stone-400">
                  ({items.reduce((acc, i) => acc + i.quantity, 0)})
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Cerrar cesta de la compra"
                className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Free Shipping Progress Alert */}
            <div className="py-2.5 px-3.5 my-2.5 rounded-2xl bg-white border border-stone-200 shadow-xs shrink-0">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-stone-700">
                  <Truck className="w-4 h-4 text-[#9333EA]" />
                  {missingForFreeShipping === 0
                    ? '🎉 ¡Tienes ENVÍO GRATIS asegurado!'
                    : `Añade ${missingForFreeShipping.toFixed(2)} € para ENVÍO GRATIS`}
                </span>
                <span className="text-stone-400">{progressPercent.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#9333EA] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto space-y-3 py-1 pr-1">
              {items.length > 0 ? (
                <>
                  {items.map((item, index) => (
                    <div
                      key={`${item.product.id}-${index}`}
                      className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-3"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-16 w-16 object-cover rounded-xl shrink-0 border border-stone-100"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        {item.selectedVariation && (
                          <span className="text-[10px] text-stone-500 block truncate">
                            Modelo: {item.selectedVariation}
                          </span>
                        )}
                        {item.customText && (
                          <span className="text-[10px] text-[#9333EA] font-semibold block truncate">
                            Texto: "{item.customText}"
                          </span>
                        )}
                        <span className="text-xs font-black text-stone-900 mt-1 block">
                          {(item.product.price * item.quantity).toFixed(2)} €
                        </span>
                      </div>

                      {/* Accessible Quantity Controls (40px min touch targets) */}
                      <div className="flex flex-col items-end gap-1.5">
                        <button
                          onClick={() => onRemoveItem(index)}
                          aria-label={`Eliminar ${item.product.name} de la cesta`}
                          className="p-1 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                            aria-label={`Reducir cantidad de ${item.product.name}`}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-lg text-stone-600 cursor-pointer transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-black">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            aria-label={`Aumentar cantidad de ${item.product.name}`}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-lg text-stone-600 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* CROSS-SELLING MODULE: "Completa tu pedido para envío gratis" */}
                  {crossSellCandidates.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 mt-2 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#9333EA]" />
                          Completa tu pedido y ahorra el envío
                        </span>
                        <span className="text-[10px] text-purple-700 font-bold">Desde 2.95 €</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {crossSellCandidates.map((prod) => (
                          <div 
                            key={prod.id}
                            className="p-2 rounded-xl bg-white border border-purple-100 flex flex-col justify-between text-left shadow-xs hover:border-purple-300 transition-all"
                          >
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-full h-14 object-cover rounded-lg mb-1.5"
                            />
                            <p className="text-[10px] font-bold text-stone-800 line-clamp-1 leading-tight">
                              {prod.name}
                            </p>
                            <div className="flex items-center justify-between mt-1 pt-1 border-t border-stone-100">
                              <span className="text-[10px] font-black text-purple-900">
                                {prod.price.toFixed(2)} €
                              </span>
                              <button
                                onClick={() => handleAddCrossSell(prod)}
                                aria-label={`Añadir ${prod.name} al carrito`}
                                className="p-1 rounded-md bg-stone-900 hover:bg-[#9333EA] text-white text-[10px] font-bold transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GIFT WRAP OPTION */}
                  <div className="p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-2">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isGiftWrap}
                        onChange={(e) => setIsGiftWrap(e.target.checked)}
                        className="w-4 h-4 rounded text-[#9333EA] focus:ring-purple-400 cursor-pointer"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          <Gift className="w-3.5 h-3.5 text-amber-600" />
                          ¿Es para regalo? (+1.50 €)
                        </span>
                        <span className="text-[10px] text-stone-500 block leading-tight">
                          Empaquetado especial con papel craft, lazo y tarjeta manuscrita
                        </span>
                      </div>
                    </label>

                    {isGiftWrap && (
                      <div className="pt-1 animate-in fade-in duration-200">
                        <textarea
                          placeholder="Escribe aquí tu dedicatoria para la tarjeta manuscrita..."
                          value={giftNote}
                          onChange={(e) => setGiftNote(e.target.value)}
                          rows={2}
                          className="w-full p-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#9333EA] bg-stone-50/50"
                        />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <div className="h-16 w-16 mx-auto rounded-full bg-purple-50 text-[#9333EA] flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-stone-800">Tu cesta está vacía</p>
                  <p className="text-xs text-stone-500">
                    Añade tus marcapáginas o standees favoritos para comenzar.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="pt-3 border-t border-stone-200 space-y-2.5 shrink-0">
                
                {/* Promo Code Form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cupón (ej. BOOKTOK10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-stone-300 text-xs uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-[#9333EA] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Aplicar
                  </button>
                </form>

                {couponError && <p className="text-[11px] text-red-500 font-medium">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-600 font-medium">{couponSuccess}</p>}

                {/* Calculations */}
                <div className="space-y-1 text-xs text-stone-600 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Descuento aplicado</span>
                      <span>-{discountAmount.toFixed(2)} €</span>
                    </div>
                  )}
                  {isGiftWrap && (
                    <div className="flex justify-between text-amber-700 font-semibold">
                      <span>Envoltorio de regalo</span>
                      <span>+1.50 €</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Envío estimado</span>
                    <span>{shippingCost === 0 ? 'Gratis' : `${shippingCost.toFixed(2)} €`}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-stone-900 pt-1.5 border-t border-stone-200">
                    <span>Total a pagar</span>
                    <span className="text-[#9333EA]">{total.toFixed(2)} €</span>
                  </div>
                </div>

                {/* Secure Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#1C1917] hover:bg-[#9333EA] text-white text-sm font-extrabold shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  {isCheckingOut ? 'Tramitando con Pasarela Segura...' : `Finalizar Compra • ${total.toFixed(2)} €`}
                </button>

                {/* OFFICIAL TRUST & SECURITY BADGES */}
                <div className="pt-2 border-t border-stone-200/80 space-y-1.5">
                  <div className="flex items-center justify-center gap-3 text-stone-500 text-[10px] font-bold">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600" /> SSL 256-Bit
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-3 h-3 text-blue-600" /> Bizum / Redsys
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-purple-600" /> 14 Días Devolución
                    </span>
                  </div>
                  <p className="text-[10px] text-center text-stone-400">
                    Marta Pastor Escribano • Tienda oficial Martenscrap
                  </p>
                </div>

              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
