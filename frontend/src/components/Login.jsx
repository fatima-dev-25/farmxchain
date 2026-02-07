import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      console.log("Login response:", res.data); // 👈 DEBUG LINE

      const role = res.data.role;
      const approved = res.data.approved;

      if (role === "ADMIN") {
        navigate("/admin");
      } 
      else if (role === "Farmer") {
        if (approved) {
          navigate("/farmer");
        } else {
          alert("Waiting for admin approval");
        }
      } 
      else {
        alert("Unknown role" + role);
      }

    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="bg-green-600 text-white w-full py-2">
        Login
      </button>
    </form>
  );
}

export default Login;
