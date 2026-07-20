import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";

// Import your images
import irisGarden from "../../assets/images/products/iris-garden-model.png";
import midnightBlossom from "../../assets/images/products/black-model.png";
import desertRose from "../../assets/images/products/crimson-bloom-model.png";
import lavenderGrace from "../../assets/images/products/lavender-grace-model.png";

const products = [
  {
    id: 1,
    name: "Iris Garden",
    image: irisGarden,
    price: "₹999",
    rating: "4.9",
  },
  {
    id: 2,
    name: "Midnight Blossom",
    image: midnightBlossom,
    price: "₹999",
    rating: "4.8",
  },
  {
    id: 3,
    name: "Crimson Bloom",
    image: desertRose,
    price: "₹999",
    rating: "4.9",
  },
  {
    id: 4,
    name: "Lavender Grace",
    image: lavenderGrace,
    price: "₹999",
    rating: "4.8",
  },
];

export default function BestSellers() {
  return (
    <section className="py-24 bg-[#FAF8F5]">

      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          subtitle="Customer Favorites"
          title="Best Sellers"
          description="Loved by women who appreciate comfort, quality, and timeless elegance."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-500"
            >

              {/* Image */}

              <div className="overflow-hidden bg-[#F8F5F1]">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              {/* Details */}

              <div className="p-6">

                <span className="inline-block px-3 py-1 rounded-full bg-[#ECE5DA] text-xs tracking-widest uppercase text-[#8A7A67]">
                  Best Seller
                </span>

                <h3 className="mt-4 text-xl font-serif text-[#2E2A27]">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-4">

                  <p className="text-lg font-semibold text-[#2E2A27]">
                    {product.price}
                  </p>

                  <span className="text-[#B89B72]">
                    ★ {product.rating}
                  </span>

                </div>

                <button
                  className="mt-6 w-full py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition"
                >
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Button */}

        <div className="text-center mt-16">

          <Link
            to="/shop"
            className="inline-flex items-center px-8 py-4 border border-[#2E2A27] rounded-full hover:bg-[#2E2A27] hover:text-white transition"
          >
            View All Best Sellers
          </Link>

        </div>

      </div>

    </section>
  );
}