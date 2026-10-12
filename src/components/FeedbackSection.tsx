import React from 'react';
import { useStore } from '../context/StoreContext';
import { Star, MessageSquarePlus, ShieldCheck, ThumbsUp } from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const { reviews, setIsFeedbackModalOpen } = useStore();

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
        ).toFixed(1)
      : '5.0';

  return (
    <section className="bg-stone-100/70 border-t border-b border-stone-200/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header and Rating Overview */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
              <span>Client Testimonials</span>
              <span aria-hidden="true">·</span>
              <span>Verified Patron Reviews</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
              Words From Our Patrons
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white p-4 border border-stone-200 rounded">
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl font-semibold text-stone-900 font-mono tabular-nums">
                {averageRating}
              </span>
              <div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-500"
                    />
                  ))}
                </div>
                <span className="text-[11px] text-stone-500">
                  Based on {reviews.length} authentic reviews
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Leave A Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 border border-stone-200/80 rounded flex flex-col justify-between shadow-xs hover:border-stone-300 transition-colors"
            >
              <div>
                {/* Rating stars & date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-500'
                            : 'fill-stone-100 text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-stone-700 text-xs leading-relaxed italic mb-4 font-light">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Verified Badge */}
              <div className="pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-stone-900">
                      {rev.customerName}
                    </h4>
                    <span className="text-[11px] text-stone-500">
                      {rev.city ? `${rev.city}` : 'Verified Buyer'}
                    </span>
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-800 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                {rev.dressTitle && (
                  <p className="text-[10px] text-stone-400 truncate mt-1">
                    Purchased: {rev.dressTitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
