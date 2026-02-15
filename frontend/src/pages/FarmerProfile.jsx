import React, { useState, useEffect } from 'react';
import FarmerService from '../services/FarmerService';

const FarmerProfile = () => {
  const [profile, setProfile] = useState({
    farmName: '',
    farmLocation: '',
    cropType: '',
    farmSizeAcres: '',
    bankAccountNumber: '',
    bankIfscCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await FarmerService.getFarmerProfile();
      if (data.data) setProfile(data.data);
    } catch {}
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (profile.id) {
        await FarmerService.updateFarmerProfile(profile);
        setSuccess('Profile updated successfully!');
      } else {
        await FarmerService.createFarmerProfile(profile);
        setSuccess('Profile created successfully!');
      }
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farmer Profile</h1>
            <p className="text-gray-500 mt-1">Manage your farm and banking details</p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow"
            >
              {profile.id ? 'Edit Profile' : 'Create Profile'}
            </button>
          )}
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

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Farm Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    ['farmName', 'Farm Name'],
                    ['farmLocation', 'Farm Location'],
                    ['farmSizeAcres', 'Farm Size (acres)', 'number'],
                    ['bankAccountNumber', 'Bank Account Number'],
                    ['bankIfscCode', 'IFSC Code']
                  ].map(([name, label, type = 'text']) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={profile[name]}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required={name !== 'bankAccountNumber' && name !== 'bankIfscCode'}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Crop Type
                    </label>
                    <select
                      name="cropType"
                      value={profile.cropType}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 px-3 py-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select crop</option>
                      {['WHEAT','RICE','CORN','SOYBEAN','COTTON','SUGARCANE','POTATO','TOMATO','ONION','OTHER']
                        .map(crop => (
                          <option key={crop} value={crop}>{crop}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                {profile.id ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      ['Farm Name', profile.farmName],
                      ['Location', profile.farmLocation],
                      ['Crop Type', profile.cropType],
                      ['Farm Size', profile.farmSizeAcres ? `${profile.farmSizeAcres} acres` : '—'],
                      ['Bank Account', profile.bankAccountNumber || '—'],
                      ['IFSC Code', profile.bankIfscCode || '—']
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-gray-200 p-4 bg-gray-50"
                      >
                        <p className="text-sm text-gray-500">{label}</p>
                        <p className="mt-1 text-gray-900 font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">
                      No profile found
                    </h3>
                    <p className="text-gray-500 mt-1">
                      Create your farmer profile to get started.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
