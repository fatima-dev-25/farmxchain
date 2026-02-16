import React, { useState, useEffect } from 'react';
import CropService from '../services/CropService';
import OrderService from '../services/OrderService';
import AuthService from '../services/AuthService';
import CropList from '../components/CropList';

const Marketplace = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderModal, setOrderModal] = useState({ show: false, crop: null });
  const [orderQuantity, setOrderQuantity] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  /* -------- LOAD CROPS ON PAGE LOAD -------- */
  useEffect(() => {
    loadCrops();
  }, []);

  const loadCrops = async () => {
    try {
      setLoading(true);
      const response = await CropService.getAllCrops();
      const sorted = (response.data || []).sort((a, b) => b.id - a.id);
      setCrops(sorted);
    } catch (err) {
      setError('Unable to load crops from the farm marketplace');
    } finally {
      setLoading(false);
    }
  };

  /* -------- OPEN ORDER MODAL -------- */
  const handleBuyClick = (crop) => {
    setOrderModal({ show: true, crop });
    setOrderQuantity(1);
    setDeliveryAddress('');
    setError('');
  };

  /* -------- PLACE ORDER -------- */
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const qty = Number(orderQuantity);
    if (!qty || qty <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    if (qty > orderModal.crop.quantityKg) {
      setError(`Only ${orderModal.crop.quantityKg} kg available`);
      return;
    }

    try {
      setOrderLoading(true);
      setError('');

      await OrderService.placeOrder({
        cropId: orderModal.crop.id,
        quantity: qty,
        deliveryAddress
      });

      await AuthService.getProfile();

      setSuccessMsg('🌱 Order placed successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = '/orders';
      }, 2000);

    } catch (err) {
      setError(err.message || 'Order failed');
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">

      {/* -------- PAGE HEADER -------- */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-green-800">
          🌾 Farm Marketplace
        </h1>
        <p className="mt-2 text-green-700">
          Buy fresh, verified crops directly from trusted farmers
        </p>
      </div>

      {/* -------- ERROR -------- */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* -------- LOADING / CROP LIST -------- */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-600 mx-auto"></div>
            <p className="mt-4 text-green-700 font-medium">
              Loading fresh harvest...
            </p>
          </div>
        ) : (
          <CropList crops={crops} showVerification={true} onBuy={handleBuyClick} />
        )}
      </div>

      {/* ================= ORDER MODAL ================= */}
      {orderModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-green-200 shadow-xl">

            <h2 className="text-2xl font-bold text-green-800 mb-4">
              🌱 Confirm Crop Purchase
            </h2>

            {/* -------- CROP DETAILS -------- */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-5 text-sm">
              <p><b>Crop:</b> {orderModal.crop.cropName}</p>
              <p><b>Farmer:</b> {orderModal.crop.farmer?.user?.name}</p>
              <p><b>Price:</b> ₹{orderModal.crop.pricePerKg}/kg</p>
              <p><b>Available:</b> {orderModal.crop.quantityKg} kg</p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">

              {/* -------- QUANTITY -------- */}
              <div>
                <label className="block text-sm font-semibold text-green-700 mb-1">
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  min="1"
                  max={orderModal.crop.quantityKg}
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* -------- ADDRESS -------- */}
              <div>
                <label className="block text-sm font-semibold text-green-700 mb-1">
                  Delivery Address
                </label>
                <textarea
                  rows="3"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
                  required
                />
              </div>

              {/* -------- TOTAL PRICE -------- */}
              <div>
                <p className="text-sm text-green-700">Total Price</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{(orderQuantity * orderModal.crop.pricePerKg || 0).toFixed(2)}
                </p>
              </div>

              {/* -------- SUCCESS -------- */}
              {successMsg && (
                <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg font-medium">
                  {successMsg}
                </div>
              )}

              {/* -------- ACTION BUTTONS -------- */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setOrderModal({ show: false, crop: null })}
                  className="flex-1 border border-green-300 text-green-700 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={orderLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  {orderLoading ? 'Processing...' : 'Confirm Order'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
