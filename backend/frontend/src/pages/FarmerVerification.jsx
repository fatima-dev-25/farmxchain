import React, { useState, useEffect } from 'react';
import AdminService from '../services/AdminService';

const FarmerVerification = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadVerifications();
  }, []);

  const loadVerifications = async () => {
    try {
      const data = await AdminService.getPendingFarmers();
      setVerifications(data.data || []);
    } catch (err) {
      setError('Failed to load farmer verifications');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (farmerId, action) => {
    try {
      setError('');
      setSuccess('');

      if (action === 'verify') {
        await AdminService.verifyFarmer(farmerId);
        setSuccess('Farmer verified successfully');
      } else {
        const reason = prompt('Please provide a reason for rejection:');
        if (reason) {
          await AdminService.rejectFarmer(farmerId, reason);
          setSuccess('Farmer rejected successfully');
        }
      }
      loadVerifications();
    } catch (err) {
      setError(err.message || 'Action failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-green-600"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading verification requests...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Farmer Verification
            </h1>
            <p className="text-gray-500 mt-1">
              Review and approve registered farmers
            </p>
          </div>

          <button
            onClick={loadVerifications}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow"
          >
            Refresh
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-100 border border-red-300 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg bg-green-100 border border-green-300 px-4 py-3 text-green-700">
            {success}
          </div>
        )}

        {/* Content */}
        {verifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              No pending verifications
            </h3>
            <p className="text-gray-500 mt-1">
              All farmers are already verified 🎉
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verifications.map((farmer) => (
              <div
                key={farmer.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6"
              >
                {/* Farmer Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {farmer.user.email}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ID: #{farmer.id}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                </div>

                {/* Farmer Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Farm Location</p>
                    <p className="font-medium text-gray-900">
                      {farmer.farmLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Crop Type</p>
                    <p className="font-medium text-gray-900">
                      {farmer.cropType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Farm Size</p>
                    <p className="font-medium text-gray-900">
                      {farmer.farmSize} acres
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Bank Account</p>
                    <p className="font-medium text-gray-900">
                      {farmer.bankAccount || 'Not provided'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => handleAction(farmer.id, 'reject')}
                    className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 text-sm font-medium"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(farmer.id, 'verify')}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm font-medium"
                  >
                    Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerVerification;
