import React, { useState, useEffect, useCallback } from 'react';
import FarmerService from '../services/FarmerService';

const FarmerList = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');

  const loadFarmers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = selectedCrop
        ? await FarmerService.getFarmersByCrop(selectedCrop)
        : await FarmerService.getAllFarmers();

      // SAFELY handle different API shapes
      const farmerList =
        response?.data?.data ||
        response?.data?.farmers ||
        response?.data ||
        [];

      setFarmers(Array.isArray(farmerList) ? farmerList : []);
    } catch (err) {
      console.error(err);
      setError('Failed to load farmers');
      setFarmers([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCrop]);

  useEffect(() => {
    loadFarmers();
  }, [loadFarmers]);

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-600">Loading farmers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Farmers Directory</h1>

          <div className="flex gap-3">
            <select
              value={selectedCrop}
              onChange={handleCropChange}
              className="px-3 py-2 border rounded-md text-sm focus:ring-indigo-500"
            >
              <option value="">All Crops</option>
              <option value="WHEAT">Wheat</option>
              <option value="RICE">Rice</option>
              <option value="CORN">Corn</option>
              <option value="SOYBEAN">Soybean</option>
              <option value="COTTON">Cotton</option>
              <option value="SUGARCANE">Sugarcane</option>
              <option value="POTATO">Potato</option>
              <option value="TOMATO">Tomato</option>
              <option value="ONION">Onion</option>
              <option value="OTHER">Other</option>
            </select>

            <button
              onClick={loadFarmers}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Farmer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No farmers found
              {selectedCrop && ` for ${selectedCrop}`}
            </div>
          ) : (
            farmers.map((farmer) => {
              const email = farmer?.user?.email || 'Email not available';

              return (
                <div
                  key={farmer.id}
                  className="bg-white shadow rounded-lg p-6"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                      {email.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{email}</h3>
                      <p className="text-sm text-gray-500">
                        {farmer.farmLocation || 'Location not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Crop</p>
                      <p>{farmer.cropType || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Farm Size</p>
                      <p>{farmer.farmSizeAcres || 0} acres</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                        ${
                          farmer.verificationStatus === 'VERIFIED'
                            ? 'bg-green-100 text-green-800'
                            : farmer.verificationStatus === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {farmer.verificationStatus || 'UNKNOWN'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerList;
