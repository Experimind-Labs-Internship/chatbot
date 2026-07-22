import { FiGift } from "react-icons/fi";

export default function MyCoupons() {
  const coupons = [
    {
      code: "WELCOME10",
      discount: "10% OFF",
      description: "Minimum order ₹1000",
    },
    {
      code: "FIRST20",
      discount: "20% OFF",
      description: "Minimum order ₹2000",
    },
    {
      code: "FLAT250",
      discount: "₹250 OFF",
      description: "Minimum order ₹2500",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-3xl font-serif text-[#2E2A27]">
          My Coupons
        </h2>

        <FiGift
          size={28}
          className="text-[#B89B72]"
        />

      </div>

      <div className="space-y-5">

        {coupons.map((coupon) => (

          <div
            key={coupon.code}
            className="border border-dashed border-[#B89B72] rounded-2xl p-5 bg-[#FAF8F5]"
          >

            <h3 className="text-2xl font-semibold text-[#465348]">
              {coupon.code}
            </h3>

            <p className="mt-2 text-[#B89B72] font-medium">
              {coupon.discount}
            </p>

            <p className="mt-1 text-[#8A8178]">
              {coupon.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}