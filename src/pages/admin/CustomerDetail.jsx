import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getCustomerOrders } from "../../firebase/customerService";

const STATUS_STYLES = {
  pending: "bg-yellow-50 text-yellow-700",
  processing: "bg-blue-50 text-blue-700",
  packed: "bg-purple-50 text-purple-700",
  shipped: "bg-indigo-50 text-indigo-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
  refunded: "bg-red-50 text-red-700",
};

export default function CustomerDetail() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [snap, customerOrders] = await Promise.all([
        getDoc(doc(db, "users", customerId)),
        getCustomerOrders(customerId),
      ]);

      setCustomer(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      setOrders(customerOrders);
      setLoading(false);
    }

    load();
  }, [customerId]);

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "-";
    return timestamp.toDate().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) return <p className="text-[#8A8178]">Loading customer...</p>;
  if (!customer) return <p className="text-[#8A8178]">Customer not found.</p>;

  const totalSpent = orders
    .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="max-w-4xl">
      <Link
        to="/admin/customers"
        className="inline-flex items-center gap-2 text-sm text-[#6F6A65] hover:text-[#2E2A27] mb-6"
      >
        <FiArrowLeft /> Back to Customers
      </Link>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">
          <p className="text-sm text-[#8A8178]">Name</p>
          <p className="text-lg font-medium text-[#2E2A27] mt-1">{customer.name}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">
          <p className="text-sm text-[#8A8178]">Total Orders</p>
          <p className="text-lg font-medium text-[#2E2A27] mt-1">{orders.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6">
          <p className="text-sm text-[#8A8178]">Total Spent</p>
          <p className="text-lg font-medium text-[#2E2A27] mt-1">
            ₹{totalSpent.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6 mb-8">
        <h2 className="font-medium text-[#2E2A27] mb-3">Contact Info</h2>
        <p className="text-sm text-[#6F6A65]">Email: {customer.email}</p>
        <p className="text-sm text-[#6F6A65] mt-1">
          Joined: {formatDate(customer.createdAt)}
        </p>
      </div>

      <h2 className="text-xl font-serif text-[#2E2A27] mb-4">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-[#8A8178]">No orders yet.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-[#ECE8E3] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F8F5F1] text-sm text-[#8A8178] uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-[#ECE8E3]">
                  <td className="px-6 py-4 font-mono text-xs text-[#6F6A65]">
                    {order.id.slice(0, 8)}...
                  </td>
                  <td className="px-6 py-4 text-[#6F6A65]">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4 font-medium text-[#2E2A27]">
                    ₹{order.total?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-3 py-1.5 rounded-full capitalize ${
                        STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
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