/* global process */

import { GoogleGenAI } from "@google/genai";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 8;
const MAX_CATALOGUE_PRODUCTS = 30;
const requests = new Map();

const STORE_CONTEXT = `
Yumi Store customer-support facts:

- Orders are processed 1-2 business days after payment confirmation.
- Delivery usually takes 5-7 business days depending on location.
- Tracking details are available in the customer's account after shipment.
- Shipping charges are shown during checkout.
- Returns are accepted within 7 days of delivery if products are unused, unwashed and in original packaging.
- Refunds take 5-7 business days after inspection.
- Customized or personalized products cannot be returned.
- Cash on Delivery is NOT available.
- Only prepaid online payments are accepted.
- Phone: +91 9591308536
- Instagram: @yumi_dxb
- Location: Mangaluru, Karnataka, India.
`;

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return (
    Array.isArray(forwarded)
      ? forwarded[0]
      : forwarded || req.socket?.remoteAddress || "unknown"
  )
    .split(",")[0]
    .trim();
}

function isRateLimited(ip) {
  const now = Date.now();

  const recent = (requests.get(ip) || []).filter(
    (t) => now - t < 60000
  );

  recent.push(now);

  requests.set(ip, recent);

  return recent.length > 12;
}

function cleanText(value, maxLength) {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
}

function cleanHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .slice(-MAX_HISTORY)
    .flatMap((item) => {
      const content = cleanText(item?.content, 1000);

      return content &&
        (item.role === "user" || item.role === "assistant")
        ? [{ role: item.role, content }]
        : [];
    });
}

function cleanCatalogue(catalogue) {
  if (!Array.isArray(catalogue)) return [];

  return catalogue
    .slice(0, MAX_CATALOGUE_PRODUCTS)
    .map((item) => ({
      id: cleanText(item?.id, 100),
      name: cleanText(item?.name, 120),
      price: Number(item?.price),
      category: cleanText(item?.category, 60),
      description: cleanText(item?.description, 300),
    }))
    .filter((p) => p.name);
}

export default async function handler(req, res) {
  console.log("===== NEW CHAT API =====");
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      message: "Gemini API key not configured.",
    });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({
      message: "Too many requests. Please wait.",
    });
  }

  const message = cleanText(
    req.body?.message,
    MAX_MESSAGE_LENGTH
  );

  if (!message) {
    return res.status(400).json({
      message: "Please enter a message.",
    });
  }

  const history = cleanHistory(req.body?.history);
  const catalogue = cleanCatalogue(req.body?.catalogue);

  const instructions = `
You are Yumi Store's AI shopping assistant.

Be friendly, helpful and concise.

Only use products that exist in the catalogue below.

Never invent products.

If recommending a product, ALWAYS include a markdown link exactly like:

[View Product](/product/PRODUCT_ID)

Replace PRODUCT_ID with the actual id from the catalogue.

Never use HTML.

Never output raw URLs.

Store information:

${STORE_CONTEXT}

Catalogue:

${JSON.stringify(catalogue)}
`;

  const prompt = `
${instructions}

Conversation:

${history
  .map((m) => `${m.role}: ${m.content}`)
  .join("\n")}

User: ${message}

Assistant:
`;

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    let result;

for (let i = 0; i < 3; i++) {
  try {
    console.log("Model:", "gemini-2.5-flash");
    console.log("Requested model:", "gemini-2.5-flash");

try {
  result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });
} catch (err) {
  console.error("FULL ERROR:");
  console.error(JSON.stringify(err, null, 2));
  throw err;
}

    break;

  } catch (err) {
    if (err.status !== 503 || i === 2) {
      throw err;
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 1500 * (i + 1))
    );
  }
}

const reply = cleanText(result.text ?? "", 3000);

    if (!reply) {
      return res.status(502).json({
        message: "Empty response from Gemini.",
      });
    }

    return res.status(200).json({
      reply,
    });
  } catch (err) {
  console.error("Gemini Error:", err);

  if (err.status === 503) {
    return res.status(503).json({
      message:
        "Our AI assistant is experiencing high demand. Please try again in a few seconds.",
    });
  }

  return res.status(500).json({
  message: err.message,
  status: err.status,
});
}
}