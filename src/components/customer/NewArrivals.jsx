const products = [
  {
    id: 1,
    name: "Iris Garden Robe",
    price: "₹999",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700",
    badge: "NEW",
  },
  {
    id: 2,
    name: "Midnight Bloom Set",
    price: "₹999",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700",
    badge: "NEW",
  },
  {
    id: 3,
    name: "Desert Rose Kaftan",
    price: "₹999",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e?w=700",
    badge: "NEW",
  },
  {
    id: 4,
    name: "Floral Dreams Co-ord",
    price: "₹999",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700",
    badge: "NEW",
  },
];

export default function NewArrivals() {
  return (
    <section className="py-24 bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-[#C97B7B] font-semibold">
            New Collection
          </p>

          <h2 className="text-5xl font-serif text-[#1A1A1A] mt-3">
            Just Arrived
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Thoughtfully designed pieces that blend comfort, elegance,
            and timeless style.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-500"
            >
              {/* Image */}
              <div className="relative overflow-hidden">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-700"
                />

                <span className="absolute top-4 left-4 bg-[#C97B7B] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {product.badge}
                </span>

              </div>

              {/* Details */}
              <div className="p-6">

                <h3 className="text-2xl font-serif text-[#1A1A1A]">
                  {product.name}
                </h3>

                <p className="mt-2 text-[#C97B7B] font-bold text-xl">
                  {product.price}
                </p>

                <div className="mt-3 text-yellow-500">
                  ★★★★★
                  <span className="text-gray-500 text-sm ml-2">
                    (4.9)
                  </span>
                </div>

                <button className="mt-6 w-full bg-[#1F2A44] text-white py-3 rounded-full hover:bg-[#C97B7B] transition">
                  Shop Now
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* Button */}
        <div className="text-center mt-14">

          <button className="bg-[#C97B7B] hover:bg-[#b66b6b] transition text-white px-8 py-4 rounded-full">
            View All New Arrivals
          </button>

        </div>

      </div>
    </section>
  );
}