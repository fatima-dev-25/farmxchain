import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/farmers")
      .then(res => setFarmers(res.data));
  }, []);

  const approveFarmer = (id) => {
    axios.put(`http://localhost:8080/api/admin/approve/${id}`)
      .then(() => {
        setFarmers(farmers.map(f =>
          f.id === id ? { ...f, approved: true } : f
        ));
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

      {farmers.map(f => (
        <div key={f.id} className="border p-3 mb-2 flex justify-between">
          <span>{f.username} - {f.approved ? "Approved" : "Pending"}</span>
          {!f.approved && (
            <button
              className="bg-blue-600 text-white px-3"
              onClick={() => approveFarmer(f.id)}>
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
