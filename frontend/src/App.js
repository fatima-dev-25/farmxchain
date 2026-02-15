import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import AuthService from './services/AuthService';
import AuthGuard from './utils/AuthGuard';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FarmerProfile from './pages/FarmerProfile';
import CropManagement from './pages/CropManagement';
import UserManagement from './pages/UserManagement';
import FarmerVerification from './pages/FarmerVerification';
import AdminDashboard from './pages/AdminDashboard';
import FarmerList from './pages/FarmerList';
import Statistics from './pages/Statistics';
import UserList from './pages/UserList';
import Marketplace from './pages/Marketplace';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import UserProfile from './pages/UserProfile';
import FarmerDetails from './pages/FarmerDetails';
import AdminOrders from './pages/AdminOrders';
import DistributorDashboard from './pages/DistributorDashboard';
import EarningsHistory from './pages/EarningsHistory';

import Logo from './components/Logo';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
      setCurrentUser(AuthService.getCurrentUser());
    };

    syncAuthState();

    window.addEventListener('storage', syncAuthState);
    window.addEventListener('authChange', syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener('authChange', syncAuthState);
    };
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="min-h-screen bg-green-50">
        {isAuthenticated && (
          <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-green-200">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">

                {/* 🌿 Logo Section */}
                <div className="flex items-center space-x-8">
                  <Logo className="h-10" />

                  <div className="hidden sm:flex space-x-6">
                    {currentUser?.role !== 'ADMIN' && (
                      <Link to="/dashboard" className="nav-link">My Farm</Link>
                    )}

                    {currentUser?.role !== 'DISTRIBUTOR' && (
                      <Link to="/marketplace" className="nav-link">Plant Market</Link>
                    )}

                    {currentUser?.role === 'FARMER' && (
                      <>
                        <Link to="/farmer-profile" className="nav-link">Farmer Profile</Link>
                        <Link to="/crop-management" className="nav-link">Crop Records</Link>
                      </>
                    )}

                    {currentUser?.role === 'ADMIN' && (
                      <>
                        <Link to="/admin-dashboard" className="nav-link">Admin Panel</Link>
                        <Link to="/user-management" className="nav-link">User Control</Link>
                        <Link to="/farmer-verification" className="nav-link">Farmer Approval</Link>
                        <Link to="/statistics" className="nav-link">Agri Stats</Link>
                        <Link to="/admin/orders" className="nav-link">Trade Logs</Link>
                      </>
                    )}

                    {currentUser?.role === 'DISTRIBUTOR' && (
                      <>
                        <Link to="/distributor-dashboard" className="nav-link">Logistics</Link>
                        <Link to="/earnings" className="nav-link">Revenue</Link>
                      </>
                    )}

                    <Link to="/farmer-list" className="nav-link">Farmers</Link>
                  </div>
                </div>

                {/* 🌾 User Section */}
                <div className="hidden sm:flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-800">{currentUser?.name}</p>
                    <p className="text-xs uppercase text-green-500">{currentUser?.role}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  >
                    Logout
                  </button>
                </div>

              </div>
            </div>
          </nav>
        )}

        {/* 🌿 Application Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/marketplace" element={<AuthGuard><Marketplace /></AuthGuard>} />

          <Route path="/farmer-profile" element={<AuthGuard requiredRole="FARMER"><FarmerProfile /></AuthGuard>} />
          <Route path="/crop-management" element={<AuthGuard requiredRole="FARMER"><CropManagement /></AuthGuard>} />

          <Route path="/admin-dashboard" element={<AuthGuard requiredRole="ADMIN"><AdminDashboard /></AuthGuard>} />
          <Route path="/statistics" element={<AuthGuard requiredRole="ADMIN"><Statistics /></AuthGuard>} />

          <Route path="/orders" element={<AuthGuard><Orders /></AuthGuard>} />
          <Route path="/tracking/:orderId" element={<AuthGuard><Tracking /></AuthGuard>} />

          <Route path="/distributor-dashboard" element={<AuthGuard requiredRole="DISTRIBUTOR"><DistributorDashboard /></AuthGuard>} />
          <Route path="/earnings" element={<AuthGuard requiredRole="DISTRIBUTOR"><EarningsHistory /></AuthGuard>} />

          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
