import React from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Contact from "./pages/Contact";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BookingModal from "./pages/BookingModal";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import CarList from "./components/admin/CarList";
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminBookings from "./components/admin/AdminBookings";

function PublicLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/admin-login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}

function NoNavbarLayout() {
  return <Outlet />;
}

function App() {
  return (
    <>
      <Routes>
        {/* Public routes with public navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookingmodel" element={<BookingModal />} />
        </Route>

        {/* Login and Admin Login routes without any navbar */}
        <Route element={<NoNavbarLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Route>

        {/* Admin routes with admin navbar */}
        <Route element={<AdminLayout />}>
          <Route 
            path="/admin/cars" 
            element={
              <ProtectedRoute adminOnly>
                <CarList />
              </ProtectedRoute>
            } 
          />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* If none of the routes matched */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
