"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-black border-l border-white/10 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 font-sans text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-heading font-bold flex items-center gap-2">
            Cart 
            <span className="bg-white/10 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-sans font-normal">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/50 space-y-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <p className="text-sm tracking-widest uppercase">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                {/* Product Image */}
                <div className="w-20 h-24 bg-[#1a1a1a] rounded overflow-hidden relative shrink-0">
                  {item.product.images?.[0] && (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest leading-tight line-clamp-2 pr-6 relative">
                      {item.product.name}
                    </h3>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">
                      {item.size}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold">Rs. {item.product.price.toFixed(2)}</span>
                      {item.product.original_price && (
                        <span className="text-[10px] text-white/40 line-through">Rs. {item.product.original_price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-[#e0e0e0] text-black rounded-full h-7 overflow-hidden w-24">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-full flex items-center justify-center hover:bg-black/5 transition cursor-pointer text-black/50 hover:text-black"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-full flex items-center justify-center hover:bg-black/5 transition cursor-pointer text-black/50 hover:text-black"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 p-6 bg-black/50 backdrop-blur">
            <div className="flex items-center justify-between text-xs mb-4 text-white/60">
              <span className="tracking-widest">Discount</span>
              <span>+</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold tracking-widest">Estimated total</span>
              <span className="text-lg font-bold">Rs. {cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-white/40 mb-6 tracking-widest">
              Taxes and shipping calculated at checkout.
            </p>
            
            <button 
              onClick={() => {
                setIsOpen(false);
                router.push('/checkout');
              }}
              className="w-full bg-white text-black rounded-full font-bold text-xs hover:bg-zinc-200 transition uppercase tracking-widest py-4 cursor-pointer"
            >
              Check out
            </button>
          </div>
        )}

      </div>
    </>
  );
}
