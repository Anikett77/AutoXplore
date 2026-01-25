import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateCar } from "../../api/cars";

export default function EditCar({ car, onCarUpdated, onCancel }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    category: "Sedan",
    seats: 4,
    transmission: "Automatic",
    fuelType: "Gasoline",
    mileage: "",
    dailyRate: "",
    status: "available",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (car) {
      setFormData({
        make: car.make || "",
        model: car.model || "",
        year: car.year || "",
        color: car.color || "",
        category: car.category || "Sedan",
        seats: car.seats || 4,
        transmission: car.transmission || "Automatic",
        fuelType: car.fuelType || "Gasoline",
        mileage: car.mileage || "",
        dailyRate: car.dailyRate || "",
        status: car.status || "available",
        description: car.description || "",
        image: null,
      });
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const carData = {
        make: formData.make,
        model: formData.model,
        year: formData.year,
        color: formData.color,
        category: formData.category,
        seats: formData.seats,
        transmission: formData.transmission,
        fuelType: formData.fuelType,
        mileage: formData.mileage,
        dailyRate: formData.dailyRate,
        status: formData.status,
        description: formData.description,
        image: formData.image,
      };

      const updatedCar = await updateCar(car._id, carData, token);
      alert("Car updated successfully!");
      onCarUpdated(updatedCar);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg pb-16 pt-40">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Edit Car</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white"
        >
          ✕ Close
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Make *
            </label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Model *
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Year *
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
              <option value="Wagon">Wagon</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Seats
            </label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Transmission
            </label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Fuel Type
            </label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Mileage
            </label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Daily Rate ($) *
            </label>
            <input
              type="number"
              step="0.01"
              name="dailyRate"
              value={formData.dailyRate}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Car Image (leave empty to keep current)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {car.image && (
              <p className="text-sm text-gray-400 mt-1">
                Current: {car.image}
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900 text-red-200 rounded">
            {error}
          </div>
        )}

        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-600"
          >
            {loading ? "Updating..." : "Update Car"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
