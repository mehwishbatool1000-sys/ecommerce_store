import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ArrowRight, ShoppingBag, Tag, Check, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
    setIsCheckoutOpen,
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 20000;
  const isFreeDelivery = cartSubtotal >= freeDeliveryThreshold;
  const deliveryFee = cart.length === 0 ? 0 : isFreeDelivery ? 0 : 450;
  const totalAmount = Math.max(0, cartSubtotal - appliedDiscount + deliveryFee);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(amount).replace('PKR', 'Rs.');
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'ZAHRA10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedDiscount(discount);
      setPromoMessage('10% VIP Atelier discount applied!');
    } else if (code === 'EID2026') {
      const discount = Math.min(2000, cartSubtotal);
      setAppliedDiscount(discount);
      setPromoMessage('Rs. 2,000 festive voucher applied!');
    } else {
      setPromoMessage('Invalid promo code. Try ZAHRA10 or EID2026');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h2 className="font-serif text-xl text-stone-900 font-medium">Your Shopping Bag</h2>
            <span className="text-xs text-stone-500 font-mono">({cart.length} items)</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-stone-50 px-5 py-2.5 border-b border-stone-200">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-stone-600 font-medium">
              {isFreeDelivery
                ? '✨ Complimentary Express Shipping Unlocked!'
                : `Add ${formatPrice(freeDeliveryThreshold - cartSubtotal)} more for Free Shipping`}
            </span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-stone-900 h-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <ShoppingBag className="w-12 h-12 text-stone-300 mb-3 stroke-1" />
              <p className="font-serif text-lg text-stone-800 mb-1">Your bag is empty</p>
              <p className="text-xs text-stone-500 mb-6 max-w-xs">
                Explore our curated bridal couture, luxury lawn, and prêt silhouettes.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 pb-4 border-b border-stone-100 last:border-0"
              >
                {/* Image */}
                <div className="w-20 h-24 bg-stone-100 shrink-0 rounded-xs overflow-hidden">
                  <img
                    src={item.dress.images[0]}
                    alt={item.dress.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-sm font-medium text-stone-900 line-clamp-1">
                        {item.dress.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-stone-500 mt-0.5 flex flex-wrap gap-1 items-center">
                      <span>Size: {item.selectedSize}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate max-w-[140px]">{item.stitchingOption}</span>
                    </div>

                    <div className="text-xs font-semibold text-stone-950 font-mono tabular-nums mt-1">
                      {formatPrice(item.dress.price)}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-stone-200 rounded text-xs bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:text-stone-950 font-mono cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono tabular-nums text-stone-900 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:text-stone-950 font-mono cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs text-stone-500 font-mono tabular-nums ml-auto">
                      Subtotal: {formatPrice(item.dress.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            {/* Promo Code Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. ZAHRA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full text-xs py-2 pl-7 pr-2 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-800 uppercase font-mono"
                />
                <Tag className="w-3.5 h-3.5 absolute left-2 top-2.5 text-stone-400" />
              </div>
              <button
                onClick={handleApplyPromo}
                className="px-3 py-2 bg-stone-800 hover:bg-stone-950 text-white text-xs font-medium rounded transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>

            {promoMessage && (
              <p
                className={`text-[11px] ${
                  appliedDiscount > 0 ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                {promoMessage}
              </p>
            )}

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Special Voucher Discount</span>
                  <span className="font-mono tabular-nums">-{formatPrice(appliedDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-mono tabular-nums">
                  {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between text-stone-950 font-semibold text-sm pt-2 border-t border-stone-200">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums text-base">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
