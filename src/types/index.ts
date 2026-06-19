export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  type?: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Database {
  products: Product[];
  categories: Category[];
}
