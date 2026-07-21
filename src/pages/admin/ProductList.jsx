import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { getAllProducts, deleteProduct } from "../../firebase/productService";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    await deleteProduct(product.id, product.images);
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-[#2E2A27]">Products</h1>

        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 bg-[#465348] text-white px-6 py-3 rounded-full hover:bg-[#39443A] transition"
        >
          <FiPlus /> Add Product
        </Link>
      </div>

      <div className="relative mb-6 max-w-sm">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8178]" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-full border border-[#ECE8E3] outline-none focus:border-[#465348]"
        />
      </div>

      {loading ? (
        <p className="text-[#8A8178]">Loading products...</p>
      ) : filtered.length === 0 ? (
        <p className="text-[#8A8178]">No products found.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-[#ECE8E3] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F8F5F1] text-sm text-[#8A8178] uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((product) => {
                const totalStock = product.sizes
                  ? Object.values(product.sizes).reduce((sum, s) => sum + (s.stock || 0), 0)
                  : 0;

                return (
                  <tr key={product.id} className="border-t border-[#ECE8E3]">
                    <td className="px-6 py-4">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover bg-[#F4F0EB]"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-[#2E2A27]">{product.name}</td>
                    <td className="px-6 py-4 capitalize text-[#6F6A65]">{product.category}</td>
                    <td className="px-6 py-4">₹{product.price}</td>
                    <td className="px-6 py-4">
                      <span className={totalStock === 0 ? "text-red-600" : "text-[#2E2A27]"}>
                        {totalStock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          product.status === "active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F4F0EB]"
                        >
                          <FiEdit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product)}
                          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-50 text-red-600"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}