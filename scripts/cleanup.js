const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
global.WebSocket = require('ws');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanup() {
  console.log('Cleaning up old placeholder data...');
  
  // Fetch all products
  const { data: products, error } = await supabase.from('products').select('*');
  
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  // Find products that are NOT uploaded to Cloudinary (i.e. the old jerseyhut.in placeholders)
  const toDelete = products.filter(p => {
    const isCloudinary = p.images.some(img => img.includes('res.cloudinary.com'));
    return !isCloudinary;
  });

  console.log(`Found ${toDelete.length} placeholder products to delete.`);

  for (const p of toDelete) {
    const { error: deleteError } = await supabase.from('products').delete().eq('id', p.id);
    if (deleteError) {
      console.error(`Error deleting ${p.name}:`, deleteError);
    } else {
      console.log(`Deleted placeholder: ${p.name}`);
    }
  }

  console.log('Cleanup complete!');
}

cleanup();
