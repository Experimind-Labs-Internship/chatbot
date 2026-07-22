import { useEffect, useState } from "react";
import ProductCard from "../../components/customer/ProductCard";
import { getAllProducts } from "../../firebase/productService";
import Loader from "../../components/common/Loader";

export default function CoordSets() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getAllProducts();

      const coordSets = data.filter(
        (product) =>
          product.category?.toLowerCase() === "coord-sets"
      );

      setProducts(coordSets);
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
          Co-ord Sets Collection
        </h1>

        <p className="mt-6 text-[#6A625B] max-w-2xl mx-auto">
          Explore stylish co-ord sets designed for effortless elegance,
          comfort, and modern everyday fashion.
        </p>

      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 mt-16">

        {products.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-2xl font-serif text-[#2E2A27]">
              No Co-ord Sets Available
            </h2>

            <p className="mt-4 text-[#6A625B]">
              Products will appear here once added by the admin.
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