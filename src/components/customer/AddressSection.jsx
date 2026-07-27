import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  getAddresses,
  deleteAddress,
  setDefaultAddress,
} from "../../firebase/addressService";
import AddressForm from "./AddressForm";

export default function AddressSection() {
  const user = auth.currentUser;

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

const [showForm, setShowForm] = useState(false);
const [editingAddress, setEditingAddress] = useState(null);

  const loadAddresses = async () => {
    if (!user) return;

    const data = await getAddresses(user.uid);

    setAddresses(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this address?"
    );

    if (!confirmDelete) return;

    await deleteAddress(user.uid, id);

    loadAddresses();
  };

  const handleDefault = async (id) => {
    await setDefaultAddress(user.uid, id);

    loadAddresses();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-8">
        Loading addresses...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-serif text-[#2E2A27]">
          Shipping Addresses
        </h2>

        <button
  onClick={() => {
    setEditingAddress(null);
    setShowForm(true);
  }}
  className="px-5 py-2 rounded-full bg-[#465348] text-white hover:bg-[#39443A]"
>
  + Add Address
</button>

      </div>

      {addresses.length === 0 ? (
        <p className="text-[#6F6A65]">
          No saved addresses yet.
        </p>
      ) : (
        <div className="space-y-5">

          {addresses.map((address) => (

            <div
              key={address.id}
              className="border border-[#ECE8E3] rounded-2xl p-5"
            >

              <div className="flex justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <span className="px-3 py-1 rounded-full bg-[#465348] text-white text-sm">

                      {address.label}

                    </span>

                    {address.isDefault && (
                      <span className="text-green-700 text-sm">
                        ⭐ Default
                      </span>
                    )}

                  </div>

                  <h3 className="mt-4 font-semibold">
                    {address.fullName}
                  </h3>

                  <p>{address.phone}</p>

                  <p>{address.line1}</p>

                  <p>
                    {address.city}, {address.state} -{" "}
                    {address.pincode}
                  </p>

                </div>

              </div>

              <div className="flex gap-3 mt-5">

                <button
  onClick={() => {
    setEditingAddress(address);
    setShowForm(true);
  }}
  className="px-4 py-2 rounded-full border border-[#465348]"
>
  Edit
</button>

                <button
                  onClick={() =>
                    handleDelete(address.id)
                  }
                  className="px-4 py-2 rounded-full border border-red-300 text-red-600"
                >
                  Delete
                </button>

                {!address.isDefault && (
                  <button
                    onClick={() =>
                      handleDefault(address.id)
                    }
                    className="px-4 py-2 rounded-full border"
                  >
                    Set Default
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>
      )}
      {showForm && (
  <AddressForm
    address={editingAddress}
    onClose={() => {
      setShowForm(false);
      loadAddresses();
    }}
  />
)}

    </div>
  );
}