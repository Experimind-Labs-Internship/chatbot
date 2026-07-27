import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  saveAddress,
  updateAddress,
} from "../../firebase/addressService";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { getLocationFromPincode } from "../../services/pincodeService";

export default function AddressForm({
  address,
  onClose,
}) {
  const user = auth.currentUser;

  const [form, setForm] = useState({
    label: "Home",
    fullName: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (address) {
      setForm({
        label: address.label || "Home",
        fullName: address.fullName || "",
        phone: address.phone || "",
        line1: address.line1 || "",
        city: address.city || "",
        state: address.state || "",
        pincode: address.pincode || "",
      });
    }
  }, [address]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePincodeChange = async (value) => {
    const pincode = value.replace(/\D/g, "");

    handleChange("pincode", pincode);

    if (pincode.length === 6) {
      const location = await getLocationFromPincode(
        pincode
      );

      if (location) {
        setForm((prev) => ({
          ...prev,
          city: location.city,
          state: location.state,
        }));
      }
    }
  };
    return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">

        <h2 className="text-3xl font-serif text-[#2E2A27] mb-8">
          {address ? "Edit Address" : "Add New Address"}
        </h2>

        {/* Address Type */}

        <div className="mb-6">

          <label className="block mb-3 font-medium">
            Address Type
          </label>

          <div className="flex gap-3">

            {["Home", "Work", "Other"].map((type) => (

              <button
                key={type}
                type="button"
                onClick={() => handleChange("label", type)}
                className={`px-4 py-2 rounded-full border transition ${
                  form.label === type
                    ? "bg-[#465348] text-white border-[#465348]"
                    : "border-[#ECE8E3]"
                }`}
              >
                {type}
              </button>

            ))}

          </div>

        </div>

        {/* Name + Phone */}

        <div className="grid grid-cols-2 gap-5 mb-5">

          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              handleChange("fullName", e.target.value)
            }
            className="px-4 py-3 rounded-xl border border-[#ECE8E3]"
          />

          <PhoneInput
            defaultCountry="in"
            value={form.phone}
            onChange={(phone) =>
              handleChange("phone", phone)
            }
          />

        </div>

        {/* Address */}

        <input
          type="text"
          placeholder="House No / Street / Area"
          value={form.line1}
          onChange={(e) =>
            handleChange("line1", e.target.value)
          }
          className="w-full mb-5 px-4 py-3 rounded-xl border border-[#ECE8E3]"
        />

        {/* City State Pincode */}

        <div className="grid grid-cols-3 gap-5">

  <input
    type="text"
    placeholder="City"
    value={form.city}
    readOnly
    className="px-4 py-3 rounded-xl border border-[#ECE8E3] bg-[#F8F8F8]"
  />

  <input
    type="text"
    placeholder="State"
    value={form.state}
    readOnly
    className="px-4 py-3 rounded-xl border border-[#ECE8E3] bg-[#F8F8F8]"
  />

  <input
    type="text"
    placeholder="Pincode"
    value={form.pincode}
    maxLength={6}
    onChange={(e) =>
      handlePincodeChange(e.target.value)
    }
    className="px-4 py-3 rounded-xl border border-[#ECE8E3]"
  />

</div>

<div className="flex justify-end gap-4 mt-8">

  <button
    type="button"
    onClick={onClose}
    className="px-6 py-3 rounded-full border border-[#ECE8E3]"
  >
    Cancel
  </button>

  <button
    type="button"
    disabled={saving}
    onClick={async () => {
      try {
        setSaving(true);

        if (address) {
          await updateAddress(
            user.uid,
            address.id,
            form
          );
        } else {
          await saveAddress(user.uid, {
            ...form,
            isDefault: false,
          });
        }

        onClose();
      } catch (err) {
        alert(err.message);
      } finally {
        setSaving(false);
      }
    }}
    className="px-6 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A]"
  >
    {saving
      ? "Saving..."
      : address
      ? "Update Address"
      : "Save Address"}
  </button>

</div>

      </div>

    </div>
  );
}