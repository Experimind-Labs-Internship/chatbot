import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile } from "../../firebase/profileService";

import ProfileInfo from "../../components/customer/ProfileInfo";
import AddressCard from "../../components/customer/AddressSection";
import WishlistSection from "../../components/customer/WishlistSection";
import MyCoupons from "../../components/customer/MyCoupons";
import AccountSettings from "../../components/customer/AccountSettings";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const data = await getUserProfile(user.uid);
      setProfile(data);
    }

    loadProfile();
  }, [user]);

  return (
    <main className="bg-[#FAF8F5] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col md:flex-row items-center justify-between">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-[#465348] text-white flex items-center justify-center text-4xl font-semibold">
              {profile?.name
                ? profile.name.charAt(0).toUpperCase()
                : user?.email?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-serif text-[#2E2A27]">
                {profile?.name || "Customer"}
              </h1>

              <p className="mt-2 text-[#6A625B]">
                {user?.email}
              </p>
            </div>

          </div>

          <button
  onClick={() => setShowEditModal(true)}
  className="mt-6 md:mt-0 px-8 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition"
>
  Edit Profile
</button>

        </div>

        {/* Sections */}
        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          <div className="lg:col-span-2 space-y-8">

  <div className="bg-white rounded-3xl shadow-sm p-8">

  <h2 className="text-3xl font-serif text-[#2E2A27] mb-8">
    Personal Information
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div>
      <p className="text-[#6A625B] text-sm">Full Name</p>
      <p className="mt-2 text-lg font-medium">
        {profile?.name || "-"}
      </p>
    </div>

    <div>
      <p className="text-[#6A625B] text-sm">Email</p>
      <p className="mt-2 text-lg font-medium">
        {user?.email}
      </p>
    </div>

    <div>
      <p className="text-[#6A625B] text-sm">Phone Number</p>
      <p className="mt-2 text-lg font-medium">
        {profile?.phone || "-"}
      </p>
    </div>

    <div>
      <p className="text-[#6A625B] text-sm">Gender</p>
      <p className="mt-2 text-lg font-medium">
        {profile?.gender || "-"}
      </p>
    </div>

    <div>
      <p className="text-[#6A625B] text-sm">Date of Birth</p>
      <p className="mt-2 text-lg font-medium">
        {profile?.dob || "-"}
      </p>
    </div>

  </div>

</div>

  <div
    onClick={() => navigate("/profile/orders")}
    className="cursor-pointer rounded-3xl border border-[#ECE8E3] bg-white p-6 hover:shadow-lg transition flex items-center justify-between"
  >
    <div>
      <h3 className="text-2xl font-serif text-[#2E2A27]">
        📦 My Orders
      </h3>

      <p className="mt-2 text-[#6A625B]">
        View your orders and track their delivery status.
      </p>
    </div>

    <span className="text-3xl text-[#465348]">→</span>
  </div>

  <AddressCard />

</div>

          <div className="space-y-8">
            <WishlistSection />
            <MyCoupons />
            <AccountSettings />
          </div>

        </div>

      </div>
      {showEditModal && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

    <div className="bg-white rounded-3xl w-full max-w-3xl p-8 relative max-h-[90vh] overflow-y-auto">

      <button
        onClick={() => setShowEditModal(false)}
        className="absolute top-5 right-5 text-3xl"
      >
        ×
      </button>

      <ProfileInfo
  onClose={() => setShowEditModal(false)}
  onProfileUpdated={async () => {
    const data = await getUserProfile(user.uid);
    setProfile(data);
  }}
/>

    </div>

  </div>
)}
    </main>
  );
}