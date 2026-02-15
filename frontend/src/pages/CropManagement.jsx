import React, { useState, useEffect } from 'react';
import CropService from '../services/CropService';
import CropList from '../components/CropList';
import LocationPicker from '../components/LocationPicker';

const CropManagement = () => {

  /* ---------- STATE DECLARATIONS ---------- */

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    cropName: '',
    quantityKg: '',
    harvestDate: '',
    originLocation: '',
    qualityData: '',
    soilType: '',
    pesticidesUsed: '',
    imageUrl: '',
    pricePerKg: ''
  });

  /* ---------- LOAD CROPS ON PAGE LOAD ---------- */

  useEffect(() => {
    loadCrops();
  }, []);

  const loadCrops = async () => {
    try {
      setLoading(true);
      const response = await CropService.getMyCrops();
      const sorted = (response.data || []).sort((a, b) => b.id - a.id);
      setCrops(sorted);
    } catch (err) {
      setError('Failed to load crops');
    } finally {
      setLoading(false);
    }
  };

  /* ---------- FORM INPUT HANDLER ---------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ---------- LOCATION HANDLER ---------- */

  const handleLocationSelect = (location) => {
    setFormData(prev => ({ ...prev, originLocation: location }));
  };

  /* ---------- IMAGE UPLOAD ---------- */

  const handleImageChange = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    setUploading(true);
    setError('');

    try {
      const response = await CropService.uploadFile(file);
      if (response && response.data) {
        setFormData(prev => ({ ...prev, imageUrl: response.data }));
      } else {
        setError('Image upload failed');
      }
    } catch (err) {
      setError('Failed to upload image');
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    } finally {
      setUploading(false);
    }
  };

  /* ---------- FORM SUBMISSION ---------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        ...formData,
        quantityKg: parseFloat(formData.quantityKg),
        pricePerKg: parseFloat(formData.pricePerKg)
      };

      await CropService.addCrop(payload);

      setSuccess('Crop added successfully and registered on blockchain 🌱');
      setShowAddForm(false);
      resetForm();
      loadCrops();
    } catch (err) {
      setError(err.message || 'Failed to add crop');
    } finally {
      setLoading(false);
    }
  };

  /* ---------- RESET FORM ---------- */

  const resetForm = () => {
    setFormData({
      cropName: '',
      quantityKg: '',
      harvestDate: '',
      originLocation: '',
      qualityData: '',
      soilType: '',
      pesticidesUsed: '',
      imageUrl: '',
      pricePerKg: ''
    });
  };

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Crop Management</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add New Crop
          </button>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{success}</div>}

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-lg font-semibold mb-4">Add New Crop</h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <input name="cropName" placeholder="Crop Name"
                value={formData.cropName} onChange={handleInputChange}
                className="border p-2 rounded" required />

              <input name="quantityKg" type="number" placeholder="Quantity (kg)"
                value={formData.quantityKg} onChange={handleInputChange}
                className="border p-2 rounded" required />

              <input name="pricePerKg" type="number" placeholder="Price per kg"
                value={formData.pricePerKg} onChange={handleInputChange}
                className="border p-2 rounded" required />

              <input name="harvestDate" type="datetime-local"
                value={formData.harvestDate} onChange={handleInputChange}
                className="border p-2 rounded" required />

              <LocationPicker onLocationSelect={handleLocationSelect} />

              <input type="file" accept="image/*" onChange={handleImageChange} />

              <textarea name="qualityData" placeholder="Quality details"
                value={formData.qualityData} onChange={handleInputChange}
                className="border p-2 rounded col-span-2" />

              <div className="col-span-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddForm(false)} className="border px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" disabled={uploading || loading}
                  className="bg-green-600 text-white px-4 py-2 rounded">
                  {loading ? 'Adding...' : 'Add Crop'}
                </button>
              </div>
            </form>
          </div>
        )}

        <CropList crops={crops} />

      </div>
    </div>
  );
};

export default CropManagement;
