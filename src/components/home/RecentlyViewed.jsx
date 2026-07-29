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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recentProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden border border-[#ECE8E3] hover:shadow-lg transition flex flex-col h-full">

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
    className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
  />

</div>

              <div className="p-4 flex flex-col flex-1">

                <h3 className="font-serif text-xl text-[#2E2A27] leading-tight min-h-[56px] line-clamp-2">
                  {product.name}
                </h3>

                <div className="mt-2 min-h-[52px]">
  {product.discountActive ? (
    <>
      <p className="text-sm text-gray-400 line-through">
        ₹{product.price?.toLocaleString()}
      </p>

      <p className="text-xl font-bold text-green-600">
  ₹{product.discountedPrice?.toLocaleString()}
</p>


    </>
  ) : (
    <p className="text-xl font-semibold text-[#2E2A27]">
      ₹{product.price?.toLocaleString()}
    </p>
  )}
</div>
<button
  type="button"
  className="mt-auto w-full py-3 rounded-full bg-[#465348] text-white text-center cursor-pointer"
>
  View Product
</button>

              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}