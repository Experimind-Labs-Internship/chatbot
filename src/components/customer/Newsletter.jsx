import { useState } from "react";
import { FiMail, FiCheck, FiAlertCircle } from "react-icons/fi";
import { subscribeToNewsletter } from "../../firebase/newsletterService";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      await subscribeToNewsletter(email.trim());
      setStatus("success");
      setMessage("Thank you! You've been subscribed successfully.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      console.error("Newsletter subscription error:", err);
    }
  };

  return (
    <section className="py-24 bg-[#F8F4EF]">

      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white rounded-[40px] shadow-sm p-12 md:p-16 text-center">

          {/* Small Title */}

          <p className="uppercase tracking-[4px] text-[#B89B72] text-sm mb-4">

            Join Our Family

          </p>

          {/* Main Title */}

          <h2 className="font-serif text-4xl md:text-5xl text-[#2E2A27]">

            Stay Inspired with YUMI

          </h2>

          {/* Description */}

          <p className="mt-6 text-[#6A625B] leading-8 max-w-2xl mx-auto">

            Be the first to discover new collections,
            exclusive offers, styling inspiration, and
            timeless pieces designed with love.

          </p>

          {/* Newsletter Form */}

          <form className="mt-12 max-w-2xl mx-auto" onSubmit={handleSubmit}>

            <div className="flex flex-col md:flex-row gap-4">

              <div className="relative flex-1">

                <FiMail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B89B72]"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                  className="w-full pl-14 pr-5 py-4 rounded-full border border-[#E5DED5] focus:outline-none focus:border-[#B89B72] transition disabled:opacity-50"
                />

              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="px-10 py-4 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>

            </div>

          </form>

          {/* Status Message */}
          {message && (
            <div
              className={`mt-6 flex items-center justify-center gap-2 text-sm ${
                status === "success" ? "text-green-700" : "text-red-600"
              }`}
            >
              {status === "success" ? <FiCheck size={16} /> : <FiAlertCircle size={16} />}
              {message}
            </div>
          )}

          {/* Footer Text */}

          <p className="mt-8 text-sm text-[#8C847B]">

            We respect your inbox. No spam, only beautiful updates.

          </p>

        </div>

      </div>

    </section>
  );
}
