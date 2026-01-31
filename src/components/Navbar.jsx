import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/logocar.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Contact", path: "/contact" },
    { name: "My Bookings", path: "/bookings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-2xl p-3 sm:p-4 flex items-center justify-between max-w-7xl mx-auto mt-4">
        
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center" onClick={closeMenu}>
          <img src={Logo} alt="Logo" className="w-32 sm:w-36 lg:w-39 h-auto" />
          <span className="font-bold text-lg sm:text-xl text-gray-900">AutoXplore</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                  : "text-gray-700 hover:text-orange-500 transition pb-1"
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

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-orange-500 transition text-2xl p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-2xl mt-2 max-w-7xl mx-auto overflow-hidden">
          <div className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold py-2 px-3 rounded-lg bg-orange-50"
                    : "text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition py-2 px-3 rounded-lg"
                }
              >
                {item.name}
              </NavLink>
            ))}

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition py-2 px-3 rounded-lg text-left"
              >
                <FaUserCircle className="text-xl" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition py-2 px-3 rounded-lg"
              >
                <FaUserCircle className="text-xl" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;