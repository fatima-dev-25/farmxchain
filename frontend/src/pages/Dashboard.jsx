import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-lime-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-green-600"></div>
          <p className="mt-4 text-green-700 font-medium">
            Preparing your farm dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-green-900">
            🌱 Welcome, {user.email}
          </h1>
          <p className="mt-2 text-green-700">
            Role: <span className="font-semibold">{user.role}</span>
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {/* FARMER DASHBOARD */}
          {user.role === 'FARMER' && (
            <>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="p-6">
                  <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                    🌾
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Farmer Profile
                  </h3>
                  <p className="text-green-600 text-sm mb-4">
                    View and update your personal and farm information.
                  </p>
                  <Link
                    to="/farmer-profile"
                    className="text-green-700 font-medium hover:text-green-900"
                  >
                    Open Profile →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="p-6">
                  <div className="bg-lime-100 rounded-lg p-3 w-fit mb-4">
                    🌱
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Crop Management
                  </h3>
                  <p className="text-green-600 text-sm mb-4">
                    Register crops and track them from soil to market using blockchain.
                  </p>
                  <Link
                    to="/crop-management"
                    className="text-lime-700 font-medium hover:text-lime-900"
                  >
                    Manage Crops →
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* ADMIN DASHBOARD */}
          {user.role === 'ADMIN' && (
            <>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="p-6">
                  <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                    👥
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    User Management
                  </h3>
                  <p className="text-green-600 text-sm mb-4">
                    Manage platform users and assign responsibilities.
                  </p>
                  <Link
                    to="/user-management"
                    className="text-blue-700 font-medium hover:text-blue-900"
                  >
                    Manage Users →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="p-6">
                  <div className="bg-amber-100 rounded-lg p-3 w-fit mb-4">
                    ✅
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Farmer Verification
                  </h3>
                  <p className="text-green-600 text-sm mb-4">
                    Verify farmer documents to maintain trust in the ecosystem.
                  </p>
                  <Link
                    to="/farmer-verification"
                    className="text-amber-700 font-medium hover:text-amber-900"
                  >
                    Verify Farmers →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="p-6">
                  <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                    📊
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Platform Insights
                  </h3>
                  <p className="text-green-600 text-sm mb-4">
                    Monitor crop flow, users, and blockchain activity.
                  </p>
                  <Link
                    to="/statistics"
                    className="text-purple-700 font-medium hover:text-purple-900"
                  >
                    View Analytics →
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* DISTRIBUTOR / RETAILER / CONSUMER */}
          {(user.role === 'DISTRIBUTOR' ||
            user.role === 'RETAILER' ||
            user.role === 'CONSUMER') && (
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="p-6">
                <div className="bg-orange-100 rounded-lg p-3 w-fit mb-4">
                  🚜
                </div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Farmers Directory
                </h3>
                <p className="text-green-600 text-sm mb-4">
                  Explore verified farmers and trace crop origins.
                </p>
                <Link
                  to="/farmer-list"
                  className="text-orange-700 font-medium hover:text-orange-900"
                >
                  Browse Farmers →
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
