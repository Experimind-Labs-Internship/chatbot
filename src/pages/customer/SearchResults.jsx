import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/customer/ProductCard";
import { getAllProducts } from "../../firebase/productService";
import Loader from "../../components/common/Loader";

export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = (searchParams.get("q") || "").toLowerCase();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [query]);

  async function loadProducts() {
    try {
      const data = await getAllProducts();

      const filtered = data.filter((product) => {
        return (
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.fabric?.toLowerCase().includes(query)
        );
      });

      setProducts(filtered);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  if (loading) return <Loader />;

  return (
    <main className="bg-[#FAF8F5] pt-32 pb-24 min-h-screen">

      <section className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-serif text-[#2E2A27]">
          Search Results
        </h1>

        <p className="mt-4 text-[#6A625B]">
          Showing results for{" "}
          <span className="font-semibold text-[#465348]">
            "{query}"
          </span>
        </p>

        {products.length === 0 ? (

          <div className="text-center py-24">

            <h2 className="text-3xl font-serif text-[#2E2A27]">
              No products found
            </h2>

            <p className="mt-4 text-[#6A625B]">
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-14">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                id={product.id}
                image={product.images?.[0]}
                title={product.name}
                price={`₹${product.price}`}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}