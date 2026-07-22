
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";

export default function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const closeSearch = () => {
    setQuery("");
    onClose();
  };

  const handleSearch = () => {
  if (!query.trim()) return;

  closeSearch();

  navigate(`/search?q=${encodeURIComponent(query)}`);
};

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">

      {/* Overlay */}
      <div
        className="absolute inset-0"
        onClick={closeSearch}
      ></div>

      {/* Search Box */}
      <div className="relative bg-white max-w-3xl mx-auto mt-24 rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_.3s_ease]">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#ECE8E3]">

          <h2 className="text-3xl font-serif text-red-600">
            SEARCH BAR
          </h2>

          <button
            onClick={closeSearch}
            className="hover:text-[#C3A274] transition"
          >
            <FiX size={24} />
          </button>

        </div>

        {/* Input */}

        <div className="p-8">

          <div className="relative">

            <FiSearch
              size={20}
              onClick={handleSearch}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#C3A274]"
            />

            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="w-full border border-[#ECE8E3] rounded-full py-4 pl-14 pr-6 outline-none focus:border-[#C3A274] transition"
            />

          </div>

          {/* Results */}
          <div className="mt-8">

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
          "Co-ord Sets",
        ].map((item) => (

          <button
            key={item}
            onClick={() => {
              closeSearch();
              navigate(`/search?q=${encodeURIComponent(item)}`);
            }}
            className="px-5 py-2 rounded-full border border-[#ECE8E3] hover:border-[#C3A274] transition"
          >
            {item}
          </button>

        ))}

      </div>

    </div>

  ) : (

    <div className="text-center py-8">

      <button
        onClick={handleSearch}
        className="px-8 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition"
      >
        Search "{query}"
      </button>

    </div>

  )}

</div>
{query === "" ? (

            <div>


            </div>

          ) : (

  <div className="text-center py-10">

    <button
      onClick={handleSearch}
      className="px-8 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition"
    >
      Search "{query}"
    </button>

  </div>

)
}

        </div>

      </div>

    </div>


  );
}