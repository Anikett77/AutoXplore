import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserBookings } from "../api/booking";
import Footer from "../components/footer";

function Bookings() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user || !token) {
          setLoading(false);
          return;
        }

        const response = await getUserBookings(token);
        console.log("📦 Full API response:", response);
        
        let bookingsData = [];
        if (response.data) {
          bookingsData = response.data;
        } else if (response.bookings) {
          bookingsData = response.bookings;
        } else if (Array.isArray(response)) {
          bookingsData = response;
        }
        
        console.log("✅ Extracted bookings:", bookingsData);
        setBookings(bookingsData);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-orange-500 text-xl">Loading bookings...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold text-xl">
            Please login to view your bookings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-30">
      <h2 className="text-5xl font-bold mb-2 text-orange-500 flex justify-center">
        My Bookings
      </h2>
      <h3 className="text-gray-400 text-md flex justify-center mb-8">
        View and manage all your current and past car rental bookings
      </h3>

      {bookings.length === 0 ? (
        <div className="text-center my-20">
          <p className="text-gray-300 text-lg">No bookings yet.</p>
          <p className="text-gray-300 mt-2">
            Start by booking a car from our collection!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {bookings.map((booking) => {
            const carInfo = booking.car || {};
            const carMake = carInfo.make || '';
            const carModel = carInfo.model || '';
            const carImage = booking.carImage || carInfo.image || '';
            const bookingStatus = booking.status || 'pending';
            
            return (
              <div
                key={booking._id}
                className="border border-gray-800 p-5 rounded-lg shadow-lg bg-gradient-to-r from-purple-950/20 via-purple-900/30 to-gray-900/30 mx-8 hover:shadow-orange-500/20 transition"
              >
                {carImage && (
                  <div className="mb-4">
                    <img
                      src={
                        carImage.startsWith("http")
                          ? carImage
                          : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/cars/${carImage}`
                      }
                      alt={`${carMake} ${carModel}`}
                      className="w-full h-65 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Car+Image";
                      }}
                    />
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-4">
                  {carMake} {carModel}
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Customer:</span>
                    <span className="text-white font-semibold">{booking.customer}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pickup:</span>
                    <span className="text-white font-semibold">
                      {new Date(booking.pickupDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Return:</span>
                    <span className="text-white font-semibold">
                      {new Date(booking.returnDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-orange-500 font-bold text-lg">
                      ${booking.amount}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span
                      className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${
                        bookingStatus === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : bookingStatus === "active"
                          ? "bg-blue-500/20 text-blue-400"
                          : bookingStatus === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : bookingStatus === "cancelled"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {bookingStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Bookings;