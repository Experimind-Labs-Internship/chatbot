import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const products = [
  "Iris Garden Robe",
  "Midnight Bloom Set",
  "Desert Rose Kaftan",
  "Vintage Peony Set",
  "Ethereal Orchid Set",
  "Nightwear",
  "Abayas",
  "Kaftans",
  "Co-ord Sets",
];

export default function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filteredProducts = products.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">

      {/* Overlay */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      ></div>

      {/* Search Box */}
      <div className="relative bg-white max-w-3xl mx-auto mt-24 rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_.3s_ease]">

        {/* Header */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-[#ECE8E3]">

          <h2 className="text-3xl font-serif text-[#2E2A27]">
            Search
          </h2>

          <button
            onClick={onClose}
            className="hover:text-[#C3A274] transition"
          >
            <FiX size={24} />
          </button>

        </div>

        {/* Input */}

        <div className="p-8">

          <div className="relative">

            <FiSearch
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-[#ECE8E3] rounded-full py-4 pl-14 pr-6 outline-none focus:border-[#C3A274] transition"
            />

          </div>

          {/* Suggestions */}

          <div className="mt-8 max-h-80 overflow-y-auto">

            {query === "" ? (

              <div>

                <p className="uppercase tracking-[3px] text-xs text-gray-500 mb-4">
                  Popular Searches
                </p>

                <div className="flex flex-wrap gap-3">

                  {[
                    "Nightwear",
                    "Kaftans",
                    "Abayas",
                    "New Arrivals",
                  ].map((item) => (
                    <button
                      key={item}
                      className="px-5 py-2 rounded-full border border-[#ECE8E3] hover:border-[#C3A274] transition"
                    >
                      {item}
                    </button>
                  ))}

                </div>

              </div>

            ) : filteredProducts.length > 0 ? (

              filteredProducts.map((item) => (

                <button
                  key={item}
                  className="w-full text-left py-4 border-b border-[#F3F3F3] hover:text-[#C3A274] transition"
                >
                  {item}
                </button>

              ))

            ) : (

              <div className="text-center py-12 text-gray-500">
                No products found.
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}