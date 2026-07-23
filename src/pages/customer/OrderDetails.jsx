import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { getOrderById } from "../../firebase/orderService";
import ReviewForm from "../../components/customer/ReviewForm";
import ReturnRequestForm from "../../components/customer/ReturnRequestForm";

const steps = [
  "Processing",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
];

export default function OrderDetails() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {
    try {
      const data = await getOrderById(orderId);
      setOrder(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  if (loading) return <Loader />;

  if (!order) {
    return (
      <main className="pt-32 pb-24 text-center">
        <h2 className="text-3xl font-serif">
          Order not found
        </h2>
      </main>
    );
  }

  const currentStep = steps.indexOf(order.status);

  return (
    <main className="bg-[#FAF8F5] pt-28 pb-24">

      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-sm p-8">

          <h1 className="text-4xl font-serif text-[#2E2A27]">
            Order Details
          </h1>

          <div className="mt-8 grid md:grid-cols-2 gap-8">

            <div>
              <p className="text-[#8A8178]">
                Order ID
              </p>

              <h2 className="text-xl font-semibold mt-1">
                #{order.id}
              </h2>
            </div>

            <div>
              <p className="text-[#8A8178]">
                Ordered On
              </p>

              <h2 className="text-xl font-semibold mt-1">
                {order.createdAt?.toDate().toLocaleDateString("en-IN")}
              </h2>
            </div>

          </div>

        </div>

        {/* Timeline */}

        <div className="bg-white rounded-3xl shadow-sm mt-8 p-8">

          <h2 className="text-2xl font-serif mb-8">
            Order Status
          </h2>

          <div className="flex justify-between">

            {steps.map((step, index) => (

              <div
                key={step}
                className="flex flex-col items-center flex-1"
              >

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                  ${
                    index <= currentStep
                      ? "bg-[#465348]"
                      : "bg-gray-300"
                  }`}
                >
                  ✓
                </div>

                <p className="mt-3 text-sm text-center">
                  {step}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Products */}

        <div className="bg-white rounded-3xl shadow-sm mt-8 p-8">

          <h2 className="text-2xl font-serif mb-8">
            Ordered Products
          </h2>

          {order.items?.map((item) => (

            <div
              key={item.productId}
              className="flex gap-6 py-5 border-b last:border-none"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-32 object-cover rounded-xl"
              />

              <div className="flex-1">

                <h3 className="text-xl font-semibold">
                  {item.name}
                </h3>

                <p className="mt-2 text-[#6A625B]">
                  Size : {item.size}
                </p>

                <p className="mt-2 text-[#6A625B]">
                  Quantity : {item.quantity}
                </p>

                <p className="mt-3 text-xl font-semibold">
                  ₹{item.price}
                </p>

              </div>
              {order.status === "Delivered" && (
                <ReturnRequestForm
                    order={order}
                    product={item}
                />
                )}

            </div>

          ))}

        </div>

        {/* Shipping */}

<div className="bg-white rounded-3xl shadow-sm mt-8 p-8">

  <h2 className="text-2xl font-serif mb-6">
    Shipping Address
  </h2>

  <p className="font-semibold text-lg">
    {order.shippingAddress?.fullName}
  </p>

  <p className="mt-2">
    {order.shippingAddress?.phone}
  </p>

  <p className="mt-2">
    {order.shippingAddress?.line1}
  </p>

  <p className="mt-2">
    {order.shippingAddress?.city}, {order.shippingAddress?.state}
  </p>

  <p className="mt-2">
    {order.shippingAddress?.pincode}
  </p>

</div>

        {/* Payment */}

        <div className="bg-white rounded-3xl shadow-sm mt-8 p-8">

          <h2 className="text-2xl font-serif mb-6">
            Payment Details
          </h2>

          <div className="flex justify-between mb-4">

            <span>Payment Method</span>

            <span>
              {order.paymentMethod}
            </span>

          </div>

          <div className="flex justify-between mb-4">

            <span>Subtotal</span>

            <span>
              ₹{order.total}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="font-semibold text-xl">
              Total
            </span>

            <span className="font-semibold text-xl">
              ₹{order.total}
            </span>

          </div>

                </div>

        {/* Review Section */}

        {order.status === "Delivered" && (

          <ReviewForm
            productId={order.items?.[0]?.productId}
            orderId={order.id}
          />

        )}

      </div>

    </main>
  );
}