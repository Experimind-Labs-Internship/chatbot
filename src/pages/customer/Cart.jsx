import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingBag,
} from "react-icons/fi";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update Navbar Badge
    window.dispatchEvent(new Event("storage"));
  };

  const increaseQuantity = (id) => {
    const updated = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    saveCart(updated);
  };

  const decreaseQuantity = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter(
      (item) => item.id !== id
    );

    saveCart(updated);
  };

  const subtotal = cart.reduce((total, item) => {
    return (
      total +
      Number(item.price.replace(/[₹,]/g, "")) *
        item.quantity
    );
  }, 0);

const total = Math.max(subtotal - discount, 0);

  const applyCoupon = () => {
    if (coupon === "WELCOME10") {
      setDiscount(subtotal * 0.1);
      alert("Coupon Applied!");
    } else {
      setDiscount(0);
      alert("Invalid Coupon");
    }
  };

  if (cart.length === 0) {
    return (
      <main className="bg-[#FAF8F5] min-h-screen pt-28">

        <div className="max-w-3xl mx-auto text-center">

          <FiShoppingBag className="mx-auto text-7xl text-[#B89B72]" />

          <h1 className="mt-8 text-5xl font-serif text-[#2E2A27]">
            Your Cart is Empty
          </h1>

          <p className="mt-5 text-[#6A625B]">
            Looks like you haven't added any
            products yet.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-10 px-8 py-4 rounded-full bg-[#465348] text-white hover:bg-[#39443A]"
          >
            Continue Shopping
          </Link>

        </div>

      </main>
    );
  }
    return (
    <main className="bg-[#FAF8F5] min-h-screen pt-28 pb-24">

      <section className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-serif text-[#2E2A27] mb-12">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-sm p-6 flex gap-6 items-center"
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-40 object-cover rounded-2xl"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-serif text-[#2E2A27]">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-[#B89B72] text-xl font-semibold">
                    {item.price}
                  </p>

                  {/* Quantity */}

                  <div className="flex items-center gap-4 mt-6">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-10 h-10 rounded-full border hover:bg-[#465348] hover:text-white transition"
                    >
                      <FiMinus />
                    </button>

                    <span className="text-lg font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-10 h-10 rounded-full border hover:bg-[#465348] hover:text-white transition"
                    >
                      <FiPlus />
                    </button>

                  </div>

                </div>

                {/* Remove */}

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FiTrash2 size={22} />
                </button>

              </div>

            ))}

          </div>

          {/* Order Summary */}

          <div className="bg-white rounded-3xl shadow-sm p-8 h-fit">

            <h2 className="text-3xl font-serif text-[#2E2A27]">
              Order Summary
            </h2>
                        {/* Coupon */}

            <div className="mt-8">

              <label className="block mb-3 text-[#2E2A27] font-medium">
                Coupon Code
              </label>

              <div className="flex gap-3">

                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon"
                  className="flex-1 border border-[#E5DED7] rounded-xl px-4 py-3 outline-none focus:border-[#465348]"
                />

                <button
                  onClick={applyCoupon}
                  className="px-5 rounded-xl bg-[#465348] text-white hover:bg-[#39443A] transition"
                >
                  Apply
                </button>

              </div>

            </div>

            {/* Price Summary */}

            <div className="mt-10 space-y-4">

              <div className="flex justify-between text-[#6A625B]">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-[#6A625B]">
                <span>Discount</span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-[#6A625B]">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-semibold text-[#2E2A27]">

                <span>Total</span>

                <span>
                  ₹{total.toLocaleString()}
                </span>

              </div>

            </div>

            {/* Buttons */}

           <Link
  to="/checkout"
  className="block w-full mt-10 py-4 rounded-full bg-[#465348] text-white text-center hover:bg-[#39443A] transition"
>
  Proceed to Checkout
</Link>

            <Link
              to="/shop"
              className="block text-center mt-5 text-[#465348] hover:underline"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}