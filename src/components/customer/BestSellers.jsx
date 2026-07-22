import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../firebase/productService";



export default function BestSellers() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getAllProducts();

    const bestProducts = data
      .filter((product) => product.bestSeller === true)
      .slice(0, 4);

    setProducts(bestProducts);
  }

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
                  src={product.images?.[0]}
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
                    ₹{product.price}
                  </p>

                  <span className="text-[#B89B72]">
                    ★  4.9
                  </span>

                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="block mt-6 w-full py-3 rounded-full bg-[#465348] text-white text-center hover:bg-[#39443A] transition"
                >  
                  View Product
                </Link>

              </div>

            </div>

          ))}

        </div>

        {/* Button */}

        <div className="text-center mt-16">

          <Link
            to="/best-sellers"
            className="inline-flex items-center px-8 py-4 border border-[#2E2A27] rounded-full hover:bg-[#2E2A27] hover:text-white transition"
          >
            View All Best Sellers
          </Link>

        </div>

      </div>

    </section>
  );
}