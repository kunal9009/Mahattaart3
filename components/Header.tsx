
import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, Heart, X, ChevronLeft } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateListing: (type?: string, value?: string) => void;
  onNavigateWishlist: () => void;
  onNavigateCart: () => void;
  onBack: () => void;
  canGoBack: boolean;
  wishlistCount: number;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigateHome, 
  onNavigateListing, 
  onNavigateWishlist, 
  onNavigateCart,
  onBack,
  canGoBack,
  wishlistCount,
  cartCount
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const navItems = [
    { label: 'Wall Art', action: () => onNavigateListing('category', 'Scenic') },
    { label: 'Print & Frame', action: () => onNavigateListing('category', 'Modern') },
    { label: 'Wallpaper', action: () => onNavigateListing('all', 'all') },
    { label: 'art set', action: () => onNavigateListing('category', 'Geometric') },
    { label: 'Art For Business', action: () => onNavigateListing('roomType', 'Office') }
  ];

  return (
    <header className="bg-white z-40 border-b border-gray-100 font-serif h-[88px] w-full">
      <div className="px-6 h-full">
        <div className="max-w-[1600px] mx-auto flex items-center h-full justify-between gap-4 md:gap-10">
          
          {/* Logo Section */}
          <div className="flex items-center gap-4 shrink-0">
            {canGoBack && (
              <button 
                onClick={onBack}
                className="p-2 -ml-2 hover:bg-rose-50 rounded-full text-[#600b0b] transition-all group/back"
                aria-label="Go Back"
              >
                <ChevronLeft className="w-6 h-6 group-hover/back:-translate-x-1 transition-transform" />
              </button>
            )}
            
            <div 
              onClick={onNavigateHome}
              className="flex items-center cursor-pointer hover:opacity-90 transition-all select-none"
            >
              <span className="text-[28px] md:text-[36px] font-normal tracking-tight text-[#600b0b] font-serif leading-none">
                Mahatta
              </span>
              <div className="bg-[#600b0b] text-white px-2 py-1.5 flex items-center justify-center leading-none ml-2 rounded-[2px]">
                <span className="text-xl md:text-[22px] font-bold tracking-tight font-sans">ART</span>
              </div>
            </div>
          </div>

          {/* Navigation - Italic Serif exactly like image */}
          <nav className={`hidden lg:flex items-center gap-6 xl:gap-12 shrink-0 transition-opacity duration-300 ${isSearchExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {navItems.map((item) => (
              <button 
                key={item.label}
                onClick={item.action}
                className="text-[17px] font-normal text-gray-700 hover:text-[#600b0b] transition-colors whitespace-nowrap italic py-2 relative group font-serif"
              >
                {item.label}
                <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-[#600b0b] transition-all duration-500 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Action Icons Section */}
          <div className="flex items-center justify-end flex-grow gap-2 md:gap-4">
            {/* Expandable Search Input Container */}
            <div className={`relative flex items-center transition-all duration-500 h-10 ${
              isSearchExpanded ? 'flex-grow max-w-sm' : 'w-10'
            }`}>
              <div className={`absolute inset-0 flex items-center bg-gray-50 rounded-full border transition-all duration-500 ${
                isSearchExpanded 
                  ? 'px-4 opacity-100 border-gray-200 shadow-md bg-white' 
                  : 'bg-transparent opacity-0 border-transparent pointer-events-none'
              }`}>
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-transparent border-none text-sm outline-none placeholder:text-gray-300 italic font-serif"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onNavigateListing('search', (e.target as HTMLInputElement).value);
                    }
                  }}
                />
                <button onClick={() => setIsSearchExpanded(false)} className="p-1 hover:text-[#600b0b]">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              {!isSearchExpanded && (
                <button 
                  onClick={() => setIsSearchExpanded(true)}
                  className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-[#600b0b] transition-all"
                  aria-label="Search"
                >
                  <Search className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Heart and Cart Group */}
            <div className="flex items-center gap-1 md:gap-4 shrink-0">
              <button 
                onClick={onNavigateWishlist}
                className="relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-[#600b0b] transition-all"
              >
                <Heart className={`w-6 h-6 ${wishlistCount > 0 ? 'fill-[#600b0b] text-[#600b0b]' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-[#600b0b] text-white text-[9px] font-bold min-w-[16px] h-[16px] flex items-center justify-center rounded-full border border-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button 
                onClick={onNavigateCart}
                className="relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-[#600b0b] transition-all"
              >
                <ShoppingBag className={`w-6 h-6 ${cartCount > 0 ? 'text-[#600b0b]' : ''}`} />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-[#600b0b] text-white text-[9px] font-bold min-w-[16px] h-[16px] flex items-center justify-center rounded-full border border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Vertical Divider */}
              <div className="hidden sm:block w-px h-8 bg-gray-200 mx-1"></div>

              <button 
                className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-[#600b0b] transition-all"
                aria-label="Profile"
              >
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
