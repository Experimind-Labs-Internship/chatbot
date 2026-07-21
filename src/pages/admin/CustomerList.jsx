import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiEye } from "react-icons/fi";
import { getAllCustomers } from "../../firebase/customerService";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllCustomers().then((data) => {
      setCustomers(data);
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

  const filtered = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-[#2E2A27]">Customers</h1>

        <Link
          to="/admin/customers/guests"
          className="text-sm text-[#6F6A65] hover:text-[#2E2A27] underline"
        >
          View Guest Orders →
        </Link>
      </div>

      <div className="relative mb-6 max-w-sm">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8178]" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-full border border-[#ECE8E3] outline-none focus:border-[#465348]"
        />
      </div>

      {loading ? (
        <p className="text-[#8A8178]">Loading customers...</p>
      ) : filtered.length === 0 ? (
        <p className="text-[#8A8178]">No customers found.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-[#ECE8E3] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F8F5F1] text-sm text-[#8A8178] uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} className="border-t border-[#ECE8E3]">
                  <td className="px-6 py-4 font-medium text-[#2E2A27]">{customer.name}</td>
                  <td className="px-6 py-4 text-[#6F6A65]">{customer.email}</td>
                  <td className="px-6 py-4 text-[#6F6A65]">{formatDate(customer.createdAt)}</td>
                  <td className="px-6 py-4 text-[#6F6A65]">{customer.orderCount}</td>
                  <td className="px-6 py-4 font-medium text-[#2E2A27]">
                    ₹{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/customers/${customer.id}`}
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