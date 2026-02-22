import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "", email: "", password: "", confirmPassword: "", role: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }
    const { confirmPassword, ...dataToSend } = form;
    try {
    await registerUser(dataToSend);
    navigate("/login");
  } catch (err) {
    setMsg("Registration failed");
  }
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="bg-white p-6 shadow w-96" onSubmit={submit}>
        <h2 className="text-xl mb-4">Register</h2>

        <input name="username" placeholder="Username"
          className="w-full p-2 mb-2 border" onChange={handleChange} required />

        <input name="email" type="email" placeholder="Email"
          className="w-full p-2 mb-2 border" onChange={handleChange} required />

        <select name="role" className="w-full p-2 mb-2 border"
          onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="FARMER">Farmer</option>
          <option value="ADMIN">Admin</option>
        </select>

        <input name="password" type="password" placeholder="Password"
          className="w-full p-2 mb-2 border" onChange={handleChange} required />

        <input name="confirmPassword" type="password" placeholder="Confirm Password"
          className="w-full p-2 mb-3 border" onChange={handleChange} required />

        <button className="bg-green-600 text-white w-full p-2">Register</button>
        <p className="text-center text-red-500 mt-2">{msg}</p>
      </form>
    </div>
  );
}

export default Register;
