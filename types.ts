
export interface Wallpaper {
  id: string;
  name: string;
  price: number; // Price per sq.ft
  image: string;
  category: string;
  roomType: string | string[];
  collection: string;
  surface: 'Glossy' | 'Matte';
  mood: string;
  color: string;
  description?: string;
  elements?: string[];
  interiorTheme?: string[];
  colorPalette?: { hex: string; name: string }[];
  roomImages?: { [key: string]: string }; // Map of space names to image URLs
}

export interface CartItem extends Wallpaper {
  quantity: number;
  customWidth?: number;
  customHeight?: number;
  totalArea?: number;
  totalPrice?: number;
}

export interface Review {
  id: string;
  customerName: string;
  text: string;
  image: string;
}

export enum Page {
  Home = 'home',
  Listing = 'listing',
  ProductDetail = 'pdp',
  Wishlist = 'wishlist',
  Cart = 'cart'
}
