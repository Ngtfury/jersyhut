import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full z-50 bg-black font-sans">
      {/* Top Countdown Bar */}
      <div className="bg-black text-white py-3 flex items-center justify-center border-b border-white/5 relative">
        <div className="flex items-center gap-4">
          <span className="font-heading font-bold text-sm tracking-widest text-white/90">SALE ENDS IN:</span>
          <div className="flex items-center gap-3 font-heading font-bold text-xl">
            <div className="flex flex-col items-center leading-none">
              <span>00</span>
              <span className="text-[9px] font-normal lowercase text-white/70 mt-1">days</span>
            </div>
            <span className="pb-3">:</span>
            <div className="flex flex-col items-center leading-none">
              <span>23</span>
              <span className="text-[9px] font-normal lowercase text-white/70 mt-1">hours</span>
            </div>
            <span className="pb-3">:</span>
            <div className="flex flex-col items-center leading-none">
              <span>59</span>
              <span className="text-[9px] font-normal lowercase text-white/70 mt-1">mins</span>
            </div>
            <span className="pb-3">:</span>
            <div className="flex flex-col items-center leading-none">
              <span>44</span>
              <span className="text-[9px] font-normal lowercase text-white/70 mt-1">secs</span>
            </div>
          </div>
        </div>
        <button className="absolute right-4 text-white/50 hover:text-white transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center relative">
          {/* Search Icon (Left) */}
          <div className="flex items-center">
            <button className="text-white hover:text-gray-300 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <Link href="/" className="font-heading text-xl md:text-2xl font-bold tracking-[0.3em] text-white whitespace-nowrap">
              JERSEY HUT
            </Link>
          </div>

          {/* Icons (User, Cart) */}
          <div className="flex items-center gap-6">
            <button className="text-white hover:text-gray-300 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </button>
            <button className="text-white hover:text-gray-300 transition relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              {/* Optional: Add badge here if items exist */}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex justify-center items-center gap-8 mt-8">
          <Link href="/" className="text-white/80 hover:text-white text-[11px] uppercase tracking-[0.15em] transition">Home</Link>
          <Link href="/collections/full-sleeves" className="text-white/80 hover:text-white text-[11px] uppercase tracking-[0.15em] transition">Full Sleeves</Link>
          <Link href="/collections/half-sleeves" className="text-white/80 hover:text-white text-[11px] uppercase tracking-[0.15em] transition">Half Sleeves</Link>
          <Link href="/collections/oversized" className="text-white/80 hover:text-white text-[11px] uppercase tracking-[0.15em] transition">Oversized</Link>
          <Link href="/pages/about-us" className="text-white/80 hover:text-white text-[11px] uppercase tracking-[0.15em] transition">About Us</Link>
        </div>
      </div>
    </header>
  );
}
