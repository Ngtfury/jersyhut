import { getDbData, addProduct, deleteProduct } from './actions';

export default async function AdminPage() {
  const { products } = await getDbData();

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-8 uppercase">Admin Panel</h1>
        
        <div className="bg-zinc-900 p-6 rounded-xl border border-white/10 mb-8">
          <h2 className="text-xl font-bold mb-6">Add New Product</h2>
          <form action={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">Product Name</label>
              <input name="name" required className="w-full bg-black border border-white/20 rounded p-2 text-white focus:outline-none focus:border-white/50" />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Image URL</label>
              <input type="url" name="image" required className="w-full bg-black border border-white/20 rounded p-2 text-white focus:outline-none focus:border-white/50" />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Current Price</label>
              <input type="number" name="price" required min="0" className="w-full bg-black border border-white/20 rounded p-2 text-white focus:outline-none focus:border-white/50" />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Original Price</label>
              <input type="number" name="originalPrice" min="0" className="w-full bg-black border border-white/20 rounded p-2 text-white focus:outline-none focus:border-white/50" />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Category</label>
              <select name="category" className="w-full bg-black border border-white/20 rounded p-2 text-white focus:outline-none focus:border-white/50">
                <option value="FRESH KITS">FRESH KITS</option>
                <option value="BEST SELLERS">BEST SELLERS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Type (Tabs)</label>
              <select name="type" className="w-full bg-black border border-white/20 rounded p-2 text-white focus:outline-none focus:border-white/50">
                <option value="HALF SLEEVES">HALF SLEEVES</option>
                <option value="FULL SLEEVES">FULL SLEEVES</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Badge (Optional)</label>
              <input name="badge" placeholder="e.g. SALE" className="w-full bg-black border border-white/20 rounded p-2 text-white focus:outline-none focus:border-white/50" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full bg-white text-black font-bold py-2 rounded hover:bg-zinc-200 transition">
                ADD PRODUCT
              </button>
            </div>
          </form>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-bold mb-6">Manage Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-3 text-white/70 font-semibold">Image</th>
                  <th className="p-3 text-white/70 font-semibold">Name</th>
                  <th className="p-3 text-white/70 font-semibold">Price</th>
                  <th className="p-3 text-white/70 font-semibold">Category</th>
                  <th className="p-3 text-white/70 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-white/10 hover:bg-white/5 transition">
                    <td className="p-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded bg-black" />
                    </td>
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3">Rs. {p.price}</td>
                    <td className="p-3">
                      <span className="bg-white/10 px-2 py-1 rounded text-xs">{p.category}</span>
                    </td>
                    <td className="p-3">
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={p.id} />
                        <button type="submit" className="text-red-400 hover:text-red-300 text-sm font-semibold transition">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-white/50">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
