import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../assets/logocar.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Contact", path: "/contact" },
    { name: "My Bookings", path: "/bookings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
  <div className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between max-w-7xl mx-auto mt-4">
    
    {/* Logo */}
    <Link to="/" className="flex flex-col items-center">
      <img src={Logo} alt="Logo" className="w-39 h-auto" />
      <span className="font-bold text-xl text-gray-900">AutoXplore</span>
    </Link>

    {/* Nav Links */}
    <div className="md:flex items-center space-x-6">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-700 hover:text-orange-500 transition"
          }
        >
          {item.name}
        </NavLink>
      ))}

      {user ? (
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition"
        >
          <FaUserCircle className="text-xl" />
          <span>Logout</span>
        </button>
      ) : (
        <Link
          to="/login"
          className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition"
        >
          <FaUserCircle className="text-xl" />
          <span>Login</span>
        </Link>
      )}
    </div>
  </div>
</nav>

  );
};

export default Navbar;
