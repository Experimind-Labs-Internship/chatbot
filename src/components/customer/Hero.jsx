export default function Hero() {
  return (
    <section className="relative h-screen">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600"
        alt="YUMI Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">

        <div className="max-w-7xl mx-auto px-6 w-full">

          <div className="max-w-2xl text-white">

            <p className="uppercase tracking-[6px] text-[#F7F3EE] font-medium mb-5">
              Premium Nightwear & Lifestyle
            </p>

            <h1 className="text-6xl md:text-7xl font-serif leading-tight">
              Where Comfort
              <br />
              Meets
              <span className="text-[#C97B7B]"> Elegance</span>
            </h1>

            <p className="mt-8 text-lg leading-8 text-gray-200">
              Thoughtfully crafted nightwear, abayas, kaftans and co-ord sets
              designed by two sisters who believe every woman deserves comfort,
              confidence and timeless elegance.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <button className="bg-[#1F2A44] hover:bg-[#C97B7B] transition px-8 py-4 rounded-full text-lg font-medium">
                Shop Now
              </button>

              <button className="border border-white hover:bg-white hover:text-[#1A1A1A] transition px-8 py-4 rounded-full text-lg font-medium">
                Our Story
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">

        <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center">

          <div className="w-1.5 h-3 bg-white rounded-full mt-3"></div>

        </div>

      </div>

    </section>
  );
}