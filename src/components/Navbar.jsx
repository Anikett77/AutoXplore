import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../assets/logocar.png";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Contact", path: "/contact" },
    { name: "My Bookings", path: "/bookings" },
  ];

  return (
    <nav className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between max-w-7xl mx-auto mt-4">
      {/* Logo */}
      <Link to="/" className="flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-39 h-auto" />
        <span className="font-bold text-xl text-gray-900">AutoXplore</span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center space-x-6">
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

        {/* Login */}
        <Link
          to="/login"
          className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition"
        >
          <FaUserCircle className="text-xl" />
          <span>Login</span>
        </Link>
      </div>

      {/* Mobile Menu Placeholder */}
      <div className="md:hidden">
        {/* You can add a hamburger menu here later */}
      </div>
    </nav>
  );
};

export default Navbar;
