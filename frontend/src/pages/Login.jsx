import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Logo from '../components/Logo';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /* -------- HANDLE INPUT CHANGE -------- */
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  /* -------- HANDLE LOGIN -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await AuthService.login(credentials);

      if (response.success) {
        window.location.href = '/dashboard';
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full">

        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
          
          {/* -------- LOGO & TITLE -------- */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Logo size="large" />
            </div>

            <h2 className="text-3xl font-bold text-green-800">
              Welcome Back 🌱
            </h2>
            <p className="text-green-600 text-sm mt-1">
              Login to manage your farm and supply chain
            </p>
          </div>

          {/* -------- LOGIN FORM -------- */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* -------- ERROR MESSAGE -------- */}
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* -------- EMAIL -------- */}
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={credentials.email}
                onChange={handleChange}
                placeholder="farmer@email.com"
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* -------- PASSWORD -------- */}
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* -------- SUBMIT BUTTON -------- */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              {loading ? 'Growing your access...' : 'Login'}
            </button>

            {/* -------- REGISTER LINK -------- */}
            <p className="text-center text-sm text-green-700">
              New to FarmXChain?{' '}
              <Link to="/register" className="font-semibold text-green-800 hover:underline">
                Create an account
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

