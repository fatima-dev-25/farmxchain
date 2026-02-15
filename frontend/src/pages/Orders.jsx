import React, { useState, useEffect } from 'react';
import OrderService from '../services/OrderService';
import LogisticsService from '../services/LogisticsService';
import FarmerService from '../services/FarmerService';
import AuthService from '../services/AuthService';
import { Link } from 'react-router-dom';

const Orders = () => {
  const user = AuthService.getCurrentUser();
  const isFarmer = user?.role === 'FARMER';

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [activeTab, setActiveTab] = useState('ACTIVE');

  // Distributor assignment
  const [distributors, setDistributors] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDistributor, setSelectedDistributor] = useState('');

  /* -------- INITIAL LOAD -------- */
  useEffect(() => {
    loadOrders();
    if (isFarmer) loadDistributors();
  }, []);

  /* -------- LOAD ORDERS -------- */
  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = isFarmer
        ? await OrderService.getMySales()
        : await OrderService.getMyPurchases();
      setOrders(res.data || []);
    } catch {
      setError('Unable to load farm orders');
    } finally {
      setLoading(false);
    }
  };

  /* -------- LOAD DISTRIBUTORS -------- */
  const loadDistributors = async () => {
    try {
      const res = await FarmerService.getDistributors();
      setDistributors(res.data || []);
    } catch {
      console.error('Distributor load failed');
    }
  };

  /* -------- ASSIGN DISTRIBUTOR -------- */
  const handleAssignDistributor = async () => {
    if (!selectedDistributor || !selectedOrder) {
      setError('Please select a distributor');
      return;
    }

    try {
      await FarmerService.assignOrderToDistributor(
        selectedOrder.id,
        selectedDistributor
      );
      setSuccess('🚜 Distributor assigned successfully');
      setShowAssignModal(false);
      loadOrders();
    } catch (err) {
      setError(err.message || 'Assignment failed');
    }
  };

  /* -------- UPDATE ORDER STATUS -------- */
  const handleUpdateStatus = async (orderId, status) => {
    try {
      setStatusUpdating(orderId);
      await OrderService.updateOrderStatus(orderId, status);
      await AuthService.getProfile();
      loadOrders();
      setSuccess(`Order ${status.toLowerCase()} successfully`);
    } catch (err) {
      setError(err.message || 'Status update failed');
    } finally {
      setStatusUpdating(null);
    }
  };

  /* -------- STATUS COLOR -------- */
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'ACCEPTED': return 'bg-green-100 text-green-800';
      case 'ASSIGNED': return 'bg-teal-100 text-teal-800';
      case 'IN_TRANSIT': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-emerald-100 text-emerald-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  /* -------- FILTER ORDERS -------- */
  const filteredOrders = orders.filter(order =>
    activeTab === 'ACTIVE'
      ? ['PENDING', 'ACCEPTED', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED'].includes(order.status)
      : ['COMPLETED', 'REJECTED'].includes(order.status)
  );

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-green-800">
          🌾 {isFarmer ? 'Farm Sales Dashboard' : 'My Crop Orders'}
        </h1>
        <p className="text-green-700 mt-2">
          Track your harvest transactions and supply chain progress
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-8">
        {['ACTIVE', 'PAST'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl font-bold ${
              activeTab === tab
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-700 border'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MESSAGES */}
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">{success}</div>}

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-20 text-green-700 font-bold animate-pulse">
          🌱 Syncing farm orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center text-green-600 py-20 bg-white rounded-xl shadow">
          No {activeTab.toLowerCase()} orders available
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow p-6 border border-green-100">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-green-800">
                  {order.cropName}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-green-700 mt-1">
                Quantity: {order.quantity} kg | ₹{order.totalPrice}
              </p>

              <div className="mt-4 flex gap-3 flex-wrap">
                {isFarmer && order.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'ACCEPTED')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'REJECTED')}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                  </>
                )}

                {isFarmer && order.status === 'ACCEPTED' && (
                  <button
                    onClick={() => { setSelectedOrder(order); setShowAssignModal(true); }}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                  >
                    Assign Distributor
                  </button>
                )}

                <Link
                  to={`/tracking/${order.id}`}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg"
                >
                  Track Shipment
                </Link>
              </div>

              {order.blockchainTxHash && (
                <div className="mt-4 text-xs text-green-600 font-mono">
                  🔗 Blockchain Tx: {order.blockchainTxHash}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ASSIGN MODAL */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              🚚 Assign Distributor
            </h3>

            <select
              className="w-full border px-4 py-2 rounded-lg mb-4"
              value={selectedDistributor}
              onChange={(e) => setSelectedDistributor(e.target.value)}
            >
              <option value="">Select distributor</option>
              {distributors.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignDistributor}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Orders;
