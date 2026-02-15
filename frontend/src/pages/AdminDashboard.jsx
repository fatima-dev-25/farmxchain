import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AdminService from '../services/AdminService';

/* Reusable Stat Card Component */
const StatCard = ({ title, value, icon, color, link }) => (
  <div className="bg-white shadow-lg rounded-xl border border-green-100 hover:shadow-xl transition-transform hover:scale-105">
    <div className="p-6">
      <div className="flex items-center">
        <div className={`p-4 rounded-xl ${color}`}>
          {icon}
        </div>
        <div className="ml-6">
          <p className="text-sm font-semibold text-gray-600 uppercase">{title}</p>
          <p className="text-3xl font-bold text-green-800">{value}</p>
        </div>
      </div>

      {link && (
        <div className="mt-4">
          <Link
            to={link}
            className="text-green-600 font-semibold hover:text-green-800"
          >
            View Growth Details →
          </Link>
        </div>
      )}
    </div>
  </div>
);

const AdminDashboard = () => {

  /* State to store dashboard metrics */
  const [stats, setStats] = useState({
    totalGrowers: 0,
    totalPlants: 0,
    pendingApprovals: 0,
    activeUsers: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /* Fetch statistics from backend */
  const loadStatistics = useCallback(async () => {
    try {
      const [growers, users, pending] = await Promise.all([
        AdminService.getTotalFarmersCount(),
        AdminService.getTotalUsersCount(),
        AdminService.getPendingFarmers()
      ]);

      setStats({
        totalGrowers: growers.data || 0,
        totalPlants: users.data || 0,
        pendingApprovals: pending.data ? pending.data.length : 0,
        activeUsers: users.data || 0
      });

    } catch (err) {
      setError("Unable to load plant growth statistics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  /* Loading Screen */
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-900">
          🌱 Greenhouse Control Panel
        </h1>

        <button
          onClick={loadStatistics}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Refresh Growth Data
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Crop Transactions"
          value="View All"
          color="bg-green-600"
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6v6l4 2" />
            </svg>
          }
          link="/admin/crop-transactions"
        />
      </div>

      {/* Grower Management Section */}
      <div className="mt-10">
        <Link to="/grower-management">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 rounded-xl text-white shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">🌿 Grower & Plant Registry</h2>
                <p className="text-green-100 mt-1">
                  Manage growers, crops, plant status, and approvals
                </p>
              </div>
              <span className="text-xl font-bold">
                {stats.totalGrowers} Growers
              </span>
            </div>
          </div>
        </Link>
      </div>

    </div>
  );
};

export default AdminDashboard;
