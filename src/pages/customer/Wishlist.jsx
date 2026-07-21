import { Link } from "react-router-dom";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);

    setWishlist(updated);

    localStorage.setItem("wishlist", JSON.stringify(updated));

    // Update navbar badge immediately
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <main className="bg-[#FAF8F5] min-h-screen pt-24">

      {/* Hero */}
      <section className="text-center py-16 px-6">
        <p className="uppercase tracking-[4px] text-sm text-[#B89B72]">
          Wishlist
        </p>

        <h1 className="mt-4 text-5xl font-serif text-[#2E2A27]">
          Your Saved Favourite Products
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-[#6A625B] leading-8">
          Save your favourite pieces and come back anytime to continue shopping.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">

        {wishlist.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-sm p-16 text-center">

            <FiHeart className="mx-auto text-6xl text-[#B89B72]" />

            <h2 className="mt-8 text-3xl font-serif text-[#2E2A27]">
              Your Wishlist is Empty
            </h2>

            <p className="mt-4 text-[#6A625B] leading-7">
              Start adding your favourite products and they'll appear here.
            </p>

            <Link
              to="/shop"
              className="inline-block mt-10 px-8 py-4 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {wishlist.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[350px] object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-serif text-[#2E2A27]">
                    {product.title}
                  </h3>

                  <p className="mt-3 text-2xl font-semibold text-[#B89B72]">
                    {product.price}
                  </p>

                  <div className="flex gap-4 mt-6">

                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 bg-[#465348] text-white py-3 rounded-full text-center hover:bg-[#39443A] transition"
                    >
                      View Product
                    </Link>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-12 h-12 rounded-full border border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}