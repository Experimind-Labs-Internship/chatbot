import { useEffect, useState } from "react";
import ProductCard from "../../components/customer/ProductCard";
import { getAllProducts } from "../../firebase/productService";
import Loader from "../../components/common/Loader";

export default function BestSellerPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getAllProducts();

      const bestProducts = data.filter(
        (product) => product.bestSeller === true
      );

      setProducts(bestProducts);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  if (loading) return <Loader />;

  return (
    <main className="bg-[#FAF8F5] pt-32 pb-24">

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 text-center">

        <p className="uppercase tracking-[4px] text-[#B89B72]">
          YUMI DXB Fashion
        </p>

        <h1 className="mt-4 text-5xl font-serif text-[#2E2A27]">
          Best Sellers
        </h1>

        <p className="mt-6 text-[#6A625B] max-w-2xl mx-auto">
          Discover our most loved products, carefully selected based on
          customer favorites and timeless style.
        </p>

      </section>

      {/* Products */}

      <section className="max-w-7xl mx-auto px-6 mt-16">

        {products.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-2xl font-serif text-[#2E2A27]">
              No Best Sellers Available
            </h2>

            <p className="mt-4 text-[#6A625B]">
              Best seller products will appear here once selected by the admin.
            </p>

          </div>
        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

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