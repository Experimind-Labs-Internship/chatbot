import { useState } from "react";
import {
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiMail,
} from "react-icons/fi";

export default function Contact() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessageSent(true);

    e.target.reset();

    setTimeout(() => {
      setMessageSent(false);
    }, 3000);
  };

  return (
    <main className="bg-[#FAF8F5] min-h-screen pt-24">
      {/* Hero */}

      <section className="text-center py-20 px-6">
        <p className="uppercase tracking-[4px] text-sm text-[#B89B72]">
          Get In Touch
        </p>

        <h1 className="mt-4 text-5xl md:text-6xl font-serif text-[#2E2A27]">
          Contact Us
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-[#6A625B] text-lg leading-8">
          We'd love to hear from you. Whether you have a question about our
          collections, your order, or simply want to connect, we're always
          here to help.
        </p>
      </section>

      {/* Contact Section */}

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}

          <div className="bg-white rounded-3xl shadow-sm p-10">
            <h2 className="text-3xl font-serif text-[#2E2A27]">
              Send us a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full rounded-xl border border-[#E5DED7] px-5 py-4 outline-none focus:border-[#B89B72]"
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full rounded-xl border border-[#E5DED7] px-5 py-4 outline-none focus:border-[#B89B72]"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full rounded-xl border border-[#E5DED7] px-5 py-4 outline-none focus:border-[#B89B72]"
              />

              <textarea
                rows="6"
                placeholder="Your Message"
                required
                className="w-full rounded-xl border border-[#E5DED7] px-5 py-4 outline-none resize-none focus:border-[#B89B72]"
              ></textarea>

              {messageSent && (
                <div className="rounded-xl bg-green-100 border border-green-300 text-green-700 px-5 py-4">
                  ✅ Thank you! Your message has been sent successfully.
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#465348] text-white py-4 rounded-full hover:bg-[#39443A] transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}

          <div className="bg-[#F5F1EC] rounded-3xl p-10">
            <h2 className="text-3xl font-serif text-[#2E2A27]">
              Contact Information
            </h2>

            <p className="mt-4 text-[#6A625B] leading-8">
              Reach out to us through any of the following channels.
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex gap-5">
                <FiPhone className="text-[#B89B72] text-2xl mt-1" />

                <div>
                  <h3 className="font-semibold text-[#2E2A27]">
                    Phone
                  </h3>

                  <p className="text-[#6A625B]">
                    +91 9591308536
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <FiInstagram className="text-[#B89B72] text-2xl mt-1" />

                <div>
                  <h3 className="font-semibold text-[#2E2A27]">
                    Instagram
                  </h3>

                  <a
                    href="https://www.instagram.com/yumi_dxb"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#6A625B] hover:text-[#B89B72]"
                  >
                    @yumi_dxb
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <FiMapPin className="text-[#B89B72] text-2xl mt-1" />

                <div>
                  <h3 className="font-semibold text-[#2E2A27]">
                    Address
                  </h3>

                  <p className="text-[#6A625B]">
                    Mangaluru,
                    <br />
                    Karnataka, India
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <FiMail className="text-[#B89B72] text-2xl mt-1" />

                <div>
                  <h3 className="font-semibold text-[#2E2A27]">
                    Email Support
                  </h3>

                  <p className="text-[#6A625B]">
                    We usually respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-white border border-[#E5DED7]">
              <h3 className="text-xl font-serif text-[#2E2A27]">
                We're Here For You
              </h3>

              <p className="mt-3 text-[#6A625B] leading-7">
                Whether you're looking for the perfect outfit, have questions
                about your order, or simply want styling assistance, our team
                is always happy to help.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}