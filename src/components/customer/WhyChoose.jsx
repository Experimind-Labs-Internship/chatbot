const features = [
  {
    id: 1,
    icon: "🌸",
    title: "Premium Quality",
    description:
      "Every fabric is carefully selected to provide unmatched comfort, softness, and lasting quality.",
  },
  {
    id: 2,
    icon: "💖",
    title: "Thoughtfully Designed",
    description:
      "Elegant designs created to make every woman feel confident, comfortable, and beautiful every day.",
  },
  {
    id: 3,
    icon: "✨",
    title: "Made With Love",
    description:
      "Every YUMI piece is crafted with care by two sisters who believe in quality, elegance, and attention to detail.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-[#C97B7B] font-semibold">
            Why Choose YUMI
          </p>

          <h2 className="text-5xl font-serif text-[#1A1A1A] mt-4">
            Crafted With Love,
            <br />
            Designed For You
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
            Every piece at YUMI is thoughtfully designed to bring together
            comfort, elegance, and timeless beauty—because you deserve to feel
            special every single day.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">

          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#F7F3EE] rounded-3xl p-10 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <div className="text-6xl mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-8">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}