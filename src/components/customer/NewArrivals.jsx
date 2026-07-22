import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../firebase/productService";
// Images



export default function NewArrivals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
  try {
    const data = await getAllProducts();

    const latestProducts = data
      .filter((product) => product.status === "active")
      .sort(
        (a, b) =>
          (b.createdAt?.seconds || 0) -
          (a.createdAt?.seconds || 0)
      )
      .slice(0, 4);

    setProducts(latestProducts);
  } catch (err) {
    console.error("Failed to load products:", err);
  }
}
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          subtitle="Just Arrived"
          title="New Arrivals"
          description="Thoughtfully designed. Carefully crafted. Made for everyday elegance."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="group rounded-3xl overflow-hidden bg-[#FAF8F5] hover:shadow-xl transition duration-500"
            >

              {/* Image */}

              <div className="relative overflow-hidden">

                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-105"
                />

                <span className="absolute top-5 left-5 bg-[#465348] text-white text-xs px-4 py-2 rounded-full tracking-wider">
                  NEW
                </span>

              </div>

              {/* Content */}

              <div className="p-6">

                <p className="text-sm uppercase tracking-widest text-[#B89B72]">

                  {product.fabric || product.category}

                </p>

                <h3 className="font-serif text-2xl text-[#2E2A27] mt-3">

                  {product.name}

                </h3>

                <div className="flex justify-between items-center mt-6">

                  <span className="text-xl font-semibold text-[#2E2A27]">

                    ₹{product.price}

                  </span>

                  <span className="text-[#B89B72]">

                    ★ 4.9

                  </span>

                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="block mt-8 w-full py-3 rounded-full bg-[#465348] text-white text-center hover:bg-[#39443A] transition"
                  >
                    View Product
                </Link>

              </div>

            </div>

          ))}

        </div>

        <div className="text-center mt-16">

          <Link
          to="/new-arrivals"
          className="inline-flex items-center px-8 py-4 rounded-full border border-[#2E2A27] hover:bg-[#2E2A27] hover:text-white transition"
          >
            View All New Arrivals
          </Link>

        </div>

      </div>

    </section>
  );
}