import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/cars`,
});

// Get all cars with optional filters
export const getCars = async (params = {}) => {
  const res = await API.get("/", { params });
  return res.data;
};

// Get car by ID
export const getCarById = async (id) => {
  const res = await API.get(`/${id}`);
  return res.data;
};

// Create car (admin only)
export const createCar = async (carData, token) => {
  const formData = new FormData();
  Object.keys(carData).forEach((key) => {
    if (key === "image" && carData[key] instanceof File) {
      formData.append("image", carData[key]);
    } else if (carData[key] !== null && carData[key] !== undefined) {
      formData.append(key, carData[key]);
    }
  });

  const res = await API.post("/", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Update car (admin only)
export const updateCar = async (id, carData, token) => {
  const formData = new FormData();
  Object.keys(carData).forEach((key) => {
    if (key === "image" && carData[key] instanceof File) {
      formData.append("image", carData[key]);
    } else if (carData[key] !== null && carData[key] !== undefined) {
      formData.append(key, carData[key]);
    }
  });

  const res = await API.put(`/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Delete car (admin only)
export const deleteCar = async (id, token) => {
  const res = await API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

