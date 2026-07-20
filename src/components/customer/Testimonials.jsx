const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    city: "Bengaluru",
    product: "Iris Garden Robe",
    review:
      "The fabric is incredibly soft and breathable. I feel elegant even while relaxing at home. Absolutely loved the quality!",
    rating: "★★★★★",
  },
  {
    id: 2,
    name: "Anjali M.",
    city: "Mumbai",
    product: "Midnight Bloom Set",
    review:
      "Beautiful packaging, premium quality and exactly as shown. This has become my favourite nightwear set.",
    rating: "★★★★★",
  },
  {
    id: 3,
    name: "Kavya R.",
    city: "Delhi",
    product: "Desert Rose Kaftan",
    review:
      "Comfortable, stylish and worth every rupee. The attention to detail is amazing. Highly recommended!",
    rating: "★★★★★",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F7F3EE] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-[#C97B7B] font-semibold">
            Client Whispers
          </p>

          <h2 className="text-5xl font-serif text-[#1A1A1A] mt-4">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Every review inspires us to create with even more love and care.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
            >

              <div className="text-yellow-500 text-xl mb-5">
                {item.rating}
              </div>

              <p className="text-gray-600 leading-8 italic">
                "{item.review}"
              </p>

              <div className="mt-8 border-t pt-6">

                <h3 className="font-semibold text-xl text-[#1A1A1A]">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {item.city}
                </p>

                <p className="mt-2 text-[#C97B7B] text-sm font-medium">
                  Purchased: {item.product}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* Button */}

        <div className="text-center mt-14">

          <button className="bg-[#1F2A44] hover:bg-[#C97B7B] transition text-white px-8 py-4 rounded-full">
            Read More Reviews
          </button>

        </div>

      </div>
    </section>
  );
}