import { useState } from "react";
import { Link } from "react-router-dom";
import { subscribeToNewsletter } from "../../firebase/newsletterService";
import {
  FiInstagram,
  FiFacebook,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

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
                <span>+91 9591308536</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMail />
                <span>hello@yumidxb.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMapPin />
                <span>Mangaluru, India</span>
              </div>

            </div>

            {/* Social */}

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-[#C3A274] hover:border-[#C3A274] transition"
              >
                <FiInstagram />
              </a>


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