import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { sendPasswordReset } from "../../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

const handleReset = async (e) => {
  e.preventDefault();

  if (!email.trim()) {
    alert("Please enter your email.");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  try {
    setLoading(true);

    await sendPasswordReset(email);

    alert(
      "If an account exists with this email, a password reset link has been sent."
    );

    setEmail("");
  } catch (err) {
    console.error(err);

    if (err.code === "auth/too-many-requests") {
      alert("Too many requests. Please try again later.");
    } else {
      alert("Unable to send password reset email.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm p-10">

        <h1 className="text-4xl font-serif text-[#2E2A27] text-center">
          Forgot Password
        </h1>

        <p className="text-center text-[#8A8178] mt-3">
          Enter your registered email to receive a password reset link.
        </p>

        <form onSubmit={handleReset} className="mt-8 space-y-6">

          <div className="relative">
            <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B89B72]" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-[#E6E0D8] py-4 pl-14 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#465348] py-4 text-white hover:bg-[#39443A] disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="text-[#B89B72] hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </main>
  );
}