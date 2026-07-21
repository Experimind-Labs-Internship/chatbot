import { useEffect, useState } from "react";
import { FiCheck, FiX, FiMessageCircle, FiTrash2 } from "react-icons/fi";
import {
  getAllReviews,
  updateReviewStatus,
  replyToReview,
  deleteReview,
} from "../../firebase/reviewService";

const STATUS_STYLES = {
  pending: "bg-yellow-50 text-yellow-700",
  approved: "bg-green-50 text-green-700",
  rejected: "bg-gray-100 text-gray-500",
};

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [replyDrafts, setReplyDrafts] = useState({});
  const [savingId, setSavingId] = useState(null);

  const loadReviews = async () => {
    setLoading(true);
    const data = await getAllReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleStatusChange = async (id, status) => {
    setSavingId(id);
    await updateReviewStatus(id, status);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setSavingId(null);
  };

  const handleReply = async (id) => {
    const text = replyDrafts[id];
    if (!text?.trim()) return;
    setSavingId(id);
    await replyToReview(id, text);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, adminReply: text } : r)));
    setReplyDrafts((prev) => ({ ...prev, [id]: "" }));
    setSavingId(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this review permanently?")) return;
    await deleteReview(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "-";
    return timestamp.toDate().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  return (
    <div>
      <h1 className="text-3xl font-serif text-[#2E2A27] mb-8">Reviews</h1>

      <div className="flex gap-2 mb-6">
        {["pending", "approved", "rejected", "all"].map((status) => {
          const count =
            status === "all"
              ? reviews.length
              : reviews.filter((r) => r.status === status).length;

          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition ${
                filter === status
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
        <p className="text-[#8A8178]">Loading reviews...</p>
      ) : filtered.length === 0 ? (
        <p className="text-[#8A8178]">No reviews here.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl border border-[#ECE8E3] p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-[#2E2A27]">{review.userName}</p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full capitalize ${STATUS_STYLES[review.status]}`}
                    >
                      {review.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#8A8178] mt-1">{formatDate(review.createdAt)}</p>
                </div>

                <span className="text-yellow-500">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
              </div>

              <p className="text-[#4A453F] leading-6 mb-4">{review.comment}</p>

              {review.adminReply && (
                <div className="bg-[#F8F5F1] rounded-xl p-4 mb-4">
                  <p className="text-xs text-[#8A8178] mb-1">YUMI's Reply</p>
                  <p className="text-sm text-[#4A453F]">{review.adminReply}</p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                {review.status !== "approved" && (
                  <button
                    onClick={() => handleStatusChange(review.id, "approved")}
                    disabled={savingId === review.id}
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition"
                  >
                    <FiCheck size={14} /> Approve
                  </button>
                )}

                {review.status !== "rejected" && (
                  <button
                    onClick={() => handleStatusChange(review.id, "rejected")}
                    disabled={savingId === review.id}
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                  >
                    <FiX size={14} /> Reject
                  </button>
                )}

                <button
                  onClick={() => handleDelete(review.id)}
                  className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full text-red-600 hover:bg-red-50 transition"
                >
                  <FiTrash2 size={14} /> Delete
                </button>
              </div>

              {!review.adminReply && (
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyDrafts[review.id] || ""}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({ ...prev, [review.id]: e.target.value }))
                    }
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#ECE8E3] text-sm outline-none focus:border-[#465348]"
                  />
                  <button
                    onClick={() => handleReply(review.id)}
                    disabled={savingId === review.id}
                    className="flex items-center gap-1.5 text-sm px-4 py-2.5 rounded-xl bg-[#465348] text-white hover:bg-[#39443A] transition"
                  >
                    <FiMessageCircle size={14} /> Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}