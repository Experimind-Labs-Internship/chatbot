const posts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e?w=700",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=700",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700",
  },
];

export default function Instagram() {
  return (
    <section className="bg-[#F7F3EE] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-[#C97B7B] font-semibold">
            Follow Our Journey
          </p>

          <h2 className="text-5xl font-serif text-[#1A1A1A] mt-3">
            Yumi on Instagram
          </h2>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            See our latest collections, customer moments, and behind-the-scenes
            stories from the Yumi family.
          </p>

        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {posts.map((post) => (
            <div
              key={post.id}
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
            >

              <img
                src={post.image}
                alt="Instagram Post"
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">

                <span className="opacity-0 group-hover:opacity-100 text-white text-4xl transition">
                  📷
                </span>

              </div>

            </div>
          ))}

        </div>

        {/* Follow Button */}
        <div className="text-center mt-14">

          <a
            href="https://instagram.com/yumi_dxb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1F2A44] hover:bg-[#C97B7B] transition text-white px-8 py-4 rounded-full text-lg"
          >
            Follow @yumi_dxb
          </a>

        </div>

      </div>
    </section>
  );
}