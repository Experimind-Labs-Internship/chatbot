import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

export default function ProductCard({
  id,
  image,
  title,
  fabric,
  price,
  rating,
  badge,
}) {
  return (
    <div className="group bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition duration-500">

      {/* Image */}

      <div className="relative overflow-hidden bg-[#F8F5F1]">

        <img
          src={image}
          alt={title}
          className="w-full h-[430px] object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Badge */}

        {badge && (
          <span className="absolute top-5 left-5 bg-[#465348] text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full">
            {badge}
          </span>
        )}

        {/* Wishlist */}

        <button className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#465348] hover:text-white transition">

          <FiHeart />

        </button>

      </div>

      {/* Content */}

      <div className="p-6">

        <p className="uppercase tracking-[3px] text-xs text-[#B89B72]">

          {fabric}

        </p>

        <Link to={`/product/${id}`}>

          <h3 className="mt-3 text-2xl font-serif text-[#2E2A27] hover:text-[#B89B72] transition">

            {title}

          </h3>

        </Link>

        {/* Rating */}

        <div className="flex items-center justify-between mt-5">

          <span className="text-[#B89B72]">

            ★ {rating}

          </span>

          <span className="text-xl font-semibold">

            {price}

          </span>

        </div>

        {/* Button */}

        <button className="mt-8 w-full py-3 rounded-full bg-[#465348] hover:bg-[#39443A] text-white transition flex items-center justify-center gap-2">

          <FiShoppingBag />

          Add to Cart

        </button>

      </div>

    </div>
  );
}