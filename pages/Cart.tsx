
import React from 'react';
import { CartItem } from '../types.ts';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigateListing: () => void;
  onBack: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onNavigateListing,
  onBack
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-rose-50 p-6 rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 text-rose-200" />
        </div>
        <h2 className="text-2xl font-serif font-medium text-gray-800 mb-3">Your Cart is Empty</h2>
        <p className="text-gray-500 max-w-sm mb-8 italic text-sm">
          Browse our curated designs and transform your walls.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={onNavigateListing}
            className="bg-rose-900 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-rose-800 transition-all flex items-center justify-center gap-2"
          >
            Browse Collections <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center mb-10 relative">
        <button 
          onClick={onBack}
          className="absolute left-0 top-0 hidden md:flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-rose-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <h1 className="text-3xl font-serif font-medium text-gray-800 mb-2 tracking-wider italic">Your Cart</h1>
        <div className="flex items-center gap-3">
          <div className="w-8 h-[1px] bg-rose-200"></div>
          <ShoppingBag className="w-3.5 h-3.5 text-rose-800" />
          <div className="w-8 h-[1px] bg-rose-200"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-full sm:w-28 aspect-square rounded-xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-serif font-medium text-gray-800 mb-0.5 italic">{item.name}</h3>
                    <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                      {item.collection}
                    </p>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="text-gray-300 hover:text-rose-800 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gray-100 rounded-full p-0.5 bg-gray-50/50">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1.5 hover:bg-white rounded-full transition-all text-gray-600"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-bold text-xs text-gray-800">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1.5 hover:bg-white rounded-full transition-all text-gray-600"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-rose-900 font-medium text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-rose-50/20 border border-rose-100/50 rounded-[2rem] p-8 sticky top-32">
            <h2 className="text-xl font-serif font-medium text-gray-800 mb-6 tracking-tight italic">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-bold text-[10px] tracking-widest uppercase">Free</span>
              </div>
              <div className="pt-3 border-t border-rose-100 flex justify-between items-end">
                <span className="text-gray-800 font-medium text-base">Total</span>
                <span className="text-rose-900 font-medium text-2xl">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-rose-900 text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg hover:bg-rose-800 transition-all mb-4">
              Checkout
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-rose-800 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
