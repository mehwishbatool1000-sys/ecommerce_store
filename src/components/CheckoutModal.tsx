import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, CustomerDetails, Order } from '../types';
import { X, CheckCircle, Truck, CreditCard, Smartphone, ShieldCheck, ArrowRight, Printer } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    placeOrder,
    setIsOrderManagerOpen,
  } = useStore();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    postalCode: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery (COD)');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [formError, setFormError] = useState('');

  if (!isCheckoutOpen) return null;

  const freeDeliveryThreshold = 20000;
  const shippingFee = cartSubtotal >= freeDeliveryThreshold ? 0 : 450;
  const totalAmount = cartSubtotal + shippingFee;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(amount).replace('PKR', 'Rs.');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.phone || !customer.address || !customer.city) {
      setFormError('Please fill in your name, phone number, address, and city.');
      return;
    }
    setFormError('');
    const newOrder = placeOrder(customer, paymentMethod, 0);
    setConfirmedOrder(newOrder);
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    setIsCheckoutOpen(false);
  };

  const handleViewInManager = () => {
    handleClose();
    setIsOrderManagerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="font-serif text-2xl text-stone-900 font-medium">
              {confirmedOrder ? 'Order Confirmed' : 'Checkout & Delivery Details'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {confirmedOrder
                ? 'Your couture order has been registered in our atelier system'
                : 'Fast, secure order placement with cash on delivery & express courier'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {confirmedOrder ? (
          /* Confirmation Receipt View */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                Official Order Reference
              </span>
              <h3 className="font-serif text-3xl text-stone-900 font-semibold mt-1">
                {confirmedOrder.id}
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                Tracking Number: {confirmedOrder.trackingNumber}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 border border-stone-200 rounded p-4 text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-stone-200 pb-2 font-medium">
                <span>Customer</span>
                <span className="text-stone-900">{confirmedOrder.customer.fullName} ({confirmedOrder.customer.phone})</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span>Shipping Address</span>
                <span className="text-stone-900 text-right max-w-xs">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.city}
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span>Payment Method</span>
                <span className="text-stone-900 font-medium">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span>Ordered Dresses</span>
                <span className="text-stone-900 font-medium">
                  {confirmedOrder.items.map(it => `${it.dress.title} (${it.selectedSize} x${it.quantity})`).join(', ')}
                </span>
              </div>
              <div className="flex justify-between pt-1 font-semibold text-stone-950 text-sm">
                <span>Total Amount Due</span>
                <span className="font-mono tabular-nums text-base">
                  {formatPrice(confirmedOrder.totalAmount)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleViewInManager}
                className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Track in Order Management</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                className="py-3 px-6 border border-stone-300 hover:border-stone-500 text-stone-800 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded">
                {formError}
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                1. Customer & Delivery Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Malik"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-600 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +92 300 1234567"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="ayesha@example.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-600 mb-1">City *</label>
                  <select
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Other">Other Nationwide City</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-600 mb-1">Street Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="House / Flat No., Street, Sector / Area"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-600 mb-1">Special Tailoring / Delivery Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Ring doorbell twice, or sleeve length adjustments"
                  value={customer.notes || ''}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                2. Select Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                  className={`p-3 text-left border rounded transition-all cursor-pointer ${
                    paymentMethod === 'Cash on Delivery (COD)'
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-300 bg-white text-stone-800 hover:border-stone-500'
                  }`}
                >
                  <Truck className="w-4 h-4 mb-1.5" />
                  <div className="text-xs font-semibold">Cash on Delivery</div>
                  <div className="text-[10px] opacity-80">Pay upon parcel arrival</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Debit / Credit Card')}
                  className={`p-3 text-left border rounded transition-all cursor-pointer ${
                    paymentMethod === 'Debit / Credit Card'
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-300 bg-white text-stone-800 hover:border-stone-500'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1.5" />
                  <div className="text-xs font-semibold">Online Card</div>
                  <div className="text-[10px] opacity-80">Visa / Mastercard 3D Secure</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('JazzCash / EasyPaisa Bank Transfer')}
                  className={`p-3 text-left border rounded transition-all cursor-pointer ${
                    paymentMethod === 'JazzCash / EasyPaisa Bank Transfer'
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-300 bg-white text-stone-800 hover:border-stone-500'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mb-1.5" />
                  <div className="text-xs font-semibold">EasyPaisa / JazzCash</div>
                  <div className="text-[10px] opacity-80">Direct mobile wallet</div>
                </button>
              </div>
            </div>

            {/* Order Price Overview */}
            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded text-xs space-y-1.5">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal ({cart.length} dresses)</span>
                <span className="font-mono tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping Courier</span>
                <span className="font-mono tabular-nums">{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between font-semibold text-stone-950 text-sm pt-2 border-t border-stone-200">
                <span>Total Payable</span>
                <span className="font-mono tabular-nums text-base">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Confirm & Place Order ({formatPrice(totalAmount)})</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
