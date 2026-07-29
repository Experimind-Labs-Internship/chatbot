import { useState, useEffect } from "react";
import {
  FiGrid,
  FiFilter,
  FiSearch,
} from "react-icons/fi";

import { getAllProducts } from "../../firebase/productService";

import ProductCard from "../../components/customer/ProductCard";

export default function Shop() {
const [category, setCategory] = useState("All");
const [products, setProducts] = useState([]);
const [sortBy, setSortBy] = useState("newest");
const [searchOpen, setSearchOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [filterOpen, setFilterOpen] = useState(false);
const [bestSellerOnly, setBestSellerOnly] = useState(false);
const [priceRange, setPriceRange] = useState("all");
const [selectedSize, setSelectedSize] = useState("all");
const [gridView, setGridView] = useState(4);
const [showGridOptions, setShowGridOptions] = useState(false);

useEffect(() => {
  async function loadProducts() {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  }

  loadProducts();
}, []);

  const filteredProducts = [...products]
  .filter((product) => {
    const matchesBestSeller =
  !bestSellerOnly || product.bestSeller === true;
    // Category
    const matchesCategory =
      category === "All"
        ? true
        : product.category?.toLowerCase() === category.toLowerCase();

    // Search
    const search = searchTerm.toLowerCase();

const matchesSearch =
  product.name?.toLowerCase().includes(search) ||
  product.category?.toLowerCase().includes(search) ||
  product.fabric?.toLowerCase().includes(search);

    // Price
    let matchesPrice = true;

    if (priceRange === "0-999")
      matchesPrice = Number(product.price) <= 999;

    if (priceRange === "1000-1999")
      matchesPrice =
        Number(product.price) >= 1000 &&
        Number(product.price) <= 1999;

    if (priceRange === "2000-2999")
      matchesPrice =
        Number(product.price) >= 2000 &&
        Number(product.price) <= 2999;

    if (priceRange === "3000+")
      matchesPrice = Number(product.price) >= 3000;

    // Size
    const matchesSize =
      selectedSize === "all"
        ? true
        : Boolean(product.sizes?.[selectedSize]);

    
    return (
      matchesCategory &&
      matchesSearch &&
      matchesPrice &&
      matchesSize &&
      matchesBestSeller
    );
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "low-high":
        return Number(a.price) - Number(b.price);

      case "high-low":
        return Number(b.price) - Number(a.price);

      case "newest":
default:
  return (
    (b.createdAt?.seconds || 0) -
    (a.createdAt?.seconds || 0)
  );
    }
  });
  const categories = [
  { label: "All", value: "All" },
  { label: "Nightwear", value: "nightwear" },
  { label: "Abayas", value: "abayas" },
  { label: "Kaftans", value: "kaftans" },
  { label: "Co-ord Sets", value: "coord-sets" },
];

  return (
    <main className="bg-[#FAF8F5] pb-24">

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 text-center">

        <p className="uppercase tracking-[5px] text-[#B89B72] text-sm">
          YUMI DXB Fashion
        </p>

        <h1 className="mt-4 text-5xl lg:text-6xl font-serif text-[#2E2A27]">
          Shop Collection
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-[#6A625B] leading-8">
          Discover thoughtfully designed nightwear, elegant abayas,
          flowing kaftans and sophisticated co-ord sets created for
          timeless comfort.
        </p>

      </section>

      {/* Toolbar */}

      <section className="max-w-7xl mx-auto px-6 mt-16">

        <div className="flex flex-col lg:flex-row gap-5 justify-between items-center">

          {/* Categories */}

          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (

              <button
                key={item.value}
                onClick={() => setCategory(item.value)}
                className={`px-6 py-3 rounded-full transition ${
                  category === item.value
                    ? "bg-[#465348] text-white"
                    : "bg-white border border-[#E6E0D8] hover:border-[#B89B72]"
                }`}
              >
                {item.label}
              </button>

            ))}

          </div>

          {/* Actions */}
<div className="flex gap-4">

  <button
    onClick={() => setSearchOpen(!searchOpen)}
    className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#E6E0D8] bg-white"
  >
    <FiSearch />
    Search
  </button>

  <button
    onClick={() => setFilterOpen(!filterOpen)}
    className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#E6E0D8] bg-white"
  >
    <FiFilter />
    Filters
  </button>

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="px-5 py-3 rounded-full border border-[#E6E0D8] bg-white outline-none"
  >
    <option value="newest">Newest</option>
    <option value="low-high">Price: Low → High</option>
    <option value="high-low">Price: High → Low</option>
  </select>

  {/* Grid View */}
  <div className="relative">

    <button
      onClick={() => setShowGridOptions(!showGridOptions)}
      className="w-12 h-12 rounded-full border border-[#E6E0D8] bg-white flex items-center justify-center hover:bg-[#F7F4EF]"
    >
      <FiGrid />
    </button>

   {showGridOptions && (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-[#E6E0D8] shadow-xl overflow-hidden z-50">

    <div className="px-4 py-3 bg-[#F7F4EF] border-b border-[#ECE8E3]">
      <p className="text-sm font-semibold text-[#465348]">
        Select Grid View
      </p>
    </div>

       <button
  onClick={() => {
    setGridView(2);
    setShowGridOptions(false);
  }}
  className={`w-full flex justify-between items-center px-4 py-3 hover:bg-[#F7F4EF] transition ${
    gridView === 2 ? "text-[#465348] font-semibold" : ""
  }`}
>
  <span>2 Columns</span>
  {gridView === 2 && <span>✓</span>}
</button>

<button
  onClick={() => {
    setGridView(3);
    setShowGridOptions(false);
  }}
  className={`w-full flex justify-between items-center px-4 py-3 hover:bg-[#F7F4EF] transition ${
    gridView === 3 ? "text-[#465348] font-semibold" : ""
  }`}
>
  <span>3 Columns</span>
  {gridView === 3 && <span>✓</span>}
</button>

<button
  onClick={() => {
    setGridView(4);
    setShowGridOptions(false);
  }}
  className={`w-full flex justify-between items-center px-4 py-3 hover:bg-[#F7F4EF] transition ${
    gridView === 4 ? "text-[#465348] font-semibold" : ""
  }`}
>
  <span>4 Columns</span>
  {gridView === 4 && <span>✓</span>}
</button>

      </div>
    )}

  </div>

</div>
{searchOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative">

      {/* Close */}
      <button
        onClick={() => setSearchOpen(false)}
        className="absolute top-5 right-5 text-2xl text-[#8A8178] hover:text-black"
      >
        ×
      </button>

      <h2 className="text-2xl font-semibold text-[#2E2A27] mb-6">
        Search Products
      </h2>

      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-5 py-4 rounded-xl border border-[#E6E0D8] outline-none focus:border-[#465348]"
      />

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={() => setSearchTerm("")}
          className="px-5 py-3 rounded-xl border border-[#E6E0D8]"
        >
          Clear
        </button>

        <button
          onClick={() => setSearchOpen(false)}
          className="px-5 py-3 rounded-xl bg-[#465348] text-white"
        >
          Search
        </button>

      </div>

    </div>

  </div>
)}
          
{filterOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative">

      {/* Close Button */}
      <button
        onClick={() => setFilterOpen(false)}
        className="absolute top-5 right-5 text-2xl text-[#8A8178] hover:text-black"
      >
        ×
      </button>

      <h2 className="text-2xl font-semibold text-[#2E2A27] mb-6">
        Filters
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Price */}
        <div>
          <label className="font-medium">Price</label>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="mt-2 w-full border rounded-lg p-2"
          >
            <option value="all">All</option>
            <option value="0-999">Under ₹999</option>
            <option value="1000-1999">₹1000 - ₹1999</option>
            <option value="2000-2999">₹2000 - ₹2999</option>
            <option value="3000+">Above ₹3000</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="font-medium">Size</label>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="mt-2 w-full border rounded-lg p-2"
          >
            <option value="all">All</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

      </div>

      <div className="flex items-center gap-3 mt-6">
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSellerOnly}
          onChange={(e) => setBestSellerOnly(e.target.checked)}
        />

        <label htmlFor="bestSeller">
          Best Seller Only
        </label>
      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={() => {
            setPriceRange("all");
            setSelectedSize("all");
            setBestSellerOnly(false);
          }}
          className="px-5 py-3 rounded-xl border border-[#E6E0D8]"
        >
          Reset
        </button>

        <button
          onClick={() => setFilterOpen(false)}
          className="px-5 py-3 rounded-xl bg-[#465348] text-white"
        >
          Apply Filters
        </button>

      </div>

    </div>

  </div>
)}
</div>
      </section>

      {/* Products */}

      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex justify-between items-center mb-8">
          <p className="text-[#6A625B]">
            Showing <span className="font-semibold">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div
          className={`grid gap-8 ${
            gridView === 4
              ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : gridView === 3
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-1 lg:grid-cols-2"
          }`}
        >

          {filteredProducts.length > 0 ? (
  filteredProducts.map((product) => (
   <ProductCard
  id={product.id}
  image={product.images?.[0]}
  title={product.name}
  price={product.price}
  discountActive={product.discountActive}
  discountedPrice={product.discountedPrice}
  discountType={product.discountType}
  discountValue={product.discountValue}
/>
  ))
) : (
  <div className="col-span-full text-center py-16">
    <h3 className="text-2xl font-semibold text-[#465348]">
      No products found
    </h3>

    <p className="mt-2 text-[#7A746E]">
      Try changing your search or filters.
    </p>
  </div>
)}

        </div>

      </section>

    </main>
  );
}