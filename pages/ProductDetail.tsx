
import React, { useState, useMemo } from 'react';
import { Wallpaper, CartItem } from '../types.ts';
import { 
  Heart, 
  ShoppingBag, 
  Ruler, 
  ShieldCheck, 
  Share2, 
  ZoomIn, 
  CheckCircle2, 
  Star, 
  Truck, 
  CreditCard, 
  ChevronRight, 
  Trash2, 
  Plus,
  ChevronDown,
  Sparkles,
  Calculator
} from 'lucide-react';
import { MOCK_WALLPAPERS } from '../constants.tsx';

interface Wall {
  id: string;
  width: number;
  height: number;
  unit: 'Feet' | 'Inches' | 'CM';
}

interface PDPProps {
  wallpaper: Wallpaper;
  onAddToCart: (item: CartItem) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
  onBack: () => void;
  onSelectWallpaper: (wp: Wallpaper) => void;
}

const ProductDetail: React.FC<PDPProps> = ({ 
  wallpaper, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted,
  onBack,
  onSelectWallpaper
}) => {
  const [sizeType, setSizeType] = useState<string>('Custom');
  const [walls, setWalls] = useState<Wall[]>([
    { id: '1', width: 1, height: 1, unit: 'Feet' }
  ]);
  const [surface, setSurface] = useState<string>('Canvas');
  const [selectedSpace, setSelectedSpace] = useState<string>('Bedroom');

  const spaces = useMemo(() => {
    return Object.entries(wallpaper.roomImages || { Design: wallpaper.image });
  }, [wallpaper]);

  const currentPreviewImage = useMemo(() => {
    return wallpaper.roomImages?.[selectedSpace] || wallpaper.image;
  }, [selectedSpace, wallpaper]);

  const addWall = () => {
    setWalls([...walls, { id: Date.now().toString(), width: 1, height: 1, unit: 'Feet' }]);
  };

  const removeWall = (id: string) => {
    if (walls.length > 1) {
      setWalls(walls.filter(w => w.id !== id));
    }
  };

  const updateWall = (id: string, field: keyof Wall, value: any) => {
    setWalls(walls.map(w => w.id === id ? { ...w, [field]: value } : w));
  };

  const totalAreaSqFt = useMemo(() => {
    if (sizeType === 'Sample') return 2; // Fixed sample size (approx 2 sq ft)
    if (sizeType === 'Standard') return 100; // Fixed standard size (approx 10x10)

    return walls.reduce((sum, wall) => {
      let w = wall.width;
      let h = wall.height;
      
      if (wall.unit === 'Inches') {
        w = w / 12;
        h = h / 12;
      } else if (wall.unit === 'CM') {
        w = w / 30.48;
        h = h / 30.48;
      }
      
      return sum + (w * h);
    }, 0);
  }, [walls, sizeType]);

  const surfacePriceMap: { [key: string]: number } = {
    'Glitter': 30,
    'Premium Canvas': 50,
    'Non-Woven': 20,
    'Self Adhesive': 40,
    'Canvas': 0
  };

  const unitPrice = wallpaper.price + (surfacePriceMap[surface] || 0);
  const totalPrice = totalAreaSqFt * unitPrice;

  const alternatives = useMemo(() => 
    MOCK_WALLPAPERS.filter(w => w.id !== wallpaper.id).slice(0, 6),
    [wallpaper]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* GLOBAL TRUST BAR */}
      <div className="bg-gray-100 py-2.5 border-b border-gray-200 flex items-center justify-center gap-6 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
         <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Pan-India Delivery</span>
         <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Museum-Grade Quality</span>
         <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> EMI Available</span>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        
        {/* PURCHASE PANEL */}
        <div className="lg:col-span-5 p-6 md:p-12 lg:border-r border-gray-100 order-2 lg:order-1 bg-white">
          <div className="lg:sticky lg:top-10 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#600b0b] uppercase tracking-widest">
                {wallpaper.collection} / {wallpaper.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {wallpaper.name}
              </h1>
              <div className="flex items-center gap-4 py-2">
                 <p className="text-xs text-gray-400 font-medium">SKU: {wallpaper.id}</p>
                 <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-bold text-gray-400 ml-1">4.8 (142 reviews)</span>
                 </div>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900 tracking-tight">Rs.{unitPrice}</span>
                <span className="text-gray-400 text-sm font-medium">per sq.ft.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* SIZE TYPE SELECTOR */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600">Size Type</label>
                <div className="relative">
                  <select 
                    value={sizeType}
                    onChange={(e) => setSizeType(e.target.value)}
                    className="w-full appearance-none bg-white border border-orange-200 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-orange-300 outline-none transition-all cursor-pointer pr-10"
                  >
                    <option value="Sample">Sample</option>
                    <option value="Standard">Standard</option>
                    <option value="Custom">Custom</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* SURFACE TYPE SELECTOR */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600">Surface Type</label>
                <div className="relative">
                  <select 
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                    className="w-full appearance-none bg-white border border-orange-200 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-orange-300 outline-none transition-all cursor-pointer pr-10"
                  >
                    <option value="Glitter">Glitter</option>
                    <option value="Premium Canvas">Premium Canvas</option>
                    <option value="Non-Woven">Non-Woven</option>
                    <option value="Self Adhesive">Self Adhesive</option>
                    <option value="Canvas">Canvas</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* WALL SIZE CALCULATOR - ONLY FOR CUSTOM */}
            {sizeType === 'Custom' ? (
              <div className="bg-[#F8F7F5] rounded-xl overflow-hidden border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-[#F2F1ED] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#600b0b] p-1 rounded-sm">
                      <Calculator className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-700">Wall Size Calculator</h3>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="p-5 space-y-4">
                  {walls.map((wall, index) => (
                    <div key={wall.id} className="space-y-1">
                      <p className="text-[11px] font-semibold text-gray-500 mb-1">Wall {index + 1}</p>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          value={wall.width}
                          onChange={(e) => updateWall(wall.id, 'width', Math.max(0, Number(e.target.value)))}
                          placeholder="Width"
                          className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#600b0b] outline-none"
                        />
                        <input 
                          type="number" 
                          value={wall.height}
                          onChange={(e) => updateWall(wall.id, 'height', Math.max(0, Number(e.target.value)))}
                          placeholder="Height"
                          className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#600b0b] outline-none"
                        />
                        <div className="relative shrink-0">
                          <select 
                            value={wall.unit}
                            onChange={(e) => updateWall(wall.id, 'unit', e.target.value)}
                            className="appearance-none bg-white border border-gray-200 rounded-md px-3 py-2 pr-8 text-sm focus:ring-1 focus:ring-[#600b0b] outline-none cursor-pointer"
                          >
                            <option value="Feet">Feet</option>
                            <option value="Inches">Inches</option>
                            <option value="CM">CM</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                        </div>
                        <button 
                          onClick={() => removeWall(wall.id)}
                          className={`p-2 text-red-700 hover:bg-red-50 rounded-md transition-colors ${walls.length === 1 ? 'opacity-20 cursor-not-allowed' : ''}`}
                          disabled={walls.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={addWall}
                    className="bg-[#800010] text-white px-4 py-2 rounded-md font-bold text-xs flex items-center gap-2 hover:bg-[#600b0b] transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Wall
                  </button>

                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Area</p>
                      <p className="text-lg font-bold">{totalAreaSqFt.toFixed(2)} sq.ft.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Total</p>
                      <p className="text-2xl font-bold text-[#600b0b] tracking-tight">Rs.{Math.round(totalPrice).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#F8F7F5] rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{sizeType} Coverage</p>
                  <p className="text-lg font-bold">{totalAreaSqFt} sq.ft.</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Total</p>
                  <p className="text-2xl font-bold text-[#600b0b] tracking-tight">Rs.{Math.round(totalPrice).toLocaleString()}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => onAddToCart({ ...wallpaper, quantity: 1, customWidth: walls[0].width, customHeight: walls[0].height, totalArea: totalAreaSqFt, totalPrice })}
                className="bg-[#600b0b] text-white h-[56px] px-4 rounded-lg font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-lg hover:bg-[#800d0d] transition-all"
              >
                <ShoppingBag className="w-5 h-5" /> Buy Now
              </button>
              <button className="border-2 border-[#600b0b] text-[#600b0b] h-[56px] px-4 rounded-lg font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-rose-50 transition-all">
                <ShieldCheck className="w-5 h-5" /> Book Free Consultation
              </button>
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="lg:col-span-7 p-6 md:p-12 order-1 lg:order-2 bg-gray-50 flex flex-col gap-6">
          <div className="space-y-6">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-xl relative bg-white ring-1 ring-gray-100 group">
              <img src={currentPreviewImage} alt={wallpaper.name} className="w-full h-full object-cover transition-opacity duration-500" />
              
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
                <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
                <button onClick={() => onToggleWishlist(wallpaper.id)} className={`bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition-transform ${isWishlisted ? 'text-[#600b0b]' : 'text-gray-700'}`}>
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="absolute bottom-6 left-6">
                 <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-2xl flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-[#D4845C]" /> See on My Wall (AR)
                 </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-2 overflow-x-auto no-scrollbar pb-2">
              {spaces.map(([spaceName, imageUrl]) => (
                <button 
                  key={spaceName}
                  onClick={() => setSelectedSpace(spaceName)}
                  className={`relative p-1 rounded-[12px] shrink-0 transition-all duration-300 ${
                    selectedSpace === spaceName 
                    ? 'ring-[3px] ring-[#600b0b] shadow-lg' 
                    : 'ring-1 ring-gray-200 opacity-60'
                  }`}
                >
                  <div className="w-[100px] md:w-[140px] aspect-[16/10] overflow-hidden rounded-[8px] bg-white">
                    <img src={imageUrl} alt={spaceName} className="w-full h-full object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SIMILAR WALLPAPERS SECTION */}
      <section className="max-w-[1600px] mx-auto px-6 py-24 border-t border-gray-100">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-serif italic font-bold text-gray-900 mb-2">You Might Also Consider</h2>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">Similar Curated Designs</p>
        </div>
        
        <div className="overflow-x-auto no-scrollbar pb-6">
          <div className="flex gap-6 md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-8">
            {alternatives.map((alt) => (
              <div 
                key={alt.id} 
                onClick={() => onSelectWallpaper(alt)}
                className="flex-shrink-0 w-[260px] md:w-auto group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gray-50 mb-4 relative shadow-sm ring-1 ring-gray-100 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                  <img src={alt.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" alt={alt.name} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="px-2">
                   <h4 className="text-[13px] font-bold text-gray-900 truncate group-hover:text-[#600b0b] transition-colors mb-0.5">{alt.name}</h4>
                   <div className="flex items-center justify-between">
                     <p className="text-[11px] font-black text-[#600b0b]">₹{alt.price} <span className="text-[9px] text-gray-400 font-normal">/ sq.ft</span></p>
                     <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#600b0b] group-hover:translate-x-1 transition-all" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SYMBOLS */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[
            'Museum-grade quality', 'Water resistant', 'Easy to clean',
            'Sustainable materials', 'Fast shipping', 'Secure checkout'
          ].map((text, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-[#600b0b]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">{text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
