import { useState } from "react";
import { addReview } from "../../firebase/reviewService";
import { useAuth } from "../../context/AuthContext";

export default function ReviewForm({
  productId,
  orderId,
  onSuccess,
}) {
  const { user } = useAuth();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!review.trim()) {
      alert("Please write a review.");
      return;
    }

    setLoading(true);

    try {
      await addReview({
        productId,
        orderId,
        userId: user.uid,
        userName: user.displayName || "Customer",
        rating,
        review,
      });

      alert("Review submitted successfully!");

      setReview("");
      setRating(5);

      if (onSuccess) onSuccess();

    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-sm mt-8 p-8"
    >
      <h2 className="text-2xl font-serif mb-6">
        Write a Review
      </h2>

      {/* Rating */}

      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl transition ${
              star <= rating
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Review */}

      <textarea
        rows={5}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your experience..."
        className="w-full border border-[#ECE8E3] rounded-2xl p-4 outline-none focus:border-[#465348]"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-6 px-8 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A]"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}