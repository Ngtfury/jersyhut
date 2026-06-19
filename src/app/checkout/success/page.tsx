"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Clear the cart when landing on the success page
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans px-4 text-center">
      <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-widest mb-4">
        Payment Successful!
      </h1>
      
      <p className="text-white/60 max-w-md mx-auto mb-10 tracking-wider">
        Thank you for your order. We have received your payment and will begin processing it shortly.
      </p>

      <Link 
        href="/"
        className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
