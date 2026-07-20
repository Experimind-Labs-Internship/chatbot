import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";

import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";

import { login } from "../../services/authService";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          alert("Invalid email or password.");
          break;

        case "auth/user-not-found":
          alert("No account found with this email.");
          break;

        case "auth/wrong-password":
          alert("Incorrect password.");
          break;

        default:
          alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="mt-10 space-y-6">

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

      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-[#B89B72] text-sm hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#465348] py-4 text-white hover:bg-[#39443A]"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <SocialLogin />

      <div className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-[#B89B72] hover:underline"
        >
          Create Account
        </Link>
      </div>

    </form>
  );
}