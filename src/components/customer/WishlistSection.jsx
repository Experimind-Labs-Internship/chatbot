import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import {
  getWishlist,
  removeWishlistItem,
} from "../../firebase/wishlistService";

export default function WishlistSection() {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user) return;

    loadWishlist();
  }, [user]);

  async function loadWishlist() {
    const data = await getWishlist(user.uid);
    setWishlist(data);
  }

  async function removeItem(id) {
    await removeWishlistItem(id);
    loadWishlist();
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-serif text-[#2E2A27]">
          Wishlist
        </h2>

        <FiHeart className="text-red-500" size={26} />

      </div>

      {wishlist.length === 0 ? (

        <p className="text-[#8A8178]">
          No products in wishlist.
        </p>

      ) : (

        <div className="space-y-5">

          {wishlist.map((item) => (

            <div
              key={item.id}
              className="flex gap-4 items-center border rounded-2xl p-4"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 rounded-xl object-cover"
              />

              <div className="flex-1">

                <h3 className="font-medium">
                  {item.name}
                </h3>

                <p className="mt-2 text-[#B89B72]">
                  ₹{item.price}
                </p>

              </div>

              <Link
                to={`/product/${item.productId}`}
                className="px-4 py-2 rounded-full border border-[#465348] hover:bg-[#465348] hover:text-white transition"
              >
                View
              </Link>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                <FiTrash2 />
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}