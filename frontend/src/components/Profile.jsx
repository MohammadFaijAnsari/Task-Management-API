import React, { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("✅ Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <div className="p-4 flex justify-end">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Back to Dashboard
        </button>
      </div>
      <div className="min-h-screen  flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-gray-900">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Profile</h2>

          <div className="space-y-4">
            <div className="flex justify-between bg-gray-100 px-4 py-3 rounded-lg">
              <span className="font-semibold">Username:</span>
              <span>{user.name}</span>
            </div>

            <div className="flex justify-between bg-gray-100 px-4 py-3 rounded-lg">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>
            </div>

            <div className="flex justify-between bg-gray-100 px-4 py-3 rounded-lg">
              <span className="font-semibold">Role:</span>
              <span>{user.role}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
