const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.api.create_upload_preset({
  name: 'jerseyhut_products',
  unsigned: true,
  folder: 'jerseyhut/products'
})
.then(res => console.log('Successfully created preset:', res.name))
.catch(err => {
  if (err.error && err.error.message && err.error.message.includes('already exists')) {
    console.log('Preset already exists!');
  } else {
    console.error('Error:', err);
  }
});
