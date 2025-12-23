import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/bookings",
});

// ✅ Create booking
export const createBooking = async (bookingData) => {
  const res = await API.post("/", bookingData);
  return res.data;
};

// ✅ Get bookings for user
export const getUserBookings = async (userId) => {
  const res = await API.get(`/user/${userId}`);
  return res.data;
};
