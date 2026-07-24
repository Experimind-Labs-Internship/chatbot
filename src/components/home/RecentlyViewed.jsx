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

              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition"
              />

              <div className="p-4">

                <h3 className="text-[#2E2A27] font-medium line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-[#465348] font-semibold mt-2">
                  ₹{product.price?.toLocaleString()}
                </p>

              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}