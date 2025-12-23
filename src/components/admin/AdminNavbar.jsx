import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logocar.png";

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <nav className="bg-white text-gray-700 items-center justify-center flex mt-10 rounded-3xl top-0 fixed ml-60 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex items-center gap-110">
            
            <a href="/admin" className="text-2xl font-bold">
            <img src={Logo} alt="logo" className="w-39 h-auto " />
               Admin
            </a>
            
            
            {/* Nav Links */}
            <div className="hidden md:flex gap-6">
              <a 
                href="/admin" 
                className="hover:text-blue-400 transition"
              >
                Add Car
              </a>
              <a 
                href="/admin/cars" 
                className="hover:text-blue-400 transition"
              >
                🚗 Manage Cars
              </a>
              <a 
                href="/admin/bookings" 
                className="hover:text-blue-400 transition"
              >
                Bookings
              </a>
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
