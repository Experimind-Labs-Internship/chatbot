import { FiLock, FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);

    navigate("/login");
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

      <h2 className="text-3xl font-serif text-[#2E2A27] mb-8">
        Account Settings
      </h2>

      <div className="space-y-5">

        <button
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl border hover:bg-[#FAF8F5] transition"
        >

          <FiLock size={22} />

          Change Password

        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl border border-red-300 text-red-500 hover:bg-red-50 transition"
        >

          <FiLogOut size={22} />

          Logout

        </button>

      </div>

    </div>
  );
}