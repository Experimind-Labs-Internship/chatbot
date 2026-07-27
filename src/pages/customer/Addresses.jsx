import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  getAddresses,
  deleteAddress,
  setDefaultAddress,
} from "../../firebase/addressService";

export default function Addresses() {
  const user = auth.currentUser;

  const [addresses, setAddresses] = useState([]);

  const loadAddresses = async () => {
    if (!user) return;

    const data = await getAddresses(user.uid);
    setAddresses(data);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;

    await deleteAddress(user.uid, id);
    loadAddresses();
  };

  const handleDefault = async (id) => {
    await setDefaultAddress(user.uid, id);
    loadAddresses();
  };

  return (
    <main className="bg-[#FAF8F5] min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-serif text-[#2E2A27] mb-10">
          My Addresses
        </h1>

        {addresses.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#ECE8E3]">
            <p className="text-[#6A625B]">
              No saved addresses yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white rounded-3xl p-8 border border-[#ECE8E3]"
              >
                <div className="flex justify-between items-start">

                  <div>

                    <div className="flex items-center gap-3">

                      <span className="font-semibold text-lg">
                        {address.label || "Home"}
                      </span>

                      {address.isDefault && (
                        <span className="bg-[#465348] text-white text-xs px-3 py-1 rounded-full">
                          Default
                        </span>
                      )}

                    </div>

                    <p className="mt-4 font-medium">
                      {address.fullName}
                    </p>

                    <p>{address.phone}</p>

                    <p className="mt-2 text-[#6A625B]">
                      {address.line1}
                    </p>

                    <p className="text-[#6A625B]">
                      {address.city}, {address.state} - {address.pincode}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    {!address.isDefault && (
                      <button
                        onClick={() => handleDefault(address.id)}
                        className="px-4 py-2 rounded-xl border hover:bg-[#465348] hover:text-white transition"
                      >
                        Set Default
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(address.id)}
                      className="px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}