export default function FAQ() {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Orders are typically processed within 1–2 business days and delivered within 5–7 business days.",
    },
    {
      question: "Can I return my order?",
      answer:
        "Yes. Returns are accepted within 7 days of delivery if the item is unused and in its original condition.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order anytime from your Order History page after logging into your account.",
    },
    {
      question: "Do you offer Cash on Delivery?",
      answer:
        "Currently, we only support prepaid online payments.",
    },
  ];

  return (
    <main className="bg-[#FAF8F5] pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-5xl font-serif text-[#2E2A27] mb-4">
          Frequently Asked Questions
        </h1>

        <p className="text-[#6A625B] mb-12">
          Find answers to the most common questions about shopping with YUMI.
        </p>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-[#2E2A27]">
                {faq.question}
              </h2>

              <p className="mt-3 text-[#6A625B] leading-7">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}