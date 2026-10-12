import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, PackageCheck, MessageSquareHeart, PlusCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setIsOrderManagerOpen,
    setIsAddDressModalOpen,
    setIsPromptStudioOpen,
    setIsFeedbackModalOpen,
  } = useStore();

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl text-white tracking-widest uppercase">
              Zahra Atelier
            </h3>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm font-light">
              Haute couture and luxury ready-to-wear women’s fashion house. Celebrating heritage embroidery, pure fabrics, and timeless bridal silhouettes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsPromptStudioOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded text-[11px] font-medium hover:bg-amber-400/20 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Studio Master Prompt</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-medium">
              Collections
            </h4>
            <ul className="space-y-2 text-stone-400 text-xs font-light">
              <li>Bridal & Haute Couture</li>
              <li>Luxury Pret (Ready-to-Wear)</li>
              <li>Embroidered Summer Lawn</li>
              <li>Micro Velvet Formals</li>
              <li>Modest Kaftans & Abayas</li>
            </ul>
          </div>

          {/* Merchant & Store Management */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-medium">
              Merchant & Customer Hub
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <button
                onClick={() => setIsOrderManagerOpen(true)}
                className="text-left text-stone-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <PackageCheck className="w-3.5 h-3.5 text-stone-500" />
                <span>Order Management Hub & Tracking</span>
              </button>
              <button
                onClick={() => setIsAddDressModalOpen(true)}
                className="text-left text-stone-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-stone-500" />
                <span>Add New Dress to Collection</span>
              </button>
              <button
                onClick={() => setIsFeedbackModalOpen(true)}
                className="text-left text-stone-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquareHeart className="w-3.5 h-3.5 text-stone-500" />
                <span>Submit Client Review & Rating</span>
              </button>
            </div>
            <div className="pt-2 text-[11px] text-stone-500">
              Flagship Ateliers: Gulberg III Lahore · Clifton Karachi · Beverly Centre Islamabad
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-light">
          <div>
            © {new Date().getFullYear()} Zahra Atelier Haute Couture. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Complimentary Domestic Delivery</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Courier</span>
            <span aria-hidden="true">·</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
