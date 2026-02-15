import React, { useState, useEffect } from "react";
import AdminService from "../services/AdminService";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentTab, setCurrentTab] = useState("ALL");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await AdminService.getAllUsers();
      setUsers(data.data || []);
      setError("");
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredUsers = () => {
    if (currentTab === "ALL") return users;
    return users.filter((u) => u.role === currentTab);
  };

  const getRoleCounts = () => {
    const counts = {
      ALL: users.length,
      FARMER: 0,
      DISTRIBUTOR: 0,
      RETAILER: 0,
      CONSUMER: 0,
      ADMIN: 0,
    };
    users.forEach((u) => counts[u.role] !== undefined && counts[u.role]++);
    return counts;
  };

  const counts = getRoleCounts();

  const tabs = [
    { id: "ALL", label: "All Users" },
    { id: "FARMER", label: "Farmers" },
    { id: "DISTRIBUTOR", label: "Distributors" },
    { id: "RETAILER", label: "Retailers" },
    { id: "CONSUMER", label: "Consumers" },
  ];

  const handleAction = async (userId, action) => {
    try {
      setError("");
      setSuccess("");

      if (action === "verify") await AdminService.verifyUser(userId);
      if (action === "reject") await AdminService.rejectUser(userId);
      if (action === "suspend") await AdminService.suspendUser(userId);
      if (action === "activate") await AdminService.activateUser(userId);

      setSuccess("Action completed successfully");
      loadUsers();
    } catch (err) {
      setError(err.message || "Action failed");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: "bg-yellow-100 text-yellow-800",
      VERIFIED: "bg-green-100 text-green-800",
      ACTIVE: "bg-blue-100 text-blue-800",
      REJECTED: "bg-red-100 text-red-800",
      SUSPENDED: "bg-red-200 text-red-900 border border-red-300",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
        {status === "SUSPENDED" ? "BLOCKED" : status}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const styles = {
      ADMIN: "bg-purple-100 text-purple-800",
      FARMER: "bg-green-100 text-green-800",
      DISTRIBUTOR: "bg-blue-100 text-blue-800",
      RETAILER: "bg-orange-100 text-orange-800",
      CONSUMER: "bg-gray-100 text-gray-800",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[role]}`}>
        {role}
      </span>
    );
  };

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 rounded-full border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-700 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-green-800">
            User Management
          </h1>
          <button
            onClick={loadUsers}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow"
          >
            Refresh
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl mb-4">
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-4 py-2 rounded-t-xl text-sm font-semibold transition
                ${
                  currentTab === tab.id
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
            >
              {tab.label}
              <span className="ml-2 bg-white/70 px-2 py-0.5 rounded-full text-xs">
                {counts[tab.id]}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100">
              <tr>
                {["User", "Contact", "Address", "Status", "Created", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-bold text-green-800 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {getFilteredUsers().length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                getFilteredUsers().map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-green-50 transition ${
                      user.status === "SUSPENDED" && "opacity-60"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{user.name || "N/A"}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <div className="mt-1">{getRoleBadge(user.role)}</div>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {user.phoneNumber || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {user.address || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {getStatusBadge(user.status)}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {user.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleAction(user.id, "verify")}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAction(user.id, "reject")}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {user.status === "ACTIVE" && user.role !== "ADMIN" && (
                          <button
                            onClick={() => handleAction(user.id, "suspend")}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Block
                          </button>
                        )}

                        {user.status === "SUSPENDED" && (
                          <button
                            onClick={() => handleAction(user.id, "activate")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Unblock
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
