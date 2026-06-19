const { Client } = require('pg');

async function migrate() {
  // Using port 6543 and the tenant ID in username (postgres.[ref])
  const connectionString = 'postgresql://postgres.jleqlgqxheygghnrluvc:jersyhut123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';
  
  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();
    console.log('Connected to Supabase Postgres database via IPv4 Pooler.');

    // Add the JSONB column for stock_per_size
    console.log('Adding stock_per_size column...');
    await client.query(`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS stock_per_size JSONB DEFAULT '{}'::jsonb;
    `);

    // Backfill existing products with default stock of 50 for sizes they have listed
    console.log('Backfilling stock for existing products...');
    const { rows: products } = await client.query(`SELECT id, sizes FROM products;`);
    
    for (const product of products) {
      const stock = {};
      if (product.sizes && Array.isArray(product.sizes)) {
        product.sizes.forEach(size => {
          stock[size] = 50; // Default stock for previously created products so they don't break
        });
      }
      
      await client.query(`
        UPDATE products 
        SET stock_per_size = $1 
        WHERE id = $2;
      `, [JSON.stringify(stock), product.id]);
      console.log(`Updated stock for product ID: ${product.id}`);
    }

    console.log('Migration completed successfully!');

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

migrate();
