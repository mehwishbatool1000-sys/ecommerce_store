import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { DressSize, StitchingOption } from '../types';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Check, Scissors, Ruler } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedDressForModal, setSelectedDressForModal, addToCart } = useStore();
  const dress = selectedDressForModal;

  const [selectedSize, setSelectedSize] = useState<DressSize>(dress?.availableSizes[0] || 'M');
  const [selectedStitching, setSelectedStitching] = useState<StitchingOption>(
    dress?.stitchingOptions[0] || 'Ready to Wear (Stitched)'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!dress) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(amount).replace('PKR', 'Rs.');
  };

  const handleAddToCart = () => {
    addToCart(dress, selectedSize, selectedStitching, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setSelectedDressForModal(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-sm shadow-2xl border border-stone-200">
        {/* Close Button */}
        <button
          onClick={() => setSelectedDressForModal(null)}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Image Gallery (sticky gallery) */}
          <div className="md:col-span-6 bg-stone-100 p-4 sm:p-6 flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xs bg-stone-200 shadow-inner">
              <img
                src={dress.images[activeImageIdx] || dress.images[0]}
                alt={dress.title}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnail selector */}
            {dress.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {dress.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-20 shrink-0 border-2 rounded-xs overflow-hidden transition-all cursor-pointer ${
                      activeImageIdx === idx ? 'border-stone-900' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & SKU metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-500 tracking-wider uppercase mb-2">
                <span>{dress.category}</span>
                <span aria-hidden="true">·</span>
                <span>SKU: {dress.sku}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal leading-tight mb-3">
                {dress.title}
              </h2>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2 mb-4 text-xs text-stone-600">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(dress.rating)
                          ? 'fill-amber-400 text-amber-500'
                          : 'fill-stone-200 text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono font-medium tabular-nums">{dress.rating.toFixed(1)}</span>
                <span className="text-stone-400">({dress.reviewsCount} verified customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-stone-200">
                <span className="text-2xl font-semibold text-stone-900 font-mono tabular-nums">
                  {formatPrice(dress.price)}
                </span>
                {dress.originalPrice && dress.originalPrice > dress.price && (
                  <span className="text-base text-stone-400 line-through font-mono tabular-nums">
                    {formatPrice(dress.originalPrice)}
                  </span>
                )}
                {dress.inStock ? (
                  <span className="text-xs text-emerald-800 font-medium ml-auto">
                    In Stock ({dress.stockQuantity} ready to ship)
                  </span>
                ) : (
                  <span className="text-xs text-amber-800 font-medium ml-auto">
                    Bespoke / Made to Order
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                {dress.description}
              </p>

              {/* Stitching Option selector */}
              {dress.stitchingOptions && dress.stitchingOptions.length > 1 && (
                <div className="mb-5">
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-700 mb-2">
                    Stitching Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {dress.stitchingOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedStitching(opt)}
                        className={`py-2 px-3 text-xs text-left border rounded transition-all cursor-pointer ${
                          selectedStitching === opt
                            ? 'border-stone-900 bg-stone-900 text-white font-medium'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-stone-700">
                    Select Size
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 underline underline-offset-2 cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    Size Guide
                  </button>
                </div>

                {/* Size guide quick drawer */}
                {showSizeGuide && (
                  <div className="mb-3 p-3 bg-stone-50 border border-stone-200 text-xs text-stone-700">
                    <p className="font-semibold mb-1">Standard Sizing (Inches):</p>
                    <div className="grid grid-cols-5 gap-1 text-[11px] text-center font-mono">
                      <div className="bg-white p-1 border">XS: 34"</div>
                      <div className="bg-white p-1 border">S: 36"</div>
                      <div className="bg-white p-1 border">M: 39"</div>
                      <div className="bg-white p-1 border">L: 42"</div>
                      <div className="bg-white p-1 border">XL: 45"</div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {dress.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-10 h-10 px-3 text-xs font-mono font-medium border rounded transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-stone-950 bg-stone-950 text-white shadow-xs'
                          : 'border-stone-300 bg-white text-stone-800 hover:border-stone-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Add to Bag CTA */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-stone-300 rounded bg-white h-11">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-stone-600 hover:text-stone-900 transition-colors font-mono cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono text-sm tabular-nums font-medium text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 text-stone-600 hover:text-stone-900 transition-colors font-mono cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!dress.inStock}
                  className={`flex-1 h-11 px-6 text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-700 text-white'
                      : dress.inStock
                      ? 'bg-stone-900 hover:bg-stone-800 text-white'
                      : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added To Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Bag · {formatPrice(dress.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Craftsmanship & Assurance bullet points */}
              {dress.craftDetails && (
                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-xs uppercase tracking-wider text-stone-800 font-semibold mb-2 flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-amber-600" />
                    Artisanal Craft Details
                  </h4>
                  <ul className="text-xs text-stone-600 space-y-1 pl-4 list-disc font-light">
                    {dress.craftDetails.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer Trust Strip */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-stone-700" />
                COD / Express Delivery
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                Guaranteed Authenticity
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
