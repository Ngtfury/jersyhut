"use client";

import { useState } from 'react';
import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductCarouselProps {
  products: Product[]; // All products from DB
}

const TABS = ['BEST SELLERS', 'FULL SLEEVES', 'HALF SLEEVES', 'OVERSIZED T', 'SHORTS'];

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  // Filter products dynamically based on the clicked tab
  const filteredProducts = products.filter(p => p.category === activeTab);

  return (
    <section className="py-12 px-4 md:px-8 max-w-[1500px] mx-auto relative group">
      {/* Navigation Arrows */}
      <button className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md cursor-pointer">
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md cursor-pointer">
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
      </button>

      <div className="flex flex-col items-center mb-10">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 border-b border-white/20 w-full md:w-auto">
          {TABS.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest relative cursor-pointer transition-colors ${
                activeTab === tab 
                  ? 'text-white' 
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-white transition-all"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="flex overflow-x-auto gap-4 md:gap-8 pb-6 snap-x snap-mandatory scrollbar-hide animate-in fade-in duration-500">
          {filteredProducts.map(product => (
            <div key={product.id} className="snap-start shrink-0 w-[45%] md:w-[23%]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 border border-dashed border-white/20 rounded text-white/50 animate-in fade-in">
          <p className="text-sm font-bold uppercase tracking-widest">No jerseys found in {activeTab}</p>
        </div>
      )}
    </section>
  );
}
