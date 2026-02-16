import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";

/**
 * DistributorDashboard
 * Dashboard for distributors to manage crop supply,
 * view farmers, and track plant-based supply chain.
 */
const DistributorDashboard = () => {
  const [user, setUser] = useState(null);

  // Load logged-in distributor details
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // Loading state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-600"></div>
          <p className="mt-4 text-green-700 font-semibold">
            Preparing your farm dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-green-900">
            Welcome, {user.email}
          </h1>
          <p className="text-green-700 mt-2">
            Role: <span className="font-semibold">{user.role}</span>
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* View Farmers */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
            <div className="bg-green-100 p-3 rounded-lg inline-block mb-4">
              🌾
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">
              Farmers Network
            </h3>
            <p className="text-gray-600 mb-4">
              Browse verified farmers and explore available crops.
            </p>
            <Link
              to="/farmer-list"
              className="text-green-600 font-medium hover:text-green-800"
            >
              View Farmers →
            </Link>
          </div>

          {/* Crop Supply */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
            <div className="bg-lime-100 p-3 rounded-lg inline-block mb-4">
              🌱
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">
              Crop Supply Chain
            </h3>
            <p className="text-gray-600 mb-4">
              Track plant products from farm to distributor.
            </p>
            <Link
              to="/supply-chain"
              className="text-lime-600 font-medium hover:text-lime-800"
            >
              Track Supply →
            </Link>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
            <div className="bg-emerald-100 p-3 rounded-lg inline-block mb-4">
              🚚
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">
              Crop Orders
            </h3>
            <p className="text-gray-600 mb-4">
              Manage plant produce orders and logistics.
            </p>
            <Link
              to="/orders"
              className="text-emerald-600 font-medium hover:text-emerald-800"
            >
              Manage Orders →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;
