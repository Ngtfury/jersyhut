import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  // Await the params Promise (Next.js 15+ requirement)
  const resolvedParams = await params;
  
  let dbCategory = resolvedParams.category.replace('-', ' ').toUpperCase();
  if (resolvedParams.category === 'oversized') dbCategory = 'OVERSIZED T';

  const { data: products, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('category', dbCategory)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching collection:", error);
  }

  const collectionProducts = products || [];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-white uppercase tracking-widest">{dbCategory}</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-4">
          <div className="flex gap-6 mb-4 md:mb-0">
            <button className="text-white text-sm font-sans flex items-center gap-1 hover:text-white/80 cursor-pointer">
              Availability
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <button className="text-white text-sm font-sans flex items-center gap-1 hover:text-white/80 cursor-pointer">
              Price
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-xs font-sans tracking-wide">{collectionProducts.length} items</span>
            <button className="text-white text-sm font-sans flex items-center gap-1 hover:text-white/80 cursor-pointer">
              Sort
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
        </div>

        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-12">
            {collectionProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-white/50">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 12H4M8 16l-4-4 4-4M16 8l4 4-4 4"></path></svg>
            <p className="text-lg uppercase tracking-widest font-bold">No products found</p>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
