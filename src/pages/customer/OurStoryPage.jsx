import storyImage from "../../assets/images/story/story.png";

export default function OurStoryPage() {
  return (
    <main className="bg-[#FAF8F5] pt-32 pb-24">

      {/* Hero */}

      <section className="max-w-5xl mx-auto px-6 text-center">

        <p className="uppercase tracking-[4px] text-[#B89B72]">
          Our Journey
        </p>

        <h1 className="mt-4 text-5xl font-serif text-[#2E2A27]">
          Crafted with Love by Two Sisters
        </h1>

        <p className="mt-8 text-lg leading-9 text-[#6A625B]">
          Every beautiful journey begins with a dream. Ours began with two
          sisters who believed that fashion should make every woman feel
          comfortable, confident, and effortlessly elegant.
        </p>

      </section>

      {/* Story */}

      <section className="max-w-7xl mx-auto px-6 mt-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <img
              src={storyImage}
              alt="Our Story"
              className="rounded-[32px] shadow-lg w-full h-[650px] object-cover"
            />

          </div>

          <div>

            <h2 className="text-4xl font-serif text-[#2E2A27] mb-8">
              The Beginning
            </h2>

            <p className="text-[#6A625B] leading-9 text-lg">

              YUMI was born from countless conversations between two sisters
              who shared the same passion for fashion, creativity, and timeless
              elegance.

              <br /><br />

              We dreamed of creating a brand where women wouldn't have to choose
              between comfort and style. We wanted every outfit to feel luxurious,
              effortless, and beautiful while remaining practical for everyday life.

              <br /><br />

              What started as a simple idea slowly transformed into a journey of
              selecting premium fabrics, exploring elegant silhouettes, and creating
              collections that celebrate confidence and femininity.

            </p>

          </div>

        </div>

      </section>

      {/* Vision */}

      <section className="max-w-6xl mx-auto px-6 mt-24">

        <div className="bg-white rounded-[32px] p-12 shadow-sm">

          <h2 className="text-4xl font-serif text-center text-[#2E2A27] mb-10">
            Our Vision
          </h2>

          <p className="text-center text-lg leading-9 text-[#6A625B] max-w-4xl mx-auto">

            At YUMI, we believe fashion is more than clothing—it is a reflection
            of confidence, personality, and self-expression. Every collection is
            thoughtfully designed to help women feel beautiful, empowered, and
            comfortable every single day.

            <br /><br />

            We focus on timeless designs rather than temporary trends, ensuring
            that every piece remains elegant season after season.

          </p>

        </div>

      </section>

      {/* Values */}

      <section className="max-w-7xl mx-auto px-6 mt-24">

        <h2 className="text-4xl font-serif text-center text-[#2E2A27] mb-14">
          What Makes YUMI Special
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

            <div className="text-5xl mb-5">🌸</div>

            <h3 className="text-2xl font-serif text-[#2E2A27]">
              Premium Fabrics
            </h3>

            <p className="mt-4 text-[#6A625B]">
              Carefully selected materials that feel soft, breathable,
              and luxurious.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

            <div className="text-5xl mb-5">✨</div>

            <h3 className="text-2xl font-serif text-[#2E2A27]">
              Timeless Style
            </h3>

            <p className="mt-4 text-[#6A625B]">
              Elegant designs created to stay beautiful beyond seasonal trends.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

            <div className="text-5xl mb-5">🤍</div>

            <h3 className="text-2xl font-serif text-[#2E2A27]">
              Crafted with Care
            </h3>

            <p className="mt-4 text-[#6A625B]">
              Every detail is thoughtfully designed with quality,
              comfort, and sophistication in mind.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

            <div className="text-5xl mb-5">❤️</div>

            <h3 className="text-2xl font-serif text-[#2E2A27]">
              Customer First
            </h3>

            <p className="mt-4 text-[#6A625B]">
              Every customer becomes part of our journey, inspiring us to
              continue creating beautiful fashion.
            </p>

          </div>

        </div>

      </section>

      {/* Closing */}

      <section className="max-w-5xl mx-auto px-6 mt-28 text-center">

        <h2 className="text-4xl font-serif text-[#2E2A27]">
          More Than Fashion
        </h2>

        <p className="mt-8 text-lg leading-9 text-[#6A625B]">

          Every order we receive reminds us why we started this journey.
          Every message from our customers inspires us to continue creating
          clothing that brings confidence, comfort, and joy.

          <br /><br />

          When you choose YUMI, you're not simply buying fashion—you become
          part of our family's story, a story built on passion, dedication,
          and the dream of two sisters who believed elegance should always
          feel effortless.

          <br /><br />

          Thank you for being a part of our journey.

        </p>

      </section>

    </main>
  );
}