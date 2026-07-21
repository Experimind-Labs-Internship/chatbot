import { useEffect, useState } from "react";
import { getAllOrders } from "../../firebase/orderService";
import { getInventoryData } from "../../firebase/inventoryService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orderCount: 0,
    lowStockCount: 0,
    pendingCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [orders, inventory] = await Promise.all([
        getAllOrders(),
        getInventoryData(),
      ]);

      const revenue = orders
        .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
        .reduce((sum, o) => sum + (o.total || 0), 0);

      const pendingCount = orders.filter((o) => o.status === "pending").length;
      const lowStockCount = inventory.filter((p) => p.isLowStock).length;

      setStats({ revenue, orderCount: orders.length, lowStockCount, pendingCount });
      setLoading(false);
    }

    loadStats();
  }, []);

  const cards = [
    { label: "Revenue", value: `₹${stats.revenue.toLocaleString()}` },
    { label: "Orders", value: stats.orderCount },
    { label: "Pending Orders", value: stats.pendingCount },
    { label: "Low Stock", value: stats.lowStockCount },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif text-[#2E2A27] mb-8">Dashboard</h1>
      <div className="grid grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-6 border border-[#ECE8E3]">
            <p className="text-sm text-[#8A8178]">{card.label}</p>
            <p className="text-2xl font-serif mt-2">
              {loading ? "..." : card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}