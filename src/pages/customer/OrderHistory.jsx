import { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { getUserOrders } from "../../firebase/orderService";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    loadOrders();
  }, [user]);

  async function loadOrders() {
    try {
      const data = await getUserOrders(user.uid);
      setOrders(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "";

    return timestamp.toDate().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-8">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-serif text-[#2E2A27]">
          My Orders
        </h2>

        <FiPackage
          size={28}
          className="text-[#465348]"
        />

      </div>

      {orders.length === 0 ? (

        <p className="text-[#8A8178]">
          No orders found.
        </p>

      ) : (

        <div className="space-y-5">

          {orders.map((order) => (

            <div
              key={order.id}
              onClick={() => navigate(`/profile/orders/${order.id}`)}
              className="border border-[#ECE8E3] rounded-2xl p-6 hover:shadow-md hover:cursor-pointer transition"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="text-xl font-semibold text-[#2E2A27]">
                    Order #{order.id.slice(0, 8)}
                  </h3>

                  <p className="text-[#8A8178] mt-2">
                    {formatDate(order.createdAt)}
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>

              </div>

              <div className="mt-6 flex justify-between items-center">

                <span className="text-[#6A625B]">
                  Total Amount
                </span>

                <span className="text-2xl font-semibold text-[#465348]">
                  ₹{order.total?.toLocaleString()}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}