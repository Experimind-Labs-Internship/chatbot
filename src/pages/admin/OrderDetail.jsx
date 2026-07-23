import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import {
  getOrderById,
  updateOrderStatus,
  ORDER_STATUSES,
} from "../../firebase/orderService";

import { sendOrderStatusEmail } from "../../firebase/emailService";
import { generateInvoice } from "../../utils/generateInvoice";

export default function OrderDetail() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Shipping Details
  const [courier, setCourier] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  async function loadOrder() {
    try {
      const data = await getOrderById(orderId);

      setOrder(data);

      setCourier(data?.courier || "");
      setTrackingId(data?.trackingId || "");

      setEstimatedDelivery(
        data?.estimatedDelivery?.toDate
          ? data.estimatedDelivery
              .toDate()
              .toISOString()
              .split("T")[0]
          : ""
      );
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "-";

    return timestamp.toDate().toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const handleStatusChange = async (newStatus) => {
  setUpdating(true);
  if (
  newStatus === "Packed" &&
  (!courier || !trackingId || !estimatedDelivery)
) {
  alert("Please fill all shipping details before marking the order as Packed.");
  setUpdating(false);
  return;
}

  try {
    // Update Firestore
    await updateOrderStatus(orderId, newStatus, {
      courier,
      trackingId,
      estimatedDelivery: estimatedDelivery
        ? new Date(estimatedDelivery)
        : null,
    });

    // Build product HTML for email
    const productHtml = order.items
      ?.map(
        (item) => `
<tr>
  <td style="padding:12px;border-bottom:1px solid #ddd;">
    <img
      src="${item.image}"
      width="70"
      style="border-radius:8px;"
    />
  </td>

  <td style="padding:12px;border-bottom:1px solid #ddd;">
    <strong>${item.name}</strong><br/>
    Size: ${item.size}<br/>
    Qty: ${item.quantity}
  </td>

  <td style="padding:12px;border-bottom:1px solid #ddd;">
    ₹${item.price}
  </td>
</tr>
`
      )
      .join("");

    // Send Email
    await sendOrderStatusEmail({
      email: order.shippingAddress?.email || order.guestEmail,
      customer_name: order.shippingAddress?.fullName,
      order_id: order.id,
      status: newStatus,

      courier,
      trackingId,
      estimatedDelivery,

      products: productHtml,
      total: order.total,

      message:
        newStatus === "Confirmed"
          ? "Great news! Your order has been confirmed and is now being prepared."
          : newStatus === "Packed"
          ? "Your order has been packed and is ready for shipment."
          : newStatus === "Shipped"
          ? "Your order has been shipped and is on its way to you."
          : newStatus === "Delivered"
          ? "Your order has been delivered. We hope you enjoy your purchase!"
          : newStatus === "Cancelled"
          ? "Your order has been cancelled."
          : "",
    });

    // Update local UI
    setOrder((prev) => ({
      ...prev,
      status: newStatus,
      courier,
      trackingId,
      estimatedDelivery,
    }));

    console.log("Order updated successfully.");
  } catch (err) {
    console.error("Failed to update order:", err);
  } finally {
    setUpdating(false);
  }
};

if (loading) {
  return (
    <div className="p-10 text-center text-[#8A8178]">
      Loading order...
    </div>
  );
}

if (!order) {
  return (
    <div className="p-10 text-center text-[#8A8178]">
      Order not found.
    </div>
  );
}

const address = order.shippingAddress || {};

return (
  <div className="max-w-6xl mx-auto px-6 py-8">

    {/* Back Button */}
    <Link
      to="/admin/orders"
      className="inline-flex items-center gap-2 text-sm text-[#6F6A65] hover:text-[#2E2A27] mb-6"
    >
      <FiArrowLeft />
      Back to Orders
    </Link>

    {/* Header */}
    <div className="bg-white rounded-2xl border border-[#ECE8E3] p-8 mb-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-serif text-[#2E2A27]">
            Order #{order.id.slice(0, 8)}
          </h1>

          <p className="text-[#8A8178] mt-2">
            {formatDate(order.createdAt)}
          </p>
        </div>

        <select
          value={order.status}
          disabled={updating}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`px-6 py-3 rounded-full border border-[#ECE8E3] outline-none focus:border-[#465348]
            ${updating ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

      </div>

    </div>

    {/* Shipping Details */}
    {(order.status === "Packed" ||
      order.status === "Shipped" ||
      order.status === "Delivered") && (

      <div className="bg-white rounded-2xl border border-[#ECE8E3] p-8 mb-8">

        <h2 className="text-xl font-semibold text-[#2E2A27] mb-6">
          🚚 Shipping Details
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

  {/* Courier */}
  <div>
    <label className="block text-sm text-[#8A8178] mb-2">
      Courier Partner
    </label>

    {order.status === "Packed" ? (
      <input
        type="text"
        value={courier}
        onChange={(e) => setCourier(e.target.value)}
        className="w-full rounded-xl border border-[#ECE8E3] px-4 py-3"
      />
    ) : (
      <p className="px-4 py-3 rounded-xl bg-[#F7F4EF]">
        {courier || "-"}
      </p>
    )}
  </div>

  {/* Tracking ID */}
  


          <div>
  <label className="block text-sm text-[#8A8178] mb-2">
    Tracking ID
  </label>

  {order.status === "Packed" ? (
    <input
      type="text"
      value={trackingId}
      onChange={(e) => setTrackingId(e.target.value)}
      placeholder="Tracking Number"
      className="w-full rounded-xl border border-[#ECE8E3] px-4 py-3"
    />
  ) : (
    <p className="px-4 py-3 rounded-xl bg-[#F7F4EF]">
      {trackingId || "-"}
    </p>
  )}
</div>

          <div>
  <label className="block text-sm text-[#8A8178] mb-2">
    Estimated Delivery
  </label>

  {order.status === "Packed" ? (
    <input
      type="date"
      value={estimatedDelivery}
      onChange={(e) => setEstimatedDelivery(e.target.value)}
      className="w-full rounded-xl border border-[#ECE8E3] px-4 py-3"
    />
  ) : (
    <p className="px-4 py-3 rounded-xl bg-[#F7F4EF]">
      {estimatedDelivery || "-"}
    </p>
  )}
</div>
        </div>

      </div>
    )}

    {/* Main Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items Card */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-[#ECE8E3] p-6">

        <h2 className="text-xl font-semibold text-[#2E2A27] mb-6">
          Ordered Items
        </h2>

        <div className="space-y-5">

          {order.items?.map((item, index) => (

            <div
              key={index}
              className="flex items-center gap-4 border-b border-[#ECE8E3] pb-5 last:border-none last:pb-0"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover bg-[#F4F0EB]"
              />

              <div className="flex-1">

                <h3 className="font-semibold text-[#2E2A27]">
                  {item.name}
                </h3>

                <p className="text-sm text-[#8A8178] mt-1">
                  Size: {item.size}
                </p>

                <p className="text-sm text-[#8A8178]">
                  Quantity: {item.quantity}
                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold text-[#2E2A27]">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>

                <p className="text-sm text-[#8A8178]">
                  ₹{item.price} each
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* Order Summary */}

        <div className="border-t border-[#ECE8E3] mt-8 pt-6">

          <div className="flex justify-between text-[#6F6A65] mb-3">
            <span>Subtotal</span>
            <span>₹{order.subtotal?.toLocaleString()}</span>
          </div>

          {order.discount > 0 && (

            <div className="flex justify-between text-green-700 mb-3">
              <span>
                Discount {order.couponCode && `(${order.couponCode})`}
              </span>

              <span>
                -₹{order.discount.toLocaleString()}
              </span>
            </div>

          )}

          <div className="flex justify-between border-t border-[#ECE8E3] pt-4 text-xl font-semibold text-[#2E2A27]">

            <span>Total</span>

            <span>
              ₹{order.total.toLocaleString()}
            </span>

          </div>

        </div>

      </div>
            {/* Right Sidebar */}
      <div className="space-y-6">

        {/* Shipping Address */}
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">

          <h2 className="text-lg font-semibold text-[#2E2A27] mb-4">
            📍 Shipping Address
          </h2>

          <p className="font-medium text-[#2E2A27]">
            {address.fullName}
          </p>

          <p className="text-sm text-[#6F6A65] mt-2">
            {address.phone}
          </p>

          <p className="text-sm text-[#6F6A65] mt-2">
            {address.line1}
          </p>

          <p className="text-sm text-[#6F6A65]">
            {address.city}, {address.state}
          </p>

          <p className="text-sm text-[#6F6A65]">
            {address.pincode}
          </p>

        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">

          <h2 className="text-lg font-semibold text-[#2E2A27] mb-4">
            💳 Payment
          </h2>

          <div className="flex justify-between mb-3">
            <span className="text-[#6F6A65]">
              Method
            </span>

            <span className="font-medium">
              {order.paymentMethod || "Online"}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="text-[#6F6A65]">
              Status
            </span>

            <span className="text-green-700 font-medium capitalize">
              {order.paymentStatus}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#6F6A65]">
              Payment ID
            </span>

            <span className="text-xs break-all text-right">
              {order.paymentId}
            </span>
          </div>

          {order.status === "Delivered" && (
          <button
            onClick={() => generateInvoice(order)}
            className="w-full mt-6 py-3 rounded-xl bg-[#465348] text-white hover:bg-[#39443A] transition"
          >
            🧾 Download Invoice
          </button>
        )}

        </div>

        {/* Customer */}
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">

          <h2 className="text-lg font-semibold text-[#2E2A27] mb-4">
            👤 Customer
          </h2>

          <p className="text-[#6F6A65]">
            {order.userId
              ? "Registered Customer"
              : `Guest: ${order.guestEmail}`}
          </p>

        </div>

      </div>

    </div>

  </div>
);
}
