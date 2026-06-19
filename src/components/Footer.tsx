export default function Footer() {
  return (
    <footer className="bg-black pt-16 border-t border-white/10">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        {/* Features Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-16 border-b border-white/10">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 border border-white/10">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
            </div>
            <h4 className="font-heading font-bold tracking-wider text-sm">FREE SHIPPING</h4>
            <p className="text-xs text-white/50">For orders above Rs. 999</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 border border-white/10">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            </div>
            <h4 className="font-heading font-bold tracking-wider text-sm">7-DAY RETURN</h4>
            <p className="text-xs text-white/50">Hassle-free returns</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 border border-white/10">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h4 className="font-heading font-bold tracking-wider text-sm">DAMAGE COMPENSATION</h4>
            <p className="text-xs text-white/50">Full refund if damaged</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 border border-white/10">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h4 className="font-heading font-bold tracking-wider text-sm">24/7 SUPPORT</h4>
            <p className="text-xs text-white/50">Always here for you</p>
          </div>
        </div>

        {/* Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="font-heading font-bold text-2xl tracking-widest mb-6">JERSEY HUT</h3>
            <p className="text-white/60 text-sm mb-6 max-w-md leading-relaxed">
              Get high-quality, affordable kits with fast shipping and secure checkout. Perfect for every fan!
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold tracking-wider text-sm mb-6">QUICK LINKS</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Shop All</a></li>
              <li><a href="#" className="hover:text-white transition">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold tracking-wider text-sm mb-6">POLICIES</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-white/10 text-xs text-white/40">
          <p>© 2026 JERSEY HUT. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {/* Payment Icons Placeholder */}
            <span className="px-2 py-1 bg-white/5 rounded">UPI</span>
            <span className="px-2 py-1 bg-white/5 rounded">Cards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
