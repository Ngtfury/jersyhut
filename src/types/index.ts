export interface Product {
  id: string; // UUID from Supabase
  name: string;
  price: number;
  original_price?: number | null;
  category: string;
  badge?: string | null;
  sizes: string[];
  images: string[];
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

// Keeping this around for fallback/migration context
export interface Database {
  products: Product[];
  categories: Category[];
}
