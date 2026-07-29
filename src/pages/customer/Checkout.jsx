import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { auth } from "../../firebase/firebase";
import { getAvailableCoupons } from "../../firebase/couponService";
import { createOrder } from "../../firebase/orderService";
import { updateProductStock } from "../../firebase/productService";
import { useEffect } from "react";
import {
  getAddresses,
  saveAddress,
  updateAddress,
  deleteAddress,
} from "../../firebase/addressService";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { getLocationFromPincode } from "../../services/pincodeService";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { state } = useLocation();
  const navigate = useNavigate();

  const discount = state?.discount || 0;
  const total = state?.total ?? subtotal;
  const couponCode = state?.appliedCoupon?.code || null;
  

  const user = auth.currentUser;

  const [address, setAddress] = useState({
    label: "Home",
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
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [saveThisAddress, setSaveThisAddress] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const finalDiscount = discountAmount || discount;
  const [couponInput, setCouponInput] = useState("");
  const [showCouponModal, setShowCouponModal] = useState(false);

const finalTotal =
  discountAmount > 0
    ? Math.max(subtotal - discountAmount, 0)
    : total;

const finalCouponCode =
  appliedCoupon?.code || couponCode;

  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };
 const handlePincodeChange = async (value) => {
  const pincode = value.replace(/\D/g, "");

  handleChange("pincode", pincode);

  if (pincode.length === 6) {
    const location = await getLocationFromPincode(pincode);

    console.log("Pincode:", pincode);
    console.log("Location:", location);

    if (location) {
      setAddress((prev) => ({
        ...prev,
        city: location.city,
        state: location.state,
      }));
    }
  }
};
  const loadAddresses = async () => {
  if (!user) return;

  const data = await getAddresses(user.uid);

  setAddresses(data);

  const defaultAddress =
    data.find((a) => a.isDefault) || data[0];

  if (defaultAddress) {
    setSelectedAddress(defaultAddress);

    setAddress({
  label: defaultAddress.label || "Home",
  fullName: defaultAddress.fullName,
  email: user.email,
  phone: defaultAddress.phone || "",
  line1: defaultAddress.line1,
  city: defaultAddress.city,
  state: defaultAddress.state,
  pincode: defaultAddress.pincode,
});
  }
};

useEffect(() => {
  loadAddresses();
}, [user]);
useEffect(() => {
  async function loadCoupons() {
    try {
      const coupons = await getAvailableCoupons();
      setAvailableCoupons(coupons);
    } catch (err) {
      console.error("Failed to load coupons:", err);
    }
  }

  loadCoupons();
}, []);
function getExpiryText(expiryDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);

  const diff = Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (diff < 0) return "Expired";
  if (diff === 0) return "Expires today";
  if (diff === 1) return "Expires tomorrow";

  return `Expires in ${diff} days`;
}

function applyCoupon(coupon) {
  if (appliedCoupon) return;

  if (subtotal < coupon.minOrder) {
    alert(`Minimum order ₹${coupon.minOrder} required.`);
    return;
  }

  let discount = 0;

  if (coupon.type === "percentage") {
    discount = (subtotal * coupon.discount) / 100;
  } else {
    discount = coupon.discount;
  }

  setAppliedCoupon(coupon);
  setDiscountAmount(discount);
}

function removeCoupon() {
  setAppliedCoupon(null);
  setDiscountAmount(0);
}
function applyCouponByCode() {
  const code = couponInput.trim().toUpperCase();

  if (!code) {
    alert("Please enter a coupon code.");
    return;
  }

  const coupon = availableCoupons.find(
    (c) => c.code.toUpperCase() === code
  );

  if (!coupon) {
    alert("Invalid coupon code.");
    return;
  }

  applyCoupon(coupon);
}
const handleSaveAddress = async () => {
  if (!user) {
    alert("Please login to save addresses.");
    return;
  }

 const phoneDigits = address.phone.replace(/\D/g, "");

if (
  !address.fullName.trim() ||
  !address.line1.trim() ||
  !address.city.trim() ||
  !address.state.trim() ||
  !address.pincode.trim() ||
  phoneDigits.length !== 12 // 91 + 10-digit mobile number
) {
  alert("Please enter a valid 10-digit phone number.");
  return;
}

  try {
    const addressData = {
  label: address.label,
  fullName: address.fullName,
  phone: address.phone,
  line1: address.line1,
  city: address.city,
  state: address.state,
  pincode: address.pincode,
  isDefault: addresses.length === 0,
};

if (editingAddressId) {
  await updateAddress(user.uid, editingAddressId, addressData);
} else {
  await saveAddress(user.uid, addressData);
}
    

    alert(editingAddressId ? "Address updated successfully!" : "Address saved successfully!");

setEditingAddressId(null);
setShowAddressForm(false);
await loadAddresses();
  } catch (err) {
    console.error(err);
    alert("Failed to save address.");
  }
};
const handleDeleteAddress = async (addressId) => {
  if (!window.confirm("Are you sure you want to delete this address?")) {
    return;
  }

  try {
    await deleteAddress(user.uid, addressId);

    if (selectedAddress?.id === addressId) {
  setSelectedAddress(null);

  setAddress({
    label: "Home",
    fullName: "",
    email: user?.email || "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });
}

    await loadAddresses();

    alert("Address deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to delete address.");
  }
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
    discount: finalDiscount,
    total: finalTotal,
    couponCode: finalCouponCode,

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
  amount: finalTotal,
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
    discount: finalDiscount,
    total: finalTotal,
    couponCode: finalCouponCode,

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
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-serif text-[#2E2A27] mb-10">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Address form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">

  <h2 className="font-medium text-[#2E2A27] mb-4">
    Shipping Address
  </h2>

  {addresses.length > 0 && !showAddressForm && (
    <div className="space-y-4 mb-6">

      {addresses.map((item) => (

        <div
          key={item.id}
          
          className={`border rounded-2xl p-5 cursor-pointer transition ${
            selectedAddress?.id === item.id
              ? "border-[#465348] bg-[#F7F8F7]"
              : "border-[#ECE8E3]"
          }`}
        >

          <p className="font-semibold">
            {item.label}
          </p>

          <p>{item.fullName}</p>

          <p>{item.phone}</p>

          <p>{item.line1}</p>

<p>
  {item.city}, {item.state} - {item.pincode}
</p>

<div className="flex gap-3 mt-4">
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();

      setSelectedAddress(item);

      setAddress({
        label: item.label || "Home",
        fullName: item.fullName,
        email: user?.email || "",
        phone: item.phone || "",
        line1: item.line1,
        city: item.city,
        state: item.state,
        pincode: item.pincode,
      });
    }}
    className="px-4 py-2 rounded-full bg-[#465348] text-white hover:bg-[#39443A]"
  >
    Deliver Here
  </button>
  <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();

    setEditingAddressId(item.id);

    setAddress({
      label: item.label || "Home",
      fullName: item.fullName,
      email: user?.email || "",
      phone: item.phone || "",
      line1: item.line1,
      city: item.city,
      state: item.state,
      pincode: item.pincode,
    });

    setShowAddressForm(true);
  }}
  className="px-4 py-2 rounded-full border border-[#465348] text-[#465348] hover:bg-[#F5F5F5]"
>
  Edit
</button>

  <button
    type="button"
    onClick={(e) => {
  e.stopPropagation();
  handleDeleteAddress(item.id);
}}
    className="px-4 py-2 rounded-full border border-red-500 text-red-600 hover:bg-red-50"
  >
    Delete
  </button>
</div>

</div>

      ))}

      <button
  type="button"
  onClick={() => {
    setEditingAddressId(null);
    setSelectedAddress(null);

    setAddress({
      label: "Home",
      fullName: "",
      email: user?.email || "",
      phone: "",
      line1: "",
      city: "",
      state: "",
      pincode: "",
    });

    setShowAddressForm(true);
  }}
  className="text-[#465348] underline"
>
  + Add New Address
</button>

    </div>
  )}

  {(addresses.length === 0 || showAddressForm) && (
    <>
    {!user && (
  <input
    type="email"
    placeholder="Email (for order updates)"
    value={guestEmail}
    onChange={(e) => setGuestEmail(e.target.value)}
    className="w-full mb-4 px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
  />
)}

<div className="mb-5">
  <label className="block text-sm font-medium text-[#2E2A27] mb-3">
    Address Type
  </label>

  <div className="flex gap-3">
    <button
      type="button"
      onClick={() => handleChange("label", "Home")}
      className={`px-4 py-2 text-sm rounded-full border transition ${
        address.label === "Home"
          ? "bg-[#465348] text-white border-[#465348]"
          : "border-[#ECE8E3] hover:border-[#465348]"
      }`}
    >
      🏠 Home
    </button>

    <button
      type="button"
      onClick={() => handleChange("label", "Work")}
      className={`px-4 py-2 text-sm rounded-full border transition ${
        address.label === "Work"
          ? "bg-[#465348] text-white border-[#465348]"
          : "border-[#ECE8E3] hover:border-[#465348]"
      }`}
    >
      🏢 Work
    </button>

    <button
      type="button"
      onClick={() => handleChange("label", "Other")}
      className={`px-4 py-2 text-sm rounded-full border transition ${
        address.label === "Other"
          ? "bg-[#465348] text-white border-[#465348]"
          : "border-[#ECE8E3] hover:border-[#465348]"
      }`}
    >
      📍 Other
    </button>
  </div>
</div>

<div className="grid grid-cols-2 gap-6 mb-4">

  <input
    type="text"
    placeholder="Full Name"
    value={address.fullName}
    onChange={(e) => handleChange("fullName", e.target.value)}
    className="px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
    required
  />
    


  

  <div className="w-full">
  <PhoneInput
    defaultCountry="in"
    value={address.phone}
    onChange={(phone) => handleChange("phone", phone)}
  />
</div>
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
  readOnly
  className="px-4 py-3 rounded-xl border border-[#ECE8E3] bg-[#F8F8F8]"
/>

  <input
  type="text"
  placeholder="State"
  value={address.state}
  readOnly
  className="px-4 py-3 rounded-xl border border-[#ECE8E3] bg-[#F8F8F8]"
/>

  <input
  type="text"
  placeholder="Pincode"
  value={address.pincode}
  onChange={(e) => handlePincodeChange(e.target.value)}
  className="px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
  maxLength={6}
  required
/>
</div>

<label className="flex items-center gap-3 mt-6">
  <input
    type="checkbox"
    checked={saveThisAddress}
    onChange={(e) => setSaveThisAddress(e.target.checked)}
  />
  <span>Save this address for future orders</span>
</label>

<div className="flex gap-3 mt-6">
  {saveThisAddress && (
    <button
      type="button"
      onClick={handleSaveAddress}
      className="px-6 py-3 rounded-xl bg-[#465348] text-white hover:bg-[#39443A]"
    >
      {editingAddressId ? "Update Address" : "Save Address"}
    </button>
  )}

  <button
    type="button"
    onClick={() => {
  setEditingAddressId(null);
  setShowAddressForm(false);
}}
    className="px-6 py-3 rounded-xl border border-[#465348] text-[#465348] hover:bg-[#F5F5F5]"
  >
    Cancel
  </button>
</div>

    </>
  )}
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


<div className="border-t border-[#ECE8E3] pt-6 mt-6">

  <h3 className="font-semibold text-[#2E2A27] mb-4">
    Apply Coupon
  </h3>

  <div className="flex gap-3">

    <input
      type="text"
      placeholder="Enter coupon code"
      value={couponInput}
      onChange={(e) => setCouponInput(e.target.value)}
      className="flex-1 px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348] placeholder:text-[#9A958F]"
      disabled={!!appliedCoupon}
    
    />

    <button
  type="button"
  onClick={applyCouponByCode}
  disabled={!!appliedCoupon}
  className={`px-6 h-[44px] rounded-xl text-white transition ${
  appliedCoupon
    ? "bg-gray-400 cursor-not-allowed"
    : "bg-[#465348] hover:bg-[#39443A]"
}`}
>
  {appliedCoupon ? "Applied" : "Apply"}
</button>

  </div>
<div className="mt-3">
  <button
  type="button"
  onClick={() => setShowCouponModal(true)}
 className="w-full border border-[#D8D2CB] rounded-lg py-2 text-sm font-medium text-[#465348] hover:bg-[#465348] hover:text-white transition"
>
  View Available Offers
</button>
</div>

  {appliedCoupon && (
    <div className="mt-3 rounded-lg bg-green-50 border border-green-200 px-3 py-2">

      <div className="flex justify-between items-center">

        <div>
          <p className="font-semibold text-green-700">
            {appliedCoupon.code} Applied ✓
          </p>

          <p className="text-sm text-green-600">
            You saved ₹{discountAmount.toLocaleString("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
          </p>
        </div>

        <button
          type="button"
          onClick={removeCoupon}
          className="text-red-600 text-sm"
        >
          Remove
        </button>

      </div>

    </div>
  )}

</div>

          <div className="mt-4 space-y-2 text-sm border-t border-[#ECE8E3] pt-4">
            <div className="flex justify-between text-[#6F6A65]">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            {finalDiscount > 0 && (
  <div className="flex justify-between text-green-700">
    <span>Discount</span>
    <span>-₹{finalDiscount.toLocaleString("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}</span>
  </div>
)}
            <div className="flex justify-between text-lg font-medium text-[#2E2A27] pt-2 border-t border-[#ECE8E3]">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}</span>
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
                {showCouponModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-3xl p-6 w-[420px] max-h-[70vh] overflow-y-auto">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold">
          Available Offers
        </h2>

        <button
          onClick={() => setShowCouponModal(false)}
        >
          ✕
        </button>

      </div>

      {availableCoupons.map((coupon) => (

        <div
          key={coupon.id}
          className="border rounded-xl p-4 mb-3"
        >

          <div className="flex justify-between">

            <div>

              <p className="font-bold text-[#465348] text-lg">
  {coupon.code}
</p>

              <p className="text-sm font-medium text-green-600">
  {coupon.type === "percentage"
    ? `${coupon.discount}% OFF`
    : `₹${coupon.discount} OFF`}
</p>

              <p className="text-xs text-[#6F6A65] mt-2">
                Minimum order ₹{coupon.minOrder}
              </p>
              <p className="text-xs text-[#6F6A65] mt-1">
  {getExpiryText(coupon.expiryDate)}
</p>

            </div>

            <button
              type="button"
              onClick={() => {
                applyCoupon(coupon);
                setCouponInput(coupon.code);
                setShowCouponModal(false);
              }}
              className="px-4 py-2 bg-[#465348] text-white rounded-lg"
            >
              Apply
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>
)}
    </div>
  );
}