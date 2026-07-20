import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";

import storyImage from "../../assets/images/story/story.png";

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="py-24 bg-[#FAF8F5]"
    >

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}

          <div className="overflow-hidden rounded-[32px]">

            <img
              src={storyImage}
              alt="Our Story"
              className="w-full h-[650px] object-cover hover:scale-105 transition duration-700"
            />

          </div>

          {/* Content */}

          <div>

            <SectionTitle
              subtitle="Our Story"
              title="Crafted with Love by Two Sisters"
              center={false}
            />

            <p className="text-[#6A625B] leading-9 text-lg">

              Every beautiful journey begins with a dream.

              <br /><br />

              YUMI was born from the shared passion of two sisters
              who believed that fashion should feel as beautiful
              as it looks. We wanted every woman to experience
              comfort, confidence, and timeless elegance in every
              piece she wears.

              <br /><br />

              Every fabric is thoughtfully selected. Every design
              is carefully curated. Every collection reflects our
              belief that true luxury lies in simplicity,
              quality, and attention to detail.

              <br /><br />

              When you choose YUMI, you're not just purchasing
              clothing—you become a part of our story.

            </p>

            {/* Features */}

            <div className="grid grid-cols-2 gap-8 mt-12">

              <div>

                <h3 className="text-4xl font-serif text-[#B89B72]">
                  100%
                </h3>

                <p className="mt-2 text-[#6A625B]">
                  Premium Quality
                </p>

              </div>

              <div>

                <h3 className="text-4xl font-serif text-[#B89B72]">
                  2024
                </h3>

                <p className="mt-2 text-[#6A625B]">
                  Founded with Love
                </p>

              </div>

              <div>

                <h3 className="text-4xl font-serif text-[#B89B72]">
                  500+
                </h3>

                <p className="mt-2 text-[#6A625B]">
                  Happy Customers
                </p>

              </div>

              <div>

                <h3 className="text-4xl font-serif text-[#B89B72]">
                  4.9★
                </h3>

                <p className="mt-2 text-[#6A625B]">
                  Customer Rating
                </p>

              </div>

            </div>

            {/* Button */}

            <Link
              to="/about"
              className="inline-block mt-14 px-8 py-4 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition"
            >
              Read Our Story
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}