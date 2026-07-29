import { useState } from "react";
import { Link } from "react-router-dom";
import { subscribeToNewsletter } from "../../firebase/newsletterService";
import {
  FiInstagram,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);

const handleSubscribe = async () => {
  if (!email.trim()) {
    alert("Please enter your email.");
    return;
  }

  try {
    setLoading(true);

    await subscribeToNewsletter(email);

    alert("Subscribed successfully!");

    setEmail("");
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <footer className="bg-[#22201D] text-white">

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}

          <div>

            <h2 className="text-4xl font-serif mb-6">
              YUMI
            </h2>

            <p className="text-gray-300 leading-8">
              Where comfort meets elegance.
              Crafted with love by two sisters,
              bringing timeless fashion to every woman.
            </p>

          </div>

          {/* About */}

          <div>

            <h3 className="font-semibold text-lg mb-6">
              About
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li>
                <Link to="/our-story" className="hover:text-[#C3A274] transition">
                  Our Story
                </Link>
              </li>

              <li>
                <Link to="/our-story" className="hover:text-[#C3A274] transition">
                  Why Choose YUMI
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-[#C3A274] transition">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Shop */}

          <div>

            <h3 className="font-semibold text-lg mb-6">
              Shop
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/nightwear">Nightwear</Link></li>
              <li><Link to="/abayas">Abayas</Link></li>
              <li><Link to="/kaftans">Kaftans</Link></li>
              <li><Link to="/coord-sets">Co-ord Sets</Link></li>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>

            </ul>

          </div>

          {/* Customer Care */}

          <div>

            <h3 className="font-semibold text-lg mb-6">
              Customer Care
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold text-lg mb-6">
              Stay Connected
            </h3>

            <div className="space-y-5 text-gray-300">

              <div className="flex items-center gap-3">
                <FiPhone />
                <a
                  href="tel:+919591308536"
                  className="hover:text-[#C3A274] transition"
                >
                  +91 9591308536
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FiMail />
                <a
                  href="mailto:yumidxb@gmail.com"
                  className="hover:text-[#C3A274] transition"
                >
                  yumidxb@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FiMapPin />
                <a
                  href="https://maps.google.com/?q=Mangaluru,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C3A274] transition"
                >
                  Mangaluru, India
                </a>
              </div>

            </div>

           {/* Social */}

<div className="mt-8">

  <p className="text-gray-400 mb-3 text-sm font-medium">
    Follow Us
  </p>

  <div className="flex gap-4">

    <a
      href="https://www.instagram.com/yumi_dxb"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="w-11 h-11 rounded-full border border-gray-500 flex items-center justify-center hover:bg-[#C3A274] hover:border-[#C3A274] hover:text-[#22201D] hover:-translate-y-1 transition-all duration-300"
    >
      <FiInstagram size={20} />
    </a>

    <a
      href="https://wa.me/919591308536"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="w-11 h-11 rounded-full border border-gray-500 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:-translate-y-1 transition-all duration-300"
    >
      <FaWhatsapp size={20} />
    </a>

    <a
      href="mailto:care.yumidxb@gmail.com"
      aria-label="Email"
      className="w-11 h-11 rounded-full border border-gray-500 flex items-center justify-center hover:bg-[#465348] hover:border-[#465348] hover:-translate-y-1 transition-all duration-300"
    >
      <FiMail size={20} />
    </a>

  </div>

</div>

          </div>

        </div>

      </div>

      {/* Newsletter */}

      <div className="border-t border-gray-700">

        <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">

          <div>

            <h3 className="text-3xl font-serif">
              Join the YUMI Family
            </h3>

            <p className="text-gray-400 mt-3">
              Get exclusive offers and new arrivals directly to your inbox.
            </p>

          </div>

          <div className="flex w-full lg:w-auto">

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-gray-600 px-5 py-3 rounded-l-full w-full lg:w-80 outline-none"
            />

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-[#465348] hover:bg-[#39443A] px-8 rounded-r-full transition disabled:opacity-60"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-700">

        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">

          <p>
            © 2026 YUMI DXB Fashion. All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>

            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link to="/shipping" className="hover:text-white">
              Shipping
            </Link>

            <Link to="/returns" className="hover:text-white">
              Returns
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}