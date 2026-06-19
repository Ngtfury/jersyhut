const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });
global.WebSocket = require('ws');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  const filePath = path.join(__dirname, '..', 'data', 'db.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const db = JSON.parse(fileContents);

  console.log(`Found ${db.products.length} products to migrate.`);

  for (const p of db.products) {
    const { data, error } = await supabase.from('products').insert({
      name: p.name,
      price: p.price,
      original_price: p.originalPrice || null,
      category: p.category,
      badge: p.badge || null,
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      images: [p.image] // Map single image from JSON to array
    });

    if (error) {
      console.error(`Error inserting ${p.name}:`, error.message);
    } else {
      console.log(`Successfully migrated: ${p.name}`);
    }
  }

  console.log('Migration complete!');
}

migrate();
