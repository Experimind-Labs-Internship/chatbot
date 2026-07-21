import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiUploadCloud, FiX } from "react-icons/fi";
import {
  addProduct,
  updateProduct,
  getProductById,
  uploadProductImage,
  SIZE_OPTIONS,
} from "../../firebase/productService";

const CATEGORIES = ["nightwear", "abayas", "kaftans", "coord-sets"];

const emptySizes = SIZE_OPTIONS.reduce((acc, s) => {
  acc[s] = { stock: 0 };
  return acc;
}, {});

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    fabric: "",
    careInstructions: "",
    category: CATEGORIES[0],
    sizes: emptySizes,
  });

  const [images, setImages] = useState([]); // existing URLs (edit mode)
  const [newFiles, setNewFiles] = useState([]); // File objects to upload
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;

    getProductById(id).then((product) => {
      if (product) {
        setForm({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          fabric: product.fabric || "",
          careInstructions: product.careInstructions || "",
          category: product.category || CATEGORIES[0],
          sizes: product.sizes || emptySizes,
        });
        setImages(product.images || []);
      }
      setLoading(false);
    });
  }, [id, isEdit]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSizeChange = (size, stock) => {
    setForm((prev) => ({
      ...prev,
      sizes: { ...prev.sizes, [size]: { stock: Number(stock) || 0 } },
    }));
  };

  const handleFileSelect = (e) => {
    setNewFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const removeExistingImage = (url) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const removeNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const uploadedUrls = await Promise.all(newFiles.map(uploadProductImage));
      const finalImages = [...images, ...uploadedUrls];

      const payload = {
        ...form,
        price: Number(form.price),
        images: finalImages,
      };

      if (isEdit) {
        await updateProduct(id, payload);
      } else {
        await addProduct(payload);
      }

      navigate("/admin/products");
    } catch (err) {
      alert("Something went wrong: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-[#8A8178]">Loading product...</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-serif text-[#2E2A27] mb-8">
        {isEdit ? "Edit Product" : "Add Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-[#ECE8E3] space-y-4">
          <div>
            <label className="text-sm text-[#6F6A65] mb-1 block">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#6F6A65] mb-1 block">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#6F6A65] mb-1 block">Price (₹)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-[#6F6A65] mb-1 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348] capitalize"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="capitalize">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#6F6A65] mb-1 block">Fabric</label>
              <input
                type="text"
                value={form.fabric}
                onChange={(e) => handleChange("fabric", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
              />
            </div>

            <div>
              <label className="text-sm text-[#6F6A65] mb-1 block">Care Instructions</label>
              <input
                type="text"
                value={form.careInstructions}
                onChange={(e) => handleChange("careInstructions", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
              />
            </div>
          </div>
        </div>

        {/* Sizes & Stock */}
        <div className="bg-white p-6 rounded-2xl border border-[#ECE8E3]">
          <h3 className="font-medium text-[#2E2A27] mb-4">Size-wise Stock</h3>
          <div className="grid grid-cols-4 gap-4">
            {SIZE_OPTIONS.map((size) => (
              <div key={size}>
                <label className="text-sm text-[#6F6A65] mb-1 block">{size}</label>
                <input
                  type="number"
                  min="0"
                  value={form.sizes[size]?.stock ?? 0}
                  onChange={(e) => handleSizeChange(size, e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-2xl border border-[#ECE8E3]">
          <h3 className="font-medium text-[#2E2A27] mb-4">Product Images</h3>

          <div className="flex flex-wrap gap-4 mb-4">
            {images.map((url) => (
              <div key={url} className="relative w-24 h-24">
                <img src={url} className="w-full h-full object-cover rounded-xl" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(url)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}

            {newFiles.map((file, i) => (
              <div key={i} className="relative w-24 h-24">
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeNewFile(i)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}
          </div>

          <label className="flex items-center gap-2 w-fit px-5 py-3 rounded-full border border-dashed border-[#C3A274] text-[#C3A274] cursor-pointer hover:bg-[#FAF6F0] transition">
            <FiUploadCloud />
            Upload Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition disabled:opacity-60"
          >
            {saving ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-8 py-3 rounded-full border border-[#2E2A27] text-[#2E2A27] hover:bg-[#2E2A27] hover:text-white transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}