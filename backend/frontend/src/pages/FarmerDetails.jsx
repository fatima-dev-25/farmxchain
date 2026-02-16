import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FarmerService from '../services/FarmerService';

const FarmerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const response = await FarmerService.getFarmerById(id);

        // SAFER: handle different API response shapes
        const farmerData = response?.data?.data || response?.data || null;

        if (!farmerData) {
          throw new Error('Farmer data not found');
        }

        setFarmer(farmerData);
      } catch (err) {
        console.error(err);
        setError('Failed to load farmer details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFarmer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-indigo-600 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!farmer) return <div className="text-center mt-10">Farmer not found</div>;

  const userInitial =
    farmer?.user?.email?.charAt(0)?.toUpperCase() || 'F';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:underline mb-6"
        >
          ← Back to Directory
        </button>

        <div className="bg-white shadow rounded-lg overflow-hidden">

          {/* Header */}
          <div className="bg-indigo-600 px-6 py-8 flex items-center">
            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-indigo-600 text-3xl font-bold">
              {userInitial}
            </div>
            <div className="ml-6 text-white">
              <h1 className="text-3xl font-bold">
                {farmer.farmName || 'Farm Name Not Set'}
              </h1>
              <p className="mt-2 text-indigo-100">
                📍 {farmer.farmLocation || 'Location not provided'}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Farm Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Farm Details</h2>
              <Detail label="Crop Type" value={farmer.cropType} />
              <Detail label="Varieties" value={farmer.cropVarieties} />
              <Detail label="Farm Size" value={`${farmer.farmSizeAcres || 0} acres`} />
              <Detail label="Farming Method" value={farmer.farmingMethod} />
              <Detail label="Certification" value={farmer.certification || 'None'} />
            </div>

            {/* Verification */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Verification Status</h2>

              <div className="bg-gray-50 border rounded-lg p-6">
                <div className="flex justify-between mb-4">
                  <span>Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${farmer.verificationStatus === 'VERIFIED'
                        ? 'bg-green-100 text-green-800'
                        : farmer.verificationStatus === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'}
                    `}
                  >
                    {farmer.verificationStatus || 'UNKNOWN'}
                  </span>
                </div>

                {farmer.verifiedAt && (
                  <div className="flex justify-between">
                    <span>Verified On</span>
                    <span>
                      {new Date(farmer.verifiedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <p className="mt-4 text-sm text-gray-600">
                  Experienced farmer with {farmer.experienceYears || 0} years
                  of experience in {farmer.cropType || 'farming'}.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Row Component */
const Detail = ({ label, value }) => (
  <div className="flex justify-between border-b py-2 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-900">{value || 'N/A'}</span>
  </div>
);

export default FarmerDetails;
