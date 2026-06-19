"use client";

import { useState } from 'react';
import { Product } from '@/types';

interface ProductDetailsUIProps {
  product: Product;
}

export default function ProductDetailsUI({ product }: ProductDetailsUIProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const teamMatch = product.name.match(/(?<=\| ).*?(?= \d{4})/);
  const team = teamMatch ? teamMatch[0] : 'N/A';
  const playerMatch = product.name.match(/^.*?(?=\s\|)/);
  const player = playerMatch ? playerMatch[0] : 'N/A';

  // Determine stock text
  const stockForSelected = selectedSize && product.stock_per_size && product.stock_per_size[selectedSize] !== undefined 
    ? product.stock_per_size[selectedSize] 
    : undefined;
  
  return (
    <div className="flex flex-col pt-2 font-sans relative">
      
      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/80 p-4 animate-in fade-in duration-200">
          <div className="relative bg-white p-8 md:p-12 rounded max-w-3xl w-full shadow-2xl text-black">
            <button 
              onClick={() => setShowSizeChart(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/5 hover:bg-black/10 text-black rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="flex flex-col space-y-4 mb-8 text-[11px] md:text-xs font-bold tracking-widest text-[#1a1a1a]">
              <p>FOR OVERSIZED FIVE SLEEVE KITS</p>
              <p>LENGTH WILL BE SAME</p>
              <p>THERE WILL BE 2 INCHES INCREASE ON ALL OTHER MEASURES LIKE CHEST , SLEEVE LENGTH</p>
              
              <p className="pt-4 text-[#8b5a2b]">CUSTOMER NOTE - WE SUGGEST YOU TO BUY A SIZE BIGGER THAN WHAT YOUR NORMALLY WEAR FOR THE BEST FIT</p>
            </div>

            <img src="/sizechart.png" alt="Size Chart Diagram" className="w-full h-auto object-contain" />
          </div>
        </div>
      )}

      {/* Header Buttons */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setShowSizeChart(true)}
          className="flex items-center gap-2 text-[10px] text-white hover:text-white/70 tracking-widest border border-white/20 px-3 py-1 uppercase cursor-pointer transition-colors"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2"></rect><line x1="3" y1="9" x2="21" y2="9" strokeWidth="2"></line><line x1="9" y1="21" x2="9" y2="9" strokeWidth="2"></line></svg>
          SIZECHART
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-widest mb-6 leading-tight">
        {product.name}
      </h1>
      
      {/* Price */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-[13px] tracking-widest">Rs. {product.price.toFixed(2)}</span>
        {product.original_price && (
          <span className="text-[13px] text-white/40 line-through tracking-widest">Rs. {product.original_price.toFixed(2)}</span>
        )}
      </div>

      {/* Size Selector */}
      <div className="mb-8">
        <div className="mb-4">
          <span className="text-xs text-white/70 tracking-widest">Size</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['S', 'M', 'L', 'XL', '2XL'].map(size => {
            const sizeStock = product.stock_per_size ? product.stock_per_size[size] : undefined;
            // If stock_per_size exists, use it. Otherwise fallback to sizes array.
            const isAvailable = product.stock_per_size 
              ? sizeStock !== undefined && sizeStock > 0 
              : product.sizes?.includes(size);
              
            const isSelected = selectedSize === size;
            return (
              <div key={size} className="flex flex-col items-center gap-1">
                <button 
                  disabled={!isAvailable}
                  onClick={() => setSelectedSize(size)}
                  className={`
                    w-14 h-10 border flex items-center justify-center text-xs font-bold transition
                    ${isAvailable ? 'cursor-pointer hover:border-white' : 'opacity-30 cursor-not-allowed line-through'}
                    ${isSelected ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20'}
                  `}
                >
                  {size}
                </button>
                {/* Always show remaining stock below the button if it's 5 or less */}
                <div className="h-4 flex items-center justify-center">
                  {isAvailable && sizeStock !== undefined && sizeStock <= 5 && (
                    <span className="text-[10px] text-red-400 font-bold tracking-widest animate-in fade-in">
                      {sizeStock} left
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add to Cart Section */}
      <div className="flex gap-4 mb-12 h-12">
        {/* Quantity Selector */}
        <div className="flex items-center border border-white/20 w-32">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-10 h-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
          >
            -
          </button>
          <span className="flex-1 text-center text-sm font-bold">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => Math.min(stockForSelected || 99, q + 1))}
            className="w-10 h-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
          >
            +
          </button>
        </div>
        
        {/* Add to Cart Button */}
        <button className="flex-1 bg-white text-black font-bold text-xs hover:bg-zinc-200 transition uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          Add to cart
        </button>
      </div>

      {/* Specifications */}
      <div className="flex flex-col gap-3 text-[10px] tracking-widest text-white/60 uppercase">
        <div className="grid grid-cols-[100px_1fr]">
          <span>PLAYER :</span>
          <span className="text-white">{player}</span>
        </div>
        <div className="grid grid-cols-[100px_1fr]">
          <span>TEAM :</span>
          <span className="text-white">{team}</span>
        </div>
        <div className="grid grid-cols-[100px_1fr]">
          <span>EDITION :</span>
          <span className="text-white">2025 - 26 AWAY</span>
        </div>
        <div className="grid grid-cols-[100px_1fr]">
          <span>MATERIAL :</span>
          <span className="text-white">DOTKNIT</span>
        </div>
      </div>

    </div>
  );
}
