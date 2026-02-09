
import { Wallpaper, Review } from './types';

export const CATEGORIES = [
  { name: 'Floral', image: 'https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fpattern%2FMAWP-C-1569_0.jpg?alt=media', description: 'Curated botanical prints and delicate blooming patterns.' },
  { name: 'Geometric', image: 'https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fpattern%2FMAWP-P-300_0.jpg?alt=media', description: 'Symmetrical precision and bold lines for modern walls.' },
  { name: 'Indian Heritage', image: 'https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fconcept%2FMAWP-C-1863_0.jpg?alt=media', description: 'Traditional motifs and scenes inspired by Indian artistry.' },
  { name: 'Tropical', image: 'https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fpattern%2FMAWP-C-139_0.jpg?alt=media', description: 'Lush greenery and exotic flora for vibrant spaces.' },
  { name: 'Nature & Scenic', image: 'https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fconcept%2FMAWP-C-2077_0.jpg?alt=media', description: 'Expansive vistas and immersive landscape murals.' },
  { name: 'Abstract', image: 'https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fconcept%2FMAWP-C-1344_0.jpg?alt=media', description: 'Fluid forms and contemporary textures for artistic interiors.' },
  { name: 'Kids & Playful', image: 'https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fconcept%2FMAWP-C-1686_0.jpg?alt=media', description: 'Whimsical and educational designs for young minds.' },
];

export const SPACES = [
  { name: 'Living Room', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Dining Room', image: 'https://images.unsplash.com/photo-1617806118233-f8e1074749f1?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Office', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200' },
];

export const MOCK_WALLPAPERS: Wallpaper[] = [
  {
    id: "MAWP-P-300",
    name: "Geometric Line Pattern White Gold",
    price: 115,
    image: "https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fpattern%2FMAWP-P-300_0.jpg?alt=media",
    category: "Geometric",
    roomType: ["Living Room", "Bedroom", "Office", "Hallway", "Lobby", "Retail"],
    collection: "Art Deco Geometry",
    surface: "Matte",
    mood: "Minimalist",
    color: "White",
    description: "A repeating geometric pattern composed of intersecting parallel lines forming rhombuses and elongated hexagonal shapes on a white background.",
    interiorTheme: ["Minimalist", "Contemporary"],
    elements: ["Lines", "Rhombus", "Diamonds", "Grid", "Hexagons"],
    colorPalette: [{ hex: "#FFFFFF", name: "White" }, { hex: "#E8DDC2", name: "Light Gold" }]
  },
  {
    id: "MAWP-P-164",
    name: "Mandala Geometric Floral Teal Yellow",
    price: 125,
    image: "https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fpattern%2FMAWP-P-164_0.jpg?alt=media",
    category: "Indian Heritage",
    roomType: ["Living Room", "Bedroom", "Meditation Room", "Yoga Studio", "Retail"],
    collection: "Mandala & Sacred Geometry",
    surface: "Matte",
    mood: "Bohemian",
    color: "Teal",
    description: "A radially symmetrical geometric design featuring layered floral and leaf motifs in teal, yellow, orange, and red.",
    interiorTheme: ["Bohemian", "Eclectic", "Global Chic"],
    elements: ["Mandala", "Geometric shapes", "Petals", "Leaves"],
    colorPalette: [{ hex: "#F0EBDC", name: "Cream" }, { hex: "#268C8C", name: "Teal" }]
  },
  {
    id: "MAWP-C-1300",
    name: "Mughal Rider Peacock Garden",
    price: 165,
    image: "https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fconcept%2FMAWP-C-1300_0.jpg?alt=media",
    category: "Indian Heritage",
    roomType: ["Living Room", "Dining Room", "Bedroom", "Hallway", "Lobby"],
    collection: "Mughal Miniature Arts",
    surface: "Matte",
    mood: "Traditional",
    color: "Blue",
    description: "A detailed illustration depicts a rider on a horse within a lush garden featuring architectural arches and a peacock.",
    interiorTheme: ["Traditional", "Eclectic", "Colonial"],
    elements: ["Arches", "Peacock", "Horse", "Rider"],
    colorPalette: [{ hex: "#C4D1D4", name: "Light Blue" }, { hex: "#466A48", name: "Dark Olive Green" }]
  },
  {
    id: "MAWP-C-1188",
    name: "Tropical Gold Line Art Leaves",
    price: 140,
    image: "https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fpattern%2FMAWP-C-1188_0.jpg?alt=media",
    category: "Tropical",
    roomType: ["Living Room", "Dining Room", "Bedroom", "Office"],
    collection: "Art Deco Geometry",
    surface: "Matte",
    mood: "Contemporary",
    color: "Green",
    description: "Repeating pattern features various tropical leaves rendered in metallic gold line art.",
    interiorTheme: ["Tropical", "Contemporary", "Eclectic"],
    colorPalette: [{ hex: "#1A3E2D", name: "Deep Green" }, { hex: "#D5B064", name: "Metallic Gold" }]
  },
  {
    id: "MAWP-C-139",
    name: "Tropical Green Leaf Pattern",
    price: 110,
    image: "https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fpattern%2FMAWP-C-139_0.jpg?alt=media",
    category: "Tropical",
    roomType: ["Living Room", "Bedroom", "Bathroom", "Cafe"],
    collection: "Nature Patterns",
    surface: "Matte",
    mood: "Botanical",
    color: "Green",
    description: "A dense, repeating pattern featuring various overlapping tropical leaves in multiple shades of green.",
    interiorTheme: ["Botanical", "Tropical", "Biophilic"]
  },
  {
    id: "MAWP-C-2077",
    name: "Misty Forest Trees Birds",
    price: 145,
    image: "https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fconcept%2FMAWP-C-2077_0.jpg?alt=media",
    category: "Nature & Scenic",
    roomType: ["Living Room", "Bedroom", "Dining Room", "Office"],
    collection: "Mughal Miniature Arts",
    surface: "Matte",
    mood: "Serene",
    color: "Grey",
    description: "Monochromatic forest scene depicting various trees in deep mist with birds perched on branches.",
    interiorTheme: ["Contemporary", "Minimalist", "Nature-Inspired"]
  },
  {
    id: "MAWP-C-1344",
    name: "Abstract Fluid Gold Purple Pink",
    price: 180,
    image: "https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fconcept%2FMAWP-C-1344_0.jpg?alt=media",
    category: "Abstract",
    roomType: ["Living Room", "Bedroom", "Office", "Spa"],
    collection: "Art Deco Geometry",
    surface: "Matte",
    mood: "Glam",
    color: "Pink",
    description: "An abstract composition featuring fluid, organic shapes in shades of purple and pink, accented with scattered gold flakes.",
    interiorTheme: ["Contemporary", "Modern", "Abstract", "Glam"]
  },
  {
    id: "MAWP-C-1686",
    name: "Illustrated Animals Train Blue",
    price: 130,
    image: "https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fconcept%2FMAWP-C-1686_0.jpg?alt=media",
    category: "Kids & Playful",
    roomType: ["Kids Room", "Nursery", "Playroom"],
    collection: "Mughal Miniature Arts",
    surface: "Matte",
    mood: "Playful",
    color: "Blue",
    description: "A mural depicting cartoon animals riding a train on railway tracks under a light blue sky.",
    interiorTheme: ["Kids", "Whimsical"]
  },
  {
    id: "MAWP-C-1687",
    name: "Cartoon Animal World Map",
    price: 150,
    image: "https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fconcept%2FMAWP-C-1687_0.jpg?alt=media",
    category: "Kids & Playful",
    roomType: ["Kids Room", "Playroom", "Classroom"],
    collection: "Indian Folk Art",
    surface: "Matte",
    mood: "Educational",
    color: "Blue",
    description: "A world map featuring simplified illustrations of animals positioned on their native continents.",
    interiorTheme: ["Kids", "Educational", "Playful"]
  },
  {
    id: "MAWP-C-1569",
    name: "White Pink Floral Digital Painting",
    price: 110,
    image: "https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fpattern%2FMAWP-C-1569_0.jpg?alt=media",
    category: "Floral",
    roomType: ["Living Room", "Bedroom", "Spa"],
    collection: "Chintz & Calico",
    surface: "Matte",
    mood: "Serene",
    color: "Pink",
    description: "A repeating pattern of white, blush pink, and light grey flowers with overlapping petals.",
    interiorTheme: ["Contemporary", "Minimalist", "Botanical"]
  },
  {
    id: "MAWP-C-1327",
    name: "Marble Geometric Gold Line",
    price: 145,
    image: "https://storage.googleapis.com/download/storage/v1/b/static-mahattaart-online/o/wallpaper_lowres%2Fpattern%2FMAWP-C-1327_0.jpg?alt=media",
    category: "Geometric",
    roomType: ["Living Room", "Office", "Bathroom"],
    collection: "Moroccan Zellige & Islamic Geometry",
    surface: "Matte",
    mood: "Sophisticated",
    color: "Grey",
    description: "Rectangular blocks featuring white marble texture bordered by thin gold lines.",
    interiorTheme: ["Modern", "Contemporary", "Art Deco"]
  }
];

export const REVIEWS: Review[] = [
  { id: '1', customerName: 'Sarah Jenkins', text: 'Absolutely love my new bedroom mural. The installation was seamless and the colors are exactly as shown.', image: 'https://storage.googleapis.com/mahattaart-wallpaper/Bathroom.jpg' },
  { id: '2', customerName: 'Michael Chen', text: 'The custom design process was so easy. Our office wall looks incredible now. Highly recommend MahattaArt!', image: 'https://storage.googleapis.com/mahattaart-wallpaper/Office.jpg' },
];

export const MOODS = MOCK_WALLPAPERS.slice(0, 4);
