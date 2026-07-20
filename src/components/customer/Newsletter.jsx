export default function Newsletter() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">

        <div className="bg-[#F7F3EE] rounded-3xl p-12 shadow-lg text-center">

          <p className="uppercase tracking-[4px] text-[#C97B7B] font-semibold">
            Stay Connected
          </p>

          <h2 className="text-5xl font-serif text-[#1A1A1A] mt-4">
            Join the Yumi Family
          </h2>

          <p className="mt-6 text-gray-600 text-lg leading-8">
            Be the first to know about our latest collections,
            exclusive offers, behind-the-scenes stories, and
            enjoy <span className="font-semibold">10% OFF</span>
            on your first order with code
            <span className="text-[#C97B7B] font-bold">
              {" "}WELCOME10
            </span>.
          </p>

          {/* Newsletter Form */}

          <form className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full border border-gray-300 outline-none focus:border-[#C97B7B]"
            />

            <button
              type="submit"
              className="bg-[#1F2A44] hover:bg-[#C97B7B] transition text-white px-10 py-4 rounded-full"
            >
              Subscribe
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-6">
            We respect your inbox. Unsubscribe anytime.
          </p>

        </div>

      </div>
    </section>
  );
}