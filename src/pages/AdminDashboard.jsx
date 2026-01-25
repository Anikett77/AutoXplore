import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CarList from "../components/admin/CarList";
import AdminNavbar from "../components/admin/AdminNavbar";
import AddCar from "../components/admin/AddCar";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-800">
         <AdminNavbar />
      

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        
        <AddCar />
      </main>
    </div>
  );
}
