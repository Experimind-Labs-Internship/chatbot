import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext";

export default function RecentlyViewed() {
  const { recentProducts } = useRecentlyViewed();

  if (!recentProducts.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-serif text-[#2E2A27] mb-10">
        Recently Viewed
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {recentProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden border border-[#ECE8E3] hover:shadow-lg transition">

              <div className="relative">

  {product.discountActive && (
    <span className="absolute top-3 left-3 z-10 bg-[#465348] text-white text-xs px-3 py-2 rounded-full">
      {product.discountType === "percentage"
        ? `${product.discountValue}% OFF`
        : "SALE"}
    </span>
  )}

  <img
    src={product.images?.[0]}
    alt={product.name}
    className="w-full h-56 object-cover group-hover:scale-105 transition"
  />

</div>

              <div className="p-4">

                <h3 className="text-[#2E2A27] font-medium line-clamp-2">
                  {product.name}
                </h3>

                <div className="mt-2">
  {product.discountActive ? (
    <>
      <p className="text-sm text-gray-400 line-through">
        ₹{product.price?.toLocaleString()}
      </p>

      <p className="text-lg font-bold text-red-600">
        ₹{product.discountedPrice?.toLocaleString()}
      </p>

      {product.discountType === "percentage" && (
        <span className="inline-block mt-1 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
          {product.discountValue}% OFF
        </span>
      )}
    </>
  ) : (
    <p className="text-[#465348] font-semibold">
      ₹{product.price?.toLocaleString()}
    </p>
  )}
</div>

              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}