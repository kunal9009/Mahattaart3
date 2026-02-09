
import React from 'react';
import { MOCK_WALLPAPERS } from '../constants.tsx';
import { Heart, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Wallpaper } from '../types.ts';

interface WishlistProps {
  wishlistIds: Set<string>;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (item: Wallpaper) => void;
  onNavigateListing: () => void;
  onBack: () => void;
}

const Wishlist: React.FC<WishlistProps> = ({ 
  wishlistIds, 
  onToggleWishlist, 
  onAddToCart,
  onBack
}) => {
  const wishlistItems = MOCK_WALLPAPERS.filter(wp => wishlistIds.has(wp.id));

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <Heart className="w-12 h-12 text-rose-100 mb-4" />
        <h2 className="text-2xl font-serif font-medium text-gray-800 mb-2">Empty Wishlist</h2>
        <button onClick={onBack} className="text-[#600b0b] font-bold uppercase text-[9px] tracking-widest mt-4 underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-serif">
      <div className="flex flex-col items-center mb-8 relative">
        <button onClick={onBack} className="absolute left-0 top-0 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <ArrowLeft className="w-3 h-3" /> Back
        </button>
        <h1 className="text-2xl font-serif font-medium text-gray-800 italic">Your Wishlist</h1>
        <div className="w-6 h-[1px] bg-rose-200 mt-2"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="group flex flex-col bg-white border border-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 max-w-[300px] w-full">
            {/* Standardized 300x200 px (3:2 Aspect) */}
            <div className="aspect-[3/2] overflow-hidden relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <button 
                onClick={() => onToggleWishlist(item.id)}
                className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-rose-800 shadow-md"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-serif font-medium text-gray-800 italic truncate pr-2">{item.name}</h3>
                <span className="text-rose-900 font-medium text-sm">₹{item.price}</span>
              </div>
              <p className="text-[8px] uppercase tracking-widest text-gray-400 font-bold mb-4">
                {item.collection} • {item.roomType}
              </p>
              <button 
                onClick={() => onAddToCart(item)}
                className="mt-auto w-full bg-rose-900 text-white py-2.5 rounded font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3 h-3" /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
