import React, { useState, useEffect } from 'react';
import CropService from '../services/CropService';

const CropList = ({ crops: initialCrops, showVerification = true, onBuy }) => {

  /* ---------------- USER & ROLE CHECK ---------------- */
  const user = JSON.parse(localStorage.getItem('user'));
  const isBuyer = ['RETAILER', 'DISTRIBUTOR', 'CONSUMER'].includes(user?.role);

  /* ---------------- STATE VARIABLES ---------------- */
  const [crops, setCrops] = useState(initialCrops || []);
  const [verificationStatus, setVerificationStatus] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------------- SYNC PROPS WITH STATE ---------------- */
  useEffect(() => {
    if (initialCrops) {
      setCrops(initialCrops);
    }
  }, [initialCrops]);

  /* ---------------- BLOCKCHAIN VERIFICATION ---------------- */
  const verifyBlockchain = async (cropId) => {
    try {
      setLoading(true);
      const response = await CropService.verifyBlockchainRecord(cropId);

      setVerificationStatus(prev => ({
        ...prev,
        [cropId]: response.data
      }));
    } catch (error) {
      console.error('Blockchain verification failed:', error);
      setVerificationStatus(prev => ({
        ...prev,
        [cropId]: false
      }));
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DATE FORMATTER ---------------- */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  /* ---------------- EMPTY STATE ---------------- */
  if (crops.length === 0) {
    return (
      <div className="text-center py-14 bg-green-50 rounded-xl border border-green-200">
        <h3 className="text-lg font-bold text-green-800">🌱 No Plants Available</h3>
        <p className="text-sm text-green-600 mt-2">
          Farmers haven’t added crops yet. Please check back soon!
        </p>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {crops.map((crop) => (
        <div
          key={crop.id}
          className="bg-white rounded-2xl shadow-md border border-green-100 hover:shadow-xl transition-all flex flex-col overflow-hidden"
        >

          {/* ---------------- PLANT IMAGE ---------------- */}
          <div className="h-48 bg-green-100 relative">
            {crop.imageUrl ? (
              <img
                src={crop.imageUrl}
                alt={crop.cropName}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/600x400?text=Plant+Image';
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-green-300 text-6xl">
                🌿
              </div>
            )}

            {crop.blockchainHash && (
              <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                ✔ Traceable
              </span>
            )}
          </div>

          {/* ---------------- PLANT DETAILS ---------------- */}
          <div className="p-5 flex flex-col flex-1">

            <h2 className="text-xl font-bold text-green-800">
              {crop.cropName}
            </h2>

            <p className="text-sm text-gray-500 mb-2">
              Quantity: <strong>{crop.quantityKg} kg</strong>
            </p>

            {crop.pricePerKg && (
              <p className="text-lg font-bold text-green-700 mb-3">
                ₹ {crop.pricePerKg} / kg
              </p>
            )}

            {/* ---------------- FARMER INFO ---------------- */}
            {crop.farmer && (
              <div className="bg-green-50 p-3 rounded-lg text-sm mb-3">
                <p className="font-semibold text-green-700">
                  👩‍🌾 Farmer: {crop.farmer.user?.name}
                </p>
                <p className="text-gray-600">
                  🏡 Farm: {crop.farmer.farmName}
                </p>
              </div>
            )}

            {/* ---------------- HARVEST & ORIGIN ---------------- */}
            <div className="text-sm text-gray-600 space-y-2 flex-1">
              <p>🌾 Harvest Date: {formatDate(crop.harvestDate)}</p>
              <p>📍 Origin: {crop.originLocation || 'Unknown'}</p>
            </div>

            {/* ---------------- ACTIONS ---------------- */}
            <div className="mt-4 space-y-2">

              {showVerification && crop.blockchainHash && (
                <button
                  onClick={() => verifyBlockchain(crop.id)}
                  disabled={loading}
                  className="w-full border border-green-600 text-green-700 py-2 rounded-lg text-sm font-semibold hover:bg-green-50"
                >
                  {loading ? 'Verifying...' : 'Verify Plant Trace'}
                </button>
              )}

              {isBuyer && (
                <button
                  onClick={() => onBuy && onBuy(crop)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold"
                >
                  🌿 Buy Harvest
                </button>
              )}

              {verificationStatus[crop.id] !== undefined && (
                <div className={`text-center text-xs font-bold p-2 rounded ${
                  verificationStatus[crop.id]
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {verificationStatus[crop.id]
                    ? '✔ Blockchain Verified'
                    : '✖ Verification Failed'}
                </div>
              )}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CropList;
