import { useState } from "react";
import {
  FiGrid,
  FiFilter,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";

import ProductCard from "../../components/customer/ProductCard";

import nightwear from "../../assets/images/collections/nightwear.png";
import abaya from "../../assets/images/collections/abaya.jpeg";
import kaftan from "../../assets/images/collections/kaftan.jpeg";
import coordSet from "../../assets/images/collections/coord-set.jpeg";

export default function Shop() {
  const [category, setCategory] = useState("All");

  const products = [
    {
      id: 1,
      title: "Midnight Blossom Set",
      category: "Nightwear",
      price: "₹999",
      image: nightwear,
    },
    {
      id: 2,
      title: "Elegant Abaya",
      category: "Abayas",
      price: "₹1,499",
      image: abaya,
    },
    {
      id: 3,
      title: "Luxury Kaftan",
      category: "Kaftans",
      price: "₹1,299",
      image: kaftan,
    },
    {
      id: 4,
      title: "Classic Co-ord Set",
      category: "Co-ord Sets",
      price: "₹1,199",
      image: coordSet,
    },
  ];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (product) => product.category === category
        );

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

            {[
              "All",
              "Nightwear",
              "Abayas",
              "Kaftans",
              "Co-ord Sets",
            ].map((item) => (

              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-6 py-3 rounded-full transition ${
                  category === item
                    ? "bg-[#465348] text-white"
                    : "bg-white border border-[#E6E0D8] hover:border-[#B89B72]"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

          {/* Actions */}

          <div className="flex gap-4">

            <button className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#E6E0D8] bg-white">

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

      </section>

      {/* Products */}

      <section className="max-w-7xl mx-auto px-6 mt-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />

          ))}

        </div>

      </section>

    </main>
  );
}