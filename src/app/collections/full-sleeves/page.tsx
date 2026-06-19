import fs from 'fs';
import path from 'path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Database } from '@/types';

async function getData(): Promise<Database> {
  const filePath = path.join(process.cwd(), 'data', 'db.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Database;
  } catch (error) {
    return { products: [], categories: [] };
  }
}

export default async function FullSleevesCollection() {
  const { products } = await getData();
  const collectionProducts = products.filter(p => p.category === 'FULL SLEEVES');

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Filters and Sort Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-4">
          <div className="flex gap-6 mb-4 md:mb-0">
            <button className="text-white text-sm font-sans flex items-center gap-1 hover:text-white/80">
              Availability
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <button className="text-white text-sm font-sans flex items-center gap-1 hover:text-white/80">
              Price
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-xs font-sans tracking-wide">{collectionProducts.length} items</span>
            <button className="text-white text-sm font-sans flex items-center gap-1 hover:text-white/80">
              Sort
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className="flex gap-1 ml-2">
              {/* Grid View Icons */}
              <button className="p-1 border border-white/30 rounded text-white"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></button>
              <button className="p-1 text-white/50 hover:text-white"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg></button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-12">
          {collectionProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
}
