
import { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Desk Lamp",
    description: "A sleek, adjustable desk lamp that complements any workspace with its minimal design and warm, even lighting. Perfect for late-night work or reading.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "Lighting",
    tags: ["desk lamp", "minimal", "home office"],
    rating: 4.8,
    reviews: 124,
    stock: 45,
    featured: true
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    description: "Premium ergonomic chair designed for maximum comfort during long work sessions. Features adjustable height, lumbar support, and breathable mesh material.",
    price: 349.99,
    images: [
      "https://images.unsplash.com/photo-1505843490701-5be5d1b31f8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "Furniture",
    tags: ["chair", "ergonomic", "office"],
    rating: 4.9,
    reviews: 276,
    stock: 18,
    featured: true
  },
  {
    id: "3",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and exceptional sound quality for immersive listening experiences.",
    price: 279.99,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "Electronics",
    tags: ["headphones", "wireless", "audio"],
    rating: 4.7,
    reviews: 412,
    stock: 35,
    featured: true,
    new: true
  },
  {
    id: "4",
    name: "Minimalist Wall Clock",
    description: "Elegant wall clock with a clean design that suits any interior. Features silent movement and high-contrast face for easy reading.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1563861826120-060e5f881a5c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1585586463948-9e40851ed193?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "Home Decor",
    tags: ["clock", "minimal", "wall decor"],
    rating: 4.5,
    reviews: 98,
    stock: 27
  },
  {
    id: "5",
    name: "Premium Notebook Set",
    description: "Set of three premium notebooks with acid-free paper, soft leather covers, and ribbon bookmarks. Perfect for journaling or sketching.",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1527863280617-15596f92e5c8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "Stationery",
    tags: ["notebook", "journal", "stationery"],
    rating: 4.6,
    reviews: 156,
    stock: 52,
    discountPercentage: 15
  },
  {
    id: "6",
    name: "Smart Home Speaker",
    description: "Intelligent home speaker with premium sound quality, voice assistant compatibility, and sleek design that blends into any living space.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1589256469067-ea99122bbdc9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "Electronics",
    tags: ["speaker", "smart home", "audio"],
    rating: 4.7,
    reviews: 289,
    stock: 23,
    new: true
  },
  {
    id: "7",
    name: "Modular Desk Organizer",
    description: "Customizable desk organization system with modular components that can be arranged to suit your specific workspace needs.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "Office",
    tags: ["organizer", "desk", "productivity"],
    rating: 4.4,
    reviews: 112,
    stock: 38
  },
  {
    id: "8",
    name: "Ceramic Pour-Over Coffee Set",
    description: "Elegant ceramic pour-over coffee set that brings precision and style to your morning ritual. Includes dripper, server, and measurement scoop.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "Kitchen",
    tags: ["coffee", "ceramic", "pour-over"],
    rating: 4.9,
    reviews: 87,
    stock: 15,
    featured: true
  }
];

export const featuredProducts = products.filter(product => product.featured);
export const newArrivals = products.filter(product => product.new);
export const discountedProducts = products.filter(product => product.discountPercentage);

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.id !== product.id && (p.category === product.category || p.tags.some(tag => product.tags.includes(tag))))
    .slice(0, limit);
};

export const categories = [...new Set(products.map(product => product.category))];

export const getAllTags = (): string[] => {
  const allTags = products.flatMap(product => product.tags);
  return [...new Set(allTags)];
};
