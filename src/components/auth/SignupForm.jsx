import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiUser } from "react-icons/fi";

import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";

import { signup } from "../../services/authService";

export default function SignupForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agree) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);

      await signup(name, email, password);

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="mt-10 space-y-6">

      <div className="relative">
        <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B89B72]" />

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full border border-[#E6E0D8] py-4 pl-14 outline-none focus:border-[#B89B72]"
        />
      </div>

      <div className="relative">
        <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B89B72]" />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-[#E6E0D8] py-4 pl-14 outline-none focus:border-[#B89B72]"
        />
      </div>

      <PasswordInput
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <PasswordInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className="flex items-center gap-3 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="h-4 w-4 accent-[#465348]"
        />

        <span>
          I agree to the{" "}
          <Link
            to="/terms"
            className="text-[#B89B72] hover:underline"
          >
            Terms & Conditions
          </Link>
        </span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#465348] py-4 text-white font-medium hover:bg-[#39443A] transition"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <SocialLogin />

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#B89B72] hover:underline"
        >
          Sign In
        </Link>
      </div>

    </form>
  );
}