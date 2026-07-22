import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} from "../../firebase/profileService";

export default function ProfileInfo() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    if (!user) return;

    loadProfile();
  }, [user]);

  async function loadProfile() {
    try {
      const data = await getUserProfile(user.uid);

      if (data) {
        setProfile({
          name: data.name || "",
          email: data.email || user.email,
          phone: data.phone || "",
          gender: data.gender || "",
          dob: data.dob || "",
        });
      } else {
        const newProfile = {
          name: user.displayName || "",
          email: user.email,
          phone: "",
          gender: "",
          dob: "",
        };

        await createUserProfile(user.uid, newProfile);

        setProfile(newProfile);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(user.uid, {
        name: profile.name,
        phone: profile.phone,
        gender: profile.gender,
        dob: profile.dob,
      });

      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-8">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <h2 className="text-3xl font-serif text-[#2E2A27] mb-8">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 text-[#6A625B]">
            Full Name
          </label>

          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-[#E5DED7] outline-none focus:border-[#465348]"
          />
        </div>

        <div>
          <label className="block mb-2 text-[#6A625B]">
            Email
          </label>

          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full px-4 py-3 rounded-xl border border-[#E5DED7] bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-2 text-[#6A625B]">
            Phone Number
          </label>

          <input
            type="text"
            value={profile.phone}
            onChange={(e) =>
              handleChange("phone", e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-[#E5DED7] outline-none focus:border-[#465348]"
          />
        </div>

        <div>
          <label className="block mb-2 text-[#6A625B]">
            Gender
          </label>

          <select
            value={profile.gender}
            onChange={(e) =>
              handleChange("gender", e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-[#E5DED7] outline-none focus:border-[#465348]"
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-[#6A625B]">
            Date of Birth
          </label>

          <input
            type="date"
            value={profile.dob}
            onChange={(e) =>
              handleChange("dob", e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border border-[#E5DED7] outline-none focus:border-[#465348]"
          />
        </div>

      </div>

      <button
        onClick={handleSave}
        className="mt-8 px-8 py-3 rounded-full bg-[#465348] text-white hover:bg-[#39443A] transition"
      >
        Save Changes
      </button>

    </div>
  );
}