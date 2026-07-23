import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import Invoice from "../components/invoice/Invoice";

export async function generateInvoice(order) {
  // Create a hidden container
  const container = document.createElement("div");

  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "794px";
  container.style.background = "#ffffff";
  container.style.zIndex = "-1";

  document.body.appendChild(container);

  // Render the Invoice component
  const root = createRoot(container);
  root.render(<Invoice order={order} />);

  // Wait for images/fonts to render
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Convert HTML → Canvas
  const canvas = await html2canvas(container, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  // Create PDF
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();

  const pdfHeight =
    (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pdfWidth,
    pdfHeight
  );

  pdf.save(`Invoice-${order.id.slice(0, 8)}.pdf`);

  // Cleanup
  root.unmount();
  document.body.removeChild(container);
}