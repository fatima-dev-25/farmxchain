import React, { useState, useEffect } from 'react';
import AdminService from '../services/AdminService';

const AdminCropLogistics = () => {

    /* ---------- STATE VARIABLES ---------- */

    const [shipments, setShipments] = useState([]);
    const [logisticsPartners, setLogisticsPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [search, setSearch] = useState('');
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [selectedPartner, setSelectedPartner] = useState('');

    /* ---------- INITIAL DATA LOAD ---------- */

    useEffect(() => {
        fetchShipments();
        fetchLogisticsPartners();
    }, []);

    /* ---------- FETCH LOGISTICS PARTNERS ---------- */

    const fetchLogisticsPartners = async () => {
        try {
            const response = await AdminService.getDistributors();
            setLogisticsPartners(response.data || []);
        } catch (err) {
            console.error("Failed to load logistics partners", err);
        }
    };

    /* ---------- FETCH CROP SHIPMENTS ---------- */

    const fetchShipments = async () => {
        try {
            setLoading(true);
            const response = await AdminService.getPlatformOrders();
            setShipments(response.data || []);
        } catch (err) {
            setError("Unable to load crop shipment records.");
        } finally {
            setLoading(false);
        }
    };

    /* ---------- STATUS BADGE UI ---------- */

    const getStatusBadge = (status) => {
        const colors = {
            PENDING: "bg-yellow-100 text-yellow-800",
            ACCEPTED: "bg-lime-100 text-lime-800",
            ASSIGNED: "bg-green-100 text-green-800",
            IN_TRANSIT: "bg-emerald-100 text-emerald-800",
            DELIVERED: "bg-teal-100 text-teal-800",
            COMPLETED: "bg-green-200 text-green-900",
            CANCELLED: "bg-red-100 text-red-800",
            REJECTED: "bg-red-100 text-red-800"
        };

        return (
            <span className={`px-2 py-1 text-xs font-bold rounded-full ${colors[status] || "bg-gray-100"}`}>
                {status}
            </span>
        );
    };

    /* ---------- ASSIGN LOGISTICS PARTNER ---------- */

    const assignPartner = async () => {
        if (!selectedShipment || !selectedPartner) {
            setError("Please select a logistics partner.");
            return;
        }

        try {
            await AdminService.assignOrderToDistributor(
                selectedShipment.id,
                selectedPartner
            );

            setSuccess(`Shipment #${selectedShipment.id} assigned successfully 🌱`);
            setShowAssignModal(false);
            setSelectedShipment(null);
            setSelectedPartner('');
            fetchShipments();

            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError("Assignment failed.");
        }
    };

    /* ---------- FILTER SHIPMENTS ---------- */

    const filteredShipments = shipments.filter(item =>
        item.id.toString().includes(search) ||
        item.cropName?.toLowerCase().includes(search.toLowerCase()) ||
        item.buyerName?.toLowerCase().includes(search.toLowerCase())
    );

    /* ---------- LOADING SCREEN ---------- */

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-b-4 border-green-600 rounded-full"></div>
            </div>
        );
    }

    /* ---------- MAIN UI ---------- */

    return (
        <div className="min-h-screen bg-green-50 p-8">

            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-green-900">
                        🌿 Crop Logistics Panel
                    </h1>
                    <p className="text-sm text-green-700">
                        Monitor and manage plant shipments across the supply chain.
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Search crop, buyer, ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded-md"
                />
            </div>

            {/* Alerts */}
            {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{success}</div>}

            {/* Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-green-100 text-green-800">
                        <tr>
                            <th className="px-6 py-3 text-left">Shipment ID</th>
                            <th className="px-6 py-3 text-left">Grower</th>
                            <th className="px-6 py-3 text-left">Buyer</th>
                            <th className="px-6 py-3 text-left">Plant Batch</th>
                            <th className="px-6 py-3 text-right">Value</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredShipments.map(shipment => (
                            <tr key={shipment.id} className="border-t hover:bg-green-50">
                                <td className="px-6 py-3 font-semibold">#{shipment.id}</td>
                                <td className="px-6 py-3">{shipment.farmName}</td>
                                <td className="px-6 py-3">{shipment.buyerName}</td>
                                <td className="px-6 py-3">
                                    {shipment.cropName} ({shipment.quantity} kg)
                                </td>
                                <td className="px-6 py-3 text-right">
                                    ₹{shipment.totalPrice}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    {getStatusBadge(shipment.status)}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    {shipment.status === "ACCEPTED" && !shipment.distributorId && (
                                        <button
                                            onClick={() => {
                                                setSelectedShipment(shipment);
                                                setShowAssignModal(true);
                                            }}
                                            className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Assign Partner
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Assignment Modal */}
            {showAssignModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">
                            Assign Logistics Partner
                        </h3>

                        <select
                            className="w-full border p-2 mb-4"
                            value={selectedPartner}
                            onChange={(e) => setSelectedPartner(e.target.value)}
                        >
                            <option value="">Select partner</option>
                            {logisticsPartners.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={assignPartner}
                                className="px-4 py-2 bg-green-600 text-white rounded"
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

export default AdminCropLogistics;
