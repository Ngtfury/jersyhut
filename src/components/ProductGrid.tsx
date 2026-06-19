import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductGridProps {
  title: string;
  products: Product[];
}

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className="py-16 px-4 md:px-8 max-w-[1500px] mx-auto relative group">
      {/* Navigation Arrows for Grid rows if needed, but grid usually wraps */}
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12 tracking-widest">{title}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
