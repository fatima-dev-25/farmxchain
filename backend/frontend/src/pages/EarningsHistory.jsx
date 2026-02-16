import React, { useState, useEffect } from "react";
import DistributorService from "../services/DistributorService";

const EarningsHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await DistributorService.getAssignedOrders();

      // ✅ SAFE handling for Spring Boot + Axios
      const orderData = response?.data || [];
      setOrders(orderData);

    } catch (err) {
      console.error("Error fetching earnings:", err);
      setError("Failed to load earnings history");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delivered orders only
  const deliveredOrders = orders.filter(
    (o) => o.status === "DELIVERED" && o.deliveryFee !== null
  );

  // ✅ Safe numeric calculation
  const totalEarnings = deliveredOrders.reduce(
    (sum, o) => sum + Number(o.deliveryFee || 0),
    0
  );

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-neutral-900 to-green-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-500 mx-auto"></div>
          <p className="mt-6 text-green-400 font-bold animate-pulse">
            Loading Plant Earnings 🌱
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-neutral-900 to-green-950 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* 🌿 Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-white">
            Earnings <span className="text-green-400">History</span>
          </h1>

          <button
            onClick={fetchOrders}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition"
          >
            Refresh
          </button>
        </div>

        {/* ❌ Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        {/* 🌱 Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-green-600 rounded-3xl p-8 shadow-xl">
            <p className="text-green-100 text-sm font-bold uppercase">
              Total Earnings
            </p>
            <p className="text-5xl font-black text-white mt-3">
              ₹{totalEarnings.toFixed(2)}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-neutral-400 text-sm font-bold uppercase">
              Deliveries Completed
            </p>
            <p className="text-5xl font-black text-white mt-3">
              {deliveredOrders.length}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-neutral-400 text-sm font-bold uppercase">
              Avg Delivery Fee
            </p>
            <p className="text-5xl font-black text-white mt-3">
              ₹
              {deliveredOrders.length > 0
                ? (totalEarnings / deliveredOrders.length).toFixed(2)
                : "0.00"}
            </p>
          </div>
        </div>

        {/* 🌾 Earnings Table */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="bg-green-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              Delivery Earnings
            </h2>
          </div>

          <div className="p-6 overflow-x-auto">
            {deliveredOrders.length > 0 ? (
              <table className="min-w-full text-white">
                <thead>
                  <tr className="text-green-400 text-sm uppercase">
                    <th className="px-4 py-3 text-left">Order ID</th>
                    <th className="px-4 py-3 text-left">Crop</th>
                    <th className="px-4 py-3 text-left">Total</th>
                    <th className="px-4 py-3 text-left">Your Fee</th>
                    <th className="px-4 py-3 text-left">Delivered On</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveredOrders.map((order) => (
                    <tr key={order.id} className="border-t border-white/10">
                      <td className="px-4 py-3 font-mono text-green-400">
                        #{order.id}
                      </td>
                      <td className="px-4 py-3">
                        {order.cropName} ({order.quantity} {order.unit})
                      </td>
                      <td className="px-4 py-3">
                        ₹{Number(order.totalPrice || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 font-bold text-green-400">
                        ₹{Number(order.deliveryFee).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-neutral-400">
                        {new Date(order.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16 text-neutral-400">
                🌱 No completed deliveries yet
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EarningsHistory;
