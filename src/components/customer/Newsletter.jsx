import { FiMail } from "react-icons/fi";

export default function Newsletter() {
  return (
    <section className="py-24 bg-[#F8F4EF]">

      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white rounded-[40px] shadow-sm p-12 md:p-16 text-center">

          {/* Small Title */}

          <p className="uppercase tracking-[4px] text-[#B89B72] text-sm mb-4">

            Join Our Family

          </p>

          {/* Main Title */}

          <h2 className="font-serif text-4xl md:text-5xl text-[#2E2A27]">

            Stay Inspired with YUMI

          </h2>

          {/* Description */}

          <p className="mt-6 text-[#6A625B] leading-8 max-w-2xl mx-auto">

            Be the first to discover new collections,
            exclusive offers, styling inspiration, and
            timeless pieces designed with love.

          </p>

          {/* Newsletter Form */}

          <form className="mt-12 max-w-2xl mx-auto">

            <div className="flex flex-col md:flex-row gap-4">

              <div className="relative flex-1">

                <FiMail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B89B72]"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-14 pr-5 py-4 rounded-full border border-[#E5DED5] focus:outline-none focus:border-[#B89B72] transition"
                />

              </div>

              <button
                type="submit"
                className="px-10 py-4 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition"
              >
                Subscribe
              </button>

            </div>

          </form>

          {/* Footer Text */}

          <p className="mt-8 text-sm text-[#8C847B]">

            We respect your inbox. No spam, only beautiful updates.

          </p>

        </div>

      </div>

    </section>
  );
}