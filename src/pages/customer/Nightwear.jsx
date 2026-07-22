import { useEffect, useState } from "react";
import { getAllProducts } from "../../firebase/productService";
import ProductCard from "../../components/customer/ProductCard";

export default function Nightwear() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getAllProducts();

    const nightwear = data.filter(
      (product) =>
        product.category?.toLowerCase() === "nightwear"
    );

    setProducts(nightwear);
  }

  return (
    <main className="bg-[#FAF8F5] pt-32 pb-24">

      <section className="max-w-7xl mx-auto px-6 text-center">

        <p className="uppercase tracking-[5px] text-[#B89B72]">
          YUMI DXB Fashion
        </p>

        <h1 className="mt-4 text-5xl font-serif text-[#2E2A27]">
          Nightwear Collection
        </h1>

        <p className="mt-5 text-[#6A625B]">
          Elegant and comfortable nightwear designed for everyday luxury.
        </p>

      </section>

      <section className="max-w-7xl mx-auto px-6 mt-16">

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

      </section>

    </main>
  );
}