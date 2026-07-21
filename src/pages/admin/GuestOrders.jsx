import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getGuestOrders } from "../../firebase/customerService";

export default function GuestOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGuestOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "-";
    return timestamp.toDate().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <Link
        to="/admin/customers"
        className="inline-flex items-center gap-2 text-sm text-[#6F6A65] hover:text-[#2E2A27] mb-6"
      >
        <FiArrowLeft /> Back to Customers
      </Link>

      <h1 className="text-3xl font-serif text-[#2E2A27] mb-8">Guest Orders</h1>

      {loading ? (
        <p className="text-[#8A8178]">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-[#8A8178]">No guest orders yet.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-[#ECE8E3] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F8F5F1] text-sm text-[#8A8178] uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Guest Email</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-[#ECE8E3]">
                  <td className="px-6 py-4 font-mono text-xs text-[#6F6A65]">
                    {order.id.slice(0, 8)}...
                  </td>
                  <td className="px-6 py-4 text-[#2E2A27]">{order.guestEmail}</td>
                  <td className="px-6 py-4 text-[#6F6A65]">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4 font-medium text-[#2E2A27]">
                    ₹{order.total?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="text-sm text-[#465348] hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}