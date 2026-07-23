import { useEffect, useState } from "react";
import {
  FiBarChart2,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiAlertTriangle,
  FiTrendingUp,
  FiTag,
  FiCreditCard,
} from "react-icons/fi";
import { getAllOrders } from "../../firebase/orderService";
import { getAllProducts } from "../../firebase/productService";
import { getAllCustomers } from "../../firebase/customerService";
import { getInventoryData, LOW_STOCK_THRESHOLD } from "../../firebase/inventoryService";

/* ───────── Tab Config ───────── */
const TABS = [
  { key: "sales", label: "Sales Report", icon: FiDollarSign },
  { key: "products", label: "Product Report", icon: FiTag },
  { key: "customers", label: "Customer Report", icon: FiUsers },
  { key: "inventory", label: "Inventory Report", icon: FiPackage },
];

/* ───────── Helpers ───────── */
const formatCurrency = (val) =>
  val ? `₹${Number(val).toLocaleString("en-IN")}` : "₹0";

const formatMonth = (date) =>
  date.toLocaleString("en-US", { month: "short", year: "2-digit" });

/* ───────── Stats Card ───────── */
function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6 flex items-start gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
          accent === "green"
            ? "bg-green-50 text-green-700"
            : accent === "amber"
            ? "bg-amber-50 text-amber-700"
            : accent === "blue"
            ? "bg-blue-50 text-blue-700"
            : "bg-[#F4F0EB] text-[#6F6A65]"
        }`}
      >
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[#8A8178] uppercase tracking-wider">{label}</p>
        <p className="text-xl font-serif text-[#2E2A27] mt-1">{value}</p>
        {sub && <p className="text-xs text-[#8A8178] mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

/* ───────── Simple Bar ───────── */
function SimpleBar({ label, value, maxValue, color = "#465348" }) {
  const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[#6F6A65] w-32 truncate shrink-0">{label}</span>
      <div className="flex-1 h-3 bg-[#F4F0EB] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm font-medium text-[#2E2A27] w-24 text-right shrink-0">
        {value}
      </span>
    </div>
  );
}

/* ───────── Table wrapper ───────── */
function DataTable({ headers, rows, renderRow }) {
  return (
    <div className="bg-white rounded-2xl border border-[#ECE8E3] overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[#F8F5F1] text-xs text-[#8A8178] uppercase tracking-wider">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-4 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-8 text-center text-[#8A8178]">
                No data available.
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-t border-[#ECE8E3]">
                {renderRow(row, i)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB: SALES REPORT
   ══════════════════════════════════════════ */
function SalesTab({ orders }) {
  const completedOrders = orders.filter(
    (o) => o.status !== "cancelled" && o.status !== "refunded"
  );
  const totalRevenue = completedOrders.reduce((s, o) => s + (o.total || 0), 0);
  const totalOrders = orders.length;
  const avgOrderValue = completedOrders.length
    ? totalRevenue / completedOrders.length
    : 0;
  const pendingRevenue = orders
    .filter((o) => o.status === "pending" || o.status === "Processing")
    .reduce((s, o) => s + (o.total || 0), 0);

  /* Monthly breakdown */
  const monthlyMap = {};
  orders.forEach((o) => {
    const d = o.createdAt?.toDate?.();
    if (!d) return;
    const key = formatMonth(d);
    if (!monthlyMap[key]) monthlyMap[key] = { month: key, orders: 0, revenue: 0 };
    monthlyMap[key].orders += 1;
    monthlyMap[key].revenue += o.total || 0;
  });
  const monthlyData = Object.values(monthlyMap).sort((a, b) => {
    const [mA, yA] = a.month.split(" ");
    const [mB, yB] = b.month.split(" ");
    const yDiff = yA.localeCompare(yB);
    if (yDiff) return yDiff;
    const months = "JanFebMarAprMayJunJulAugSepOctNovDec";
    return months.indexOf(mA) - months.indexOf(mB);
  });

  /* Category breakdown */
  const catRevenue = {};
  completedOrders.forEach((o) => {
    (o.items || []).forEach((item) => {
      const cat = item.category || "Uncategorized";
      if (!catRevenue[cat]) catRevenue[cat] = { revenue: 0, units: 0 };
      catRevenue[cat].revenue += (item.price || 0) * (item.quantity || 1);
      catRevenue[cat].units += item.quantity || 1;
    });
  });
  const catEntries = Object.entries(catRevenue)
    .map(([cat, d]) => ({ category: cat, ...d }))
    .sort((a, b) => b.revenue - a.revenue);
  const maxCatRevenue = catEntries[0]?.revenue || 1;

  /* Payment methods */
  const paymentMethodCount = {};
  orders.forEach((o) => {
    const m = o.paymentMethod || o.paymentStatus || "Unknown";
    paymentMethodCount[m] = (paymentMethodCount[m] || 0) + 1;
  });

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        <StatCard
          icon={FiDollarSign}
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          accent="green"
        />
        <StatCard
          icon={FiShoppingBag}
          label="Total Orders"
          value={totalOrders}
          accent="blue"
        />
        <StatCard
          icon={FiTrendingUp}
          label="Avg Order Value"
          value={formatCurrency(avgOrderValue)}
        />
        <StatCard
          icon={FiAlertTriangle}
          label="Pending Revenue"
          value={formatCurrency(pendingRevenue)}
          accent="amber"
        />
      </div>

      {/* Monthly Revenue */}
      <div>
        <h2 className="text-lg font-medium text-[#2E2A27] mb-4">Monthly Revenue</h2>
        <DataTable
          headers={["Month", "Orders", "Revenue", "Growth"]}
          rows={monthlyData}
          renderRow={(row, i) => {
            const prev = monthlyData[i - 1];
            const growth =
              prev && prev.revenue > 0
                ? (((row.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1)
                : "-";
            const isUp = growth !== "-" && Number(growth) >= 0;
            return (
              <>
                <td className="px-6 py-4 font-medium text-[#2E2A27]">{row.month}</td>
                <td className="px-6 py-4 text-[#6F6A65]">{row.orders}</td>
                <td className="px-6 py-4 text-[#2E2A27]">{formatCurrency(row.revenue)}</td>
                <td className="px-6 py-4">
                  {growth !== "-" ? (
                    <span className={isUp ? "text-green-700" : "text-red-600"}>
                      {isUp ? "+" : ""}
                      {growth}%
                    </span>
                  ) : (
                    <span className="text-[#8A8178]">-</span>
                  )}
                </td>
              </>
            );
          }}
        />
      </div>

      {/* Sales by Category */}
      <div>
        <h2 className="text-lg font-medium text-[#2E2A27] mb-4">Sales by Category</h2>
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6 space-y-4">
          {catEntries.map((c) => (
            <SimpleBar
              key={c.category}
              label={c.category}
              value={`${formatCurrency(c.revenue)} (${c.units} units)`}
              maxValue={maxCatRevenue}
            />
          ))}
          {catEntries.length === 0 && (
            <p className="text-sm text-[#8A8178] text-center py-4">No sales data.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB: PRODUCT REPORT
   ══════════════════════════════════════════ */
function ProductsTab({ products, orders }) {
  const activeProducts = products.filter((p) => p.status === "active");
  const uniqueCategories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const avgPrice =
    activeProducts.length > 0
      ? activeProducts.reduce((s, p) => s + (p.price || 0), 0) / activeProducts.length
      : 0;

  /* Best sellers from order items */
  const productSales = {};
  orders
    .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
    .forEach((o) => {
      (o.items || []).forEach((item) => {
        const key = item.productId || item.name;
        if (!productSales[key]) {
          productSales[key] = {
            name: item.name,
            category: item.category || "-",
            image: item.image || "",
            unitsSold: 0,
            revenue: 0,
          };
        }
        productSales[key].unitsSold += item.quantity || 1;
        productSales[key].revenue += (item.price || 0) * (item.quantity || 1);
      });
    });
  const bestSellers = Object.values(productSales).sort(
    (a, b) => b.unitsSold - a.unitsSold
  );

  /* Category distribution */
  const catCount = {};
  activeProducts.forEach((p) => {
    const cat = p.category || "Uncategorized";
    catCount[cat] = (catCount[cat] || 0) + 1;
  });
  const catDist = Object.entries(catCount)
    .map(([cat, count]) => ({ category: cat, count }))
    .sort((a, b) => b.count - a.count);
  const maxCatCount = catDist[0]?.count || 1;

  /* Top category */
  const topCategory = catDist[0]?.category || "-";

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        <StatCard
          icon={FiPackage}
          label="Total Products"
          value={products.length}
          accent="blue"
        />
        <StatCard
          icon={FiTag}
          label="Active Products"
          value={activeProducts.length}
          accent="green"
        />
        <StatCard
          icon={FiTrendingUp}
          label="Avg Price (Active)"
          value={formatCurrency(avgPrice)}
        />
        <StatCard
          icon={FiBarChart2}
          label="Top Category"
          value={topCategory}
          sub={`${uniqueCategories.length} categories`}
        />
      </div>

      {/* Best Selling Products */}
      <div>
        <h2 className="text-lg font-medium text-[#2E2A27] mb-4">Best Selling Products</h2>
        <DataTable
          headers={["#", "Product", "Category", "Units Sold", "Revenue"]}
          rows={bestSellers.slice(0, 10)}
          renderRow={(row, i) => (
            <>
              <td className="px-6 py-4 text-[#8A8178] text-sm">{i + 1}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {row.image && (
                    <img
                      src={row.image}
                      alt={row.name}
                      className="w-10 h-10 rounded-lg object-cover bg-[#F4F0EB]"
                    />
                  )}
                  <span className="font-medium text-[#2E2A27]">{row.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 capitalize text-[#6F6A65]">{row.category}</td>
              <td className="px-6 py-4 font-medium text-[#2E2A27]">{row.unitsSold}</td>
              <td className="px-6 py-4 text-[#2E2A27]">{formatCurrency(row.revenue)}</td>
            </>
          )}
        />
      </div>

      {/* Category Distribution */}
      <div>
        <h2 className="text-lg font-medium text-[#2E2A27] mb-4">Category Distribution</h2>
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6 space-y-4">
          {catDist.map((c) => (
            <SimpleBar
              key={c.category}
              label={c.category}
              value={`${c.count} product${c.count !== 1 ? "s" : ""}`}
              maxValue={maxCatCount}
              color="#8A8178"
            />
          ))}
          {catDist.length === 0 && (
            <p className="text-sm text-[#8A8178] text-center py-4">No products.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB: CUSTOMER REPORT
   ══════════════════════════════════════════ */
function CustomersTab({ customers, orders }) {
  const completedOrders = orders.filter(
    (o) => o.status !== "cancelled" && o.status !== "refunded"
  );
  const totalCustomerSpend = customers.reduce((s, c) => s + (c.totalSpent || 0), 0);
  const totalCustomerOrders = customers.reduce((s, c) => s + (c.orderCount || 0), 0);
  const avgSpend = customers.length > 0 ? totalCustomerSpend / customers.length : 0;

  /* Top customers */
  const topCustomers = [...customers]
    .sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0))
    .slice(0, 10);

  /* Guest vs registered */
  const guestOrders = orders.filter((o) => !o.userId && o.guestEmail).length;
  const registeredOrders = orders.filter((o) => o.userId).length;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        <StatCard
          icon={FiUsers}
          label="Total Customers"
          value={customers.length}
          accent="blue"
        />
        <StatCard
          icon={FiShoppingBag}
          label="Orders by Customers"
          value={totalCustomerOrders}
        />
        <StatCard
          icon={FiDollarSign}
          label="Total Spend"
          value={formatCurrency(totalCustomerSpend)}
          accent="green"
        />
        <StatCard
          icon={FiTrendingUp}
          label="Avg Spend / Customer"
          value={formatCurrency(avgSpend)}
        />
      </div>

      {/* Order Source */}
      <div>
        <h2 className="text-lg font-medium text-[#2E2A27] mb-4">Order Source</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6 text-center">
            <p className="text-3xl font-serif text-[#2E2A27]">{registeredOrders}</p>
            <p className="text-sm text-[#8A8178] mt-1">Registered Customers</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6 text-center">
            <p className="text-3xl font-serif text-[#2E2A27]">{guestOrders}</p>
            <p className="text-sm text-[#8A8178] mt-1">Guest Checkouts</p>
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div>
        <h2 className="text-lg font-medium text-[#2E2A27] mb-4">Top Customers by Spend</h2>
        <DataTable
          headers={["#", "Name", "Email", "Orders", "Total Spent"]}
          rows={topCustomers}
          renderRow={(customer, i) => (
            <>
              <td className="px-6 py-4 text-[#8A8178] text-sm">{i + 1}</td>
              <td className="px-6 py-4 font-medium text-[#2E2A27]">
                {customer.fullName || customer.name || customer.displayName || "N/A"}
              </td>
              <td className="px-6 py-4 text-[#6F6A65]">{customer.email}</td>
              <td className="px-6 py-4 text-[#6F6A65]">{customer.orderCount}</td>
              <td className="px-6 py-4 font-medium text-[#2E2A27]">
                {formatCurrency(customer.totalSpent)}
              </td>
            </>
          )}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB: INVENTORY REPORT
   ══════════════════════════════════════════ */
function InventoryTab({ inventory }) {
  const totalStock = inventory.reduce((s, p) => s + (p.totalStock || 0), 0);
  const lowStockItems = inventory.filter((p) => p.isLowStock);
  const stockValue = inventory.reduce(
    (s, p) => s + (p.price || 0) * (p.totalStock || 0),
    0
  );
  const categories = [...new Set(inventory.map((p) => p.category).filter(Boolean))];

  /* Stock by category */
  const catStock = {};
  inventory.forEach((p) => {
    const cat = p.category || "Uncategorized";
    if (!catStock[cat]) catStock[cat] = { stock: 0, products: 0 };
    catStock[cat].stock += p.totalStock || 0;
    catStock[cat].products += 1;
  });
  const catStockArr = Object.entries(catStock)
    .map(([cat, d]) => ({ category: cat, ...d }))
    .sort((a, b) => b.stock - a.stock);
  const maxCatStock = catStockArr[0]?.stock || 1;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        <StatCard
          icon={FiPackage}
          label="Total Stock Units"
          value={totalStock.toLocaleString()}
          accent="blue"
        />
        <StatCard
          icon={FiAlertTriangle}
          label="Low Stock Items"
          value={lowStockItems.length}
          sub={`Threshold ≤ ${LOW_STOCK_THRESHOLD}`}
          accent="amber"
        />
        <StatCard
          icon={FiDollarSign}
          label="Stock Value"
          value={formatCurrency(stockValue)}
          accent="green"
        />
        <StatCard
          icon={FiTag}
          label="Categories"
          value={categories.length}
        />
      </div>

      {/* Low Stock Alerts */}
      <div>
        <h2 className="text-lg font-medium text-[#2E2A27] mb-4 flex items-center gap-2">
          <FiAlertTriangle className="text-amber-600" />
          Low Stock Alerts
        </h2>
        <DataTable
          headers={["Product", "Category", "Total Stock", "Status"]}
          rows={lowStockItems}
          renderRow={(product) => {
            const sizeWarnings = Object.entries(product.sizes || {})
              .filter(([, s]) => (s.stock || 0) <= LOW_STOCK_THRESHOLD)
              .map(([size, s]) => `${size}: ${s.stock || 0}`)
              .join(", ");

            return (
              <>
                <td className="px-6 py-4 font-medium text-[#2E2A27]">{product.name}</td>
                <td className="px-6 py-4 capitalize text-[#6F6A65]">{product.category}</td>
                <td className="px-6 py-4">
                  <span className="text-red-600 font-medium">{product.totalStock}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-700">
                    Low Stock
                  </span>
                  {sizeWarnings && (
                    <p className="text-xs text-[#8A8178] mt-1">{sizeWarnings}</p>
                  )}
                </td>
              </>
            );
          }}
        />
        {lowStockItems.length === 0 && (
          <p className="text-sm text-green-700 bg-green-50 rounded-2xl p-4 text-center border border-green-100">
            ✅ All products have sufficient stock levels.
          </p>
        )}
      </div>

      {/* Stock by Category */}
      <div>
        <h2 className="text-lg font-medium text-[#2E2A27] mb-4">Stock Distribution by Category</h2>
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6 space-y-4">
          {catStockArr.map((c) => (
            <SimpleBar
              key={c.category}
              label={c.category}
              value={`${c.stock} units (${c.products} products)`}
              maxValue={maxCatStock}
              color="#465348"
            />
          ))}
          {catStockArr.length === 0 && (
            <p className="text-sm text-[#8A8178] text-center py-4">No inventory data.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN REPORTS PAGE
   ══════════════════════════════════════════ */
export default function Reports() {
  const [activeTab, setActiveTab] = useState("sales");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [o, p, c, i] = await Promise.all([
        getAllOrders(),
        getAllProducts(),
        getAllCustomers(),
        getInventoryData(),
      ]);
      setOrders(o);
      setProducts(p);
      setCustomers(c);
      setInventory(i);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[#8A8178]">Loading reports...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-[#2E2A27]">Reports</h1>
        <p className="text-sm text-[#8A8178]">
          {orders.length} orders · {products.length} products · {customers.length} customers
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-[#ECE8E3] pb-1">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-xl transition ${
              activeTab === key
                ? "bg-white text-[#2E2A27] border border-b-0 border-[#ECE8E3] -mb-px"
                : "text-[#8A8178] hover:text-[#2E2A27] hover:bg-white/50"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "sales" && <SalesTab orders={orders} />}
      {activeTab === "products" && <ProductsTab products={products} orders={orders} />}
      {activeTab === "customers" && <CustomersTab customers={customers} orders={orders} />}
      {activeTab === "inventory" && <InventoryTab inventory={inventory} />}
    </div>
  );
}

