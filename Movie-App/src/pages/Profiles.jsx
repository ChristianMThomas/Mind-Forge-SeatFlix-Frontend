import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { endpoints } from "../api";

function Profile() {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found.");
      setLoading(false);
      return;
    }

    axios
      .get(`${endpoints.getUser}/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setError("Failed to load profile data");
        setLoading(false);
      });
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${endpoints.uploadAvatar}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(res.data);
      setAvatarPreview(null);
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      setError("Avatar upload failed. Please try again.");
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="text-white w-9/12 mx-auto my-auto h-auto rounded-lg border bg-gray-800 shadow-md p-6">
      <h1 className="text-center text-2xl font-bold mb-4">Profile</h1>

      {loading && (
        <p className="text-center text-gray-300">Loading profile...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {user && (
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Left Side: Profile Picture */}
          {/* Avatar Upload Area */}
          <div className="col-span-1 flex justify-center">
            <label>
              <img
                src={
                  avatarPreview ||
                  `${import.meta.env.VITE_API_URL}${user.profilePic}` ||
                  "user.png"
                }
                alt="Profile"
                className="w-36 h-36 rounded-lg border-4 border-gray-500 cursor-pointer hover:opacity-75 transition"
              />

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Right Side: User Info */}
          <div className="col-span-2 space-y-3">
            <p className="text-gray-300 ">
              {" "}
              <span className="text-amber-50 ">Username :</span> {user.username}
            </p>
            <p className="text-gray-300">
              {" "}
              <span className="text-amber-50 ">Email :</span> {user.email}
            </p>
            <p className="text-gray-400">
              {" "}
              <span className="text-amber-50 ">Join Date :</span>{" "}
              {user.dateJoined || "N/A"}
            </p>

            <button className="px-4  mr-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white">
              Reset Password
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
