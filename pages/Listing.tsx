
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_WALLPAPERS, CATEGORIES, SPACES } from '../constants.tsx';
import { 
  Heart, 
  ArrowLeft, 
  X,
  SlidersHorizontal,
  ShoppingBag,
  Sparkles,
  Palette,
  Layout,
  IndianRupee,
  Layers,
  Wind,
  ChevronRight,
  Plus,
  Home as HomeIcon
} from 'lucide-react';
import { Wallpaper, CartItem } from '../types.ts';

interface ListingProps {
  initialFilter: { type: string; value: string } | null;
  onToggleWishlist: (id: string) => void;
  wishlistIds: Set<string>;
  onSelectWallpaper: (item: Wallpaper) => void;
  onAddToCart: (item: CartItem) => void;
  onBack: () => void;
}

const COLORS = [
  { name: 'White', hex: '#FFFFFF', border: 'border-gray-200' },
  { name: 'Blue', hex: '#3B82F6', border: 'border-transparent' },
  { name: 'Green', hex: '#10B981', border: 'border-transparent' },
  { name: 'Pink', hex: '#EC4899', border: 'border-transparent' },
  { name: 'Grey', hex: '#6B7280', border: 'border-transparent' },
  { name: 'Teal', hex: '#14B8A6', border: 'border-transparent' },
  { name: 'Gold', hex: '#D4AF37', border: 'border-transparent' },
];

const Listing: React.FC<ListingProps> = ({ 
  initialFilter, 
  onToggleWishlist, 
  wishlistIds,
  onSelectWallpaper,
  onAddToCart,
  onBack
}) => {
  const [sortBy, setSortBy] = useState('Relevance');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [activeFilters, setActiveFilters] = useState({
    category: initialFilter?.type === 'category' ? initialFilter.value : 'all',
    roomType: initialFilter?.type === 'roomType' ? initialFilter.value : 'all',
    type: 'all',
    mood: 'all',
    color: 'all',
    surface: 'all',
    priceRange: 'all',
    vastu: false,
  });

  useEffect(() => {
    if (initialFilter) {
      setActiveFilters(prev => ({
        ...prev,
        [initialFilter.type]: initialFilter.value
      }));
    }
  }, [initialFilter]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSidebarOpen]);

  const filteredWallpapers = useMemo(() => {
    return MOCK_WALLPAPERS.filter(wp => {
      const catMatch = activeFilters.category === 'all' || wp.category === activeFilters.category;
      
      let roomMatch = activeFilters.roomType === 'all';
      if (!roomMatch) {
        roomMatch = Array.isArray(wp.roomType) 
          ? wp.roomType.includes(activeFilters.roomType) 
          : wp.roomType === activeFilters.roomType;
      }

      const colorMatch = activeFilters.color === 'all' || wp.color === activeFilters.color;
      const moodMatch = activeFilters.mood === 'all' || wp.mood === activeFilters.mood;
      const surfaceMatch = activeFilters.surface === 'all' || wp.surface === activeFilters.surface;
      
      let priceMatch = true;
      if (activeFilters.priceRange === 'Under 120') priceMatch = wp.price < 120;
      if (activeFilters.priceRange === '120-150') priceMatch = wp.price >= 120 && wp.price <= 150;
      if (activeFilters.priceRange === 'Over 150') priceMatch = wp.price > 150;

      const vastuMatch = !activeFilters.vastu || (wp.color === 'Green' || wp.color === 'Teal' || wp.mood === 'Serene');

      return catMatch && roomMatch && colorMatch && moodMatch && surfaceMatch && priceMatch && vastuMatch;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low → High') return a.price - b.price;
      if (sortBy === 'Price: High → Low') return b.price - a.price;
      return 0;
    });
  }, [activeFilters, sortBy]);

  const toggleFilter = (key: string, value: string | boolean) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: prev[key as keyof typeof prev] === value ? (typeof value === 'boolean' ? false : 'all') : value
    }));
  };

  const handleQuickAdd = (e: React.MouseEvent, wp: Wallpaper) => {
    e.stopPropagation();
    onAddToCart({
      ...wp,
      quantity: 1,
      totalArea: 100, // Default for quick add
      totalPrice: wp.price * 100
    });
  };

  const FilterSection = ({ title, icon: Icon, children }: any) => (
    <div className="py-6 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-3.5 h-3.5 text-[#600b0b]" />
        <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-900">{title}</h4>
      </div>
      {children}
    </div>
  );

  const FiltersContent = () => (
    <div className="space-y-1">
      <FilterSection title="Category / Space" icon={Layout}>
        <div className="flex flex-wrap gap-2">
          {['all', ...CATEGORIES.map(c => c.name)].map(cat => (
            <button 
              key={cat}
              onClick={() => toggleFilter('category', cat)}
              className={`px-3 py-2 rounded-lg text-[10px] font-bold tracking-tight transition-all ${activeFilters.category === cat ? 'bg-[#600b0b] text-white shadow-lg scale-105' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent'}`}
            >
              {cat === 'all' ? 'All Styles' : cat}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Wallpaper Type" icon={Layers}>
        <div className="space-y-2">
          {['Peel & Stick', 'Traditional Paper', 'Non-Woven Fabric'].map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="type"
                checked={activeFilters.type === type}
                onChange={() => toggleFilter('type', type)}
                className="w-4 h-4 border-gray-300 text-[#600b0b] focus:ring-[#600b0b]"
              />
              <span className={`text-xs font-medium transition-colors ${activeFilters.type === type ? 'text-[#600b0b] font-bold' : 'text-gray-500 group-hover:text-gray-900'}`}>{type}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Interior Mood" icon={Sparkles}>
        <div className="grid grid-cols-2 gap-2">
          {['Minimalist', 'Traditional', 'Bohemian', 'Contemporary', 'Playful'].map(mood => (
            <button 
              key={mood}
              onClick={() => toggleFilter('mood', mood)}
              className={`px-2 py-2.5 text-[10px] font-bold border rounded-lg transition-all ${activeFilters.mood === mood ? 'border-[#600b0b] bg-rose-50 text-[#600b0b]' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
            >
              {mood}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Colors" icon={Palette}>
        <div className="flex flex-wrap gap-3">
          {COLORS.map(color => (
            <button 
              key={color.name}
              onClick={() => toggleFilter('color', color.name)}
              title={color.name}
              className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-125 ${color.border} ${activeFilters.color === color.name ? 'ring-2 ring-[#600b0b] ring-offset-2 scale-125' : ''}`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
          <button 
            onClick={() => toggleFilter('color', 'all')}
            className={`text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#600b0b] transition-colors`}
          >
            Clear
          </button>
        </div>
      </FilterSection>

      <FilterSection title="Price Range" icon={IndianRupee}>
        <div className="space-y-2">
          {['Under 120', '120-150', 'Over 150'].map(range => (
            <label key={range} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="price"
                checked={activeFilters.priceRange === range}
                onChange={() => toggleFilter('priceRange', range)}
                className="w-4 h-4 border-gray-300 text-[#600b0b] focus:ring-[#600b0b]"
              />
              <span className={`text-xs font-medium transition-colors ${activeFilters.priceRange === range ? 'text-[#600b0b] font-bold' : 'text-gray-500 group-hover:text-gray-900'}`}>{range}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Vastu Preference" icon={Wind}>
        <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100">
           <div className="space-y-0.5">
             <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight">Vastu Compliant</p>
             <p className="text-[10px] text-gray-400 italic">Filter by positive energy</p>
           </div>
           <button 
             onClick={() => toggleFilter('vastu', !activeFilters.vastu)}
             className={`w-11 h-6 rounded-full transition-all relative ${activeFilters.vastu ? 'bg-[#600b0b]' : 'bg-gray-300'}`}
           >
             <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${activeFilters.vastu ? 'left-6' : 'left-1'}`} />
           </button>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
             <button onClick={onBack} className="hover:text-[#600b0b] flex items-center gap-1 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
             <span className="opacity-20">/</span>
             <button onClick={() => { setActiveFilters(prev => ({...prev, category: 'all', roomType: 'all'})) }} className="hover:text-[#600b0b] transition-colors">All Collections</button>
             {(activeFilters.category !== 'all' || activeFilters.roomType !== 'all') && (
               <>
                 <span className="opacity-20">/</span>
                 <span className="text-[#600b0b]">{activeFilters.category !== 'all' ? activeFilters.category : activeFilters.roomType}</span>
               </>
             )}
          </div>
          
          <div className="flex items-center gap-6">
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-800 bg-gray-50 px-5 py-2.5 rounded-full border border-gray-200 hover:bg-[#600b0b] hover:text-white hover:border-[#600b0b] transition-all group shadow-sm"
             >
               <SlidersHorizontal className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> Filter & Refine
             </button>

             <div className="hidden md:flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sort:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-[10px] font-black uppercase tracking-widest text-gray-900 outline-none border-b border-gray-200 pb-0.5 focus:border-[#600b0b] transition-colors cursor-pointer"
                >
                  <option>Relevance</option>
                  <option>Price: Low → High</option>
                  <option>Price: High → Low</option>
                </select>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 pt-12 pb-20">
        
        {/* CIRCULAR CATEGORY NAVIGATION SECTION */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6 px-4">
             <Layout className="w-4 h-4 text-[#600b0b]" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Shop by Design Style</h3>
          </div>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-6 px-4">
             {CATEGORIES.map((cat) => (
               <button 
                key={cat.name} 
                onClick={() => toggleFilter('category', cat.name)}
                className="flex flex-col items-center group shrink-0"
               >
                 <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 transition-all duration-500 ring-offset-4 ring-2 ${activeFilters.category === cat.name ? 'ring-[#600b0b] scale-110 shadow-xl' : 'ring-transparent hover:scale-105'}`}>
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-700" 
                    />
                 </div>
                 <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-colors ${activeFilters.category === cat.name ? 'text-[#600b0b]' : 'text-gray-400 group-hover:text-gray-900'}`}>
                   {cat.name}
                 </span>
               </button>
             ))}
          </div>
        </div>

        {/* CIRCULAR SPACE NAVIGATION SECTION */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 px-4">
             <HomeIcon className="w-4 h-4 text-[#600b0b]" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Shop by Your Space</h3>
          </div>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-6 px-4">
             {SPACES.map((space) => (
               <button 
                key={space.name} 
                onClick={() => toggleFilter('roomType', space.name)}
                className="flex flex-col items-center group shrink-0"
               >
                 <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 transition-all duration-500 ring-offset-4 ring-2 ${activeFilters.roomType === space.name ? 'ring-[#600b0b] scale-110 shadow-xl' : 'ring-transparent hover:scale-105'}`}>
                    <img 
                      src={space.image} 
                      alt={space.name} 
                      className="w-full h-full object-cover transition-transform duration-700" 
                    />
                 </div>
                 <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-colors ${activeFilters.roomType === space.name ? 'text-[#600b0b]' : 'text-gray-400 group-hover:text-gray-900'}`}>
                   {space.name}
                 </span>
               </button>
             ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center mb-16 px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-serif italic text-gray-900 mb-6 capitalize leading-tight">
            {activeFilters.category === 'all' && activeFilters.roomType === 'all' 
              ? 'Eco-friendly wall coverings' 
              : activeFilters.category !== 'all' ? activeFilters.category : activeFilters.roomType}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-gray-200"></div>
            <p className="text-[12px] font-bold text-gray-400 tracking-[0.4em] uppercase">
              {filteredWallpapers.length} Designs found
            </p>
            <div className="w-10 h-px bg-gray-200"></div>
          </div>
        </div>

        {filteredWallpapers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16">
            {filteredWallpapers.map((wp) => (
              <div key={wp.id} className="group cursor-pointer">
                <div 
                  onClick={() => onSelectWallpaper(wp)}
                  className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 mb-6 relative shadow-sm ring-1 ring-gray-100 transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2"
                >
                  <img src={wp.image} alt={wp.name} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" />
                  
                  <div className="absolute top-5 right-5 flex flex-col gap-3 z-10">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleWishlist(wp.id); }} 
                      className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${wishlistIds.has(wp.id) ? 'bg-[#600b0b] text-white' : 'bg-white/90 text-gray-400 hover:text-[#600b0b]'}`}
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${wishlistIds.has(wp.id) ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button 
                      onClick={(e) => handleQuickAdd(e, wp)}
                      className="p-3 bg-white/90 text-gray-400 rounded-full shadow-lg transition-all duration-300 hover:bg-[#600b0b] hover:text-white hover:scale-110"
                      title="Quick Add to Cart"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-1.5 rounded-2xl shadow-2xl flex flex-col gap-1.5">
                      <button 
                        className="w-full bg-[#600b0b] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 hover:bg-[#800d0d] transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> View Full Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-3 space-y-1">
                   <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">{wp.collection}</p>
                   <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-[#600b0b] transition-colors truncate">{wp.name}</h3>
                   <div className="flex items-center justify-between pt-1">
                     <span className="text-sm font-black text-[#600b0b]">₹{wp.price} <span className="text-[10px] text-gray-400 font-normal">/ sq.ft</span></span>
                     <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter bg-gray-50 px-2.5 py-1 rounded-lg">{wp.surface}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-gray-400 bg-[#FAFAFA] rounded-[4rem] border-2 border-dashed border-gray-200">
            <Sparkles className="w-14 h-14 mb-4 opacity-10" />
            <p className="text-xl italic font-serif text-gray-600 mb-6 text-center">We couldn't find designs matching <br/> those specific criteria.</p>
            <button 
              onClick={() => setActiveFilters({category: 'all', roomType: 'all', type: 'all', mood: 'all', color: 'all', surface: 'all', priceRange: 'all', vastu: false})} 
              className="bg-[#600b0b] text-white px-10 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-lg hover:bg-[#800d0d] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
         <div className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity" onClick={() => setIsSidebarOpen(false)} />
         
         <aside className={`absolute top-0 left-0 bottom-0 w-full max-w-[420px] bg-white shadow-2xl transition-transform duration-500 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <div className="p-8 md:p-12 border-b border-gray-50 flex items-center justify-between shrink-0">
             <div className="space-y-1">
               <h2 className="text-3xl font-bold font-serif italic text-gray-900">Filter Selection</h2>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{filteredWallpapers.length} Designs found</p>
             </div>
             <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="p-4 bg-gray-50 rounded-full hover:bg-rose-50 text-gray-400 hover:text-[#600b0b] transition-all"
             >
                <X className="w-6 h-6" />
             </button>
           </div>
           
           <div className="flex-grow overflow-y-auto px-8 md:px-12 py-8 no-scrollbar">
             <FiltersContent />
           </div>

           <div className="p-8 md:p-12 border-t border-gray-50 bg-[#FBFBFB] flex gap-4 shrink-0">
             <button 
               onClick={() => {
                 setActiveFilters({category: 'all', roomType: 'all', type: 'all', mood: 'all', color: 'all', surface: 'all', priceRange: 'all', vastu: false});
               }} 
               className="flex-1 py-4 border-2 border-gray-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-[#600b0b] hover:text-[#600b0b] transition-all"
             >
               Clear All
             </button>
             <button 
               onClick={() => setIsSidebarOpen(false)} 
               className="flex-1 py-4 bg-[#600b0b] text-white rounded-2xl text-[10px] font-bold uppercase shadow-2xl tracking-widest hover:bg-[#800d0d] transition-all flex items-center justify-center gap-2"
             >
               Apply Filters <ChevronRight className="w-4 h-4" />
             </button>
           </div>
         </aside>
      </div>
    </div>
  );
};

export default Listing;
