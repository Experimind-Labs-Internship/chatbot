import { useState } from "react";
import { FiHeart, FiShoppingBag, FiTruck, FiRefreshCw } from "react-icons/fi";

import productImage from "../../assets/images/products/black-model.png";

export default function ProductDetails() {
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <main className="bg-[#FAF8F5] pt-32 pb-24">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* Product Image */}

        <div>

          <div className="rounded-[32px] overflow-hidden bg-white">

            <img
              src={productImage}
              alt="Nightwear"
              className="w-full h-[700px] object-cover"
            />

          </div>

          {/* Thumbnails */}

          <div className="flex gap-4 mt-6">

            <img
              src={productImage}
              alt=""
              className="w-24 h-24 rounded-2xl object-cover border cursor-pointer"
            />

            <img
              src={productImage}
              alt=""
              className="w-24 h-24 rounded-2xl object-cover border cursor-pointer"
            />

            <img
              src={productImage}
              alt=""
              className="w-24 h-24 rounded-2xl object-cover border cursor-pointer"
            />

          </div>

        </div>

        {/* Details */}

        <div>

          <p className="uppercase tracking-[4px] text-[#B89B72]">
            Nightwear Collection
          </p>

          <h1 className="mt-3 text-5xl font-serif text-[#2E2A27]">
            Midnight Blossom Set
          </h1>

          <div className="flex items-center gap-3 mt-5">

            <span className="text-yellow-500">
              ★★★★★
            </span>

            <span className="text-[#6A625B]">
              (48 Reviews)
            </span>

          </div>

          <h2 className="mt-8 text-4xl font-semibold text-[#465348]">
            ₹999
          </h2>

          <p className="mt-8 leading-8 text-[#6A625B]">

            Thoughtfully designed for luxurious comfort and timeless
            elegance. Crafted using premium breathable fabrics,
            making every evening feel effortlessly beautiful.

          </p>

          {/* Fabric */}

          <div className="mt-10">

            <h3 className="font-semibold text-lg">
              Fabric
            </h3>

            <p className="mt-2 text-[#6A625B]">
              Premium Cotton Satin
            </p>

          </div>

          {/* Sizes */}

          <div className="mt-10">

            <h3 className="font-semibold text-lg mb-4">
              Select Size
            </h3>

            <div className="flex gap-3">

              {sizes.map((item) => (

                <button
                  key={item}
                  onClick={() => setSize(item)}
                  className={`w-12 h-12 rounded-full border transition ${
                    size === item
                      ? "bg-[#465348] text-white"
                      : "bg-white"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* Quantity */}

          <div className="mt-10">

            <h3 className="font-semibold text-lg mb-4">
              Quantity
            </h3>

            <div className="flex items-center gap-5">

              <button
                onClick={() =>
                  quantity > 1 && setQuantity(quantity - 1)
                }
                className="w-10 h-10 rounded-full border"
              >
                -
              </button>

              <span className="text-xl">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border"
              >
                +
              </button>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex gap-4 mt-12">

            <button className="flex-1 rounded-full bg-[#465348] text-white py-4 hover:bg-[#39443A] transition flex justify-center items-center gap-3">

              <FiShoppingBag />

              Add to Cart

            </button>

            <button className="w-16 rounded-full border flex items-center justify-center">

              <FiHeart />

            </button>

          </div>

          {/* Features */}

          <div className="mt-14 space-y-5">

            <div className="flex items-center gap-4">

              <FiTruck size={20} />

              <span>
                Free Shipping Across India
              </span>

            </div>

            <div className="flex items-center gap-4">

              <FiRefreshCw size={20} />

              <span>
                Easy 7-Day Returns
              </span>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}