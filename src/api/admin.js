import axios from "axios";

const API = axios.create({
  baseURL: `http://localhost:5000/api/admin`,
});

// Get all bookings (admin only)
export const getAdminBookings = async (token, params = {}) => {
  const res = await API.get("/bookings", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return res.data;
};

// Update booking status (admin only)
export const updateBookingStatus = async (bookingId, status, token) => {
  const res = await API.patch(
    `/bookings/${bookingId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// Delete booking (admin only)
export const deleteBooking = async (bookingId, token) => {
  const res = await API.delete(`/bookings/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Admin car operations
export const getAdminCars = async (token, params = {}) => {
  const res = await API.get("/cars", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return res.data;
};