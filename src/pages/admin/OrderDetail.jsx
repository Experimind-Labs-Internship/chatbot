import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

  useEffect(() => {
    getOrderById(orderId).then((data) => {
      setOrder(data);
      setLoading(false);
    });
  }, [orderId]);

  const handleStatusChange = async (newStatus) => {
  setUpdating(true);

  
 await updateOrderStatus(orderId, newStatus);
 const productHtml = order.items
  .map(
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
    <strong>${item.name}</strong><br>
    Size: ${item.size}<br>
    Qty: ${item.quantity}
  </td>

  <td style="padding:12px;border-bottom:1px solid #ddd;">
    ₹${item.price}
  </td>
</tr>
`
  )
  .join("");
 console.log("Sending email with:", {
  email: order.shippingAddress?.email || order.guestEmail,
  customer_name: order.shippingAddress?.fullName,
  order_id: order.id,
  status: newStatus,
});

  try {
  console.log("Sending email...");

  const result = await sendOrderStatusEmail({
  email: order.shippingAddress.email,
  customer_name: order.shippingAddress.fullName,
  order_id: order.id,
  status: newStatus,

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

  console.log("SUCCESS", result);

} catch (err) {
  console.error("EMAIL ERROR", err);
}

  setOrder((prev) => ({
    ...prev,
    status: newStatus,
  }));

  setUpdating(false);
};

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

  if (loading) return <p className="text-[#8A8178]">Loading order...</p>;
  if (!order) return <p className="text-[#8A8178]">Order not found.</p>;

  const address = order.shippingAddress || {};

  return (
    <div className="max-w-4xl">
      <Link
        to="/admin/orders"
        className="inline-flex items-center gap-2 text-sm text-[#6F6A65] hover:text-[#2E2A27] mb-6"
      >
        <FiArrowLeft /> Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-[#2E2A27]">Order #{order.id.slice(0, 8)}</h1>
          <p className="text-sm text-[#8A8178] mt-1">{formatDate(order.createdAt)}</p>
        </div>

        <select
          value={order.status}
          disabled={updating}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-5 py-2.5 rounded-full border border-[#ECE8E3] text-sm capitalize outline-none focus:border-[#465348]"
        >
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
              
            </option>
          ))}
        </select>
        <button
  onClick={() => generateInvoice(order)}
  className="ml-3 px-5 py-2.5 rounded-full bg-[#465348] text-white hover:bg-[#39443A]"
>
  🧾 Download Invoice
</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Items */}
        <div className="col-span-2 bg-white rounded-2xl border border-[#ECE8E3] p-6">
          <h2 className="font-medium text-[#2E2A27] mb-4">Items</h2>

          <div className="space-y-4">
            {order.items?.map((item, i) => (
              <div key={i} className="flex gap-4 items-center border-b border-[#ECE8E3] pb-4 last:border-0 last:pb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-[#F4F0EB]"
                />
                <div className="flex-1">
                  <p className="font-medium text-[#2E2A27]">{item.name}</p>
                  <p className="text-sm text-[#8A8178]">
                    Size: {item.size} • Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-medium text-[#2E2A27]">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#ECE8E3] mt-6 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-[#6F6A65]">
              <span>Subtotal</span>
              <span>₹{order.subtotal?.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Discount {order.couponCode ? `(${order.couponCode})` : ""}</span>
                <span>-₹{order.discount?.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-medium text-[#2E2A27] pt-2 border-t border-[#ECE8E3]">
              <span>Total</span>
              <span>₹{order.total?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Shipping + Payment */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">
            <h2 className="font-medium text-[#2E2A27] mb-3">Shipping Address</h2>
            <p className="text-sm text-[#6F6A65] leading-6">
              {address.fullName}<br />
              {address.phone}<br />
              {address.line1}<br />
              {address.city}, {address.state} {address.pincode}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">
            <h2 className="font-medium text-[#2E2A27] mb-3">Payment</h2>
            <p className="text-sm text-[#6F6A65]">
              Status: <span className="text-green-700 capitalize">{order.paymentStatus}</span>
            </p>
            <p className="text-sm text-[#6F6A65] mt-1 break-all">
              ID: {order.paymentId}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">
            <h2 className="font-medium text-[#2E2A27] mb-3">Customer</h2>
            <p className="text-sm text-[#6F6A65]">
              {order.userId ? `Registered user` : `Guest: ${order.guestEmail}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}