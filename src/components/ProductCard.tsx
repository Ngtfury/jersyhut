import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col group cursor-pointer w-full bg-black relative">
      <div className="relative aspect-square md:aspect-[4/5] bg-black overflow-hidden mb-4 flex items-center justify-center">
        {product.badge && (
          <div className="absolute top-2 right-2 z-10 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
            {product.badge}
          </div>
        )}
        <div 
          className="w-full h-full bg-contain bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${product.image})` }}
        />
      </div>
      <div className="flex flex-col text-center px-1">
        <h3 className="text-[10px] md:text-[11px] font-sans font-bold text-white uppercase tracking-wider mb-2 leading-tight">
          {product.name}
        </h3>
        <div className="flex justify-center items-center gap-2">
          <span className="text-[11px] md:text-xs text-white font-bold">Rs. {product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-[10px] md:text-[11px] text-white/40 line-through">Rs. {product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
