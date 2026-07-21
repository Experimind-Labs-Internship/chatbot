import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { auth } from "../../firebase/firebase";
import { createOrder } from "../../firebase/orderService";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { state } = useLocation();
  const navigate = useNavigate();

  const discount = state?.discount || 0;
  const total = state?.total ?? subtotal;
  const couponCode = state?.appliedCoupon?.code || null;

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [guestEmail, setGuestEmail] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const user = auth.currentUser;

  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!user && !guestEmail.trim()) {
      setError("Please enter an email to continue as guest, or log in.");
      return;
    }

    setPlacing(true);

    try {
      // ───────────────────────────────────────────────
      // PAYMENT STEP — placeholder for now.
      // Real Razorpay integration needs a Cloud Function that:
      //   1. Creates a Razorpay order server-side (secret key lives there)
      //   2. Returns the order_id to open Razorpay Checkout here
      //   3. Verifies payment signature server-side after success
      // For now we simulate a successful payment so the rest of the
      // flow (order creation, admin order management) can be built
      // and tested end-to-end.
      const simulatedPaymentId = `SIMULATED_${Date.now()}`;
      // ───────────────────────────────────────────────

      const orderId = await createOrder({
        userId: user?.uid || null,
        guestEmail: user ? null : guestEmail,
        items,
        shippingAddress: address,
        subtotal,
        discount,
        total,
        couponCode,
        paymentId: simulatedPaymentId,
      });

      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (err) {
      setError("Something went wrong placing your order: " + err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className="text-[#6F6A65]">Your bag is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif text-[#2E2A27] mb-10">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Address form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">
            <h2 className="font-medium text-[#2E2A27] mb-4">Shipping Address</h2>

            {!user && (
              <input
                type="email"
                placeholder="Email (for order updates)"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full mb-4 px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
              />
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={address.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Address Line"
              value={address.line1}
              onChange={(e) => handleChange("line1", e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
              required
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
                required
              />
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
                className="px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
                required
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">
            <h2 className="font-medium text-[#2E2A27] mb-2">Payment</h2>
            <p className="text-sm text-[#8A8178]">
              Razorpay checkout (UPI / Card / Net Banking) will appear here once
              payment integration is connected.
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6 h-fit">
          <h2 className="font-medium text-[#2E2A27] mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex justify-between text-sm text-[#6F6A65]"
              >
                <span>
                  {item.name} ({item.size}) × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm border-t border-[#ECE8E3] pt-4">
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
            <div className="flex justify-between text-lg font-medium text-[#2E2A27] pt-2 border-t border-[#ECE8E3]">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={placing}
            className="w-full mt-6 py-3.5 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition disabled:opacity-60"
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}