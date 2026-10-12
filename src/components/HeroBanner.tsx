import React from 'react';
import heroBridalImg from '../assets/images/hero_bridal_couture_1791437581649.jpg';
import { Sparkles, ShieldCheck, Truck, Scissors } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  const { setIsOrderManagerOpen, setIsPromptStudioOpen } = useStore();

  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100">
      {/* Editorial Split Hero Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[580px] items-stretch">
        {/* Left Column: Brand Narrative & Immediate CTAs */}
        <div className="lg:col-span-5 px-6 sm:px-12 py-16 sm:py-20 flex flex-col justify-center z-10">
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-300/90 font-medium mb-3">
            <span>Autumn & Winter 2026/27</span>
            <span aria-hidden="true">·</span>
            <span>Couture Edition</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white mb-6 [text-wrap:balance]">
            Timeless Elegance, Woven in Silk & Gold.
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-light">
            Discover heirloom bridal couture, bespoke raw silk pret, and handcrafted luxury lawn. Each garment reflects centuries of Subcontinental artisanal needlework, tailored for modern grace.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="px-6 py-3 bg-stone-100 text-stone-900 text-xs uppercase tracking-widest font-semibold hover:bg-white transition-all shadow-sm cursor-pointer"
            >
              Explore Collections
            </button>
            <button
              onClick={() => setIsOrderManagerOpen(true)}
              className="px-5 py-3 border border-stone-600 hover:border-stone-400 text-stone-200 text-xs uppercase tracking-widest font-medium transition-all cursor-pointer"
            >
              Manage Orders & Stock
            </button>
          </div>

          {/* Quick prompt preview badge */}
          <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Full E-Commerce Spec with AI Prompt</span>
            </span>
            <button
              onClick={() => setIsPromptStudioOpen(true)}
              className="text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
            >
              View 20-Yr Expert Prompt
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual with measured scrim */}
        <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full overflow-hidden bg-stone-950">
          <img
            src={heroBridalImg}
            alt="Zahra Atelier Haute Couture Royal Bridal Ensemble"
            className="w-full h-full object-cover object-center lg:object-top"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-900 via-stone-900/30 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 right-6 bg-stone-950/80 backdrop-blur-md border border-stone-800 p-4 max-w-xs text-xs hidden sm:block">
            <p className="text-amber-200 font-serif text-sm italic mb-1">Noor-e-Aroos Bridal Ensemble</p>
            <p className="text-stone-400 text-[11px] leading-snug">
              Hand-spun pure raw silk choli with traditional zardozi and naqshi needlework. 280+ artisan hours.
            </p>
          </div>
        </div>
      </div>

      {/* Trust & Craftsmanship Strip */}
      <div className="border-t border-stone-800 bg-stone-950/60 py-4 px-4 sm:px-8 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2.5">
            <Scissors className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-medium text-white block">Custom Fit & Ready-to-Wear</span>
              <span className="text-[11px] text-stone-400">Tailored to your exact size</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-medium text-white block">Express COD Available</span>
              <span className="text-[11px] text-stone-400">3-5 days delivery nationwide</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-medium text-white block">100% Pure Fabrics</span>
              <span className="text-[11px] text-stone-400">Certified silk, lawn & velvet</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-medium text-white block">Hassle-Free Exchange</span>
              <span className="text-[11px] text-stone-400">7 days friendly returns policy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
