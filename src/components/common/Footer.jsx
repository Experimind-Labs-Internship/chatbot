export default function Footer() {
  return (
    <footer className="bg-[#F7F3EE] text-[#1A1A1A]">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* About */}
          <div>
            <h3 className="text-2xl font-serif mb-5">YUMI</h3>

            <p className="text-gray-600 leading-7">
              Yumi DXB Fashion is where comfort meets elegance.
              Founded by two sisters, we create premium nightwear,
              abayas and kaftans that make every woman feel
              beautiful, comfortable and confident.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Shop
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-[#C97B7B] cursor-pointer">
                All Products
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Nightwear
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Abayas
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Kaftans
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Co-ord Sets
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                New Arrivals
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Best Sellers
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Customer Care
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-[#C97B7B] cursor-pointer">
                FAQs
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Size Guide
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Shipping & Delivery
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Returns & Exchanges
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Care Instructions
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Track Order
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Contact Us
              </li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              My Account
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Login / Sign Up
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                My Orders
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Wishlist
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                My Profile
              </li>
              <li className="hover:text-[#C97B7B] cursor-pointer">
                Address Book
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Stay Connected
            </h3>

            <div className="space-y-4 text-gray-600">

              <p>📞 +91 9591308536</p>

              <p>📧 hello@yumidxb.com</p>

              <p>📍 Mangaluru, India</p>

              <p>📷 @yumi_dxb</p>

            </div>

            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:bg-[#C97B7B] hover:text-white transition"
              >
                📷
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:bg-[#C97B7B] hover:text-white transition"
              >
                💬
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:bg-[#C97B7B] hover:text-white transition"
              >
                👍
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Trust Badges */}

      <div className="border-t border-gray-300">

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row justify-between items-center gap-6">

          <div className="flex flex-wrap gap-6 text-gray-600 text-sm">

            <span>🔒 Secure Checkout</span>

            <span>✔ 100% Authentic Products</span>

            <span>↩ Easy Returns</span>

          </div>

          <div className="flex gap-4 text-2xl">

            <span>💳</span>

            <span>🏦</span>

            <span>📱</span>

            <span>💵</span>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-300">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-gray-600">

          <p>
            © 2026 YUMI DXB Fashion. All Rights Reserved.
          </p>

          <p className="italic">
            Crafted with ❤️ in Mangaluru, India
          </p>

          <div className="flex gap-6">

            <a href="#" className="hover:text-[#C97B7B]">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-[#C97B7B]">
              Terms
            </a>

            <a href="#" className="hover:text-[#C97B7B]">
              Refund Policy
            </a>

            <a href="#" className="hover:text-[#C97B7B]">
              Shipping Policy
            </a>

          </div>

        </div>

      </div>

      {/* Back To Top */}

      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="fixed bottom-6 right-6 bg-[#1F2A44] hover:bg-[#C97B7B] text-white w-12 h-12 rounded-full shadow-lg transition"
      >
        ↑
      </button>

    </footer>
  );
}