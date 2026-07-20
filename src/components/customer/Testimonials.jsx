import SectionTitle from "../common/SectionTitle";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Bengaluru",
    review:
      "The fabric feels incredibly soft and luxurious. YUMI has become my favourite nightwear brand. Every piece is beautiful and comfortable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Aisha Khan",
    location: "Dubai",
    review:
      "Absolutely elegant! The quality exceeded my expectations and the fit was perfect. I received so many compliments.",
    rating: 5,
  },
  {
    id: 3,
    name: "Megha Rao",
    location: "Mangaluru",
    review:
      "Beautiful designs with premium quality. You can truly feel the care and attention behind every collection.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#FAF8F5]">

      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          subtitle="Client Whispers"
          title="What Our Customers Say"
          description="Real stories from women who chose comfort, elegance, and timeless style."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-[30px] p-8 shadow-sm hover:shadow-xl transition duration-500"
            >

              {/* Stars */}

              <div className="text-[#B89B72] text-xl mb-6">

                {"★".repeat(item.rating)}

              </div>

              {/* Review */}

              <p className="text-[#6A625B] leading-8 italic">

                "{item.review}"

              </p>

              {/* User */}

              <div className="flex items-center mt-8">

                <div className="w-14 h-14 rounded-full bg-[#465348] text-white flex items-center justify-center text-lg font-semibold">

                  {item.name.charAt(0)}

                </div>

                <div className="ml-4">

                  <h4 className="font-semibold text-[#2E2A27]">

                    {item.name}

                  </h4>

                  <p className="text-sm text-[#8A8178]">

                    {item.location}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}