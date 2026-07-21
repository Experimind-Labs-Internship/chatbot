import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCoupon } from "../../firebase/couponService";

export default function CouponForm() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    code: "",
    type: "percentage",
    discount: "",
    minOrder: "",
    expiryDate: "",
    active: true,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      await addCoupon({
        ...form,
        discount: Number(form.discount),
        minOrder: Number(form.minOrder),
      });

      alert("Coupon created successfully!");

      navigate("/admin/coupons");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">

      <h1 className="text-3xl font-serif text-[#2E2A27] mb-8">
        Create Coupon
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div className="bg-white rounded-2xl border border-[#ECE8E3] p-6 space-y-5">

          <div>
            <label className="block mb-2 text-sm text-[#6F6A65]">
              Coupon Code
            </label>

            <input
              type="text"
              value={form.code}
              onChange={(e) =>
                handleChange("code", e.target.value.toUpperCase())
              }
              className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3] outline-none focus:border-[#465348]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 text-sm text-[#6F6A65]">
                Discount
              </label>

              <input
                type="number"
                value={form.discount}
                onChange={(e) =>
                  handleChange("discount", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3]"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-[#6F6A65]">
                Type
              </label>

              <select
                value={form.type}
                onChange={(e) =>
                  handleChange("type", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3]"
              >
                <option value="percentage">
                  Percentage
                </option>

                <option value="flat">
                  Flat
                </option>
              </select>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 text-sm text-[#6F6A65]">
                Minimum Order
              </label>

              <input
                type="number"
                value={form.minOrder}
                onChange={(e) =>
                  handleChange("minOrder", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3]"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-[#6F6A65]">
                Expiry Date
              </label>

              <input
                type="date"
                value={form.expiryDate}
                onChange={(e) =>
                  handleChange("expiryDate", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-[#ECE8E3]"
                required
              />
            </div>

          </div>

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                handleChange("active", e.target.checked)
              }
            />

            <span className="text-[#2E2A27]">
              Active Coupon
            </span>

          </div>

        </div>

        <div className="flex gap-4">

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A]"
          >
            {saving ? "Saving..." : "Create Coupon"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/coupons")}
            className="px-8 py-3 rounded-full border border-[#2E2A27] hover:bg-[#2E2A27] hover:text-white"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}