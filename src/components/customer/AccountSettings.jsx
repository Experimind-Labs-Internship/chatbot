import { useState } from "react";
import {
  FiLock,
  FiLogOut,
  FiX,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import {
  signOut,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";



export default function AccountSettings() {
  const navigate = useNavigate();

const [showModal, setShowModal] = useState(false);

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [showCurrent, setShowCurrent] = useState(false);
const [showNew, setShowNew] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const isGoogleUser = auth.currentUser?.providerData.some(
  (provider) => provider.providerId === "google.com"
);
const handleChangePassword = async () => {
  setError("");
  setSuccess("");

  if (!currentPassword || !newPassword || !confirmPassword) {
    setError("Please fill all fields.");
    return;
  }

  if (newPassword.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setError("New passwords do not match.");
    return;
  }

  try {
    setLoading(true);

    const email = auth.currentUser?.email?.trim().toLowerCase();

const credential = EmailAuthProvider.credential(
  email,
  currentPassword.trim()
);
console.log("Credential created:", credential);

console.log("Current User:", auth.currentUser);

console.log("Email:", auth.currentUser?.email);
console.log(
  JSON.stringify(auth.currentUser.providerData, null, 2)
);
console.log("Password entered:", currentPassword);

    await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );

    await updatePassword(auth.currentUser, newPassword);

    setSuccess("Password updated successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setShowModal(false);
      setSuccess("");
    }, 1500);
  } catch (err) {
  console.error("Full Error:", err);
  console.error("Code:", err.code);
  console.error("Message:", err.message);

  setError(err.code + " : " + err.message);
} finally {
  setLoading(false);
}
};
  const logout = async () => {
  await signOut(auth);

  navigate("/signup", { replace: true });
};

  return (
  <>
    <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

      <h2 className="text-3xl font-serif text-[#2E2A27] mb-8">
        Account Settings
      </h2>

      <div className="space-y-5">

        {!isGoogleUser ? (
  <button
    onClick={() => setShowModal(true)}
    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl border hover:bg-[#FAF8F5] transition"
  >
    <FiLock size={22} />
    Change Password
  </button>
) : (
  <div className="border rounded-2xl p-5 bg-[#FAF8F5]">
    <div className="flex items-center gap-3">
      <FiLock className="text-[#465348]" size={22} />

      <div>
        <h3 className="font-semibold text-[#2E2A27]">
          Google Account
        </h3>

        <p className="text-sm text-[#6A625B] mt-1">
          You signed in with Google.
          Password changes are managed through your Google Account.
        </p>
      </div>
    </div>

    <a
      href="https://myaccount.google.com/security"
      target="_blank"
      rel="noreferrer"
      className="inline-block mt-4 px-5 py-2 rounded-full bg-[#465348] text-white hover:bg-[#39443A]"
    >
      Manage Google Account
    </a>
  </div>
)}
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl border border-red-300 text-red-500 hover:bg-red-50 transition"
        >
          <FiLogOut size={22} />
          Logout
        </button>

      </div>

    </div>

    {showModal && !isGoogleUser && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white w-full max-w-md rounded-3xl p-8 relative">

          <button
            onClick={() => setShowModal(false)}
            className="absolute right-5 top-5"
          >
            <FiX size={24} />
          </button>

          <h2 className="text-3xl font-serif mb-6">
            Change Password
          </h2>

          {error && (
            <div className="mb-4 text-red-500">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 text-green-600">
              {success}
            </div>
          )}

          

          <div className="relative mb-4">
  <input
    type={showCurrent ? "text" : "password"}
    placeholder="Current Password"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
    className="w-full border border-[#E6E0D8] rounded-xl px-4 py-3 pr-12 outline-none focus:border-[#465348] transition"
  />

  <button
    type="button"
    onClick={() => setShowCurrent(!showCurrent)}
    className="absolute inset-y-0 right-4 flex items-center text-[#8A8178] hover:text-[#465348] transition"
  >
    {showCurrent ? <FiEyeOff size={20} /> : <FiEye size={20} />}
  </button>
</div>
         <div className="relative mb-4">
  <input
    type={showNew ? "text" : "password"}
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="w-full border border-[#E6E0D8] rounded-xl px-4 py-3 pr-12 outline-none focus:border-[#465348] transition"
  />

  <button
    type="button"
    onClick={() => setShowNew(!showNew)}
    className="absolute inset-y-0 right-4 flex items-center text-[#8A8178] hover:text-[#465348] transition"
  >
    {showNew ? <FiEyeOff size={20} /> : <FiEye size={20} />}
  </button>
</div>
<div className="relative">
  <input
    type={showConfirm ? "text" : "password"}
    placeholder="Confirm New Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full border border-[#E6E0D8] rounded-xl px-4 py-3 pr-12 outline-none focus:border-[#465348] transition"
  />

  <button
    type="button"
    onClick={() => setShowConfirm(!showConfirm)}
    className="absolute inset-y-0 right-4 flex items-center text-[#8A8178] hover:text-[#465348] transition"
  >
    {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
  </button>
</div>
          <div className="flex justify-end gap-3 mt-8">

            <button
              onClick={() => setShowModal(false)}
              className="px-5 py-3 border rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-[#465348] text-white"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>

          </div>

        </div>

      </div>
    )}
  </>
);
}