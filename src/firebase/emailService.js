import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_yumistore";
const TEMPLATE_ID = "template_kqy9egg";
const PUBLIC_KEY = "YnXngr7kxmzpWOIiq";

export async function sendOrderStatusEmail({
  email,
  customer_name,
  order_id,
  status,
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
      message,
      products,
      total,
    },
    PUBLIC_KEY
  );
}