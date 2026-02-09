
import React, { useState, useEffect, useCallback } from 'react';
import { Page, Wallpaper, CartItem } from './types.ts';
import Home from './pages/Home.tsx';
import Listing from './pages/Listing.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Wishlist from './pages/Wishlist.tsx';
import Cart from './pages/Cart.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

interface PageState {
  page: Page;
  filter: { type: string; value: string } | null;
  selectedWallpaper?: Wallpaper;
}

const App: React.FC = () => {
  const [history, setHistory] = useState<PageState[]>([{ page: Page.Home, filter: null }]);
  
  const currentState = history[history.length - 1];
  const currentPage = currentState.page;
  const selectedFilter = currentState.filter;
  const selectedWallpaper = currentState.selectedWallpaper;

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigateTo = useCallback((page: Page, filter: { type: string; value: string } | null = null, selectedWallpaper?: Wallpaper) => {
    setHistory(prev => [...prev, { page, filter, selectedWallpaper }]);
  }, []);

  const handleBack = useCallback(() => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  }, [history]);

  const toggleWishlist = (id: string) => {
    setWishlistIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    navigateTo(Page.Cart, null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return (
          <Home 
            onNavigateListing={(t, v) => navigateTo(Page.Listing, { type: t, value: v })} 
            onSelectWallpaper={(wp) => navigateTo(Page.ProductDetail, null, wp)}
          />
        );
      case Page.Listing:
        return (
          <Listing 
            initialFilter={selectedFilter} 
            onToggleWishlist={toggleWishlist}
            wishlistIds={wishlistIds}
            onSelectWallpaper={(wp) => navigateTo(Page.ProductDetail, null, wp)}
            onAddToCart={addToCart}
            onBack={handleBack}
          />
        );
      case Page.ProductDetail:
        return selectedWallpaper ? (
          <ProductDetail 
            wallpaper={selectedWallpaper}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isWishlisted={wishlistIds.has(selectedWallpaper.id)}
            onBack={handleBack}
            onSelectWallpaper={(wp) => navigateTo(Page.ProductDetail, null, wp)}
          />
        ) : (
          <Home 
            onNavigateListing={(t, v) => navigateTo(Page.Listing, { type: t, value: v })} 
            onSelectWallpaper={(wp) => navigateTo(Page.ProductDetail, null, wp)}
          />
        );
      case Page.Wishlist:
        return (
          <Wishlist 
            wishlistIds={wishlistIds} 
            onToggleWishlist={toggleWishlist}
            onAddToCart={(wp) => navigateTo(Page.ProductDetail, null, wp)}
            onNavigateListing={() => navigateTo(Page.Listing, { type: 'all', value: 'all' })}
            onBack={handleBack}
          />
        );
      case Page.Cart:
        return (
          <Cart 
            items={cart} 
            onUpdateQuantity={(id, delta) => setCart(p => p.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta)} : i))}
            onRemoveItem={(id) => setCart(p => p.filter(i => i.id !== id))}
            onNavigateListing={() => navigateTo(Page.Listing, { type: 'all', value: 'all' })}
            onBack={handleBack}
          />
        );
      default:
        return (
          <Home 
            onNavigateListing={(t, v) => navigateTo(Page.Listing, { type: t, value: v })} 
            onSelectWallpaper={(wp) => navigateTo(Page.ProductDetail, null, wp)}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Promo Bar */}
      <div className="bg-[#600b0b] text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2 text-center flex items-center justify-center gap-2 h-9">
        <span>GET 10% OFF ON YOUR FIRST WALLPAPER ORDER! USE CODE:</span>
        <span className="bg-white text-[#600b0b] px-2 py-0.5 rounded-sm font-black tracking-widest text-[11px] shadow-sm leading-none">
          FIRST10
        </span>
      </div>

      <Header 
        onNavigateHome={() => navigateTo(Page.Home, null)} 
        onNavigateListing={(t, v) => navigateTo(Page.Listing, { type: t || 'all', value: v || 'all' })} 
        onNavigateWishlist={() => navigateTo(Page.Wishlist, null)}
        onNavigateCart={() => navigateTo(Page.Cart, null)}
        onBack={handleBack}
        canGoBack={history.length > 1 && currentPage !== Page.Home}
        wishlistCount={wishlistIds.size}
        cartCount={cart.length}
      />

      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default App;
