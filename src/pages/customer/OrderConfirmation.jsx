import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { getOrderById } from "../../firebase/orderService";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderById(orderId).then((data) => {
      setOrder(data);
      setLoading(false);
    });
  }, [orderId]);

  if (loading) return <p className="text-center py-24 text-[#8A8178]">Loading...</p>;
  if (!order) return <p className="text-center py-24 text-[#8A8178]">Order not found.</p>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <FiCheckCircle className="mx-auto text-6xl text-green-600 mb-6" />

      <h1 className="text-3xl font-serif text-[#2E2A27] mb-3">Order Confirmed</h1>
      <p className="text-[#6F6A65] mb-8">
        Thank you! Your order has been placed successfully.
      </p>

      <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6 text-left mb-8">
        <p className="text-sm text-[#8A8178] mb-1">Order ID</p>
        <p className="font-medium text-[#2E2A27] mb-4">{order.id}</p>

        <p className="text-sm text-[#8A8178] mb-1">Total</p>
        <p className="font-medium text-[#2E2A27]">₹{order.total.toLocaleString()}</p>
      </div>

      <Link
        to="/shop"
        className="inline-block px-8 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}