import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import {
  loginWithGoogle,
  getUserRole,
} from "../../services/authService";

export default function SocialLogin() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();

      const role = await getUserRole(user.uid);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full border border-[#E6E0D8] rounded-full py-4 flex items-center justify-center gap-3 hover:bg-white transition"
    >
      <FcGoogle size={24} />

      Continue with Google
    </button>
  );
}