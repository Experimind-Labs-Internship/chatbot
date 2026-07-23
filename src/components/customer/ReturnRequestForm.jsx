import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  createReturnRequest,
  getReturnRequest,
} from "../../firebase/returnService";

export default function ReturnRequestForm({ order, product }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [returnRequest, setReturnRequest] = useState(null);

  useEffect(() => {
    checkReturn();
  }, []);

  async function checkReturn() {
  if (!auth.currentUser) return;

  try {
    console.log("Logged in UID:", auth.currentUser.uid);

    const request = await getReturnRequest(
      order.id,
      product.productId
    );

    console.log("Return Request:", request);

    if (request) {
      setAlreadyRequested(true);
      setReturnRequest(request);
    }
  } catch (err) {
    console.error("Return check failed:", err);
  }
}
  async function handleSubmit() {
    if (!reason) {
      alert("Please select a return reason.");
      return;
    }

    try {
      setLoading(true);

      const newRequest = {
  orderId: order.id,
  productId: product.productId,
  productName: product.name,
  productImage: product.image,
  size: product.size,
  quantity: product.quantity,
  userId: auth.currentUser.uid,
  reason,
  description,
  status: "Pending",
};

await createReturnRequest(newRequest);
setReturnRequest(newRequest);
setAlreadyRequested(true);

alert("Return request submitted successfully.");


    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (alreadyRequested && returnRequest) {
  return (
    <div className="mt-4 rounded-xl border p-4">

      <p className="font-medium">
        Return Request Submitted
      </p>

      <p className="mt-2">
        <strong>Status:</strong>{" "}
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            returnRequest.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : returnRequest.status === "Approved"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {returnRequest.status}
        </span>
      </p>

      <p className="mt-2 text-sm text-gray-600">
        Reason: {returnRequest.reason}
      </p>

    </div>
  );
}

  return (
    <div className="mt-6 rounded-2xl border border-[#ECE8E3] bg-[#FAF8F5] p-6">

      <h3 className="text-lg font-semibold text-[#2E2A27]">
        Request Return
      </h3>

      <select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="mt-4 w-full rounded-xl border border-[#ECE8E3] p-3 outline-none"
      >
        <option value="">Select Reason</option>
        <option value="Wrong Size">Wrong Size</option>
        <option value="Wrong Product">Wrong Product</option>
        <option value="Damaged Product">Damaged Product</option>
        <option value="Quality Issue">Quality Issue</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Additional details (optional)"
        className="mt-4 w-full rounded-xl border border-[#ECE8E3] p-3 outline-none"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-5 rounded-full bg-[#465348] px-6 py-3 text-white hover:bg-[#39443A] disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Return Request"}
      </button>

    </div>
  );
}