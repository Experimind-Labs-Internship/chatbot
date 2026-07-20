import { Link } from "react-router-dom";

import hero from "../../assets/images/hero/hero.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#F8F4EF] overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">
        <img
          src={hero}
          alt="YUMI"
          className="w-full h-full object-cover object-right"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F4EF] via-[#F8F4EF]/90 to-transparent"></div>
      </div>

      {/* Content */}

      <div className="relative z-20 max-w-7xl mx-auto px-8 h-screen flex items-center">

        <div className="max-w-2xl">

          {/* Small Heading */}

          <p className="uppercase tracking-[6px] text-[#B89B72] text-sm mb-5">

            Premium Nightwear

          </p>

          {/* Main Heading */}

          <h1 className="font-serif text-[#232323] leading-none">

            <span className="block text-6xl md:text-7xl">
              Where Comfort
            </span>

            <span className="block mt-3 text-6xl md:text-7xl">

              Meets{" "}

              <span className="italic text-[#C8A26A]">
                Elegance
              </span>

            </span>

          </h1>

          {/* Divider */}

          <div className="flex items-center gap-5 mt-10">

            <div className="w-20 h-[1px] bg-[#C8A26A]"></div>

            <div className="w-3 h-3 rounded-full bg-[#C8A26A]"></div>

            <div className="w-20 h-[1px] bg-[#C8A26A]"></div>

          </div>

          {/* Description */}

          <p className="mt-10 text-lg leading-9 text-[#6A625B] max-w-xl">

            Thoughtfully designed for every woman.

            <br />

            Crafted with love by two sisters who believe
            fashion should feel as beautiful as it looks.

          </p>

          {/* Buttons */}

          <div className="mt-12 flex gap-5">

            <Link 
              to="/shop"
              className="rounded-full bg-[#465348] px-8 py-3 text-white hover:bg-[#39443A] transition"
              >
                Shop Collections
            </Link>

            <a
              href="#our-story"
              className="px-10 py-4 border border-[#2E2A27] rounded-full hover:bg-[#2E2A27] hover:text-white transition"
            >
              Our Story
          </a>

          </div>

          {/* Discover */}

          <div className="mt-16 flex items-center gap-5">

            <button className="w-16 h-16 rounded-full border border-[#B89B72] flex items-center justify-center hover:bg-[#B89B72] hover:text-white transition">

              ▶

            </button>

            <span className="uppercase tracking-[3px] text-sm">

              Discover YUMI

            </span>

          </div>

        </div>

      </div>

      {/* Scroll */}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">

        <div className="w-7 h-12 rounded-full border border-[#B89B72] flex justify-center">

          <div className="w-[3px] h-3 bg-[#B89B72] rounded-full mt-2 animate-bounce"></div>

        </div>

      </div>

    </section>
  );
}