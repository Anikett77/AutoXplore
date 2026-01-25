import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function AddCar({ onCarAdded }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    car_type: "",
    company: "",
    dealer: "",
    images: [""],
    transmission: "Automatic", // default
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handles changes for all normal inputs/selects
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Transmission radio buttons
  const handleTransmission = (val) => {
    setFormData(prev => ({ ...prev, transmission: val }));
  };

  // Handles dynamic images array
  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };
  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ""] }));
  };
  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // You can add more fields as per your backend
      const carData = {
        title: formData.title,
        description: formData.description,
        tags: {
          car_type: formData.car_type,
          company: formData.company,
          dealer: formData.dealer,
          transmission: formData.transmission,
        },
        images: formData.images.filter(img => img.trim() !== "")
      };

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, carData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Car added successfully!");
      onCarAdded(res.data);

      setFormData({
        title: "",
        description: "",
        car_type: "",
        company: "",
        dealer: "",
        images: [""],
        transmission: "Automatic",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-extrabold font-sans text-center mt-25 text-orange-400">
        Add Your Car
      </h1>
      <h3 className="text-center mt-8 text-xl font-sans font-normal text-gray-400">
        Share your vehicle with the world and start earning today
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="w-2/3 mx-auto bg-gray-900 mt-6 rounded-2xl p-10">
          <div className="grid grid-cols-2 gap-8">
            {/* Car Name */}
            <div className="space-y-6">
              <span className="text-sm font-sans font-medium text-white">
                Car Name
                <div className="bg-gray-500 h-11 mt-2 rounded-lg relative mb-3">
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="glass-input w-full px-4 shadow-sm rounded-lg py-3 bg-transparent focus:ring-2 focus:ring-orange-500 transition-all"
                    type="text"
                    placeholder="e.g., Toyota Camry"
                  />
                </div>
              </span>
              {/* Daily Price */}
              <span className="text-sm font-sans font-medium text-white">
                Daily Price ($)
                <div className="bg-gray-500 h-11 mt-2 rounded-lg relative mb-3">
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="glass-input w-full px-4 shadow-sm rounded-lg py-3 bg-transparent focus:ring-2 focus:ring-orange-500 transition-all"
                    type="text"
                    placeholder="$ 50"
                  />
                </div>
              </span>
              {/* Seats */}
              <span className="text-sm font-sans font-medium text-white">
                Seats
                <div className="bg-gray-500 h-11 mt-2 rounded-lg relative mb-3">
                  <select
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="bg-gray-800/50 border pl-3 border-gray-700 w-full h-11 rounded-lg text-gray-200 focus:ring-2"
                  >
                    <option value="2">2 Seats</option>
                    <option value="4">4 Seats</option>
                    <option value="5">5 Seats</option>
                    <option value="6">6 Seats</option>
                    <option value="7">7 Seats</option>
                    <option value="8">8 Seats</option>
                  </select>
                </div>
              </span>
              {/* Fuel Type */}
              <span className="text-sm font-sans font-medium text-white">
                Fuel Type
                <div className="bg-gray-500 h-11 mt-2 rounded-lg relative mb-3">
                  <select
                    name="fuel_type"
                    value={formData.fuel_type}
                    onChange={handleChange}
                    className="bg-gray-800/50 pl-3 border border-gray-700 w-full h-11 rounded-lg text-gray-200 focus:ring-2"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>
              </span>
              {/* Mileage */}
              <span className="text-sm font-sans font-medium text-white">
                Mileage (MPG)
                <div className="bg-gray-500 h-11 mt-2 rounded-lg relative mb-3">
                  <input
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    required
                    className="glass-input w-full px-4 shadow-sm rounded-lg py-3 bg-transparent focus:ring-2 focus:ring-orange-500 transition-all"
                    type="number"
                    placeholder="28"
                  />
                </div>
              </span>
              {/* Category */}
              <span className="text-sm font-sans font-medium text-white">
                Category
                <div className="bg-gray-500 h-11 mt-2 rounded-lg relative mb-3">
                  <select
                    name="car_type"
                    value={formData.car_type}
                    onChange={handleChange}
                    className="bg-gray-800/50 pl-3 border border-gray-700 w-full h-11 rounded-lg text-gray-200 focus:ring-2"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Wagon">Wagon</option>
                  </select>
                </div>
              </span>
              {/* Transmission as toggle */}
              <div>
                <label className="block text-sm font-sans font-medium text-white mb-2">
                  Transmission
                </label>
                <div className="flex gap-4">
                  <label
                    className={`flex items-center px-8 py-3 rounded-xl cursor-pointer border transition 
                      ${formData.transmission === "Automatic"
                        ? "bg-orange-950/70 border-orange-800 text-white"
                        : "bg-gray-700/30 border-gray-500 text-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="transmission"
                      value="Automatic"
                      checked={formData.transmission === "Automatic"}
                      onChange={() => handleTransmission("Automatic")}
                      className="accent-blue-500 mr-2"
                    />
                    Automatic
                  </label>
                  <label
                    className={`flex items-center px-8 py-3 rounded-xl cursor-pointer border transition 
                      ${formData.transmission === "Manual"
                        ? "bg-orange-950/70 border-orange-800 text-white"
                        : "bg-gray-700/30 border-gray-500 text-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="transmission"
                      value="Manual"
                      checked={formData.transmission === "Manual"}
                      onChange={() => handleTransmission("Manual")}
                      className="accent-blue-500 mr-2"
                    />
                    Manual
                  </label>
                </div>
              </div>
            </div>
            {/* Right column for images (and/or any other fields you like) */}
            <div className="space-y-6 font-sans text-gray-100">
              <span className="grid grid-cols-2 mb-4 font-sans">
                <span>Year
                  <div className="bg-gray-500 h-12 mt-2 w-50 rounded-lg relative mb-3">
                  <input
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    required
                    className="glass-input w-full px-4 shadow-sm rounded-lg py-3 bg-transparent focus:ring-2 focus:ring-orange-500 transition-all"
                    type="number"
                    placeholder="2025"
                  />
                </div>
                
                </span>
                <span>Model
                  <div className="bg-gray-500 h-12 mt-2 w-50 rounded-lg relative mb-3">
                  <input
                    name="mileage"
                    required
                    className="glass-input w-full px-4 shadow-sm rounded-lg py-3 bg-transparent focus:ring-2 focus:ring-orange-500 transition-all"
                    type="text"
                    placeholder="e.g.,XLE"
                  />
                </div>
                </span>
                </span>
                <div className="">Car Image
                  <div className="bg-gray-500 h-45 mt-2 w-105 rounded-lg relative mb-3 pt-8">
                  <label className="">
                    <svg class="w-10 h-10 ml-45 mb-3 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg><p className="font-sans text-sm font-medium ml-38">Click to Upload</p>
                    <p className="font-sans text-sm font-normal ml-38">or drag and drop</p>
                    <p className="font-sans text-xs mt-1 ml-38 ">PNG, JPG up to 5MB</p>
                    <input className="hidden" accept="image/*" type="file" name="image" />
                  </label>
                </div>
                </div>

                <div>Description
                  <div className="bg-gray-500 h-32 mt-2 w-105 rounded-lg relative mb-3">
                  <input
                    name="mileage"
                    required
                    className="glass-input w-full px-4 mt-1.2 rounded-lg py-3 bg-transparent focus:ring-2 focus:ring-orange-500 transition-all"
                    type="text"
                    placeholder="Describe features, condition, special details..."
                  />
                </div>
                </div>

              
            </div>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 px-8 py-4 rounded-lg text-white font-semibold text-xl hover:bg-orange-700 transition disabled:bg-gray-400"
            >
              {loading ? "Adding..." : "List Your Car  +"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
