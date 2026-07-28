import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
} from "../../firebase/productService";

export default function DiscountProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductById(id);

      setProduct(data);

      setDiscountType(data.discountType || "percentage");
      setDiscountValue(data.discountValue || 0);

      setLoading(false);
    }

    loadProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  const price = Number(product.price);

  let discountedPrice = price;

  if (discountType === "percentage") {
    discountedPrice = price - (price * Number(discountValue)) / 100;
  } else {
    discountedPrice = price - Number(discountValue);
  }

  if (discountedPrice < 0) discountedPrice = 0;

  const handleSave = async () => {
  const value = Number(discountValue);

  if (discountType === "percentage") {
    if (value < 0 || value > 100) {
      alert("Percentage discount must be between 0 and 100.");
      return;
    }
  }

  if (discountType === "fixed") {
    if (value < 0 || value > product.price) {
      alert("Discount cannot be greater than the product price.");
      return;
    }
  }

  await updateProduct(id, {
    discountActive: true,
    discountType,
    discountValue: value,
    discountedPrice: Math.round(discountedPrice),
  });

  alert("Discount Applied Successfully");
  navigate("/admin/products");
};

  const handleRemove = async () => {
    await updateProduct(id, {
      discountActive: false,
      discountType: "",
      discountValue: 0,
      discountedPrice: product.price,
    });

    alert("Discount Removed");

    navigate("/admin/products");
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 border border-[#ECE8E3]">
      <h1 className="text-3xl font-serif mb-8">
        Product Discount
      </h1>

      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-36 h-36 object-cover rounded-xl mb-6"
      />

      <h2 className="text-xl font-semibold mb-2">
        {product.name}
      </h2>

      <p className="text-lg mb-6">
        Original Price:
        <strong> ₹{product.price}</strong>
      </p>

      <label className="block mb-2 font-medium">
        Discount Type
      </label>

      <select
        value={discountType}
        onChange={(e) => setDiscountType(e.target.value)}
        className="w-full border rounded-xl p-3 mb-5"
      >
        <option value="percentage">
          Percentage (%)
        </option>

        <option value="fixed">
          Fixed Amount (₹)
        </option>
      </select>

      <label className="block mb-2 font-medium">
        Discount Value
      </label>

      <input
  type="number"
  min="0"
  max={discountType === "percentage" ? 100 : product.price}
  value={discountValue}
  onChange={(e) => setDiscountValue(e.target.value)}
  className="w-full border rounded-xl p-3 mb-6"
/>

      <div className="bg-[#F8F5F1] rounded-xl p-5 mb-8">
        <p className="mb-2">
          Original Price:
          <strong> ₹{product.price}</strong>
        </p>

        <p className="text-green-700 font-semibold text-xl">
          Discounted Price:
          ₹{Math.round(discountedPrice)}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 bg-[#465348] text-white py-3 rounded-xl hover:bg-[#39443A]"
        >
          Save Discount
        </button>

        <button
          onClick={handleRemove}
          className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}