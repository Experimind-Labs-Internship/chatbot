import { Link } from "react-router-dom";
import { FiHeart} from "react-icons/fi";
import { useEffect, useState } from "react";
import ProductCard from "../../components/customer/ProductCard";

import { auth } from "../../firebase/firebase";
import {
  getWishlist,
  removeWishlistItem,
} from "../../firebase/wishlistService";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

useEffect(() => {
  async function loadWishlist() {
    const user = auth.currentUser;

    if (!user) return;

    const data = await getWishlist(user.uid);

    console.log("Wishlist Data:", data);

    setWishlist(data);
  }

  loadWishlist();
}, []);

  const removeFromWishlist = async (id) => {
  await removeWishlistItem(id);

  setWishlist((prev) =>
    prev.filter((item) => item.id !== id)
  );
};

  return (
    <main className="bg-[#FAF8F5] min-h-screen pt-0">

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
    <ProductCard
      key={product.id}
      id={product.productId}
      image={product.image}
      title={product.name}
      price={product.price}
      discountActive={product.discountActive}
      discountedPrice={product.discountedPrice}
      discountType={product.discountType}
      discountValue={product.discountValue}
      showWishlist={false}
      showDelete={true}
      onDelete={() => removeFromWishlist(product.id)}
    />
  ))}
</div>

        )}

      </section>

    </main>
  );
}