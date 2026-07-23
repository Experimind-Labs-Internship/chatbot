import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export async function generateInvoice(order) {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();

  // ===== COLORS =====
  const dark = [70, 83, 72];
  const gold = [184, 155, 114];
  const light = [247, 244, 239];

  // ===== HEADER =====
  doc.setFillColor(...dark);
  doc.rect(0, 0, pageWidth, 38, "F");

  // Logo
  try {
    const response = await fetch(
      "https://res.cloudinary.com/uejgq1gu/image/upload/v1784818786/logo_r2eqkh.png"
    );

    const blob = await response.blob();

    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    doc.addImage(base64, "PNG", 12, 6, 26, 26);
  } catch (err) {
    console.log("Logo failed to load");
  }

  doc.setTextColor(255, 255, 255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);

  doc.text("YUMI DXB Fashion", 44, 17);

  doc.setFontSize(10);

  doc.text("Luxury Women's Fashion", 44, 25);

  // ===== INVOICE TITLE =====
  doc.setTextColor(...gold);

  doc.setFontSize(24);

  doc.text("INVOICE", 145, 18);

  doc.setTextColor(80);

  doc.setFontSize(11);

  doc.text(
    `Invoice : INV-${order.id.slice(0,8).toUpperCase()}`,
    145,
    28
  );

  doc.text(
    `Date : ${order.createdAt.toDate().toLocaleDateString("en-IN")}`,
    145,
    35
  );

  // ===== CUSTOMER BOX =====
  doc.setFillColor(...light);

  doc.roundedRect(15, 50, 180, 42, 3, 3, "F");

  doc.setTextColor(...dark);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);

  doc.text("Customer Details", 20, 60);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const a = order.shippingAddress;

  doc.text(a.fullName, 20, 69);
  doc.text(a.email || "", 20, 75);
  doc.text(a.phone, 20, 81);

  doc.text(
    `${a.line1}, ${a.city}, ${a.state} ${a.pincode}`,
    20,
    87
  );
    // ===== PRODUCTS =====

  const rows = [];

  for (const item of order.items) {
    rows.push([
      item.name,
      item.size,
      item.quantity,
      `₹${item.price.toLocaleString("en-IN")}`,
      `₹${(item.price * item.quantity).toLocaleString("en-IN")}`,
    ]);
  }

  autoTable(doc, {
    startY: 102,

    head: [[
      "Product",
      "Size",
      "Qty",
      "Price",
      "Total",
    ]],

    body: rows,

    theme: "grid",

    headStyles: {
      fillColor: dark,
      textColor: 255,
      halign: "center",
      fontStyle: "bold",
      fontSize: 11,
    },

    bodyStyles: {
      fontSize: 10,
      textColor: 60,
      halign: "center",
      valign: "middle",
    },

    alternateRowStyles: {
      fillColor: [252, 250, 247],
    },

    styles: {
      lineColor: [230, 230, 230],
      lineWidth: 0.3,
      cellPadding: 4,
    },
  });

  const finalY = doc.lastAutoTable.finalY + 10;
    // ===== ORDER SUMMARY =====

  doc.setFillColor(...light);
  doc.roundedRect(120, finalY, 75, 45, 4, 4, "F");

  doc.setFontSize(11);
  doc.setTextColor(80);

  doc.text("Subtotal", 126, finalY + 10);
  doc.text(
    `₹${order.subtotal.toLocaleString("en-IN")}`,
    188,
    finalY + 10,
    { align: "right" }
  );

  doc.text("Discount", 126, finalY + 20);
  doc.text(
    `₹${order.discount.toLocaleString("en-IN")}`,
    188,
    finalY + 20,
    { align: "right" }
  );

  doc.setDrawColor(...gold);
  doc.line(125, finalY + 25, 188, finalY + 25);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text("TOTAL", 126, finalY + 37);

  doc.text(
    `₹${order.total.toLocaleString("en-IN")}`,
    188,
    finalY + 37,
    { align: "right" }
  );
    // ===== PAYMENT BADGE =====

  doc.setFillColor(222, 247, 230);

  doc.roundedRect(15, finalY + 8, 45, 12, 3, 3, "F");

  doc.setTextColor(20, 120, 40);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text("✓ PAID", 37.5, finalY + 16, {
    align: "center",
  });

  // ===== FOOTER =====

  doc.setTextColor(...dark);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Thank you for shopping with YUMI DXB Fashion ❤️",
    pageWidth / 2,
    270,
    {
      align: "center",
    }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    "Email: care.yumidxbfashion@gmail.com",
    pageWidth / 2,
    278,
    {
      align: "center",
    }
  );

  doc.save(
    `Invoice_${order.id.slice(0, 8).toUpperCase()}.pdf`
  );
}