import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";

// Images
import irisGarden from "../../assets/images/products/iris-garden-model.png";
import midnightBlossom from "../../assets/images/products/black-model.png";
import desertRose from "../../assets/images/products/crimson-bloom-model.png";
import lavenderGrace from "../../assets/images/products/lavender-grace-model.png";
const products = [
  {
    id: 1,
    name: "Iris Garden Robe",
    fabric: "Soft Cotton Blend",
    price: "₹999",
    image: irisGarden,
    badge: "NEW",
  },
  {
    id: 2,
    name: "Midnight Bloom Set",
    fabric: "Breathable Modal",
    price: "₹999",
    image: midnightBlossom,
    badge: "NEW",
  },
  {
    id: 3,
    name: "Desert Rose Kaftan",
    fabric: "Pure Cotton",
    price: "₹999",
    image: desertRose,
    badge: "NEW",
  },
  {
    id: 4,
    name: "Vintage Peony Set",
    fabric: "Premium Rayon",
    price: "₹999",
    image: lavenderGrace,
    badge: "NEW",
  },
];

export default function NewArrivals() {
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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-105"
                />

                <span className="absolute top-5 left-5 bg-[#465348] text-white text-xs px-4 py-2 rounded-full tracking-wider">
                  {product.badge}
                </span>

              </div>

              {/* Content */}

              <div className="p-6">

                <p className="text-sm uppercase tracking-widest text-[#B89B72]">

                  {product.fabric}

                </p>

                <h3 className="font-serif text-2xl text-[#2E2A27] mt-3">

                  {product.name}

                </h3>

                <div className="flex justify-between items-center mt-6">

                  <span className="text-xl font-semibold text-[#2E2A27]">

                    {product.price}

                  </span>

                  <span className="text-[#B89B72]">

                    ★ 4.9

                  </span>

                </div>

                <button className="mt-8 w-full py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition">

                  Add to Cart

                </button>

              </div>

            </div>

          ))}

        </div>

        <div className="text-center mt-16">

          <Link
            to="/shop"
            className="inline-flex items-center px-8 py-4 rounded-full border border-[#2E2A27] hover:bg-[#2E2A27] hover:text-white transition"
          >
            View All Products
          </Link>

        </div>

      </div>

    </section>
  );
}