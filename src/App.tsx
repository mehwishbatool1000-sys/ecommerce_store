import React, { useState, useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AddDressModal } from './components/AddDressModal';
import { OrderManagementModal } from './components/OrderManagementModal';
import { FeedbackModal } from './components/FeedbackModal';
import { FeedbackSection } from './components/FeedbackSection';
import { PromptStudioModal } from './components/PromptStudioModal';
import { Footer } from './components/Footer';
import { SlidersHorizontal, Sparkles, PlusCircle } from 'lucide-react';

function StorefrontContent() {
  const { dresses, setIsAddDressModalOpen, setIsPromptStudioOpen } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    'All',
    'Bridal & Couture',
    'Luxury Pret',
    'Luxury Lawn',
    'Festive & Formals',
    'Modest & Abayas',
    'Western Fusion',
  ];

  // Extract unique fabrics from current dresses
  const availableFabrics = useMemo(() => {
    const set = new Set<string>();
    dresses.forEach((d) => {
      if (d.fabric) {
        // e.g. Silk, Lawn, Velvet, Organza
        if (d.fabric.toLowerCase().includes('silk')) set.add('Raw Silk');
        if (d.fabric.toLowerCase().includes('lawn')) set.add('Luxury Lawn');
        if (d.fabric.toLowerCase().includes('velvet')) set.add('Micro Velvet');
        if (d.fabric.toLowerCase().includes('organza')) set.add('Organza & Tissue');
        if (d.fabric.toLowerCase().includes('nida') || d.fabric.toLowerCase().includes('chiffon')) set.add('Nida / Chiffon');
      }
    });
    return ['All', ...Array.from(set)];
  }, [dresses]);

  // Filtered & Sorted dresses
  const filteredDresses = useMemo(() => {
    return dresses
      .filter((dress) => {
        const matchesCategory =
          selectedCategory === 'All' || dress.category === selectedCategory;
        const matchesFabric =
          selectedFabric === 'All' ||
          dress.fabric.toLowerCase().includes(selectedFabric.toLowerCase().split(' ')[0]);
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          dress.title.toLowerCase().includes(q) ||
          dress.description.toLowerCase().includes(q) ||
          dress.category.toLowerCase().includes(q) ||
          dress.fabric.toLowerCase().includes(q) ||
          dress.color.toLowerCase().includes(q);

        return matchesCategory && matchesFabric && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [dresses, selectedCategory, selectedFabric, searchQuery, sortBy]);

  const handleExploreClick = () => {
    const el = document.getElementById('collection-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900">
      {/* 3-Zone Navigation Header */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Campaign Hero Banner */}
        <HeroBanner onExploreClick={handleExploreClick} />

        {/* Catalog Section */}
        <section
          id="collection-catalog"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-stone-200/80 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
                <span>Atelier Catalog</span>
                <span aria-hidden="true">·</span>
                <span>{filteredDresses.length} Designs Available</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
                {selectedCategory === 'All' ? 'Curated Women’s Collections' : selectedCategory}
              </h2>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsPromptStudioOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Google AI Studio Prompt</span>
              </button>

              <button
                onClick={() => setIsAddDressModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Dress</span>
              </button>
            </div>
          </div>

          {/* Filter Bar Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            {/* Category Segmented Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-xs whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Fabric & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {/* Fabric Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-stone-500">Fabric:</span>
                <select
                  value={selectedFabric}
                  onChange={(e) => setSelectedFabric(e.target.value)}
                  className="bg-white border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 focus:outline-none focus:border-stone-800 cursor-pointer"
                >
                  {availableFabrics.map((fab) => (
                    <option key={fab} value={fab}>
                      {fab}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5">
                <span className="text-stone-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | 'featured'
                        | 'price-asc'
                        | 'price-desc'
                        | 'rating'
                    )
                  }
                  className="bg-white border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 focus:outline-none focus:border-stone-800 cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Search/Filter summary badge if filtered */}
          {(searchQuery || selectedFabric !== 'All' || selectedCategory !== 'All') && (
            <div className="mb-6 flex items-center gap-2 text-xs text-stone-600 bg-stone-100 p-2.5 rounded">
              <span>Filtering by:</span>
              {selectedCategory !== 'All' && <strong>Category: {selectedCategory}</strong>}
              {selectedFabric !== 'All' && <strong>· Fabric: {selectedFabric}</strong>}
              {searchQuery && <strong>· Search: "{searchQuery}"</strong>}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedFabric('All');
                  setSearchQuery('');
                }}
                className="ml-auto text-xs text-stone-900 underline underline-offset-2 hover:opacity-75 cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Product Grid: 3-column desktop / 2-column tablet / 1-column mobile */}
          {filteredDresses.length === 0 ? (
            <div className="py-20 text-center bg-white border border-stone-200 rounded p-8">
              <SlidersHorizontal className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif text-xl text-stone-800 mb-1">No Dresses Found</h3>
              <p className="text-xs text-stone-500 mb-4 max-w-sm mx-auto">
                No designs matched your current category or search query. Try clearing your filters or add a new dress.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedFabric('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs border border-stone-300 hover:border-stone-800 rounded font-medium cursor-pointer"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setIsAddDressModalOpen(true)}
                  className="px-4 py-2 text-xs bg-stone-900 text-white rounded font-medium cursor-pointer"
                >
                  Add Custom Dress
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredDresses.map((dress) => (
                <ProductCard key={dress.id} dress={dress} />
              ))}
            </div>
          )}
        </section>

        {/* Customer Feedback & Testimonials Section */}
        <FeedbackSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals and Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <AddDressModal />
      <OrderManagementModal />
      <FeedbackModal />
      <PromptStudioModal />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}
