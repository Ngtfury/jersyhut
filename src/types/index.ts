export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number | null;
  category: string;
  badge?: string | null;
  sizes: string[];
  images: string[];
  stock_per_size?: Record<string, number>;
  created_at?: string;
}
