"use client";

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { addProduct, updateProduct, deleteProduct } from './actions';
import { Product } from '@/types';

export default function AdminDashboard({ initialProducts }: { initialProducts: Product[] }) {
  const [activeTab, setActiveTab] = useState<'ADD' | 'MANAGE'>('MANAGE');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>(['S', 'M', 'L', 'XL', '2XL']);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Delete Confirmation State
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setImages([]);
    setSizes(['S', 'M', 'L', 'XL', '2XL']);
    setError('');
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setImages(product.images || []);
    setSizes(product.sizes || []);
    setActiveTab('ADD');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setIsLoading(true);
    try {
      await deleteProduct(productToDelete.id);
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      setProductToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSuccess = (result: any) => {
    if (result.event === 'success') {
      setImages(prev => [...prev, result.info.secure_url]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size: string) => {
    setSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError('');
    
    if (images.length === 0) {
      setError('Please upload at least one image before adding the product.');
      setIsLoading(false);
      return;
    }

    formData.append('images', JSON.stringify(images));
    // Clear the sizes from FormData and append manually since we control it via state
    formData.delete('sizes');
    sizes.forEach(size => formData.append('sizes', size));

    try {
      if (editingId) {
        await updateProduct(editingId, formData);
        alert("Product updated successfully!");
        setActiveTab('MANAGE');
        window.location.reload(); // Refresh to get latest data from server
      } else {
        await addProduct(formData);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          window.location.reload();
        }, 3000);
      }
      resetForm();
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white font-sans p-8">
        <div className="bg-zinc-900 border border-green-500/50 rounded-2xl p-12 flex flex-col items-center text-center max-w-md w-full animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Success!</h2>
          <p className="text-white/60 mb-8">The jersey has been successfully added to your database.</p>
          <button 
            onClick={() => { setShowSuccess(false); setActiveTab('MANAGE'); }}
            className="w-full bg-white text-black font-bold py-3 rounded hover:bg-zinc-200 transition uppercase tracking-widest cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // Find the product being edited to pre-fill the form
  const editingProduct = products.find(p => p.id === editingId);

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8 text-white font-sans relative">
      
      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-xl max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-red-400">Delete Product?</h3>
            <p className="text-white/70 mb-6">Are you sure you want to permanently delete <strong>{productToDelete.name}</strong>? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-3 border border-white/20 rounded hover:bg-white/5 transition font-bold cursor-pointer"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteConfirm}
                className="flex-1 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition font-bold flex justify-center items-center cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-heading font-bold mb-8 uppercase text-center md:text-left">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-white/20 mb-8">
          <button 
            onClick={() => setActiveTab('MANAGE')}
            className={`flex-1 md:flex-none px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors relative cursor-pointer ${activeTab === 'MANAGE' ? 'text-white' : 'text-white/50 hover:text-white'}`}
          >
            Manage Inventory
            {activeTab === 'MANAGE' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-white"></div>}
          </button>
          <button 
            onClick={() => { resetForm(); setActiveTab('ADD'); }}
            className={`flex-1 md:flex-none px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors relative cursor-pointer ${activeTab === 'ADD' ? 'text-white' : 'text-white/50 hover:text-white'}`}
          >
            {editingId ? 'Edit Product' : 'Add New'}
            {activeTab === 'ADD' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-white"></div>}
          </button>
        </div>

        {activeTab === 'MANAGE' && (
          <div className="animate-in fade-in duration-300">
            {products.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/20 rounded-xl">
                <p className="text-white/50 font-bold uppercase tracking-widest mb-4">No products found</p>
                <button 
                  onClick={() => setActiveTab('ADD')}
                  className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-zinc-200 transition cursor-pointer"
                >
                  Upload First Jersey
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden flex flex-col group">
                    <div className="flex p-4 gap-4 items-center border-b border-white/5">
                      <div className="w-16 h-20 bg-black rounded shrink-0 overflow-hidden">
                        {product.images && product.images[0] && (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold uppercase truncate" title={product.name}>{product.name}</h3>
                        <p className="text-xs text-white/50 uppercase tracking-wider">{product.category}</p>
                        <p className="text-sm font-bold mt-1">Rs. {product.price}</p>
                      </div>
                    </div>
                    <div className="flex divide-x divide-white/10">
                      <button 
                        onClick={() => handleEditClick(product)}
                        className="flex-1 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => setProductToDelete(product)}
                        className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'ADD' && (
          <div className="bg-zinc-900 p-6 rounded-xl border border-white/10 animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              {editingId && (
                <button onClick={resetForm} className="text-sm text-white/50 hover:text-white underline cursor-pointer">
                  Cancel Edit
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-500/20 text-red-300 p-4 rounded mb-6 border border-red-500/50">
                {error}
              </div>
            )}

            <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm text-white/70 mb-2">Product Images</label>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative w-24 h-24 bg-black rounded overflow-hidden border border-white/20">
                      <img src={img} alt="Upload preview" className="object-cover w-full h-full" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center cursor-pointer shadow-md">×</button>
                    </div>
                  ))}
                  
                  <CldUploadWidget uploadPreset="jerseyhut_products" onSuccess={handleUploadSuccess}>
                    {({ open }) => (
                      <button type="button" onClick={() => open()} className="w-24 h-24 border-2 border-dashed border-white/30 rounded flex flex-col items-center justify-center text-white/50 hover:text-white hover:border-white transition cursor-pointer bg-black/50">
                        <span className="text-2xl">+</span>
                        <span className="text-xs mt-1">Upload</span>
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">Product Name</label>
                <input name="name" required defaultValue={editingProduct?.name} className="w-full bg-black border border-white/20 rounded p-3 text-white focus:outline-none focus:border-white/50" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-1">Current Price (Rs)</label>
                  <input type="number" name="price" required min="0" defaultValue={editingProduct?.price} className="w-full bg-black border border-white/20 rounded p-3 text-white focus:outline-none focus:border-white/50" />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Original Price (Rs)</label>
                  <input type="number" name="originalPrice" min="0" defaultValue={editingProduct?.original_price || ''} className="w-full bg-black border border-white/20 rounded p-3 text-white focus:outline-none focus:border-white/50" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">Category</label>
                <select name="category" defaultValue={editingProduct?.category || "BEST SELLERS"} className="w-full bg-black border border-white/20 rounded p-3 text-white focus:outline-none focus:border-white/50 cursor-pointer">
                  <option value="BEST SELLERS">BEST SELLERS</option>
                  <option value="FULL SLEEVES">FULL SLEEVES</option>
                  <option value="HALF SLEEVES">HALF SLEEVES</option>
                  <option value="OVERSIZED T">OVERSIZED T</option>
                  <option value="SHORTS">SHORTS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">Badge (Optional)</label>
                <input name="badge" defaultValue={editingProduct?.badge || ''} placeholder="e.g. SAVE 28%" className="w-full bg-black border border-white/20 rounded p-3 text-white focus:outline-none focus:border-white/50" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-white/70 mb-2">Available Sizes</label>
                <div className="flex gap-4">
                  {['S', 'M', 'L', 'XL', '2XL'].map(size => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer bg-black px-3 py-2 border border-white/10 rounded">
                      <input 
                        type="checkbox" 
                        checked={sizes.includes(size)}
                        onChange={() => toggleSize(size)}
                        className="w-4 h-4 accent-white cursor-pointer" 
                      />
                      <span className="font-bold">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 mt-4">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full font-bold py-3 rounded transition uppercase tracking-widest flex justify-center items-center gap-2 cursor-pointer
                    ${isLoading ? 'bg-zinc-700 text-white/50 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200'}
                  `}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {editingId ? 'Updating...' : 'Uploading...'}
                    </>
                  ) : (
                    editingId ? 'Save Changes' : 'Add Product'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
