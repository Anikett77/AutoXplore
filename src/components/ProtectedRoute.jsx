import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  // Not logged in at all
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // Logged in but not admin (when admin access required)
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;  // Redirect to home, not cars
  }

  // All good - show the protected content
  return children;
}
