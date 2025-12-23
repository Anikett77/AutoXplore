import React, { useEffect, useState } from "react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch bookings from backend API
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update booking status API call
  const updateBookingStatus = async (bookingId, status) => {
    try {
      await fetch("/api/admin/bookings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status }),
      });
      fetchBookings(); // refetch after update
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Filter bookings by search term and selected status
  const filteredBookings = bookings.filter(({ car, user, status }) => {
    const lowerTerm = searchTerm.toLowerCase();
    const matchesSearch =
      car.make.toLowerCase().includes(lowerTerm) ||
      car.model.toLowerCase().includes(lowerTerm) ||
      user.name.toLowerCase().includes(lowerTerm) ||
      user.email.toLowerCase().includes(lowerTerm);

    const matchesStatus = filterStatus === "All Statuses" || status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="m-8">
      <h1 className="text-5xl font-extrabold text-orange-400 flex justify-center">Booking Dashboard</h1>
      <p className="text-gray-400 flex justify-center mt-3">Manage all bookings with detailed information and status updates</p>

      <div className="bg-gray-800 rounded-2xl flex gap-4 p-4 mt-6 text-gray-300">
        {/* Search */}
        <div className="flex flex-col flex-1">
          <label>Search Bookings</label>
          <input
            type="text"
            placeholder="Search by customer, car, or email..."
            className="bg-gray-600 rounded p-2 text-white"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter */}
        <div className="flex flex-col flex-1">
          <label>Filter by Status</label>
          <select
            className="bg-gray-700 rounded p-2 text-white"
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

        {/* Total Bookings */}
        <div className="flex flex-col justify-center bg-orange-700 rounded p-4 flex-1 text-center font-bold text-orange-400">
          Total Bookings
          <span className="text-3xl">{bookings.length}</span>
        </div>
      </div>

      {loading ? (
        <p className="mt-6 text-center">Loading bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p className="mt-6 text-center">No bookings found.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-700 mt-6 w-full text-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-700 p-2">ID</th>
              <th className="border border-gray-700 p-2">Car Model</th>
              <th className="border border-gray-700 p-2">User Name</th>
              <th className="border border-gray-700 p-2">Booking Date</th>
              <th className="border border-gray-700 p-2">Status</th>
              <th className="border border-gray-700 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(({ _id, car, user, pickupDate, returnDate, status }) => (
              <tr key={_id}>
                <td className="border border-gray-700 p-2">{_id}</td>
                <td className="border border-gray-700 p-2">{car.make} {car.model}</td>
                <td className="border border-gray-700 p-2">{user.name}</td>
                <td className="border border-gray-700 p-2">{new Date(pickupDate).toLocaleDateString()} - {new Date(returnDate).toLocaleDateString()}</td>
                <td className="border border-gray-700 p-2">{status}</td>
                <td className="border border-gray-700 p-2 space-x-2">
                  {(status === "active" || status === "pending") && (
                    <>
                      <button
                        className="bg-green-600 px-3 py-1 rounded"
                        onClick={() => updateBookingStatus(_id, "completed")}
                      >
                        Complete
                      </button>
                      <button
                        className="bg-red-600 px-3 py-1 rounded"
                        onClick={() => updateBookingStatus(_id, "cancelled")}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {(status === "completed" || status === "cancelled") && <span>No actions</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookings;
