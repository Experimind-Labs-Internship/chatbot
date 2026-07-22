import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllCoupons,
  deleteCoupon,
} from "../../firebase/couponService";

import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);

  const loadCoupons = async () => {
    const data = await getAllCoupons();
    setCoupons(data);
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this coupon?"
    );

    if (!confirmDelete) return;

    await deleteCoupon(id);
    loadCoupons();
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-serif text-[#2E2A27]">
          Coupons
        </h1>

        <Link
          to="/admin/coupons/new"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A]"
        >
          <FiPlus />
          Add Coupon
        </Link>

      </div>

      <div className="bg-white rounded-2xl border border-[#ECE8E3] overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#FAF8F5]">

            <tr>

              <th className="text-left p-4">
                Code
              </th>

              <th className="text-left p-4">
                Type
              </th>

              <th className="text-left p-4">
                Discount
              </th>

              <th className="text-left p-4">
                Min Order
              </th>

              <th className="text-left p-4">
                Expiry
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-center p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {coupons.map((coupon) => (

              <tr
                key={coupon.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {coupon.code}
                </td>

                <td className="p-4 capitalize">
                  {coupon.type}
                </td>

                <td className="p-4">

                  {coupon.type === "percentage"
                    ? `${coupon.discount}%`
                    : `₹${coupon.discount}`}

                </td>

                <td className="p-4">
                  ₹{coupon.minOrder}
                </td>

                <td className="p-4">
                  {coupon.expiryDate}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      coupon.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {coupon.active
                      ? "Active"
                      : "Inactive"}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      to={`/admin/coupons/edit/${coupon.id}`}
                      className="text-[#465348]"
                    >
                      <FiEdit2 size={18} />
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(coupon.id)
                      }
                      className="text-red-500"
                    >
                      <FiTrash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

            {coupons.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-500"
                >
                  No coupons found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}