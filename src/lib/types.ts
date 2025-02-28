
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  stock: number;
  featured?: boolean;
  discountPercentage?: number;
  new?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CartItems = CartItem[];
