import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGallery from './ProductGallery';
import ProductDetailsUI from './ProductDetailsUI';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params Promise
  const resolvedParams = await params;

  const { data: product, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (error || !product) {
    console.error("Error fetching product:", error);
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left: Image Gallery (Scrollable Arrows) */}
          <div className="w-full">
            <ProductGallery images={product.images || []} />
          </div>

          {/* Right: Product Details UI (Interactive) */}
          <div className="w-full">
            <ProductDetailsUI product={product} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
