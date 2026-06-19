"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, cartTotal, setIsOpen } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Make sure drawer is closed when on checkout page
    setIsOpen(false);
  }, [setIsOpen]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans">
        <h1 className="text-2xl font-bold mb-4 font-heading tracking-widest uppercase">Your cart is empty</h1>
        <button 
          onClick={() => router.push("/")}
          className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // 1. Create order on our backend
      const res = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: cartTotal }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      // 2. Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use public key from env
        amount: data.amount,
        currency: data.currency,
        name: "Jersey Hut",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async function (response: any) {
          // 3. Verify payment on our backend
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            // Payment verified!
            router.push("/checkout/success");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on("payment.failed", function (response: any) {
        alert("Payment Failed: " + response.error.description);
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-widest mb-10 text-center">
        Checkout
      </h1>

      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
          Order Summary
        </h2>
        
        <div className="flex flex-col gap-6 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <div className="w-16 h-20 bg-[#1a1a1a] rounded overflow-hidden relative shrink-0">
                {item.product.images?.[0] && (
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold uppercase tracking-widest line-clamp-1">
                  {item.product.name}
                </h3>
                <p className="text-xs text-white/50 uppercase tracking-widest mt-1">
                  Size: {item.size} | Qty: {item.quantity}
                </p>
              </div>
              <div className="text-sm font-bold">
                Rs. {(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 space-y-3">
          <div className="flex justify-between text-sm text-white/70">
            <span className="tracking-widest uppercase">Subtotal</span>
            <span>Rs. {cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-white/70">
            <span className="tracking-widest uppercase">Shipping</span>
            <span>Calculated at next step</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-4 border-t border-white/10 mt-4">
            <span className="tracking-widest uppercase">Total</span>
            <span>Rs. {cartTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-10">
          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-white text-black py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Pay Now with Razorpay"}
          </button>
          <p className="text-center text-[10px] text-white/40 mt-4 tracking-widest uppercase">
            Secure checkout powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
}
