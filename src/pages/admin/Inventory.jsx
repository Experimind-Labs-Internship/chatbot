import { useEffect, useState } from "react";
import { FiAlertTriangle, FiPlus } from "react-icons/fi";
import {
  getInventoryData,
  restockSize,
  LOW_STOCK_THRESHOLD,
} from "../../firebase/inventoryService";
import { SIZE_OPTIONS } from "../../firebase/productService";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restockInputs, setRestockInputs] = useState({}); // { "productId-size": qty }
  const [savingKey, setSavingKey] = useState(null);
  const [filterLowStock, setFilterLowStock] = useState(false);

  const loadInventory = async () => {
    setLoading(true);
    const data = await getInventoryData();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleInputChange = (key, value) => {
    setRestockInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleRestock = async (product, size) => {
    const key = `${product.id}-${size}`;
    const qty = Number(restockInputs[key]);

    if (!qty || qty <= 0) return;

    setSavingKey(key);

    const updatedSizes = await restockSize(product.id, product.sizes, size, qty);

    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? {
              ...p,
              sizes: updatedSizes,
              totalStock: SIZE_OPTIONS.reduce(
                (sum, s) => sum + (updatedSizes[s]?.stock || 0),
                0
              ),
              isLowStock: SIZE_OPTIONS.some(
                (s) => (updatedSizes[s]?.stock ?? 0) <= LOW_STOCK_THRESHOLD
              ),
            }
          : p
      )
    );

    setRestockInputs((prev) => ({ ...prev, [key]: "" }));
    setSavingKey(null);
  };

  const lowStockCount = products.filter((p) => p.isLowStock).length;
  const displayed = filterLowStock ? products.filter((p) => p.isLowStock) : products;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-[#2E2A27]">Inventory</h1>

        <button
          onClick={() => setFilterLowStock((prev) => !prev)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition ${
            filterLowStock
              ? "bg-red-50 border-red-200 text-red-700"
              : "border-[#ECE8E3] text-[#6F6A65] hover:bg-[#F4F0EB]"
          }`}
        >
          <FiAlertTriangle size={16} />
          {lowStockCount} Low Stock {filterLowStock ? "(showing)" : ""}
        </button>
      </div>

      {loading ? (
        <p className="text-[#8A8178]">Loading inventory...</p>
      ) : displayed.length === 0 ? (
        <p className="text-[#8A8178]">
          {filterLowStock ? "No low stock items 🎉" : "No products found."}
        </p>
      ) : (
        <div className="space-y-4">
          {displayed.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#ECE8E3] p-6"
            >
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover bg-[#F4F0EB]"
                />
                <div>
                  <h3 className="font-medium text-[#2E2A27]">{product.name}</h3>
                  <p className="text-sm text-[#8A8178] capitalize">
                    {product.category} • Total stock: {product.totalStock}
                  </p>
                </div>

                {product.isLowStock && (
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-red-700 bg-red-50 px-3 py-1.5 rounded-full">
                    <FiAlertTriangle size={13} />
                    Low Stock
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-4">
                {SIZE_OPTIONS.map((size) => {
                  const stock = product.sizes[size]?.stock ?? 0;
                  const key = `${product.id}-${size}`;
                  const low = stock <= LOW_STOCK_THRESHOLD;

                  return (
                    <div
                      key={size}
                      className={`rounded-xl border p-4 ${
                        low ? "border-red-200 bg-red-50/50" : "border-[#ECE8E3]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#2E2A27]">{size}</span>
                        <span className={`text-sm ${low ? "text-red-600" : "text-[#6F6A65]"}`}>
                          {stock} in stock
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="1"
                          placeholder="Qty"
                          value={restockInputs[key] || ""}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-[#ECE8E3] outline-none focus:border-[#465348]"
                        />
                        <button
                          onClick={() => handleRestock(product, size)}
                          disabled={savingKey === key}
                          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-[#465348] text-white hover:bg-[#39443A] disabled:opacity-50"
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}