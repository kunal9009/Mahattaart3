
import React, { useState, useEffect } from 'react';
import { CATEGORIES, SPACES, MOODS } from '../constants.tsx';
import { ArrowRight, ChevronRight, Upload, ShieldCheck, Waves, Sparkles, UserCheck, Search, ArrowLeft } from 'lucide-react';
import { Wallpaper } from '../types.ts';

interface HomeProps {
  onNavigateListing: (type: string, value: string) => void;
  onSelectWallpaper: (wp: Wallpaper) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateListing, onSelectWallpaper }) => {
  const [activeHero, setActiveHero] = useState(0);
  const heroImages = [
    { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600', room: 'Living Room' },
    { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600', room: 'Bedroom' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600', room: 'Office' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* ZONE 1: Hero Section */}
      <section className="relative h-screen md:h-[60vh] overflow-hidden group">
        {heroImages.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeHero ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={img.url} className="w-full h-full object-cover brightness-[0.6]" alt={img.room} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent"></div>
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24 md:pb-0 md:justify-center items-start text-white">
          <h1 className="text-3xl md:text-5xl font-bold max-w-2xl leading-tight mb-4">
            Transform Your Space with Wallpapers for Indian Homes
          </h1>
          <p className="text-base md:text-lg text-gray-200 mb-8 max-w-lg">
            See in Your Room | Museum-Grade Quality | Expert Installation
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
            <span>15,000+ Happy Homes</span>
            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
            <span>Pan-India Delivery</span>
          </div>
        </div>
      </section>

      {/* ZONE 2: Primary Navigation */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-center">Start Your Design Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Categories */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
              <h3 className="text-xl font-semibold mb-6">Browse by Category</h3>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {CATEGORIES.slice(0, 9).map((cat) => (
                  <div 
                    key={cat.name}
                    onClick={() => onNavigateListing('category', cat.name)}
                    className="group cursor-pointer text-center"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden mb-1 ring-1 ring-gray-100">
                      <img src={cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={cat.name} />
                    </div>
                    <span className="text-[10px] font-medium text-gray-500 group-hover:text-mahatta-blue">{cat.name}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigateListing('all', 'all')} className="mt-auto text-mahatta-blue font-semibold text-sm flex items-center gap-2 hover:underline">
                See All Categories <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2: Spaces */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
              <h3 className="text-xl font-semibold mb-6">Browse by Space</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {SPACES.slice(0, 4).map((space) => (
                  <div 
                    key={space.name}
                    onClick={() => onNavigateListing('roomType', space.name)}
                    className="group cursor-pointer relative aspect-[4/3] rounded-xl overflow-hidden"
                  >
                    <img src={space.image} className="w-full h-full object-cover brightness-[0.7] group-hover:scale-110 transition-transform" alt={space.name} />
                    <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                      <span className="text-white text-xs font-bold uppercase tracking-widest">{space.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigateListing('all', 'all')} className="mt-auto text-mahatta-blue font-semibold text-sm flex items-center gap-2 hover:underline">
                See All Rooms <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3: Custom Design */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-mahatta-blue/10 rounded-full flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-mahatta-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Can't Find What You Want?</h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Upload your design or work with our artists to create something truly unique.
              </p>
              <button className="btn-primary w-full mt-auto flex items-center justify-center gap-2">
                Start Custom Design <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ZONE 3: Personalized Recommendations */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Trending in New Delhi</h2>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 -mx-6 px-6 snap-x">
            {MOODS.map((mood) => (
              <div 
                key={mood.id} 
                onClick={() => onSelectWallpaper(mood as any)}
                className="snap-start flex-shrink-0 w-[240px] md:w-[300px] product-card overflow-hidden cursor-pointer"
              >
                <div className="aspect-[16/9] relative">
                  <img src={mood.image} className="w-full h-full object-cover" alt={mood.name} />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:text-red-500 transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold truncate mb-1">{mood.name}</h4>
                  <p className="text-lg font-bold text-mahatta-accent">Rs.{mood.price}/sq.ft.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE 4: Why MahattaArt */}
      <section className="py-20 bg-white border-y border-gray-100 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-16 text-center">Why Choose MahattaArt</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: <ShieldCheck className="w-12 h-12" />, title: 'Museum-Grade Quality', desc: 'Water-Resistant | Easy to Clean' },
              { icon: <Sparkles className="w-12 h-12" />, title: 'Any Size, Any Design', desc: 'Custom Options Available' },
              { icon: <Waves className="w-12 h-12" />, title: 'See in Your Room', desc: 'AR Try-On | 3D Mockups' },
              { icon: <UserCheck className="w-12 h-12" />, title: 'Free Consultation', desc: 'Expert Installation | Secure Checkout' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="text-mahatta-blue mb-6">{item.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE 5: How It Works */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-16 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gray-200 z-0"></div>
            {[
              { step: '1', title: 'Browse', desc: 'Choose from thousands of designs' },
              { step: '2', title: 'Visualize', desc: 'See in your room with AR or mockups' },
              { step: '3', title: 'Customize', desc: 'Select size and material' },
              { step: '4', title: 'Install', desc: 'Order sample or buy with installation' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-mahatta-blue text-white flex items-center justify-center text-3xl font-bold mb-6 border-8 border-white shadow-sm">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE 6: Final CTA */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight">Ready to Reimagine Your Space?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button onClick={() => onNavigateListing('all', 'all')} className="btn-primary min-w-[240px]">Browse All Wallpapers</button>
            <button className="btn-secondary min-w-[240px]">Book Free Consultation</button>
          </div>
          <p className="text-sm text-gray-500 italic">
            Still unsure? Talk to our design experts - free, no obligation
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
