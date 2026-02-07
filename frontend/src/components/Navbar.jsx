import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-700 p-4 text-white flex justify-between">
      <h1 className="font-bold text-lg">Farmxchain</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
