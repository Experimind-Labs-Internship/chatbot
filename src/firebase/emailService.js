import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_yumistore";
const TEMPLATE_CONFIRMED = "template_kqy9egg"; // Confirmed/Packed
const TEMPLATE_SHIPPED = "template_38o5enb"; // Replace with your new template ID
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
  const templateId =
    status === "Shipped" || status === "Delivered"
      ? TEMPLATE_SHIPPED
      : TEMPLATE_CONFIRMED;

  return emailjs.send(
    SERVICE_ID,
    templateId,
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