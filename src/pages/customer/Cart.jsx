import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiTag } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { validateCoupon } from "../../firebase/couponService";
import Button from "../../components/common/Button";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [checkingCoupon, setCheckingCoupon] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCheckingCoupon(true);
    setCouponError("");

    const coupon = await validateCoupon(couponCode);

    if (!coupon) {
      setCouponError("Invalid or expired coupon.");
      setAppliedCoupon(null);
    } else {
      setAppliedCoupon(coupon);
    }

    setCheckingCoupon(false);
  };

  const discount = appliedCoupon
    ? appliedCoupon.discountPercent
      ? (subtotal * appliedCoupon.discountPercent) / 100
      : appliedCoupon.discountFlat || 0
    : 0;

  const total = Math.max(subtotal - discount, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-serif text-[#2E2A27] mb-4">Your Bag is Empty</h1>
        <p className="text-[#6F6A65] mb-8">Looks like you haven't added anything yet.</p>
        <Button to="/shop">Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif text-[#2E2A27] mb-10">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex gap-5 bg-white rounded-2xl border border-[#ECE8E3] p-5"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-xl object-cover bg-[#F4F0EB]"
              />

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-[#2E2A27]">{item.name}</h3>
                    <p className="text-sm text-[#8A8178] mt-1">Size: {item.size}</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="text-[#8A8178] hover:text-red-600 transition h-fit"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3 border border-[#ECE8E3] rounded-full px-3 py-1.5">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity - 1)
                      }
                      className="text-[#6F6A65] hover:text-[#2E2A27]"
                    >
                      <FiMinus size={14} />
                    </button>

                    <span className="w-6 text-center text-sm">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity + 1)
                      }
                      className="text-[#6F6A65] hover:text-[#2E2A27]"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  <p className="font-medium text-[#2E2A27]">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6 h-fit">
          <h2 className="text-xl font-serif text-[#2E2A27] mb-6">Order Summary</h2>

          <div className="mb-6">
            <label className="text-sm text-[#6F6A65] mb-2 flex items-center gap-2">
              <FiTag size={14} /> Coupon Code
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter code"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348] text-sm"
              />
              <button
                onClick={handleApplyCoupon}
                disabled={checkingCoupon}
                className="px-5 py-2.5 rounded-xl bg-[#2E2A27] text-white text-sm hover:bg-black transition disabled:opacity-60"
              >
                Apply
              </button>
            </div>

            {couponError && <p className="text-xs text-red-600 mt-2">{couponError}</p>}
            {appliedCoupon && (
              <p className="text-xs text-green-700 mt-2">
                "{appliedCoupon.code}" applied ✓
              </p>
            )}
          </div>

          <div className="space-y-3 text-sm border-t border-[#ECE8E3] pt-4">
            <div className="flex justify-between text-[#6F6A65]">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Discount</span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-medium text-[#2E2A27] pt-3 border-t border-[#ECE8E3]">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout", { state: { appliedCoupon, discount, total } })}
            className="w-full mt-6 py-3.5 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition"
          >
            Proceed to Checkout
          </button>

          <Link
            to="/shop"
            className="block text-center mt-4 text-sm text-[#6F6A65] hover:text-[#2E2A27]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}