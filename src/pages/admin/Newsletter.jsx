import { useEffect, useState, useMemo } from "react";
import { FiMail, FiUsers, FiCalendar, FiSearch, FiTrash2, FiDownload, FiInbox } from "react-icons/fi";
import {
  getAllSubscribers,
  deleteSubscriber,
  getTodaySubscriberCount,
  getMonthSubscriberCount,
} from "../../firebase/newsletterService";

/* ───────── Stat Card ───────── */
function StatCard({ icon: Icon, label, value, accent }) {
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
      </div>
    </div>
  );
}

/* ───────── Confirm Delete Modal ───────── */
function ConfirmModal({ show, email, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
            <FiTrash2 size={24} />
          </div>
          <h3 className="text-lg font-medium text-[#2E2A27] mb-2">Remove Subscriber</h3>
          <p className="text-sm text-[#6F6A65] mb-6">
            Are you sure you want to remove <strong>{email}</strong> from the newsletter list? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 rounded-xl border border-[#ECE8E3] text-[#2E2A27] text-sm font-medium hover:bg-[#F8F5F1] transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN NEWSLETTER PAGE
   ══════════════════════════════════════════ */
export default function Newsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [todayCount, setTodayCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, email }
  const [deleting, setDeleting] = useState(false);

  /* ─── Load Data ─── */
  async function loadData() {
    setLoading(true);
    try {
      const [subs, today, month] = await Promise.all([
        getAllSubscribers(),
        getTodaySubscriberCount(),
        getMonthSubscriberCount(),
      ]);
      setSubscribers(subs);
      setTodayCount(today);
      setMonthCount(month);
    } catch (err) {
      console.error("Failed to load newsletter data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  /* ─── Search Filter ─── */
  const filteredSubscribers = useMemo(() => {
    if (!searchQuery.trim()) return subscribers;
    const q = searchQuery.toLowerCase().trim();
    return subscribers.filter((s) => s.email.toLowerCase().includes(q));
  }, [subscribers, searchQuery]);

  /* ─── Delete Handler ─── */
  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteSubscriber(deleteTarget.id);
      setSubscribers((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      if (todayCount > 0) setTodayCount((c) => c - 1);
      if (monthCount > 0) setMonthCount((c) => c - 1);
    } catch (err) {
      console.error("Failed to delete subscriber:", err);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  /* ─── Export CSV ─── */
  function exportCSV() {
    if (subscribers.length === 0) return;
    const headers = ["Email", "Date Subscribed"];
    const rows = subscribers.map((s) => [
      s.email,
      s.subscribedAt ? s.subscribedAt.toLocaleDateString("en-IN") : "N/A",
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /* ─── Format date ─── */
  function formatDate(date) {
    if (!date) return "—";
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  /* ─── Loading State ─── */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[#8A8178]">Loading newsletter data...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2E2A27]">Newsletter</h1>
          <p className="text-sm text-[#8A8178] mt-1">
            Manage your email subscribers
          </p>
        </div>
        <button
          onClick={exportCSV}
          disabled={subscribers.length === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#465348] text-white text-sm font-medium hover:bg-[#39443A] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiDownload size={16} />
          Export CSV
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <StatCard
          icon={FiUsers}
          label="Total Subscribers"
          value={subscribers.length.toLocaleString()}
          accent="blue"
        />
        <StatCard
          icon={FiCalendar}
          label="New Today"
          value={todayCount}
          accent="green"
        />
        <StatCard
          icon={FiMail}
          label="New This Month"
          value={monthCount}
          accent="amber"
        />
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8178]"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-5 py-3 rounded-xl border border-[#ECE8E3] bg-white text-sm text-[#2E2A27] placeholder-[#8A8178] focus:outline-none focus:border-[#B89B72] transition"
        />
      </div>

      {/* Subscribers Table */}
      {filteredSubscribers.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-16 text-center">
          <div className="w-20 h-20 rounded-full bg-[#F4F0EB] flex items-center justify-center mx-auto mb-6">
            <FiInbox size={36} className="text-[#8A8178]" />
          </div>
          <h3 className="text-xl font-serif text-[#2E2A27] mb-2">
            {searchQuery.trim()
              ? "No subscribers match your search"
              : "No newsletter subscribers yet"}
          </h3>
          <p className="text-sm text-[#8A8178]">
            {searchQuery.trim()
              ? "Try a different email address"
              : "Subscribers will appear here once they sign up."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#ECE8E3] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F8F5F1] text-xs text-[#8A8178] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">#</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Date Subscribed</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map((sub, index) => (
                <tr key={sub.id} className="border-t border-[#ECE8E3] hover:bg-[#F8F5F1]/50 transition">
                  <td className="px-6 py-4 text-sm text-[#8A8178]">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-[#2E2A27]">{sub.email}</td>
                  <td className="px-6 py-4 text-sm text-[#6F6A65]">{formatDate(sub.subscribedAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setDeleteTarget({ id: sub.id, email: sub.email })}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <FiTrash2 size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Footer count */}
          <div className="px-6 py-4 border-t border-[#ECE8E3] text-xs text-[#8A8178]">
            Showing {filteredSubscribers.length} of {subscribers.length} subscriber
            {subscribers.length !== 1 ? "s" : ""}
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        show={!!deleteTarget}
        email={deleteTarget?.email || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        deleting={deleting}
      />
    </div>
  );
}

