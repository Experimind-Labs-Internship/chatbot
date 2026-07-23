import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCancelledOrders } from "../../firebase/orderService";

export default function CancelledOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
  try {
    const data = await getCancelledOrders();
    setOrders(data);
  } catch (err) {
    console.error(err);
    alert("Failed to load cancelled orders.");
  }
}

  return (
    <div className="max-w-6xl">

      <h1 className="text-3xl font-serif mb-8">
        Cancelled Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-8">
          No cancelled orders.
        </div>
      ) : (

        <div className="bg-white rounded-2xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-[#F7F4EF]">

              <tr>

                <th className="text-left p-4">Order</th>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Reason</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4"></th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-t"
                >

                  <td className="p-4">
                    #{order.id.slice(0,8)}
                  </td>

                  <td className="p-4">
                    {order.shippingAddress?.fullName}
                  </td>

                  <td className="p-4 text-red-600">
                    {order.cancelReason}
                  </td>

                  <td className="p-4">
                    {order.cancelledAt?.toDate()?.toLocaleDateString("en-IN")}
                  </td>

                  <td className="p-4">

                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="text-[#465348] hover:underline"
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