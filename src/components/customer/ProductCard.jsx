import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} from "../../firebase/wishlistService";


export default function ProductCard({
  id,
  image,
  title,
  price,
  discountActive,
  discountedPrice,
  discountType,
  discountValue,

  showWishlist = true,
  showDelete = false,
  onDelete,
}) {
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();
  const [wishlistDocId, setWishlistDocId] = useState(null);

  useEffect(() => {
  if (!user) return;

  loadWishlist();
}, [user, id]);

async function loadWishlist() {
  const wishlist = await getWishlist(user.uid);

  const existing = wishlist.find(
    (item) => item.productId === id
  );

  if (existing) {
    setLiked(true);
    setWishlistDocId(existing.id);
  } else {
    setLiked(false);
    setWishlistDocId(null);
  }
}

  // ---------------- WISHLIST ----------------

  const handleWishlist = async () => {
  if (!user) {
    alert("Please login first.");
    return;
  }

  if (liked) {
    await removeWishlistItem(wishlistDocId);

    setLiked(false);
    setWishlistDocId(null);

    return;
  }

const docId =
await addToWishlist({
  userId: user.uid,
  productId: id,
  name: title,
  image,
  price:
    typeof price === "string"
      ? Number(price.replace(/[₹,]/g, ""))
      : price,

  discountActive: discountActive ?? false,
  discountedPrice: discountedPrice ?? null,
  discountType: discountType ?? null,
  discountValue: discountValue ?? null,
});
setLiked(true);
setWishlistDocId(docId);
};

  // ---------------- CART ----------------

  
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-500">

      {/* Image */}

      <div className="relative overflow-hidden">
        {discountActive && (
  <div className="absolute top-4 left-4 z-10 bg-[#2E7D32] text-white px-3 py-2 rounded-xl font-semibold text-sm shadow-lg">
    {discountType === "percentage"
      ? `${discountValue}% OFF`
      : "SALE"}
  </div>
)}

        <img
          src={image}
          alt={title}
          className="w-full h-[380px] object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Wishlist */}

        {showWishlist && (
  <button
    onClick={handleWishlist}
    className={`absolute top-4 right-4 w-11 h-11 rounded-full backdrop-blur flex items-center justify-center transition ${
      liked
        ? "bg-red-500 text-white"
        : "bg-white/90 hover:bg-[#465348] hover:text-white"
    }`}
  >
    <FiHeart size={18} />
  </button>
)}

{showDelete && (
  <button
    onClick={onDelete}
    className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center"
  >
    <FiTrash2 size={18} />
  </button>
)}

        {/* Quick View */}

        {!showDelete && (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
    <Link
      to={`/product/${id}`}
      className="bg-[#465348] text-white px-6 py-3 rounded-full"
    >
      View Details
    </Link>
  </div>
)}

      </div>

      {/* Details */}

      <div className="p-6">

        <h3 className="font-serif text-2xl text-[#2E2A27]">
          {title}
        </h3>

        {!showDelete && (
  <p className="mt-3 text-[#6A625B]">
    Elegant • Comfortable • Premium
  </p>
)}

        <div className="flex justify-between items-start mt-6">

          
 
<div className="min-h-[76px]">
  {discountActive ? (
    <>
      <p className="text-sm text-gray-400 line-through">
        ₹{price}
      </p>

      <p className="text-2xl font-bold text-green-600">
        ₹{discountedPrice}
      </p>

      
    </>
  ) : (
    <p className="text-2xl font-semibold text-[#B89B72] pt-5">
      ₹{price}
    </p>
  )}
</div>

          {!showDelete && (
  <Link
    to={`/product/${id}`}
    className="w-12 h-12 rounded-full bg-[#465348] text-white flex items-center justify-center hover:bg-[#39443A] transition"
  >
    <FiShoppingBag />
  </Link>
)}

        </div>

      </div>

    </div>
  );
}