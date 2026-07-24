import { useState, useEffect } from "react";
import {
  FiGrid,
  FiFilter,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";

import { getAllProducts } from "../../firebase/productService";

import ProductCard from "../../components/customer/ProductCard";

export default function Shop() {
const [category, setCategory] = useState("All");
const [products, setProducts] = useState([]);

const [searchOpen, setSearchOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState("");

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

  const filteredProducts = products.filter((product) => {
  const matchesCategory =
    category === "All"
      ? true
      : product.category?.toLowerCase() === category.toLowerCase();

  const matchesSearch =
    product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

  return matchesCategory && matchesSearch;
});
  const categories = [
  { label: "All", value: "All" },
  { label: "Nightwear", value: "nightwear" },
  { label: "Abayas", value: "abayas" },
  { label: "Kaftans", value: "kaftans" },
  { label: "Co-ord Sets", value: "coord-sets" },
];

  return (
    <main className="bg-[#FAF8F5] pt-32 pb-24">

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

            <button className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#E6E0D8] bg-white">

              <FiFilter />

              Filters

            </button>

            <button className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#E6E0D8] bg-white">

              <FiChevronDown />

              Sort

            </button>

            <button className="w-12 h-12 rounded-full border border-[#E6E0D8] bg-white flex items-center justify-center">

              <FiGrid />

            </button>

          </div>
          

        </div>
        {searchOpen && (
  <div className="mt-6 flex justify-end">
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full md:w-96 px-5 py-3 rounded-full border border-[#E6E0D8] bg-white outline-none focus:border-[#465348]"
    />
  </div>
)}

      </section>

      {/* Products */}

      <section className="max-w-7xl mx-auto px-6 mt-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              id={product.id}
              image={product.images?.[0]}
              title={product.name}
              price={`₹${product.price}`}
            />

          ))}

        </div>

      </section>

    </main>
  );
}