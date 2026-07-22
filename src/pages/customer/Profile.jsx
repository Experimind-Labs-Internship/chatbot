import { useAuth } from "../../context/AuthContext";
import ProfileInfo from "../../components/customer/ProfileInfo";
import AddressCard from "../../components/customer/AddressCard";
import OrderHistory from "../../components/customer/OrderHistory";
import WishlistSection from "../../components/customer/WishlistSection";
import MyCoupons from "../../components/customer/MyCoupons";
import AccountSettings from "../../components/customer/AccountSettings";

export default function Profile() {
  const { user } = useAuth();

  return (
    <main className="bg-[#FAF8F5] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col md:flex-row items-center justify-between">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-[#465348] text-white flex items-center justify-center text-4xl font-semibold">
              {user?.displayName
                ? user.displayName.charAt(0).toUpperCase()
                : user?.email?.charAt(0).toUpperCase()}
            </div>

            <div>

              <h1 className="text-4xl font-serif text-[#2E2A27]">
                {user?.displayName || "Customer"}
              </h1>

              <p className="mt-2 text-[#6A625B]">
                {user?.email}
              </p>

            </div>

          </div>

          <button className="mt-6 md:mt-0 px-8 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition">
            Edit Profile
          </button>

        </div>

        {/* Sections */}

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          <div className="lg:col-span-2 space-y-8">

            <ProfileInfo />

            <AddressCard />

            <OrderHistory />

          </div>

          <div className="space-y-8">

  <WishlistSection />

  <MyCoupons />

  <AccountSettings />

</div>

        </div>

      </div>
    </main>
  );
}