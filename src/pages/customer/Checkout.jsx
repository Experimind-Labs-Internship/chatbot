import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { auth } from "../../firebase/firebase";
import { createOrder } from "../../firebase/orderService";
import { updateProductStock } from "../../firebase/productService";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { state } = useLocation();
  const navigate = useNavigate();

  const discount = state?.discount || 0;
  const total = state?.total ?? subtotal;
  const couponCode = state?.appliedCoupon?.code || null;

  const user = auth.currentUser;

  const [address, setAddress] = useState({
  fullName: "",
  email: user?.email || "",
  phone: "",
  line1: "",
  city: "",
  state: "",
  pincode: "",
});
  const [guestEmail, setGuestEmail] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");

  

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
      if (paymentMethod === "cod") {

  const orderId = await createOrder({
    userId: user?.uid || null,
    guestEmail: user ? null : guestEmail,
    items,

    shippingAddress: {
      ...address,
      email: user?.email || guestEmail,
    },

    subtotal,
    discount,
    total,
    couponCode,

    paymentMethod: "Cash On Delivery",
    paymentStatus: "Pending",
  });

  for (const item of items) {
    await updateProductStock(
      item.productId,
      item.size,
      item.quantity
    );
  }

  await clearCart();

  navigate(`/order-confirmation/${orderId}`);

  return;
}
// Create Razorpay Order from Vercel API

const orderResponse = await fetch("/api/create-order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: total,
  }),
});

const razorpayOrder = await orderResponse.json();

console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: razorpayOrder.amount,

  currency: razorpayOrder.currency,

  order_id: razorpayOrder.id,

  name: "YUMI DXB Fashion",

  description: "Order Payment",
  

  prefill: {
    name: address.fullName,
    email: user?.email || guestEmail,
    contact: address.phone,
  },

  theme: {
    color: "#465348",
  },

  
    handler: async function (response) {

  const verifyResponse = await fetch("/api/verify-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  });

  const verify = await verifyResponse.json();

  if (!verify.success) {
    alert("Payment verification failed.");
    return;
  }

  const orderId = await createOrder({
    userId: user?.uid || null,
    guestEmail: user ? null : guestEmail,
    items,

    shippingAddress: {
      ...address,
      email: user?.email || guestEmail,
    },

    subtotal,
    discount,
    total,
    couponCode,

    paymentMethod: "Online",
    paymentStatus: "Paid",

    paymentId: response.razorpay_payment_id,
  });

  for (const item of items) {
    await updateProductStock(
      item.productId,
      item.size,
      item.quantity
    );
  }

  await clearCart();

  navigate(`/order-confirmation/${orderId}`);
}, // <-- comma here

}; // <-- close options object here

const paymentObject = new window.Razorpay(options);

paymentObject.open();

paymentObject.on("payment.failed", function (response) {
  alert(response.error.description || "Payment Failed");
});


    } catch (err) {
  console.error("Checkout Error:", err);
  console.error("Error Code:", err.code);
  console.error("Error Message:", err.message);

  setError(`${err.code} : ${err.message}`);
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

            <div className={`grid ${user ? "grid-cols-3" : "grid-cols-2"} gap-4 mb-4`}>
              <input
                type="text"
                placeholder="Full Name"
                value={address.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
                required
              />
              {user && (
                <input
                  type="email"
                  placeholder="Email"
                  value={address.email}
                  readOnly
                  className="px-4 py-3 rounded-xl border border-[#ECE8E3] bg-gray-50"
                />
              )}
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
  <h2 className="font-medium text-[#2E2A27] mb-5">
    Select Payment Method
  </h2>

  <div className="space-y-4">

    <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
      <input
        type="radio"
        value="online"
        checked={paymentMethod === "online"}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />

      <span>Online Payment (UPI / Card / Net Banking)</span>
    </label>

    <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
      <input
        type="radio"
        value="cod"
        checked={paymentMethod === "cod"}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />

      <span>Cash On Delivery</span>
    </label>

  </div>
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