const collections = [
  {
    id: 1,
    title: "Nightwear",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    description: "Soft, elegant and comfortable pieces for every night.",
  },
  {
    id: 2,
    title: "Abayas",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e?w=800",
    description: "Graceful designs with timeless elegance.",
  },
  {
    id: 3,
    title: "Kaftans",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    description: "Flowing silhouettes crafted for effortless beauty.",
  },
  {
    id: 4,
    title: "Co-ord Sets",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    description: "Modern matching sets made for everyday elegance.",
  },
];

export default function Collections() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-[#C97B7B] font-semibold">
            Explore
          </p>

          <h2 className="text-5xl font-serif text-[#1A1A1A] mt-3">
            Shop by Collection
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Find the perfect style for every beautiful moment.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {collections.map((collection) => (
            <div
              key={collection.id}
              className="relative rounded-3xl overflow-hidden group shadow-lg cursor-pointer"
            >
              {/* Image */}
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-[420px] object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition"></div>

              {/* Text */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">

                <h3 className="text-4xl font-serif mb-3">
                  {collection.title}
                </h3>

                <p className="text-gray-200 mb-6">
                  {collection.description}
                </p>

                <button className="w-fit bg-white text-[#1A1A1A] px-6 py-3 rounded-full hover:bg-[#C97B7B] hover:text-white transition">
                  Shop Collection
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}