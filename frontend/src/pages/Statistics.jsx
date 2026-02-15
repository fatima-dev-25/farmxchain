import React, { useState, useEffect, useCallback } from 'react';
import AdminService from '../services/AdminService';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white border border-green-200 rounded-2xl shadow-xl">
    <div className="p-6 flex items-center gap-4">
      <div className={`p-4 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-green-700">{title}</p>
        <p className="text-2xl font-bold text-green-900">{value}</p>
      </div>
    </div>
  </div>
);

const Statistics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFarmers: 0,
    pendingVerifications: 0,
    activeUsers: 0,
    verifiedFarmers: 0,
    rejectedUsers: 0,
    suspendedUsers: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStatistics = useCallback(async () => {
    try {
      const [farmersData, usersData, pendingFarmersData] = await Promise.all([
        AdminService.getTotalFarmersCount(),
        AdminService.getTotalUsersCount(),
        AdminService.getPendingFarmers()
      ]);

      setStats({
        totalFarmers: farmersData.data || 0,
        totalUsers: usersData.data || 0,
        pendingVerifications: pendingFarmersData.data?.length || 0,
        activeUsers: usersData.data || 0,
        verifiedFarmers: 0,
        rejectedUsers: 0,
        suspendedUsers: 0
      });
    } catch {
      setError('Failed to load platform statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-700 font-semibold">
            Loading statistics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-green-900">
            📊 Platform Statistics
          </h1>
          <button
            onClick={loadStatistics}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Refresh Stats
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Main Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Users" value={stats.totalUsers} color="bg-green-600"
            icon={<span className="text-white text-xl">👥</span>} />
          <StatCard title="Total Farmers" value={stats.totalFarmers} color="bg-emerald-600"
            icon={<span className="text-white text-xl">🌾</span>} />
          <StatCard title="Verified Farmers" value={stats.verifiedFarmers} color="bg-teal-600"
            icon={<span className="text-white text-xl">✅</span>} />
          <StatCard title="Active Users" value={stats.activeUsers} color="bg-lime-600"
            icon={<span className="text-white text-xl">⚡</span>} />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard title="Pending Verifications" value={stats.pendingVerifications}
            color="bg-yellow-500" icon={<span className="text-white text-xl">⏳</span>} />
          <StatCard title="Rejected Users" value={stats.rejectedUsers}
            color="bg-red-500" icon={<span className="text-white text-xl">❌</span>} />
          <StatCard title="Suspended Users" value={stats.suspendedUsers}
            color="bg-orange-500" icon={<span className="text-white text-xl">⚠️</span>} />
        </div>

        {/* Overview Section */}
        <div className="bg-white border border-green-200 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            🌱 Platform Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-4">
                User Distribution
              </h3>
              <div className="space-y-3">
                <p className="flex justify-between">
                  <span>Farmers</span>
                  <span className="font-bold">{stats.totalFarmers}</span>
                </p>
                <p className="flex justify-between"><span>Distributors</span><span>0</span></p>
                <p className="flex justify-between"><span>Retailers</span><span>0</span></p>
                <p className="flex justify-between"><span>Consumers</span><span>0</span></p>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-4">
                Verification Status
              </h3>
              <div className="space-y-3">
                <p className="flex justify-between"><span>Verified</span><span>{stats.verifiedFarmers}</span></p>
                <p className="flex justify-between"><span>Pending</span><span>{stats.pendingVerifications}</span></p>
                <p className="flex justify-between"><span>Rejected</span><span>{stats.rejectedUsers}</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Statistics;
