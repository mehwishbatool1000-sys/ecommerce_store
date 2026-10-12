import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, CheckCircle, Heart, MessageSquare } from 'lucide-react';

export const FeedbackModal: React.FC = () => {
  const {
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
    addReview,
    dresses,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('');
  const [selectedDressId, setSelectedDressId] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [recommended, setRecommended] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !comment) return;

    const chosenDress = dresses.find((d) => d.id === selectedDressId);

    addReview({
      customerName,
      city: city || 'Pakistan',
      dressId: selectedDressId || undefined,
      dressTitle: chosenDress?.title || 'Zahra Atelier Haute Couture',
      rating,
      comment,
      verified: true,
      recommended,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFeedbackModalOpen(false);
      setCustomerName('');
      setComment('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-lg rounded-sm shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="font-serif text-2xl text-stone-900 font-medium">Customer Feedback & Reviews</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Share your stitching experience, fabric feel, and courier delivery satisfaction.
            </p>
          </div>
          <button
            onClick={() => setIsFeedbackModalOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900">Thank You for Your Feedback!</h3>
            <p className="text-xs text-stone-500">
              Your review has been verified and added to our customer testimonials.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Star Rating Interactive Selector */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Overall Experience Rating *
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-stone-300 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-500'
                          : 'fill-stone-100 text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-medium text-stone-700 ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maham Tariq"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Your City</label>
                <input
                  type="text"
                  placeholder="e.g. Lahore / Islamabad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>

            {/* Which Dress was purchased */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Dress Purchased (Optional)</label>
              <select
                value={selectedDressId}
                onChange={(e) => setSelectedDressId(e.target.value)}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
              >
                <option value="">General Brand Experience</option>
                {dresses.map((dress) => (
                  <option key={dress.id} value={dress.id}>
                    {dress.title} ({dress.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Review Comment */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Your Review & Feedback *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your thoughts on the embroidery finesse, fabric feel, size fitting, packaging..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800 resize-none"
              />
            </div>

            {/* Would Recommend Toggle */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="recommendCheck"
                checked={recommended}
                onChange={(e) => setRecommended(e.target.checked)}
                className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
              />
              <label htmlFor="recommendCheck" className="text-xs text-stone-700 cursor-pointer">
                I would recommend Zahra Atelier to friends and family
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-stone-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsFeedbackModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 border border-stone-300 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Submit Feedback</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
