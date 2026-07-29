import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_yumistore";
const TEMPLATE_ID = "template_kqy9egg";
const PUBLIC_KEY = "YnXngr7kxmzpWOIiq";

export async function sendOrderStatusEmail({
  email,
  customer_name,
  order_id,
  status,

  // Tracking
  courier,
  trackingId,
  estimatedDelivery,

  // Order
  message,
  products,
  total,
}) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      email,
      customer_name,
      order_id,
      status,

      // Tracking
      courier,
      trackingId,
      estimatedDelivery,

      shipping_details:
        status === "Shipped" || status === "Delivered"
          ? `
            <div
              style="
                background:#EEF6F3;
                padding:20px;
                border-radius:12px;
                margin-bottom:25px;
              "
            >
              <h3 style="margin-top:0;color:#465348;">
                🚚 Shipping Details
              </h3>

              <p><strong>Courier Partner:</strong> ${courier}</p>
              <p><strong>Tracking ID:</strong> ${trackingId}</p>
              <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
            </div>
          `
          : "",

      // Order
      message,
      products,
      total,
    },
    PUBLIC_KEY
  );
}