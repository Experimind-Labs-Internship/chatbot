export default function OurStory() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="overflow-hidden rounded-3xl shadow-xl">

            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e?w=1000"
              alt="The Yumi Sisters"
              className="w-full h-[550px] object-cover hover:scale-105 transition duration-700"
            />

          </div>

          {/* Content */}
          <div>

            <p className="uppercase tracking-[4px] text-[#C97B7B] font-semibold">
              The Yumi Story
            </p>

            <h2 className="text-5xl font-serif text-[#1A1A1A] mt-4 leading-tight">
              Two Sisters.
              <br />
              One Beautiful Dream.
            </h2>

            <p className="mt-8 text-gray-600 text-lg leading-8">
              Every beautiful journey begins with a dream.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              We are two sisters who transformed our love for fashion into
              <span className="font-semibold text-[#1A1A1A]">
                {" "}YUMI
              </span>
              — a brand built on comfort, elegance and thoughtful
              craftsmanship.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              As homemakers ourselves, we understand what women truly
              need: clothing that feels just as beautiful as it looks.
              Every fabric, every stitch and every design is carefully
              selected with love.
            </p>

            <div className="border-l-4 border-[#C97B7B] pl-6 my-8">

              <h3 className="text-2xl font-serif italic text-[#1A1A1A]">
                "Would we proudly choose this for our own family?"
              </h3>

            </div>

            <p className="text-gray-600 leading-8">
              If the answer isn't a wholehearted yes, it never becomes
              part of YUMI. Our mission is simple—to help every woman
              feel comfortable, confident and elegant every single day.
            </p>

            <button className="mt-10 bg-[#1F2A44] hover:bg-[#C97B7B] transition text-white px-8 py-4 rounded-full">
              Read Our Full Story
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}