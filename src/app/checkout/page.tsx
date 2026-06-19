"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, cartTotal, setIsOpen } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    contactInfo: "",
    country: "India",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    saveInfo: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen]);

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
      <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-black text-white">
        <h1 className="text-2xl font-bold mb-4 font-heading tracking-widest uppercase">Your cart is empty</h1>
        <button 
          onClick={() => router.push("/")}
          className="bg-white text-black px-8 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Jersey Hut",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            router.push("/checkout/success");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim() || "Customer",
          email: formData.contactInfo.includes("@") ? formData.contactInfo : "",
          contact: formData.phone || (!formData.contactInfo.includes("@") ? formData.contactInfo : ""),
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
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] min-h-screen">
        
        {/* LEFT COLUMN: FORMS */}
        <div className="p-6 md:p-12 lg:pr-16 flex flex-col pt-12 md:pt-20">
          
          <h2 className="text-xl font-bold mb-6">Contact</h2>
          <form onSubmit={handlePayment} className="space-y-8">
            
            {/* Contact Input */}
            <div className="relative">
              <input 
                type="text" 
                name="contactInfo"
                required
                value={formData.contactInfo}
                onChange={handleInputChange}
                placeholder="Email or mobile phone number" 
                className="w-full bg-white text-black p-3 rounded text-sm outline-none focus:ring-2 focus:ring-[#8b5a2b]"
              />
              <Link href="/login" className="absolute right-0 top-[-30px] text-xs text-[#8b5a2b] hover:underline">
                Sign in
              </Link>
            </div>

            {/* Delivery Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Delivery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="col-span-1 md:col-span-2">
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-white text-black p-3 rounded text-sm outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                  >
                    <option value="India">India</option>
                  </select>
                </div>
                
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name (optional)" 
                  className="w-full bg-white text-black p-3 rounded text-sm outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                />
                <input 
                  type="text" 
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name" 
                  className="w-full bg-white text-black p-3 rounded text-sm outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                />
                
                <div className="col-span-1 md:col-span-2">
                  <input 
                    type="text" 
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address" 
                    className="w-full bg-white text-black p-3 rounded text-sm outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                  />
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <input 
                    type="text" 
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, etc. (optional)" 
                    className="w-full bg-white text-black p-3 rounded text-sm outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 col-span-1 md:col-span-2">
                  <input 
                    type="text" 
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City" 
                    className="w-full bg-white text-black p-3 rounded text-sm outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                  />
                  <select 
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-white text-black p-3 rounded text-sm outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                  >
                    <option value="">State</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    {/* Add more states as needed */}
                  </select>
                  <input 
                    type="text" 
                    name="pinCode"
                    required
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    placeholder="PIN code" 
                    className="w-full bg-white text-black p-3 rounded text-sm outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone" 
                    className="w-full bg-white text-black p-3 rounded text-sm outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded text-black focus:ring-black accent-black" 
                />
                <label htmlFor="saveInfo" className="text-xs text-white/80 cursor-pointer">
                  Save this information for next time
                </label>
              </div>
            </div>

            {/* Shipping Method */}
            <div>
              <h2 className="text-xl font-bold mb-4">Shipping method</h2>
              <div className="bg-[#1a1a1a] p-4 rounded text-xs text-white/60 text-center">
                Enter your shipping address to view available shipping methods.
              </div>
            </div>

            {/* Payment Section */}
            <div>
              <h2 className="text-xl font-bold mb-2">Payment</h2>
              <p className="text-xs text-white/50 mb-4">All transactions are secure and encrypted.</p>
              
              <div className="bg-[#1a1a1a] rounded border border-[#8b5a2b]/30 overflow-hidden">
                <div className="p-4 border-b border-[#8b5a2b]/30 flex justify-between items-center bg-[#222]">
                  <span className="text-sm font-bold">Razorpay Secure (UPI, Cards, Int'l Cards, Wallets)</span>
                  <div className="flex gap-1">
                    <div className="bg-white px-1 py-0.5 rounded text-[8px] text-blue-800 font-bold">UPI</div>
                    <div className="bg-white px-1 py-0.5 rounded text-[8px] text-blue-600 font-bold italic">VISA</div>
                    <div className="bg-white px-1 py-0.5 rounded flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 relative -mr-1"></div>
                      <div className="w-2 h-2 rounded-full bg-orange-400 relative"></div>
                    </div>
                  </div>
                </div>
                <div className="p-8 text-center flex flex-col items-center justify-center bg-[#111]">
                  <svg className="w-12 h-12 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed">
                    After clicking "Pay now", you will be redirected to Razorpay Secure (UPI, Cards, Int'l Cards, Wallets) to complete your purchase.
                  </p>
                </div>
              </div>
            </div>

            {/* Billing Address (Visual only for now) */}
            <div>
              <h2 className="text-xl font-bold mb-4">Billing address</h2>
              <div className="bg-[#1a1a1a] rounded border border-white/10 p-4 text-sm text-white/70">
                Same as shipping address
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 pb-12">
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-white text-black py-4 rounded font-bold text-sm hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Pay now"}
              </button>
            </div>
            
          </form>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="bg-[#0a0a0a] border-l border-white/5 p-6 md:p-12 flex flex-col pt-12 md:pt-20 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          
          <h1 className="text-2xl font-heading font-bold uppercase tracking-[0.3em] text-center mb-10">
            JERSEY HUT
          </h1>

          {/* Cart Items */}
          <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center relative">
                <div className="w-16 h-16 bg-[#1a1a1a] rounded overflow-hidden relative shrink-0 border border-white/10">
                  {item.product.images?.[0] && (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute -top-2 -right-2 bg-white/20 backdrop-blur w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-10">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 pr-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest line-clamp-2 leading-tight">
                    {item.product.name}
                  </h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">
                    {item.size}
                  </p>
                </div>
                <div className="text-xs font-bold whitespace-nowrap">
                  Rs. {(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Discount Code */}
          <div className="flex gap-2 py-6 border-t border-b border-white/10 mb-6">
            <input 
              type="text" 
              placeholder="Discount code" 
              className="flex-1 bg-white text-black p-3 rounded text-sm outline-none"
            />
            <button className="bg-white/10 text-white px-6 py-3 rounded text-sm font-bold hover:bg-white/20 transition">
              Apply
            </button>
          </div>

          {/* Totals */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-white/70">
              <span className="tracking-widest">Subtotal</span>
              <span className="font-bold">Rs. {cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-white/70">
              <span className="tracking-widest">Shipping</span>
              <span className="text-[10px] uppercase pt-0.5">Enter shipping address</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-4 mt-2">
              <span className="tracking-widest">Total</span>
              <div className="flex items-end gap-2">
                <span className="text-[10px] text-white/50 uppercase pb-1">INR</span>
                <span>Rs. {cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
