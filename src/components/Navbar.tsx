import React, { useState } from 'react';
import { ShoppingBag, Search, PlusCircle, PackageCheck, Sparkles, MessageSquareHeart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DressCategory } from '../types';

interface NavbarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const {
    cartCount,
    setIsCartOpen,
    setIsAddDressModalOpen,
    setIsOrderManagerOpen,
    setIsPromptStudioOpen,
    setIsFeedbackModalOpen,
  } = useStore();

  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories: { label: string; value: string }[] = [
    { label: 'All Collections', value: 'All' },
    { label: 'Bridal & Couture', value: 'Bridal & Couture' },
    { label: 'Luxury Pret', value: 'Luxury Pret' },
    { label: 'Luxury Lawn', value: 'Luxury Lawn' },
    { label: 'Festive & Formals', value: 'Festive & Formals' },
    { label: 'Modest Wear', value: 'Modest & Abayas' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Promotional announcement bar (<=40px) */}
      <div className="bg-stone-900 text-stone-100 text-xs py-1.5 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2">
        <span>Complimentary Nationwide Express Courier On Orders Over Rs. 20,000</span>
        <span aria-hidden="true">·</span>
        <span className="text-amber-300 font-medium">Use Code ZAHRA10 for 10% Off</span>
      </div>

      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-2xl md:text-3xl font-medium tracking-widest uppercase text-stone-900 whitespace-nowrap hover:opacity-85 transition-opacity"
        >
          Zahra Atelier
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs tracking-wider uppercase font-medium text-stone-600">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onSelectCategory(cat.value)}
              className={`transition-colors hover:text-stone-900 cursor-pointer ${
                selectedCategory === cat.value
                  ? 'text-stone-950 font-semibold border-b border-stone-950 pb-0.5'
                  : 'text-stone-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => setIsOrderManagerOpen(true)}
            className="text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <PackageCheck className="w-3.5 h-3.5 text-stone-700" />
            <span>Orders & Manage</span>
          </button>
          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <MessageSquareHeart className="w-3.5 h-3.5 text-stone-700" />
            <span>Reviews</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search bar toggle */}
          {showSearchInput ? (
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search dresses, fabrics..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-36 sm:w-52 text-xs py-1.5 pl-7 pr-2 bg-stone-100 border border-stone-300 rounded focus:outline-none focus:border-stone-800 text-stone-900"
              />
              <Search className="w-3.5 h-3.5 absolute left-2 text-stone-500 pointer-events-none" />
              <button
                onClick={() => {
                  setShowSearchInput(false);
                  onSearchChange('');
                }}
                className="ml-1 text-xs text-stone-500 hover:text-stone-900 px-1"
                title="Close Search"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearchInput(true)}
              className="p-2 text-stone-600 hover:text-stone-950 rounded hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Search Catalog"
              title="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Master AI Prompt Studio button */}
          <button
            onClick={() => setIsPromptStudioOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded transition-colors cursor-pointer"
            title="Google AI Studio 20-Year Master Prompt"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Studio Prompt</span>
          </button>

          {/* Add Dress Seller Button */}
          <button
            onClick={() => setIsAddDressModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded transition-colors cursor-pointer"
            title="Add a new dress to the collection"
          >
            <PlusCircle className="w-3.5 h-3.5 text-stone-700" />
            <span className="hidden md:inline">Add Dress</span>
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-stone-900 hover:bg-stone-100 rounded transition-colors cursor-pointer"
            aria-label={`Shopping Cart (${cartCount} items)`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-white text-[10px] font-semibold flex items-center justify-center rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 bg-stone-50 border-t border-stone-200 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onSelectCategory(cat.value)}
            className={`whitespace-nowrap px-2.5 py-1 rounded transition-colors ${
              selectedCategory === cat.value
                ? 'bg-stone-900 text-white font-medium'
                : 'text-stone-700 bg-white border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
        <button
          onClick={() => setIsOrderManagerOpen(true)}
          className="whitespace-nowrap px-2.5 py-1 rounded text-stone-700 bg-white border border-stone-200 flex items-center gap-1"
        >
          <PackageCheck className="w-3 h-3" />
          Orders
        </button>
        <button
          onClick={() => setIsPromptStudioOpen(true)}
          className="whitespace-nowrap px-2.5 py-1 rounded text-amber-900 bg-amber-50 border border-amber-200 flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-amber-600" />
          Prompt
        </button>
      </div>
    </header>
  );
};
