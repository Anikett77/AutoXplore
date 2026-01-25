import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCars, deleteCar } from "../../api/cars";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {
  const { token } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false); // Hide add form by default
  const [editingCar, setEditingCar] = useState(null);

  // Fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await getCars();
      // API returns { page, pages, total, data: [...] }
      setCars(res.data?.data || res.data || []);
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
      await deleteCar(id, token);
      setCars(cars.filter((car) => car._id !== id));
      alert("Car deleted successfully!");
      fetchCars(); // Refresh the list
    } catch (error) {
      alert("Error deleting car: " + (error.response?.data?.message || error.message));
    }
  };

  const handleCarAdded = (newCar) => {
    // Refresh the car list to get the latest data
    fetchCars();
    setShowAddForm(false);
  };

  const handleCarUpdated = (updatedCar) => {
    // Refresh the car list to get the latest data
    fetchCars();
    setEditingCar(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading cars...</div>;
  }

  return (
    <div>

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
        <div className=" mb-5">
          <h1 className="flex justify-center items-center mt-35 text-orange-400 font-extrabold font-sans text-5xl">Fleet Management</h1>
          <h2 className="text-gray-400 font-sans flex mt-3 justify-center items-center text-md">Manage your entire fleet, track bookings, and monitor vehicle status in real-time</h2>
          <div className="flex w-363 h-35 border border-blue-900/40 mt-5 rounded-xl ml-7 justify-between bg-blue-950/40">
            <div className="flex w-76 border border-amber-50 rounded-xl m-6 text-gray-300 font-bold text-md p-5 justify-between">Total Cars <br /> {cars.length} <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-orange-400 text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"></path></svg></div>
            <div className="flex flex-col w-76 border border-amber-50 bg-orange-600/50 rounded-xl m-6 text-gray-300 font-bold text-md p-5"> <label>Filter By Category</label>
          <select
            className="bg-gray-700 rounded p-1 font-light text-sm text-white">
            <option>All Category</option>
            <option>Premium</option>
            <option>Exclusive</option>
            <option>Indian</option>
          </select></div>
          </div>
          
        </div>
      )}
      
      {/* Show message when form is open */}
      {showAddForm && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">Add New Car</h2>
          <p className="text-gray-400">Fill in all the details below to add a new car to the website</p>
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
                <div key={car._id} className="bg-indigo-950/35 rounded-lg shadow p-4 m-7">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/cars/${car.image}`}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-60 object-cover rounded mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-100 mb-2">{car.make} {car.model}</h3>
                  <p className="text-gray-400 mb-2 font-sans text-sm line-clamp-2">{car.description || 'No description available'}</p>

                  <div className="text-sm font-bold text-gray-200 mb-4 grid grid-cols-2">
                    <div className="mb-1">📅 Year: {car.year || 'N/A'}</div>
                    <div className="mb-1">💰 Daily Rate: ${car.dailyRate || 0}</div>
                    <div className="mb-1">🚗 Category: {car.category || 'N/A'}</div>
                    <div className="mb-1">🪑 Seats: {car.seats || 4}</div>
                    <div className="mb-1">⚙️ Transmission: {car.transmission || 'N/A'}</div>
                    <div className="mb-1">⛽ Fuel: {car.fuelType || 'N/A'}</div>
                    <div className="mb-1">
                      Availability: <span className={`font-semibold ${car.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {car.isAvailable !== undefined ? (car.isAvailable ? 'Available' : 'Unavailable') : (car.status || 'Available')}
                      </span>
                    </div>
                    <div className="mb-1">
                      Base Status: <span className={`font-semibold ${car.status === 'available' ? 'text-green-600' : car.status === 'rented' ? 'text-red-600' : 'text-yellow-600'}`}>
                        {car.status || 'available'}
                      </span>
                    </div>
                    {car.availability && (
                      <div className="mb-1 text-xs text-gray-400">
                        {car.availability.state === 'booked' && `📅 Booked (${car.availability.daysRemaining} days remaining)`}
                        {car.availability.state === 'available_until_reservation' && `📅 Available for ${car.availability.daysAvailable} more days`}
                        {car.availability.state === 'fully_available' && '✅ Fully Available'}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingCar(car)}
                      className="flex-1 bg-green-500/50 text-white py-2 rounded hover:bg-green-600 border border-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="flex-1 bg-red-500/60 text-white py-2 rounded hover:bg-red-600 border border-red-600"
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
