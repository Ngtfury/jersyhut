import fs from 'fs';
import path from 'path';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import IconsSection from '@/components/IconsSection';
import ProductCarousel from '@/components/ProductCarousel';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { Database } from '@/types';

async function getData(): Promise<Database> {
  const filePath = path.join(process.cwd(), 'data', 'db.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Database;
  } catch (error) {
    console.error("Error reading db.json", error);
    return { products: [], categories: [] };
  }
}

export default async function Home() {
  const { products, categories } = await getData();

  const bestSellers = products.filter(p => p.category === 'BEST SELLERS');
  const freshKits = products.filter(p => p.category === 'FRESH KITS');

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        
        {bestSellers.length > 0 && (
          <ProductCarousel 
            products={bestSellers} 
            tabs={['BEST SELLERS', 'FULL SLEEVES', 'HALF SLEEVES', 'OVERSIZED T', 'SHORTS']} 
          />
        )}
        
        {categories.length > 0 && <IconsSection categories={categories} />}

        {freshKits.length > 0 && (
          <ProductGrid 
            title="FRESH KITS" 
            products={freshKits} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
