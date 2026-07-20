import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  return (

    <button
      className="w-full border border-[#E6E0D8] rounded-full py-4 flex items-center justify-center gap-3 hover:bg-white transition"
    >

      <FcGoogle size={24} />

      Continue with Google

    </button>

  );
}