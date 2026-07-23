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

      // Order
      message,
      products,
      total,
    },
    PUBLIC_KEY
  );
}