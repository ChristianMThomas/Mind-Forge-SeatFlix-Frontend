import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { endpoints } from "../api";

function Profile() {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef();
  const [showResetMessage, setShowResetMessage] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found in storage.");
      setLoading(false);
      return;
    }

    fetch(`${endpoints.getUser}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // if your backend uses cookies
    })
      // Dynamically fetch the logged-in user
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch user data");
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file)); // Show preview immediately

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${endpoints.uploadAvatar}`, formData, {
        withCredentials: true, // ✅ Critical for cookie-based sessions
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      setUser(data);
    } catch (error) {
      console.error(
        "Upload error details:",
        error.response?.data || error.message
      );
      alert("Avatar upload failed. Please try again.");
    }
  };

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

            <button
              className="px-4  mr-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
              onClick={() => setShowResetMessage(true)}
            >
              Reset Password
            </button>

            {showResetMessage && (
              <p style={{ color: "red", margin: "1rem" }}>
                🔐We are sorry, Reset password feature is still in development.
                Please email us for further help!
              </p>
            )}

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
