import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {
  const { token } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  // Fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  // Show Add Car form if no cars found after loading
  useEffect(() => {
    if (!loading && cars.length === 0) {
      setShowAddForm(true);
    }
  }, [loading, cars]);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars");
      setCars(res.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(cars.filter((car) => car._id !== id));
      alert("Car deleted successfully!");
    } catch (error) {
      alert("Error deleting car: " + error.response?.data?.message);
    }
  };

  const handleCarAdded = (newCar) => {
    setCars([newCar, ...cars]);
    setShowAddForm(false);
  };

  const handleCarUpdated = (updatedCar) => {
    setCars(cars.map((car) => (car._id === updatedCar._id ? updatedCar : car)));
    setEditingCar(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading cars...</div>;
  }

  return (
    <div>
      {/* Add Car Form */}
      {showAddForm && (
        <AddCar onCarAdded={handleCarAdded} onCancel={() => setShowAddForm(false)} />
      )}

      {/* Edit Car Form */}
      {editingCar && (
        <EditCar
          car={editingCar}
          onCarUpdated={handleCarUpdated}
          onCancel={() => setEditingCar(null)}
        />
      )}

      {/* Header and Add Button */}
      {!showAddForm && !editingCar && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Car Inventory ({cars.length})</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add New Car
          </button>
        </div>
      )}

      {/* Cars Grid */}
      {!showAddForm && !editingCar && (
        <>
          {cars.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No cars found. Add your first car!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div key={car._id} className="bg-white rounded-lg shadow p-4">
                  <img
                    src={car.images[0]}
                    alt={car.title}
                    className="w-full h-48 object-cover rounded mb-4"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                  <h3 className="text-xl font-bold mb-2">{car.title}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">{car.description}</p>

                  {car.tags && (
                    <div className="text-sm text-gray-500 mb-4">
                      {car.tags.car_type && <span className="mr-2">🚗 {car.tags.car_type}</span>}
                      {car.tags.company && <span>🏢 {car.tags.company}</span>}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingCar(car)}
                      className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
