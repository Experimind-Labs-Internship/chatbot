import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { getAllOrders, updateOrderStatus, ORDER_STATUSES } from "../../firebase/orderService";

const STATUS_STYLES = {
  pending: "bg-yellow-50 text-yellow-700",
  processing: "bg-blue-50 text-blue-700",
  packed: "bg-purple-50 text-purple-700",
  shipped: "bg-indigo-50 text-indigo-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
  refunded: "bg-red-50 text-red-700",
};

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    const data = await getAllOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    await updateOrderStatus(orderId, newStatus);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    setUpdatingId(null);
  };

  const filtered =
    statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter);

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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-[#2E2A27]">Orders</h1>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-4 py-2 rounded-full text-sm capitalize transition ${
            statusFilter === "all"
              ? "bg-[#2E2A27] text-white"
              : "border border-[#ECE8E3] text-[#6F6A65] hover:bg-[#F4F0EB]"
          }`}
        >
          All ({orders.length})
        </button>

        {ORDER_STATUSES.map((status) => {
          const count = orders.filter((o) => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition ${
                statusFilter === status
                  ? "bg-[#2E2A27] text-white"
                  : "border border-[#ECE8E3] text-[#6F6A65] hover:bg-[#F4F0EB]"
              }`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {loading ? (
        <p className="text-[#8A8178]">Loading orders...</p>
      ) : filtered.length === 0 ? (
        <p className="text-[#8A8178]">No orders found.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-[#ECE8E3] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F8F5F1] text-sm text-[#8A8178] uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-t border-[#ECE8E3]">
                  <td className="px-6 py-4 font-mono text-xs text-[#6F6A65]">
                    {order.id.slice(0, 8)}...
                  </td>
                  <td className="px-6 py-4 text-[#2E2A27]">
                    {order.shippingAddress?.fullName || order.guestEmail || "Guest"}
                  </td>
                  <td className="px-6 py-4 text-[#6F6A65]">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4 text-[#6F6A65]">{order.items?.length || 0}</td>
                  <td className="px-6 py-4 font-medium text-[#2E2A27]">
                    ₹{order.total?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`text-xs px-3 py-1.5 rounded-full border-none outline-none capitalize cursor-pointer ${
                        STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#F4F0EB]"
                    >
                      <FiEye size={16} />
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