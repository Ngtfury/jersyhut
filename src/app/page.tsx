import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCarousel from '@/components/ProductCarousel';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic'; // Ensure Next.js never caches this page

export default async function Home() {
  // Use supabaseAdmin to bypass any potential Row Level Security issues
  const { data: products, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  const allProducts = products || [];
  const freshKits = allProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        
        {/* Interactive Collections Carousel */}
        <ProductCarousel products={allProducts} />

        {/* Fresh Kits Section */}
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
