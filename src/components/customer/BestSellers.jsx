const bestSellers = [
  {
    id: 1,
    name: "Midnight Bloom Set",
    price: "₹999",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
    rating: 4.9,
    reviews: 82,
  },
  {
    id: 2,
    name: "Iris Garden Robe",
    price: "₹999",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600",
    rating: 4.8,
    reviews: 74,
  },
  {
    id: 3,
    name: "Desert Rose Kaftan",
    price: "₹999",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
    rating: 5.0,
    reviews: 95,
  },
  {
    id: 4,
    name: "Floral Dreams Co-ord",
    price: "₹999",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
    rating: 4.9,
    reviews: 69,
  },
];

export default function BestSellers() {
  return (
    <section className="bg-[#F7F3EE] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-[#C97B7B] font-semibold">
            Customer Favorites
          </p>

          <h2 className="text-5xl font-serif text-[#1A1A1A] mt-3">
            Loved by Women Like You
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Our most-loved pieces, chosen and cherished by our customers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {bestSellers.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
                />

                <span className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  ★ Best Seller
                </span>

              </div>

              {/* Content */}
              <div className="p-5">

                <h3 className="text-xl font-semibold text-[#1A1A1A]">
                  {item.name}
                </h3>

                <p className="text-[#C97B7B] font-bold text-xl mt-2">
                  {item.price}
                </p>

                <p className="mt-2 text-gray-500 text-sm">
                  ⭐ {item.rating} ({item.reviews} Reviews)
                </p>

                <button className="mt-5 w-full bg-[#1F2A44] hover:bg-[#C97B7B] transition text-white py-3 rounded-full">
                  Shop Now
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button className="bg-[#C97B7B] hover:bg-[#b46868] transition text-white px-8 py-3 rounded-full">
            Shop Best Sellers
          </button>
        </div>

      </div>
    </section>
  );
}