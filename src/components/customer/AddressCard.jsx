import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getUserProfile,
  updateAddress,
} from "../../firebase/profileService";

export default function AddressCard() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  useEffect(() => {
    if (!user) return;

    loadAddress();
  }, [user]);

  async function loadAddress() {
    try {
      const data = await getUserProfile(user.uid);

      if (data) {
        setAddress({
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
          country: data.country || "India",
        });
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  const handleChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateAddress(user.uid, address);

      alert("Address updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-8">
        Loading address...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <h2 className="text-3xl font-serif text-[#2E2A27] mb-8">
        Shipping Address
      </h2>

      <div className="space-y-5">

        <div>
          <label className="block mb-2 text-[#6A625B]">
            Address
          </label>

          <textarea
            rows={3}
            value={address.address}
            onChange={(e) =>
              handleChange("address", e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-[#E5DED7] outline-none focus:border-[#465348]"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 text-[#6A625B]">
              City
            </label>

            <input
              type="text"
              value={address.city}
              onChange={(e) =>
                handleChange("city", e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl border border-[#E5DED7] outline-none focus:border-[#465348]"
            />
          </div>

          <div>
            <label className="block mb-2 text-[#6A625B]">
              State
            </label>

            <input
              type="text"
              value={address.state}
              onChange={(e) =>
                handleChange("state", e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl border border-[#E5DED7] outline-none focus:border-[#465348]"
            />
          </div>

          <div>
            <label className="block mb-2 text-[#6A625B]">
              Pincode
            </label>

            <input
              type="text"
              value={address.pincode}
              onChange={(e) =>
                handleChange("pincode", e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl border border-[#E5DED7] outline-none focus:border-[#465348]"
            />
          </div>

          <div>
            <label className="block mb-2 text-[#6A625B]">
              Country
            </label>

            <input
              type="text"
              value={address.country}
              onChange={(e) =>
                handleChange("country", e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl border border-[#E5DED7] outline-none focus:border-[#465348]"
            />
          </div>

        </div>

      </div>

      <button
        onClick={handleSave}
        className="mt-8 px-8 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition"
      >
        Save Address
      </button>

    </div>
  );
}