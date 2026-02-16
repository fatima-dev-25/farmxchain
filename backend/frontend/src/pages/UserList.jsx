import React, { useState, useEffect, useCallback } from "react";
import UserService from "../services/UserService";

const UserList = ({ role, title }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      let data;

      switch (role) {
        case "DISTRIBUTOR":
          data = await UserService.getAllDistributors();
          break;
        case "RETAILER":
          data = await UserService.getAllRetailers();
          break;
        case "CONSUMER":
          data = await UserService.getAllConsumers();
          break;
        default:
          data = await UserService.getUsersByRole(role);
      }

      setUsers(data.data || []);
      setError("");
    } catch (err) {
      setError(`Failed to load ${title.toLowerCase()}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [role, title]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-700 font-medium">
            Loading {title.toLowerCase()}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-green-800">
            {title} Directory
          </h1>

          <button
            onClick={loadUsers}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow transition"
          >
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* User Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow">
              <h3 className="text-lg font-semibold text-gray-700">
                No {title.toLowerCase()} found
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Try refreshing or check back later.
              </p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="p-6">
                  {/* User Header */}
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                      {user.email.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.email}
                      </h3>
                      <p className="text-sm text-green-700 font-medium">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <span
                        className={`font-semibold ${
                          user.status === "ACTIVE"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {user.status || "Active"}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Member Since</span>
                      <span className="text-gray-900">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
