"use server";

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';

export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));
  const originalPrice = formData.get('originalPrice') ? Number(formData.get('originalPrice')) : null;
  const category = formData.get('category') as string;
  const badge = formData.get('badge') as string || null;
  const sizes = formData.getAll('sizes') as string[];
  const images = JSON.parse(formData.get('images') as string || '[]');

  if (!name || !price || !category || images.length === 0) {
    throw new Error('Missing required fields');
  }

  const { error } = await supabaseAdmin.from('products').insert({
    name,
    price,
    original_price: originalPrice,
    category,
    badge,
    sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L', 'XL', '2XL'],
    images
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath(`/collections/${category.toLowerCase().replace(' ', '-')}`);
  revalidatePath('/admin');
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));
  const originalPrice = formData.get('originalPrice') ? Number(formData.get('originalPrice')) : null;
  const category = formData.get('category') as string;
  const badge = formData.get('badge') as string || null;
  const sizes = formData.getAll('sizes') as string[];
  const images = JSON.parse(formData.get('images') as string || '[]');

  if (!id || !name || !price || !category || images.length === 0) {
    throw new Error('Missing required fields');
  }

  const { error } = await supabaseAdmin.from('products').update({
    name,
    price,
    original_price: originalPrice,
    category,
    badge,
    sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L', 'XL', '2XL'],
    images
  }).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath(`/collections/${category.toLowerCase().replace(' ', '-')}`);
  revalidatePath(`/product/${id}`);
  revalidatePath('/admin');
}

export async function deleteProduct(id: string) {
  if (!id) return;

  const { error } = await supabaseAdmin.from('products').delete().eq('id', id);
  
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin');
}
