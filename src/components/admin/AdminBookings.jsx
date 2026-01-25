import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAdminBookings, updateBookingStatus, deleteBooking } from "../../api/admin.js";

const AdminBookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getAdminBookings(token);
      const bookingsData = res.data || res.bookings || res || [];
      console.log("📊 Admin bookings fetched:", bookingsData);
      setBookings(bookingsData);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status, token);
      alert("Booking status updated successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update booking status: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    
    try {
      await deleteBooking(bookingId, token);
      alert("Booking deleted successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Failed to delete booking:", error);
      alert("Failed to delete booking: " + (error.response?.data?.message || error.message));
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const lowerTerm = searchTerm.toLowerCase();
    const carInfo = booking.car || {};
    const matchesSearch =
      (carInfo.make?.toLowerCase().includes(lowerTerm) || false) ||
      (carInfo.model?.toLowerCase().includes(lowerTerm) || false) ||
      (booking.customer?.toLowerCase().includes(lowerTerm) || false) ||
      (booking.email?.toLowerCase().includes(lowerTerm) || false);

    const matchesStatus = filterStatus === "All Statuses" || 
      (booking.status?.toLowerCase() === filterStatus.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="m-8">
      <h1 className="text-5xl font-extrabold text-orange-400 flex justify-center mt-35">Booking Dashboard</h1>
      <p className="text-gray-400 flex justify-center mt-3">Manage all bookings with detailed information and status updates</p>

      <div className="bg-gray-900 rounded-2xl flex gap-4 p-4 mt-6 text-gray-300">
        <div className="flex flex-col flex-1">
          <label>Search Bookings</label>
          <input
            type="text"
            placeholder="Search by customer, car, or email..."
            className="bg-gray-600 rounded p-2 mt-3 text-white"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col flex-1">
          <label>Filter by Status</label>
          <select
            className="bg-gray-700 rounded p-2 mt-3 text-white"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Active</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="flex flex-col justify-center bg-orange-700 rounded p-4 flex-1 text-center font-bold text-orange-100">
          Total Bookings
          <span className="text-3xl">{bookings.length}</span>
        </div>
      </div>

      {loading ? (
        <p className="mt-6 text-center text-orange-500">Loading bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p className="mt-6 text-center text-gray-400">No bookings found.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-700 bg-gray-900/50 mt-6 w-full text-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-700 p-2">ID</th>
              <th className="border border-gray-700 p-2">Car Model</th>
              <th className="border border-gray-700 p-2">Customer</th>
              <th className="border border-gray-700 p-2">Booking Date</th>
              <th className="border border-gray-700 p-2">Amount</th>
              <th className="border border-gray-700 p-2">Status</th>
              <th className="border border-gray-700 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => {
              const carInfo = booking.car || {};
              return (
                <tr key={booking._id}>
                  <td className="border border-gray-700 p-2">{booking._id?.slice(-8) || 'N/A'}</td>
                  <td className="border border-gray-700 p-2 text-center">
                    {carInfo.make || 'N/A'} {carInfo.model || ''}
                  </td>
                  <td className="border border-gray-700 p-2">{booking.customer || 'N/A'}</td>
                  <td className="border border-gray-700 p-2 text-center">
                    {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : 'N/A'} - {booking.returnDate ? new Date(booking.returnDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="border border-gray-700 p-2 text-center font-bold text-orange-400">
                    ${booking.amount || 0}
                  </td>
                  <td className="border border-gray-700 p-2">
                    <span className={`px-3 py-1 rounded text-xs font-semibold flex justify-center ${
                      booking.status === 'completed' ? 'bg-green-600' :
                      booking.status === 'pending' ? 'bg-yellow-600' :
                      booking.status === 'active' ? 'bg-blue-600' :
                      booking.status === 'cancelled' ? 'bg-red-600' : 'bg-gray-600'
                    }`}>
                      {booking.status || 'N/A'}
                    </span>
                  </td>
                  <td className="border border-gray-700 p-2 space-x-2 flex justify-center">
                    <select
                      value={booking.status || ''}
                      onChange={(e) => handleUpdateStatus(booking._id, e.target.value)}
                      className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      className="bg-red-600 px-7 py-1 rounded text-sm hover:bg-red-700"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookings;