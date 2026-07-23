import { useEffect, useState } from "react";
import {
  getAllReturns,
  updateReturnStatus,
} from "../../firebase/returnService";

export default function Returns() {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    loadReturns();
  }, []);

  async function loadReturns() {
    const data = await getAllReturns();
    setReturns(data);
  }

  async function handleStatus(id, status) {
    await updateReturnStatus(id, status);

    setReturns((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status } : r
      )
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-serif mb-8">
        Return Requests
      </h1>

      <div className="space-y-6">

        {returns.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm p-6"
          >

            <p>
              <b>Order:</b> {item.orderId}
            </p>

            <p>
              <b>Reason:</b> {item.reason}
            </p>

            <p>
              <b>Description:</b> {item.description}
            </p>

            <p className="mt-2">
  <b>Status:</b>{" "}
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      item.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : item.status === "Approved"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {item.status}
  </span>
</p>

            {item.status === "Pending" && (
  <div className="flex gap-4 mt-5">

    <button
      onClick={() => handleStatus(item.id, "Approved")}
      className="px-5 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
    >
      Approve
    </button>

    <button
      onClick={() => handleStatus(item.id, "Rejected")}
      className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
    >
      Reject
    </button>

  </div>
)}
          </div>

        ))}

      </div>

    </div>
  );
}