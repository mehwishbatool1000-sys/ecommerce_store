import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { EXPERT_AI_STUDIO_PROMPT, EXPERT_PROMPT_URDU_EXPLANATION } from '../data/expertPrompt';
import { X, Copy, Check, Sparkles, Terminal, Code2, Layers, BookOpen } from 'lucide-react';

export const PromptStudioModal: React.FC = () => {
  const { isPromptStudioOpen, setIsPromptStudioOpen } = useStore();
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<'prompt' | 'urdu_guide'>('prompt');

  if (!isPromptStudioOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(EXPERT_AI_STUDIO_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-4xl max-h-[92vh] rounded-sm shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-400 text-stone-950 rounded flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl text-white font-medium">
                  20-Year Senior Architect Master Prompt
                </h2>
                <span className="text-[10px] uppercase font-mono tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  Ready for AI Studio
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                Complete engineering specification crafted for Google AI Studio to build this luxury clothing e-commerce app.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPromptStudioOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action & Tab Toolbar */}
        <div className="px-6 py-3 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLang('prompt')}
              className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeLang === 'prompt'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-300'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Full Master Prompt (English Engine)</span>
            </button>
            <button
              onClick={() => setActiveLang('urdu_guide')}
              className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeLang === 'urdu_guide'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Urdu Guide & How To Use</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
              copied
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied To Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Prompt For Google AI Studio</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt Content Viewer */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs leading-relaxed bg-stone-50">
          {activeLang === 'prompt' ? (
            <div className="bg-stone-950 text-stone-200 p-5 rounded border border-stone-800 shadow-inner overflow-x-auto whitespace-pre-wrap select-text">
              {EXPERT_AI_STUDIO_PROMPT}
            </div>
          ) : (
            <div className="bg-white p-6 rounded border border-stone-200 font-sans space-y-4 text-stone-800">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded text-amber-900">
                <h3 className="font-serif text-lg font-bold mb-1">
                  Google AI Studio mai istemal krny ka tareeqa:
                </h3>
                <p className="text-xs leading-relaxed">
                  {EXPERT_PROMPT_URDU_EXPLANATION}
                </p>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  Is Prompt k 5 Bunyadi Modules:
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
                  <li>
                    <strong>Tamam Types k Dresses:</strong> Bridal & Haute Couture, Luxury Pret (Ready to Wear), Luxury Lawn, Velvet Formals, Modest Abayas, or Western Fusion sets.
                  </li>
                  <li>
                    <strong>Dress Add Krny ka Option:</strong> Seller form jis se Title, Category, Fabric, Price, Sizes (XS to Custom), or Stock update kr k instant live kia ja sake.
                  </li>
                  <li>
                    <strong>Cart & Order Placement:</strong> Slide-out cart drawer, coupon codes (ZAHRA10), delivery progress, or Cash on Delivery (COD) k sath order checkout.
                  </li>
                  <li>
                    <strong>Order Management Hub:</strong> Har order ka status track krna (Pending → Confirmed → In Stitching → Dispatched → Delivered) or invoice preview.
                  </li>
                  <li>
                    <strong>Customer Feedback:</strong> Star ratings or reviews submit krny ka verified patron feedback section.
                  </li>
                </ul>

                <p className="pt-2 text-stone-600">
                  Simply oper diye gaye <strong>"Copy Prompt For Google AI Studio"</strong> button pr click karein or apny naye AI Studio session mai paste kr dein!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Architected with zero dead clicks & persistent local storage</span>
          <button
            onClick={() => setIsPromptStudioOpen(false)}
            className="px-4 py-2 border border-stone-300 hover:border-stone-500 rounded text-stone-700 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
