import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: `${API_URL}/api/bookings`,
});

// Get user bookings
export const getUserBookings = async (token) => {
  const res = await API.get("/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get all bookings (admin)
export const getAllBookings = async (token) => {
  const res = await API.get("/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create booking
export const createBooking = async (bookingData, token) => {
  const res = await API.post("/", bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update booking status (admin)
export const updateBookingStatus = async (id, status, token) => {
  const res = await API.patch(`/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete booking (admin)
export const deleteBooking = async (id, token) => {
  const res = await API.delete(`/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};