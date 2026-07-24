import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRelatedProducts } from "../../firebase/productService";

export default function RelatedProducts({ category, currentProductId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  if (!category) return;

  async function loadProducts() {
  console.log("Current Category:", category);
  console.log("Current Product ID:", currentProductId);

  const data = await getRelatedProducts(
    category,
    currentProductId
  );

  console.log("Related Products:", data);

  setProducts(data);
}
  loadProducts();
}, [category, currentProductId]);

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-serif text-[#2E2A27] mb-8 text-center">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">

              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="p-4">
                <h3 className="font-medium text-[#2E2A27] line-clamp-2">
                  {product.name}
                </h3>

                <p className="mt-2 text-lg font-semibold text-[#465348]">
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