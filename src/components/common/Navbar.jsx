import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#1F2A44] text-white text-sm text-center py-2">
        🚚 Free Shipping on Orders Above ₹1500 | 📞 9591308536
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#F7F3EE]/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

          {/* Logo */}
          <h1 className="text-3xl font-serif font-bold tracking-wide text-[#C97B7B] cursor-pointer">
            YUMI
          </h1>

          {/* Menu */}
          <ul className="hidden md:flex items-center gap-10 text-[#1A1A1A] font-medium">

            <li className="hover:text-[#C97B7B] cursor-pointer transition">
              Home
            </li>

            <li className="relative group cursor-pointer">
              <span className="hover:text-[#C97B7B] transition">
                Shop ▾
              </span>

              <div className="absolute left-0 mt-4 hidden group-hover:block bg-white shadow-xl rounded-xl w-56 p-3">

                <p className="py-2 hover:text-[#C97B7B] cursor-pointer">
                  All Products
                </p>

                <p className="py-2 hover:text-[#C97B7B] cursor-pointer">
                  Nightwear
                </p>

                <p className="py-2 hover:text-[#C97B7B] cursor-pointer">
                  Abayas
                </p>

                <p className="py-2 hover:text-[#C97B7B] cursor-pointer">
                  Kaftans
                </p>

                <p className="py-2 hover:text-[#C97B7B] cursor-pointer">
                  Co-ord Sets
                </p>

                <p className="py-2 hover:text-[#C97B7B] cursor-pointer">
                  New Arrivals
                </p>

                <p className="py-2 hover:text-[#C97B7B] cursor-pointer">
                  Best Sellers
                </p>

              </div>
            </li>

            <li className="hover:text-[#C97B7B] cursor-pointer transition">
              Our Story
            </li>

            <li className="hover:text-[#C97B7B] cursor-pointer transition">
              Contact
            </li>

          </ul>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-6">

            <Search
              className="cursor-pointer hover:text-[#C97B7B]"
              size={22}
            />

            <User
              className="cursor-pointer hover:text-[#C97B7B]"
              size={22}
            />

            <div className="relative">
              <Heart
                className="cursor-pointer hover:text-[#C97B7B]"
                size={22}
              />
              <span className="absolute -top-2 -right-2 bg-[#C97B7B] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </div>

            <div className="relative">
              <ShoppingCart
                className="cursor-pointer hover:text-[#C97B7B]"
                size={22}
              />
              <span className="absolute -top-2 -right-2 bg-[#C97B7B] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </div>

          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">

            <Search size={22} />

            <ShoppingCart size={22} />

            <Menu size={28} />

          </div>

        </div>
      </nav>
    </>
  );
}