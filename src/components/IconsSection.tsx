import { Category } from "@/types";

interface IconsSectionProps {
  categories: Category[];
}

export default function IconsSection({ categories }: IconsSectionProps) {
  return (
    <section className="py-12 bg-black relative group">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10 uppercase tracking-widest">ICONS</h2>
      
      {/* Navigation Arrows */}
      <button className="absolute left-0 md:left-4 top-[60%] -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-black/50 border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button className="absolute right-0 md:right-4 top-[60%] -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-black/50 border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
      </button>

      <div className="flex overflow-x-auto gap-4 md:gap-8 px-4 md:px-8 pb-8 snap-x snap-mandatory scrollbar-hide max-w-[1500px] mx-auto relative">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center gap-4 shrink-0 snap-center cursor-pointer group/item w-[140px] md:w-[200px]">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#e5e5e5] overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-top transition-transform duration-500 group-hover/item:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
            </div>
            <span className="text-[10px] md:text-[11px] font-bold text-white uppercase tracking-widest text-center leading-tight">
              {category.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* Scrollbar Line */}
      <div className="max-w-[1400px] mx-auto px-8 relative">
        <div className="w-full h-[2px] bg-white/20 relative">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-white"></div>
        </div>
      </div>
    </section>
  );
}
