import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { DressCategory, DressSize, StitchingOption } from '../types';
import { X, Plus, Sparkles, Check, Image as ImageIcon } from 'lucide-react';

import heroBridalImg from '../assets/images/hero_bridal_couture_1791437581649.jpg';
import pretFormalImg from '../assets/images/dress_pret_formal_1791437594449.jpg';
import luxuryLawnImg from '../assets/images/dress_luxury_lawn_1791437608969.jpg';
import festiveVelvetImg from '../assets/images/dress_festive_velvet_1791437623829.jpg';

export const AddDressModal: React.FC = () => {
  const { isAddDressModalOpen, setIsAddDressModalOpen, addDress } = useStore();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DressCategory>('Luxury Pret');
  const [fabric, setFabric] = useState('');
  const [price, setPrice] = useState<number>(24500);
  const [originalPrice, setOriginalPrice] = useState<number>(28000);
  const [color, setColor] = useState('Royal Emerald');
  const [stockQuantity, setStockQuantity] = useState<number>(10);
  const [description, setDescription] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<DressSize[]>(['S', 'M', 'L']);
  const [selectedStitching, setSelectedStitching] = useState<StitchingOption[]>([
    'Ready to Wear (Stitched)',
  ]);
  const [selectedImage, setSelectedImage] = useState<string>(pretFormalImg);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [craftDetail1, setCraftDetail1] = useState('Handcrafted Dabka and Zardozi Needlework');
  const [craftDetail2, setCraftDetail2] = useState('Pure 80g Raw Silk Canvas with Organza Finish');
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isAddDressModalOpen) return null;

  const imagePresets = [
    { label: 'Haute Bridal Red', img: heroBridalImg },
    { label: 'Emerald Silk Pret', img: pretFormalImg },
    { label: 'Pastel Lilac Lawn', img: luxuryLawnImg },
    { label: 'Midnight Velvet Formal', img: festiveVelvetImg },
  ];

  const handleToggleSize = (size: DressSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleToggleStitching = (option: StitchingOption) => {
    setSelectedStitching((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !fabric || !price) return;

    const finalImage = customImageUrl.trim() ? customImageUrl.trim() : selectedImage;

    addDress({
      sku: `ZA-${category.slice(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      title,
      category,
      fabric,
      description: description || `Exquisite ${category} crafted with high-precision tailoring on ${fabric}.`,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      availableSizes: selectedSizes.length > 0 ? selectedSizes : ['M'],
      stitchingOptions:
        selectedStitching.length > 0 ? selectedStitching : ['Ready to Wear (Stitched)'],
      inStock: stockQuantity > 0,
      stockQuantity: Number(stockQuantity),
      images: [finalImage],
      color,
      featured: true,
      craftDetails: [craftDetail1, craftDetail2].filter(Boolean),
      careGuide: 'Professional dry cleaning recommended to preserve embellishments.',
    });

    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
      setIsAddDressModalOpen(false);
      // reset form
      setTitle('');
      setFabric('');
      setDescription('');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="font-serif text-2xl text-stone-900 font-medium">Add New Dress to Collection</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Add new bridal couture, pret, luxury lawn, or formal dresses with custom pricing and stock.
            </p>
          </div>
          <button
            onClick={() => setIsAddDressModalOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successNotice ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900">Dress Added Successfully!</h3>
            <p className="text-xs text-stone-500">
              Your new dress is now live in the catalog with instant client persistence.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Title and Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Dress Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Jasmine Embroidered Raw Silk"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Dress Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as DressCategory)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                >
                  <option value="Bridal & Couture">Bridal & Couture</option>
                  <option value="Luxury Pret">Luxury Pret</option>
                  <option value="Luxury Lawn">Luxury Lawn</option>
                  <option value="Festive & Formals">Festive & Formals</option>
                  <option value="Modest & Abayas">Modest & Abayas</option>
                  <option value="Western Fusion">Western Fusion</option>
                </select>
              </div>
            </div>

            {/* Fabric and Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Fabric Specification *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Korean Raw Silk & Organza"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Color Palette</label>
                <input
                  type="text"
                  placeholder="e.g. Emerald Jewel Green & Gold"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>

            {/* Price, Discount Price, Stock Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Selling Price (Rs.) *</label>
                <input
                  type="number"
                  required
                  min="500"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Original Price (Rs.)</label>
                <input
                  type="number"
                  min="0"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Inventory Units in Stock</label>
                <input
                  type="number"
                  min="0"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800 font-mono"
                />
              </div>
            </div>

            {/* Image Selection: Studio Presets or Custom URL */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Select Editorial Image Preset (or enter Custom Image URL)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                {imagePresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setSelectedImage(preset.img);
                      setCustomImageUrl('');
                    }}
                    className={`p-1.5 border rounded text-left transition-all cursor-pointer ${
                      selectedImage === preset.img && !customImageUrl
                        ? 'border-stone-900 bg-stone-100 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="aspect-[3/4] bg-stone-200 rounded overflow-hidden mb-1">
                      <img src={preset.img} alt={preset.label} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] text-stone-700 block truncate">{preset.label}</span>
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="url"
                  placeholder="Or paste custom image link (optional)"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  className="w-full text-xs p-2 pl-7 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                />
                <ImageIcon className="w-3.5 h-3.5 absolute left-2 top-2.5 text-stone-400" />
              </div>
            </div>

            {/* Available Sizes */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">Available Sizes</label>
              <div className="flex flex-wrap gap-2">
                {(['XS', 'S', 'M', 'L', 'XL', 'Custom'] as DressSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleToggleSize(size)}
                    className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
                      selectedSizes.includes(size)
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stitching Options */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">Stitching Options</label>
              <div className="flex flex-wrap gap-2">
                {(['Ready to Wear (Stitched)', 'Unstitched (3-Piece)'] as StitchingOption[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleToggleStitching(opt)}
                    className={`px-3 py-1.5 text-xs rounded border transition-colors cursor-pointer ${
                      selectedStitching.includes(opt)
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Description and Craft details */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Editorial Description</label>
              <textarea
                rows={3}
                placeholder="Describe the silhouette, handwork, embroidery motif, and occasions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Craft Detail 1</label>
                <input
                  type="text"
                  value={craftDetail1}
                  onChange={(e) => setCraftDetail1(e.target.value)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Craft Detail 2</label>
                <input
                  type="text"
                  value={craftDetail2}
                  onChange={(e) => setCraftDetail2(e.target.value)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded focus:bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-stone-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddDressModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 border border-stone-300 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save & Publish Dress</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
