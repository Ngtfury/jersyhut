"use server";

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Database, Product } from '@/types';

const filePath = path.join(process.cwd(), 'data', 'db.json');

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  originalPrice: z.coerce.number().optional(),
  image: z.string().url("Must be a valid URL"),
  category: z.string().min(1, "Category is required"),
  type: z.string().optional(),
  badge: z.string().optional(),
});

export async function getDbData(): Promise<Database> {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Database;
  } catch (error) {
    console.error("Error reading db.json", error);
    return { products: [], categories: [] };
  }
}

export async function addProduct(formData: FormData) {
  const parsed = productSchema.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    originalPrice: formData.get('originalPrice') || undefined,
    image: formData.get('image'),
    category: formData.get('category'),
    type: formData.get('type') || undefined,
    badge: formData.get('badge') || undefined,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  const newProduct: Product = {
    id: Date.now().toString(),
    ...parsed.data
  };

  const data = await getDbData();
  data.products.push(newProduct);
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;

  const data = await getDbData();
  data.products = data.products.filter(p => p.id !== id);
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  revalidatePath('/');
  revalidatePath('/admin');
}
