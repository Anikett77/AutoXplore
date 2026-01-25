import React, { useState } from "react";
import axios from "axios";

function BookingModal({ show, onClose, car }) {
  const [form, setForm] = useState({
    pickupDate: "",
    returnDate: "",
    location: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
  });

  if (!show || !car) return null;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    // Validate required fields
    if (!form.pickupDate || !form.returnDate || !form.name || !form.email) {
      alert("Please fill all required fields!");
      return;
    }

    // Calculate number of days
    const pickup = new Date(form.pickupDate);
    const returnDate = new Date(form.returnDate);
    const days = Math.ceil((returnDate - pickup) / (1000 * 60 * 60 * 24)) || 1;
    
    // Calculate total amount (using car.price or car.dailyRate)
    const dailyRate = car.dailyRate || car.price || 0;
    const totalAmount = days * dailyRate;

    // Handle both database cars (with _id) and static cars (with id or no id)
    const carId = car._id || car.id;
    const isStaticCar = !car._id; // Static cars don't have _id from database
    
    // For static cars, send the full car object. For database cars, send the ID
    let carPayload;
    if (isStaticCar && carId) {
      // Static car - convert to database format and send full object
      carPayload = {
        id: carId.toString(),
        make: car.name?.split(' ')[0] || car.make || 'Unknown',
        model: car.name?.split(' ').slice(1).join(' ') || car.model || '',
        year: car.year || new Date().getFullYear(),
        dailyRate: car.price || car.dailyRate || 0,
        category: car.type || car.category || 'Sedan',
        seats: car.seats || 4,
        transmission: car.transmission || 'Automatic',
        fuelType: car.fuel || car.fuelType || 'Gasoline',
        mileage: parseInt(car.mileage) || 0,
        image: car.image || ''
      };
    } else if (carId) {
      // Database car - send ID as string
      carPayload = carId.toString();
    } else {
      alert("Car information is missing. Please try again.");
      return;
    }

    console.log("Booking data:", {
      customer: form.name,
      email: form.email,
      phone: form.phone,
      car: carPayload,
      pickupDate: form.pickupDate,
      returnDate: form.returnDate,
      amount: totalAmount,
      address: {
        street: form.location || "",
        city: form.city || "",
        state: form.state || "",
        zipCode: form.zip || ""
      }
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          customer: form.name, // Backend expects 'customer' not 'name'
          email: form.email,
          phone: form.phone || "",
          car: carPayload, // Can be ID string or full car object
          pickupDate: form.pickupDate,
          returnDate: form.returnDate,
          amount: totalAmount,
          address: {
            street: form.location || "",
            city: form.city || "",
            state: form.state || "",
            zipCode: form.zip || ""
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        alert("✅ Booking successful!");
        onClose();
        // Reset form
        setForm({
          pickupDate: "",
          returnDate: "",
          location: "",
          name: "",
          email: "",
          phone: "",
          city: "",
          state: "",
          zip: "",
        });
      } else {
        alert("❌ Failed to create booking!");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert(err.response?.data?.message || "❌ Booking failed!");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
      {/* Modal container — limits height and allows internal scrolling */}
      <div className="bg-[#161616] rounded-xl w-full max-w-6xl max-h-[100vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-6 relative shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-orange-500 text-2xl font-bold"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Content layout: image left, form right (responsive) */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Car image + basic info */}
          <div className="md:w-1/2 flex-shrink-0">
            <img
              src={(() => {
                if (!car.image) return 'https://via.placeholder.com/400x300?text=No+Image';
                const imgStr = String(car.image).trim();
                if (imgStr.startsWith('http://') || imgStr.startsWith('https://') || 
                    imgStr.startsWith('/') || imgStr.startsWith('blob:') || 
                    imgStr.startsWith('data:') || imgStr.includes('assets')) {
                  return imgStr;
                } else if (!imgStr.includes('/') && !imgStr.includes('\\')) {
                  return `${import.meta.env.VITE_API_URL}/uploads/cars/${imgStr}`;
                }
                return imgStr;
              })()}
              alt={car.name || `${car.make} ${car.model}`}
              className="w-full h-[300px] md:h-[420px] object-cover rounded-lg"
              onError={(e) => {
                console.error("BookingModal image failed:", car.image);
                e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />
            <h2 className="text-3xl text-start font-extrabold text-orange-400 mt-4">
              {car.name || `${car.make || ''} ${car.model || ''}`.trim() || 'Car'}
            </h2>
            <h1 className="text-2xl text-start font-extrabold text-green-400 mt-4">
              ${car.price || car.dailyRate || 0}/day
            </h1>
            <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-300">
              <div className="px-10 py-5 rounded-lg bg-gray-800 text-yellow-400 items-center justify-center flex flex-col">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" class="text-orange-400 text-xl sm:text-2xl mb-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path></svg>
              <span >
                Seats: {car.seats || 4}
              </span>
              </div>
              <div className="px-5 py-5 rounded-lg bg-gray-800 text-yellow-400 items-center justify-center flex flex-col"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-green-400 text-xl sm:text-2xl mb-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M336 448H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm157.2-340.7l-81-81c-6.2-6.2-16.4-6.2-22.6 0l-11.3 11.3c-6.2 6.2-6.2 16.4 0 22.6L416 97.9V160c0 28.1 20.9 51.3 48 55.2V376c0 13.2-10.8 24-24 24s-24-10.8-24-24v-32c0-48.6-39.4-88-88-88h-8V64c0-35.3-28.7-64-64-64H96C60.7 0 32 28.7 32 64v352h288V304h8c22.1 0 40 17.9 40 40v27.8c0 37.7 27 72 64.5 75.9 43 4.3 79.5-29.5 79.5-71.7V152.6c0-17-6.8-33.3-18.8-45.3zM256 192H96V64h160v128z"></path></svg>
              <span >
                Fuel: {car.fuel || car.fuelType || 'Gasoline'}
              </span>
              </div>
              <div className="px-2 py-1 rounded-lg bg-gray-800 text-yellow-400 items-center justify-center flex flex-col"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="text-yellow-400 text-xl sm:text-2xl mb-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 32C128.94 32 0 160.94 0 320c0 52.8 14.25 102.26 39.06 144.8 5.61 9.62 16.3 15.2 27.44 15.2h443c11.14 0 21.83-5.58 27.44-15.2C561.75 422.26 576 372.8 576 320c0-159.06-128.94-288-288-288zm0 64c14.71 0 26.58 10.13 30.32 23.65-1.11 2.26-2.64 4.23-3.45 6.67l-9.22 27.67c-5.13 3.49-10.97 6.01-17.64 6.01-17.67 0-32-14.33-32-32S270.33 96 288 96zM96 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm48-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm246.77-72.41l-61.33 184C343.13 347.33 352 364.54 352 384c0 11.72-3.38 22.55-8.88 32H232.88c-5.5-9.45-8.88-20.28-8.88-32 0-33.94 26.5-61.43 59.9-63.59l61.34-184.01c4.17-12.56 17.73-19.45 30.36-15.17 12.57 4.19 19.35 17.79 15.17 30.36zm14.66 57.2l15.52-46.55c3.47-1.29 7.13-2.23 11.05-2.23 17.67 0 32 14.33 32 32s-14.33 32-32 32c-11.38-.01-20.89-6.28-26.57-15.22zM480 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>
              <span >
                Mileage: {car.mileage || 0}
              </span>
              </div>
              <div className="px-2 py-1 rounded-lg bg-gray-800 text-yellow-400 items-center justify-center flex flex-col"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-purple-400 text-xl sm:text-2xl mb-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
              <span >
                Trans: {car.transmission || 'Automatic'}
              </span>
              </div>
            </div>
            <div className="bg-gray-800 w-full mt-5 h-auto text-start rounded-lg">
              <h1 className=" p-3 text-2xl font-sans font-medium text-white">About this Car</h1>
              <p className="pl-3 pb-3 text-sm text-gray-300">{car.about || car.description || 'No description available'}</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:w-1/2 bg-gray-900 rounded-2xl p-6">
            <div className="text-2xl font-semibold text-white">Reserve Your Drive</div>
            <div className="mt-2 text-sm text-gray-300">
              Fast • Secure • Easy
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex flex-col text-gray-200">
                  <span className="text-sm text-gray-300 ">Pickup Date</span>
                  <input
                    name="pickupDate"
                    type="date"
                    onChange={handleChange}
                    required
                    className="mt-1 px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all"
                  />
                </label>

                <label className="flex flex-col text-gray-200">
                  <span className="text-sm text-gray-300">Return Date</span>
                  <input
                    name="returnDate"
                    type="date"
                    onChange={handleChange}
                    required
                    className="mt-1 px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all"
                  />
                </label>
              </div>

              <label className="flex flex-col text-gray-200">
                <span className="text-sm text-start text-gray-300">Pickup Location</span>
                <input
                  name="location"
                  onChange={handleChange}
                  required
                  className="mt-1 px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all"
                  placeholder="Enter Pickup Location"
                />
              </label>

              <label className="flex flex-col text-gray-200">
                <span className="text-sm text-start text-gray-300">Full Name</span>
                <input
                  name="name"
                  onChange={handleChange}
                  required
                  className="mt-1 px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all"
                  placeholder="Your Full Name"
                />
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                <span className="text-sm text-start text-gray-300">Email Address</span>
                <span className="text-sm text-start text-gray-300">Phone Number</span>
                <input
                  name="email"
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-lg bg-gray-700 flex flex-col text-white focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all"
                  placeholder="Your Email"
                />
                
                <input
                  name="phone"
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all"
                  placeholder="Your Phone Number"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <span className="text-sm text-start text-gray-300">City</span>
                <span className="text-sm text-start text-gray-300">State</span>
                <span className="text-sm text-start text-gray-300">Zip Code</span>
                <input
                  name="city"
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all"
                  placeholder="Your City"
                />
                <input
                  name="state"
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all"
                  placeholder="Your State"
                />
                <input
                  name="zip"
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all"
                  placeholder="Your ZIP Code"
                />
              </div>

              <div className=" bg-gray-700 flex flex-col rounded-xl ">
              <div className="text-start flex flex-col justify-between px-3 my-4 ">
              <span className="flex justify-between text-gray-300">Rate/day <p>${car.price || car.dailyRate || 0}</p> </span>
              <div className="bg-gray-500 w-full h-0.25 mt-1 "></div>
              <span className="flex justify-between text-white">Total<p>${(() => {
                if (!form.pickupDate || !form.returnDate) return car.price || car.dailyRate || 0;
                const days = Math.ceil((new Date(form.returnDate) - new Date(form.pickupDate)) / (1000 * 60 * 60 * 24)) || 1;
                return days * (car.price || car.dailyRate || 0);
              })()}</p></span>
              </div>
              </div>

              <button
                type="submit"
                className="w-full mt-3 bg-gradient-to-r from-orange-400 to-orange-600 py-2 rounded text-white font-bold"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>

        {/* If you need additional footer content, keep it below */}
      </div>
    </div>
  );
}

export default BookingModal;
