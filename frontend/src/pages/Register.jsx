import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Logo from '../components/Logo';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'FARMER'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await AuthService.register(formData);
      if (response.success) {
        setSuccess('🌱 Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-200">

          {/* Header */}
          <div className="text-center mb-6">
            <Logo size="large" className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-green-800">
              🌾 Join FarmXChain
            </h2>
            <p className="text-green-700 mt-1">
              Grow with trusted agricultural trade
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@email.com"
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="FARMER">Farmer 🌱</option>
                <option value="DISTRIBUTOR">Distributor 🚚</option>
                <option value="RETAILER">Retailer 🏪</option>
                <option value="CONSUMER">Consumer 🛒</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-1">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-green-700">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-green-800 hover:underline">
                Sign in
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
