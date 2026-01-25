import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

// register new user
export const registerUser = async (userData) => {
  const res = await API.post("/register", userData);
  return res.data;
};

// login user
export const loginUser = async (userData) => {
  const res = await API.post("/login", userData);
  return res.data;
};