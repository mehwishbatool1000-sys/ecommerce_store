import React, { useState } from 'react';
import { Dress } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye, Star, Check } from 'lucide-react';

interface ProductCardProps {
  dress: Dress;
}

export const ProductCard: React.FC<ProductCardProps> = ({ dress }) => {
  const { setSelectedDressForModal, addToCart } = useStore();
  const [justAdded, setJustAdded] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(amount).replace('PKR', 'Rs.');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = dress.availableSizes[0] || 'M';
    const defaultStitching = dress.stitchingOptions[0] || 'Ready to Wear (Stitched)';
    addToCart(dress, defaultSize, defaultStitching, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article
      onClick={() => setSelectedDressForModal(dress)}
      className="group relative flex flex-col bg-white border border-stone-200/80 rounded-sm overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Product Image Stage (65-75% height) */}
      <div className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden">
        {dress.images && dress.images.length > 0 ? (
          <img
            src={dress.images[currentImgIdx] || dress.images[0]}
            alt={dress.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Graceful CSS fallback container if broken
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-500 p-4 text-center">
            <span className="font-serif text-lg italic text-stone-700">{dress.title}</span>
            <span className="text-xs text-stone-500 mt-1">{dress.category}</span>
          </div>
        )}

        {/* Thumbnail switcher if multiple images */}
        {dress.images && dress.images.length > 1 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2 left-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/40 backdrop-blur-xs p-1 rounded"
          >
            {dress.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImgIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImgIdx === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`View photo ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Quiet top status flag (no candy pill badges, clean typography) */}
        <div className="absolute top-2.5 left-2.5 text-[11px] font-medium tracking-wider uppercase text-stone-900 bg-white/90 backdrop-blur-xs px-2 py-0.5 border border-stone-200/60">
          {dress.featured ? 'Featured Edition' : dress.inStock ? `${dress.stockQuantity} Left` : 'Pre-Order'}
        </div>

        {/* Quick Action Overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between gap-2">
          <button
            onClick={handleQuickAdd}
            disabled={!dress.inStock}
            className={`flex-1 py-2 px-3 text-xs font-medium tracking-wide uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-white hover:bg-stone-100 text-stone-900'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDressForModal(dress);
            }}
            className="p-2 bg-stone-900/80 hover:bg-stone-900 text-white rounded-xs transition-colors cursor-pointer"
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-2 bg-white">
        <div>
          {/* Unboxed Metadata with · separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1 tracking-wide">
            <span>{dress.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[130px]">{dress.fabric}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base sm:text-lg font-medium text-stone-900 leading-snug line-clamp-1 group-hover:text-stone-700 transition-colors">
            {dress.title}
          </h3>
        </div>

        {/* Price and Rating row */}
        <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold text-stone-950 font-mono tabular-nums">
              {formatPrice(dress.price)}
            </span>
            {dress.originalPrice && dress.originalPrice > dress.price && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                {formatPrice(dress.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-stone-600">
            <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
            <span className="font-mono tabular-nums font-medium">{dress.rating.toFixed(1)}</span>
            <span className="text-[11px] text-stone-400">({dress.reviewsCount})</span>
          </div>
        </div>

        {/* Available Sizes List */}
        <div className="flex items-center gap-1 pt-1 text-[11px] text-stone-500">
          <span className="text-stone-400">Sizes:</span>
          {dress.availableSizes.map((s) => (
            <span key={s} className="px-1 py-0.5 bg-stone-100 text-stone-700 font-mono text-[10px]">
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
