import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
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
            
            <Link to="/admin" className="text-2xl font-bold">
            <img src={Logo} alt="logo" className="w-39 h-auto " />
               Admin
            </Link>
            
            
            {/* Nav Links */}
            <div className="hidden md:flex gap-6">
              <Link 
                to="/admin" 
                className="hover:text-blue-400 text-gray-600 px-4 py-2 rounded transition flex"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus w-4 h-4 m-1.25" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
                Add Car
              </Link>
              <Link 
                to="/admin/cars" 
                className="hover:text-blue-400 transition mt-2 flex"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car w-4 h-4 m-1" aria-hidden="true"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
                Manage Cars
              </Link>
              <Link 
                to="/admin/bookings" 
                className="hover:text-blue-400 transition mt-2 flex"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-check w-4 h-4 m-1" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="m9 16 2 2 4-4"></path></svg>
                Bookings
              </Link>
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
