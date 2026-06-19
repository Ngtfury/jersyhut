import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductCarouselProps {
  products: Product[];
  tabs?: string[];
}

export default function ProductCarousel({ products, tabs = [] }: ProductCarouselProps) {
  return (
    <section className="py-12 px-4 md:px-8 max-w-[1500px] mx-auto relative group">
      {/* Navigation Arrows */}
      <button className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
      </button>

      <div className="flex flex-col items-center mb-10">
        {tabs.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 border-b border-white/20 w-full md:w-auto">
            {tabs.map((tab, idx) => (
              <button 
                key={idx}
                className={`py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest relative ${
                  idx === 0 
                    ? 'text-white' 
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tab}
                {idx === 0 && (
                  <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-white"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex overflow-x-auto gap-4 md:gap-8 pb-6 snap-x snap-mandatory scrollbar-hide">
        {products.map(product => (
          <div key={product.id} className="snap-start shrink-0 w-[45%] md:w-[23%]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
