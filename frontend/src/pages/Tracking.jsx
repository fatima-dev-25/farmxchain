import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogisticsService from '../services/LogisticsService';

const Tracking = () => {
  const { orderId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const isFarmer = user?.role === 'FARMER';

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadShipment();
  }, [orderId]);

  const loadShipment = async () => {
    try {
      setLoading(true);
      const res = await LogisticsService.getShipmentByOrder(orderId);
      setShipment(res.data);
    } catch {
      setError('Shipment tracking information not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-600"></div>
        <p className="mt-4 text-green-700 font-semibold">Loading tracking data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white border border-green-200 rounded-2xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">
            📦 Shipment Tracking
          </h1>
          <p className="text-green-700">
            Order ID: <span className="font-mono font-semibold">#{orderId}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {shipment && (
          <div className="space-y-8">

            {/* Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard title="Current Status" value={shipment.status.replace('_', ' ')} />
              <InfoCard title="Current Location" value={shipment.currentLocation} />
              <InfoCard
                title="Last Updated"
                value={new Date(shipment.lastUpdated).toLocaleString()}
              />
            </div>

            {/* Environment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard
                title="Temperature"
                value={`${shipment.temperature} °C`}
                color="bg-blue-100 text-blue-800"
              />
              <MetricCard
                title="Humidity"
                value={`${shipment.humidity} %`}
                color="bg-purple-100 text-purple-800"
              />
            </div>

            {/* Blockchain */}
            {shipment.blockchainTxHash && (
              <div className="bg-green-100 border border-green-300 rounded-2xl p-6 shadow">
                <p className="text-sm font-semibold text-green-800 mb-2">
                  🔗 Blockchain Verified
                </p>
                <p className="text-xs font-mono break-all text-green-700">
                  {shipment.blockchainTxHash}
                </p>
              </div>
            )}

            {/* Logs */}
            <div className="bg-white border border-green-200 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-green-900 mb-6">
                📜 Shipment History
              </h2>

              {shipment.logs?.length > 0 ? (
                <div className="space-y-4">
                  {shipment.logs.map((log, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-lg py-3"
                    >
                      <p className="font-semibold text-green-900">
                        {log.action.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-green-700">
                        📍 {log.location || 'Unknown location'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(log.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-green-700">No shipment logs available yet.</p>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

/* Reusable Components */
const InfoCard = ({ title, value }) => (
  <div className="bg-white border border-green-200 rounded-2xl shadow p-6">
    <p className="text-sm font-semibold text-green-700 mb-1">{title}</p>
    <p className="text-lg font-bold text-green-900">{value}</p>
  </div>
);

const MetricCard = ({ title, value, color }) => (
  <div className={`rounded-2xl shadow p-6 ${color}`}>
    <p className="text-sm font-semibold mb-1">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Tracking;
