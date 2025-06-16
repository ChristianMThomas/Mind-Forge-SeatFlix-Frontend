import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    setError("User ID not found in storage.");
    setLoading(false);
    return;
  }


  fetch(`http://localhost:8080/api/v1/users/${userId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include" // if your backend uses cookies
})

 // Dynamically fetch the logged-in user
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch user data");
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="text-white w-9/12 mx-auto my-auto h-auto rounded-lg border bg-gray-800 shadow-md p-6">
      <h1 className="text-center text-2xl font-bold mb-4">Profile</h1>

      {loading && <p className="text-center text-gray-300">Loading profile...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {user && (
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Left Side: Profile Picture */}
          <div className="col-span-1 flex justify-center">
            <img src={user.profilePic || "/default-profile.png"} alt="Profile" className="w-36 h-36 rounded-lg border-4 border-gray-500" />
          </div>

          {/* Right Side: User Info */}
          <div className="col-span-2 space-y-3">
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-gray-300">{user.email}</p>
            <p className="text-gray-400">Joined: {user.dateJoined || "N/A"}</p>

            <div className="space-x-3 mt-4">
              <button onClick={() => navigate("/reset-password")} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white">Reset Password</button>
              <button onClick={logout} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;


