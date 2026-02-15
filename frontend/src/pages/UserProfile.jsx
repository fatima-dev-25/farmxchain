import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = AuthService.getCurrentUser();
        try {
          const data = await UserService.getUserProfile();
          setUser(data.data);
        } catch {
          setUser(currentUser);
        }
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="animate-spin h-16 w-16 rounded-full border-b-4 border-green-600"></div>
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No user data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-green-600 px-6 py-6">
          <h2 className="text-2xl font-bold text-white">🌱 User Profile</h2>
          <p className="text-green-100 text-sm mt-1">
            Personal details & wallet information
          </p>
        </div>

        {/* Content */}
        <div className="divide-y divide-gray-200">
          
          {/* User ID */}
          <ProfileRow label="User ID" value={user.id} />

          {/* Email */}
          <ProfileRow label="Email Address" value={user.email} />

          {/* Role */}
          <ProfileRow
            label="Role"
            value={
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                {user.role}
              </span>
            }
          />

          {/* Status */}
          <ProfileRow
            label="Account Status"
            value={
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                {user.status || "ACTIVE"}
              </span>
            }
          />

          {/* Wallet */}
          <div className="px-6 py-8 bg-green-50">
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
              Wallet Balance
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="text-4xl font-black text-green-700">
                ₹{user.balance?.toLocaleString() || "0"}
              </div>

              <div className="flex gap-2 max-w-sm w-full">
                <input
                  type="number"
                  id="topUpAmount"
                  placeholder="Amount"
                  className="flex-1 px-4 py-2 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
                />
                <button
                  onClick={async () => {
                    const amount =
                      document.getElementById("topUpAmount").value;
                    if (!amount || amount <= 0)
                      return alert("Enter a valid amount");

                    try {
                      const res = await UserService.topUpWallet(amount);
                      setUser(res.data);
                      document.getElementById("topUpAmount").value = "";
                      alert("Wallet updated successfully!");
                    } catch (err) {
                      alert("Failed to update balance");
                    }
                  }}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow active:scale-95"
                >
                  Add Money
                </button>
              </div>
            </div>

            <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Simulation wallet for FarmXChain blockchain demo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Reusable Row ---------- */
const ProfileRow = ({ label, value }) => (
  <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="sm:col-span-2 text-sm text-gray-900">{value}</dd>
  </div>
);

export default UserProfile;
